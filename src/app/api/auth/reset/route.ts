import { NextResponse } from "next/server";
import { db, toPublicUser, type UserRow } from "@/lib/auth/db";
import { generateRecoveryCode, hashSecret, verifySecret } from "@/lib/auth/password";
import { isSameOrigin } from "@/lib/auth/request";
import { roleHome } from "@/lib/auth/roles";
import {
  attachSessionCookie,
  createSession,
  deleteUserSessions,
} from "@/lib/auth/session";
import {
  normalizeEmail,
  normalizeRecoveryCode,
  passwordProblem,
} from "@/lib/auth/validation";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 6;
const LOCK_MINUTES = 15;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const code = typeof body?.code === "string" ? normalizeRecoveryCode(body.code) : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !code || !password) {
    return NextResponse.json(
      { error: "Enter your email, recovery code, and a new password." },
      { status: 400 },
    );
  }

  const issue = passwordProblem(password);
  if (issue) return NextResponse.json({ error: issue }, { status: 400 });

  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as unknown as
    | UserRow
    | undefined;

  if (!row) {
    await hashSecret(password);
    return NextResponse.json(
      { error: "That email and recovery code do not match an account." },
      { status: 400 },
    );
  }

  if (row.locked_until && Date.parse(row.locked_until) > Date.now()) {
    return NextResponse.json(
      { error: "Too many attempts. Wait a few minutes and try again." },
      { status: 429 },
    );
  }

  const valid = await verifySecret(code, {
    hash: row.recovery_hash,
    salt: row.recovery_salt,
  });

  if (!valid) {
    const attempts = row.failed_attempts + 1;
    const lockedUntil =
      attempts >= MAX_ATTEMPTS ? new Date(Date.now() + LOCK_MINUTES * 60_000).toISOString() : null;
    db.prepare("UPDATE users SET failed_attempts = ?, locked_until = ? WHERE id = ?").run(
      lockedUntil ? 0 : attempts,
      lockedUntil,
      row.id,
    );
    return NextResponse.json(
      { error: "That email and recovery code do not match an account." },
      { status: 400 },
    );
  }

  const passwordDigest = await hashSecret(password);
  const newCode = generateRecoveryCode();
  const recoveryDigest = await hashSecret(normalizeRecoveryCode(newCode));

  db.prepare(
    `UPDATE users
     SET password_hash = ?, password_salt = ?, recovery_hash = ?, recovery_salt = ?,
         failed_attempts = 0, locked_until = NULL
     WHERE id = ?`,
  ).run(passwordDigest.hash, passwordDigest.salt, recoveryDigest.hash, recoveryDigest.salt, row.id);

  // A password reset invalidates every existing session for that account.
  deleteUserSessions(row.id);
  const user = toPublicUser(row);
  const { token, expires } = createSession(user.id);

  const response = NextResponse.json({
    user,
    home: roleHome(user.role),
    recoveryCode: newCode,
  });
  attachSessionCookie(response, token, expires);
  return response;
}

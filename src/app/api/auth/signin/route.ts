import { NextResponse } from "next/server";
import { db, toPublicUser, type UserRow } from "@/lib/auth/db";
import { burnPasswordTime, verifySecret } from "@/lib/auth/password";
import { isSameOrigin } from "@/lib/auth/request";
import { roleHome } from "@/lib/auth/roles";
import { attachSessionCookie, createSession } from "@/lib/auth/session";
import { normalizeEmail } from "@/lib/auth/validation";

export const runtime = "nodejs";

const MAX_ATTEMPTS = 8;
const LOCK_MINUTES = 15;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!email || !password) {
    return NextResponse.json({ error: "Enter your email and password." }, { status: 400 });
  }

  const row = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as unknown as
    | UserRow
    | undefined;

  if (!row) {
    await burnPasswordTime(password);
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  if (row.locked_until && Date.parse(row.locked_until) > Date.now()) {
    const minutes = Math.max(1, Math.ceil((Date.parse(row.locked_until) - Date.now()) / 60_000));
    return NextResponse.json(
      { error: `Too many attempts. Try again in about ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      { status: 429 },
    );
  }

  const valid = await verifySecret(password, {
    hash: row.password_hash,
    salt: row.password_salt,
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
    return NextResponse.json({ error: "Email or password is incorrect." }, { status: 401 });
  }

  db.prepare("UPDATE users SET failed_attempts = 0, locked_until = NULL WHERE id = ?").run(row.id);
  const user = toPublicUser(row);
  const { token, expires } = createSession(user.id);

  const response = NextResponse.json({ user, home: roleHome(user.role) });
  attachSessionCookie(response, token, expires);
  return response;
}

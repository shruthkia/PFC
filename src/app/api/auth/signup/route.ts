import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { db, toPublicUser, type UserRow } from "@/lib/auth/db";
import { generateRecoveryCode, hashSecret } from "@/lib/auth/password";
import { isSameOrigin } from "@/lib/auth/request";
import { isRoleId, roleHome } from "@/lib/auth/roles";
import { attachSessionCookie, createSession } from "@/lib/auth/session";
import { EMAIL_PATTERN, normalizeEmail, normalizeRecoveryCode, passwordProblem } from "@/lib/auth/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null;
  if (!body) return NextResponse.json({ error: "Invalid request." }, { status: 400 });

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? normalizeEmail(body.email) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const role = typeof body.role === "string" ? body.role : "";

  if (name.length < 2 || name.length > 80 || /[\u0000-\u001f]/.test(name)) {
    return NextResponse.json({ error: "Enter your full name (2–80 characters)." }, { status: 400 });
  }
  if (!EMAIL_PATTERN.test(email) || email.length > 254) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }
  const passwordIssue = passwordProblem(password);
  if (passwordIssue) return NextResponse.json({ error: passwordIssue }, { status: 400 });
  if (!isRoleId(role)) {
    return NextResponse.json({ error: "Choose the workspace you need." }, { status: 400 });
  }

  const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
  if (exists) {
    return NextResponse.json(
      { error: "An account with that email already exists. Sign in instead." },
      { status: 409 },
    );
  }

  const id = randomUUID();
  const passwordDigest = await hashSecret(password);
  const recoveryCode = generateRecoveryCode();
  const recoveryDigest = await hashSecret(normalizeRecoveryCode(recoveryCode));

  try {
    db.prepare(
      `INSERT INTO users
        (id, email, name, role, chapter_id, password_hash, password_salt, recovery_hash, recovery_salt, created_at)
       VALUES (?, ?, ?, ?, 'coppell', ?, ?, ?, ?, ?)`,
    ).run(
      id,
      email,
      name,
      role,
      passwordDigest.hash,
      passwordDigest.salt,
      recoveryDigest.hash,
      recoveryDigest.salt,
      new Date().toISOString(),
    );
  } catch (error) {
    if (error instanceof Error && /UNIQUE/i.test(error.message)) {
      return NextResponse.json(
        { error: "An account with that email already exists. Sign in instead." },
        { status: 409 },
      );
    }
    return NextResponse.json({ error: "The account could not be created." }, { status: 500 });
  }

  const row = db.prepare("SELECT * FROM users WHERE id = ?").get(id) as unknown as UserRow;
  const user = toPublicUser(row);
  const { token, expires } = createSession(user.id);

  const response = NextResponse.json(
    { user, home: roleHome(user.role), recoveryCode },
    { status: 201 },
  );
  attachSessionCookie(response, token, expires);
  return response;
}

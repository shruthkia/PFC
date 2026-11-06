import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { queryOne, toPublicUser, type UserRow } from "@/lib/auth/db";
import { generateRecoveryCode, hashSecret } from "@/lib/auth/password";
import { isSameOrigin } from "@/lib/auth/request";
import { isRoleId, roleHome } from "@/lib/auth/roles";
import { chapters } from "@/lib/platform-data";
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
  const chapterId = typeof body.chapterId === "string" ? body.chapterId : "coppell";

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
  if (!chapters.some((chapter) => chapter.id === chapterId)) {
    return NextResponse.json({ error: "Choose a chapter from the list." }, { status: 400 });
  }

  let exists: { id: string } | undefined;
  try {
    exists = await queryOne<{ id: string }>("SELECT id FROM users WHERE email = ?", [email]);
  } catch (error) {
    console.error("[signup] Account database unavailable.", error);
    return NextResponse.json(
      { error: "Account creation is not available on this deployment yet. Try again later." },
      { status: 503 },
    );
  }
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

  let row: UserRow | undefined;
  try {
    row = await queryOne<UserRow>(
      `INSERT INTO users
        (id, email, name, role, chapter_id, password_hash, password_salt, recovery_hash, recovery_salt, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       RETURNING *`,
      [
        id,
        email,
        name,
        role,
        chapterId,
        passwordDigest.hash,
        passwordDigest.salt,
        recoveryDigest.hash,
        recoveryDigest.salt,
        new Date().toISOString(),
      ],
    );
  } catch (error) {
    if (error instanceof Error && /UNIQUE/i.test(error.message)) {
      return NextResponse.json(
        { error: "An account with that email already exists. Sign in instead." },
        { status: 409 },
      );
    }
    console.error("[signup] Account insert failed.", error);
    return NextResponse.json({ error: "The account could not be created." }, { status: 500 });
  }
  if (!row) {
    return NextResponse.json({ error: "The account could not be created." }, { status: 500 });
  }

  const user = toPublicUser(row);
  let session: { token: string; expires: Date };
  try {
    session = await createSession(user.id);
  } catch (error) {
    console.error("[signup] Session creation failed.", error);
    return NextResponse.json(
      { error: "Your account was created, but the session could not start. Sign in with your password." },
      { status: 500 },
    );
  }

  const response = NextResponse.json(
    { user, home: roleHome(user.role), recoveryCode },
    { status: 201 },
  );
  attachSessionCookie(response, session.token, session.expires);
  return response;
}

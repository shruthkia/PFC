import { createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import type { NextResponse } from "next/server";
import { execute, queryOne, toPublicUser, type PublicUser, type UserRow } from "@/lib/auth/db";
import { canAccess, roleHome, type RoleId } from "@/lib/auth/roles";

export const SESSION_COOKIE = "pfc_session";
const SESSION_DAYS = 30;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

function cookieOptions(expires: Date) {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  };
}

export async function createSession(userId: string): Promise<{ token: string; expires: Date }> {
  const token = randomBytes(32).toString("base64url");
  const expires = new Date(Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000);

  await execute("DELETE FROM sessions WHERE expires_at < ?", [new Date().toISOString()]);
  await execute(
    "INSERT INTO sessions (token_hash, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
    [hashToken(token), userId, new Date().toISOString(), expires.toISOString()],
  );

  return { token, expires };
}

export function attachSessionCookie(response: NextResponse, token: string, expires: Date) {
  response.cookies.set(SESSION_COOKIE, token, cookieOptions(expires));
}

export function clearSessionCookie(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", { ...cookieOptions(new Date(0)), maxAge: 0 });
}

export async function deleteSession(token: string) {
  await execute("DELETE FROM sessions WHERE token_hash = ?", [hashToken(token)]);
}

export async function deleteUserSessions(userId: string) {
  await execute("DELETE FROM sessions WHERE user_id = ?", [userId]);
}

/** Reads the signed-in user for the current request, if any. */
export const getSessionUser = cache(async (): Promise<PublicUser | null> => {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  let row: (UserRow & { session_expires_at: string }) | undefined;
  try {
    row = await queryOne<UserRow & { session_expires_at: string }>(
      `SELECT u.*, s.expires_at AS session_expires_at
       FROM sessions s
       JOIN users u ON u.id = s.user_id
       WHERE s.token_hash = ?`,
      [hashToken(token)],
    );
  } catch (error) {
    console.error("[session] Account database unavailable.", error);
    return null;
  }

  if (!row) return null;

  if (Date.parse(row.session_expires_at) <= Date.now()) {
    await deleteSession(token);
    return null;
  }

  return toPublicUser(row);
});

export async function requireUser(nextPath = "/"): Promise<PublicUser> {
  const user = await getSessionUser();
  if (!user) redirect(`/login?next=${encodeURIComponent(nextPath)}`);
  return user;
}

export async function requireRole(required: RoleId, nextPath: string): Promise<PublicUser> {
  const user = await requireUser(nextPath);
  if (!canAccess(user.role, required)) redirect(roleHome(user.role));
  return user;
}

import { NextResponse } from "next/server";
import { db } from "@/lib/auth/db";
import { isSameOrigin } from "@/lib/auth/request";
import { getSessionUser } from "@/lib/auth/session";
import {
  isServerStateKey,
  publicStateKeys,
  serverStateKeys,
  stateKeys,
} from "@/lib/state-keys";

export const runtime = "nodejs";

const CHAPTER_ID = "coppell";
const MAX_VALUE_BYTES = 250_000;

const adminOnly = new Set<string>([stateKeys.announcements, stateKeys.cmsDraft, stateKeys.social]);

export async function GET() {
  const user = await getSessionUser();
  const keys = user ? serverStateKeys : publicStateKeys;
  const placeholders = keys.map(() => "?").join(", ");
  const rows = db
    .prepare(
      `SELECT key, value FROM workspace_state
       WHERE chapter_id = ? AND key IN (${placeholders})`,
    )
    .all(CHAPTER_ID, ...keys) as unknown as { key: string; value: string }[];

  const state: Record<string, unknown> = {};
  for (const row of rows) {
    try {
      state[row.key] = JSON.parse(row.value);
    } catch {
      // Skip malformed rows rather than breaking the workspace.
    }
  }

  return NextResponse.json(
    { state, signedIn: Boolean(user) },
    { headers: { "Cache-Control": "no-store" } },
  );
}

export async function PUT(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in to save workspace changes." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { key?: unknown; value?: unknown } | null;
  if (!body || typeof body.key !== "string" || !isServerStateKey(body.key)) {
    return NextResponse.json({ error: "Unknown workspace key." }, { status: 400 });
  }

  if (adminOnly.has(body.key) && user.role !== "admin") {
    return NextResponse.json({ error: "Only national organizers can change this." }, { status: 403 });
  }

  let serialized: string;
  try {
    serialized = JSON.stringify(body.value);
  } catch {
    return NextResponse.json({ error: "That change could not be saved." }, { status: 400 });
  }

  if (serialized.length > MAX_VALUE_BYTES) {
    return NextResponse.json({ error: "That entry is too large to save." }, { status: 413 });
  }

  const now = new Date().toISOString();
  db.prepare(
    `INSERT INTO workspace_state (chapter_id, key, value, updated_at)
     VALUES (?, ?, ?, ?)
     ON CONFLICT(chapter_id, key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at`,
  ).run(CHAPTER_ID, body.key, serialized, now);

  return NextResponse.json({ ok: true, updatedAt: now });
}

export async function DELETE(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Cross-origin request refused." }, { status: 403 });
  }

  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Sign in first." }, { status: 401 });
  }
  if (user.role !== "admin") {
    return NextResponse.json({ error: "Only national organizers can reset shared data." }, { status: 403 });
  }

  db.prepare("DELETE FROM workspace_state WHERE chapter_id = ?").run(CHAPTER_ID);
  return NextResponse.json({ ok: true });
}

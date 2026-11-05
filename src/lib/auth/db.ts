import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

/**
 * Server-side account database.
 *
 * Accounts, sessions, and shared chapter state live in a SQLite file on the
 * machine running the app. The file is git-ignored, persists across restarts,
 * and is never sent to the browser. Moving to a hosted Postgres/Supabase
 * deployment means replacing this module and the queries that use it.
 */
const databasePath =
  process.env.PFC_DATABASE_PATH ?? path.join(process.cwd(), ".data", "pawsforcause.db");

const globalForDb = globalThis as unknown as { __pfcDatabase?: DatabaseSync };

function openDatabase(): DatabaseSync {
  mkdirSync(path.dirname(databasePath), { recursive: true });
  const database = new DatabaseSync(databasePath);
  database.exec(`
    PRAGMA busy_timeout = 5000;
    PRAGMA journal_mode = WAL;
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS chapters (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL
    );

    INSERT OR IGNORE INTO chapters (id, name) VALUES ('coppell', 'Coppell Paws');

    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('student','advisor','admin','shelter','alumni')),
      chapter_id TEXT NOT NULL DEFAULT 'coppell' REFERENCES chapters(id),
      password_hash TEXT NOT NULL,
      password_salt TEXT NOT NULL,
      recovery_hash TEXT NOT NULL,
      recovery_salt TEXT NOT NULL,
      failed_attempts INTEGER NOT NULL DEFAULT 0,
      locked_until TEXT,
      created_at TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS sessions (
      token_hash TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );

    CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);

    CREATE TABLE IF NOT EXISTS workspace_state (
      chapter_id TEXT NOT NULL REFERENCES chapters(id),
      key TEXT NOT NULL,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      PRIMARY KEY (chapter_id, key)
    );
  `);
  return database;
}

function getDatabase(): DatabaseSync {
  if (!globalForDb.__pfcDatabase) {
    globalForDb.__pfcDatabase = openDatabase();
  }
  return globalForDb.__pfcDatabase;
}

/**
 * Opens the database on first query, never at import time. This keeps
 * `next build` from touching the live database file while the dev server runs.
 */
export const db = new Proxy({} as DatabaseSync, {
  get(_target, property) {
    const database = getDatabase();
    const value = Reflect.get(database, property, database) as unknown;
    return typeof value === "function" ? value.bind(database) : value;
  },
});

export type UserRow = {
  id: string;
  email: string;
  name: string;
  role: "student" | "advisor" | "admin" | "shelter" | "alumni";
  chapter_id: string;
  password_hash: string;
  password_salt: string;
  recovery_hash: string;
  recovery_salt: string;
  failed_attempts: number;
  locked_until: string | null;
  created_at: string;
};

export type PublicUser = {
  id: string;
  email: string;
  name: string;
  role: UserRow["role"];
  chapterId: string;
};

export function toPublicUser(row: UserRow): PublicUser {
  return {
    id: row.id,
    email: row.email,
    name: row.name,
    role: row.role,
    chapterId: row.chapter_id,
  };
}

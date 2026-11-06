import { mkdirSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";
import { Pool } from "pg";
import { chapters } from "@/lib/platform-data";

/**
 * Server-side account database.
 *
 * Hosted deployments should set DATABASE_URL to a Postgres connection string.
 * Local development falls back to a SQLite file at .data/pawsforcause.db.
 * The database is never sent to the browser.
 */
const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;
const databasePath =
  process.env.PFC_DATABASE_PATH ?? path.join(process.cwd(), ".data", "pawsforcause.db");

type SqlValue = string | number | bigint | null | Uint8Array;

const globalForDb = globalThis as unknown as {
  __pfcDatabase?: DatabaseSync;
  __pfcPool?: Pool;
  __pfcSchemaReady?: Promise<void>;
};

function isPostgres(): boolean {
  return Boolean(databaseUrl);
}

function connectionStringForPool(value: string): string {
  try {
    const url = new URL(value);
    // Supabase appends sslmode=require, which overrides the explicit SSL
    // settings below and rejects Supabase's certificate chain.
    url.searchParams.delete("sslmode");
    url.searchParams.delete("ssl");
    return url.toString();
  } catch {
    return value;
  }
}

function getPool(): Pool {
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is not set.");
  }

  if (!globalForDb.__pfcPool) {
    const pool = new Pool({
      connectionString: connectionStringForPool(databaseUrl),
      max: 3,
      connectionTimeoutMillis: 10_000,
      idleTimeoutMillis: 30_000,
      ssl:
        process.env.PGSSLMODE === "disable"
          ? false
          : process.env.NODE_ENV === "production"
            ? { rejectUnauthorized: false }
            : undefined,
    });
    pool.on("error", (error) => {
      console.error("[db] Postgres pool error", error);
    });
    globalForDb.__pfcPool = pool;
  }

  return globalForDb.__pfcPool;
}

function getSqlite(): DatabaseSync {
  if (!globalForDb.__pfcDatabase) {
    mkdirSync(path.dirname(databasePath), { recursive: true });
    const database = new DatabaseSync(databasePath);
    database.exec(`
      PRAGMA busy_timeout = 5000;
      PRAGMA journal_mode = WAL;
      PRAGMA foreign_keys = ON;
    `);
    globalForDb.__pfcDatabase = database;
  }
  return globalForDb.__pfcDatabase;
}

const chapterSeedSql = chapters
  .map(
    (chapter) =>
      `('${chapter.id.replace(/'/g, "''")}', '${chapter.name.replace(/'/g, "''")}')`,
  )
  .join(",\n    ");

const schemaSql = `
  CREATE TABLE IF NOT EXISTS chapters (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
  );

  INSERT INTO chapters (id, name) VALUES
    ${chapterSeedSql}
  ON CONFLICT (id) DO NOTHING;

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
`;

async function createSchema(): Promise<void> {
  if (isPostgres()) {
    await getPool().query(schemaSql);
    return;
  }
  getSqlite().exec(schemaSql);
}

async function ensureSchema(): Promise<void> {
  if (!globalForDb.__pfcSchemaReady) {
    globalForDb.__pfcSchemaReady = createSchema().catch((error) => {
      globalForDb.__pfcSchemaReady = undefined;
      throw error;
    });
  }
  await globalForDb.__pfcSchemaReady;
}

function toPostgresSql(sql: string): string {
  let index = 0;
  return sql.replace(/\?/g, () => `$${++index}`);
}

export async function queryAll<T>(sql: string, params: SqlValue[] = []): Promise<T[]> {
  await ensureSchema();
  if (isPostgres()) {
    const result = await getPool().query(toPostgresSql(sql), params);
    return result.rows as T[];
  }
  return getSqlite().prepare(sql).all(...params) as unknown as T[];
}

export async function queryOne<T>(sql: string, params: SqlValue[] = []): Promise<T | undefined> {
  const rows = await queryAll<T>(sql, params);
  return rows[0];
}

export async function execute(sql: string, params: SqlValue[] = []): Promise<void> {
  await ensureSchema();
  if (isPostgres()) {
    await getPool().query(toPostgresSql(sql), params);
    return;
  }
  getSqlite().prepare(sql).run(...params);
}

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

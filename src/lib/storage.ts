"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";
import { isServerStateKey, stateKeys } from "@/lib/state-keys";

/**
 * Workspace state hook.
 *
 * Changes are written to the server (SQLite through /api/state) so every desk
 * sees the same chapter data, with localStorage acting as an offline copy.
 * Public pages can read shared tasks and announcements without signing in.
 */

export const storageKeys = stateKeys;

/** Records that shipped with the old demo. They are ignored if they are still in storage. */
const legacySampleIds: Record<string, Set<string>> = {
  [stateKeys.hours]: new Set(["h1", "h2", "h3", "h4", "h5", "h6"]),
  [stateKeys.funds]: new Set(["f1", "f2"]),
  [stateKeys.projects]: new Set(["p1", "p2"]),
  [stateKeys.consents]: new Set(["co1", "co2", "co3"]),
  [stateKeys.tasks]: new Set(["t1", "t2", "t3", "t4", "t5", "t6"]),
  [stateKeys.claims]: new Set(["c1", "c2", "c3", "c4"]),
  [stateKeys.announcements]: new Set(["n1", "n2", "n3"]),
  [stateKeys.mentors]: new Set(["al1", "al2", "al3", "al4"]),
  [stateKeys.social]: new Set(["sm1", "sm2"]),
};

function withoutLegacySamples<T>(key: string, value: T): T {
  const ids = legacySampleIds[key];
  if (!ids || !Array.isArray(value)) return value;
  return value.filter((item) => {
    if (!item || typeof item !== "object" || !("id" in item)) return true;
    return !ids.has(String((item as { id: unknown }).id));
  }) as T;
}

type Cache = Record<string, unknown> | null;

let cache: Cache = null;
let loadStarted = false;
let serverUnavailable = false;
const dirtyKeys = new Set<string>();
const listeners = new Set<() => void>();
const saveQueues = new Map<string, Promise<unknown>>();

function emit() {
  for (const listener of listeners) listener();
}

function readLocal(key: string): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function startLoading() {
  if (loadStarted || typeof window === "undefined") return;
  loadStarted = true;

  fetch("/api/state", { cache: "no-store", credentials: "same-origin" })
    .then(async (response) => {
      if (!response.ok) {
        serverUnavailable = true;
        return;
      }
      const data = (await response.json()) as { state?: Record<string, unknown> };
      const merged: Record<string, unknown> = { ...(data.state ?? {}) };
      for (const key of dirtyKeys) {
        if (cache && Object.prototype.hasOwnProperty.call(cache, key)) merged[key] = cache[key];
      }
      cache = merged;
    })
    .catch(() => {
      serverUnavailable = true;
    })
    .finally(() => {
      emit();
    });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  startLoading();
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(key: string): string {
  if (cache && Object.prototype.hasOwnProperty.call(cache, key)) {
    return JSON.stringify(cache[key]);
  }
  // Drafts and other browser-only values still work without an account.
  if (!isServerStateKey(key) || serverUnavailable) return readLocal(key) ?? "";
  return "";
}

function getServerSnapshot(): string {
  return "";
}

export function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStored<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Private mode or a full quota should never break the interface.
  }
}

export function useStoredState<T>(key: string, initial: T) {
  const getSnapshotForHook = useCallback(() => getSnapshot(key), [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshotForHook, getServerSnapshot);

  const value = useMemo<T>(() => {
    if (!raw) return initial;
    try {
      return withoutLegacySamples(key, JSON.parse(raw) as T);
    } catch {
      return initial;
    }
  }, [raw, initial, key]);

  const update = useCallback(
    (next: T | ((current: T) => T)) => {
      const current = withoutLegacySamples(
        key,
        cache && Object.prototype.hasOwnProperty.call(cache, key)
          ? (cache[key] as T)
          : readStored(key, initial),
      );
      const resolved = typeof next === "function" ? (next as (current: T) => T)(current) : next;

      cache = { ...(cache ?? {}), [key]: resolved };
      dirtyKeys.add(key);
      writeStored(key, resolved);
      emit();

      if (!isServerStateKey(key)) return;

      const previous = saveQueues.get(key) ?? Promise.resolve();
      const task = previous
        .catch(() => undefined)
        .then(async () => {
          try {
            const response = await fetch("/api/state", {
              method: "PUT",
              credentials: "same-origin",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ key, value: resolved }),
            });
            if (!response.ok) throw new Error(String(response.status));
            dirtyKeys.delete(key);
            window.dispatchEvent(new CustomEvent("pfc:sync", { detail: { ok: true } }));
          } catch {
            window.dispatchEvent(
              new CustomEvent("pfc:sync", {
                detail: {
                  ok: false,
                  message: "Saved in this browser only. The server did not accept that change.",
                },
              }),
            );
          }
        });
      saveQueues.set(key, task);
    },
    [key, initial],
  );

  return [value, update, raw !== ""] as const;
}

/**
 * Clear this browser's copy. Admins also clear the shared chapter state;
 * everyone else keeps the server records intact.
 */
export async function resetDemoData() {
  try {
    Object.keys(window.localStorage)
      .filter((key) => key.startsWith("pfc:"))
      .forEach((key) => window.localStorage.removeItem(key));
  } catch {
    // Ignore storage failures; reloading still clears in-memory state.
  }

  try {
    await fetch("/api/state", { method: "DELETE", credentials: "same-origin" });
  } catch {
    // Non-admins receive a 403; local cleanup still happened.
  }

  window.location.reload();
}

/** Real file download from generated text, no server needed. */
export function downloadTextFile(filename: string, text: string, mime = "text/plain;charset=utf-8") {
  const blob = new Blob([text], { type: mime });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

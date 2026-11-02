"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BadgeCheck, KeyRound, LogOut, Mail } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import { roleHome, usePlatform, type UserRole } from "@/lib/platform-store";

const roles: { id: UserRole; label: string; hint: string }[] = [
  { id: "student", label: "Student leader", hint: "Chapter hub for hours, toys, funds, consent" },
  { id: "advisor", label: "Faculty advisor", hint: "Verify and sign off student hours" },
  { id: "admin", label: "National organizer", hint: "Claims, Active Standard, CMS, reports" },
  { id: "shelter", label: "Shelter partner", hint: "Broadcast needs to nearby chapters" },
  { id: "alumni", label: "Alumni mentor", hint: "Mentor directory and campus bridges" },
];

export function LoginGate() {
  const router = useRouter();
  const search = useSearchParams();
  const nextPath = search.get("next");
  const { session, chapters, login, logout, ready } = usePlatform();
  const [role, setRole] = useState<UserRole>("student");
  const [chapterId, setChapterId] = useState("coppell");
  const [toast, setToast] = useState<string | null>(null);
  const selected = roles.find((item) => item.id === role)!;

  const chapterOptions = useMemo(
    () => [...chapters].sort((a, b) => a.city.localeCompare(b.city)),
    [chapters],
  );

  function magicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get("email") || "");
    const name = String(data.get("name") || "");
    const nextSession = login({
      email,
      name: name || undefined,
      role,
      chapterId: role === "student" || role === "advisor" ? chapterId : chapterId,
    });
    setToast(`Signed in as ${nextSession.name}. Opening ${selected.label}…`);
    const destination = nextPath && nextPath.startsWith("/") ? nextPath : roleHome[role];
    window.setTimeout(() => router.push(destination), 500);
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[900px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow w-fit">Secure chapter access</p>
            <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">
              Chapter login
            </h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Sign in with your school email. Your session stays on this device so hours, toys, and funds you log actually stick.
            </p>
          </div>
          <StatusPill tone={session ? "good" : "info"}>{session ? `Signed in · ${session.role}` : "Local session auth"}</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

        {session && ready ? (
          <Panel className="mt-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-rose">Current session</p>
                <p className="mt-1 font-display text-2xl font-extrabold text-cocoa">{session.name}</p>
                <p className="mt-1 text-sm text-muted">
                  {session.email} · {session.role}
                  {session.chapterId ? ` · ${chapters.find((c) => c.id === session.chapterId)?.name ?? session.chapterId}` : ""}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href={roleHome[session.role]} className="button-primary">
                  Open workspace
                </Link>
                <button
                  type="button"
                  className="button-paper"
                  onClick={() => {
                    logout();
                    setToast("Signed out on this device.");
                  }}
                >
                  <LogOut className="h-4 w-4" /> Sign out
                </button>
              </div>
            </div>
          </Panel>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr]">
          <Panel>
            <h2 className="font-display text-2xl font-black text-cocoa">Who are you signing in as?</h2>
            <ul className="mt-5 space-y-2">
              {roles.map((item) => (
                <li key={item.id}>
                  <label
                    className={`flex cursor-pointer gap-3 rounded-2xl border-2 border-cocoa p-4 ${
                      role === item.id ? "bg-blush shadow-[3px_3px_0_#6e493b]" : "bg-cream"
                    }`}
                  >
                    <input
                      type="radio"
                      name="role"
                      className="mt-1 accent-[#c94d78]"
                      checked={role === item.id}
                      onChange={() => setRole(item.id)}
                    />
                    <span>
                      <span className="block font-display text-lg font-black text-cocoa">{item.label}</span>
                      <span className="mt-1 block text-xs font-bold text-cocoa/55">{item.hint}</span>
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel tone="mint">
            <div className="flex items-start gap-3">
              <KeyRound className="mt-1 h-6 w-6 text-cocoa" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Email sign-in</h2>
                <p className="mt-2 text-sm text-ink/65">
                  Creates a real local session for this browser. No fake skip links. Your chapter picks which branch totals move when you log work.
                </p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={magicLink}>
              <Field label="Your name">
                <input name="name" required className="form-control" placeholder="Maya Chen" autoComplete="name" />
              </Field>
              <Field label="School or work email">
                <input name="email" required type="email" className="form-control" placeholder="you@school.edu" autoComplete="email" />
              </Field>
              {(role === "student" || role === "advisor") && (
                <Field label="Your chapter branch">
                  <select
                    className="form-control"
                    value={chapterId}
                    onChange={(event) => setChapterId(event.target.value)}
                    required
                  >
                    {chapterOptions.map((chapter) => (
                      <option key={chapter.id} value={chapter.id}>
                        {chapter.name} · {chapter.city}
                      </option>
                    ))}
                  </select>
                </Field>
              )}
              <button type="submit" className="button-primary w-full" disabled={!ready}>
                <Mail className="h-4 w-4" /> Sign in as {selected.label}
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Check,
  Copy,
  Eye,
  EyeOff,
  KeyRound,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { roles, roleHome, roleLabel, type RoleId } from "@/lib/auth/roles";

type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  chapterId: string;
};

type Mode = "signin" | "signup" | "reset";

type RecoveryResult = { code: string; user: SessionUser };

const passwordHint = "At least 10 characters, including a letter and a number.";

export function LoginGate({ initialUser }: { initialUser: SessionUser | null }) {
  const [mode, setMode] = useState<Mode>("signin");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [recovery, setRecovery] = useState<RecoveryResult | null>(null);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setNotice(null);
    setRecovery(null);
    setCopied(false);
  }

  function destination(fallback: string) {
    if (typeof window === "undefined") return fallback;
    const next = new URLSearchParams(window.location.search).get("next");
    if (next && next.startsWith("/") && !next.startsWith("//")) return next;
    return fallback;
  }

  async function post(path: string, payload: Record<string, unknown>) {
    setPending(true);
    setError(null);
    try {
      const response = await fetch(path, {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        user?: SessionUser;
        home?: string;
        recoveryCode?: string;
      };
      if (!response.ok) {
        setError(data.error ?? "That did not work. Please try again.");
        return null;
      }
      return data;
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
      return null;
    } finally {
      setPending(false);
    }
  }

  async function onSignIn(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const data = await post("/api/auth/signin", {
      email: String(form.get("email") ?? ""),
      password: String(form.get("password") ?? ""),
    });
    if (!data?.user) return;
    router.push(destination(data.home ?? roleHome(data.user.role)));
    router.refresh();
  }

  async function onSignUp(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    const data = await post("/api/auth/signup", {
      name: String(form.get("name") ?? ""),
      email: String(form.get("email") ?? ""),
      password,
      role: String(form.get("role") ?? ""),
    });
    if (!data?.user || !data.recoveryCode) return;
    setRecovery({ code: data.recoveryCode, user: data.user });
  }

  async function onReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");
    if (password !== confirm) {
      setError("Those passwords do not match.");
      return;
    }
    const data = await post("/api/auth/reset", {
      email: String(form.get("email") ?? ""),
      code: String(form.get("code") ?? ""),
      password,
    });
    if (!data?.user || !data.recoveryCode) return;
    setRecovery({ code: data.recoveryCode, user: data.user });
  }

  async function onSignOut() {
    setPending(true);
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
    } finally {
      router.push("/login");
      router.refresh();
    }
  }

  async function copyCode() {
    if (!recovery) return;
    try {
      await navigator.clipboard.writeText(recovery.code);
      setCopied(true);
      setNotice("Recovery code copied.");
    } catch {
      setError("Select the code and copy it manually.");
    }
  }

  if (initialUser && !recovery) {
    return (
      <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
        <div className="mx-auto max-w-[860px]">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
          </Link>
          <Panel className="mt-8" tone="mint">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="eyebrow w-fit">Signed in</p>
                <h1 className="mt-4 font-display text-4xl font-black text-cocoa">
                  Hi, {initialUser.name.split(" ")[0]}.
                </h1>
                <p className="mt-2 text-sm font-semibold text-muted">
                  {initialUser.email} · {roleLabel(initialUser.role)}
                </p>
              </div>
              <StatusPill tone="good">Account active</StatusPill>
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={roleHome(initialUser.role)} className="button-primary">
                Open {roleLabel(initialUser.role)} workspace <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/account" className="button-paper">
                Account settings
              </Link>
              <button type="button" onClick={onSignOut} className="button-paper" disabled={pending}>
                <LogOut aria-hidden className="h-4 w-4" /> Sign out
              </button>
            </div>

            <p className="mt-6 text-xs font-semibold leading-5 text-muted">
              National organizers can open every workspace. Everyone else sees the workspace for the role on
              this account.
            </p>
          </Panel>
        </div>
      </div>
    );
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1080px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>

        <div className="mt-6 max-w-3xl">
          <p className="eyebrow w-fit">Chapter access</p>
          <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">
            {mode === "signup"
              ? "Create your account"
              : mode === "reset"
                ? "Reset your password"
                : "Sign in"}
          </h1>
          <p className="mt-3 text-lg leading-8 text-muted">
            One account opens the workspace for your role. Account details and workspace changes save to the PFC database. Email is not connected yet, so save the recovery code shown at sign-up.
          </p>
        </div>

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-2xl border-2 border-[#8a2f2f] bg-[#fde8e4] p-4 text-sm font-bold text-[#6d2020]"
          >
            {error}
          </div>
        ) : null}
        {notice ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 text-sm font-bold text-[#31513a]"
          >
            <BadgeCheck aria-hidden className="h-5 w-5" /> {notice}
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-6">
            <Panel>
              <h2 className="font-display text-2xl font-black text-cocoa">What an account does</h2>
              <ul className="mt-4 space-y-3 text-sm font-semibold leading-6 text-cocoa">
                <li className="flex gap-2">
                  <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  Hashed passwords and an HttpOnly session cookie. No passwords in browser storage.
                </li>
                <li className="flex gap-2">
                  <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  Your role decides which workspace opens; student, advisor, organizer, shelter, or alumni.
                </li>
                <li className="flex gap-2">
                  <ShieldCheck aria-hidden className="mt-0.5 h-4 w-4 shrink-0 text-rose" />
                  Changes save to the PFC database and survive signing out or switching devices.
                </li>
              </ul>
              <p className="mt-5 rounded-xl border border-border bg-white/70 p-3 text-xs font-semibold leading-5 text-muted">
                Email is not connected yet. At sign-up you receive a one-time recovery code. Keep it
                somewhere safe, because it is the only way to reset the password.
              </p>
            </Panel>

            <Panel tone="butter">
              <h2 className="font-display text-xl font-black text-cocoa">Which workspace fits?</h2>
              <dl className="mt-3 space-y-3">
                {roles.map((role) => (
                  <div key={role.id}>
                    <dt className="text-sm font-black text-cocoa">{role.label}</dt>
                    <dd className="text-xs font-semibold leading-5 text-muted">{role.hint}</dd>
                  </div>
                ))}
              </dl>
            </Panel>
          </div>

          <Panel className="h-fit">
            <div className="flex flex-wrap gap-2" aria-label="Account actions">
              {(
                [
                  ["signin", "Sign in"],
                  ["signup", "Create account"],
                  ["reset", "Reset password"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => switchMode(value)}
                  aria-pressed={mode === value}
                  className={`rounded-full border-2 border-cocoa px-4 py-2 text-xs font-black transition ${
                    mode === value ? "bg-cocoa text-[var(--background)]" : "bg-cream text-cocoa hover:bg-white"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {recovery ? (
              <div className="mt-6">
                <div className="flex items-center gap-2 text-[#31513a]">
                  <BadgeCheck aria-hidden className="h-6 w-6" />
                  <h2 className="font-display text-2xl font-black text-cocoa">
                    Account ready, {recovery.user.name.split(" ")[0]}.
                  </h2>
                </div>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                  Save this recovery code now. It is shown once and cannot be looked up later. You will need
                  it, together with your email, to set a new password.
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 rounded-2xl border-2 border-cocoa bg-cream p-4">
                  <code className="font-display text-xl font-black tracking-wider text-cocoa">
                    {recovery.code}
                  </code>
                  <button type="button" className="button-paper min-h-0 px-3 py-2 text-xs" onClick={copyCode}>
                    {copied ? <Check aria-hidden className="h-3.5 w-3.5" /> : <Copy aria-hidden className="h-3.5 w-3.5" />}
                    {copied ? "Copied" : "Copy code"}
                  </button>
                </div>
                <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                  A password reset replaces this code with a new one and signs out every other session.
                </p>
                <button
                  type="button"
                  className="button-primary mt-6 w-full"
                  onClick={() => {
                    router.push(destination(roleHome(recovery.user.role)));
                    router.refresh();
                  }}
                >
                  Open {roleLabel(recovery.user.role)} workspace <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
              </div>
            ) : mode === "signin" ? (
              <form className="mt-6 space-y-4" onSubmit={onSignIn}>
                <h2 className="font-display text-2xl font-black text-cocoa">Welcome back</h2>
                <Field label="Email">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    placeholder="you@school.edu"
                  />
                </Field>
                <Field label="Password">
                  <div className="relative">
                    <input
                      className="form-control pr-14"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="current-password"
                      required
                      placeholder="Your password"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-cocoa"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>
                <button type="submit" className="button-primary w-full" disabled={pending}>
                  {pending ? "Signing in…" : "Sign in"} <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
                <p className="text-center text-xs font-semibold text-muted">
                  No account yet?{" "}
                  <button type="button" className="text-rose underline decoration-2 underline-offset-2" onClick={() => switchMode("signup")}>
                    Create one
                  </button>
                </p>
              </form>
            ) : mode === "signup" ? (
              <form className="mt-6 space-y-4" onSubmit={onSignUp}>
                <h2 className="font-display text-2xl font-black text-cocoa">Start a workspace</h2>
                <Field label="Full name">
                  <input className="form-control" name="name" autoComplete="name" required minLength={2} maxLength={80} placeholder="Ada Lovelace" />
                </Field>
                <Field label="Email">
                  <input className="form-control" type="email" name="email" autoComplete="email" required placeholder="you@school.edu" />
                </Field>
                <Field
                  label="Workspace role"
                  hint="This decides which desk opens after sign-in. Advisor, organizer, and shelter roles must be verified by PFC."
                >
                  <select className="form-control" name="role" defaultValue="student" required>
                    {roles.map((role) => (
                      <option key={role.id} value={role.id}>
                        {role.label}: {role.hint}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Password" hint={passwordHint}>
                  <div className="relative">
                    <input
                      className="form-control pr-14"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      autoComplete="new-password"
                      required
                      minLength={10}
                      maxLength={200}
                      placeholder="At least 10 characters"
                    />
                    <button
                      type="button"
                      className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-cocoa"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff aria-hidden className="h-4 w-4" /> : <Eye aria-hidden className="h-4 w-4" />}
                    </button>
                  </div>
                </Field>
                <Field label="Confirm password">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="confirm"
                    autoComplete="new-password"
                    required
                    minLength={10}
                    maxLength={200}
                    placeholder="Repeat your password"
                  />
                </Field>
                <button type="submit" className="button-primary w-full" disabled={pending}>
                  {pending ? "Creating account…" : "Create account"} <ArrowRight aria-hidden className="h-4 w-4" />
                </button>
                <p className="text-xs font-semibold leading-5 text-muted">
                  By creating an account you agree to the{" "}
                  <Link href="/terms" className="text-rose underline decoration-2 underline-offset-2">
                    terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-rose underline decoration-2 underline-offset-2">
                    privacy notice
                  </Link>
                  . Accounts are for the chapter workspace. Email is not connected yet.
                </p>
              </form>
            ) : (
              <form className="mt-6 space-y-4" onSubmit={onReset}>
                <h2 className="font-display text-2xl font-black text-cocoa">Use your recovery code</h2>
                <p className="text-xs font-semibold leading-5 text-muted">
                  Enter the code you saved at sign-up. A successful reset replaces it with a new code.
                </p>
                <Field label="Email">
                  <input className="form-control" type="email" name="email" autoComplete="email" required />
                </Field>
                <Field label="Recovery code" hint="Format: XXXX-XXXX-XXXX-XXXX">
                  <input
                    className="form-control font-mono uppercase tracking-wider"
                    name="code"
                    autoComplete="one-time-code"
                    required
                    placeholder="XXXX-XXXX-XXXX-XXXX"
                  />
                </Field>
                <Field label="New password" hint={passwordHint}>
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    required
                    minLength={10}
                    maxLength={200}
                  />
                </Field>
                <Field label="Confirm new password">
                  <input
                    className="form-control"
                    type={showPassword ? "text" : "password"}
                    name="confirm"
                    autoComplete="new-password"
                    required
                    minLength={10}
                    maxLength={200}
                  />
                </Field>
                <button type="submit" className="button-primary w-full" disabled={pending}>
                  <KeyRound aria-hidden className="h-4 w-4" />
                  {pending ? "Resetting…" : "Set new password"}
                </button>
                <p className="text-xs font-semibold leading-5 text-muted">
                  Lost the code? It cannot be recovered. A national organizer can create a new account for
                  you.
                </p>
              </form>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-extrabold text-cocoa">{label}</span>
      {hint ? <span className="mt-1 block text-xs font-semibold text-muted">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

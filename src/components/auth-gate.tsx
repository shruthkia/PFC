"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound } from "lucide-react";
import { usePlatform, type UserRole } from "@/lib/platform-store";

export function AuthGate({
  allow,
  children,
}: {
  allow: UserRole[];
  children: React.ReactNode;
}) {
  const { ready, session } = usePlatform();
  const router = useRouter();
  const allowed = Boolean(session && allow.includes(session.role));

  useEffect(() => {
    if (!ready) return;
    if (!session) router.replace(`/login?next=${encodeURIComponent(typeof window !== "undefined" ? window.location.pathname : "/portal")}`);
  }, [ready, session, router]);

  if (!ready) {
    return (
      <div className="paper-grid grid min-h-screen place-items-center px-5">
        <p className="font-display text-xl font-extrabold text-cocoa">Loading your session…</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="paper-grid grid min-h-screen place-items-center px-5">
        <div className="sticker-card max-w-md bg-surface-strong p-8 text-center">
          <KeyRound className="mx-auto h-8 w-8 text-rose" />
          <h1 className="mt-4 font-display text-2xl font-extrabold text-cocoa">Sign in required</h1>
          <p className="mt-2 text-sm text-muted">This workspace needs a chapter login.</p>
          <Link href="/login" className="button-primary mt-6 inline-flex">
            Go to login
          </Link>
        </div>
      </div>
    );
  }

  if (!allowed) {
    return (
      <div className="paper-grid grid min-h-screen place-items-center px-5">
        <div className="sticker-card max-w-md bg-surface-strong p-8 text-center">
          <h1 className="font-display text-2xl font-extrabold text-cocoa">Wrong workspace for this account</h1>
          <p className="mt-2 text-sm text-muted">
            Signed in as {session.name} ({session.role}). Switch roles from login, or open your home workspace.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/login" className="button-primary">
              Switch account
            </Link>
            <Link href="/" className="button-paper">
              Public site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

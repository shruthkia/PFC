import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { PageShell, Panel, StatusPill } from "@/components/platform/ui";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { roleHome, roleLabel } from "@/lib/auth/roles";
import { requireUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Your account",
  description: "Your PawsForCause account, role, and workspace.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await requireUser("/account");

  return (
    <PageShell
      eyebrow="Your account"
      title={`Hi, ${user.name.split(" ")[0]}.`}
      lede="This is the account that opens your workspace. Your password is stored as a one-way hash and your session lives in an HttpOnly cookie."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-black uppercase tracking-[.14em] text-muted">Signed in as</p>
              <p className="mt-2 font-display text-3xl font-black text-cocoa">{user.name}</p>
              <p className="mt-1 text-sm font-semibold text-muted">{user.email}</p>
            </div>
            <StatusPill tone="good">Active</StatusPill>
          </div>

          <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-muted">Role</dt>
              <dd className="font-black text-cocoa">{roleLabel(user.role)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-muted">Chapter</dt>
              <dd className="font-black text-cocoa">Coppell Paws</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="font-bold text-muted">Session</dt>
              <dd className="font-black text-cocoa">30 days, revocable</dd>
            </div>
          </dl>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={roleHome(user.role)} className="button-primary">
              Open workspace <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <SignOutButton />
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel tone="mint">
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden className="mt-1 h-6 w-6 text-cocoa" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">How this account works</h2>
                <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                  Passwords use scrypt hashing with a unique salt. Sessions are random tokens stored hashed in
                  the server database, and the browser only holds an HttpOnly cookie. Signing out deletes the
                  session on the server.
                </p>
              </div>
            </div>
          </Panel>

          <Panel>
            <h2 className="font-display text-xl font-black text-cocoa">Email is not connected yet</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Email is not connected yet, so verification and reset links are not sent. Your one-time recovery code is the reset path.
            </p>
          </Panel>
        </div>
      </div>
    </PageShell>
  );
}

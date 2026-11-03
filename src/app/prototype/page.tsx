import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BadgeCheck, LockKeyhole, MailX } from "lucide-react";
import { getSessionUser } from "@/lib/auth/session";
import { roleLabel } from "@/lib/auth/roles";

export const metadata: Metadata = {
  title: "Prototype preview",
  description:
    "What the PawsForCause chapter workspaces are, what they save, and what they deliberately do not do yet.",
  robots: { index: false, follow: false },
};

const workspaces = [
  {
    href: "/portal",
    title: "Student chapter hub",
    body: "Log hours with proof, track funds and projects, work through consent steps, and print a practice certificate.",
  },
  {
    href: "/advisor",
    title: "Faculty advisor desk",
    body: "Review the same hour entries students submit and mark them verified in the preview.",
  },
  {
    href: "/admin",
    title: "National organizer desk",
    body: "See the claim queue, Active Standard monitor, announcements, CMS draft, impact report, and social queue.",
  },
  {
    href: "/shelter",
    title: "Shelter partner portal",
    body: "Post a sample mini-task and watch it appear on the public task board.",
  },
  {
    href: "/alumni",
    title: "Alumni mentor directory",
    body: "Browse the sample mentor list and send a practice mentorship request.",
  },
];

export default async function PrototypePage() {
  const user = await getSessionUser();

  return (
    <section className="paper-grid min-h-screen px-5 pb-24 pt-12 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="max-w-3xl">
          <p className="eyebrow w-fit">Prototype preview</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-6xl">
            A working preview, not a live PFC membership.
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            These workspaces are here so you can test the idea. Accounts and edits are real inside this
            preview, but the chapter data is sample data. Nothing is sent to a school, shelter, family, or
            national program.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border-2 border-border bg-surface p-5">
            <BadgeCheck aria-hidden className="h-5 w-5 text-sage-dark" />
            <h2 className="mt-3 font-display text-xl font-extrabold text-cocoa">What saves</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Workspace edits are stored in the preview database and survive a refresh or another device.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-border bg-surface p-5">
            <MailX aria-hidden className="h-5 w-5 text-rose" />
            <h2 className="mt-3 font-display text-xl font-extrabold text-cocoa">What does not happen</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              No email, text, payment, file upload, shelter request, or school verification is sent.
            </p>
          </div>
          <div className="rounded-2xl border-2 border-border bg-surface p-5">
            <LockKeyhole aria-hidden className="h-5 w-5 text-cocoa" />
            <h2 className="mt-3 font-display text-xl font-extrabold text-cocoa">What you need</h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              A preview account. No email is sent; save the one-time recovery code shown at sign-up.
            </p>
          </div>
        </div>

        {user ? (
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border-2 border-cocoa bg-mint p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-cocoa">
              Signed in as {user.name} · {roleLabel(user.role)}
            </p>
            <Link href="/account" className="button-paper min-h-0 px-4 py-2 text-xs">
              Account and sign out
            </Link>
          </div>
        ) : (
          <div className="mt-8 flex flex-col gap-3 rounded-2xl border-2 border-cocoa bg-blush/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-bold text-cocoa">
              Opening a workspace will ask for a preview account first. No email is sent.
            </p>
            <Link href="/login" className="button-primary min-h-0 px-4 py-2 text-xs">
              Create a preview account <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {workspaces.map((workspace) => (
            <Link
              key={workspace.href}
              href={workspace.href}
              className="sticker-card group block bg-surface-strong p-6 transition hover:-translate-y-0.5"
            >
              <p className="font-display text-2xl font-extrabold text-cocoa">{workspace.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted">{workspace.body}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-rose">
                Open preview <ArrowRight aria-hidden className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <p className="mt-8 max-w-3xl text-sm font-semibold leading-7 text-muted">
          The public site is the real front door. Chapter totals and stories are sample data until PFC
          publishes verified records. The application itself lives on the approved Google Form, not in
          this preview.
        </p>
      </div>
    </section>
  );
}

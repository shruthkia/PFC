"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, BadgeCheck, KeyRound, Mail } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";

const roles = [
  { id: "student", label: "Student leader", href: "/portal", hint: "Chapter hub for hours, funds, projects, consent" },
  { id: "advisor", label: "Faculty advisor", href: "/advisor", hint: "Verify and sign off student hours" },
  { id: "admin", label: "National organizer", href: "/admin", hint: "Claims, Active Standard, CMS, reports" },
  { id: "shelter", label: "Shelter partner", href: "/shelter", hint: "Broadcast needs to nearby chapters" },
  { id: "alumni", label: "Alumni mentor", href: "/alumni", hint: "Mentor directory and campus bridges" },
] as const;

export function LoginGate() {
  const router = useRouter();
  const [role, setRole] = useState<(typeof roles)[number]["id"]>("student");
  const [toast, setToast] = useState<string | null>(null);
  const selected = roles.find((item) => item.id === role)!;

  function magicLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setToast(`Magic link queued for ${String(new FormData(event.currentTarget).get("email"))} (demo). Entering ${selected.label}…`);
    window.setTimeout(() => {
      router.push(selected.href);
    }, 900);
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
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Chapter login</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Magic-link style sign-in tailored for student leaders, advisors, organizers, shelter partners, and alumni.
            </p>
          </div>
          <StatusPill tone="warn">Auth preview · no live IdP yet</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

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
                <h2 className="font-display text-2xl font-black text-cocoa">Email magic link</h2>
                <p className="mt-2 text-sm text-ink/65">We email a one-time link. Google Auth can be enabled per school district later.</p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={magicLink}>
              <Field label="School or work email">
                <input name="email" required type="email" className="form-control" placeholder="you@school.edu" />
              </Field>
              <button type="submit" className="button-primary w-full">
                <Mail className="h-4 w-4" /> Send magic link & enter {selected.label}
              </button>
            </form>
            <p className="mt-4 text-xs font-bold leading-5 text-cocoa/55">
              Preview shortcut: the button also opens the matching workspace so reviewers can walk every surface without inbox access.
            </p>
            <div className="mt-6 grid gap-2">
              {roles.map((item) => (
                <Link key={item.id} href={item.href} className="text-sm font-black text-rose underline decoration-2 underline-offset-4">
                  Skip to {item.label}
                </Link>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}

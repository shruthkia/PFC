"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Check, PenLine, ShieldCheck } from "lucide-react";
import { Panel, ProgressBar, StatusPill } from "@/components/platform/ui";
import { hourEntries as seedHours, type HourEntry } from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";
import { HOURS_QUALIFICATION } from "@/lib/qualification";

export function AdvisorDesk({ advisorName = "Ms. Rivera" }: { advisorName?: string }) {
  const [hours, setHours] = useStoredState<HourEntry[]>(storageKeys.hours, seedHours);
  const [toast, setToast] = useState<string | null>(null);

  const waiting = hours.filter((row) => row.status === "Advisor review");
  const verified = hours.filter((row) => row.status === "Verified");
  const waitingHours = waiting.reduce((total, row) => total + row.hours, 0);
  const verifiedHours = verified.reduce((total, row) => total + row.hours, 0);
  const totalHours = waitingHours + verifiedHours;
  const progress = totalHours ? Math.round((verifiedHours / totalHours) * 100) : 0;

  function sign(id: string) {
    setHours((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Verified" } : item)),
    );
    setToast("Marked verified in the preview. It updates preview certificates and totals only.");
    window.setTimeout(() => setToast(null), 4200);
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Link
          href="/account"
          className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose"
        >
          <ArrowLeft aria-hidden className="h-4 w-4" /> Account
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow w-fit">Faculty advisor</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">
              Advisor dashboard
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              {advisorName} verifies the same hour log students submit in the chapter hub. Signing an entry
              makes it count toward certificates and network totals.
            </p>
          </div>
          <StatusPill tone="info">Signed in · {advisorName}</StatusPill>
        </div>

        {toast ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
          >
            <BadgeCheck aria-hidden className="h-5 w-5" /> {toast}
          </div>
        ) : null}

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-border bg-surface-strong p-4">
            <p className="text-[.65rem] font-black uppercase tracking-[.13em] text-muted">Waiting on you</p>
            <p className="mt-1 font-display text-3xl font-black text-cocoa">{waitingHours} hrs</p>
            <p className="mt-1 text-xs font-semibold text-muted">{waiting.length} entries</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-strong p-4">
            <p className="text-[.65rem] font-black uppercase tracking-[.13em] text-muted">Verified</p>
            <p className="mt-1 font-display text-3xl font-black text-cocoa">{verifiedHours} hrs</p>
            <p className="mt-1 text-xs font-semibold text-muted">Chapter-wide this semester</p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-strong p-4">
            <p className="text-[.65rem] font-black uppercase tracking-[.13em] text-muted">Verification</p>
            <p className="mt-1 font-display text-3xl font-black text-cocoa">{progress}%</p>
            <p className="mt-1 text-xs font-semibold text-muted">Of submitted hours</p>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Panel>
            <h2 className="font-display text-2xl font-black text-cocoa">Verification queue</h2>
            <p className="mt-2 text-sm text-muted">
              Check attendance and proof, then sign. Anything you sign shows as verified in the student&apos;s
              hub immediately.
            </p>
            {waiting.length ? (
              <ul className="mt-5 space-y-3">
                {waiting.map((item) => (
                  <li key={item.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-black text-cocoa">{item.student}</p>
                        <p className="mt-1 text-sm text-muted">
                          {item.activity} · {item.hours} hrs · {item.date}
                        </p>
                        {item.note ? (
                          <p className="mt-2 text-sm leading-6 text-muted">{item.note}</p>
                        ) : null}
                        <p className="mt-2 text-xs font-bold text-muted">
                          Proof: {item.proof.length ? item.proof.join(", ") : "none attached"}
                        </p>
                      </div>
                      <StatusPill tone="warn">Awaiting signature</StatusPill>
                    </div>
                    <button
                      type="button"
                      className="button-primary mt-4 min-h-0 px-4 py-2 text-xs"
                      onClick={() => sign(item.id)}
                    >
                      <PenLine aria-hidden className="h-3.5 w-3.5" /> Sign off {item.hours} hrs
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 rounded-2xl border border-dashed border-border bg-cream p-4 text-sm font-semibold text-muted">
                Nothing waiting. Every submitted entry has been reviewed.
              </p>
            )}

            <h3 className="mt-8 font-display text-xl font-black text-cocoa">Verified entries</h3>
            <ul className="mt-3 space-y-2">
              {verified.map((item) => (
                <li
                  key={item.id}
                  className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border bg-white px-4 py-3 text-sm"
                >
                  <span className="font-bold text-cocoa">
                    {item.student} · {item.activity}
                  </span>
                  <span className="flex items-center gap-2 text-xs font-black text-muted">
                    <Check aria-hidden className="h-4 w-4 text-sage-dark" />
                    {item.hours} hrs signed
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <div className="space-y-6">
            <Panel tone="butter">
              <div className="flex items-start gap-3">
                <ShieldCheck aria-hidden className="mt-1 h-6 w-6 text-cocoa" />
                <div>
                  <h2 className="font-display text-2xl font-black text-cocoa">Sign-off checklist</h2>
                  <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-cocoa">
                    <li>Confirm the student attended the listed activity.</li>
                    <li>Check that proof does not expose minors without permission.</li>
                    <li>Sign only hours your school will stand behind.</li>
                    <li>Unsigned claims cannot reach public network totals.</li>
                  </ul>
                </div>
              </div>
            </Panel>
            <Panel>
              <h2 className="font-display text-2xl font-black text-cocoa">Where these hours go</h2>
              <ol className="mt-4 space-y-3 text-sm leading-6 text-muted">
                <li>1. Student logs the work with proof in the chapter hub.</li>
                <li>2. You verify it here.</li>
                <li>3. Verified hours feed the student&apos;s certificate.</li>
                <li>4. HQ reviews the claim before public totals change.</li>
              </ol>
              <p className="mt-4 rounded-xl border-2 border-cocoa bg-blush/50 p-3 text-xs font-bold leading-5 text-cocoa">
                {HOURS_QUALIFICATION}
              </p>
              <ProgressBar value={progress} label="Chapter verification progress" />
              <div className="mt-5 flex flex-wrap gap-4 text-sm font-black">
                <Link href="/" className="text-rose underline decoration-2 underline-offset-4">
                  Public site
                </Link>
                <Link href="/account" className="text-rose underline decoration-2 underline-offset-4">
                  Account & sign out
                </Link>
              </div>
            </Panel>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, PenLine } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { advisorQueue } from "@/lib/platform-data";

export function AdvisorDesk() {
  const [queue, setQueue] = useState(advisorQueue.map((item) => ({ ...item, status: "Awaiting signature" as string })));
  const [toast, setToast] = useState<string | null>(null);

  function sign(id: string) {
    setQueue((current) => current.map((item) => (item.id === id ? { ...item, status: "Signed off" } : item)));
    setToast("Hours electronically signed and sent to HQ claim review.");
    window.setTimeout(() => setToast(null), 4000);
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Link href="/portal" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Back to chapter hub
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow w-fit">Faculty advisor</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Advisor dashboard</h1>
            <p className="mt-3 max-w-2xl text-ink/65">Review student hours, verify proof, and electronically sign off before final submission.</p>
          </div>
          <StatusPill tone="info">Ms. Rivera · Coppell HS</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <Panel>
            <h2 className="font-display text-2xl font-black text-cocoa">Verification queue</h2>
            <ul className="mt-5 space-y-3">
              {queue.map((item) => (
                <li key={item.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{item.student}</p>
                      <p className="mt-1 text-sm text-cocoa/65">{item.activity} · {item.hours} hrs · {item.date}</p>
                      <p className="mt-2 text-xs font-bold text-cocoa/50">Proof: {item.proof}</p>
                    </div>
                    <StatusPill tone={item.status === "Signed off" ? "good" : "warn"}>{item.status}</StatusPill>
                  </div>
                  {item.status !== "Signed off" ? (
                    <button type="button" className="button-primary mt-4 min-h-0 px-4 py-2 text-xs" onClick={() => sign(item.id)}>
                      <PenLine className="h-3.5 w-3.5" /> Sign off hours
                    </button>
                  ) : null}
                </li>
              ))}
            </ul>
          </Panel>
          <Panel tone="butter">
            <h2 className="font-display text-2xl font-black text-cocoa">Advisor checklist</h2>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-cocoa">
              <li>Confirm the student attended the listed activity.</li>
              <li>Check that proof does not expose minors without permission.</li>
              <li>Sign only hours your school will stand behind.</li>
              <li>Unsigned claims cannot reach public network totals.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

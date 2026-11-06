"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import type { PublicNetwork } from "@/lib/platform-data";

export function ImpactReport({
  network,
  audience,
  semester,
  scope = "All active chapters",
  generatedAt,
}: {
  network: PublicNetwork;
  audience: string;
  semester: string;
  scope?: string;
  generatedAt: string;
}) {
  const scoped = network.records.filter((record) => {
    if (scope === "DFW only") return record.region === "DFW";
    if (scope === "Coppell Paws only") return record.chapterId === "coppell";
    return true;
  });

  const toys = scoped.reduce((total, record) => total + record.toysMade, 0);
  const toyValue = scoped.reduce((total, record) => total + record.toyValue, 0);
  const funds = scoped.reduce((total, record) => total + record.fundsRaised, 0);
  const confirmedNotes = Array.from(
    new Set(
      scoped
        .map((record) => record.confirmedNote)
        .filter((note): note is string => Boolean(note)),
    ),
  );
  const hours = scoped.reduce((total, record) => total + record.verifiedHours, 0);
  const projects = scoped.reduce((total, record) => total + record.projectsApproved, 0);
  const members = scoped.reduce((total, record) => total + record.members, 0);

  return (
    <div className="mx-auto max-w-[900px] px-5 pb-20 pt-28 sm:px-8">
      <div className="no-print flex flex-wrap items-center justify-between gap-3">
        <Link href="/impact" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Back to impact board
        </Link>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="button-primary min-h-0 px-4 py-2 text-xs" onClick={() => window.print()}>
            <Printer aria-hidden className="h-3.5 w-3.5" /> Print / save as PDF
          </button>
        </div>
      </div>

      <article className="print-report mt-6 rounded-[1.5rem] border-2 border-cocoa bg-white p-7 shadow-sketch sm:p-10">
        <header className="border-b-2 border-cocoa pb-5">
          <p className="font-hand text-2xl font-bold text-rose">PawsForCause</p>
          <h1 className="mt-2 font-display text-4xl font-black tracking-tight text-cocoa">
            {semester} impact report
          </h1>
          <p className="mt-2 text-sm font-bold text-muted">
            Prepared for: {audience} · {scope}
          </p>
          <p className="mt-1 text-xs font-semibold text-muted">
            Generated {generatedAt} from confirmed chapter records and portal entries.
          </p>
        </header>

        <section className="mt-6">
          <h2 className="font-display text-2xl font-black text-cocoa">At a glance</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {[
              [String(scoped.length), "chapters"],
              [String(toys), "toys donated"],
              [`$${toyValue.toLocaleString()}`, "toy value"],
              [`$${funds}`, "funds raised"],
              [String(hours), "verified hours"],
              [String(members), "members"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border-2 border-cocoa bg-cream p-3">
                <dt className="text-[.6rem] font-black uppercase tracking-[.12em] text-muted">{label}</dt>
                <dd className="mt-1 font-display text-2xl font-black text-cocoa">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs font-semibold leading-5 text-muted">
            Totals combine confirmed completed work with what chapters entered in their portal:
            advisor-verified hours, HQ-approved funds, and approved project records. Chapters with no
            entries show zero.
          </p>
          {confirmedNotes.length ? (
            <p className="mt-2 text-xs font-bold text-cocoa">{confirmedNotes.join(" ")}</p>
          ) : null}
        </section>

        <section className="mt-8">
          <h2 className="font-display text-2xl font-black text-cocoa">Chapter detail</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <caption className="sr-only">Verified activity by chapter</caption>
              <thead>
                <tr className="border-b-2 border-cocoa text-[.65rem] uppercase tracking-[.12em] text-muted">
                  <th scope="col" className="py-2 pr-3">Chapter</th>
                  <th scope="col" className="py-2 pr-3">Location</th>
                  <th scope="col" className="py-2 pr-3">Toys</th>
                  <th scope="col" className="py-2 pr-3">Funds</th>
                  <th scope="col" className="py-2 pr-3">Projects</th>
                  <th scope="col" className="py-2">Hours</th>
                </tr>
              </thead>
              <tbody>
                {scoped.map((record) => (
                  <tr key={record.chapterId} className="border-b border-border">
                    <th scope="row" className="py-2 pr-3 font-bold text-cocoa">{record.chapterName}</th>
                    <td className="py-2 pr-3 text-muted">
                      {record.city}, {record.country}
                    </td>
                    <td className="py-2 pr-3 text-cocoa">{record.toysMade}</td>
                    <td className="py-2 pr-3 text-cocoa">${record.fundsRaised}</td>
                    <td className="py-2 pr-3 text-cocoa">{record.projectsApproved}</td>
                    <td className="py-2 text-cocoa">{record.verifiedHours}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t-2 border-cocoa font-black text-cocoa">
                  <th scope="row" className="py-2 pr-3">Total</th>
                  <td className="py-2 pr-3">{scoped.length} chapters</td>
                  <td className="py-2 pr-3">{toys}</td>
                  <td className="py-2 pr-3">${funds}</td>
                  <td className="py-2 pr-3">{projects}</td>
                  <td className="py-2">{hours}</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </section>

        <section className="mt-8 grid gap-5 sm:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-black text-cocoa">What this report counts</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Confirmed completed work supplied by the chapter.</li>
              <li>Toys recorded on projects approved by HQ.</li>
              <li>Funds from approved claims tied to a named shelter or supply list.</li>
              <li>Hours signed off by a chapter advisor.</li>
              <li>Projects reviewed and approved after the work was finished.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-cocoa">How to read these numbers</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Every number is a confirmed chapter record or a portal entry, not a site-wide estimate.</li>
              <li>Only advisor-signed hours are reported.</li>
              <li>PFC can document participation. Schools and shelters decide whether hours are accepted.</li>
              <li>Pending or rejected entries are not counted in public totals.</li>
              <li>Chapters with no approved entries show zero.</li>
            </ul>
          </div>
        </section>

        <footer className="mt-10 border-t-2 border-cocoa pt-4 text-xs font-semibold text-muted">
          <p>
            Questions about this report: hello@pawsforcause.org · PawsForCause is a student-led
            animal-welfare network. Adopurr is a separate product.
          </p>
        </footer>
      </article>
    </div>
  );
}

"use client";

import Link from "next/link";
import { ArrowLeft, Printer } from "lucide-react";
import { chapters, networkMetrics } from "@/lib/platform-data";

export function ImpactReport({
  audience,
  semester,
  scope = "All active chapters",
}: {
  audience: string;
  semester: string;
  scope?: string;
}) {
  const scoped =
    scope === "DFW only"
      ? chapters.filter((chapter) => chapter.region === "DFW")
      : scope === "Coppell Paws only"
        ? chapters.filter((chapter) => chapter.id === "coppell")
        : chapters;

  const toys = scoped.reduce((total, chapter) => total + chapter.toys, 0);
  const funds = scoped.reduce((total, chapter) => total + chapter.funds, 0);
  const hours = scoped.reduce((total, chapter) => total + chapter.hours, 0);
  const projects = scoped.reduce((total, chapter) => total + chapter.projects, 0);
  const members = scoped.reduce((total, chapter) => total + chapter.members, 0);

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
            Generated {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}{" "}
            from advisor-verified chapters.
          </p>
        </header>

        <section className="mt-6">
          <h2 className="font-display text-2xl font-black text-cocoa">At a glance</h2>
          <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {[
              [String(scoped.length), "chapters"],
              [String(toys), "toys donated"],
              [`$${funds}`, "funds raised"],
              [String(hours), "service hours"],
              [String(members), "members"],
            ].map(([value, label]) => (
              <div key={label} className="rounded-xl border-2 border-cocoa bg-cream p-3">
                <dt className="text-[.6rem] font-black uppercase tracking-[.12em] text-muted">{label}</dt>
                <dd className="mt-1 font-display text-2xl font-black text-cocoa">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-xs font-semibold leading-5 text-muted">
            Network-wide verified totals: {networkMetrics.toysDonated} toys (about $
            {networkMetrics.toyValueUsd.toLocaleString()} value), ${networkMetrics.fundsRaised} raised across{" "}
            {networkMetrics.countries} countries. Toy value is an estimate, not a cash figure.
          </p>
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
                {scoped.map((chapter) => (
                  <tr key={chapter.id} className="border-b border-border">
                    <th scope="row" className="py-2 pr-3 font-bold text-cocoa">{chapter.name}</th>
                    <td className="py-2 pr-3 text-muted">
                      {chapter.city}, {chapter.country}
                    </td>
                    <td className="py-2 pr-3 text-cocoa">{chapter.toys}</td>
                    <td className="py-2 pr-3 text-cocoa">${chapter.funds}</td>
                    <td className="py-2 pr-3 text-cocoa">{chapter.projects}</td>
                    <td className="py-2 text-cocoa">{chapter.hours}</td>
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
            <h2 className="font-display text-2xl font-black text-cocoa">What the work looked like</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Scrap-to-toy workshops with school fashion departments.</li>
              <li>Shelter supply sorting, wishlist drives, and kennel laundry shifts.</li>
              <li>Responsible-adoption and sterilization education tables.</li>
              <li>Student-made flyers and photo sets that shelters actually used.</li>
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-black text-cocoa">How to read these numbers</h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
              <li>Only advisor-signed hours are reported.</li>
              <li>PFC can document participation. Schools and shelters decide whether hours are accepted.</li>
              <li>Funds are tied to a named shelter or supply list.</li>
              <li>Toy value is an estimated replacement cost.</li>
              <li>Paused chapters are excluded from active totals.</li>
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

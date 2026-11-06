"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import type { PublicRecord } from "@/lib/platform-data";

type Metric = "toys" | "funds" | "projects";

function metricValue(record: PublicRecord, metric: Metric) {
  if (metric === "funds") return record.fundsRaised;
  if (metric === "projects") return record.projectsApproved;
  return record.toysMade;
}

export function LeaderboardBoard({ records }: { records: PublicRecord[] }) {
  const [metric, setMetric] = useState<Metric>("toys");

  const ranked = [...records]
    .sort((a, b) => metricValue(b, metric) - metricValue(a, metric) || a.chapterName.localeCompare(b.chapterName))
    .map((record, index) => ({
      rank: index + 1,
      chapter: record.chapterName,
      city: record.city,
      rawValue: metricValue(record, metric),
      value: metric === "funds" ? `$${record.fundsRaised}` : String(metricValue(record, metric)),
      region: record.region ?? record.country,
    }));
  const hasScores = ranked.some((row) => row.rawValue > 0);

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow w-fit">Chapter standings</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">
              Inter-chapter leaderboards
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Rankings use confirmed completed work and approved portal records from each chapter.
            </p>
          </div>
          <StatusPill tone="info">Chapter standings</StatusPill>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Rank chapters by metric">
          {(
            [
              ["toys", "Toys donated"],
              ["funds", "Funds raised"],
              ["projects", "Projects done"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              aria-pressed={metric === key}
              onClick={() => setMetric(key)}
              className="tab-pill"
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8">
          <Panel>
            {hasScores ? (
              <ol className="space-y-3">
                {ranked.map((row) => (
                  <li
                    key={row.chapter}
                    className={`flex items-center gap-4 rounded-2xl border-2 border-cocoa p-4 ${
                      row.rank === 1 ? "bg-[#f4e3a6]" : row.rank === 2 ? "bg-[#ddd5ed]" : row.rank === 3 ? "bg-[#cfe1d2]" : "bg-cream"
                    }`}
                  >
                    <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-cocoa bg-white font-display text-xl font-extrabold text-cocoa">
                      {row.rank}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-display text-xl font-extrabold text-cocoa">{row.city}</p>
                      <p className="text-xs font-bold text-muted">
                        {row.chapter} · {row.region}
                      </p>
                    </div>
                    <p className="font-display text-2xl font-extrabold text-rose">{row.value}</p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="rounded-2xl border-2 border-dashed border-cocoa bg-cream p-5 text-sm font-semibold leading-6 text-muted">
                No chapter has an approved record for this yet. Standings appear when members log
                work and HQ approves it.
              </p>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

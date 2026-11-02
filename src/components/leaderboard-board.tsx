"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { chapters, leaderboardMonth } from "@/lib/platform-data";

type Metric = "hours" | "funds" | "projects";

export function LeaderboardBoard() {
  const [metric, setMetric] = useState<Metric>("hours");

  const ranked = [...chapters]
    .sort((a, b) => b[metric] - a[metric])
    .map((chapter, index) => ({
      rank: index + 1,
      chapter: chapter.name,
      value: metric === "funds" ? `$${chapter.funds.toLocaleString()}` : String(chapter[metric]),
      school: chapter.school,
      state: chapter.state,
    }));

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow w-fit">Friendly competition</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Inter-chapter leaderboards</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              High-visibility rankings for the most active chapters this month — hours, funds, and finished projects.
            </p>
          </div>
          <StatusPill tone="info">November 2026</StatusPill>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Leaderboard metric">
          {(
            [
              ["hours", "Most hours"],
              ["funds", "Funds raised"],
              ["projects", "Projects done"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={metric === key}
              onClick={() => setMetric(key)}
              className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-black ${
                metric === key ? "bg-rose text-white shadow-[3px_3px_0_#6e493b]" : "bg-white text-cocoa"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Panel>
            <ol className="space-y-3">
              {ranked.map((row) => (
                <li
                  key={row.chapter}
                  className={`flex items-center gap-4 rounded-2xl border-2 border-cocoa p-4 ${
                    row.rank === 1 ? "bg-[#f4e3a6]" : row.rank === 2 ? "bg-[#ddd5ed]" : row.rank === 3 ? "bg-[#cfe1d2]" : "bg-cream"
                  }`}
                >
                  <span className="grid h-12 w-12 place-items-center rounded-full border-2 border-cocoa bg-white font-display text-xl font-black text-cocoa">
                    {row.rank}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-display text-xl font-black text-cocoa">{row.chapter}</p>
                    <p className="text-xs font-bold text-cocoa/55">
                      {row.school} · {row.state}
                    </p>
                  </div>
                  <p className="font-display text-2xl font-black text-rose">{row.value}</p>
                </li>
              ))}
            </ol>
          </Panel>

          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <Trophy className="mt-1 h-6 w-6 text-rose" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Month badges</h2>
                <p className="mt-2 text-sm text-ink/65">Spotlight badges rotate with the public feed when claims clear HQ.</p>
              </div>
            </div>
            <ul className="mt-6 space-y-3">
              {leaderboardMonth.map((item) => (
                <li key={item.rank} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                  <p className="text-xs font-black uppercase tracking-[.14em] text-rose">#{item.rank} · {item.badge}</p>
                  <p className="mt-2 font-display text-xl font-black text-cocoa">{item.chapter}</p>
                  <p className="mt-1 text-sm font-bold text-cocoa/60">{item.metric}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { usePlatform } from "@/lib/platform-store";

type Metric = "toys" | "funds" | "projects" | "hours";

export function LeaderboardBoard() {
  const { chapters } = usePlatform();
  const [metric, setMetric] = useState<Metric>("toys");

  const ranked = [...chapters]
    .sort((a, b) => b[metric] - a[metric])
    .map((chapter, index) => ({
      rank: index + 1,
      chapter: chapter.name,
      city: chapter.city,
      value: metric === "funds" ? `$${chapter.funds}` : String(chapter[metric]),
      region: chapter.region ?? chapter.country,
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
            <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">
              Inter-chapter leaderboards
            </h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Live rankings from logged toys, funds, hours, and finished projects.
            </p>
          </div>
          <StatusPill tone="info">Updates when chapters log work</StatusPill>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Leaderboard metric">
          {(
            [
              ["toys", "Toys donated"],
              ["funds", "Funds raised"],
              ["hours", "Service hours"],
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

        <Panel className="mt-8">
          <ol className="space-y-3">
            {ranked.map((row) => (
              <li
                key={`${row.chapter}-${row.rank}`}
                className="flex items-center gap-4 rounded-2xl border-2 border-cocoa bg-cream p-4"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa bg-blush font-display text-lg font-black text-cocoa">
                  {row.rank <= 3 ? <Trophy className="h-4 w-4 text-rose" /> : row.rank}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-extrabold text-cocoa">{row.chapter}</p>
                  <p className="text-xs font-bold text-muted">
                    {row.city} · {row.region}
                  </p>
                </div>
                <p className="font-display text-2xl font-black text-cocoa">{row.value}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

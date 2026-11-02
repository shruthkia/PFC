"use client";

import Link from "next/link";
import { ArrowLeft, Target } from "lucide-react";
import { Panel, ProgressBar, StatTile, StatusPill } from "@/components/platform/ui";
import { announcements, networkMetrics } from "@/lib/platform-data";

export function ImpactBoard() {
  const toyPct = Math.round((networkMetrics.monthlyToysMade / networkMetrics.monthlyGoalToys) * 100);
  const fundPct = Math.round((networkMetrics.fundsRaised / networkMetrics.semesterFundGoal) * 100);

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Network-wide aggregator</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Impact & fundraising bars</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Global counters and visual trackers for network goals — only verified claims feed these totals.
            </p>
          </div>
          <StatusPill tone="good">Live preview totals</StatusPill>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile value={networkMetrics.hoursLogged.toLocaleString()} label="Hours logged" note="Advisor + HQ verified" tone="blush" />
          <StatTile value={`$${(networkMetrics.fundsRaised / 1000).toFixed(1)}k`} label="Funds raised" note="Semester to date" tone="butter" />
          <StatTile value={String(networkMetrics.sheltersHelped)} label="Shelters helped" note="Partnered locations" tone="mint" />
          <StatTile value={String(networkMetrics.animalsSupported)} label="Animals supported" note="Documented project reach" tone="lilac" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-6 w-6 text-rose" />
              <div className="flex-1">
                <h2 className="font-display text-2xl font-black text-cocoa">November enrichment challenge</h2>
                <p className="mt-2 text-sm text-ink/65">
                  {networkMetrics.monthlyToysMade.toLocaleString()} / {networkMetrics.monthlyGoalToys.toLocaleString()} toys before Thanksgiving
                </p>
                <div className="mt-5">
                  <ProgressBar value={toyPct} label="Network toy goal" />
                </div>
              </div>
            </div>
          </Panel>
          <Panel tone="butter">
            <h2 className="font-display text-2xl font-black text-cocoa">Semester fundraising goal</h2>
            <p className="mt-2 text-sm text-ink/65">
              ${networkMetrics.fundsRaised.toLocaleString()} of ${networkMetrics.semesterFundGoal.toLocaleString()} for shelter medical & supplies
            </p>
            <div className="mt-5">
              <ProgressBar value={fundPct} label="Semester fund goal" />
            </div>
          </Panel>
        </div>

        <Panel className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-black text-cocoa">Public announcements</h2>
              <p className="mt-2 text-sm text-ink/65">Posted from the national CMS without a redeploy.</p>
            </div>
            <Link href="/admin" className="text-sm font-black text-rose underline decoration-2 underline-offset-4">
              Open CMS in admin
            </Link>
          </div>
          <ul className="mt-6 space-y-3">
            {announcements.map((post) => (
              <li key={post.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-xl font-black text-cocoa">{post.title}</p>
                  <StatusPill tone="neutral">{post.audience}</StatusPill>
                </div>
                <p className="mt-2 text-sm leading-6 text-cocoa/70">{post.body}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[.12em] text-cocoa/45">{post.date}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

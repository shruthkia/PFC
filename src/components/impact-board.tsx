"use client";

import Link from "next/link";
import { ArrowLeft, Scissors, Target } from "lucide-react";
import { Panel, ProgressBar, StatTile, StatusPill } from "@/components/platform/ui";
import { announcements } from "@/lib/platform-data";
import { usePlatform } from "@/lib/platform-store";

export function ImpactBoard() {
  const { metrics } = usePlatform();
  const toyPct = Math.min(100, Math.round((metrics.toysDonated / metrics.toyGoal) * 100));
  const fundPct = Math.min(100, Math.round((metrics.fundsRaised / metrics.semesterFundGoal) * 100));

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Network impact</p>
            <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">
              Impact & fundraising
            </h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Live totals from chapter branches: scrap-to-toy donations, funds raised, and chapter count. Log work in the hub and watch these move.
            </p>
          </div>
          <StatusPill tone="good">{metrics.activeChapters} branches</StatusPill>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile value={`${metrics.toysDonated}`} label="Toys donated" note="Enrichment for shelters" tone="blush" />
          <StatTile value={`$${metrics.toyValueUsd.toLocaleString()}`} label="Toy value" note="Estimated donated value" tone="butter" />
          <StatTile value={`$${metrics.fundsRaised}`} label="Funds raised" note="To date" tone="mint" />
          <StatTile value={String(metrics.activeChapters)} label="Chapter branches" note={`${metrics.countries} countries`} tone="lilac" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <Scissors className="mt-1 h-6 w-6 text-rose" />
              <div className="flex-1">
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Scrap-to-toy workshops</h2>
                <p className="mt-2 text-sm text-ink/65">
                  {metrics.fashionPartnerNote}. {metrics.toysDonated} toys toward a near-term goal of {metrics.toyGoal}.
                </p>
                <div className="mt-5">
                  <ProgressBar value={toyPct} label="Toy donation progress" />
                </div>
              </div>
            </div>
          </Panel>
          <Panel tone="butter">
            <div className="flex items-start gap-3">
              <Target className="mt-1 h-6 w-6 text-cocoa" />
              <div className="flex-1">
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Funds raised so far</h2>
                <p className="mt-2 text-sm text-ink/65">
                  ${metrics.fundsRaised} of ${metrics.semesterFundGoal.toLocaleString()} semester goal for shelter supplies & medical support.
                </p>
                <div className="mt-5">
                  <ProgressBar value={fundPct} label="Semester fund goal" />
                </div>
              </div>
            </div>
          </Panel>
        </div>

        <Panel className="mt-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-cocoa">Public announcements</h2>
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
                  <p className="font-display text-lg font-extrabold text-cocoa">{post.title}</p>
                  <p className="text-xs font-bold text-muted">{post.date}</p>
                </div>
                <p className="mt-2 text-sm leading-6 text-ink/70">{post.body}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

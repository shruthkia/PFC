"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Scissors, Target } from "lucide-react";
import { Panel, ProgressBar, StatTile, StatusPill } from "@/components/platform/ui";
import {
  announcements as announcementSeed,
  networkMetrics,
  type AnnouncementRecord,
} from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";

export function ImpactBoard() {
  const toyPct = Math.min(100, Math.round((networkMetrics.toysDonated / networkMetrics.toyGoal) * 100));
  const fundPct = Math.min(100, Math.round((networkMetrics.fundsRaised / networkMetrics.semesterFundGoal) * 100));
  const [announcements] = useStoredState<AnnouncementRecord[]>(storageKeys.announcements, announcementSeed);

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Network impact</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">
              Impact &amp; fundraising
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Totals come from claims HQ approved, not from optimistic self-reporting. The dataset on this
              page is a November 2026 sample of 11 chapters.
            </p>
          </div>
          <StatusPill tone="good">{networkMetrics.activeChapters} branches</StatusPill>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatTile value={`${networkMetrics.toysDonated}+`} label="Toys donated" note="Enrichment for shelters" tone="blush" />
          <StatTile value={`$${networkMetrics.toyValueUsd.toLocaleString()}`} label="Toy value" note="Estimated donated value" tone="butter" />
          <StatTile value={`$${networkMetrics.fundsRaised}`} label="Funds raised" note="Verified claims only" tone="mint" />
          <StatTile value={String(networkMetrics.activeChapters)} label="Chapter branches" note={`${networkMetrics.countries} countries`} tone="lilac" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <Scissors aria-hidden className="mt-1 h-6 w-6 text-rose" />
              <div className="flex-1">
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Scrap-to-toy workshops</h2>
                <p className="mt-2 text-sm text-muted">
                  {networkMetrics.fashionPartnerNote}. {networkMetrics.toysDonated} toys toward a near-term
                  goal of {networkMetrics.toyGoal}.
                </p>
                <div className="mt-5">
                  <ProgressBar value={toyPct} label="Toy donation progress" />
                </div>
              </div>
            </div>
          </Panel>
          <Panel tone="butter">
            <div className="flex items-start gap-3">
              <Target aria-hidden className="mt-1 h-6 w-6 text-cocoa" />
              <div className="flex-1">
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Funds raised so far</h2>
                <p className="mt-2 text-sm text-muted">
                  ${networkMetrics.fundsRaised} of ${networkMetrics.semesterFundGoal.toLocaleString()} semester
                  goal for shelter supplies and medical support.
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
              <p className="mt-2 text-sm text-muted">
                Posted from the national CMS. New posts appear here for every visitor as soon as they are published.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/impact/report"
                className="inline-flex items-center gap-2 text-sm font-black text-rose underline decoration-2 underline-offset-4"
              >
                <FileText aria-hidden className="h-4 w-4" /> Printable report
              </Link>
              <Link
                href="/prototype"
                className="text-sm font-black text-rose underline decoration-2 underline-offset-4"
              >
                See the preview
              </Link>
            </div>
          </div>
          <ul className="mt-6 space-y-3">
            {announcements.map((post) => (
              <li key={post.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-display text-xl font-extrabold text-cocoa">{post.title}</p>
                  <StatusPill tone="neutral">{post.audience}</StatusPill>
                </div>
                <p className="mt-2 text-sm leading-6 text-muted">{post.body}</p>
                <p className="mt-3 text-xs font-black uppercase tracking-[.12em] text-muted">
                  {new Date(`${post.date}T12:00:00`).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

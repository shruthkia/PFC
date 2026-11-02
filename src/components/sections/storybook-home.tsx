"use client";

import Link from "next/link";
import { useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  MapPin,
  Scissors,
  ShieldCheck,
} from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { shelterTasks } from "@/lib/platform-data";
import { usePlatform } from "@/lib/platform-store";

export function StorybookHome() {
  const { chapters, metrics } = usePlatform();
  const toyPct = Math.min(100, Math.round((metrics.toysDonated / metrics.toyGoal) * 100));
  const branchRegions = useMemo(() => {
    const buckets: Record<string, typeof chapters> = {
      California: [],
      "DFW / Texas": [],
      Southeast: [],
      International: [],
      Other: [],
    };
    chapters.forEach((chapter) => {
      if (chapter.state === "CA") buckets.California.push(chapter);
      else if (chapter.region === "DFW" || chapter.state === "TX") buckets["DFW / Texas"].push(chapter);
      else if (["GA", "AL", "FL"].includes(chapter.state)) buckets.Southeast.push(chapter);
      else if (chapter.country !== "USA") buckets.International.push(chapter);
      else buckets.Other.push(chapter);
    });
    return Object.entries(buckets)
      .filter(([, list]) => list.length)
      .map(([label, list]) => ({ label, chapters: list }));
  }, [chapters]);

  return (
    <>
      {/* Hero: gingham scrapbook cover like the cafe refs */}
      <section className="gingham relative overflow-hidden border-b-2 border-border pt-16">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 mx-auto w-full max-w-xl lg:mx-0">
            <div className="menu-frame px-5 py-8 text-center sm:px-8 sm:py-12">
              <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-blush">
                <HouseMark className="h-12 w-14" priority />
              </div>
              <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-muted">Student animal-welfare network</p>
              <h1 className="mx-auto mt-4 max-w-full font-display text-[clamp(2.1rem,6.5vw,3.8rem)] font-extrabold leading-[1.08] tracking-[-0.02em] text-cocoa [overflow-wrap:anywhere]">
                <span className="block">PawsFor</span>
                <span className="block">Cause</span>
              </h1>
              <p className="mt-4 font-hand text-2xl font-semibold leading-snug text-rose sm:text-3xl">
                chapters · scrap toys · shelter tasks
              </p>
              <p className="mx-auto mt-5 max-w-md text-base leading-7 text-muted">
                High school branches that sew enrichment toys from fashion scraps, raise clean funds, and finish the mini-tasks shelters actually need.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link href="/apply" className="button-primary">
                  Start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
                </Link>
                <Link href="/directory" className="button-paper">
                  See our branches
                </Link>
              </div>
              <p className="mt-5 flex items-center justify-center gap-2 text-sm font-bold text-muted">
                <ShieldCheck aria-hidden className="h-4 w-4 text-sage-dark" />
                Light & dark modes · readable by design
              </p>
            </div>
          </div>

          <div className="relative z-10 mx-auto w-full max-w-md">
            <div className="scrap-card p-5 sm:p-7">
              <div className="flex items-end justify-between gap-3 border-b border-dashed border-border pb-4">
                <div>
                  <p className="font-hand text-2xl font-semibold text-rose">network so far</p>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted">Verified impact</p>
                </div>
                <span className="rounded-full border border-border bg-mint px-3 py-1 text-xs font-extrabold text-cocoa">live</span>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-3">
                <Stat value={`${metrics.toysDonated}`} label="toys donated" tone="bg-blush" />
                <Stat value={`$${metrics.toyValueUsd.toLocaleString()}`} label="toy value" tone="bg-butter" />
                <Stat value={`$${metrics.fundsRaised}`} label="funds raised" tone="bg-mint" />
                <Stat value={String(metrics.activeChapters)} label="chapter branches" tone="bg-[#e8dff3] dark:bg-[#33283a]" />
              </dl>
              <div className="mt-5 rounded-2xl border border-border bg-surface-strong p-4">
                <div className="flex items-start gap-3">
                  <Scissors aria-hidden className="mt-0.5 h-5 w-5 shrink-0 text-rose" />
                  <p className="text-sm font-semibold leading-6 text-cocoa">
                    Fashion departments turn fabric scraps into kennel enrichment toys.
                  </p>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex justify-between text-sm font-bold text-cocoa">
                    <span>Toward {metrics.toyGoal} toys</span>
                    <span className="font-hand text-lg text-rose">{toyPct}%</span>
                  </div>
                  <div
                    className="h-3.5 overflow-hidden rounded-full border border-border bg-background"
                    role="progressbar"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={toyPct}
                    aria-label="Toy donation progress"
                  >
                    <div className="h-full bg-rose" style={{ width: `${toyPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scallop-border" aria-hidden />
      </section>

      {/* Branches: menu-board layout */}
      <section className="bg-background px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="menu-frame p-6 sm:p-10">
            <div className="text-center">
              <span className="ribbon">Our branches</span>
              <h2 className="mx-auto mt-5 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">
                One org. {metrics.activeChapters} chapter homes.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                From DFW to Doha: same standard, local leadership. New applications bump this count live.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {branchRegions.map((region) => (
                <div key={region.label}>
                  <p className="ribbon mb-4">{region.label}</p>
                  <ul className="space-y-3">
                    {region.chapters.map((chapter) => (
                      <li key={chapter.id} className="flex items-start justify-between gap-3 border-b border-dashed border-border pb-3">
                        <div className="flex items-start gap-3">
                          <span className="mt-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-blush text-cocoa">
                            <MapPin className="h-4 w-4" aria-hidden />
                          </span>
                          <div>
                            <p className="font-extrabold text-cocoa">{chapter.city}</p>
                            <p className="text-sm text-muted">{chapter.name}</p>
                          </div>
                        </div>
                        <span className="shrink-0 text-xs font-extrabold uppercase tracking-[0.12em] text-sage-dark">
                          {chapter.status}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link href="/directory" className="button-primary">
                Open chapter map <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How it works: three clear steps */}
      <section className="border-y-2 border-border bg-blush/40 px-5 py-20 sm:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="ribbon">How it works</span>
            <h2 className="section-title mt-5">Claim a task. Finish it. Log it.</h2>
            <p className="section-copy mx-auto mt-4">
              Shelters post mini-tasks. Chapters complete them. Advisors verify. Public totals stay honest.
            </p>
          </div>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { n: "01", title: "Join a branch", body: "Apply with a student lead and faculty advisor. Launch in about 30 days." },
              { n: "02", title: "Pick a shelter task", body: "Sew scrap toys, sort supplies, assemble packets: clear jobs with a finish line." },
              { n: "03", title: "Report the work", body: "Log hours and proof. Advisor sign-off unlocks network totals and certificates." },
            ].map((step) => (
              <li key={step.n} className="sticker-card bg-surface-strong p-6">
                <p className="font-hand text-3xl font-semibold text-rose">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-cocoa">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Open tasks: workable list like a cafe menu */}
      <section className="bg-background px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ribbon">Open shelter tasks</span>
              <h2 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight text-cocoa [overflow-wrap:anywhere] sm:text-4xl">Ready for a chapter to claim</h2>
              <p className="mt-2 max-w-xl text-muted">Not animal listings: small completable jobs partners need done.</p>
            </div>
            <Link href="/adopt" className="button-paper">
              Full task board <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-10 divide-y divide-border rounded-[1.5rem] border-2 border-border bg-surface">
            {shelterTasks.slice(0, 4).map((task) => (
              <li key={task.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full border border-border bg-blush text-rose">
                    <ListChecks className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-extrabold text-cocoa">{task.title}</p>
                    <p className="mt-1 text-sm text-muted">
                      {task.shelter} · {task.city} · {task.effort}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:shrink-0">
                  {task.urgent ? (
                    <span className="rounded-full border border-rose/40 bg-blush px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-rose">
                      Urgent
                    </span>
                  ) : (
                    <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-extrabold uppercase tracking-[0.1em] text-muted">
                      Open
                    </span>
                  )}
                  <Link href="/adopt" className="button-primary min-h-0 px-3 py-2 text-xs">
                    Claim
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Workspaces: clear doors into real tools */}
      <section className="border-t-2 border-border bg-butter/30 px-5 py-20 sm:px-10">
        <div className="mx-auto max-w-[1100px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="ribbon">Workspaces</span>
            <h2 className="section-title mt-5">Built to use, not just browse</h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/portal", "Chapter hub", "Log hours, funds, scrap nights, consent, certificates"],
              ["/advisor", "Advisor desk", "Verify proof and e-sign student hours"],
              ["/admin", "National admin", "Claims, Active Standard, CMS, impact PDFs"],
              ["/shelter", "Shelter portal", "Post a mini-task to nearby branches"],
              ["/login", "Chapter login", "Magic-link preview into every workspace"],
              ["/impact", "Impact board", "85+ toys · $1,550 value · $400 funds"],
            ].map(([href, title, copy]) => (
              <Link key={href} href={href} className="sticker-card block bg-surface-strong p-5 transition hover:-translate-y-0.5">
                <p className="font-display text-xl font-extrabold text-cocoa">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold text-rose">
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-border bg-cocoa px-5 py-20 text-[var(--background)] sm:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="inline-flex rounded-full border border-current/30 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.16em]">
            There&apos;s room in the network
          </p>
          <h2 className="mx-auto mt-6 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-5xl">
            Your school can be the next branch.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 opacity-80">
            California · Texas · Alabama · Georgia · Qatar · India, and growing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="button-primary border-[var(--background)] bg-rose shadow-[3px_3px_0_rgba(255,246,239,0.35)]">
              Apply to start a chapter <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/directory" className="button-paper border-[var(--background)] bg-transparent text-[var(--background)] hover:bg-[var(--background)] hover:text-cocoa">
              Browse branches
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-75">
            <CheckCircle2 className="h-4 w-4" /> Use the sun/moon toggle anytime your eyes need a break
          </p>
        </div>
      </section>
    </>
  );
}

function Stat({ value, label, tone }: { value: string; label: string; tone: string }) {
  return (
    <div className={`rounded-2xl border border-border p-4 text-center ${tone}`}>
      <p className="font-display text-2xl font-extrabold text-cocoa">{value}</p>
      <p className="mt-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-muted">{label}</p>
    </div>
  );
}

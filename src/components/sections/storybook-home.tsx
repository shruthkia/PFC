import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ListChecks,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { HouseMark, PawPrint } from "@/components/brand/house-mark";
import { branchRegions, chapters, networkMetrics, type PublicNetwork } from "@/lib/platform-data";
import { studentOffer } from "@/lib/content";
import { HOURS_QUALIFICATION } from "@/lib/qualification";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export function StorybookHome({ network }: { network: PublicNetwork }) {
  const toyPct = Math.min(
    100,
    Math.round((network.totals.toysMade / Math.max(1, networkMetrics.toyGoal)) * 100),
  );

  return (
    <>
      {/* Hero: a cut-and-paste zine cover, not a signup card */}
      <section className="gingham relative overflow-hidden border-b-2 border-border pt-16">
        <PawPrint className="pointer-events-none absolute left-[4%] top-14 h-10 w-10 -rotate-12 text-rose/50 sm:h-14 sm:w-14" />
        <div className="relative mx-auto max-w-[1300px] px-5 pb-8 pt-10 sm:px-10 lg:pb-4">
          <div className="grid items-start gap-8 lg:grid-cols-[1.12fr_.88fr] lg:gap-4">
            <div className="relative z-10 pt-6 lg:pt-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="lede-sticker bg-butter">
                  <Sparkles aria-hidden className="h-4 w-4 text-rose" /> Student-led animal welfare
                </span>
                <span className="font-hand -rotate-2 text-2xl font-semibold text-rose">
                  no experience required
                </span>
              </div>

              <h1 className="mt-7 max-w-3xl break-words font-display text-[clamp(3.2rem,8.5vw,7rem)] font-extrabold leading-[.9] tracking-[-.045em] text-cocoa">
                Scrap fabric.
                <span className="my-1 block font-hand text-[.62em] font-semibold leading-[.95] text-rose">
                  Real shelter toys.
                </span>
                Students who show up.
              </h1>

              <p className="mt-6 max-w-xl text-base leading-7 text-muted sm:text-lg">
                PawsForCause is a high school chapter network that turns fashion scraps into kennel enrichment toys, raises clean funds, and finishes the small tasks shelters actually need.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href={CHAPTER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="button-primary"
                >
                  Apply to start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
                </a>
                <Link href="/directory" className="button-paper">
                  Meet the branches
                </Link>
              </div>

              <p className="mt-5 flex items-center gap-2 text-sm font-bold text-muted">
                <ShieldCheck aria-hidden className="h-4 w-4 text-sage-dark" />
                Free · current high school students · usually 1–3 hours a week
              </p>

              <p className="mt-8 flex items-center gap-2 font-hand text-2xl font-semibold text-cocoa">
                psst, there is room in the network
                <PawPrint className="h-5 w-5 text-rose" />
              </p>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[440px]">
              <div className="relative mx-auto w-[88%] -rotate-2 bg-surface p-3 pb-5 shadow-[7px_8px_0_rgba(92,67,56,0.22)] sm:w-[82%]">
                <span className="tape -top-3 left-8 -rotate-6" aria-hidden />
                <span className="tape -top-3 right-8 rotate-3" aria-hidden />
                <div className="grid aspect-[4/3] place-items-center bg-[#fff6ef] p-5">
                  <HouseMark className="h-auto w-full max-w-[260px]" priority />
                </div>
                <p className="mt-3 text-center font-hand text-xl font-semibold text-cocoa">
                  the chapter mascot has entered the chat
                </p>
              </div>



              <div className="mt-6 w-full -rotate-1 bg-surface p-4 shadow-[4px_5px_0_rgba(92,67,56,0.18)]">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-hand text-xl font-semibold text-rose">toy counter</p>
                  <span className="rounded-full border border-border bg-mint px-2 py-0.5 text-[.6rem] font-extrabold uppercase tracking-[.1em] text-cocoa">
                    {network.totals.chapters} chapters
                  </span>
                </div>
                <p className="mt-2 font-display text-3xl font-extrabold leading-none text-cocoa">
                  {network.totals.toysMade} toys
                </p>
                <div
                  className="mt-3 h-3 overflow-hidden rounded-full border border-border bg-background"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={toyPct}
                  aria-label="Toy donation progress"
                >
                  <div className="h-full bg-rose" style={{ width: `${toyPct}%` }} />
                </div>
                <div className="mt-1.5 flex justify-between text-[.65rem] font-bold text-muted">
                  <span>network total</span>
                  <span>{toyPct}% of {networkMetrics.toyGoal}</span>
                </div>
                {network.totals.toyValue > 0 ? (
                  <p className="mt-2 text-[.65rem] font-bold text-muted">
                    About ${network.totals.toyValue.toLocaleString()} in materials
                  </p>
                ) : null}
              </div>

              <div className="mx-auto mt-4 grid h-24 w-24 place-items-center gap-0.5 rounded-full border-2 border-cocoa bg-[#a8385d] p-3 text-center font-display text-[.68rem] font-extrabold uppercase leading-tight tracking-[.08em] text-[#fffaf4] shadow-[4px_5px_0_rgba(92,67,56,0.22)] sm:h-28 sm:w-28 sm:text-xs">
                <Sparkles className="h-4 w-4" aria-hidden />
                <span>100%<br />student-run</span>
              </div>
            </div>
          </div>


        </div>
        <div className="scallop-border" aria-hidden />
      </section>

      <div className="overflow-hidden border-b-2 border-border bg-butter/80 py-3" aria-hidden>
        <div className="marquee-track flex w-max">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-5 pr-5">
              {["scrap fabric", "kennel toys", "shelter tasks", "student hours", "do it again"].map((word) => (
                <span
                  key={`${copy}-${word}`}
                  className="flex items-center gap-5 whitespace-nowrap font-display text-sm font-extrabold uppercase tracking-[.16em] text-cocoa"
                >
                  {word}
                  <Sparkles className="h-4 w-4 text-rose" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* The offer, stated before the scrapbook details */}
      <section
        className="border-b-2 border-border bg-butter/35 px-5 py-14 sm:px-10"
        aria-labelledby="student-offer"
      >
        <div className="mx-auto grid max-w-[1100px] gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <span className="ribbon">The student offer</span>
            <h2
              id="student-offer"
              className="mt-4 font-display text-3xl font-extrabold tracking-tight text-cocoa sm:text-4xl"
            >
              Free, student-led, and sized for a school week.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-muted">
              If you are in high school and willing to run one real project, you do not need a budget or a
              perfect plan. HQ supplies the starting kit; your chapter supplies the people.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {studentOffer.map((item) => (
              <li
                key={item}
                className="flex gap-3 border-b border-dashed border-cocoa/20 pb-3 text-sm font-bold leading-6 text-cocoa"
              >
                <CheckCircle2 aria-hidden className="mt-1 h-4 w-4 shrink-0 text-sage-dark" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Branches: menu-board layout */}
      <section className="bg-background px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="relative py-2">
            <div className="text-center">
              <span className="ribbon">Our branches</span>
              <h2 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-5xl">
                One org. <span className="font-hand text-rose">{network.totals.chapters}</span> chapter homes.
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted">
                From DFW to Doha, same standard, local leadership.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {branchRegions.map((region) => (
                <div key={region.label}>
                  <p className="ribbon mb-4">{region.label}</p>
                  <ul className="space-y-3">
                    {region.chapters.map((name) => {
                      const chapter = chapters.find((c) => c.city === name);
                      return (
                        <li key={name} className="flex items-start justify-between gap-3 border-b border-dashed border-border pb-3">
                          <div className="flex items-start gap-3">
                            <span className="mt-1 grid h-8 w-8 place-items-center rounded-full border border-border bg-blush text-cocoa">
                              <MapPin className="h-4 w-4" aria-hidden />
                            </span>
                            <div>
                              <p className="font-extrabold text-cocoa">{name}</p>
                              <p className="text-sm text-muted">{chapter?.name ?? "PawsForCause chapter"}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-xs font-extrabold uppercase tracking-[0.12em] text-sage-dark">Active</span>
                        </li>
                      );
                    })}
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
            <h2 className="section-title mt-5">Claim a task. <span>Finish it.</span> Log it.</h2>
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
              <li key={step.n} className="relative border-t-2 border-dashed border-cocoa/30 pt-5">
                <p className="font-hand text-3xl font-semibold text-rose">{step.n}</p>
                <h3 className="mt-3 font-display text-2xl font-extrabold text-cocoa">{step.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
          <p className="mx-auto mt-8 max-w-2xl text-center text-sm font-semibold leading-6 text-muted">
            {HOURS_QUALIFICATION}
          </p>
        </div>
      </section>

      {/* Open tasks: workable list like a café menu */}
      <section className="bg-background px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ribbon">Shelter tasks</span>
              <h2 className="mt-4 font-display text-4xl font-extrabold text-cocoa"><span className="marker">Small jobs</span> a chapter could take on</h2>
              <p className="mt-2 max-w-xl text-muted">Live jobs from shelter partners. Claims happen inside the chapter workspace.</p>
            </div>
            <Link href="/adopt" className="button-paper">
              Open task board <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <ul className="mt-10 divide-y divide-border">
            {network.tasks.slice(0, 4).map((task) => (
              <li key={task.id} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
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
                    View
                  </Link>
                </div>
              </li>
            ))}
          </ul>
          {!network.tasks.length ? (
            <p className="mt-8 rounded-2xl border-2 border-dashed border-cocoa bg-white/70 p-5 text-sm font-semibold leading-6 text-muted">
              No shelter tasks are open right now. New jobs show up here when a partner posts one.
            </p>
          ) : null}
        </div>
      </section>

      {/* One account door, not a wall of public workspaces */}
      <section
        className="border-t-2 border-border bg-butter/30 px-5 py-16 sm:px-10"
        aria-labelledby="access-heading"
      >
        <div className="mx-auto flex max-w-[1100px] flex-col gap-6 border-y-2 border-dashed border-cocoa/25 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="max-w-2xl">
            <span className="ribbon">Chapter access</span>
            <h2 id="access-heading" className="mt-4 font-display text-3xl font-extrabold text-cocoa">
              One account. The desk for your role.
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Student, advisor, organizer, shelter, and alumni desks share one account system. Sign in
              to open the workspace tied to your role.
            </p>
          </div>
          <Link href="/login" className="button-primary shrink-0">
            Sign in to your chapter <ArrowRight aria-hidden className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="border-t-2 border-border bg-cocoa px-5 py-20 text-[var(--background)] sm:px-10">
        <div className="mx-auto max-w-[900px] text-center">
          <p className="inline-flex rounded-full border border-current/30 px-4 py-1 text-xs font-extrabold uppercase tracking-[0.16em]">
            There&apos;s room in the network
          </p>
          <h2 className="mt-6 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            Your school can be the next branch.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 opacity-80">
            California · Texas · Alabama · Georgia · Qatar · India, and growing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={CHAPTER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary border-[var(--background)] bg-rose shadow-[3px_3px_0_rgba(255,246,239,0.35)]"
            >
              Apply to start a chapter <ArrowRight className="h-4 w-4" />
            </a>
            <Link href="/directory" className="button-paper border-[var(--background)] bg-transparent text-[var(--background)] hover:bg-[var(--background)] hover:text-cocoa">
              Browse branches
            </Link>
          </div>
          <p className="mt-6 inline-flex items-center gap-2 text-sm font-semibold opacity-75">
            <CheckCircle2 className="h-4 w-4" /> Applications are read by student organizers, not a bot
          </p>
        </div>
      </section>
    </>
  );
}

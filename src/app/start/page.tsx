import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import {
  activeStandard,
  chapterRoles,
  communication,
  first30Days,
  journeySteps,
  lifecycle,
  participationTypes,
  presidentGets,
  safety,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "Start a PFC chapter",
  description:
    "How a PawsForCause chapter goes from interest form to Active, what a president actually receives, and the 30-day launch.",
  alternates: { canonical: "/start" },
};

export default function StartPage() {
  return (
    <>
      <PageHero
        kicker="Start a chapter"
        title="Fill the form. Then do the first real thing."
        lede="A PFC chapter is a high school team with a president, a small officer crew, and a habit of finishing work animals can feel. College chapters wait. Ghost chapters do not get counted."
      />

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="max-w-2xl">
            <span className="ribbon">The path</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
              From interest to Active, in plain language
            </h2>
          </div>
          <ol className="mt-9 grid gap-5 sm:grid-cols-2">
            {journeySteps.map((step, i) => (
              <li
                key={step.step}
                className={`sticker-card flex gap-4 p-6 ${i % 2 === 0 ? "bg-surface" : "bg-blush/45"}`}
              >
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border-2 border-border bg-butter/70 font-display text-lg font-extrabold text-cocoa">
                  {step.step}
                </span>
                <div>
                  <h3 className="font-display text-xl font-extrabold text-cocoa">{step.title}</h3>
                  <p className="mt-1 text-sm leading-7 text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-y-2 border-border bg-butter/30 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="menu-frame p-6 sm:p-9">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="font-hand text-2xl font-semibold text-rose">the words HQ uses</p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
                  Status, defined
                </h2>
              </div>
              <p className="max-w-sm text-sm leading-7 text-muted">
                Lead is interest. Active is work plus a pulse. We will not mix those in a public count.
              </p>
            </div>
            <dl className="mt-6 divide-y divide-dashed divide-border">
              {lifecycle.map((item) => (
                <div key={item.name} className="grid gap-1 py-3.5 sm:grid-cols-[220px_1fr] sm:gap-4">
                  <dt className="font-display font-extrabold text-cocoa">{item.name}</dt>
                  <dd className="text-sm leading-6 text-muted">{item.meaning}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1150px] gap-8 lg:grid-cols-2">
          <div className="scrap-card bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa sm:text-3xl">Who sits in the house</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              President is required. Three to five officers is the usual. Six permanent officers is the
              ceiling. Extra ownership goes to temporary Project Leads. Tiny chapters combine jobs.
            </p>
            <ul className="mt-6 space-y-4">
              {chapterRoles.map((item) => (
                <li key={item.role} className="border-b border-dashed border-border pb-4 last:border-0 last:pb-0">
                  <p className="font-display text-lg font-extrabold text-cocoa">{item.role}</p>
                  <p className="mt-0.5 text-sm leading-6 text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="scrap-card bg-mint/50 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa sm:text-3xl">
              What the president actually gets
            </h2>
            <ul className="mt-6 space-y-4">
              {presidentGets.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-7 text-muted">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sage-dark" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-border bg-blush/35 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="max-w-2xl">
            <span className="ribbon">Month one</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
              The 30-day launch
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              First meaningful activity inside 30 days. Ideally 21. A scheduled event with a date on the
              school calendar counts as &ldquo;firmly scheduled.&rdquo; A vibe does not.
            </p>
          </div>
          <ol className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {first30Days.map((week) => (
              <li key={week.w} className="sticker-card bg-surface p-5">
                <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-rose">{week.w}</p>
                <p className="mt-3 text-sm leading-7 text-muted">{week.task}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="max-w-2xl">
            <span className="ribbon">The floor</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">The Active standard</h2>
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {activeStandard.map((line) => (
              <li key={line} className="flex gap-3 rounded-[1.4rem] border-2 border-border bg-surface p-5 text-sm leading-7 text-muted">
                <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose" />
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t-2 border-border bg-butter/30 px-5 py-16 sm:px-10">
        <div className="mx-auto max-w-[1150px]">
          <div className="max-w-2xl">
            <span className="ribbon">Three doors</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa">Ways to be in the network</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              We never mash these together when we talk about chapter counts.
            </p>
          </div>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {participationTypes.map((item, i) => (
              <article key={item.name} className={`sticker-card p-6 ${i === 0 ? "bg-surface" : i === 1 ? "bg-mint/55" : "bg-blush/45"}`}>
                <h3 className="font-display text-xl font-extrabold text-cocoa">{item.name}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-border bg-background px-5 py-16 sm:px-10">
        <div className="mx-auto grid max-w-[1150px] gap-8 lg:grid-cols-2">
          <div className="scrap-card bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa">How we talk</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{communication.discord}</p>
            <p className="mt-4 text-sm leading-7 text-muted">{communication.autonomy}</p>
          </div>
          <div className="scrap-card bg-blush/50 p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa">
              Safety, because animals are not the only ones in the room
            </h2>
            <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
              {safety.map((line) => (
                <li key={line} className="flex gap-3">
                  <span aria-hidden className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ApplyBand
        title="Ready to found"
        body="The interest form is the Lead step. After that HQ sends resources and the registration path. Mentors exist when we have someone who just launched and can walk with you for 30 days without doing your homework."
      />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { PawTrail } from "@/components/brand/animal-doodles";
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
};

export default function StartPage() {
  return (
    <>
      <PageHero
        kicker="Start a chapter"
        title="Fill the form. Then do the first real thing."
        lede="A PFC chapter is a high school team with a president, a small officer crew, and a habit of finishing work animals can feel. College chapters wait. Ghost chapters do not get counted."
        dark
      />

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">The path, in plain language</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {journeySteps.map((step) => (
              <article key={step.step} className="border-2 border-foreground p-6">
                <p className="font-mono text-xs text-pink-hot">{step.step}</p>
                <h3 className="mt-2 font-display text-2xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-cream px-4 py-16 dark:bg-card sm:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">Status words HQ actually uses</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            Lead is interest. Active is work plus a pulse. We will not mix those in a public count.
          </p>
          <ol className="mt-8 grid gap-3 sm:grid-cols-2">
            {lifecycle.map((item) => (
              <li key={item.name} className="flex gap-4 border-b border-border pb-3">
                <span className="w-36 shrink-0 font-display font-semibold">{item.name}</span>
                <span className="text-sm text-muted">{item.meaning}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Who sits in the house</h2>
            <p className="mt-3 text-sm text-muted">
              President is required. Three to five officers is the usual. Six permanent officers is
              the ceiling. Extra ownership goes to temporary Project Leads. Tiny chapters combine jobs.
            </p>
            <ul className="mt-8 space-y-5">
              {chapterRoles.map((item) => (
                <li key={item.role}>
                  <p className="font-display text-lg font-semibold">{item.role}</p>
                  <p className="text-sm text-muted">{item.note}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">What the president actually gets</h2>
            <ul className="mt-8 space-y-4">
              {presidentGets.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span className="mt-1 text-orange-hot" aria-hidden>
                    ▸
                  </span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 max-w-xs text-pink-hot/80">
              <PawTrail />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-brown-dark px-4 py-16 text-cream sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">Month one</h2>
          <p className="mt-3 max-w-xl text-brown-soft">
            First meaningful activity inside 30 days. Ideally 21. A scheduled event with a date on
            the school calendar counts as &quot;firmly scheduled.&quot; A vibe does not.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {first30Days.map((week) => (
              <article key={week.w} className="border border-brown-soft/30 p-5">
                <p className="font-mono text-sm text-pink-hot">{week.w}</p>
                <p className="mt-3 text-sm leading-relaxed text-brown-soft">{week.task}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">The Active floor</h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {activeStandard.map((line) => (
              <li key={line} className="border-2 border-foreground bg-cream p-5 text-sm leading-relaxed dark:bg-card">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">Three ways to be in the network</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            We never mash these together when we talk about chapter counts.
          </p>
          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {participationTypes.map((item) => (
              <article key={item.name} className="border-2 border-foreground p-6">
                <h3 className="font-display text-xl font-bold">{item.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-cream px-4 py-16 dark:bg-card sm:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">How we talk</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{communication.discord}</p>
            <p className="mt-4 text-sm leading-relaxed text-muted">{communication.autonomy}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">Safety, because animals are not the only ones in the room</h2>
            <ul className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
              {safety.map((line) => (
                <li key={line}>{line}</li>
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

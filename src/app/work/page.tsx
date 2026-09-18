import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { DogDoodle } from "@/components/brand/animal-doodles";
import {
  activityLanes,
  campaignFocus,
  fundraisingNotes,
  hourLogging,
  memberValue,
  projectIdeas,
  reporting,
  volunteerHours,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "The work",
  description:
    "What PFC chapters actually do: shelter days, sterilization talk, volunteer hours, fundraising rules, and member roles.",
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="The work"
        title="Help the animal. Then write down what you did."
        lede="Good projects are useful to a kennel or a classroom and interesting enough that students will actually run them. If it only looks good on Instagram, pick again."
      />

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="font-display text-3xl font-bold">{campaignFocus.title}</h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-muted">{campaignFocus.body}</p>
            </div>
            <DogDoodle className="max-w-sm text-foreground/80" />
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {activityLanes.map((lane, i) => (
              <article key={lane.title} className="border-2 border-foreground p-6 sm:p-8">
                <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-pink-hot">
                  0{i + 1}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold">{lane.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{lane.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-brown-dark px-4 py-16 text-cream sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">What counts as hours</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {volunteerHours.map((item) => (
              <article key={item.title}>
                <h3 className="font-display text-xl font-bold text-orange">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-sm leading-relaxed text-brown-soft">
            <span className="font-semibold text-cream">{hourLogging.title}. </span>
            {hourLogging.body}
          </p>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">A menu, not a mandate</h2>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            HQ can send a monthly list of options. Your chapter still picks based on the shelter
            down the road and what your school will allow. Fifteen starting points:
          </p>
          <ol className="mt-8 columns-1 gap-8 sm:columns-2">
            {projectIdeas.map((idea, i) => (
              <li key={idea} className="mb-3 flex break-inside-avoid gap-3 text-sm text-muted">
                <span className="font-mono text-pink-hot">{String(i + 1).padStart(2, "0")}</span>
                <span>{idea}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-2xl font-bold">How fundraising works</h2>
            <ul className="mt-6 space-y-3">
              {fundraisingNotes.map((line) => (
                <li key={line} className="border-l-2 border-orange-hot pl-4 text-sm leading-relaxed text-muted">
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-2xl font-bold">{reporting.title}</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted">{reporting.body}</p>
            <h3 className="mt-10 font-display text-2xl font-bold">What members walk away with</h3>
            <ul className="mt-4 space-y-4">
              {memberValue.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold">{item.title}</p>
                  <p className="text-sm text-muted">{item.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ApplyBand title="Pick a project after you have a chapter, not before the form" />
    </>
  );
}

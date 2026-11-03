import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
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
import { networkMetrics } from "@/lib/platform-data";
import { HOURS_QUALIFICATION } from "@/lib/qualification";

export const metadata: Metadata = {
  title: "The work",
  description:
    "What PFC chapters actually do: shelter days, sterilization talk, volunteer hours, fundraising rules, and member roles.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <PageHero
        kicker="The work"
        title="Help the animal. Then write down what you did."
        lede="Good projects are useful to a kennel or a classroom and interesting enough that students will actually run them. If it only looks good on Instagram, pick again."
      />

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1150px] gap-8 lg:grid-cols-[1.15fr_.85fr] lg:items-center">
          <div>
            <span className="ribbon">North star</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
              {campaignFocus.title}
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-muted">{campaignFocus.body}</p>
          </div>
          <aside className="scrap-card bg-blush/60 p-6 sm:p-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-rose">What we&apos;ve done so far</p>
            <ul className="mt-4 space-y-3 text-sm font-bold leading-6 text-cocoa">
              <li className="flex justify-between gap-4 border-b border-dashed border-border pb-3">
                <span>Toys donated</span>
                <span className="shrink-0 font-display text-lg text-rose">{networkMetrics.toysDonated}+</span>
              </li>
              <li className="flex justify-between gap-4 border-b border-dashed border-border pb-3">
                <span>Toy value</span>
                <span className="shrink-0 font-display text-lg text-rose">
                  ${networkMetrics.toyValueUsd.toLocaleString()}
                </span>
              </li>
              <li className="flex justify-between gap-4 border-b border-dashed border-border pb-3">
                <span>Funds raised</span>
                <span className="shrink-0 font-display text-lg text-rose">${networkMetrics.fundsRaised}</span>
              </li>
              <li>{networkMetrics.fashionPartnerNote}</li>
            </ul>
            <Link
              href="/adopt"
              className="mt-5 inline-flex min-h-11 items-center text-sm font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa"
            >
              Browse open mini-tasks
            </Link>
          </aside>
        </div>

        <div className="mx-auto mt-12 grid max-w-[1150px] gap-5 md:grid-cols-2">
          {activityLanes.map((lane, i) => (
            <article
              key={lane.title}
              className={`sticker-card p-6 sm:p-8 ${i % 3 === 0 ? "bg-surface" : i % 3 === 1 ? "bg-butter/55" : "bg-mint/55"}`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-full border-2 border-border bg-surface-strong font-hand text-xl font-semibold text-rose">
                0{i + 1}
              </span>
              <h3 className="mt-3 font-display text-2xl font-extrabold text-cocoa">{lane.title}</h3>
              <p className="mt-2 text-sm leading-7 text-muted">{lane.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y-2 border-border bg-butter/35 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="max-w-2xl">
            <span className="ribbon">Hours</span>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
              What counts as hours
            </h2>
          </div>
          <div className="mt-9 grid gap-5 sm:grid-cols-2">
            {volunteerHours.map((item) => (
              <article key={item.title} className="rounded-[1.4rem] border-2 border-border bg-surface p-6">
                <h3 className="font-display text-xl font-extrabold text-cocoa">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl rounded-[1.4rem] border-2 border-dashed border-border bg-surface/80 p-5 text-sm leading-7 text-muted">
            <span className="font-extrabold text-cocoa">{hourLogging.title}. </span>
            {hourLogging.body}
          </p>
          <p className="mt-4 max-w-3xl rounded-[1.4rem] border-2 border-cocoa bg-blush/50 p-5 text-sm font-bold leading-7 text-cocoa">
            {HOURS_QUALIFICATION}
          </p>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="menu-frame p-6 sm:p-9">
            <div className="text-center">
              <p className="font-hand text-2xl font-semibold text-rose">fifteen starting points</p>
              <h2 className="mt-1 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
                A menu, not a mandate
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted">
                HQ can send a monthly list of options. Your chapter still picks based on the shelter down the
                road and what your school will allow.
              </p>
            </div>
            <ol className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {projectIdeas.map((idea, i) => (
                <li
                  key={idea}
                  className="flex break-inside-avoid items-start gap-3 border-b border-dashed border-border py-3 text-sm text-muted last:border-0"
                >
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-border bg-surface-strong text-[0.65rem] font-extrabold text-rose">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="leading-6">{idea}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-border bg-blush/30 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1150px] gap-8 lg:grid-cols-2">
          <div className="scrap-card bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa">How fundraising works</h2>
            <ul className="mt-5 space-y-3">
              {fundraisingNotes.map((line) => (
                <li key={line} className="flex gap-3 text-sm leading-7 text-muted">
                  <span aria-hidden className="mt-2 h-2 w-2 shrink-0 rounded-full bg-rose" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="scrap-card bg-surface p-6 sm:p-8">
            <h2 className="font-display text-2xl font-extrabold text-cocoa">{reporting.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted">{reporting.body}</p>
            <h3 className="mt-8 font-display text-xl font-extrabold text-cocoa">What members walk away with</h3>
            <ul className="mt-4 space-y-4">
              {memberValue.map((item) => (
                <li key={item.title} className="border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
                  <p className="font-bold text-cocoa">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-muted">{item.body}</p>
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

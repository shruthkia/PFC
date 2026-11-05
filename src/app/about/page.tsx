import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { HouseMark } from "@/components/brand/house-mark";
import {
  adopurrNote,
  chapterOffers,
  leadership,
  missionLong,
  vision,
  whoItsFor,
} from "@/lib/content";
import { branchRegions, chapters } from "@/lib/platform-data";

export const metadata: Metadata = {
  title: "About PFC",
  description:
    "Who PawsForCause is, how student chapters work, and how we relate to Adopurr.",
  alternates: { canonical: "/about" },
};

const missionRows = [
  { label: "Why", copy: missionLong.why, tone: "bg-blush" },
  { label: "What", copy: missionLong.what, tone: "bg-butter" },
  { label: "Who", copy: missionLong.who, tone: "bg-mint" },
  { label: "How", copy: missionLong.how, tone: "bg-blush" },
  { label: "Money", copy: missionLong.money, tone: "bg-butter" },
  { label: "Growth", copy: missionLong.growth, tone: "bg-mint" },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="A student house for animals who still need one"
        lede="PFC exists so high schoolers can do useful work for shelters and rescues, teach responsible adoption, and keep a record of it. Not a poster club. A chapter you can actually run."
      />

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1150px] gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="menu-frame p-6 sm:p-9">
            <div className="flex flex-wrap items-end justify-between gap-3 border-b-2 border-dashed border-border pb-5">
              <div>
                <p className="font-hand text-2xl font-semibold text-rose">the short version</p>
                <h2 className="mt-1 font-display text-3xl font-extrabold text-cocoa">Why, what, who, how</h2>
              </div>
              <span className="lede-sticker">est. by students</span>
            </div>
            <dl className="mt-2 divide-y divide-dashed divide-border">
              {missionRows.map((row) => (
                <div key={row.label} className="grid gap-2 py-5 sm:grid-cols-[110px_1fr] sm:gap-5">
                  <dt className="flex h-fit w-fit items-center rounded-full border-2 border-border px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-cocoa">
                    <span className={`mr-2 h-2 w-2 rounded-full ${row.tone}`} aria-hidden />
                    {row.label}
                  </dt>
                  <dd className="text-sm leading-7 text-muted">{row.copy}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="space-y-6">
            <div className="scrap-card bg-butter/70 p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-cocoa">Where this is going</h2>
              <p className="mt-3 text-sm leading-7 text-muted">{vision.near}</p>
              <p className="mt-3 text-sm leading-7 text-muted">{vision.far}</p>
            </div>

            <div className="scrap-card bg-blush/60 p-6 sm:p-8">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-rose">
                {chapters.length} chapter branches
              </p>
              <h2 className="mt-2 font-display text-2xl font-extrabold text-cocoa">Where the pack lives</h2>
              <ul className="mt-4 space-y-3">
                {branchRegions.map((region) => (
                  <li key={region.label} className="border-b border-dashed border-border pb-3 last:border-0 last:pb-0">
                    <p className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-muted">
                      {region.label}
                    </p>
                    <p className="mt-1 text-sm font-bold text-cocoa">{region.chapters.join(" · ")}</p>
                  </li>
                ))}
              </ul>
              <Link
                href="/directory"
                className="mt-5 inline-flex min-h-11 items-center text-sm font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa"
              >
                Open the branch map
              </Link>
            </div>

            <div className="sticker-card bg-surface p-6 sm:p-8">
              <h2 className="font-display text-2xl font-extrabold text-cocoa">Who should start a chapter</h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-muted">
                {whoItsFor.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-rose" aria-hidden>
                      ✦
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y-2 border-border bg-blush/35 px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="mx-auto max-w-2xl text-center">
            <span className="ribbon">The feeling</span>
            <h2 className="section-title mt-5">What a chapter is supposed to feel like</h2>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {chapterOffers.map((item, i) => (
              <article
                key={item.title}
                className={`sticker-card p-6 sm:p-7 ${i % 3 === 0 ? "bg-surface" : i % 3 === 1 ? "bg-butter/60" : "bg-mint/60"}`}
              >
                <p className="font-hand text-2xl font-semibold text-rose">0{i + 1}</p>
                <h3 className="mt-1 font-display text-xl font-extrabold text-cocoa">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[1150px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <span className="ribbon">HQ</span>
              <h2 className="mt-4 font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
                The two people answering the email
              </h2>
            </div>
            <p className="max-w-sm text-sm leading-7 text-muted">
              Other titles have to match work someone already did. Regional help can come later, when there
              are enough chapters that it would actually help.
            </p>
          </div>
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {leadership.map((person, i) => (
              <article key={person.name} className={`scrap-card p-7 sm:p-9 ${i === 0 ? "bg-surface" : "bg-butter/50"}`}>
                <div className="flex items-center gap-4">
                  <span className="grid h-16 w-16 place-items-center rounded-full border-2 border-border bg-blush/70">
                    <HouseMark className="h-11 w-12" decorative />
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-extrabold text-cocoa">{person.name}</h3>
                    <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-rose">{person.role}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-7 text-muted">{person.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-border bg-mint/40 px-5 py-16 sm:px-10">
        <div className="mx-auto max-w-[900px]">
          <div className="scrap-card bg-surface p-7 text-center sm:p-10">
            <p className="font-hand text-2xl font-semibold text-rose">one house, two projects</p>
            <h2 className="mt-2 font-display text-3xl font-extrabold text-cocoa">{adopurrNote.title}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted">{adopurrNote.body}</p>
            <Link
              href="/faq"
              className="mt-6 inline-flex min-h-11 items-center text-sm font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa"
            >
              Read the rest of the FAQ
            </Link>
          </div>
        </div>
      </section>

      <ApplyBand />
    </>
  );
}

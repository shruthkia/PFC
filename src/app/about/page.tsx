import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { CatDoodle, DogDoodle } from "@/components/brand/animal-doodles";
import {
  adopurrNote,
  chapterOffers,
  leadership,
  missionLong,
  publicGuardrails,
  vision,
  whoItsFor,
} from "@/lib/content";

export const metadata: Metadata = {
  title: "About PFC",
  description:
    "Who PawsForCause is, what we will and will not claim, and how the student network is run.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        kicker="About"
        title="A student house for animals who still need one"
        lede="PFC exists so high schoolers can do useful work for shelters and rescues, teach responsible adoption, and keep a record of it. We are not a poster club, and we are not a 501(c)(3) yet."
      />

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-[1100px] gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">Why, what, who, how</h2>
            <dl className="mt-8 space-y-6">
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">Why</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.why}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">What</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.what}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">Who</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.who}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">How</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.how}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-orange-hot">Money</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.money}</dd>
              </div>
              <div>
                <dt className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-orange-hot">Growth</dt>
                <dd className="mt-2 text-muted leading-relaxed">{missionLong.growth}</dd>
              </div>
            </dl>
          </div>
          <div className="space-y-8">
            <div className="border-2 border-foreground bg-cream p-8 dark:bg-card">
              <h2 className="font-display text-2xl font-bold">2026–27</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">{vision.near}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">{vision.far}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-foreground/80">
              <CatDoodle />
              <DogDoodle />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold">Who should start a chapter</h2>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                {whoItsFor.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="text-pink-hot" aria-hidden>
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

      <section className="border-y border-border bg-cream/80 px-4 py-16 dark:bg-card/40 sm:px-8">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">What a chapter is supposed to feel like</h2>
          <div className="mt-8 grid gap-px border border-border bg-border sm:grid-cols-2">
            {chapterOffers.map((item) => (
              <article key={item.title} className="bg-background p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="font-display text-3xl font-bold">HQ</h2>
          <p className="mt-3 max-w-2xl text-muted">
            Other titles have to match work someone already did. We will not staff a region with one
            chapter in it just to make the org chart look grown-up.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {leadership.map((person) => (
              <article key={person.name} className="border-2 border-foreground p-8">
                <h3 className="font-display text-2xl font-bold">{person.name}</h3>
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">{person.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted">{person.focus}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border px-4 py-16 sm:px-8">
        <div className="mx-auto grid max-w-[1100px] gap-10 lg:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold">{adopurrNote.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{adopurrNote.body}</p>
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Claims we will not stretch</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
              {publicGuardrails.map((line) => (
                <li key={line} className="border-l-2 border-pink-hot pl-4">
                  {line}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ApplyBand />
    </>
  );
}

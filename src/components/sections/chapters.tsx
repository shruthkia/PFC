"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { first30Days, journeySteps } from "@/lib/content";

export function Chapters() {
  return (
    <section className="relative bg-brown-dark px-4 py-24 text-cream sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel
          number="02"
          label="From stray to house-trained"
          className="[&_span]:text-orange [&_.text-muted-foreground]:text-brown-soft"
        />

        <div className="mt-10 grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              First 30 days.
              <br />
              First animal helped.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-brown-soft">
              You keep the local shelter, the meeting time, and the project. HQ keeps the brand,
              the floor for quality, and the annoying-but-necessary reporting. Target: a first
              meaningful activity in 30 days. 21 if the school paperwork cooperates.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="border-brown-soft bg-pink-hot hover:bg-pink">
                <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Interest form
                </a>
              </Button>
              <Button asChild variant="secondary" className="border-brown-soft/50 text-cream hover:bg-white/10 hover:text-cream">
                <Link href="/start">Full chapter path</Link>
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 border-brown-soft/30 bg-cream/5 p-6"
              >
                <span className="font-display text-4xl font-extrabold text-outline opacity-40">{step.step}</span>
                <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-brown-soft/20 pt-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-orange">Month one, week by week</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {first30Days.map((week, i) => (
              <motion.div
                key={week.w}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="shrink-0 font-mono text-sm font-medium text-pink-hot">{week.w}</span>
                <p className="text-sm leading-relaxed text-brown-soft">{week.task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { journeySteps } from "@/lib/content";

const weeks = [
  { w: "W1", task: "Register, set up comms, school approval, core team" },
  { w: "W2", task: "Recruit members, schedule first meeting" },
  { w: "W3", task: "Pick first project, contact shelter or partner" },
  { w: "W4", task: "Complete or schedule first activity, report it" },
];

export function Chapters() {
  return (
    <section id="path" className="relative bg-brown-dark px-4 py-24 text-cream sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="02" label="Chapter path" className="[&_span]:text-orange [&_.text-muted-foreground]:text-brown-soft" />

        <div className="mt-10 grid gap-16 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              Interest form to
              <br />
              <span className="text-pink-hot">active chapter</span>
              <br />
              in 30 days
            </h2>
            <p className="mt-6 max-w-md text-brown-soft leading-relaxed">
              You keep local autonomy over shelters, projects, and events. HQ removes
              friction with playbooks, standards, and shared campaigns.
            </p>
            <Button asChild className="mt-8 border-brown-soft bg-pink-hot hover:bg-pink">
              <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Apply now
              </a>
            </Button>
          </div>

          <div className="snap-x-mandatory flex gap-4 overflow-x-auto pb-4 lg:grid lg:grid-cols-2 lg:overflow-visible lg:pb-0">
            {journeySteps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="snap-card min-w-[260px] border-2 border-brown-soft/30 bg-cream/5 p-6 lg:min-w-0"
              >
                <span className="font-display text-5xl font-extrabold text-outline opacity-30">
                  {step.step}
                </span>
                <h3 className="mt-2 font-display text-xl font-bold">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brown-soft">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-16 border-t border-brown-soft/20 pt-12">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-orange">
            First 30 days
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {weeks.map((week, i) => (
              <motion.div
                key={week.w}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <span className="font-mono text-sm font-medium text-pink-hot">{week.w}</span>
                <p className="text-sm leading-relaxed text-brown-soft">{week.task}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

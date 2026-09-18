"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { activityLanes } from "@/lib/content";

const bentoLayout = [
  "col-span-12 md:col-span-7 md:row-span-2",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-5",
  "col-span-12 md:col-span-12",
];

const bentoBg = [
  "bg-pink-soft/50 dark:bg-pink-soft/20",
  "bg-orange-soft/60 dark:bg-orange-soft/15",
  "bg-cream dark:bg-card",
  "bg-gradient-to-r from-pink-hot/20 via-orange-hot/20 to-transparent",
];

export function Activities() {
  return (
    <section id="work" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="03" label="The work" />

        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="max-w-xl font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
            Projects students
            <span className="text-pink-hot"> actually </span>
            want to run
          </h2>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Responsible adoption and sterilization awareness stay at the center. Every project
            should help animals and look good enough to post about.
          </p>
        </div>

        <div className="bento-grid mt-12">
          {activityLanes.map((lane, i) => (
            <motion.article
              key={lane.title}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`hover-lift border-2 border-foreground p-8 ${bentoLayout[i]} ${bentoBg[i]}`}
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold sm:text-3xl">{lane.title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{lane.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

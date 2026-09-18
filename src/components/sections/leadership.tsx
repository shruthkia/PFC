"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { leadership } from "@/lib/content";

export function Leadership() {
  return (
    <section id="team" className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="05" label="Leadership" />

        <h2 className="mt-10 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
          HQ that ships, not slides
        </h2>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
          {leadership.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden bg-background p-10 sm:p-12"
            >
              <div
                className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-pink-soft/40 transition-transform group-hover:scale-125 dark:bg-pink-soft/20"
                aria-hidden
              />
              <p className="relative font-display text-6xl font-extrabold text-outline opacity-20">
                {person.name.charAt(0)}
              </p>
              <h3 className="relative mt-4 font-display text-3xl font-bold">{person.name}</h3>
              <p className="relative mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">
                {person.role}
              </p>
              <p className="relative mt-4 max-w-sm text-sm leading-relaxed text-muted">
                {person.focus}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

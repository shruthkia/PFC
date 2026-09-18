"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { leadership } from "@/lib/content";

export function Leadership() {
  return (
    <section className="px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="05" label="Who feeds the pack" />
        <h2 className="mt-10 max-w-2xl font-display text-4xl font-bold sm:text-5xl">
          Two founders. Titles later, if the work needs them.
        </h2>
        <p className="mt-4 max-w-xl text-muted">
          Regional reps stay on the shelf until there are enough Active chapters that HQ cannot
          stay close to every president. We would rather be late on that than invent a board.
        </p>

        <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
          {leadership.map((person, i) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative overflow-hidden bg-background p-10 sm:p-12"
            >
              <p className="font-display text-6xl font-extrabold text-outline opacity-20">{person.name.charAt(0)}</p>
              <h3 className="mt-4 font-display text-3xl font-bold">{person.name}</h3>
              <p className="mt-1 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">{person.role}</p>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{person.focus}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

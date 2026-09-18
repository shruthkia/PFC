"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { missionCards, stats } from "@/lib/content";

export function Mission() {
  return (
    <section id="mission" className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="01" label="Mission" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Mobilize students.
              <br />
              <span className="text-orange-hot">Improve welfare.</span>
              <br />
              Document the work.
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="self-end text-lg leading-relaxed text-muted lg:text-xl"
          >
            PFC is the active student-led animal welfare organization. We help high schoolers
            run shelter support, education, responsible adoption advocacy, and community
            projects with measurable impact.
          </motion.p>
        </div>

        <div className="mt-20 grid gap-px border border-border bg-border sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 sm:p-10"
            >
              <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {stat.value}
              </p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-px grid gap-px border border-t-0 border-border bg-border lg:grid-cols-3">
          {missionCards.map((card, i) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="group bg-background p-8 transition-colors hover:bg-cream dark:hover:bg-card lg:p-10"
            >
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                0{i + 1}
              </span>
              <h3 className="mt-4 font-display text-2xl font-bold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { CatDoodle, DogDoodle } from "@/components/brand/animal-doodles";
import { homeBeats, stats } from "@/lib/content";

export function Mission() {
  return (
    <section className="relative px-4 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="01" label="The house rules" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
          >
            Animals do not need another
            <span className="text-orange-hot"> awareness week.</span>
            <br />
            They need students who show up.
          </motion.h2>
          <div>
            <p className="text-lg leading-relaxed text-muted lg:text-xl">
              PawsForCause (PFC) is the student-led animal-welfare org. We help high schoolers
              start chapters that can survive past the first meeting: shelter support, education,
              responsible adoption, and the unglamorous work of reporting it.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-4 text-foreground/80">
              <CatDoodle className="max-w-[220px]" />
              <DogDoodle className="max-w-[220px]" />
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-3">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-background p-8 sm:p-10"
            >
              <p className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">{stat.value}</p>
              <p className="mt-2 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-pink-hot">
                {stat.label}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-px grid gap-px border border-t-0 border-border bg-border lg:grid-cols-3">
          {homeBeats.map((beat, i) => (
            <motion.article
              key={beat.href}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              className="bg-background p-8 transition-colors hover:bg-cream dark:hover:bg-card lg:p-10"
            >
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
                {beat.kicker}
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold leading-snug">{beat.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{beat.body}</p>
              <Link href={beat.href} className="mt-6 inline-block font-mono text-[0.65rem] uppercase tracking-widest text-pink-hot">
                Read more →
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

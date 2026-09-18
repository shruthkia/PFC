"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section className="border-y border-border bg-card/50 px-4 py-10 sm:px-6" aria-label="Network highlights">
      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="text-center sm:text-left"
          >
            <p className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              {stat.value}
            </p>
            <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-pink-deep">
              {stat.label}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{stat.detail}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

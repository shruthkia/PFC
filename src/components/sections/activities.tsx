"use client";

import { motion } from "framer-motion";
import { Heart, Megaphone, Palette, ShoppingBag } from "lucide-react";
import { activityLanes } from "@/lib/content";

const icons = [Heart, Megaphone, Palette, ShoppingBag];

export function Activities() {
  return (
    <section id="activities" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-deep">
            What you actually do
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Projects students want to run
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            Good PFC work is useful to animals and shelters, and fun enough that your
            chapter keeps showing up. Responsible adoption and sterilization awareness
            stay at the center of what we advocate for.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {activityLanes.map((lane, index) => {
            const Icon = icons[index];
            return (
              <motion.article
                key={lane.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: index * 0.08, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="group card-glow rounded-3xl border border-border bg-card p-6 transition-shadow"
              >
                <div className="mb-4 inline-flex rounded-2xl bg-gradient-to-br from-pink-soft to-orange-soft p-3 text-brown-deep dark:from-pink-soft/40 dark:to-orange-soft/30">
                  <Icon className="h-5 w-5" aria-hidden />
                </div>
                <h3 className="font-display text-xl font-semibold">{lane.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{lane.description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

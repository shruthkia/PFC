"use client";

import { motion } from "framer-motion";
import { leadership } from "@/lib/content";

export function Leadership() {
  return (
    <section id="team" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-brown">
            HQ leadership
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Built by founders who ship, not slide decks
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            PFC standardizes brand, onboarding, reporting, and shared campaigns. Your
            chapter keeps local autonomy over shelters, projects, and how you recruit.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {leadership.map((person, index) => (
            <motion.article
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="card-glow rounded-3xl border border-border bg-gradient-to-br from-card to-cream p-6 dark:from-card dark:to-brown-soft/10"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink to-orange font-display text-xl font-semibold text-white"
                  aria-hidden
                >
                  {person.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold">{person.name}</h3>
                  <p className="text-sm font-medium text-pink-deep">{person.role}</p>
                </div>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted">{person.focus}</p>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-sm text-muted-foreground"
        >
          Regional representatives will launch when scale creates a real management need.
          For now, HQ works directly with chapter presidents and officers.
        </motion.p>
      </div>
    </section>
  );
}

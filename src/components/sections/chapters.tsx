"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { journeySteps } from "@/lib/content";

const first30Days = [
  "Week 1: Register, set up communication, pursue school approval, build your core team.",
  "Week 2: Recruit members and schedule your first meeting.",
  "Week 3: Choose your first project and reach out to a shelter or partner.",
  "Week 4: Complete or firmly schedule your first meaningful activity and report it.",
];

export function Chapters() {
  return (
    <section id="chapters" className="bg-cream/70 px-4 py-20 dark:bg-card/30 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-pink-deep">
              Chapter path
            </p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              From interest form to active chapter in about 30 days
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              You keep meaningful autonomy over local shelters, projects, and events. HQ
              removes friction with playbooks, standards, and shared campaigns.
            </p>

            <ul className="mt-8 space-y-3">
              {first30Days.map((item) => (
                <li key={item} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-orange-deep" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button asChild className="mt-8">
              <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Apply to start a chapter
              </a>
            </Button>
          </motion.div>

          <div className="space-y-4">
            {journeySteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="card-glow flex gap-5 rounded-2xl border border-border bg-card p-5 sm:p-6"
              >
                <span className="font-display text-3xl font-light text-pink/80">{step.step}</span>
                <div>
                  <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

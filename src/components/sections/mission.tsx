"use client";

import { motion } from "framer-motion";
import { missionCards } from "@/lib/content";

const accentStyles = {
  pink: "from-pink/30 to-pink-soft border-pink/40",
  orange: "from-orange/30 to-orange-soft border-orange/40",
  brown: "from-brown-soft/30 to-cream border-brown-soft/50",
};

export function Mission() {
  return (
    <section id="mission" className="px-4 py-20 sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-orange-deep">
            Our mission
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
            Practical service. Real impact. School-level ownership.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            PFC mobilizes students to improve animal welfare through shelter and rescue
            support, education, responsible adoption advocacy, and community action.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {missionCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ delay: index * 0.12, duration: 0.5 }}
              className={`card-glow rounded-3xl border bg-gradient-to-br p-6 ${accentStyles[card.accent]}`}
            >
              <h3 className="font-display text-xl font-semibold">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{card.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

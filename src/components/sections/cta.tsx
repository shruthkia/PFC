"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export function Cta() {
  return (
    <section className="px-4 pb-20 pt-4 sm:px-6 sm:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-border bg-gradient-to-br from-pink-soft via-orange-soft to-cream px-6 py-14 text-center dark:from-pink-soft/30 dark:via-orange-soft/20 dark:to-card sm:px-12 sm:py-16"
      >
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-pink/30 blur-3xl" aria-hidden />
        <div className="pointer-events-none absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-orange/25 blur-3xl" aria-hidden />

        <p className="relative text-sm font-semibold uppercase tracking-wider text-brown-deep dark:text-orange">
          Ready when you are
        </p>
        <h2 className="relative mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
          Bring PFC to your high school
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-muted leading-relaxed">
          Fill out the chapter interest form. If you are a fit, HQ sends resources,
          registration steps, and support to help you launch within your first 30 days.
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
              Open chapter interest form
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <a href="#faq">Read the FAQ first</a>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

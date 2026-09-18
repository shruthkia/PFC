"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/effects/marquee";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export function Cta() {
  return (
    <>
      <section className="relative overflow-hidden bg-pink-hot px-4 py-24 text-white sm:px-8 sm:py-32">
        <div className="absolute inset-0 opacity-10" aria-hidden>
          <div className="absolute -left-20 top-0 h-96 w-96 rounded-full bg-orange blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-brown blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-[1400px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/70"
          >
            Ready when you are
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-6 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            BRING PFC
            <br />
            TO YOUR SCHOOL
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-lg text-white/80 leading-relaxed"
          >
            Fill out the interest form. If you are a fit, HQ sends resources and support to
            help you launch within 30 days.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Button
              asChild
              size="lg"
              className="border-white bg-white text-pink-hot shadow-none hover:bg-cream"
            >
              <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Open interest form
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white/10 hover:text-white"
            >
              <a href="#faq">Read FAQ</a>
            </Button>
          </motion.div>
        </div>
      </section>

      <Marquee
        reverse
        items={["Start a chapter", "Shelter runs", "Make impact", "Lead locally", "Report honestly"]}
        className="border-pink-hot/30 bg-brown-dark [&_span]:text-brown-soft"
      />
    </>
  );
}

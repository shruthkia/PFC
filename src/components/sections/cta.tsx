"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Marquee } from "@/components/effects/marquee";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { marqueeItems } from "@/lib/content";

export function Cta() {
  return (
    <>
      <section className="relative overflow-hidden bg-pink-hot px-4 py-24 text-white sm:px-8 sm:py-32">
        <div className="relative mx-auto max-w-[1400px] text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/70"
          >
            Bring the house to campus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-6 font-display text-[clamp(2.5rem,8vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight"
          >
            YOUR SCHOOL
            <br />
            YOUR SHELTER
          </motion.h2>
          <p className="mx-auto mt-6 max-w-lg text-white/80 leading-relaxed">
            Fill the interest form. If you are a fit, we send chapter resources and the
            registration link. First meaningful activity is the real finish line, not the Google Form.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="border-white bg-white text-pink-hot shadow-none hover:bg-cream">
              <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Open the interest form
                <ArrowUpRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
          </div>
        </div>
      </section>
      <Marquee reverse items={marqueeItems} className="border-pink-hot/30 bg-brown-dark [&_span]:text-brown-soft" />
    </>
  );
}

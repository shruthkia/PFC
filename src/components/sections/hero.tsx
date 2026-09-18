"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDownRight } from "lucide-react";
import { LineArtScene } from "@/components/animated/line-art-scene";
import { Marquee } from "@/components/effects/marquee";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <>
      <section
        ref={ref}
        className="relative min-h-[100svh] overflow-hidden pt-16"
      >
        <motion.div style={{ y, opacity }} className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
          <div className="grid min-h-[calc(100svh-4rem)] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
            <div className="relative z-10 py-12 lg:py-0">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted"
              >
                High school chapters · 5 countries
              </motion.p>

              <h1 className="mt-6 select-none">
                <motion.span
                  className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em]"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                  PAWS
                </motion.span>
                <motion.span
                  className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-outline"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                  FOR
                </motion.span>
                <motion.span
                  className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-pink-hot"
                  initial={{ opacity: 0, y: 60 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
                >
                  CAUSE
                </motion.span>
              </h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.7 }}
                className="mt-8 max-w-md text-lg leading-relaxed text-muted sm:text-xl"
              >
                The student network turning shelter runs, adoption advocacy, and community
                action into real impact. Not meetings for the sake of meetings.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="mt-10 flex flex-wrap items-center gap-4"
              >
                <Button asChild size="lg">
                  <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                    Start a chapter
                    <ArrowDownRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <a href="#path">How it works</a>
                </Button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground"
              >
                Target · 50+ active chapters by Jan 2027
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <LineArtScene />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 lg:block"
          aria-hidden
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted-foreground"
          >
            Scroll
          </motion.div>
        </motion.div>
      </section>

      <Marquee
        items={[
          "Shelter support",
          "Responsible adoption",
          "Sterilization awareness",
          "Student leadership",
          "Real service hours",
          "Community action",
        ]}
      />
    </>
  );
}

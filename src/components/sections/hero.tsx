"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { LineArtScene } from "@/components/animated/line-art-scene";
import { Marquee } from "@/components/effects/marquee";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { marqueeItems } from "@/lib/content";

export function Hero() {
  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden pt-16">
        <div className="relative mx-auto max-w-[1400px] px-4 sm:px-8">
          <div className="grid min-h-[calc(100svh-4rem)] items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-4">
            <div className="relative z-10 py-12 lg:py-0">
              <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted">
                High school chapters · 5 countries
              </p>

              <h1 className="mt-6 select-none">
                <span className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em]">
                  PAWS
                </span>
                <span className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-outline">
                  FOR
                </span>
                <span className="block font-display text-[clamp(3.5rem,12vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.04em] text-pink-hot">
                  CAUSE
                </span>
              </h1>

              <p className="mt-8 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
                Student chapters that help the animals still waiting. Shelter days, toy nights,
                hallway talks about getting pets fixed. If you wanted a club that only posts
                infographics, this is the wrong house.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Button asChild size="lg">
                  <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                    Start a chapter
                    <ArrowDownRight className="h-4 w-4" aria-hidden />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href="/start">See the 30-day path</Link>
                </Button>
              </div>

              <p className="mt-8 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
                Goal · 50+ Active high school chapters by 31 Jan 2027
              </p>
            </div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mx-auto w-full max-w-lg lg:max-w-none"
            >
              <LineArtScene />
            </motion.div>
          </div>
        </div>
      </section>

      <Marquee items={marqueeItems} />
    </>
  );
}

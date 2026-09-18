"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { HeroIllustration } from "@/components/animated/hero-illustration";
import { FloatingShapes } from "@/components/animated/floating-shapes";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="hero-mesh relative overflow-hidden px-4 pb-20 pt-12 sm:px-6 sm:pt-16 lg:pb-28">
      <FloatingShapes />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-xs font-medium text-muted backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-orange-deep" aria-hidden />
            <span>15+ chapters launching across 5 countries</span>
          </div>

          <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            Lead real{" "}
            <span className="gradient-text">animal welfare</span> projects at your school
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            {siteConfig.tagline} {siteConfig.shortName} helps high school students run
            shelter support, adoption advocacy, and community action that actually counts.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg">
              <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                Start a chapter
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <a href="#chapters">See how it works</a>
            </Button>
          </div>

          <p className="mt-6 text-sm text-muted-foreground">
            Goal: 50+ active high school chapters by January 31, 2027.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroIllustration />
        </motion.div>
      </div>
    </section>
  );
}

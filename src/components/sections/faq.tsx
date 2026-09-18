"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "@/components/effects/section-label";
import { faqItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Faq() {
  const [active, setActive] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-border bg-cream px-4 py-24 dark:bg-card/50 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px]">
        <SectionLabel number="04" label="FAQ" />

        <div className="mt-10 grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
          <div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] sm:text-5xl">
              Straight
              <br />
              answers
            </h2>
            <p className="mt-4 text-muted leading-relaxed">
              Everything you need before applying. No fluff, no inflated claims.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {faqItems.map((item, i) => {
              const isOpen = active === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setActive(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-start gap-6 py-6 text-left transition-colors hover:text-pink-hot"
                  >
                    <span className="font-mono text-xs text-muted-foreground pt-1">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-lg font-semibold leading-snug sm:text-xl">
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "mt-1 font-mono text-xl transition-transform duration-300",
                        isOpen && "rotate-45 text-pink-hot"
                      )}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 pl-10 pr-4 text-sm leading-relaxed text-muted sm:pl-12">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { faqItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqList({ items = faqItems }: { items?: typeof faqItems }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item, i) => {
        const isOpen = active === i;
        return (
          <div key={item.question}>
            <h2>
              <button
                type="button"
                onClick={() => setActive(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group flex w-full items-start gap-6 py-6 text-left transition-colors hover:text-pink-hot"
              >
                <span className="pt-1 font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg font-semibold leading-snug sm:text-xl">
                  {item.question}
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
            </h2>
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
  );
}

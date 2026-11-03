"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { faqItems } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqList({ items = faqItems }: { items?: typeof faqItems }) {
  const [active, setActive] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = active === i;
        const panelId = `faq-panel-${i}`;
        const buttonId = `faq-button-${i}`;

        return (
          <div
            key={item.question}
            className={cn(
              "overflow-hidden rounded-[1.35rem] border-2 border-border transition-colors",
              isOpen ? "bg-blush/45" : "bg-surface",
            )}
          >
            <h3 className="m-0">
              <button
                type="button"
                id={buttonId}
                onClick={() => setActive(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="group flex min-h-14 w-full items-center gap-4 px-4 py-4 text-left transition-colors hover:text-rose sm:px-5"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-border bg-surface-strong text-xs font-extrabold text-rose">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-display text-lg font-extrabold leading-snug text-cocoa sm:text-xl">
                  {item.question}
                </span>
                <span
                  className={cn(
                    "grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-cocoa/40 text-cocoa transition-transform duration-300",
                    isOpen && "rotate-45 bg-rose text-[#fffaf4]",
                  )}
                  aria-hidden
                >
                  <Plus className="h-4 w-4" strokeWidth={3} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-5 pl-16 pr-6 text-sm leading-7 text-muted sm:px-5 sm:pl-[4.5rem]">
                    {item.answer}
                  </p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

"use client";

import Link from "next/link";
import { faqItems } from "@/lib/content";

export function FaqTeaser() {
  const preview = faqItems.slice(0, 4);

  return (
    <section className="border-t border-border bg-cream px-4 py-24 dark:bg-card/50 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-[1400px] grid gap-12 lg:grid-cols-[0.4fr_0.6fr]">
        <div>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-pink-hot">04 · Straight answers</p>
          <h2 className="mt-4 font-display text-4xl font-bold sm:text-5xl">
            Official, Active, and other words people mix up
          </h2>
          <p className="mt-4 text-muted leading-relaxed">
            The short versions live here. The long versions, including affiliates and hours, live on the FAQ page.
          </p>
          <Link
            href="/faq"
            className="mt-6 inline-block font-mono text-[0.65rem] uppercase tracking-widest text-pink-hot"
          >
            Open full FAQ →
          </Link>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {preview.map((item, i) => (
            <li key={item.question} className="py-5">
              <p className="font-mono text-[0.6rem] text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
              <p className="mt-1 font-display text-xl font-semibold">{item.question}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

"use client";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  items: string[];
  reverse?: boolean;
  className?: string;
  speed?: "slow" | "normal";
};

export function Marquee({ items, reverse = false, className, speed = "normal" }: MarqueeProps) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={cn("overflow-hidden border-y border-border bg-cream py-3 dark:bg-card", className)}
      aria-hidden
    >
      <div
        className={cn(
          "flex w-max gap-8 whitespace-nowrap",
          reverse ? "marquee-track-reverse" : "marquee-track",
          speed === "slow" && "[animation-duration:40s]",
          speed === "normal" && "[animation-duration:28s]"
        )}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="font-mono text-xs uppercase tracking-[0.25em] text-muted"
          >
            {item}
            <span className="mx-8 text-pink-hot">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

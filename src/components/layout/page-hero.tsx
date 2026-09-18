import { HouseMark } from "@/components/brand/house-mark";
import { PawTrail } from "@/components/brand/animal-doodles";
import { cn } from "@/lib/utils";

export function PageHero({
  kicker,
  title,
  lede,
  dark = false,
}: {
  kicker: string;
  title: string;
  lede: string;
  dark?: boolean;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden border-b border-border px-4 pb-16 pt-28 sm:px-8 sm:pb-20 sm:pt-32",
        dark ? "bg-brown-dark text-cream" : "bg-cream/70 dark:bg-card/40"
      )}
    >
      <div className="pointer-events-none absolute -right-8 top-10 w-40 text-pink-hot/30 sm:w-56" aria-hidden>
        <HouseMark className="h-full w-full" decorative />
      </div>
      <div className="relative mx-auto max-w-[1100px]">
        <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-pink-hot">{kicker}</p>
        <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl">
          {title}
        </h1>
        <p className={cn("mt-6 max-w-xl text-lg leading-relaxed", dark ? "text-brown-soft" : "text-muted")}>
          {lede}
        </p>
        <div className="mt-10 max-w-sm text-pink-hot/70">
          <PawTrail />
        </div>
      </div>
    </header>
  );
}

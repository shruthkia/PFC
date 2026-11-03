import { HouseMark } from "@/components/brand/house-mark";
import { PawTrail } from "@/components/brand/animal-doodles";

export function PageHero({
  kicker,
  title,
  lede,
}: {
  kicker: string;
  title: string;
  lede: string;
  dark?: boolean;
}) {
  return (
    <header className="gingham relative overflow-hidden border-b-2 border-border pb-16 pt-24 sm:pb-20 sm:pt-32">
      <div className="mx-auto max-w-[1150px] px-5 sm:px-10">
        <div className="scrap-card relative overflow-hidden bg-surface px-6 py-10 sm:px-12 sm:py-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-10 -top-8 h-40 w-44 rotate-6 opacity-25 sm:h-52 sm:w-56"
          >
            <HouseMark className="h-full w-full" decorative />
          </div>
          <div aria-hidden className="pointer-events-none absolute inset-x-6 top-4 flex justify-between text-rose/45">
            <span className="font-hand text-2xl">✦</span>
            <span className="font-hand text-2xl">✧</span>
          </div>

          <div className="relative">
            <p className="eyebrow w-fit">{kicker}</p>
            <h1 className="mt-5 max-w-3xl text-balance font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.02em] text-cocoa sm:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">{lede}</p>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <div className="max-w-[190px] text-rose/60">
                <PawTrail />
              </div>
              <p className="inline-flex items-center gap-2 rounded-full border-2 border-border bg-surface-strong px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.12em] text-cocoa">
                <span aria-hidden className="h-2 w-2 rounded-full bg-sage-dark" />
                Student-led · verified work
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="scallop-border absolute inset-x-0 bottom-0" aria-hidden />
    </header>
  );
}

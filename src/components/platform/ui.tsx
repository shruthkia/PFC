import Link from "next/link";
import { cn } from "@/lib/utils";

export function PageShell({
  eyebrow,
  title,
  lede,
  children,
  actions,
  dark = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  dark?: boolean;
}) {
  return (
    <div className={cn(dark ? "bg-cocoa text-cream" : "paper-grid text-ink")}>
      <div className="mx-auto max-w-[1250px] px-5 pb-20 pt-28 sm:px-10">
        <p className={cn("eyebrow w-fit", dark && "border-cream/40 bg-white/10 text-cream")}>{eyebrow}</p>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className={cn("font-display text-4xl font-black tracking-tight sm:text-6xl", dark ? "text-cream" : "text-cocoa")}>
              {title}
            </h1>
            {lede ? <p className={cn("mt-4 max-w-2xl text-lg leading-8", dark ? "text-cream/75" : "text-ink/70")}>{lede}</p> : null}
          </div>
          {actions}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

export function Panel({ children, className, tone = "cream" }: { children: React.ReactNode; className?: string; tone?: "cream" | "blush" | "butter" | "mint" | "lilac" | "white" }) {
  const tones = {
    cream: "bg-[#fffdf7]",
    blush: "bg-[#f6d8e1]",
    butter: "bg-[#f4e3a6]",
    mint: "bg-[#cfe1d2]",
    lilac: "bg-[#ddd5ed]",
    white: "bg-white",
  } as const;
  return <section className={cn("sticker-card p-5 sm:p-7", tones[tone], className)}>{children}</section>;
}

export function StatTile({ value, label, note, tone = "blush" }: { value: string; label: string; note?: string; tone?: "blush" | "butter" | "mint" | "lilac" }) {
  const tones = {
    blush: "bg-[#f6d8e1]",
    butter: "bg-[#f4e3a6]",
    mint: "bg-[#cfe1d2]",
    lilac: "bg-[#ddd5ed]",
  } as const;
  return (
    <article className={cn("rounded-[1.4rem] border-2 border-cocoa p-5 shadow-[3px_3px_0_#6e493b]", tones[tone])}>
      <p className="font-display text-3xl font-black text-cocoa sm:text-4xl">{value}</p>
      <p className="mt-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cocoa/60">{label}</p>
      {note ? <p className="mt-3 text-xs font-bold text-cocoa">{note}</p> : null}
    </article>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-black text-cocoa">{label}</p>
        <p className="font-hand text-2xl font-bold text-rose">{clamped}%</p>
      </div>
      <div
        className="h-4 overflow-hidden rounded-full border-2 border-cocoa bg-white"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={label}
      >
        <div className="h-full border-r-2 border-cocoa bg-rose transition-[width]" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-black text-cocoa">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-cocoa/55">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function StatusPill({ children, tone = "neutral" }: { children: React.ReactNode; tone?: "neutral" | "good" | "warn" | "bad" | "info" }) {
  const tones = {
    neutral: "bg-white text-cocoa",
    good: "bg-mint text-[#31513a]",
    warn: "bg-butter text-cocoa",
    bad: "bg-[#f3c4c4] text-[#7a2d2d]",
    info: "bg-blush text-rose",
  } as const;
  return <span className={cn("inline-flex rounded-full border border-cocoa px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em]", tones[tone])}>{children}</span>;
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-cocoa/35 bg-white/50 p-4 text-sm leading-6 text-cocoa/65">{children}</p>;
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-black text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
      {children}
    </Link>
  );
}

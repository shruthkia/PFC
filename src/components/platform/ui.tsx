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
    <div className={cn(dark ? "bg-cocoa text-[var(--background)]" : "paper-grid text-ink")}>
      <div className="mx-auto max-w-[1250px] px-5 pb-20 pt-28 sm:px-10">
        <p className={cn("eyebrow w-fit", dark && "border-current/40 bg-white/10 text-[var(--background)]")}>{eyebrow}</p>
        <div className="mt-5 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className={cn("max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight [overflow-wrap:anywhere] sm:text-5xl", dark ? "text-[var(--background)]" : "text-cocoa")}>
              {title}
            </h1>
            {lede ? <p className={cn("mt-4 max-w-2xl text-lg leading-8", dark ? "opacity-80" : "text-muted")}>{lede}</p> : null}
          </div>
          {actions}
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </div>
  );
}

export function Panel({
  children,
  className,
  tone = "cream",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "cream" | "blush" | "butter" | "mint" | "lilac" | "white";
}) {
  const tones = {
    cream: "bg-surface",
    blush: "bg-blush",
    butter: "bg-butter",
    mint: "bg-mint",
    lilac: "bg-[#e8dff3] dark:bg-[#33283a]",
    white: "bg-surface-strong",
  } as const;
  return <section className={cn("sticker-card p-5 sm:p-7", tones[tone], className)}>{children}</section>;
}

export function StatTile({
  value,
  label,
  note,
  tone = "blush",
}: {
  value: string;
  label: string;
  note?: string;
  tone?: "blush" | "butter" | "mint" | "lilac";
}) {
  const tones = {
    blush: "bg-blush",
    butter: "bg-butter",
    mint: "bg-mint",
    lilac: "bg-[#e8dff3] dark:bg-[#33283a]",
  } as const;
  return (
    <article className={cn("rounded-[1.35rem] border-2 border-border p-5 shadow-sketch", tones[tone])}>
      <p className="font-display text-3xl font-extrabold text-cocoa sm:text-4xl">{value}</p>
      <p className="mt-1 text-[.65rem] font-extrabold uppercase tracking-[.14em] text-muted">{label}</p>
      {note ? <p className="mt-3 text-xs font-bold text-cocoa">{note}</p> : null}
    </article>
  );
}

export function ProgressBar({ value, label }: { value: number; label: string }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3">
        <p className="text-sm font-extrabold text-cocoa">{label}</p>
        <p className="font-hand text-2xl font-semibold text-rose">{clamped}%</p>
      </div>
      <div
        className="h-3.5 overflow-hidden rounded-full border border-border bg-surface-strong"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={clamped}
        aria-label={label}
      >
        <div className="h-full bg-rose transition-[width]" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}

export function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-sm font-extrabold text-cocoa">{label}</span>
      {hint ? <span className="mt-1 block text-xs text-muted">{hint}</span> : null}
      <span className="mt-2 block">{children}</span>
    </label>
  );
}

export function StatusPill({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: "neutral" | "good" | "warn" | "bad" | "info";
}) {
  const tones = {
    neutral: "bg-surface-strong text-cocoa",
    good: "bg-mint text-sage-dark",
    warn: "bg-butter text-cocoa",
    bad: "bg-blush text-rose",
    info: "bg-blush text-rose",
  } as const;
  return (
    <span className={cn("inline-flex rounded-full border border-border px-3 py-1 text-[.65rem] font-extrabold uppercase tracking-[.12em]", tones[tone])}>
      {children}
    </span>
  );
}

export function EmptyHint({ children }: { children: React.ReactNode }) {
  return <p className="rounded-2xl border border-dashed border-border bg-surface-strong/60 p-4 text-sm leading-6 text-muted">{children}</p>;
}

export function InlineLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
      {children}
    </Link>
  );
}

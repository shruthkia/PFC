import { cn } from "@/lib/utils";

export function SectionLabel({
  number,
  label,
  className,
}: {
  number: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-baseline gap-4", className)}>
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-pink-hot">{number}</span>
      <span className="h-px flex-1 max-w-16 bg-border" aria-hidden />
      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
        {label}
      </span>
    </div>
  );
}

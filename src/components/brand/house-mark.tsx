import { cn } from "@/lib/utils";

type HouseMarkProps = {
  className?: string;
  decorative?: boolean;
};

export function HouseMark({ className, decorative = false }: HouseMarkProps) {
  return (
    <svg
      viewBox="0 0 120 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role={decorative ? undefined : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "PawsForCause house and paw"}
    >
      <path
        d="M16 50.5 C38 28, 52 14, 60 12 C70 16, 86 32, 104 50.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        fill="#E8C4A8"
      />
      <path
        d="M27 49.5 L27 98.5 C27 100.5, 29 102, 32 102 L88 102 C91 102, 93 100.5, 93 98.5 L93 49.5"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinejoin="round"
        fill="#FFFBFA"
      />
      <ellipse cx="60" cy="72" rx="11.5" ry="9.5" fill="#C9A3AB" stroke="currentColor" strokeWidth="2" />
      <ellipse cx="46.5" cy="58.5" rx="5.2" ry="6.4" fill="#C9A3AB" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="55.5" cy="53" rx="5.4" ry="6.6" fill="#C9A3AB" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="65.5" cy="53" rx="5.4" ry="6.6" fill="#C9A3AB" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="74.2" cy="59" rx="5.2" ry="6.4" fill="#C9A3AB" stroke="currentColor" strokeWidth="1.8" />
      <ellipse cx="60" cy="73.5" rx="5.5" ry="4.2" fill="#E8C4C8" />
    </svg>
  );
}

export function PawPrint({ className, title }: { className?: string; title?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={cn("shrink-0", className)} fill="currentColor" aria-hidden={!title} role={title ? "img" : "presentation"}>
      {title ? <title>{title}</title> : null}
      <ellipse cx="24" cy="30" rx="10" ry="8.2" />
      <ellipse cx="10" cy="16" rx="5" ry="6.2" />
      <ellipse cx="19.5" cy="10" rx="5.2" ry="6.4" />
      <ellipse cx="29.5" cy="10" rx="5.2" ry="6.4" />
      <ellipse cx="38.5" cy="17" rx="5" ry="6.2" />
    </svg>
  );
}

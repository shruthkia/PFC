import Image from "next/image";
import { cn } from "@/lib/utils";

type HouseMarkProps = {
  className?: string;
  decorative?: boolean;
  priority?: boolean;
};

export function HouseMark({ className, decorative = false, priority = false }: HouseMarkProps) {
  return (
    <Image
      src="/logo.png"
      alt={decorative ? "" : "PawsForCause"}
      width={256}
      height={224}
      className={cn("shrink-0 bg-transparent object-contain", className)}
      style={{ backgroundColor: "transparent", color: "transparent" }}
      aria-hidden={decorative || undefined}
      priority={priority}
      unoptimized
    />
  );
}

export function PawPrint({ className, title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 48 48"
      className={cn("shrink-0", className)}
      fill="currentColor"
      aria-hidden={!title}
      role={title ? "img" : "presentation"}
    >
      {title ? <title>{title}</title> : null}
      <ellipse cx="24" cy="30" rx="10" ry="8.2" />
      <ellipse cx="10" cy="16" rx="5" ry="6.2" />
      <ellipse cx="19.5" cy="10" rx="5.2" ry="6.4" />
      <ellipse cx="29.5" cy="10" rx="5.2" ry="6.4" />
      <ellipse cx="38.5" cy="17" rx="5" ry="6.2" />
    </svg>
  );
}

import Link from "next/link";
import { Info } from "lucide-react";

/**
 * Shown on pages whose tools are a working preview rather than a production
 * service. Workspace edits really are saved, but nothing reaches a school,
 * shelter, or national program.
 */
export function PrototypeBanner() {
  return (
    <aside
      aria-label="Prototype status"
      className="border-b-2 border-border bg-butter px-4 py-3 text-cocoa"
    >
      <div className="mx-auto flex max-w-[1200px] flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <p className="flex items-start gap-2 text-sm font-semibold leading-6">
          <Info aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
          <span>
            <strong className="font-extrabold">Interactive prototype.</strong> Workspace edits save to this
            preview only; nothing is sent to a school, shelter, or real PFC program.
          </span>
        </p>
        <Link
          href="/prototype"
          className="shrink-0 text-sm font-extrabold text-cocoa underline decoration-2 underline-offset-4 hover:text-rose"
        >
          What this means
        </Link>
      </div>
    </aside>
  );
}

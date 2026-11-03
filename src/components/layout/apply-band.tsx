import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { CHAPTER_FORM_URL } from "@/lib/utils";

export function ApplyBand({
  title = "If this sounds like your school, send the form",
  body = "HQ reads every interest form. If you are a fit, you get the registration pack, not a vague 'thanks for applying' email that goes nowhere.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="border-t-2 border-border bg-blush px-5 py-16 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <div className="scrap-card flex flex-col gap-6 bg-surface p-7 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="max-w-xl">
            <p className="font-hand text-2xl font-semibold text-rose">still reading? good.</p>
            <h2 className="mt-2 text-balance font-display text-3xl font-extrabold text-cocoa sm:text-4xl">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-7 text-muted">{body}</p>
          </div>
          <div className="flex shrink-0 flex-col gap-3 sm:items-end">
            <a
              href={CHAPTER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary"
            >
              Apply to start a chapter
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
            <Link href="/contact" className="text-sm font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Ask a question first
            </Link>
            <p className="inline-flex items-center gap-2 text-xs font-bold text-muted">
              <Heart aria-hidden className="h-3.5 w-3.5 text-rose" /> Under 18? Bring a guardian along.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

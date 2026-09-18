import Link from "next/link";
import { PawLogo } from "@/components/animated/paw-logo";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-cream/60 dark:bg-card/40">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 text-pink-deep">
              <PawLogo className="h-8 w-8" />
              <span className="font-display text-xl font-semibold text-foreground">
                {siteConfig.name}
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
              {siteConfig.description} Built by students, for animals and the communities
              that care for them.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Explore
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <Link href="#mission" className="hover:text-pink-deep">
                  Mission
                </Link>
              </li>
              <li>
                <Link href="#chapters" className="hover:text-pink-deep">
                  Start a chapter
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-pink-deep">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#team" className="hover:text-pink-deep">
                  Leadership
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Get involved
            </h2>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={CHAPTER_FORM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-pink-deep"
                >
                  Chapter interest form
                </a>
              </li>
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
              PFC is the student-led animal welfare network connected to Adopurr. Fiscal
              sponsorship is pending and will be announced when confirmed.
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p>High school chapters only for now. College expansion coming later.</p>
        </div>
      </div>
    </footer>
  );
}

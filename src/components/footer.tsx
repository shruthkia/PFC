import Link from "next/link";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-display text-2xl font-bold">{siteConfig.name}</p>
          <p className="font-mono text-[0.6rem] uppercase tracking-[0.25em] text-muted-foreground">
            Student-led · Animal welfare
          </p>
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted-foreground">
            Connected to Adopurr. Fiscal sponsorship pending. High school chapters only for now.
          </p>
        </div>

        <div className="flex gap-16">
          <ul className="space-y-2 font-mono text-[0.65rem] uppercase tracking-[0.15em]">
            <li>
              <Link href="#mission" className="text-muted hover:text-pink-hot">
                Mission
              </Link>
            </li>
            <li>
              <Link href="#path" className="text-muted hover:text-pink-hot">
                Path
              </Link>
            </li>
            <li>
              <Link href="#faq" className="text-muted hover:text-pink-hot">
                FAQ
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-mono text-[0.65rem] uppercase tracking-[0.15em]">
            <li>
              <a
                href={CHAPTER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-pink-hot"
              >
                Apply
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-[1400px] font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        &copy; {new Date().getFullYear()} {siteConfig.name}
      </p>
    </footer>
  );
}

import Link from "next/link";
import { HouseMark } from "@/components/brand/house-mark";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/content";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-4 py-12 sm:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <HouseMark className="h-10 w-10 text-foreground" />
            <div>
              <p className="font-display text-xl font-bold">{siteConfig.name}</p>
              <p className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
                {siteConfig.tagline}
              </p>
            </div>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Student animal-welfare chapters. High school first. Fiscal sponsorship pending.
            Adopurr is the for-profit sibling, not the same org.
          </p>
        </div>

        <div className="flex gap-16">
          <ul className="space-y-2 font-mono text-[0.65rem] uppercase tracking-[0.15em]">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-muted hover:text-pink-hot">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <ul className="space-y-2 font-mono text-[0.65rem] uppercase tracking-[0.15em]">
            <li>
              <a
                href={CHAPTER_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-pink-hot"
              >
                Interest form
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-[1400px] font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted-foreground">
        &copy; {new Date().getFullYear()} {siteConfig.name} · House and paw mark shared with Adopurr
      </p>
    </footer>
  );
}

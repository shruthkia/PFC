"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";

const primaryLinks = [
  { href: "/about", label: "Our story" },
  { href: "/work", label: "The work" },
  { href: "/directory", label: "Chapters" },
  { href: "/impact", label: "Impact" },
  { href: "/start", label: "Start a chapter" },
  { href: "/faq", label: "FAQ" },
];

const moreLinks = [
  { href: "/leaderboard", label: "Leaderboards" },
  { href: "/adopt", label: "Adoption feed" },
  { href: "/shelter", label: "Shelter portal" },
  { href: "/alumni", label: "Alumni mentors" },
  { href: "/portal", label: "Chapter hub" },
  { href: "/advisor", label: "Advisor desk" },
  { href: "/admin", label: "National admin" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-cocoa bg-cream/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <HouseMark className="h-11 w-12" priority />
          <span className="font-display text-lg font-black tracking-[-.04em] text-cocoa">
            Paws<span className="text-rose">For</span>Cause
          </span>
        </Link>

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-extrabold transition-colors hover:text-rose",
                pathname === link.href ? "text-rose" : "text-cocoa/75",
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/login" className="hidden text-sm font-extrabold text-cocoa hover:text-rose sm:block">
            Chapter login
          </Link>
          <Link href="/apply" className="button-primary hidden min-h-0 px-4 py-2 text-xs sm:inline-flex">
            Apply <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-cocoa text-cocoa xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" className="border-t-2 border-cocoa bg-cream px-5 py-6 xl:hidden" aria-label="Mobile">
          <ul className="space-y-3">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block py-1 text-lg font-black text-cocoa">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/login" onClick={() => setOpen(false)} className="block py-1 text-lg font-black text-cocoa">
                Chapter login
              </Link>
            </li>
            <li className="pt-2">
              <Link href="/apply" onClick={() => setOpen(false)} className="button-primary w-full">
                Apply to start a chapter
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

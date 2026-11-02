"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import { roleHome, usePlatform } from "@/lib/platform-store";

const primaryLinks = [
  { href: "/directory", label: "Chapters" },
  { href: "/adopt", label: "Tasks" },
  { href: "/impact", label: "Impact" },
  { href: "/work", label: "The work" },
  { href: "/start", label: "Start" },
  { href: "/faq", label: "FAQ" },
];

const moreLinks = [
  { href: "/about", label: "Our story" },
  { href: "/leaderboard", label: "Leaderboards" },
  { href: "/shelter", label: "Post a shelter task" },
  { href: "/alumni", label: "Alumni mentors" },
  { href: "/portal", label: "Chapter hub" },
  { href: "/advisor", label: "Advisor desk" },
  { href: "/admin", label: "National admin" },
  { href: "/login", label: "Chapter login" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { session } = usePlatform();
  const accountHref = session ? roleHome[session.role] : "/login";
  const accountLabel = session ? session.name.split(" ")[0] || "Account" : "Login";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <HouseMark className="h-10 w-11 shrink-0" priority />
          <span className="font-display text-base font-extrabold leading-tight tracking-[-.02em] text-cocoa sm:text-lg">
            Paws<span className="text-rose">For</span>Cause
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-bold transition-colors hover:text-rose",
                pathname === link.href ? "text-rose" : "text-cocoa/80",
              )}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={accountHref} className="hidden text-sm font-bold text-cocoa hover:text-rose lg:block">
            {accountLabel}
          </Link>
          <Link href="/apply" className="button-primary hidden min-h-0 px-3.5 py-2 text-xs sm:inline-flex">
            Apply <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </Link>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-border text-cocoa xl:hidden"
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
        <nav id="mobile-nav" className="max-h-[75vh] overflow-y-auto border-t-2 border-border bg-surface px-5 py-6 xl:hidden" aria-label="Mobile">
          <ul className="space-y-3">
            {[...primaryLinks, ...moreLinks].map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={() => setOpen(false)} className="block py-1 text-lg font-extrabold text-cocoa">
                  {link.label}
                </Link>
              </li>
            ))}
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

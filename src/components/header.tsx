"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "#mission", label: "Mission" },
  { href: "#path", label: "Path" },
  { href: "#work", label: "Work" },
  { href: "#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label={`${siteConfig.name} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center border-2 border-foreground bg-pink-hot font-mono text-xs font-medium text-white transition-transform group-hover:-rotate-6">
            P
          </span>
          <span className="hidden font-mono text-[0.65rem] uppercase tracking-[0.2em] sm:block">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] text-muted transition-colors hover:text-pink-hot"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
              Start chapter
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-background px-4 py-6 md:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="font-mono text-sm uppercase tracking-widest"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild className="w-full">
                <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Start chapter
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

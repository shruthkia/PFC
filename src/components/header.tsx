"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { HouseMark } from "@/components/brand/house-mark";
import { CHAPTER_FORM_URL } from "@/lib/utils";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border bg-background/90 backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <HouseMark className="h-9 w-10" priority />
          <span className="font-display text-base font-bold tracking-tight">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "font-mono text-[0.65rem] uppercase tracking-[0.15em] transition-colors hover:text-pink-hot",
                pathname === link.href ? "text-pink-hot" : "text-muted"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild size="sm" className="hidden sm:inline-flex">
            <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
              Apply
            </a>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
          className="border-t border-border bg-background px-4 py-6 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="space-y-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="font-mono text-sm uppercase tracking-widest">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Button asChild className="w-full">
                <a href={CHAPTER_FORM_URL} target="_blank" rel="noopener noreferrer">
                  Chapter interest form
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

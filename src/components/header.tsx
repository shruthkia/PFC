"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { useSessionUser } from "@/components/auth/use-session-user";
import { CHAPTER_FORM_URL, cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

const primaryLinks = [
  { href: "/", label: "Home" },
  { href: "/work", label: "What chapters do" },
  { href: "/impact", label: "Impact" },
  { href: "/faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const session = useSessionUser();
  const accountHref = session ? "/account" : "/login";
  const accountLabel = session ? "Account" : "Sign in";
  const toggleRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const root = navRef.current;
    const focusables = () =>
      Array.from(root?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    focusables()[0]?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b-2 border-border bg-surface/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-3 px-4 sm:px-8">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <HouseMark className="h-10 w-11 shrink-0" priority decorative />
          <span className="truncate font-display text-lg font-extrabold tracking-[-.01em] text-cocoa">
            Paws<span className="text-rose">For</span>Cause
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Main navigation">
          {primaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 text-[0.8rem] font-bold transition-colors hover:text-rose",
                  active ? "text-rose" : "text-cocoa/85",
                )}
                aria-current={active ? "page" : undefined}
              >
                {link.label}
                {active ? (
                  <span aria-hidden className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-rose" />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link href={accountHref} className="hidden text-sm font-bold text-cocoa hover:text-rose lg:block">
            {accountLabel}
          </Link>
          <a
            href={CHAPTER_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary hidden min-h-0 px-3.5 py-2 text-xs sm:inline-flex"
          >
            Apply <ArrowUpRight aria-hidden className="h-3.5 w-3.5" />
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-border bg-surface-strong text-cocoa xl:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X aria-hidden className="h-5 w-5" /> : <Menu aria-hidden className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button
            type="button"
            tabIndex={-1}
            aria-hidden
            className="fixed inset-0 top-16 z-40 bg-cocoa/25 xl:hidden"
            onClick={() => setOpen(false)}
          />
          <nav
            ref={navRef}
            id="mobile-nav"
            className="relative z-50 max-h-[calc(100vh-4rem)] overflow-y-auto border-t-2 border-border bg-surface px-5 py-6 xl:hidden"
            aria-label="Mobile navigation"
          >
            <p className="text-[.65rem] font-black uppercase tracking-[.16em] text-muted">Explore</p>
            <ul className="mt-2 space-y-1">
              {primaryLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={cn(
                      "flex min-h-11 items-center rounded-xl px-3 py-2 text-lg font-extrabold hover:bg-blush/60",
                      pathname === link.href ? "text-rose" : "text-cocoa",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="mt-6 border-t border-border pt-5 text-[.65rem] font-black uppercase tracking-[.16em] text-muted">
              Chapter access
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-muted">
              One account opens the workspace for your role.
            </p>
            <Link
              href={accountHref}
              onClick={() => setOpen(false)}
              className="mt-3 flex min-h-11 items-center gap-2 rounded-xl px-3 py-2 text-base font-extrabold text-rose hover:bg-blush/60"
            >
              {session ? `Account · ${session.name.split(" ")[0]}` : "Sign in to your chapter"}
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>

            <a
              href={CHAPTER_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="button-primary mt-6 w-full"
            >
              Apply to start a chapter
            </a>
          </nav>
        </>
      ) : null}
    </header>
  );
}

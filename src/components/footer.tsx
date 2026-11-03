import Link from "next/link";
import { HouseMark } from "@/components/brand/house-mark";
import { siteConfig } from "@/lib/config";
import { CHAPTER_FORM_URL } from "@/lib/utils";

const footerLinks = {
  Explore: [
    { href: "/", label: "Home" },
    { href: "/about", label: "Our story" },
    { href: "/work", label: "What chapters do" },
    { href: "/impact", label: "Impact" },
    { href: "/faq", label: "FAQ" },
  ],
  Participate: [
    { href: CHAPTER_FORM_URL, label: "Apply to start a chapter" },
    { href: "/start", label: "How chapters launch" },
    { href: "/directory", label: "Chapter map" },
    { href: "/prototype", label: "Prototype preview" },
    { href: "/contact", label: "Contact" },
  ],
  "Trust & legal": [
    { href: "/safety", label: "Youth & animal safety" },
    { href: "/conduct", label: "Code of conduct" },
    { href: "/privacy", label: "Privacy notice" },
    { href: "/cookies", label: "Cookie notice" },
    { href: "/terms", label: "Terms of use" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto">
      <div className="scallop-border rotate-180" aria-hidden />
      <div className="gingham border-t-2 border-border px-5 pb-10 pt-14 sm:px-10">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid gap-12 lg:grid-cols-[1.05fr_1.95fr]">
            <div className="max-w-md">
              <div className="flex items-center gap-3">
                <HouseMark className="h-14 w-16" decorative />
                <div>
                  <p className="font-display text-2xl font-extrabold tracking-tight text-cocoa">{siteConfig.name}</p>
                  <p className="font-hand text-xl font-semibold text-rose">students showing up for animals</p>
                </div>
              </div>
              <p className="mt-5 text-sm leading-7 text-muted">
                A student-led network of chapter branches delivering documented shelter support — scrap toys,
                clean funds, and completable mini-tasks.
              </p>
              <p className="mt-4 text-sm font-semibold text-muted">
                Questions?{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="break-all text-rose underline decoration-2 underline-offset-2 hover:text-cocoa"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p className="mt-2 text-sm font-semibold text-muted">
                Safety concerns?{" "}
                <a
                  href={`mailto:${siteConfig.safetyEmail}`}
                  className="break-all text-rose underline decoration-2 underline-offset-2 hover:text-cocoa"
                >
                  {siteConfig.safetyEmail}
                </a>
              </p>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              {Object.entries(footerLinks).map(([title, links]) => (
                <div key={title}>
                  <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-cocoa">{title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {links.map((link) => (
                      <li key={`${title}-${link.href}`}>
                        {link.href.startsWith("http") ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block py-0.5 text-sm font-semibold text-muted hover:text-rose"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="inline-block py-0.5 text-sm font-semibold text-muted hover:text-rose"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>

          <div className="mt-12 border-t border-border pt-6">
            <div className="flex flex-col gap-3 text-xs font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>
                &copy; {year} {siteConfig.name}. All rights reserved. PawsForCause is a student-led
                animal-welfare network; Adopurr is a separate product.
              </p>
              <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <Link href="/terms" className="underline underline-offset-2 hover:text-rose">
                  Terms
                </Link>
                <span aria-hidden>·</span>
                <Link href="/privacy" className="underline underline-offset-2 hover:text-rose">
                  Privacy
                </Link>
                <span aria-hidden>·</span>
                <Link href="/cookies" className="underline underline-offset-2 hover:text-rose">
                  Cookies
                </Link>
                <span aria-hidden>·</span>
                <Link href="/accessibility" className="underline underline-offset-2 hover:text-rose">
                  Accessibility
                </Link>
              </p>
            </div>
            <p className="mt-4 text-xs font-semibold text-muted">
              Made by students. Verified work is published with permission; this site is not a substitute for
              emergency services or veterinary advice.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import { HouseMark } from "@/components/brand/house-mark";
import { siteConfig } from "@/lib/content";

const footerLinks = {
  Explore: [
    { href: "/about", label: "Our story" },
    { href: "/work", label: "Chapter work" },
    { href: "/directory", label: "Chapter map" },
    { href: "/impact", label: "Impact board" },
    { href: "/leaderboard", label: "Leaderboards" },
    { href: "/faq", label: "FAQ" },
  ],
  Participate: [
    { href: "/apply", label: "Chapter application" },
    { href: "/login", label: "Chapter login" },
    { href: "/portal", label: "Chapter hub" },
    { href: "/shelter", label: "Post a shelter task" },
    { href: "/adopt", label: "Shelter mini-tasks" },
    { href: "/alumni", label: "Alumni mentors" },
  ],
  "Ops & trust": [
    { href: "/advisor", label: "Advisor desk" },
    { href: "/admin", label: "National admin / CMS" },
    { href: "/safety", label: "Youth safety" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/accessibility", label: "Accessibility" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t-2 border-border bg-blush px-5 py-14 sm:px-10">
      <div className="mx-auto grid max-w-[1250px] gap-12 lg:grid-cols-[1.15fr_1.85fr]">
        <div className="max-w-md">
          <div className="flex items-center gap-3">
            <HouseMark className="h-14 w-16" />
            <div>
              <p className="font-display text-2xl font-extrabold tracking-tight text-cocoa">{siteConfig.name}</p>
              <p className="font-hand text-xl font-semibold text-rose">students showing up for animals</p>
            </div>
          </div>
          <p className="mt-5 text-sm leading-7 text-muted">
            A student-led network of chapter branches delivering documented shelter support: scrap toys, funds, and completable mini-tasks.
          </p>
          <p className="mt-4 text-sm font-semibold text-muted">
            Questions?{" "}
            <a href="mailto:hello@pawsforcause.org" className="text-rose underline decoration-2 underline-offset-2 hover:text-cocoa">
              hello@pawsforcause.org
            </a>
          </p>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h2 className="text-xs font-extrabold uppercase tracking-[0.16em] text-cocoa">{title}</h2>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={`${title}-${link.href}`}>
                    <Link href={link.href} className="text-sm font-semibold text-muted hover:text-rose">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1250px] flex-col gap-3 border-t border-border pt-6 text-xs font-semibold text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p>
          <Link href="/accessibility" className="underline underline-offset-2 hover:text-rose">
            Accessibility
          </Link>
          {" · "}Prefer light or dark? Use the sun/moon toggle in the header.
        </p>
      </div>
    </footer>
  );
}

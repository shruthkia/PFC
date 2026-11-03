import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Home, MapPin } from "lucide-react";
import { PawTrail } from "@/components/brand/animal-doodles";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="gingham flex min-h-[calc(100vh-8rem)] items-center px-5 pb-20 pt-28 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="scrap-card bg-surface px-6 py-12 text-center sm:px-12">
          <p className="eyebrow">Error 404</p>
          <p className="mt-6 font-hand text-3xl font-semibold text-rose">this page wandered off</p>
          <h1 className="mt-2 font-display text-4xl font-extrabold leading-tight text-cocoa sm:text-5xl">
            We sniffed around, but nobody was home.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-muted">
            The link may be old, or the page may have moved. The animals are still waiting, so here are
            some doors that do open.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="button-primary">
              <Home aria-hidden className="h-4 w-4" /> Back home
            </Link>
            <Link href="/directory" className="button-paper">
              <MapPin aria-hidden className="h-4 w-4" /> Find a chapter
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold">
            <Link href="/start" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              How chapters launch <ArrowRight aria-hidden className="inline h-3.5 w-3.5" />
            </Link>
            <Link href="/faq" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Read the FAQ
            </Link>
            <Link href="/contact" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Contact us
            </Link>
          </div>
          <div className="mx-auto mt-10 max-w-[220px] text-rose/50">
            <PawTrail />
          </div>
        </div>
      </div>
    </section>
  );
}

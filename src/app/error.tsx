"use client";

import Link from "next/link";
import { RotateCcw, Home } from "lucide-react";

export default function ErrorBoundary({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="gingham flex min-h-[calc(100vh-8rem)] items-center px-5 pb-20 pt-28 sm:px-10">
      <div className="mx-auto w-full max-w-2xl">
        <div className="scrap-card bg-surface px-6 py-12 text-center sm:px-12">
          <p className="eyebrow">Something went wrong</p>
          <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-cocoa sm:text-5xl">
            That page tripped over its own tail.
          </h1>
          <p className="mx-auto mt-4 max-w-md leading-7 text-muted">
            The page did not load. Try again, and if it keeps happening send us a note with what you
            were doing so we can fix it.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button type="button" onClick={reset} className="button-primary">
              <RotateCcw aria-hidden className="h-4 w-4" /> Try again
            </button>
            <Link href="/" className="button-paper">
              <Home aria-hidden className="h-4 w-4" /> Back home
            </Link>
          </div>
          <p className="mt-8 text-sm font-bold text-muted">
            Still stuck?{" "}
            <Link href="/contact" className="text-rose underline decoration-2 underline-offset-4">
              Contact the team
            </Link>
            .
          </p>
        </div>
      </div>
    </section>
  );
}

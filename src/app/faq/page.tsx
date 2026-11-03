import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { FaqList } from "@/components/sections/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What makes a PFC chapter official, how hours work, how to report, and how fundraising works.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="FAQ"
        title="The questions people actually ask before they apply"
        lede="If the answer is 'it depends,' we say so. If we cannot claim it yet, we leave it in the crate."
      />

      <section className="bg-background px-5 py-16 sm:px-10 sm:py-20">
        <div className="mx-auto max-w-[900px]">
          <div className="scrap-card bg-surface p-5 sm:p-8">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-border pb-4">
              <div>
                <p className="font-hand text-2xl font-semibold text-rose">ask away</p>
                <h2 className="mt-1 font-display text-2xl font-extrabold text-cocoa">Ten honest answers</h2>
              </div>
              <span className="lede-sticker">Updated Nov 2026</span>
            </div>
            <FaqList />
          </div>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[1.5rem] border-2 border-dashed border-border bg-blush/40 p-6 sm:flex-row sm:items-center">
            <div>
              <p className="font-display text-xl font-extrabold text-cocoa">Question not here?</p>
              <p className="mt-1 text-sm leading-6 text-muted">
                Send it to HQ. Real questions make the next version of this page better.
              </p>
            </div>
            <Link href="/contact" className="button-paper shrink-0">
              Contact the team
            </Link>
          </div>
        </div>
      </section>

      <ApplyBand />
    </>
  );
}

import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { ApplyBand } from "@/components/layout/apply-band";
import { FaqList } from "@/components/sections/faq-list";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "What makes a PFC chapter official, how hours work, how to report, and how fundraising works.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero
        kicker="FAQ"
        title="The questions people actually ask before they apply"
        lede="If the answer is 'it depends,' we say so. If we cannot claim it yet, we leave it in the crate."
      />
      <section className="px-4 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-[800px]">
          <FaqList />
        </div>
      </section>
      <ApplyBand />
    </>
  );
}

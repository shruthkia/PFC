import type { Metadata } from "next";
import { ImpactBoard } from "@/components/impact-board";

export const metadata: Metadata = {
  title: "Impact & fundraising",
  description: "Network-wide impact counters, fundraising progress bars, and public announcements.",
  alternates: { canonical: "/impact" },
};

export default function ImpactPage() {
  return <ImpactBoard />;
}

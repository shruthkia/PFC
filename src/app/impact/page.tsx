import type { Metadata } from "next";
import { ImpactBoard } from "@/components/impact-board";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  title: "Impact & fundraising",
  description: "Network-wide impact counters, fundraising progress bars, and public announcements.",
  alternates: { canonical: "/impact" },
};

export const dynamic = "force-dynamic";

export default async function ImpactPage() {
  const network = await getPublicNetwork();
  return <ImpactBoard network={network} />;
}

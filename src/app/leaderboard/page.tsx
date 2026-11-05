import type { Metadata } from "next";
import { LeaderboardBoard } from "@/components/leaderboard-board";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  title: "Inter-chapter leaderboards",
  description: "Rankings for the most active PawsForCause chapters by toys, funds, and projects.",
  alternates: { canonical: "/leaderboard" },
};

export const dynamic = "force-dynamic";

export default async function LeaderboardPage() {
  const network = await getPublicNetwork();
  return <LeaderboardBoard records={network.records} />;
}

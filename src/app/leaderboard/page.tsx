import type { Metadata } from "next";
import { LeaderboardBoard } from "@/components/leaderboard-board";

export const metadata: Metadata = {
  title: "Inter-chapter leaderboards",
  description: "Rankings for the most active PawsForCause chapters by hours, funds, and projects.",
  alternates: { canonical: "/leaderboard" },
};

export default function LeaderboardPage() {
  return <LeaderboardBoard />;
}

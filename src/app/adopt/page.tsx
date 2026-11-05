import type { Metadata } from "next";
import { AdoptionFeed } from "@/components/adoption-feed";

export const metadata: Metadata = {
  title: "Shelter mini-task board",
  description: "Small jobs posted by shelter partners for PawsForCause chapters to claim and finish.",
  alternates: { canonical: "/adopt" },
};

export default function AdoptPage() {
  return <AdoptionFeed />;
}

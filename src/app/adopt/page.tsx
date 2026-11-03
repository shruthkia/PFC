import type { Metadata } from "next";
import { AdoptionFeed } from "@/components/adoption-feed";

export const metadata: Metadata = {
  title: "Shelter mini-task board preview",
  description: "Sample mini-tasks that show how shelters and PawsForCause chapters could work together.",
  alternates: { canonical: "/adopt" },
};

export default function AdoptPage() {
  return <AdoptionFeed />;
}

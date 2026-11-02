import type { Metadata } from "next";
import { AdoptionFeed } from "@/components/adoption-feed";

export const metadata: Metadata = {
  title: "Adoption partner feed",
  description: "Adoptable animals streamed from local shelter partners for public and chapter outreach pages.",
};

export default function AdoptPage() {
  return <AdoptionFeed />;
}

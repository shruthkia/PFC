import type { Metadata } from "next";
import { AdoptionFeed } from "@/components/adoption-feed";

export const metadata: Metadata = {
  title: "Shelter mini-task board",
  description: "Completable mini-tasks shelters post for PawsForCause chapters — sew toys, sort supplies, assemble packets.",
};

export default function AdoptPage() {
  return <AdoptionFeed />;
}

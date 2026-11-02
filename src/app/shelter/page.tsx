import type { Metadata } from "next";
import { ShelterPortal } from "@/components/shelter-portal";

export const metadata: Metadata = {
  title: "Shelter mini-task portal",
  description: "Partner shelters post small completable tasks for nearby PawsForCause chapter branches.",
};

export default function ShelterPage() {
  return <ShelterPortal />;
}

import type { Metadata } from "next";
import { ShelterPortal } from "@/components/shelter-portal";

export const metadata: Metadata = {
  title: "Shelter request portal",
  description: "Partner shelters broadcast physical needs and event help requests to nearby PawsForCause chapters.",
};

export default function ShelterPage() {
  return <ShelterPortal />;
}

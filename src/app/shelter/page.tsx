import type { Metadata } from "next";
import { ShelterPortal } from "@/components/shelter-portal";
import { requireRole } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Shelter mini-task portal",
  description: "Partner shelters post small completable tasks for nearby PawsForCause chapter branches.",
  robots: { index: false, follow: false },
};

export default async function ShelterPage() {
  await requireRole("shelter", "/shelter");
  return <ShelterPortal />;
}

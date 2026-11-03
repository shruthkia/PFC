import type { Metadata } from "next";
import { AlumniPortal } from "@/components/alumni-portal";
import { requireRole } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Alumni portal",
  description: "Graduating seniors sign up as mentors or bridge into university animal-welfare circles.",
  robots: { index: false, follow: false },
};

export default async function AlumniPage() {
  const user = await requireRole("alumni", "/alumni");
  return <AlumniPortal memberName={user.name} />;
}

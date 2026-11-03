import type { Metadata } from "next";
import { AdvisorDesk } from "@/components/advisor-desk";
import { requireRole } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Advisor dashboard",
  description: "Faculty advisors review, verify, and electronically sign off student service hours.",
  robots: { index: false, follow: false },
};

export default async function AdvisorPage() {
  const user = await requireRole("advisor", "/advisor");
  return <AdvisorDesk advisorName={user.name} />;
}

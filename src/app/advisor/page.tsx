import type { Metadata } from "next";
import { AdvisorDesk } from "@/components/advisor-desk";

export const metadata: Metadata = {
  title: "Advisor dashboard",
  description: "Faculty advisors review, verify, and electronically sign off student service hours.",
};

export default function AdvisorPage() {
  return <AdvisorDesk />;
}

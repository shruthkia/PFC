import type { Metadata } from "next";
import { ChapterHub } from "@/components/chapter-hub";
import { requireRole } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Chapter hub",
  description: "Launch checklist, hour logs, fundraising tracker, project docs, resources, consent, and certificates.",
  robots: { index: false, follow: false },
};

export default async function PortalPage() {
  const user = await requireRole("student", "/portal");
  return <ChapterHub memberName={user.name} />;
}

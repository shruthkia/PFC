import type { Metadata } from "next";
import { ChapterHub } from "@/components/chapter-hub";

export const metadata: Metadata = {
  title: "Chapter hub",
  description: "Launch checklist, hour logs, fundraising tracker, project docs, resources, consent, and certificates.",
};

export default function PortalPage() {
  return <ChapterHub />;
}

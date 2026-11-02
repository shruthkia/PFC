import type { Metadata } from "next";
import { ChapterHub } from "@/components/chapter-hub";

export const metadata: Metadata = {
  title: "Chapter hub preview",
  description: "Explore the PawsForCause chapter workspace for launches, service hours, shelter requests, and resources.",
};

export default function PortalPage() {
  return <ChapterHub />;
}

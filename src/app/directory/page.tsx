import type { Metadata } from "next";
import { ChapterDirectory } from "@/components/chapter-directory";

export const metadata: Metadata = {
  title: "Chapter directory & map",
  description: "Interactive map and filterable directory of PawsForCause chapters by state and school.",
};

export default function DirectoryPage() {
  return <ChapterDirectory />;
}

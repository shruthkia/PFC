import type { Metadata } from "next";
import { ChapterDirectory } from "@/components/chapter-directory";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  title: "Chapter directory & map",
  description: "Interactive map and filterable directory of PawsForCause chapters by state and school.",
  alternates: { canonical: "/directory" },
};

export const dynamic = "force-dynamic";

export default async function DirectoryPage() {
  const network = await getPublicNetwork();
  return <ChapterDirectory records={network.records} />;
}

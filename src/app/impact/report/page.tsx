import type { Metadata } from "next";
import { ImpactReport } from "@/components/impact-report";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  title: "Impact report",
  description: "Printable semester impact report for school boards, shelter partners, and grant packets.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function first(value: string | string[] | undefined, fallback: string) {
  if (Array.isArray(value)) return value[0] ?? fallback;
  return value ?? fallback;
}

export default async function ImpactReportPage({
  searchParams,
}: {
  searchParams: Promise<{ audience?: string | string[]; semester?: string | string[]; scope?: string | string[] }>;
}) {
  const params = await searchParams;
  const network = await getPublicNetwork();
  const generatedAt = new Date().toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <ImpactReport
      network={network}
      audience={first(params.audience, "School board")}
      semester={first(params.semester, "Fall 2026")}
      scope={first(params.scope, "All active chapters")}
      generatedAt={generatedAt}
    />
  );
}

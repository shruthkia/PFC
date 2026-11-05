import type { Metadata } from "next";
import { AdminConsole } from "@/components/admin-console";
import { requireRole } from "@/lib/auth/session";
import { getPublicNetwork } from "@/lib/public-record";

export const metadata: Metadata = {
  title: "National admin desk",
  description: "Claim review, Active Standard monitor, public CMS, impact reports, and social spotlight queue.",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireRole("admin", "/admin");
  const network = await getPublicNetwork();
  return <AdminConsole network={network} />;
}

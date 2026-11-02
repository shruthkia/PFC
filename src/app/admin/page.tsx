import type { Metadata } from "next";
import { AdminConsole } from "@/components/admin-console";

export const metadata: Metadata = {
  title: "National admin desk",
  description: "Claim review, Active Standard monitor, public CMS, impact reports, and social spotlight queue.",
};

export default function AdminPage() {
  return <AdminConsole />;
}

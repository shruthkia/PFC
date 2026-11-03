import type { Metadata } from "next";
import { LoginGate } from "@/components/login-gate";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Prototype preview account",
  description:
    "Create or open a PawsForCause prototype account for the student, advisor, organizer, shelter, or alumni preview workspace.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const user = await getSessionUser();
  return <LoginGate initialUser={user} />;
}

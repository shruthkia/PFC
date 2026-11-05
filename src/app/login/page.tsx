import type { Metadata } from "next";
import { LoginGate } from "@/components/login-gate";
import { getSessionUser } from "@/lib/auth/session";

export const metadata: Metadata = {
  title: "Chapter sign in",
  description: "Sign in to the PawsForCause chapter workspace for your role.",
  robots: { index: false, follow: false },
};

export default async function LoginPage() {
  const user = await getSessionUser();
  return <LoginGate initialUser={user} />;
}

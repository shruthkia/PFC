import type { Metadata } from "next";
import { LoginGate } from "@/components/login-gate";

export const metadata: Metadata = {
  title: "Chapter login",
  description: "Magic-link sign-in for student leaders, advisors, organizers, shelter partners, and alumni.",
};

export default function LoginPage() {
  return <LoginGate />;
}

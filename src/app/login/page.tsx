import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginGate } from "@/components/login-gate";

export const metadata: Metadata = {
  title: "Chapter login",
  description: "Sign in for student leaders, advisors, organizers, shelter partners, and alumni.",
};

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="paper-grid grid min-h-screen place-items-center px-5">
          <p className="font-display text-xl font-extrabold text-cocoa">Loading login…</p>
        </div>
      }
    >
      <LoginGate />
    </Suspense>
  );
}

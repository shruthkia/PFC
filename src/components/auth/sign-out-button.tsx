"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function SignOutButton({ className = "button-paper" }: { className?: string }) {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  async function signOut() {
    setPending(true);
    try {
      await fetch("/api/auth/signout", {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      router.push("/login");
      router.refresh();
    } finally {
      setPending(false);
    }
  }

  return (
    <button type="button" className={className} onClick={signOut} disabled={pending}>
      <LogOut aria-hidden className="h-4 w-4" /> {pending ? "Signing out…" : "Sign out"}
    </button>
  );
}

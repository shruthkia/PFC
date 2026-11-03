"use client";

import { useEffect, useState } from "react";
import type { RoleId } from "@/lib/auth/roles";

export type SessionUser = {
  id: string;
  email: string;
  name: string;
  role: RoleId;
  chapterId: string;
};

export function useSessionUser() {
  const [user, setUser] = useState<SessionUser | null | undefined>(undefined);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store", credentials: "same-origin" })
      .then((response) => response.json())
      .then((data: { user?: SessionUser | null }) => {
        if (active) setUser(data.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      });
    return () => {
      active = false;
    };
  }, []);

  return user;
}

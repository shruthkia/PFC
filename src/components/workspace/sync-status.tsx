"use client";

import { useEffect, useState } from "react";
import { Check, CloudOff } from "lucide-react";

type SyncState = { ok: boolean; message?: string } | null;

export function SyncStatus() {
  const [state, setState] = useState<SyncState>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    const onSync = (event: Event) => {
      const detail = (event as CustomEvent<{ ok: boolean; message?: string }>).detail;
      if (!detail) return;
      setState(detail);
      if (timer) clearTimeout(timer);
      if (detail.ok) {
        timer = setTimeout(() => setState(null), 1600);
      }
    };

    window.addEventListener("pfc:sync", onSync);
    return () => {
      window.removeEventListener("pfc:sync", onSync);
      if (timer) clearTimeout(timer);
    };
  }, []);

  if (!state) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-4 z-[80] flex max-w-xs items-start gap-2 rounded-2xl border-2 px-4 py-3 text-xs font-bold shadow-sketch ${
        state.ok
          ? "border-[#4d7357] bg-mint text-[#31513a]"
          : "border-[#8a5a24] bg-[#fff3d6] text-[#5c3b12]"
      }`}
    >
      {state.ok ? (
        <Check aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <CloudOff aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <span>{state.ok ? "Saved to the chapter record." : state.message ?? "Could not save."}</span>
    </div>
  );
}

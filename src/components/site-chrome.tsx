"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PrototypeBanner } from "@/components/prototype-banner";
import { SyncStatus } from "@/components/workspace/sync-status";

const prototypePaths = [
  "/prototype",
  "/login",
  "/account",
  "/portal",
  "/advisor",
  "/admin",
  "/shelter",
  "/alumni",
  "/adopt",
  "/leaderboard",
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname === "/portal";
  const isPrototype = prototypePaths.some(
    (path) => pathname === path || pathname.startsWith(`${path}/`),
  );

  return (
    <>
      {!immersive ? <Header /> : null}
      {isPrototype ? (
        <div className={immersive ? undefined : "pt-16"}>
          <PrototypeBanner />
        </div>
      ) : null}
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      {!immersive ? <Footer /> : null}
      <SyncStatus />
    </>
  );
}

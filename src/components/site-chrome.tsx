"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const immersive = pathname === "/portal";

  return (
    <>
      {!immersive ? <Header /> : null}
      <main id="main-content" className="relative flex-1">
        {children}
      </main>
      {!immersive ? <Footer /> : null}
    </>
  );
}

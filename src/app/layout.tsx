import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { siteConfig } from "@/lib/content";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlex = IBM_Plex_Mono({
  variable: "--font-ibm-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.name} | Student-led animal welfare chapters`,
  description: siteConfig.description,
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${ibmPlex.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <CursorGlow />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Header />
          <main id="main-content" className="relative flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

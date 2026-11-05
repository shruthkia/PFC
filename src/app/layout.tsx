import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Figtree, Shantell_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SiteChrome } from "@/components/site-chrome";
import { CursorGlow } from "@/components/effects/cursor-glow";
import { siteConfig } from "@/lib/content";
import "leaflet/dist/leaflet.css";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  display: "swap",
});

const shantell = Shantell_Sans({
  variable: "--font-shantell",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} · student animal-welfare chapters`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  keywords: [
    "student animal welfare",
    "high school volunteer club",
    "animal shelter volunteering",
    "community service hours",
    "PawsForCause",
    "student-led nonprofit",
  ],
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/logo.png", type: "image/png" }],
    shortcut: "/favicon.svg",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · student animal-welfare chapters`,
    description: siteConfig.description,
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name}: students showing up for animals`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} · student animal-welfare chapters`,
    description: siteConfig.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "light dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff6ef" },
    { media: "(prefers-color-scheme: dark)", color: "#1c1715" },
  ],
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: `${siteConfig.url}/logo.png`,
  description: siteConfig.description,
  email: siteConfig.email,
  areaServed: ["US", "CA", "QA", "IN"],
  knowsAbout: ["animal welfare", "student volunteering", "responsible adoption", "shelter support"],
  nonprofitStatus: "NonprofitType",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${bricolage.variable} ${figtree.variable} ${shantell.variable} h-full`}
    >
      <body className="grain min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <CursorGlow />
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <SiteChrome>{children}</SiteChrome>
        </ThemeProvider>
        <script
          type="application/ld+json"
          // Static, trusted data only. Never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </body>
    </html>
  );
}

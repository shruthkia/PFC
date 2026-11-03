import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Cookie notice",
  description: "What PawsForCause stores in your browser, why, and how to control it.",
  alternates: { canonical: "/cookies" },
};

export default function CookiesPage() {
  return (
    <LegalPage
      eyebrow="Trust & legal"
      title="Cookie notice"
      intro="PawsForCause keeps browser storage to a minimum. This notice explains what is stored, why, and how you stay in control."
      sections={[
        {
          title: "What this site stores",
          bullets: [
            "A theme preference (light or dark) saved in your browser's local storage so the site does not flash the wrong colours on your next visit.",
            "A session cookie named pfc_session after you sign in. It is HttpOnly, SameSite=Lax, and lasts up to 30 days; signing out deletes the session on the server.",
            "Account details (name, email, role) and workspace records (hours, claims, tasks, announcements, mentor requests) in the site's server database so the chapter desks share the same data.",
            "A local copy of workspace data under a pfc: prefix for offline fallback and for drafts, such as an unfinished chapter application. Drafts stay in your browser until you submit them.",
            "No advertising cookies, no cross-site tracking pixels, and no third-party marketing scripts are used on this site.",
            "The chapter map loads map images directly from OpenStreetMap. That request shares your IP address and ordinary browser headers with the tile service, but no account, advertising, or application data.",
          ],
        },
        {
          title: "Strictly necessary cookies",
          paragraphs: [
            "The pfc_session cookie keeps you signed in and protects forms against cross-site request forgery. It is required for the account workspaces to function and is never used for advertising. Mutating requests also check that they came from this site.",
          ],
        },
        {
          title: "Optional measurement",
          paragraphs: [
            "This site currently does not run analytics. If privacy-friendly analytics are added, they will be described here with the provider name, retention period, and the choice offered to visitors. Optional tools will not load before consent where consent is required.",
          ],
        },
        {
          title: "How to control stored data",
          bullets: [
            "Clear site data in your browser settings to remove the theme preference, local workspace copy, and application drafts. Signing out revokes the server session.",
            "Use a private or incognito window to browse without keeping local storage after the window closes.",
            "Block or delete cookies in your browser; the public site will still work, though sign-in features may not.",
            "Contact us if you need help understanding what is stored for your account.",
          ],
        },
        {
          title: "Changes to this notice",
          paragraphs: [
            "If the way we store information changes, this page will be updated and the effective date revised. Questions can go to hello@pawsforcause.org.",
          ],
        },
      ]}
    />
  );
}

import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Accessibility",
  alternates: { canonical: "/accessibility" },
};

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Access for everyone" title="Accessibility statement" intro="PawsForCause aims to make its public website and chapter tools usable by students, advisors, families, and shelter partners with a wide range of abilities and technologies." sections={[
    { title: "Our standard", paragraphs: ["We aim to meet WCAG 2.2 Level AA. Accessibility is part of design, writing, development, testing, and content review—not a final checklist."] },
    { title: "What the experience supports", bullets: ["Keyboard navigation, visible focus indicators, and a skip-to-content link.", "Semantic headings, form labels, status messages, and meaningful link text.", "Color contrast that does not rely on color alone to communicate state.", "Light and dark themes via the sun/moon toggle in the header — dark mode uses warm charcoal and muted rose instead of pure black or neon accents.", "Responsive layouts, large touch targets, zoom, and reduced-motion preferences (including reduced grain and cursor glow).", "Alternative text for meaningful images and decorative treatment for ornamental art."] },
    { title: "Known limits", paragraphs: ["The chapter map loads real OpenStreetMap tiles and is keyboard operable, but the chapter list beside it is the authoritative view: every pin has a matching list entry, so no location or chapter detail is map-only. Other third-party documents, social feeds, or shelter data should each receive an accessible fallback such as a list view, transcript, text summary, or downloadable accessible document before launch."] },
    { title: "Feedback", paragraphs: ["If you encounter a barrier, tell us which page or task caused trouble, what device or assistive technology you used, and the format you need. We will provide a reasonable alternative and use the report to improve the platform."] },
  ]} />;
}

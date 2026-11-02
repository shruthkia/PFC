import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return <LegalPage eyebrow="Access for everyone" title="Accessibility statement" intro="PawsForCause aims to make its public website and chapter tools usable by students, advisors, families, and shelter partners with a wide range of abilities and technologies." sections={[
    { title: "Our standard", paragraphs: ["We aim to meet WCAG 2.2 Level AA. Accessibility is part of design, writing, development, testing, and content review—not a final checklist."] },
    { title: "What the experience supports", bullets: ["Keyboard navigation, visible focus indicators, and a skip-to-content link.", "Semantic headings, form labels, status messages, and meaningful link text.", "Color contrast that does not rely on color alone to communicate state.", "Responsive layouts, large touch targets, zoom, and reduced-motion preferences.", "Alternative text for meaningful images and decorative treatment for ornamental art."] },
    { title: "Known limits", paragraphs: ["Some third-party documents, maps, social feeds, or shelter data may not fully meet our standard. Before those integrations launch, each should receive an accessible fallback such as a list view, transcript, text summary, or downloadable accessible document."] },
    { title: "Feedback", paragraphs: ["If you encounter a barrier, tell us which page or task caused trouble, what device or assistive technology you used, and the format you need. We will provide a reasonable alternative and use the report to improve the platform."] },
  ]} />;
}

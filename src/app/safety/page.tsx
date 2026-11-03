import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Youth and animal safety",
  alternates: { canonical: "/safety" },
};

export default function SafetyPage() {
  return <LegalPage eyebrow="Safety first" title="Youth & animal safety" intro="A successful project is one where students, shelter staff, volunteers, and animals are all treated with care. Public impact never comes before safety." sections={[
    { title: "Adult supervision and consent", bullets: ["Follow school and shelter supervision rules for every off-campus activity.", "Use the parent or guardian consent process before transportation, animal contact, or off-campus volunteering when required.", "Keep adult-to-student communication in group or institution-visible channels. Avoid private side conversations.", "Faculty advisors review chapter activity and verify student service records."] },
    { title: "Working around animals", bullets: ["Complete shelter orientation and follow staff instructions.", "Never handle an animal without permission or enter a restricted area.", "Respect stress signals, sanitation rules, allergy needs, and species-specific boundaries.", "Report bites, scratches, escapes, illness concerns, or unsafe conditions to the supervising adult immediately."] },
    { title: "Photos and personal information", bullets: ["Do not post a minor’s face, name, school schedule, contact details, or location without the required permission.", "Do not photograph restricted shelter areas, medical records, identifying tags, or people who have opted out.", "Remove location metadata when appropriate and submit only the proof needed for verification."] },
    { title: "Reporting a concern", paragraphs: ["For immediate danger, contact local emergency services and a trusted adult. For suspected abuse, neglect, harassment, exploitation, or unsafe conduct, follow school and local reporting rules and notify the designated PawsForCause safeguarding contact. The organization cannot promise confidentiality when law or safety requires escalation."] },
  ]} />;
}

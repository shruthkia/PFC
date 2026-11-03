import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Community code of conduct",
  description: "The behaviour we expect from students, advisors, shelters, alumni, and organizers in the PawsForCause network.",
  alternates: { canonical: "/conduct" },
};

export default function ConductPage() {
  return (
    <LegalPage
      eyebrow="How we treat each other"
      title="Community code of conduct"
      intro="PawsForCause is a network of teenagers, teachers, shelter staff, and volunteers. Being useful to animals starts with being safe and decent to people."
      sections={[
        {
          title: "Our shared commitments",
          bullets: [
            "Treat every member, advisor, shelter worker, and family with respect, regardless of identity, ability, background, or experience level.",
            "Assume good faith, ask before correcting, and criticise work rather than people.",
            "Make room for new members and first-time leaders; nobody should need prior status to contribute.",
            "Represent PawsForCause honestly in public, online, and at other schools.",
          ],
        },
        {
          title: "Not acceptable",
          bullets: [
            "Harassment, bullying, threats, hate speech, sexual comments, or unwanted contact of any kind.",
            "Private adult-to-student messaging created through PFC. Keep communication in group or institution-visible channels.",
            "Sharing a minor's name, face, contact details, location, or schedule without school and family permission.",
            "Falsifying service hours, fundraising totals, project evidence, or signatures.",
            "Animal cruelty, rough handling, or ignoring shelter staff instructions and animal stress signals.",
            "Collecting money outside approved chapter, school, and guardian procedures.",
          ],
        },
        {
          title: "Safety comes before the project",
          paragraphs: [
            "If an activity becomes unsafe, stop it. Follow school and shelter rules, keep the supervising adult informed, and report injuries, bites, scratches, escapes, or concerning behaviour immediately. No deadline is worth a hurt student or animal.",
          ],
        },
        {
          title: "Reporting and response",
          paragraphs: [
            "Report concerns to a trusted adult at your school and to the PawsForCause safeguarding contact at safety@pawsforcause.org. Reports are handled as privately as possible, and we will explain what happens next. We cannot promise confidentiality when the law or someone's safety requires escalation.",
            "HQ may pause a chapter, remove content, or end participation when this code is broken. We aim to be proportionate, consistent, and willing to hear context before deciding.",
          ],
        },
        {
          title: "Photos, stories, and credit",
          paragraphs: [
            "Get permission before photographing people, shelters, or animals that belong to someone else. Credit the people whose work appears in a post, and never publish a photo of a minor without the permission your school and family require.",
          ],
        },
      ]}
    />
  );
}

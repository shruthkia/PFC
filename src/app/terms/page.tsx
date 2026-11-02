import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = { title: "Terms of use" };

export default function TermsPage() {
  return <LegalPage eyebrow="Trust & legal" title="Terms of use" intro="These terms set the ground rules for using PawsForCause websites, chapter tools, resources, and community spaces." sections={[
    { title: "Who may use the platform", paragraphs: ["Students, advisors, parents or guardians, shelter partners, alumni, and authorized organizers may use the parts of the platform intended for their role. Students must meet the minimum age required in their location and involve a parent or guardian when consent is required."] },
    { title: "Community expectations", bullets: ["Submit accurate information and only claim hours, funds, and outcomes you can support.", "Follow school, shelter, transportation, animal-handling, and youth-safety rules.", "Do not harass, impersonate, exploit, discriminate against, or endanger another person or animal.", "Do not upload private information, copyrighted work, or images you lack permission to share.", "Do not use the platform to collect money outside approved chapter and school procedures."] },
    { title: "Accounts and moderation", paragraphs: ["Keep login credentials private and report suspected unauthorized access. PawsForCause may review, reject, remove, or correct submissions and may pause accounts or chapters that violate these terms, create safety risks, or repeatedly submit unsupported claims."] },
    { title: "Resources, trademarks, and content", paragraphs: ["PawsForCause owns or licenses its name, marks, website design, and national resources. Chapters receive a limited, revocable right to use approved materials for authorized chapter activity. Contributors keep ownership of their original content but grant PawsForCause permission to store, review, and—when approved—display it for network operations and impact reporting."] },
    { title: "Important limits", paragraphs: ["PawsForCause provides coordination tools and educational resources, not legal, medical, veterinary, tax, or financial advice. Shelter and school professionals control on-site activities. The platform may change or be unavailable, and specific integrations shown in a preview may not yet be active."] },
  ]} />;
}

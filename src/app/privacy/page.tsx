import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Privacy notice",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return <LegalPage eyebrow="Trust & legal" title="Privacy notice" intro="PawsForCause works with students, families, advisors, and shelters. We collect only the information needed to run chapters safely, verify service, and communicate about the network." sections={[
    { title: "Information we may collect", bullets: ["Application and account details, such as name, school, grade, email, chapter role, and advisor contact.", "Service and project records, including dates, hours, descriptions, fundraising totals, and uploaded proof.", "Consent and verification records from parents, guardians, faculty advisors, and shelter supervisors.", "Basic technical information used for security, accessibility, and service reliability."] },
    { title: "Accounts and workspace records", paragraphs: ["Creating an account stores your name, email, role, a scrypt password hash, and a recovery-code hash on the site's server. Workspace records such as hours, claims, tasks, announcements, and mentor requests are stored there so chapter desks share the same data. Passwords and recovery codes are never stored in readable form.", "You can request correction or deletion of your account and records by contacting hello@pawsforcause.org. Some safety or service records may need to be retained as described above."] },
    { title: "How we use information", bullets: ["Review chapter applications and maintain chapter accounts.", "Verify service claims, issue certificates, and create aggregate impact reports.", "Coordinate shelter requests, chapter resources, and safety communications.", "Publish approved stories and aggregate statistics. We do not publish a minor’s personal information or image without the required permission."] },
    { title: "Sharing and retention", paragraphs: ["Information may be shared with a student’s chapter advisor, school, parent or guardian, shelter supervisor, or authorized PawsForCause organizer when needed to verify work or protect safety. We do not sell personal information.", "Records are retained only as long as needed for chapter operations, legal obligations, safety, and documented service. Accounts and uploads should have clear deletion and correction processes before public launch.", "Opening the chapter map requests map images from OpenStreetMap, which receives your IP address and basic request headers. We do not send it your name, account, or application details."] },
    { title: "Student and family choices", bullets: ["Ask to review or correct personal information.", "Withdraw optional photo or publicity permission.", "Request account deletion, subject to records we must retain for safety or legal reasons.", "Contact a trusted adult and the organization if information was submitted without permission."] },
  ]} />;
}

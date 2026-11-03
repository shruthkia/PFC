import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, HeartHandshake, Mail, ShieldCheck, GraduationCap, Newspaper } from "lucide-react";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: "How to reach PawsForCause about starting a chapter, shelter partnerships, safety, accessibility, or press.",
  alternates: { canonical: "/contact" },
};

const channels = [
  {
    icon: HeartHandshake,
    title: "Start or run a chapter",
    body: "Questions about the application, school approval, playbooks, or the Active Standard. A real person from HQ reads these.",
    email: siteConfig.email,
    subject: "Chapter question",
    tone: "bg-blush",
  },
  {
    icon: BookOpen,
    title: "Shelter & rescue partners",
    body: "Post a mini-task the network can finish, or ask about a recurring supply partnership with nearby chapters.",
    email: siteConfig.email,
    subject: "Shelter partnership",
    tone: "bg-butter",
  },
  {
    icon: ShieldCheck,
    title: "Safety and safeguarding",
    body: "Report a concern about a student, an adult, an animal, or an activity. For immediate danger, contact local emergency services first.",
    email: siteConfig.safetyEmail,
    subject: "Safeguarding concern",
    tone: "bg-mint",
  },
  {
    icon: GraduationCap,
    title: "Advisors and schools",
    body: "Faculty advisors can ask about supervision, hour verification, certificates, and the paperwork your school needs.",
    email: siteConfig.email,
    subject: "Advisor question",
    tone: "bg-[#e8dff3] dark:bg-[#33283a]",
  },
  {
    icon: Newspaper,
    title: "Press and research",
    body: "Student journalists, school papers, and researchers can ask for network figures, the Adopurr distinction, or an interview.",
    email: siteConfig.email,
    subject: "Press request",
    tone: "bg-blush",
  },
  {
    icon: Mail,
    title: "Accessibility feedback",
    body: "Tell us the page, the task, your device or assistive technology, and the format that would work for you.",
    email: siteConfig.email,
    subject: "Accessibility feedback",
    tone: "bg-butter",
  },
];

export default function ContactPage() {
  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1150px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Say hello</p>
          <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-6xl">
            Who do you need to talk to?
          </h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
            Pick the closest door. We answer chapter and safety mail first, usually within a few school
            days. We are students too, so give us a minute after finals week.
          </p>
        </header>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {channels.map((channel) => (
            <article key={channel.title} className={`sticker-card p-6 ${channel.tone}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-border bg-surface-strong text-cocoa">
                <channel.icon aria-hidden className="h-5 w-5" />
              </span>
              <h2 className="mt-4 font-display text-xl font-extrabold text-cocoa">{channel.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{channel.body}</p>
              <a
                href={`mailto:${channel.email}?subject=${encodeURIComponent(channel.subject)}`}
                className="mt-4 inline-flex min-h-11 items-center gap-2 break-all text-sm font-extrabold text-rose underline decoration-2 underline-offset-4 hover:text-cocoa"
              >
                {channel.email}
              </a>
            </article>
          ))}
        </div>

        <aside className="mx-auto mt-12 max-w-3xl rounded-[1.75rem] border-2 border-border bg-surface p-6 text-center shadow-sketch sm:p-8">
          <p className="font-hand text-2xl font-semibold text-rose">Before you send</p>
          <p className="mt-3 text-sm leading-7 text-muted">
            Please do not email photos of students, medical information, or signed consent forms. Send a
            note first and we will share a safer upload path. If someone is in danger, call emergency
            services rather than waiting for an email reply.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-bold">
            <Link href="/safety" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Youth &amp; animal safety
            </Link>
            <Link href="/conduct" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Code of conduct
            </Link>
            <Link href="/accessibility" className="text-rose underline decoration-2 underline-offset-4 hover:text-cocoa">
              Accessibility
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

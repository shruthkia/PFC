"use client";

import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  BadgeCheck,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  Clock3,
  Download,
  FileText,
  HeartHandshake,
  LayoutDashboard,
  Menu,
  PawPrint,
  Plus,
  Printer,
  ShieldCheck,
  Upload,
  Users,
  X,
} from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { Field, ProgressBar, StatusPill } from "@/components/platform/ui";
import {
  chapters,
  fundCategories,
  hourEntries as hourSeed,
  launchChecklist as launchSeed,
  pendingClaims,
  projectTags,
  resources,
  shelterTasks as taskSeed,
  type ClaimRecord,
  type HourEntry,
  type ShelterTaskRecord,
} from "@/lib/platform-data";
import { resourceFiles, resourceSizeKb } from "@/lib/resource-content";
import { HOURS_QUALIFICATION } from "@/lib/qualification";
import {
  downloadTextFile,
  storageKeys,
  useStoredState,
} from "@/lib/storage";

type Tab =
  | "Overview"
  | "Launch plan"
  | "Service hours"
  | "Fundraising"
  | "Projects"
  | "Resources"
  | "Consent"
  | "Certificates"
  | "Members";

type FundEntry = {
  id: string;
  event: string;
  category: string;
  amount: number;
  beneficiary: string;
  status: "Pending HQ" | "Verified" | "Rejected";
  claimId?: string;
};

type ProjectEntry = {
  id: string;
  title: string;
  tags: string[];
  status: "Approved" | "Draft" | "Pending review" | "Rejected";
  body?: string;
  photos: string[];
  claimId?: string;
};

type ConsentEntry = {
  id: string;
  student: string;
  event: string;
  status: "Signed" | "Sent" | "Needed";
};

const nav: { label: Tab; icon: typeof LayoutDashboard }[] = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Launch plan", icon: CalendarDays },
  { label: "Service hours", icon: Clock3 },
  { label: "Fundraising", icon: CircleDollarSign },
  { label: "Projects", icon: HeartHandshake },
  { label: "Resources", icon: BookOpen },
  { label: "Consent", icon: ShieldCheck },
  { label: "Certificates", icon: BadgeCheck },
  { label: "Members", icon: Users },
];

const chapter = chapters.find((item) => item.id === "coppell") ?? chapters[0];

function makeId(prefix: string) {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}${Date.now()}`;
}

export function ChapterHub({ memberName = "Maya Chen" }: { memberName?: string }) {
  const [tab, setTab] = useState<Tab>("Overview");
  const [navOpen, setNavOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [hourOpen, setHourOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [proofNames, setProofNames] = useState<string[]>([]);
  const [photoNames, setPhotoNames] = useState<string[]>([]);
  const [certificate, setCertificate] = useState({
    student: memberName,
    hours: 0,
    semester: "Fall 2026",
  });

  const [checked, setChecked] = useStoredState(
    storageKeys.checklist,
    launchSeed.map((item) => item.done),
  );
  const [hours, setHours] = useStoredState<HourEntry[]>(storageKeys.hours, hourSeed);
  const [funds, setFunds] = useStoredState<FundEntry[]>(storageKeys.funds, [
    { id: "f1", event: "Bake sale", category: "Bake sale / campus sale", amount: 35, beneficiary: "Austin Animal Center medical fund", status: "Pending HQ" },
    { id: "f2", event: "Wishlist drive", category: "Wishlist / supplies", amount: 20, beneficiary: "Safe Harbor Rescue supply list", status: "Verified" },
  ]);
  const [projects, setProjects] = useStoredState<ProjectEntry[]>(storageKeys.projects, [
    { id: "p1", title: "October enrichment night", tags: ["Enrichment", "Shelter task"], status: "Approved", photos: [] },
    { id: "p2", title: "Sterilization hallway posters", tags: ["Education"], status: "Draft", photos: [] },
  ]);
  const [consents, setConsents] = useStoredState<ConsentEntry[]>(storageKeys.consents, [
    { id: "co1", student: memberName, event: "Austin Animal Center shift", status: "Signed" },
    { id: "co2", student: "Eli Park", event: "Austin Animal Center shift", status: "Sent" },
    { id: "co3", student: "Noah Diaz", event: "Austin Animal Center shift", status: "Needed" },
  ]);
  const [tasks, setTasks] = useStoredState<ShelterTaskRecord[]>(storageKeys.tasks, taskSeed);
  const [claims, setClaims] = useStoredState<ClaimRecord[]>(storageKeys.claims, pendingClaims);

  const progress = Math.round((checked.filter(Boolean).length / Math.max(1, checked.length)) * 100);
  const loggedHours = hours.reduce((total, row) => total + row.hours, 0);
  const verifiedHours = hours
    .filter((row) => row.status === "Verified")
    .reduce((total, row) => total + row.hours, 0);
  const mayaVerified = hours
    .filter((row) => row.status === "Verified" && row.student === memberName)
    .reduce((total, row) => total + row.hours, 0);
  const reviewCount = hours.filter((row) => row.status === "Advisor review").length;
  const openConsents = consents.filter((row) => row.status !== "Signed").length;
  const remainingSteps = checked.filter((done) => !done).length;
  const fundTotal = funds.reduce((total, row) => total + row.amount, 0);
  const fundPct = Math.min(100, Math.round((fundTotal / 150) * 100));
  function claimStatus(claimId?: string) {
    if (!claimId) return undefined;
    return claims.find((claim) => claim.id === claimId)?.status;
  }

  function fundStatus(row: FundEntry): FundEntry["status"] {
    const status = claimStatus(row.claimId);
    if (!status) return row.status;
    if (status === "approved") return "Verified";
    if (status === "rejected") return "Rejected";
    return "Pending HQ";
  }

  function projectStatus(row: ProjectEntry): ProjectEntry["status"] {
    const status = claimStatus(row.claimId);
    if (!status) return row.status;
    if (status === "approved") return "Approved";
    if (status === "rejected") return "Rejected";
    return "Pending review";
  }

  const approvedProjects = projects.filter((row) => projectStatus(row) === "Approved").length;
  const myChapterTasks = useMemo(
    () => tasks.filter((task) => /Coppell|Plano|Frisco|DFW/i.test(task.city)),
    [tasks],
  );

  const notifications = [
    ...(reviewCount
      ? [{ text: `${reviewCount} hour ${reviewCount === 1 ? "entry needs" : "entries need"} advisor sign-off`, tab: "Service hours" as Tab }]
      : []),
    ...(openConsents
      ? [{ text: `${openConsents} consent ${openConsents === 1 ? "waiver is" : "waivers are"} not signed yet`, tab: "Consent" as Tab }]
      : []),
    ...(remainingSteps
      ? [{ text: `${remainingSteps} launch ${remainingSteps === 1 ? "step" : "steps"} left in the 30-day plan`, tab: "Launch plan" as Tab }]
      : []),
    ...(myChapterTasks.filter((task) => !task.claimedBy).length
      ? [{ text: `${myChapterTasks.filter((task) => !task.claimedBy).length} nearby shelter tasks are still unclaimed`, tab: "Overview" as Tab }]
      : []),
  ];

  useEffect(() => {
    if (!notifOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setNotifOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [notifOpen]);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4600);
  }

  function addClaim(claim: Omit<ClaimRecord, "id" | "submitted" | "status">) {
    const id = makeId("c");
    setClaims((current) => [
      {
        ...claim,
        id,
        submitted: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        status: "pending",
      },
      ...current,
    ]);
    return id;
  }

  function submitHours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const entry: HourEntry = {
      id: makeId("h"),
      student: memberName,
      activity: String(data.get("activity") || "Activity"),
      date: String(data.get("date") || ""),
      hours: Number(data.get("hours") || 0),
      note: String(data.get("notes") || ""),
      proof: proofNames,
      status: "Advisor review",
    };
    setHours((current) => [entry, ...current]);
    setHourOpen(false);
    setProofNames([]);
    flash(`Saved to the preview chapter record and sent to the preview advisor queue (${entry.hours} hrs).`);
  }

  function submitFunds(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const amount = Number(data.get("amount") || 0);
    const eventName = String(data.get("event") || "Fundraiser");
    const beneficiary = String(data.get("beneficiary") || "Named shelter");
    const claimId = addClaim({
      chapter: "Coppell Paws",
      student: memberName,
      type: "Funds",
      summary: `${eventName} · $${amount}`,
    });
    setFunds((current) => [
      {
        id: makeId("f"),
        event: eventName,
        category: String(data.get("category") || ""),
        amount,
        beneficiary,
        status: "Pending HQ",
        claimId,
      },
      ...current,
    ]);
    setFundOpen(false);
    flash(`$${amount} added and sent to the national claim queue.`);
  }

  function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = projectTags.filter((tag) => data.get(`tag-${tag}`));
    const title = String(data.get("title") || "Untitled project");
    const claimId = addClaim({
      chapter: "Coppell Paws",
      student: memberName,
      type: "Project",
      summary: title,
    });
    setProjects((current) => [
      {
        id: makeId("p"),
        title,
        body: String(data.get("body") || ""),
        tags: selected.length ? selected : ["Outreach"],
        photos: photoNames,
        status: "Pending review",
        claimId,
      },
      ...current,
    ]);
    setProjectOpen(false);
    setPhotoNames([]);
    flash("Project saved to the preview claim queue. No national review is triggered.");
  }

  function sendConsent(id: string) {
    setConsents((current) =>
      current.map((item) => (item.id === id ? { ...item, status: "Sent" } : item)),
    );
    flash("Waiver status changed in the preview. No email is sent to a guardian.");
  }

  function claimTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, claimedBy: "Coppell Paws", claimedAt: new Date().toLocaleDateString() }
          : task,
      ),
    );
    flash("Task claimed in the preview. The public board is a sample, not a live shelter board.");
  }

  function printCertificate() {
    const safeName = certificate.student.replace(
      /[&<>"']/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char] ?? char,
    );
    const win = window.open("", "_blank", "width=920,height=680");
    if (!win) {
      flash("The certificate window was blocked. Allow pop-ups for this site and try again.");
      return;
    }
    const today = new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
    win.document.write(`<!doctype html><html lang="en"><head><meta charset="utf-8" />
<title>PawsForCause certificate — ${safeName}</title>
<style>
  @page { size: landscape; margin: 12mm; }
  body { margin: 0; padding: 24px; background: #fff6ef; color: #3f2f28; font-family: Georgia, 'Times New Roman', serif; }
  .certificate { max-width: 900px; margin: 0 auto; background: #fffdf8; border: 3px solid #5c4338; padding: 48px 56px; text-align: center; }
  .brand { font-family: 'Trebuchet MS', sans-serif; letter-spacing: .18em; text-transform: uppercase; font-size: 13px; font-weight: 700; color: #a8385d; }
  h1 { font-family: 'Trebuchet MS', sans-serif; font-size: 34px; margin: 18px 0 4px; }
  .name { font-size: 40px; font-weight: 700; margin: 26px 0 10px; }
  p { font-size: 16px; line-height: 1.6; margin: 8px 0; }
  .rule { border-top: 1px solid #c9b7a8; margin: 32px 0 22px; }
  .footer { display: flex; justify-content: space-between; align-items: flex-end; text-align: left; font-size: 12px; color: #6f5a50; }
  .sig { font-family: 'Brush Script MT', cursive; font-size: 26px; color: #a8385d; }
  .muted { color: #6f5a50; }
</style></head><body>
<div class="certificate">
  <p class="brand">PawsForCause · student animal-welfare network</p>
  <h1>Community Service Certificate</h1>
  <p class="muted">This certifies that</p>
  <p class="name">${safeName || "Student name"}</p>
  <p>completed <strong>${certificate.hours}</strong> verified hours of animal-welfare service with Coppell Paws during ${certificate.semester}.</p>
  <p class="muted">Verified by a faculty advisor and reported through the chapter hub.</p>
  <p class="muted">PFC can document participation. Schools and shelters decide whether hours are accepted.</p>
  <div class="rule"></div>
  <div class="footer">
    <div><p class="sig">Ms. Rivera</p><p>Faculty advisor · Coppell HS</p></div>
    <div><p>${today}</p><p>PawsForCause</p></div>
  </div>
</div>
</body></html>`);
    win.document.close();
    win.focus();
    win.setTimeout(() => win.print(), 400);
  }

  return (
    <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-background text-ink">
      <a href="#dashboard-main" className="skip-link">
        Skip to dashboard
      </a>
      <aside className="fixed inset-y-0 left-0 z-[70] w-72 overflow-y-auto border-r-2 border-border bg-blush p-5 transition-transform lg:translate-x-0">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PawsForCause home">
            <HouseMark className="h-11 w-12" decorative />
            <span className="font-display text-lg font-black text-cocoa">
              Paws<span className="text-rose">For</span>Cause
            </span>
          </Link>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center lg:hidden"
            onClick={() => setNavOpen(false)}
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <div className="mt-7 rounded-2xl border-2 border-border bg-surface-strong p-4 shadow-sketch">
          <p className="text-[.65rem] font-extrabold uppercase tracking-[.15em] text-rose">
            Your chapter
          </p>
          <p className="mt-1 font-display text-lg font-extrabold text-cocoa">Coppell Paws</p>
          <p className="mt-1 text-xs font-semibold text-muted">
            {memberName} · President · DFW
          </p>
          <p className="mt-3 border-t border-border pt-2 text-[.7rem] font-semibold leading-5 text-muted">
            Changes save to the shared chapter record for everyone signed in.
          </p>
        </div>

        <nav className="mt-7" aria-label="Chapter hub sections">
          <ul className="space-y-1">
            {nav.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => {
                    setTab(label);
                    setNavOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-extrabold transition ${
                    tab === label
                      ? "border-2 border-border bg-surface-strong text-cocoa shadow-sketch"
                      : "text-muted hover:bg-surface-strong/70 hover:text-cocoa"
                  }`}
                  aria-current={tab === label ? "page" : undefined}
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-7 space-y-3 border-t border-border pt-5 text-xs font-black uppercase tracking-[.1em]">
          <Link href="/advisor" className="block text-muted hover:text-rose">
            Advisor desk →
          </Link>
          <Link href="/admin" className="block text-muted hover:text-rose">
            National admin →
          </Link>
          <Link href="/account" className="block text-muted hover:text-rose">
            Account & sign out →
          </Link>
          <Link href="/" className="flex items-center gap-2 text-muted hover:text-rose">
            <ArrowLeft aria-hidden className="h-4 w-4" /> Public website
          </Link>
        </div>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="mt-4 text-left text-xs font-black uppercase tracking-[.1em] text-muted underline decoration-1 underline-offset-2 hover:text-rose"
        >
          Reload shared data
        </button>
      </aside>

      {navOpen ? (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-[60] bg-cocoa/30 lg:hidden"
          onClick={() => setNavOpen(false)}
        />
      ) : null}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 border-border bg-surface/95 px-4 backdrop-blur sm:px-7">
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-full border-2 border-border lg:hidden"
            onClick={() => setNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-5 w-5" aria-hidden />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-extrabold uppercase tracking-[.16em] text-muted">
              Chapter hub · Coppell branch
            </p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill tone="good">Shared chapter record</StatusPill>
            <div className="relative">
              <button
                type="button"
                className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-border bg-surface-strong"
                aria-label={`Notifications (${notifications.length})`}
                aria-expanded={notifOpen}
                aria-controls="hub-notifications"
                onClick={() => setNotifOpen((value) => !value)}
              >
                <Bell className="h-4 w-4" aria-hidden />
                {notifications.length ? (
                  <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full border border-border bg-rose px-1 text-[.6rem] font-black text-white">
                    {notifications.length}
                  </span>
                ) : null}
              </button>
              {notifOpen ? (
                <div
                  id="hub-notifications"
                  className="absolute right-0 top-12 z-50 w-72 rounded-2xl border-2 border-cocoa bg-surface-strong p-4 shadow-sketch"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-display text-lg font-black text-cocoa">Needs your attention</p>
                    <button
                      type="button"
                      onClick={() => setNotifOpen(false)}
                      aria-label="Close notifications"
                      className="grid h-8 w-8 place-items-center rounded-full border border-border"
                    >
                      <X className="h-4 w-4" aria-hidden />
                    </button>
                  </div>
                  {notifications.length ? (
                    <ul className="mt-3 space-y-2">
                      {notifications.map((item) => (
                        <li key={item.text}>
                          <button
                            type="button"
                            className="w-full rounded-xl border border-border bg-cream p-3 text-left text-xs font-bold leading-5 text-cocoa hover:border-cocoa"
                            onClick={() => {
                              setTab(item.tab);
                              setNotifOpen(false);
                            }}
                          >
                            {item.text}
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-3 text-sm font-semibold text-muted">Nothing is overdue. Nice.</p>
                  )}
                </div>
              ) : null}
            </div>
            <div
              className="grid h-10 w-10 place-items-center rounded-full border-2 border-border bg-mint font-extrabold text-cocoa"
              aria-label={`Signed in as ${memberName}`}
            >
              {memberName.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main id="dashboard-main" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-7 sm:py-10">
          {toast ? (
            <div
              role="status"
              className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
            >
              <BadgeCheck aria-hidden className="h-5 w-5" /> {toast}
            </div>
          ) : null}

          {tab === "Overview" ? (
            <div className="space-y-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-hand text-2xl font-semibold text-rose">Coppell · DFW branch</p>
                  <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-5xl">
                    Hi {memberName.split(" ")[0]}. What are we finishing today?
                  </h1>
                  <p className="mt-2 max-w-2xl text-muted">
                    This is the student side of PFC: log the work, attach proof, and let your advisor
                    verify it before anything counts publicly.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setHourOpen(true)} className="button-primary">
                    <Plus aria-hidden className="h-4 w-4" /> Log hours
                  </button>
                  <button type="button" onClick={() => setFundOpen(true)} className="button-paper">
                    Add funds
                  </button>
                  <button type="button" onClick={() => setProjectOpen(true)} className="button-paper">
                    Document project
                  </button>
                </div>
              </div>

              <section className="sticker-card bg-surface-strong p-5 sm:p-6">
                <h2 className="font-display text-2xl font-extrabold text-cocoa">How this workspace works</h2>
                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-border bg-cream p-4">
                    <p className="text-xs font-black uppercase tracking-[.13em] text-rose">What it is</p>
                    <p className="mt-2 text-sm leading-6 text-cocoa">
                      The real chapter workspace, loaded with the sample Coppell semester so you can try every tool.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-cream p-4">
                    <p className="text-xs font-black uppercase tracking-[.13em] text-rose">What saves</p>
                    <p className="mt-2 text-sm leading-6 text-cocoa">
                      Checks, hours, funds, projects and consent steps save to the shared chapter record.
                      Sign in on another device and they are still here.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-cream p-4">
                    <p className="text-xs font-black uppercase tracking-[.13em] text-rose">What is not live</p>
                    <p className="mt-2 text-sm leading-6 text-cocoa">
                      Payments and email delivery are not connected. Files are not uploaded; only their
                      names are recorded. The advisor and admin desks read the same records.
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm font-extrabold">
                  <Link href="/impact" className="text-rose underline decoration-2 underline-offset-4">
                    See the public impact board
                  </Link>
                  <Link href="/account" className="text-rose underline decoration-2 underline-offset-4">
                    Account & sign out
                  </Link>
                </div>
              </section>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric value={String(chapter.toys)} label="toys donated" note="fashion scrap workshops" color="bg-[#f6d8e1]" />
                <Metric value={`$${fundTotal}`} label="funds raised" note={`${fundPct}% of the $150 chapter goal`} color="bg-[#f4e3a6]" />
                <Metric value={String(chapter.projects)} label="projects finished" note={`${projects.length} documented in this hub`} color="bg-[#cfe1d2]" />
                <Metric value={String(chapter.members)} label="chapter members" note={`${openConsents} consent packets open`} color="bg-[#ddd5ed]" />
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
                <section className="sticker-card bg-white p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.15em] text-rose">30-day launch plan</p>
                      <h2 className="mt-2 font-display text-2xl font-black text-cocoa">
                        {remainingSteps ? `${remainingSteps} steps from your first project` : "Launch checklist complete"}
                      </h2>
                    </div>
                    <button
                      type="button"
                      className="text-xs font-black uppercase tracking-[.12em] text-rose"
                      onClick={() => setTab("Launch plan")}
                    >
                      Open
                    </button>
                  </div>
                  <div className="mt-4">
                    <ProgressBar value={progress} label="Launch completion" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    Advisor sign-off on hours unlocks certificates. Shelter work stays private until
                    HQ approves the claim.
                  </p>
                </section>

                <section className="sticker-card bg-[#f4e3a6] p-5 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.15em] text-muted">Near Coppell / DFW</p>
                      <h2 className="mt-2 font-display text-2xl font-black text-cocoa">Shelter mini-tasks</h2>
                    </div>
                    <PawPrint aria-hidden className="h-9 w-9 fill-rose text-rose" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {myChapterTasks.map((task) => (
                      <article key={task.id} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                        <h3 className="font-display font-black text-cocoa">{task.title}</h3>
                        <p className="mt-1 text-xs font-bold text-muted">
                          {task.shelter} · {task.when}
                        </p>
                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-xs font-black text-rose">{task.effort}</p>
                          {task.claimedBy ? (
                            <StatusPill tone="info">Claimed by {task.claimedBy}</StatusPill>
                          ) : (
                            <button
                              type="button"
                              className="button-primary min-h-0 px-3 py-1.5 text-xs"
                              onClick={() => claimTask(task.id)}
                            >
                              Claim
                            </button>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>
                  <Link
                    href="/adopt"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cocoa hover:text-rose"
                  >
                    Open task board <ChevronRight aria-hidden className="h-4 w-4" />
                  </Link>
                </section>
              </div>
            </div>
          ) : null}

          {tab === "Launch plan" ? (
            <Section
              title="Launch plan"
              copy="Eight steps from a first idea to a chapter HQ can vouch for. Check them off as they actually happen."
            >
              <div className="mb-6 max-w-xl">
                <ProgressBar value={progress} label={`${checked.filter(Boolean).length} of ${checked.length} steps done`} />
              </div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {launchSeed.map((task, index) => (
                  <li key={task.id}>
                    <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-cocoa/25 bg-white p-3 hover:border-cocoa">
                      <input
                        type="checkbox"
                        checked={Boolean(checked[index])}
                        onChange={() =>
                          setChecked((current) =>
                            current.map((item, itemIndex) => (itemIndex === index ? !item : item)),
                          )
                        }
                        className="peer sr-only"
                      />
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-cocoa bg-cream peer-checked:bg-mint peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-rose">
                        {checked[index] ? <Check aria-hidden className="h-4 w-4" strokeWidth={3} /> : null}
                      </span>
                      <span className={`text-sm font-bold ${checked[index] ? "text-muted line-through" : "text-cocoa"}`}>
                        {task.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-muted">
                Your checks save automatically. The public site never shows this checklist.
              </p>
            </Section>
          ) : null}

          {tab === "Service hours" ? (
            <Section
              title="Service hours"
              copy="Log real work with proof. Your advisor verifies each entry before it counts toward certificates or public totals."
              action={
                <button type="button" className="button-primary" onClick={() => setHourOpen(true)}>
                  <Plus aria-hidden className="h-4 w-4" /> Log hours
                </button>
              }
            >
              <div className="mb-6 grid gap-3 sm:grid-cols-3">
                <Summary label="Logged" value={`${loggedHours} hrs`} note={`${hours.length} entries`} />
                <Summary label="Verified" value={`${verifiedHours} hrs`} note="Counts toward certificates" />
                <Summary label="Waiting" value={`${reviewCount}`} note="In the advisor queue" />
              </div>
              <div className="overflow-x-auto rounded-2xl border-2 border-cocoa bg-white">
                <table className="w-full min-w-[640px] text-left text-sm">
                  <caption className="sr-only">
                    Submitted service hours, proof attachments, and verification status
                  </caption>
                  <thead className="border-b border-border bg-blush/40 text-xs uppercase tracking-[.12em] text-muted">
                    <tr>
                      <th scope="col" className="px-4 py-3">Student · activity</th>
                      <th scope="col" className="px-4 py-3">Date</th>
                      <th scope="col" className="px-4 py-3">Hours</th>
                      <th scope="col" className="px-4 py-3">Proof</th>
                      <th scope="col" className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hours.map((row) => (
                      <tr key={row.id} className="border-b border-border last:border-0">
                        <td className="px-4 py-3">
                          <p className="font-bold text-cocoa">{row.activity}</p>
                          <p className="text-xs font-semibold text-muted">{row.student}</p>
                        </td>
                        <td className="px-4 py-3 text-muted">{row.date}</td>
                        <td className="px-4 py-3 font-black text-cocoa">{row.hours}</td>
                        <td className="px-4 py-3 text-xs font-semibold text-muted">
                          {row.proof.length ? `${row.proof.length} file${row.proof.length === 1 ? "" : "s"}` : "None"}
                        </td>
                        <td className="px-4 py-3">
                          <StatusPill tone={row.status === "Verified" ? "good" : "warn"}>{row.status}</StatusPill>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-sm font-semibold text-muted">
                Advisor sign-off happens on the{" "}
                <Link href="/advisor" className="text-rose underline decoration-2 underline-offset-4">
                  advisor desk
                </Link>
                . Verified entries update here and in the certificate generator.
              </p>
              <p className="mt-4 rounded-2xl border-2 border-cocoa bg-blush/50 p-4 text-sm font-bold leading-6 text-cocoa">
                {HOURS_QUALIFICATION}
              </p>
            </Section>
          ) : null}

          {tab === "Fundraising" ? (
            <Section
              title="Fundraising"
              copy="Every dollar must have a named shelter or supply list. HQ approves the claim before the chapter record counts it as verified."
              action={
                <button type="button" className="button-primary" onClick={() => setFundOpen(true)}>
                  <Plus aria-hidden className="h-4 w-4" /> Add funds
                </button>
              }
            >
              <div className="mb-6 max-w-xl">
                <ProgressBar value={fundPct} label={`Chapter semester goal · $${fundTotal} / $150`} />
              </div>
              <ul className="space-y-3">
                {funds.map((row) => {
                  const status = fundStatus(row);
                  return (
                    <li
                      key={row.id}
                      className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-cocoa bg-white p-4"
                    >
                      <div>
                        <p className="font-display text-lg font-black text-cocoa">{row.event}</p>
                        <p className="text-xs font-bold text-muted">{row.category}</p>
                        <p className="mt-1 text-xs font-semibold text-muted">To: {row.beneficiary}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-display text-2xl font-black text-cocoa">${row.amount}</p>
                        <StatusPill tone={status === "Verified" ? "good" : status === "Rejected" ? "bad" : "info"}>
                          {status}
                        </StatusPill>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </Section>
          ) : null}

          {tab === "Projects" ? (
            <Section
              title="Project documentation"
              copy="A write-up and photos for every finished project. HQ approval marks the entry verified; only verified projects count in chapter totals."
              action={
                <button type="button" className="button-primary" onClick={() => setProjectOpen(true)}>
                  <Plus aria-hidden className="h-4 w-4" /> New project
                </button>
              }
            >
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => {
                  const status = projectStatus(project);
                  return (
                  <article
                    key={project.id}
                    className="rounded-[1.5rem] border-2 border-cocoa bg-white p-5 shadow-sketch"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-black text-cocoa">{project.title}</h3>
                      <StatusPill
                        tone={status === "Approved" ? "good" : status === "Draft" ? "neutral" : status === "Rejected" ? "bad" : "warn"}
                      >
                        {status}
                      </StatusPill>
                    </div>
                    {project.body ? (
                      <p className="mt-2 text-sm leading-6 text-muted">{project.body}</p>
                    ) : null}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cocoa/30 bg-blush/50 px-3 py-1 text-xs font-bold text-cocoa"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-4 text-xs font-bold text-muted">
                      {project.photos.length
                        ? `Photos attached: ${project.photos.join(", ")}`
                        : "No photos attached."}
                    </p>
                  </article>
                  );
                })}
              </div>
              <p className="mt-5 text-sm font-semibold text-muted">
                {approvedProjects} approved · {projects.length - approvedProjects} awaiting review or in draft.
              </p>
            </Section>
          ) : null}

          {tab === "Resources" ? (
            <Section
              title="Resource library"
              copy="Working templates, not placeholders. Each download opens a real text file you can copy into Docs or Word and edit."
            >
              <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => {
                  const file = resourceFiles[resource.id];
                  return (
                    <li key={resource.id}>
                      <button
                        type="button"
                        onClick={() => {
                          if (!file) return;
                          downloadTextFile(file.filename, file.body);
                          flash(`Downloaded ${file.filename}.`);
                        }}
                        className="group flex h-full w-full items-center gap-3 rounded-xl border-2 border-cocoa bg-white p-4 text-left hover:bg-cream"
                      >
                        <FileText aria-hidden className="h-5 w-5 shrink-0 text-sage-dark" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-cocoa">{resource.title}</span>
                          <span className="text-[.65rem] font-black uppercase tracking-[.12em] text-muted">
                            {resource.category} · TXT · {resourceSizeKb(resource.id)}
                          </span>
                        </span>
                        <Download aria-hidden className="h-4 w-4 text-muted group-hover:text-rose" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </Section>
          ) : null}

          {tab === "Consent" ? (
            <Section
              title="Parental consent"
              copy="Track waivers for off-campus shelter work. A student without a signed form does not travel with the group."
            >
              <ul className="space-y-3">
                {consents.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-cocoa bg-white p-4"
                  >
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{item.student}</p>
                      <p className="text-xs font-bold text-muted">{item.event}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusPill
                        tone={item.status === "Signed" ? "good" : item.status === "Sent" ? "info" : "warn"}
                      >
                        {item.status}
                      </StatusPill>
                      {item.status === "Needed" ? (
                        <button
                          type="button"
                          className="button-paper min-h-0 px-3 py-2 text-xs"
                          onClick={() => sendConsent(item.id)}
                        >
                          Mark sent
                        </button>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm font-semibold text-muted">
                This preview records the step. Real waivers go through your school&apos;s approved
                process — download the consent template in Resources.
              </p>
            </Section>
          ) : null}

          {tab === "Certificates" ? (
            <Section
              title="Service certificate"
              copy={`Only verified hours can be certified. Fill in the name and semester, then print or save as PDF. ${HOURS_QUALIFICATION}`}
            >
              <div className="grid gap-6 lg:grid-cols-[1fr_.95fr]">
                <form
                  className="space-y-4 rounded-[1.5rem] border-2 border-cocoa bg-white p-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    flash("Practice certificate ready. Your school decides whether to accept it.");
                  }}
                >
                  <Field label="Student name">
                    <input
                      className="form-control"
                      value={certificate.student}
                      onChange={(event) =>
                        setCertificate((current) => ({ ...current, student: event.target.value }))
                      }
                      required
                    />
                  </Field>
                  <Field
                    label="Verified hours to include"
                    hint={`${mayaVerified} verified for ${memberName.split(" ")[0]} · ${verifiedHours} verified chapter-wide`}
                  >
                    <input
                      type="number"
                      min={0}
                      max={Math.max(0, mayaVerified)}
                      step={0.25}
                      className="form-control"
                      value={certificate.hours}
                      onChange={(event) =>
                        setCertificate((current) => ({
                          ...current,
                          hours: Math.min(mayaVerified, Number(event.target.value) || 0),
                        }))
                      }
                      required
                    />
                  </Field>
                  <Field label="Semester">
                    <select
                      className="form-control"
                      value={certificate.semester}
                      onChange={(event) =>
                        setCertificate((current) => ({ ...current, semester: event.target.value }))
                      }
                    >
                      <option>Fall 2026</option>
                      <option>Spring 2026</option>
                    </select>
                  </Field>
                  <button
                    type="button"
                    className="button-primary w-full"
                    onClick={printCertificate}
                    disabled={mayaVerified <= 0}
                  >
                    <Printer aria-hidden className="h-4 w-4" /> Open printable certificate
                  </button>
                  <p className="text-xs font-semibold leading-5 text-muted">
                    {mayaVerified > 0
                      ? "Opens the certificate in its own tab, ready to print or save as PDF. Allow pop-ups if your browser blocks it."
                      : "Log service hours and have your advisor verify at least one entry before printing a certificate."}
                  </p>
                </form>

                <div
                  id="certificate"
                  className="rounded-[1.5rem] border-2 border-dashed border-cocoa bg-cream p-6"
                >
                  <div className="rounded-xl border-2 border-cocoa bg-white p-6 text-center shadow-sketch sm:p-9">
                    <p className="font-hand text-2xl font-bold text-rose">PawsForCause</p>
                    <p className="mt-5 font-display text-2xl font-black text-cocoa">
                      Community Service Certificate
                    </p>
                    <p className="mt-6 text-sm text-muted">This certifies that</p>
                    <p className="mt-2 font-display text-3xl font-black text-cocoa">
                      {certificate.student || "Student name"}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-muted">
                      completed <strong className="text-cocoa">{certificate.hours}</strong> verified hours of
                      animal-welfare service with Coppell Paws during {certificate.semester}.
                    </p>
                    <p className="mt-3 text-xs font-semibold leading-5 text-muted">
                      {HOURS_QUALIFICATION}
                    </p>
                    <div className="mt-8 flex items-end justify-between gap-3 border-t border-dashed border-border pt-4 text-left">
                      <div>
                        <p className="font-hand text-xl font-semibold text-rose">Ms. Rivera</p>
                        <p className="text-[.65rem] font-black uppercase tracking-[.12em] text-muted">
                          Faculty advisor
                        </p>
                      </div>
                      <p className="text-[.65rem] font-black uppercase tracking-[.12em] text-muted">
                        {new Date().toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Section>
          ) : null}

          {tab === "Members" ? (
            <Section
              title="Chapter roster"
              copy={`${chapter.members} members on the registration. These are the officer roles HQ needs to reach.`}
            >
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  [memberName, "President"],
                  ["Eli Park", "Operations / VP"],
                  ["Noah Diaz", "Events"],
                  ["Aisha Grant", "Outreach"],
                  ["Sam Ortiz", "Fundraising"],
                ].map(([name, role]) => (
                  <li key={name} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                    <p className="font-display text-lg font-black text-cocoa">{name}</p>
                    <p className="text-xs font-black uppercase tracking-[.12em] text-rose">{role}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm font-semibold text-muted">
                Keep roles current so the Active Standard monitor does not flag the chapter.
              </p>
            </Section>
          ) : null}
        </main>
      </div>

      {hourOpen ? (
        <Modal
          title="Log service hours"
          onClose={() => {
            setHourOpen(false);
            setProofNames([]);
          }}
        >
          <form className="space-y-5" onSubmit={submitHours}>
            <Field label="Project or activity">
              <select name="activity" required className="form-control">
                <option value="">Choose an activity</option>
                <option>Toy-making night</option>
                <option>Shelter volunteer shift</option>
                <option>Fundraiser</option>
                <option>Education table</option>
                <option>Other</option>
              </select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date">
                <input name="date" required type="date" className="form-control" />
              </Field>
              <Field label="Hours" hint="Quarter hours, no rounding up">
                <input
                  name="hours"
                  required
                  min="0.25"
                  step="0.25"
                  type="number"
                  placeholder="2.5"
                  className="form-control"
                />
              </Field>
            </div>
            <Field label="What did you do?" hint="Specific enough that your advisor can verify it">
              <textarea
                name="notes"
                required
                rows={3}
                className="form-control resize-none"
                placeholder="14 fabric toys braided and inspected at the fashion studio…"
              />
            </Field>
            <div>
              <p className="text-sm font-black text-cocoa">Proof of service</p>
              <label className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cocoa/50 bg-white p-5 text-sm font-bold text-muted hover:border-cocoa">
                <Upload aria-hidden className="h-5 w-5" />
                Choose photo, PDF, or supervisor email
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.eml,.txt"
                  className="sr-only"
                  onChange={(event) => {
                    const files = Array.from(event.target.files ?? []).map((file) => file.name);
                    setProofNames(files);
                  }}
                />
              </label>
              {proofNames.length ? (
                <ul className="mt-2 space-y-1 text-xs font-bold text-cocoa">
                  {proofNames.map((name) => (
                    <li key={name}>Attached: {name}</li>
                  ))}
                </ul>
              ) : null}
              <p className="mt-2 text-xs text-muted">
                Files are not uploaded; only their names are recorded for your advisor. Do not include photos
                of minors without permission.
              </p>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="button-paper"
                onClick={() => {
                  setHourOpen(false);
                  setProofNames([]);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="button-primary">
                Save for advisor review
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {fundOpen ? (
        <Modal title="Report funds raised" onClose={() => setFundOpen(false)}>
          <form className="space-y-5" onSubmit={submitFunds}>
            <Field label="Event name">
              <input name="event" required className="form-control" placeholder="Bake sale for kennel medical fund" />
            </Field>
            <Field label="Category">
              <select name="category" required className="form-control">
                <option value="">Choose category</option>
                {fundCategories.map((item) => (
                  <option key={item.id}>{item.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Amount (USD)">
              <input name="amount" required min="1" step="0.01" type="number" className="form-control" />
            </Field>
            <Field label="Beneficiary" hint="A named shelter, rescue, or supply list — never cash">
              <input name="beneficiary" required className="form-control" placeholder="Austin Animal Center medical fund" />
            </Field>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="button-paper" onClick={() => setFundOpen(false)}>
                Cancel
              </button>
              <button type="submit" className="button-primary">
                Submit to claim review
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {projectOpen ? (
        <Modal
          title="Document a project"
          onClose={() => {
            setProjectOpen(false);
            setPhotoNames([]);
          }}
        >
          <form className="space-y-5" onSubmit={submitProject}>
            <Field label="Project title">
              <input name="title" required className="form-control" />
            </Field>
            <Field label="What happened?" hint="Dates, who it helped, and numbers you can defend">
              <textarea name="body" required rows={4} className="form-control resize-y" />
            </Field>
            <fieldset>
              <legend className="text-sm font-black text-cocoa">Category tags</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectTags.map((tag) => (
                  <label
                    key={tag}
                    className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cocoa/30 bg-white px-3 py-1.5 text-xs font-bold text-cocoa"
                  >
                    <input type="checkbox" name={`tag-${tag}`} className="accent-[#a8385d]" />
                    {tag}
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cocoa/50 bg-white p-5 text-sm font-bold text-muted hover:border-cocoa">
              <Upload aria-hidden className="h-5 w-5" />
              Add photos
              <input
                type="file"
                multiple
                accept="image/*"
                className="sr-only"
                onChange={(event) => {
                  setPhotoNames(Array.from(event.target.files ?? []).map((file) => file.name));
                }}
              />
            </label>
            {photoNames.length ? (
              <p className="text-xs font-bold text-cocoa">Selected: {photoNames.join(", ")}</p>
            ) : null}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="button-paper"
                onClick={() => {
                  setProjectOpen(false);
                  setPhotoNames([]);
                }}
              >
                Cancel
              </button>
              <button type="submit" className="button-primary">
                Submit project
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </div>
  );
}

function Metric({
  value,
  label,
  note,
  color,
}: {
  value: string;
  label: string;
  note: string;
  color: string;
}) {
  return (
    <article className={`rounded-[1.5rem] border-2 border-cocoa p-5 shadow-sketch ${color}`}>
      <p className="font-display text-3xl font-black text-cocoa">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[.13em] text-muted">{label}</p>
      <p className="mt-3 text-xs font-bold text-cocoa">{note}</p>
    </article>
  );
}

function Summary({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface-strong p-4">
      <p className="text-[.65rem] font-black uppercase tracking-[.13em] text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl font-black text-cocoa">{value}</p>
      <p className="mt-1 text-xs font-semibold text-muted">{note}</p>
    </div>
  );
}

function Section({
  title,
  copy,
  action,
  children,
}: {
  title: string;
  copy: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-cocoa">{title}</h1>
          <p className="mt-2 max-w-2xl text-muted">{copy}</p>
        </div>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Modal({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;

    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((element) => element.offsetParent !== null);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    (panel?.querySelector("input, select, textarea") as HTMLElement | null)?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-[90] grid place-items-center bg-cocoa/45 p-4"
      role="presentation"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border-2 border-cocoa bg-cream p-6 shadow-sketch sm:p-8"
      >
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.15em] text-rose">Chapter form</p>
            <h2 id={titleId} className="mt-2 font-display text-3xl font-black text-cocoa">
              {title}
            </h2>
          </div>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border-2 border-cocoa"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

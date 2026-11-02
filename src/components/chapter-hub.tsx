"use client";

import { FormEvent, useMemo, useState } from "react";
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
  ShieldCheck,
  Upload,
  Users,
  X,
} from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";
import { Field, ProgressBar, StatusPill } from "@/components/platform/ui";
import {
  fundCategories,
  launchChecklist as launchSeed,
  projectTags,
  resources,
  shelterRequests,
} from "@/lib/platform-data";

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

export function ChapterHub() {
  const [tab, setTab] = useState<Tab>("Overview");
  const [navOpen, setNavOpen] = useState(false);
  const [checked, setChecked] = useState(launchSeed.map((item) => item.done));
  const [toast, setToast] = useState<string | null>(null);
  const [hourOpen, setHourOpen] = useState(false);
  const [fundOpen, setFundOpen] = useState(false);
  const [projectOpen, setProjectOpen] = useState(false);
  const [hours, setHours] = useState([
    { id: "h1", activity: "Toy-making night", date: "2026-10-29", amount: 3.5, status: "Advisor review" },
    { id: "h2", activity: "Shelter volunteer shift", date: "2026-10-18", amount: 4, status: "Verified" },
  ]);
  const [funds, setFunds] = useState([
    { id: "f1", event: "Bake sale", category: "Bake sale / campus sale", amount: 386, status: "Pending HQ" },
    { id: "f2", event: "Wishlist drive", category: "Wishlist / supplies", amount: 520, status: "Verified" },
  ]);
  const [projects, setProjects] = useState([
    { id: "p1", title: "October enrichment night", tags: ["Enrichment", "Shelter day"], status: "Approved" },
    { id: "p2", title: "Sterilization hallway posters", tags: ["Education"], status: "Draft" },
  ]);
  const [consents, setConsents] = useState([
    { id: "co1", student: "Maya Chen", event: "Austin Animal Center shift", status: "Signed" },
    { id: "co2", student: "Eli Park", event: "Austin Animal Center shift", status: "Sent" },
    { id: "co3", student: "Noah Diaz", event: "Austin Animal Center shift", status: "Needed" },
  ]);

  const progress = Math.round((checked.filter(Boolean).length / checked.length) * 100);
  const localRequests = useMemo(
    () => shelterRequests.filter((item) => /Coppell|Plano|Frisco|DFW/i.test(item.city)),
    [],
  );

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4200);
  }

  function submitHours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setHours((current) => [
      {
        id: `h${Date.now()}`,
        activity: String(data.get("activity") || "Activity"),
        date: String(data.get("date") || ""),
        amount: Number(data.get("hours") || 0),
        status: "Advisor review",
      },
      ...current,
    ]);
    setHourOpen(false);
    flash("Hours saved for advisor review.");
  }

  function submitFunds(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setFunds((current) => [
      {
        id: `f${Date.now()}`,
        event: String(data.get("event") || "Fundraiser"),
        category: String(data.get("category") || ""),
        amount: Number(data.get("amount") || 0),
        status: "Pending HQ",
      },
      ...current,
    ]);
    setFundOpen(false);
    flash("Fundraising total submitted to the claim queue.");
  }

  function submitProject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const selected = projectTags.filter((tag) => data.get(`tag-${tag}`));
    setProjects((current) => [
      {
        id: `p${Date.now()}`,
        title: String(data.get("title") || "Untitled project"),
        tags: selected.length ? selected : ["Outreach"],
        status: "Pending review",
      },
      ...current,
    ]);
    setProjectOpen(false);
    flash("Project documentation queued for claim review.");
  }

  function sendConsent(id: string) {
    setConsents((current) => current.map((item) => (item.id === id ? { ...item, status: "Sent" } : item)));
    flash("Parent consent email queued.");
  }

  return (
    <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#fbf7ec] text-ink">
      <a href="#dashboard-main" className="skip-link">Skip to dashboard</a>
      <aside className={`fixed inset-y-0 left-0 z-[70] w-72 overflow-y-auto border-r-2 border-cocoa bg-[#f6d8e1] p-5 transition-transform lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="PawsForCause home">
            <HouseMark className="h-11 w-12" />
            <span className="font-display text-lg font-black text-cocoa">Paws<span className="text-rose">For</span>Cause</span>
          </Link>
          <button type="button" className="grid h-10 w-10 place-items-center lg:hidden" onClick={() => setNavOpen(false)} aria-label="Close navigation">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mt-7 rounded-2xl border-2 border-cocoa bg-cream p-4 shadow-[3px_3px_0_#6e493b]">
          <p className="text-[.65rem] font-black uppercase tracking-[.15em] text-rose">Demo chapter login</p>
          <p className="mt-1 font-display text-lg font-black text-cocoa">Coppell Paws</p>
          <p className="mt-1 text-xs font-semibold text-cocoa/60">Maya Chen · Chapter President · DFW</p>
        </div>
        <nav className="mt-7" aria-label="Chapter hub">
          <ul className="space-y-1">
            {nav.map(({ label, icon: Icon }) => (
              <li key={label}>
                <button
                  type="button"
                  onClick={() => {
                    setTab(label);
                    setNavOpen(false);
                  }}
                  className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-extrabold transition ${tab === label ? "border-2 border-cocoa bg-white text-cocoa shadow-[2px_2px_0_#6e493b]" : "text-cocoa/70 hover:bg-white/60 hover:text-cocoa"}`}
                  aria-current={tab === label ? "page" : undefined}
                >
                  <Icon aria-hidden className="h-4 w-4" />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-8 space-y-2 border-t border-cocoa/20 pt-5 text-xs font-black uppercase tracking-[.1em]">
          <Link href="/advisor" className="block text-cocoa/65 hover:text-rose">Advisor desk</Link>
          <Link href="/admin" className="block text-cocoa/65 hover:text-rose">National admin</Link>
          <Link href="/" className="flex items-center gap-2 text-cocoa/65 hover:text-rose"><ArrowLeft aria-hidden className="h-4 w-4" /> Public website</Link>
        </div>
      </aside>

      {navOpen && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-[60] bg-cocoa/30 lg:hidden" onClick={() => setNavOpen(false)} />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 border-cocoa bg-cream/95 px-4 backdrop-blur sm:px-7">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa lg:hidden" onClick={() => setNavOpen(true)} aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cocoa/50">Chapter hub · secure preview</p>
          </div>
          <div className="flex items-center gap-3">
            <StatusPill tone="warn">Preview mode</StatusPill>
            <button type="button" className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa bg-white" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-cocoa bg-rose" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa bg-mint font-black text-cocoa" aria-label="Signed in as Maya">M</div>
          </div>
        </header>

        <main id="dashboard-main" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-7 sm:py-10">
          {toast && (
            <div role="status" className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
              <BadgeCheck className="h-5 w-5" /> {toast}
            </div>
          )}

          {tab === "Overview" && (
            <div className="space-y-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-hand text-2xl font-semibold text-rose">Coppell · DFW branch</p>
                  <h1 className="mt-1 font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-5xl">Hi Maya, ready to help?</h1>
                  <p className="mt-2 text-ink/60">Log scrap-to-toy nights, funds, and finished shelter mini-tasks here.</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button type="button" onClick={() => setHourOpen(true)} className="button-primary"><Plus aria-hidden className="h-4 w-4" /> Log hours</button>
                  <button type="button" onClick={() => setFundOpen(true)} className="button-paper">Add funds</button>
                  <button type="button" onClick={() => setProjectOpen(true)} className="button-paper">Document project</button>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <Metric value="14" label="toys donated" note="fashion scrap workshop" color="bg-[#f6d8e1]" />
                <Metric value="$55" label="funds raised" note="chapter share of $400 network" color="bg-[#f4e3a6]" />
                <Metric value="6" label="projects finished" note="2 pending review" color="bg-[#cfe1d2]" />
                <Metric value="24" label="active members" note="3 consent packets open" color="bg-[#ddd5ed]" />
              </div>
              <div className="grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
                <section className="sticker-card bg-white p-5 sm:p-7">
                  <div className="flex items-start justify-between gap-5">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.15em] text-rose">30-day launch plan</p>
                      <h2 className="mt-2 font-display text-2xl font-black text-cocoa">Almost ready for your first project</h2>
                    </div>
                    <button type="button" className="text-xs font-black uppercase tracking-[.12em] text-rose" onClick={() => setTab("Launch plan")}>Open</button>
                  </div>
                  <div className="mt-4"><ProgressBar value={progress} label="Launch completion" /></div>
                </section>
                <section className="sticker-card bg-[#f4e3a6] p-5 sm:p-7">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[.15em] text-cocoa/55">Near Coppell / DFW</p>
                      <h2 className="mt-2 font-display text-2xl font-black text-cocoa">Shelter mini-tasks</h2>
                    </div>
                    <PawPrint aria-hidden className="h-9 w-9 fill-rose text-rose" />
                  </div>
                  <div className="mt-5 space-y-3">
                    {localRequests.map((request) => (
                      <article key={request.id} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                        <h3 className="font-display font-black text-cocoa">{request.title}</h3>
                        <p className="mt-1 text-xs font-bold text-cocoa/60">{request.shelter} · {request.when}</p>
                        <p className="mt-2 text-xs font-black text-rose">{request.need}</p>
                      </article>
                    ))}
                  </div>
                  <Link href="/adopt" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cocoa hover:text-rose">
                    Open task board <ChevronRight aria-hidden className="h-4 w-4" />
                  </Link>
                </section>
              </div>
            </div>
          )}

          {tab === "Launch plan" && (
            <Section title="Interactive launch checklist" copy="Map the 30-day launch. Check items off as HQ, school, and your team finish them.">
              <div className="mb-6 max-w-xl"><ProgressBar value={progress} label="Launch completion" /></div>
              <ul className="grid gap-3 sm:grid-cols-2">
                {launchSeed.map((task, index) => (
                  <li key={task.id}>
                    <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-cocoa/25 bg-white p-3 hover:border-cocoa">
                      <input
                        type="checkbox"
                        checked={checked[index]}
                        onChange={() => setChecked((current) => current.map((item, itemIndex) => (itemIndex === index ? !item : item)))}
                        className="peer sr-only"
                      />
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-cocoa bg-cream peer-checked:bg-mint">
                        {checked[index] && <Check aria-hidden className="h-4 w-4" strokeWidth={3} />}
                      </span>
                      <span className={`text-sm font-bold ${checked[index] ? "text-cocoa/55 line-through" : "text-cocoa"}`}>{task.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "Service hours" && (
            <Section title="Hour log submissions" copy="Students enter hours and attach proof. Advisors verify before HQ publishes." action={<button type="button" className="button-primary" onClick={() => setHourOpen(true)}><Plus className="h-4 w-4" /> Log hours</button>}>
              <div className="overflow-hidden rounded-2xl border-2 border-cocoa bg-white">
                <table className="w-full text-left text-sm">
                  <thead className="border-b border-cocoa/20 bg-blush/40 text-xs uppercase tracking-[.12em] text-cocoa/60">
                    <tr><th className="px-4 py-3">Activity</th><th className="px-4 py-3">Date</th><th className="px-4 py-3">Hours</th><th className="px-4 py-3">Status</th></tr>
                  </thead>
                  <tbody>
                    {hours.map((row) => (
                      <tr key={row.id} className="border-b border-cocoa/10 last:border-0">
                        <td className="px-4 py-3 font-bold text-cocoa">{row.activity}</td>
                        <td className="px-4 py-3 text-cocoa/65">{row.date}</td>
                        <td className="px-4 py-3 font-black text-cocoa">{row.amount}</td>
                        <td className="px-4 py-3"><StatusPill tone={row.status === "Verified" ? "good" : "warn"}>{row.status}</StatusPill></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Section>
          )}

          {tab === "Fundraising" && (
            <Section title="Fundraising tracker" copy="Report dollars raised by event type. Totals stay private until HQ approves the claim." action={<button type="button" className="button-primary" onClick={() => setFundOpen(true)}><Plus className="h-4 w-4" /> Add funds</button>}>
              <div className="mb-6 max-w-xl"><ProgressBar value={37} label="Chapter semester goal · $55 / $150" /></div>
              <ul className="space-y-3">
                {funds.map((row) => (
                  <li key={row.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-cocoa bg-white p-4">
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{row.event}</p>
                      <p className="text-xs font-bold text-cocoa/55">{row.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-2xl font-black text-cocoa">${row.amount}</p>
                      <StatusPill tone={row.status === "Verified" ? "good" : "info"}>{row.status}</StatusPill>
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "Projects" && (
            <Section title="Project documentation portal" copy="Blog-style submissions with tags and photo galleries for shelter support events." action={<button type="button" className="button-primary" onClick={() => setProjectOpen(true)}><Plus className="h-4 w-4" /> New project</button>}>
              <div className="grid gap-4 md:grid-cols-2">
                {projects.map((project) => (
                  <article key={project.id} className="rounded-[1.5rem] border-2 border-cocoa bg-white p-5 shadow-[3px_3px_0_#6e493b]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl font-black text-cocoa">{project.title}</h3>
                      <StatusPill tone={project.status === "Approved" ? "good" : project.status === "Draft" ? "neutral" : "warn"}>{project.status}</StatusPill>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => <span key={tag} className="rounded-full border border-cocoa/30 bg-blush/50 px-3 py-1 text-xs font-bold text-cocoa">{tag}</span>)}
                    </div>
                    <div className="mt-5 grid h-28 grid-cols-3 gap-2">
                      <div className="rounded-xl border border-cocoa/20 bg-blush" />
                      <div className="rounded-xl border border-cocoa/20 bg-butter" />
                      <div className="rounded-xl border border-cocoa/20 bg-mint" />
                    </div>
                  </article>
                ))}
              </div>
            </Section>
          )}

          {tab === "Resources" && (
            <Section title="Resource library" copy="Download club templates, agendas, bylaws, and printable flyer designs.">
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {resources.map((resource) => (
                  <button key={resource.id} type="button" onClick={() => flash(`${resource.title} download started (demo).`)} className="group flex items-center gap-3 rounded-xl border-2 border-cocoa bg-white p-4 text-left hover:bg-cream">
                    <FileText className="h-5 w-5 shrink-0 text-[#4d7357]" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-cocoa">{resource.title}</span>
                      <span className="text-[.65rem] font-black uppercase tracking-[.12em] text-cocoa/45">{resource.category} · {resource.type} · {resource.size}</span>
                    </span>
                    <Download className="h-4 w-4 text-cocoa/40 group-hover:text-rose" />
                  </button>
                ))}
              </div>
            </Section>
          )}

          {tab === "Consent" && (
            <Section title="Parental consent workflow" copy="Queue digital waivers for off-campus volunteer liability sign-offs before the trip.">
              <ul className="space-y-3">
                {consents.map((item) => (
                  <li key={item.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border-2 border-cocoa bg-white p-4">
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{item.student}</p>
                      <p className="text-xs font-bold text-cocoa/55">{item.event}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusPill tone={item.status === "Signed" ? "good" : item.status === "Sent" ? "info" : "warn"}>{item.status}</StatusPill>
                      {item.status === "Needed" ? (
                        <button type="button" className="button-paper min-h-0 px-3 py-2 text-xs" onClick={() => sendConsent(item.id)}>Email parent</button>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {tab === "Certificates" && (
            <Section title="Automated certificate generator" copy="Compile verified student hours into a printable community service PDF.">
              <div className="grid gap-4 lg:grid-cols-[1fr_.9fr]">
                <form
                  className="space-y-4 rounded-[1.5rem] border-2 border-cocoa bg-white p-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    flash("Certificate PDF generated for download (demo).");
                  }}
                >
                  <Field label="Student name"><input required className="form-control" defaultValue="Maya Chen" /></Field>
                  <Field label="Verified hours to include"><input required type="number" min="1" step="0.25" className="form-control" defaultValue="42" /></Field>
                  <Field label="Semester"><select className="form-control"><option>Fall 2026</option><option>Spring 2026</option></select></Field>
                  <button type="submit" className="button-primary">Generate PDF certificate</button>
                </form>
                <div className="rounded-[1.5rem] border-2 border-dashed border-cocoa bg-blush/40 p-6">
                  <p className="text-xs font-black uppercase tracking-[.15em] text-rose">Preview</p>
                  <div className="mt-4 rounded-xl border-2 border-cocoa bg-white p-6 text-center shadow-[4px_4px_0_#6e493b]">
                    <p className="font-hand text-2xl font-bold text-rose">PawsForCause</p>
                    <p className="mt-4 font-display text-2xl font-black text-cocoa">Community Service Certificate</p>
                    <p className="mt-6 text-sm text-cocoa/70">This certifies that</p>
                    <p className="mt-2 font-display text-3xl font-black text-cocoa">Maya Chen</p>
                    <p className="mt-4 text-sm leading-6 text-cocoa/70">completed <strong>42 verified hours</strong> of animal-welfare service with Coppell Paws during Fall 2026.</p>
                  </div>
                </div>
              </div>
            </Section>
          )}

          {tab === "Members" && (
            <Section title="Chapter roster" copy="Keep roles current so the Active Standard monitor does not flag your chapter.">
              <ul className="grid gap-3 md:grid-cols-2">
                {[
                  ["Maya Chen", "President"],
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
            </Section>
          )}
        </main>
      </div>

      {hourOpen && (
        <Modal title="Log your hours" onClose={() => setHourOpen(false)}>
          <form className="space-y-5" onSubmit={submitHours}>
            <Field label="Project or activity">
              <select name="activity" required className="form-control"><option value="">Choose an activity</option><option>Toy-making night</option><option>Shelter volunteer shift</option><option>Fundraiser</option><option>Other</option></select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Date"><input name="date" required type="date" className="form-control" /></Field>
              <Field label="Hours"><input name="hours" required min="0.25" step="0.25" type="number" placeholder="2.5" className="form-control" /></Field>
            </div>
            <Field label="What did you do?"><textarea name="notes" required rows={3} className="form-control resize-none" placeholder="A short, specific description…" /></Field>
            <div>
              <p className="text-sm font-black text-cocoa">Proof of service</p>
              <button type="button" className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cocoa/50 bg-white p-5 text-sm font-bold text-cocoa/65">
                <Upload aria-hidden className="h-5 w-5" /> Add photo, PDF, or supervisor email
              </button>
              <p className="mt-2 text-xs text-cocoa/55">Do not upload photos of minors without permission.</p>
            </div>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="button-paper" onClick={() => setHourOpen(false)}>Cancel</button>
              <button type="submit" className="button-primary">Save for advisor review</button>
            </div>
          </form>
        </Modal>
      )}

      {fundOpen && (
        <Modal title="Report funds raised" onClose={() => setFundOpen(false)}>
          <form className="space-y-5" onSubmit={submitFunds}>
            <Field label="Event name"><input name="event" required className="form-control" placeholder="Bake sale for kennel medical fund" /></Field>
            <Field label="Category">
              <select name="category" required className="form-control">
                <option value="">Choose category</option>
                {fundCategories.map((item) => <option key={item.id}>{item.label}</option>)}
              </select>
            </Field>
            <Field label="Amount (USD)"><input name="amount" required min="1" step="0.01" type="number" className="form-control" /></Field>
            <Field label="Beneficiary"><input name="beneficiary" required className="form-control" placeholder="Named shelter or supply list" /></Field>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="button-paper" onClick={() => setFundOpen(false)}>Cancel</button>
              <button type="submit" className="button-primary">Submit to claim review</button>
            </div>
          </form>
        </Modal>
      )}

      {projectOpen && (
        <Modal title="Document a project" onClose={() => setProjectOpen(false)}>
          <form className="space-y-5" onSubmit={submitProject}>
            <Field label="Project title"><input name="title" required className="form-control" /></Field>
            <Field label="What happened?"><textarea name="body" required rows={4} className="form-control resize-y" /></Field>
            <fieldset>
              <legend className="text-sm font-black text-cocoa">Category tags</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {projectTags.map((tag) => (
                  <label key={tag} className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-cocoa/30 bg-white px-3 py-1.5 text-xs font-bold text-cocoa">
                    <input type="checkbox" name={`tag-${tag}`} className="accent-[#c94d78]" />
                    {tag}
                  </label>
                ))}
              </div>
            </fieldset>
            <button type="button" className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cocoa/50 bg-white p-5 text-sm font-bold text-cocoa/65">
              <Upload aria-hidden className="h-5 w-5" /> Add photo gallery
            </button>
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" className="button-paper" onClick={() => setProjectOpen(false)}>Cancel</button>
              <button type="submit" className="button-primary">Submit project</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function Metric({ value, label, note, color }: { value: string; label: string; note: string; color: string }) {
  return (
    <article className={`rounded-[1.5rem] border-2 border-cocoa p-5 shadow-[3px_3px_0_#6e493b] ${color}`}>
      <p className="font-display text-3xl font-black text-cocoa">{value}</p>
      <p className="mt-1 text-xs font-black uppercase tracking-[.13em] text-cocoa/60">{label}</p>
      <p className="mt-3 text-xs font-bold text-cocoa">{note}</p>
    </article>
  );
}

function Section({ title, copy, action, children }: { title: string; copy: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-4xl font-black tracking-tight text-cocoa">{title}</h1>
          <p className="mt-2 max-w-2xl text-ink/65">{copy}</p>
        </div>
        {action}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 z-[90] grid place-items-center bg-cocoa/45 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div role="dialog" aria-modal="true" aria-label={title} className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border-2 border-cocoa bg-cream p-6 shadow-[7px_7px_0_#6e493b] sm:p-8">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="text-xs font-black uppercase tracking-[.15em] text-rose">Chapter form</p>
            <h2 className="mt-2 font-display text-3xl font-black text-cocoa">{title}</h2>
          </div>
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa" onClick={onClose} aria-label="Close dialog"><X className="h-5 w-5" /></button>
        </div>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

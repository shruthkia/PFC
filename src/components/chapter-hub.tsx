"use client";

import { FormEvent, useState } from "react";
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
  Sparkles,
  Upload,
  Users,
  X,
} from "lucide-react";
import { HouseMark } from "@/components/brand/house-mark";

const nav = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Launch plan", icon: CalendarDays },
  { label: "Service hours", icon: Clock3 },
  { label: "Projects", icon: HeartHandshake },
  { label: "Fundraising", icon: CircleDollarSign },
  { label: "Members", icon: Users },
  { label: "Resources", icon: BookOpen },
];

const launchTasks = [
  "Submit chapter registration",
  "Confirm faculty advisor",
  "Receive school approval",
  "Invite your founding team",
  "Schedule the first meeting",
  "Choose your first shelter project",
];

export function ChapterHub() {
  const [checked, setChecked] = useState([true, true, true, true, false, false]);
  const [navOpen, setNavOpen] = useState(false);
  const [showHourForm, setShowHourForm] = useState(false);
  const [saved, setSaved] = useState(false);
  const completed = checked.filter(Boolean).length;
  const progress = Math.round((completed / checked.length) * 100);

  function submitHours(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    setShowHourForm(false);
    window.setTimeout(() => setSaved(false), 4500);
  }

  return (
    <div className="fixed inset-0 z-[60] min-h-screen overflow-y-auto bg-[#fbf7ec] text-ink">
      <a href="#dashboard-main" className="skip-link">Skip to dashboard</a>
      <aside className={`fixed inset-y-0 left-0 z-[70] w-72 border-r-2 border-cocoa bg-[#f6d8e1] p-5 transition-transform lg:translate-x-0 ${navOpen ? "translate-x-0" : "-translate-x-full"}`}>
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
          <p className="text-[.65rem] font-black uppercase tracking-[.15em] text-rose">Demo chapter</p>
          <p className="mt-1 font-display text-lg font-black text-cocoa">Westview Paws</p>
          <p className="mt-1 text-xs font-semibold text-cocoa/60">Austin, Texas</p>
        </div>
        <nav className="mt-7" aria-label="Chapter hub">
          <ul className="space-y-1">
            {nav.map(({ label, icon: Icon }, index) => (
              <li key={label}>
                <a href={label === "Resources" ? "#resources" : `#${label.toLowerCase().replace(" ", "-")}`} className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-extrabold transition ${index === 0 ? "border-2 border-cocoa bg-white text-cocoa shadow-[2px_2px_0_#6e493b]" : "text-cocoa/70 hover:bg-white/60 hover:text-cocoa"}`}>
                  <Icon aria-hidden className="h-4 w-4" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <Link href="/" className="absolute bottom-6 left-6 flex items-center gap-2 text-xs font-black uppercase tracking-[.1em] text-cocoa/65 hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public website
        </Link>
      </aside>

      {navOpen && <button type="button" aria-label="Close navigation" className="fixed inset-0 z-[60] bg-cocoa/30 lg:hidden" onClick={() => setNavOpen(false)} />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b-2 border-cocoa bg-cream/95 px-4 backdrop-blur sm:px-7">
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa lg:hidden" onClick={() => setNavOpen(true)} aria-label="Open navigation">
            <Menu className="h-5 w-5" />
          </button>
          <div className="hidden lg:block">
            <p className="text-xs font-black uppercase tracking-[.16em] text-cocoa/50">Chapter hub</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden rounded-full border border-cocoa bg-butter px-3 py-1.5 text-xs font-black text-cocoa sm:inline-flex">Preview mode</span>
            <button type="button" className="relative grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa bg-white" aria-label="Notifications">
              <Bell className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full border border-cocoa bg-rose" />
            </button>
            <div className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa bg-mint font-black text-cocoa" aria-label="Signed in as Maya">M</div>
          </div>
        </header>

        <main id="dashboard-main" className="mx-auto max-w-[1280px] px-4 py-8 sm:px-7 sm:py-10">
          {saved && (
            <div role="status" className="mb-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
              <BadgeCheck className="h-5 w-5" /> Hours saved as a draft for advisor review.
            </div>
          )}
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="font-hand text-2xl font-bold text-rose">Sunday, November 1</p>
              <h1 className="mt-1 font-display text-4xl font-black tracking-tight text-cocoa sm:text-5xl">Hi Maya, ready to help?</h1>
              <p className="mt-2 text-ink/60">Here’s what’s happening with Westview Paws.</p>
            </div>
            <button type="button" onClick={() => setShowHourForm(true)} className="button-primary shrink-0">
              <Plus aria-hidden className="h-4 w-4" /> Log service hours
            </button>
          </div>

          <section aria-labelledby="chapter-overview" className="mt-9">
            <h2 id="chapter-overview" className="sr-only">Chapter overview</h2>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <Metric icon={<Clock3 />} value="186" label="verified hours" note="+24 this month" color="bg-[#f6d8e1]" />
              <Metric icon={<CircleDollarSign />} value="$1,840" label="funds raised" note="74% of goal" color="bg-[#f4e3a6]" />
              <Metric icon={<HeartHandshake />} value="8" label="projects finished" note="2 pending review" color="bg-[#cfe1d2]" />
              <Metric icon={<Users />} value="24" label="active members" note="3 joined recently" color="bg-[#ddd5ed]" />
            </div>
          </section>

          <div className="mt-6 grid gap-6 xl:grid-cols-[1.15fr_.85fr]">
            <section id="launch-plan" aria-labelledby="launch-heading" className="sticker-card bg-white p-5 sm:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.15em] text-rose">30-day launch plan</p>
                  <h2 id="launch-heading" className="mt-2 font-display text-2xl font-black text-cocoa">Almost ready for your first project</h2>
                </div>
                <span className="font-hand text-3xl font-bold text-rose">{progress}%</span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full border-2 border-cocoa bg-cream" aria-label={`${progress}% complete`} role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
                <div className="h-full bg-rose transition-[width]" style={{ width: `${progress}%` }} />
              </div>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {launchTasks.map((task, index) => (
                  <li key={task}>
                    <label className="flex min-h-14 cursor-pointer items-center gap-3 rounded-xl border border-cocoa/25 bg-cream/60 p-3 hover:border-cocoa">
                      <input
                        type="checkbox"
                        checked={checked[index]}
                        onChange={() => setChecked((current) => current.map((item, itemIndex) => itemIndex === index ? !item : item))}
                        className="peer sr-only"
                      />
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-md border-2 border-cocoa bg-white peer-checked:bg-mint">
                        {checked[index] && <Check aria-hidden className="h-4 w-4" strokeWidth={3} />}
                      </span>
                      <span className={`text-sm font-bold ${checked[index] ? "text-cocoa/55 line-through" : "text-cocoa"}`}>{task}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="requests-heading" className="sticker-card bg-[#f4e3a6] p-5 sm:p-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.15em] text-cocoa/55">Near your chapter</p>
                  <h2 id="requests-heading" className="mt-2 font-display text-2xl font-black text-cocoa">Shelter requests</h2>
                </div>
                <PawPrint aria-hidden className="h-9 w-9 fill-rose text-rose" />
              </div>
              <div className="mt-5 space-y-3">
                <Request date="NOV 08" title="Kitten room refresh" place="Austin Animal Center" tags="6 volunteers · 3 hrs" />
                <Request date="NOV 15" title="Blanket & towel drive" place="Safe in Austin" tags="Supplies needed" />
              </div>
              <button type="button" className="mt-5 flex items-center gap-2 text-sm font-black text-cocoa hover:text-rose">
                View all local requests <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </section>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <section aria-labelledby="activity-heading" className="sticker-card bg-white p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <h2 id="activity-heading" className="font-display text-2xl font-black text-cocoa">Recent chapter activity</h2>
                <button className="text-xs font-black uppercase tracking-[.12em] text-rose">View all</button>
              </div>
              <ul className="mt-5 divide-y divide-cocoa/15">
                <Activity icon={<BadgeCheck />} title="Toy-making night approved" detail="42 toys · 18 verified hours" time="2 days ago" />
                <Activity icon={<Upload />} title="Fundraiser proof submitted" detail="Bake sale · $386 raised" time="5 days ago" />
                <Activity icon={<Sparkles />} title="Your project was spotlighted" detail="Shared to the network gallery" time="1 week ago" />
              </ul>
            </section>

            <section id="resources" aria-labelledby="resources-heading" className="sticker-card bg-[#dcebdc] p-5 sm:p-7">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[.15em] text-[#4d7357]">Resource library</p>
                  <h2 id="resources-heading" className="mt-2 font-display text-2xl font-black text-cocoa">Ready when you need it</h2>
                </div>
                <BookOpen aria-hidden className="h-8 w-8 text-cocoa" />
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Resource name="First meeting agenda" type="DOCX" />
                <Resource name="Chapter bylaws" type="PDF" />
                <Resource name="Shelter outreach email" type="DOCX" />
                <Resource name="Fundraiser checklist" type="PDF" />
              </div>
            </section>
          </div>
        </main>
      </div>

      {showHourForm && (
        <div className="fixed inset-0 z-[90] grid place-items-center bg-cocoa/45 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && setShowHourForm(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="hours-title" className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-[2rem] border-2 border-cocoa bg-cream p-6 shadow-[7px_7px_0_#6e493b] sm:p-8">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[.15em] text-rose">Service record</p>
                <h2 id="hours-title" className="mt-2 font-display text-3xl font-black text-cocoa">Log your hours</h2>
              </div>
              <button type="button" className="grid h-10 w-10 place-items-center rounded-full border-2 border-cocoa" onClick={() => setShowHourForm(false)} aria-label="Close form"><X className="h-5 w-5" /></button>
            </div>
            <form className="mt-6 space-y-5" onSubmit={submitHours}>
              <Field label="Project or activity">
                <select required className="form-control"><option value="">Choose an activity</option><option>Toy-making night</option><option>Shelter volunteer shift</option><option>Fundraiser</option><option>Other</option></select>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Date"><input required type="date" className="form-control" /></Field>
                <Field label="Hours"><input required min="0.25" step="0.25" type="number" placeholder="2.5" className="form-control" /></Field>
              </div>
              <Field label="What did you do?">
                <textarea required rows={3} className="form-control resize-none" placeholder="A short, specific description…" />
              </Field>
              <div>
                <p className="text-sm font-black text-cocoa">Proof of service</p>
                <button type="button" className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-cocoa/50 bg-white p-5 text-sm font-bold text-cocoa/65 hover:border-cocoa">
                  <Upload aria-hidden className="h-5 w-5" /> Add photo, PDF, or supervisor email
                </button>
                <p className="mt-2 text-xs text-cocoa/55">Do not upload photos of minors without permission.</p>
              </div>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button type="button" className="button-paper" onClick={() => setShowHourForm(false)}>Cancel</button>
                <button type="submit" className="button-primary">Save for advisor review</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({ icon, value, label, note, color }: { icon: React.ReactNode; value: string; label: string; note: string; color: string }) {
  return <article className={`rounded-[1.5rem] border-2 border-cocoa p-5 shadow-[3px_3px_0_#6e493b] ${color}`}>
    <div className="flex items-start justify-between text-cocoa"><span className="font-display text-3xl font-black">{value}</span><span className="grid h-9 w-9 place-items-center rounded-full border border-cocoa bg-white/60 [&>svg]:h-4 [&>svg]:w-4">{icon}</span></div>
    <p className="mt-1 text-xs font-black uppercase tracking-[.13em] text-cocoa/60">{label}</p>
    <p className="mt-3 text-xs font-bold text-cocoa">{note}</p>
  </article>;
}

function Request({ date, title, place, tags }: { date: string; title: string; place: string; tags: string }) {
  return <article className="rounded-2xl border-2 border-cocoa bg-white p-4">
    <div className="flex gap-4"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-blush text-center text-[.65rem] font-black leading-3 text-rose">{date.replace(" ", "\n")}</span><div><h3 className="font-display font-black text-cocoa">{title}</h3><p className="mt-1 text-xs font-bold text-cocoa/60">{place}</p><p className="mt-2 text-xs font-black text-rose">{tags}</p></div></div>
  </article>;
}

function Activity({ icon, title, detail, time }: { icon: React.ReactNode; title: string; detail: string; time: string }) {
  return <li className="flex gap-3 py-4 first:pt-0 last:pb-0"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-cocoa bg-blush text-rose [&>svg]:h-4 [&>svg]:w-4">{icon}</span><div className="min-w-0 flex-1"><p className="font-bold text-cocoa">{title}</p><p className="mt-1 text-xs text-cocoa/55">{detail}</p></div><time className="text-right text-[.65rem] font-bold text-cocoa/45">{time}</time></li>;
}

function Resource({ name, type }: { name: string; type: string }) {
  return <button type="button" className="group flex items-center gap-3 rounded-xl border border-cocoa/35 bg-white p-3 text-left hover:border-cocoa"><FileText className="h-5 w-5 shrink-0 text-[#4d7357]" /><span className="min-w-0 flex-1"><span className="block truncate text-sm font-bold text-cocoa">{name}</span><span className="text-[.6rem] font-black text-cocoa/45">{type}</span></span><Download className="h-4 w-4 text-cocoa/40 group-hover:text-rose" /></button>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-black text-cocoa">{label}</span>{children}</label>;
}

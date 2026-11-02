import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  FileCheck2,
  Heart,
  ListChecks,
  MapPin,
  Megaphone,
  Scissors,
  ShieldCheck,
} from "lucide-react";
import { branchRegions, chapters, networkMetrics } from "@/lib/platform-data";

const toolkits = [
  {
    number: "01",
    title: "Start with a real plan",
    copy: "Apply, get school approval, gather your crew, and claim your first shelter mini-task in 30 days.",
    items: ["Chapter application", "Launch checklist", "Parent consent", "Advisor sign-off"],
    color: "bg-[#f5cad7]",
  },
  {
    number: "02",
    title: "Make every hour count",
    copy: "Log scrap-to-toy nights, funds, and finished shelter tasks in one place—not five group chats.",
    items: ["Hour & proof logging", "Fundraising tracker", "Project galleries", "Resource library"],
    color: "bg-[#f4e3a6]",
  },
  {
    number: "03",
    title: "Protect the standard",
    copy: "Advisors and national organizers review work before it becomes part of the public impact story.",
    items: ["Claim review queue", "Active chapter monitor", "Service certificates", "Impact reports"],
    color: "bg-[#cfe1d2]",
  },
  {
    number: "04",
    title: "Finish what shelters ask for",
    copy: "Partners post small, clear tasks. Chapters claim them, complete them, and log the proof.",
    items: ["Shelter mini-task board", "Scrap-to-toy workshops", "Social spotlight queue", "Alumni mentors"],
    color: "bg-[#d9d2ed]",
  },
];

const toyPct = Math.min(100, Math.round((networkMetrics.toysDonated / networkMetrics.toyGoal) * 100));

export function StorybookHome() {
  return (
    <>
      <section className="paper-grid relative overflow-hidden border-b-2 border-cocoa pt-16">
        <div className="mx-auto grid min-h-[720px] max-w-[1400px] items-center gap-10 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow">Student-led animal welfare · {networkMetrics.activeChapters} chapter branches</p>
            <h1 className="mt-7 font-display text-[clamp(3.6rem,9.5vw,7.5rem)] font-extrabold leading-[.86] tracking-[-.05em] text-cocoa">
              PawsForCause
            </h1>
            <p className="mt-4 font-hand text-3xl font-semibold leading-tight text-rose sm:text-4xl">
              High school branches. Real shelter tasks. Toys that leave campus.
            </p>
            <p className="mt-7 max-w-xl text-lg font-medium leading-8 text-ink/75 sm:text-xl">
              We organize student chapters that sew enrichment toys from fashion scraps, raise clean funds,
              and finish the mini-tasks shelters actually need.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/apply" className="button-primary">
                Start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/directory" className="button-paper">
                See our branches
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-bold text-cocoa/70">
              <ShieldCheck aria-hidden className="h-4 w-4 text-sage-dark" />
              USA · Qatar · India — and growing
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[560px]">
            <div className="scrap-card relative w-full p-5 sm:p-7">
              <div className="flex items-center justify-between border-b-2 border-dashed border-cocoa/25 pb-4">
                <div>
                  <p className="font-hand text-2xl font-semibold text-rose">Network so far</p>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-cocoa/55">Verified impact</p>
                </div>
                <span className="rounded-full border-2 border-cocoa bg-mint px-3 py-1 text-xs font-black text-cocoa">
                  LIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5">
                <ImpactNote value={`${networkMetrics.toysDonated}+`} label="toys donated" className="-rotate-1 bg-[#f7d4df]" />
                <ImpactNote value={`$${networkMetrics.toyValueUsd.toLocaleString()}`} label="toy value" className="rotate-1 bg-[#f6eab8]" />
                <ImpactNote value={`$${networkMetrics.fundsRaised}`} label="funds raised" className="rotate-1 bg-[#dcebdc]" />
                <ImpactNote value={String(networkMetrics.activeChapters)} label="chapter branches" className="-rotate-1 bg-[#e5ddf1]" />
              </div>
              <div className="rounded-[1.5rem] border-2 border-cocoa bg-cream p-4">
                <div className="flex items-start gap-3">
                  <Scissors aria-hidden className="mt-1 h-5 w-5 shrink-0 text-rose" />
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.16em] text-rose">How the toys happen</p>
                    <p className="mt-1 text-sm font-bold leading-6 text-cocoa">
                      We work with school fashion departments to turn fabric scraps into enrichment toys for shelters.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="text-sm font-black text-cocoa">Toward {networkMetrics.toyGoal} toys</p>
                    <p className="font-hand text-xl font-semibold text-rose">{toyPct}%</p>
                  </div>
                  <div className="h-4 overflow-hidden rounded-full border-2 border-cocoa bg-white">
                    <div className="h-full border-r-2 border-cocoa bg-rose" style={{ width: `${toyPct}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="scallop-border" aria-hidden />
      </section>

      <section className="border-b-2 border-cocoa bg-[#fff3e4] px-5 py-20 sm:px-10 lg:py-24">
        <div className="mx-auto max-w-[1250px]">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow w-fit">Our branches</p>
              <h2 className="section-title mt-5 text-left">
                One organization.
                <br />
                <span>{networkMetrics.activeChapters} chapter homes.</span>
              </h2>
              <p className="section-copy mt-4">
                PawsForCause is a network of high school chapters — from DFW to Doha — running the same standard under local leadership.
              </p>
            </div>
            <Link href="/directory" className="button-primary shrink-0">
              Open chapter map <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {branchRegions.map((region) => (
              <article key={region.label} className="sticker-card bg-white p-5">
                <p className="text-xs font-black uppercase tracking-[.14em] text-rose">{region.label}</p>
                <ul className="mt-4 space-y-2">
                  {region.chapters.map((name) => (
                    <li key={name} className="flex items-center gap-2 text-sm font-bold text-cocoa">
                      <MapPin aria-hidden className="h-3.5 w-3.5 text-rose" />
                      {name}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ul className="mt-8 flex flex-wrap gap-2">
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <Link
                  href="/directory"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-cocoa bg-cream px-3 py-1.5 text-xs font-black text-cocoa transition hover:bg-blush"
                >
                  <span className="h-2 w-2 rounded-full bg-rose" aria-hidden />
                  {chapter.city}
                  {chapter.region ? ` · ${chapter.region}` : ""}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto w-fit">How it works</p>
            <h2 className="section-title mt-5">
              From “we should help” to <span>task done.</span>
            </h2>
            <p className="section-copy mx-auto mt-5">
              Shelters post mini-tasks. Chapters claim them, finish them, and report the work so it counts.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <StepCard icon={<Megaphone />} number="1" title="Gather your people" body="Apply with a student lead, school advisor, and a small crew ready to take ownership." />
            <StepCard icon={<ListChecks />} number="2" title="Claim a shelter task" body="Pick a posted mini-task — sort supplies, sew scrap toys, assemble packets — and own it." />
            <StepCard icon={<BadgeCheck />} number="3" title="Do it. Log it. Share it." body="Record hours and proof, get advisor approval, and add verified impact to the network." />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-cocoa bg-blush px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid items-end gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow w-fit">Inside your chapter hub</p>
              <h2 className="section-title mt-5 text-left">
                All the work.
                <br />
                <span>One calm desk.</span>
              </h2>
            </div>
            <p className="section-copy max-w-2xl lg:justify-self-end">
              Launch tasks, service records, fundraising, scrap-to-toy projects, consent, and advisor review live together.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {toolkits.map((kit) => (
              <article key={kit.number} className={`${kit.color} sticker-card p-7 sm:p-9`}>
                <span className="font-hand text-4xl font-semibold text-cocoa/45">{kit.number}</span>
                <h3 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-cocoa">{kit.title}</h3>
                <p className="mt-3 max-w-xl leading-7 text-ink/70">{kit.copy}</p>
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {kit.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-bold text-cocoa">
                      <span className="grid h-5 w-5 place-items-center rounded-full border border-cocoa bg-white/65">
                        <Check aria-hidden className="h-3 w-3" strokeWidth={3} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/portal" className="button-primary">
              Open chapter hub <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/shelter" className="button-paper">
              Shelter mini-tasks
            </Link>
            <Link href="/admin" className="button-paper">
              National admin
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto w-fit">Platform</p>
            <h2 className="section-title mt-5">
              Tools for every branch.
              <br />
              <span>Not a brochure.</span>
            </h2>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/directory", "Chapter directory & map", "All 11 branches, filterable by region"],
              ["/leaderboard", "Inter-chapter leaderboards", "Toys, funds, and project rankings"],
              ["/impact", "Impact & fundraising", "85+ toys · $1,550 value · $400 funds"],
              ["/adopt", "Shelter mini-task board", "Completable tasks shelters post for chapters"],
              ["/shelter", "Shelter partner portal", "Post a mini-task to nearby branches"],
              ["/alumni", "Alumni mentor portal", "Sign up and request mentor matches"],
            ].map(([href, title, copy]) => (
              <Link key={href} href={href} className="sticker-card block bg-white p-6 transition hover:-translate-y-1 hover:bg-blush/40">
                <p className="font-display text-2xl font-extrabold text-cocoa">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-rose">
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t-2 border-cocoa bg-[#dcebdc] px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1250px] gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow w-fit">Scrap to kennel</p>
            <h2 className="section-title mt-5 text-left">
              Fashion scraps.
              <br />
              <span>Shelter enrichment.</span>
            </h2>
            <p className="section-copy mt-5">
              Chapters partner with school fashion departments to sew toys from leftover fabric. We&apos;ve donated{" "}
              <strong>{networkMetrics.toysDonated}+ toys</strong> worth about{" "}
              <strong>${networkMetrics.toyValueUsd.toLocaleString()}</strong>, and raised{" "}
              <strong>${networkMetrics.fundsRaised}</strong> in funds so far.
            </p>
            <ul className="mt-8 space-y-4">
              <FeatureLine icon={<Scissors />} title="Fashion department workshops" body="Turn scrap fabric into durable enrichment toys shelters can use." />
              <FeatureLine icon={<BookOpen />} title="Documented donations" body="Counts only clear after advisor and HQ review." />
              <FeatureLine icon={<Heart />} title="Task-sized help" body="Shelters ask for folding, labeling, sewing — not vague ‘volunteer vibes.’" />
            </ul>
          </div>
          <div className="sticker-card bg-white p-7 sm:p-9">
            <p className="text-xs font-black uppercase tracking-[.16em] text-rose">Why verification matters</p>
            <h3 className="mt-3 font-display text-3xl font-extrabold text-cocoa">Public totals stay honest</h3>
            <ul className="mt-8 space-y-4">
              <FeatureLine icon={<FileCheck2 />} title="Reviewed impact" body="Advisor and organizer verification before publication." />
              <FeatureLine icon={<ListChecks />} title="Shelter-first tasks" body="Needs and outcomes—not performative volunteering." />
              <FeatureLine icon={<ShieldCheck />} title="Consent built in" body="Parent waivers and image permissions stay attached to the work." />
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/impact" className="inline-flex items-center gap-2 font-black text-rose underline decoration-2 underline-offset-4">
                Impact board <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/adopt" className="inline-flex items-center gap-2 font-black text-rose underline decoration-2 underline-offset-4">
                Open tasks <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t-2 border-cocoa bg-cocoa px-5 py-24 text-cream sm:px-10 lg:py-28">
        <div className="relative mx-auto max-w-[1000px] text-center">
          <p className="eyebrow mx-auto w-fit border-cream bg-transparent text-cream">There&apos;s room in the network</p>
          <h2 className="mt-7 font-display text-5xl font-extrabold tracking-[-.04em] sm:text-7xl">Your school can be the next branch.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Join chapters already working in California, Texas, Alabama, Georgia, Qatar, and India.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="button-primary border-cream bg-rose text-white shadow-[4px_4px_0_#fff8e9]">
              Apply to start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/directory" className="button-paper border-cream text-cream hover:bg-cream hover:text-cocoa">
              Browse branches
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function ImpactNote({ value, label, className }: { value: string; label: string; className: string }) {
  return (
    <div className={`rounded-xl border-2 border-cocoa p-4 text-center shadow-[2px_3px_0_#6e493b] ${className}`}>
      <p className="font-display text-2xl font-extrabold text-cocoa sm:text-3xl">{value}</p>
      <p className="mt-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cocoa/65">{label}</p>
    </div>
  );
}

function StepCard({ icon, number, title, body }: { icon: React.ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="sticker-card relative bg-white p-7 text-center">
      <span className="absolute right-5 top-4 font-hand text-3xl font-semibold text-rose/55">{number}</span>
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-cocoa bg-blush text-cocoa [&>svg]:h-7 [&>svg]:w-7">
        {icon}
      </div>
      <h3 className="mt-6 font-display text-2xl font-extrabold text-cocoa">{title}</h3>
      <p className="mt-3 leading-7 text-ink/68">{body}</p>
    </article>
  );
}

function FeatureLine({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <li className="flex gap-4">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-cocoa bg-blush text-rose [&>svg]:h-5 [&>svg]:w-5">
        {icon}
      </span>
      <div>
        <p className="font-display text-lg font-extrabold text-cocoa">{title}</p>
        <p className="mt-1 text-sm leading-6 text-ink/65">{body}</p>
      </div>
    </li>
  );
}

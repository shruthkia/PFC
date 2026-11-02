import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  FileCheck2,
  Heart,
  MapPin,
  Megaphone,
  PawPrint,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CatDoodle, DogDoodle } from "@/components/brand/animal-doodles";

const toolkits = [
  {
    number: "01",
    title: "Start with a real plan",
    copy: "Apply, get school approval, gather your crew, and launch your first shelter project in 30 days.",
    items: ["Chapter application", "Interactive launch checklist", "Parent consent", "Advisor sign-off"],
    color: "bg-[#f5cad7]",
  },
  {
    number: "02",
    title: "Make every hour count",
    copy: "Keep service records, proof, funds, and project stories in one calm place—not five group chats.",
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
    title: "Share what is needed",
    copy: "Shelter partners can send nearby chapters a clear, timely request for supplies or helping hands.",
    items: ["Shelter request board", "Adoption partner feed", "Social spotlight queue", "Alumni mentors"],
    color: "bg-[#d9d2ed]",
  },
];

const chapterPins = [
  { label: "WA", left: "13%", top: "24%" },
  { label: "CA", left: "14%", top: "62%" },
  { label: "TX", left: "45%", top: "72%" },
  { label: "IL", left: "58%", top: "40%" },
  { label: "GA", left: "70%", top: "65%" },
  { label: "NY", left: "84%", top: "28%" },
];

export function StorybookHome() {
  return (
    <>
      <section className="paper-grid relative overflow-hidden border-b-2 border-cocoa pt-16">
        <div className="mx-auto grid min-h-[760px] max-w-[1400px] items-center gap-8 px-5 py-16 sm:px-10 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
          <div className="relative z-10 max-w-3xl">
            <p className="eyebrow">
              <Sparkles aria-hidden className="h-4 w-4" />
              Student-led animal welfare
            </p>
            <h1 className="mt-7 font-display text-[clamp(4.2rem,11vw,9.3rem)] font-black leading-[.78] tracking-[-.07em] text-cocoa">
              Small paws.
              <span className="mt-3 block font-hand text-[.92em] font-semibold tracking-[-.035em] text-rose">
                Big change.
              </span>
            </h1>
            <p className="mt-9 max-w-xl text-lg font-medium leading-8 text-ink/75 sm:text-xl">
              We help high school students turn their love for animals into useful,
              verified work for local shelters.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/apply" className="button-primary">
                Start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/login" className="button-paper">
                Chapter login
              </Link>
            </div>
            <p className="mt-5 flex items-center gap-2 text-sm font-bold text-cocoa/70">
              <ShieldCheck aria-hidden className="h-4 w-4 text-sage-dark" />
              Built for students, advisors, and shelter partners
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-[600px] py-10">
            <div className="scrap-card relative ml-auto w-[92%] rotate-[1.5deg] p-5 sm:p-7">
              <div className="flex items-center justify-between border-b-2 border-dashed border-cocoa/25 pb-4">
                <div>
                  <p className="font-hand text-2xl font-bold text-rose">Our community lately</p>
                  <p className="text-xs font-bold uppercase tracking-[.18em] text-cocoa/55">Verified impact</p>
                </div>
                <span className="rounded-full border-2 border-cocoa bg-mint px-3 py-1 text-xs font-black text-cocoa">
                  LIVE
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5">
                <ImpactNote value="2,480" label="hours shared" className="-rotate-2 bg-[#f7d4df]" />
                <ImpactNote value="$18.6k" label="funds raised" className="rotate-2 bg-[#f6eab8]" />
                <ImpactNote value="47" label="shelters helped" className="rotate-1 bg-[#dcebdc]" />
                <ImpactNote value="326" label="animals supported" className="-rotate-1 bg-[#e5ddf1]" />
              </div>
              <div className="rounded-[1.5rem] border-2 border-cocoa bg-cream p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-black uppercase tracking-[.16em] text-rose">Goal of the month</p>
                    <p className="mt-1 font-display text-lg font-extrabold text-cocoa">1,000 enrichment toys</p>
                  </div>
                  <p className="font-hand text-2xl font-bold text-cocoa">74%</p>
                </div>
                <div className="mt-3 h-4 overflow-hidden rounded-full border-2 border-cocoa bg-white">
                  <div className="h-full w-[74%] border-r-2 border-cocoa bg-rose" />
                </div>
              </div>
              <PawPrint aria-hidden className="absolute -right-5 -top-6 h-14 w-14 rotate-12 fill-rose text-rose" />
            </div>
            <div className="absolute -bottom-4 -left-2 w-40 rotate-[-5deg] text-cocoa sm:w-52">
              <CatDoodle />
            </div>
            <div className="absolute -bottom-4 right-0 w-36 rotate-[4deg] text-cocoa sm:w-48">
              <DogDoodle />
            </div>
          </div>
        </div>
        <div className="scallop-border" aria-hidden />
      </section>

      <section className="bg-cream px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto w-fit">How it works</p>
            <h2 className="section-title mt-5">From “we should help” to <span>look what we did.</span></h2>
            <p className="section-copy mx-auto mt-5">
              Clear steps, useful templates, and thoughtful safeguards make it easier to
              start—and much harder for good intentions to disappear.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            <StepCard icon={<Megaphone />} number="1" title="Gather your people" body="Apply with a student lead, school advisor, and a small crew ready to take ownership." />
            <StepCard icon={<BookOpen />} number="2" title="Pick a real need" body="Choose from a shelter request or plan a project directly with a local partner." />
            <StepCard icon={<BadgeCheck />} number="3" title="Do it. Log it. Share it." body="Record hours and proof, get advisor approval, and add verified impact to the network." />
          </div>
        </div>
      </section>

      <section className="border-y-2 border-cocoa bg-blush px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="grid items-end gap-8 lg:grid-cols-[.85fr_1.15fr]">
            <div>
              <p className="eyebrow w-fit">Inside your chapter hub</p>
              <h2 className="section-title mt-5 text-left">All the work.<br /><span>One cozy home.</span></h2>
            </div>
            <p className="section-copy max-w-2xl lg:justify-self-end">
              The chapter hub keeps launch tasks, service records, fundraising, resources,
              consent, and advisor review together. No mystery spreadsheets.
            </p>
          </div>
          <div className="mt-14 grid gap-5 lg:grid-cols-2">
            {toolkits.map((kit) => (
              <article key={kit.number} className={`${kit.color} sticker-card p-7 sm:p-9`}>
                <div className="flex items-start justify-between gap-5">
                  <span className="font-hand text-4xl font-bold text-cocoa/45">{kit.number}</span>
                  <PawPrint aria-hidden className="h-8 w-8 fill-cocoa/25 text-cocoa/25" />
                </div>
                <h3 className="mt-5 font-display text-3xl font-black tracking-tight text-cocoa">{kit.title}</h3>
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
            <Link href="/advisor" className="button-paper">Advisor desk</Link>
            <Link href="/admin" className="button-paper">National admin</Link>
          </div>
        </div>
      </section>

      <section className="border-t-2 border-cocoa bg-cream px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto max-w-[1250px]">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mx-auto w-fit">Every surface, live</p>
            <h2 className="section-title mt-5">The whole platform.<br /><span>Not a teaser reel.</span></h2>
            <p className="section-copy mx-auto mt-5">
              Public maps, leaderboards, adoption feed, shelter broadcasts, alumni mentors, and the admin CMS are all clickable.
            </p>
          </div>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["/directory", "Chapter directory & map", "Filter by state and open every pin"],
              ["/leaderboard", "Inter-chapter leaderboards", "Hours, funds, and project rankings"],
              ["/impact", "Impact & fundraising bars", "Network counters + announcements"],
              ["/adopt", "Adoption partner feed", "Adoptable animals from partner shelters"],
              ["/shelter", "Shelter request portal", "Broadcast needs to nearby chapters"],
              ["/alumni", "Alumni mentor portal", "Sign up and request mentor matches"],
            ].map(([href, title, copy]) => (
              <Link key={href} href={href} className="sticker-card block bg-white p-6 transition hover:-translate-y-1 hover:bg-blush/40">
                <p className="font-display text-2xl font-black text-cocoa">{title}</p>
                <p className="mt-2 text-sm leading-6 text-ink/65">{copy}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-rose">
                  Open <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#dcebdc] px-5 py-24 sm:px-10 lg:py-32">
        <div className="mx-auto grid max-w-[1250px] gap-12 lg:grid-cols-[1.05fr_.95fr]">
          <div className="relative min-h-[520px] overflow-hidden rounded-[2.5rem] border-2 border-cocoa bg-[#cfe1d2] p-6 shadow-sketch sm:p-9">
            <div className="flex items-center justify-between">
              <div>
                <p className="eyebrow w-fit bg-white/65">Chapter directory</p>
                <h2 className="mt-4 font-display text-4xl font-black text-cocoa">A growing pack</h2>
              </div>
              <span className="rounded-full border-2 border-cocoa bg-white px-4 py-2 text-xs font-black text-cocoa">6 regions</span>
            </div>
            <div className="relative mt-8 h-[330px] rounded-[2rem] border-2 border-cocoa bg-[#f8f3df]">
              <svg viewBox="0 0 600 350" className="absolute inset-0 h-full w-full opacity-50" aria-hidden>
                <path d="M65 96L123 55l66 9 51-29 71 24 86-1 48 38 90 21-18 57-58 27-31 58-70-11-59 36-65-35-81 16-35-44-57-17 20-61-16-67Z" fill="#f1c9d6" stroke="#6e493b" strokeWidth="3" strokeLinejoin="round" />
                <path d="M90 145c72 30 110 10 165 52s105-40 174 16" fill="none" stroke="#6e493b" strokeWidth="2" strokeDasharray="7 8" />
              </svg>
              {chapterPins.map((pin) => (
                <div key={pin.label} className="map-pin" style={{ left: pin.left, top: pin.top }}>
                  <MapPin aria-hidden className="h-8 w-8 fill-rose text-cocoa" />
                  <span>{pin.label}</span>
                </div>
              ))}
            </div>
            <Link href="/directory" className="button-primary mt-6">
              Open interactive map <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
          </div>

          <div className="flex flex-col justify-center">
            <p className="eyebrow w-fit">Public, but responsible</p>
            <h2 className="section-title mt-5 text-left">Show the change.<br /><span>Protect the people.</span></h2>
            <p className="section-copy mt-5">
              Only approved chapter work reaches public totals, maps, leaderboards, and stories.
              Student privacy and photo permissions come before a good-looking post.
            </p>
            <ul className="mt-8 space-y-4">
              <FeatureLine icon={<FileCheck2 />} title="Reviewed impact" body="Advisor and organizer verification before publication." />
              <FeatureLine icon={<Heart />} title="Shelter-first stories" body="Needs and outcomes—not performative volunteering." />
              <FeatureLine icon={<ShieldCheck />} title="Consent built in" body="Parent waivers and image permissions stay attached to the work." />
            </ul>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/impact" className="inline-flex items-center gap-2 font-black text-rose underline decoration-2 underline-offset-4">
                Impact board <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
              <Link href="/leaderboard" className="inline-flex items-center gap-2 font-black text-rose underline decoration-2 underline-offset-4">
                Leaderboards <ArrowRight aria-hidden className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-t-2 border-cocoa bg-cocoa px-5 py-24 text-cream sm:px-10 lg:py-28">
        <PawPrint aria-hidden className="absolute -right-10 -top-12 h-56 w-56 rotate-12 fill-white/5 text-white/5" />
        <div className="relative mx-auto max-w-[1000px] text-center">
          <p className="eyebrow mx-auto w-fit border-cream bg-transparent text-cream">There’s room in the pack</p>
          <h2 className="mt-7 font-display text-5xl font-black tracking-[-.05em] sm:text-7xl">
            Your school can be next.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-cream/75">
            Bring a chapter to your campus and we’ll help you turn the first idea
            into the first verified project.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/apply" className="button-primary border-cream bg-rose text-white shadow-[4px_4px_0_#fff8e9]">
              Apply to start a chapter <ArrowRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link href="/faq" className="button-paper border-cream text-cream hover:bg-cream hover:text-cocoa">
              Read the FAQ
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
      <p className="font-display text-2xl font-black text-cocoa sm:text-3xl">{value}</p>
      <p className="mt-1 text-[.65rem] font-black uppercase tracking-[.14em] text-cocoa/65">{label}</p>
    </div>
  );
}

function StepCard({ icon, number, title, body }: { icon: React.ReactNode; number: string; title: string; body: string }) {
  return (
    <article className="sticker-card relative bg-white p-7 text-center">
      <span className="absolute right-5 top-4 font-hand text-3xl font-bold text-rose/55">{number}</span>
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border-2 border-cocoa bg-blush text-cocoa [&>svg]:h-7 [&>svg]:w-7">
        {icon}
      </div>
      <h3 className="mt-6 font-display text-2xl font-black text-cocoa">{title}</h3>
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
        <p className="font-display text-lg font-black text-cocoa">{title}</p>
        <p className="mt-1 text-sm leading-6 text-ink/65">{body}</p>
      </div>
    </li>
  );
}

"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { chapters } from "@/lib/platform-data";

/** Rough layout positions for the stylized network map (not geo-accurate). */
const pinPositions: Record<string, { left: string; top: string }> = {
  shafter: { left: "14%", top: "48%" },
  eastvale: { left: "16%", top: "58%" },
  "san-jose": { left: "12%", top: "38%" },
  "sulphur-springs": { left: "48%", top: "52%" },
  coppell: { left: "46%", top: "58%" },
  plano: { left: "49%", top: "56%" },
  frisco: { left: "47%", top: "54%" },
  "richmond-hill": { left: "68%", top: "62%" },
  "spanish-fort": { left: "58%", top: "68%" },
  doha: { left: "78%", top: "42%" },
  coimbatore: { left: "86%", top: "55%" },
};

export function ChapterDirectory() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(chapters.find((c) => c.id === "coppell")?.id ?? chapters[0].id);

  const regions = useMemo(() => {
    const set = new Set<string>();
    chapters.forEach((chapter) => {
      if (chapter.country !== "USA") set.add(chapter.country);
      else if (chapter.region) set.add(chapter.region);
      else set.add(chapter.state);
    });
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = chapters.filter((chapter) => {
    const hay = `${chapter.name} ${chapter.school} ${chapter.city} ${chapter.state} ${chapter.country} ${chapter.region ?? ""}`.toLowerCase();
    const matchesQuery = hay.includes(query.toLowerCase());
    const matchesRegion =
      region === "All" ||
      chapter.country === region ||
      chapter.region === region ||
      chapter.state === region;
    return matchesQuery && matchesRegion;
  });

  const active = chapters.find((chapter) => chapter.id === selected) ?? filtered[0] ?? chapters[0];

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow w-fit">PawsForCause branches</p>
          <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">Chapter directory & map</h1>
          <p className="mt-3 text-lg text-ink/65">
            Eleven chapter branches across California, DFW, the Southeast, Qatar, and India. Filter by region, then open a pin.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search chapters</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-cocoa/45" />
            <input
              className="form-control pl-11"
              placeholder="Search by chapter, school, or city"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </label>
          <label className="sm:w-52">
            <span className="sr-only">Filter by region</span>
            <select className="form-control" value={region} onChange={(event) => setRegion(event.target.value)}>
              {regions.map((item) => (
                <option key={item} value={item}>
                  {item === "All" ? "All regions" : item}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
          <Panel tone="mint" className="overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-display text-2xl font-extrabold text-cocoa">Branch map</h2>
              <StatusPill tone="info">{filtered.length} shown</StatusPill>
            </div>
            <div className="relative mt-5 h-[400px] overflow-hidden rounded-[1.8rem] border-2 border-cocoa bg-[#f8f3df]">
              <svg viewBox="0 0 600 400" className="absolute inset-0 h-full w-full opacity-50" aria-hidden>
                <path
                  d="M40 120c40-50 90-70 140-60 55 12 70 40 120 35 60-6 95-45 150-30 40 12 70 40 110 55v160c-55 25-100 10-150 20-55 12-80 45-140 40-50-4-90-35-130-30-35 4-70 25-100 10V120Z"
                  fill="#f1c9d6"
                  stroke="#6e493b"
                  strokeWidth="3"
                  strokeLinejoin="round"
                />
              </svg>
              {filtered.map((chapter) => {
                const pos = pinPositions[chapter.id] ?? { left: "50%", top: "50%" };
                return (
                  <button
                    key={chapter.id}
                    type="button"
                    className={`map-pin absolute -translate-x-1/2 -translate-y-full ${selected === chapter.id ? "z-10 scale-110" : ""}`}
                    style={{ left: pos.left, top: pos.top }}
                    onClick={() => setSelected(chapter.id)}
                    aria-pressed={selected === chapter.id}
                    aria-label={`${chapter.name} in ${chapter.city}`}
                  >
                    <MapPin className={`h-9 w-9 ${selected === chapter.id ? "fill-rose text-cocoa" : "fill-white text-cocoa"}`} />
                    <span className="rounded-full border border-cocoa bg-white px-2 py-0.5 text-[.65rem] font-black">
                      {chapter.city}
                    </span>
                  </button>
                );
              })}
            </div>
            {active ? (
              <div className="mt-5 rounded-2xl border-2 border-cocoa bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-extrabold text-cocoa">{active.name}</p>
                    <p className="mt-1 text-sm text-cocoa/65">
                      {active.school} · {active.city}
                      {active.region ? ` (${active.region})` : ""} · {active.country}
                    </p>
                  </div>
                  <StatusPill tone={active.status === "At risk" ? "bad" : active.status === "Launching" ? "warn" : "good"}>
                    {active.status}
                  </StatusPill>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <MiniStat label="Toys" value={String(active.toys)} />
                  <MiniStat label="Funds" value={`$${active.funds}`} />
                  <MiniStat label="Projects" value={String(active.projects)} />
                  <MiniStat label="Members" value={String(active.members)} />
                </dl>
              </div>
            ) : null}
          </Panel>

          <Panel>
            <h2 className="font-display text-2xl font-extrabold text-cocoa">All branches</h2>
            <ul className="mt-5 space-y-3">
              {filtered.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(chapter.id)}
                    className={`w-full rounded-2xl border-2 border-cocoa p-4 text-left transition ${
                      selected === chapter.id ? "bg-blush shadow-[3px_3px_0_#6e493b]" : "bg-cream hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-extrabold text-cocoa">{chapter.city}</p>
                        <p className="mt-1 text-xs font-bold text-cocoa/55">
                          {chapter.name}
                          {chapter.region ? ` · ${chapter.region}` : ` · ${chapter.country}`}
                        </p>
                      </div>
                      <StatusPill tone="good">{chapter.status}</StatusPill>
                    </div>
                  </button>
                </li>
              ))}
              {!filtered.length ? <p className="text-sm font-bold text-cocoa/55">No chapters match that filter.</p> : null}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-cocoa/20 bg-cream px-3 py-2">
      <p className="font-display text-lg font-extrabold text-cocoa">{value}</p>
      <p className="text-[.6rem] font-black uppercase tracking-[.12em] text-cocoa/50">{label}</p>
    </div>
  );
}

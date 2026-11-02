"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { usePlatform } from "@/lib/platform-store";

const ChapterMap = dynamic(() => import("@/components/chapter-map").then((mod) => mod.ChapterMap), {
  ssr: false,
  loading: () => (
    <div className="mt-5 grid h-[400px] place-items-center rounded-[1.8rem] border-2 border-cocoa bg-[#e8f0e4] font-bold text-cocoa/60">
      Loading live map…
    </div>
  ),
});

export function ChapterDirectory() {
  const { chapters, metrics } = usePlatform();
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState(chapters.find((c) => c.id === "coppell")?.id ?? chapters[0]?.id ?? "");

  const regions = useMemo(() => {
    const set = new Set<string>();
    chapters.forEach((chapter) => {
      if (chapter.country !== "USA") set.add(chapter.country);
      else if (chapter.region) set.add(chapter.region);
      else set.add(chapter.state);
    });
    return ["All", ...Array.from(set).sort()];
  }, [chapters]);

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
          <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">
            Chapter directory & map
          </h1>
          <p className="mt-3 text-lg text-ink/65">
            {metrics.activeChapters} chapter branches on a real OpenStreetMap. Filter by region, then tap a pin.
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
            <ChapterMap
              chapters={filtered}
              selectedId={active?.id ?? ""}
              onSelect={(id) => setSelected(id)}
            />
            {active ? (
              <div className="mt-5 rounded-2xl border-2 border-cocoa bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-extrabold text-cocoa">{active.name}</p>
                    <p className="mt-1 text-sm text-cocoa/65">
                      {active.school} · {active.city}
                      {active.region ? ` (${active.region})` : ""} · {active.country}
                    </p>
                    <p className="mt-1 text-xs font-bold text-muted">
                      {active.lat.toFixed(2)}, {active.lng.toFixed(2)}
                    </p>
                  </div>
                  <StatusPill tone={active.status === "At risk" ? "bad" : active.status === "Launching" ? "warn" : "good"}>
                    {active.status}
                  </StatusPill>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <MiniStat label="Toys" value={String(active.toys)} />
                  <MiniStat label="Funds" value={`$${active.funds}`} />
                  <MiniStat label="Hours" value={String(active.hours)} />
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
                      <StatusPill tone={chapter.status === "Launching" ? "warn" : "good"}>{chapter.status}</StatusPill>
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

"use client";

import type { LayerGroup, Map as LeafletMap, Marker } from "leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, Search } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { chapters, type PublicRecord } from "@/lib/platform-data";

const TILE_URL = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright" rel="noreferrer">OpenStreetMap</a> contributors';

type Chapter = (typeof chapters)[number];

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (char) => {
    const map: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return map[char] ?? char;
  });
}

function popupMarkup(chapter: Chapter, record?: PublicRecord) {
  return `<div class="pfc-popup">
    <p class="pfc-popup-kicker">${escapeHtml(chapter.status)} chapter</p>
    <p class="pfc-popup-title">${escapeHtml(chapter.name)}</p>
    <p class="pfc-popup-meta">${escapeHtml(chapter.school)}<br />${escapeHtml(chapter.city)}, ${escapeHtml(
      chapter.country === "USA" ? chapter.state : chapter.country,
    )}</p>
    ${
      record
        ? `<dl class="pfc-popup-stats">
      <div><dt>Toys</dt><dd>${record.toysMade}</dd></div>
      <div><dt>Members</dt><dd>${record.members}</dd></div>
      <div><dt>Hours</dt><dd>${record.verifiedHours}</dd></div>
    </dl>`
        : `<p class="pfc-popup-meta">No portal record yet.</p>`
    }
  </div>`;
}

export function ChapterDirectory({ records }: { records: PublicRecord[] }) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("All");
  const [selected, setSelected] = useState("coppell");
  const [map, setMap] = useState<LeafletMap | null>(null);
  const [tilesFailed, setTilesFailed] = useState(false);

  const mapNode = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const layerRef = useRef<LayerGroup | null>(null);
  const markersRef = useRef<Map<string, Marker>>(new Map());
  const activeIdRef = useRef(selected);
  const recordById = useMemo(
    () => new Map(records.map((record) => [record.chapterId, record])),
    [records],
  );

  const regions = useMemo(() => {
    const set = new Set<string>();
    chapters.forEach((chapter) => {
      if (chapter.country !== "USA") set.add(chapter.country);
      else if (chapter.region) set.add(chapter.region);
      else set.add(chapter.state);
    });
    return ["All", ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    return chapters.filter((chapter) => {
      const hay =
        `${chapter.name} ${chapter.school} ${chapter.city} ${chapter.state} ${chapter.country} ${chapter.region ?? ""}`.toLowerCase();
      const matchesQuery = hay.includes(query.trim().toLowerCase());
      const matchesRegion =
        region === "All" ||
        chapter.country === region ||
        chapter.region === region ||
        chapter.state === region;
      return matchesQuery && matchesRegion;
    });
  }, [query, region]);

  const active = filtered.find((chapter) => chapter.id === selected) ?? filtered[0] ?? null;
  const activeRecord = active ? recordById.get(active.id) : undefined;
  const activeHasEntries = Boolean(
    activeRecord &&
      (activeRecord.toysMade ||
        activeRecord.fundsRaised ||
        activeRecord.projectsApproved ||
        activeRecord.verifiedHours ||
        activeRecord.members),
  );

  // Keep the selected chapter available to the marker builder without making
  // selection rebuild every marker (which would close the open popup).
  useEffect(() => {
    activeIdRef.current = active?.id ?? "";
  }, [active?.id]);

  // Create the real map once. Leaflet is loaded in the browser only.
  useEffect(() => {
    let cancelled = false;
    const markers = markersRef.current;

    (async () => {
      const mod = (await import("leaflet")) as unknown as {
        default?: typeof import("leaflet");
      } & typeof import("leaflet");
      const L = mod.default ?? mod;
      if (cancelled || mapRef.current || !mapNode.current) return;

      const instance = L.map(mapNode.current, {
        scrollWheelZoom: false,
        worldCopyJump: true,
        minZoom: 2,
        maxZoom: 12,
      });

      const tiles = L.tileLayer(TILE_URL, { maxZoom: 19, attribution: ATTRIBUTION });
      tiles.on("tileerror", () => setTilesFailed(true));
      tiles.addTo(instance);

      instance.setView([22, 10], 2);
      layerRef.current = L.layerGroup().addTo(instance);
      mapRef.current = instance;
      setMap(instance);
      requestAnimationFrame(() => instance.invalidateSize());
    })();

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      layerRef.current = null;
      markers.clear();
    };
  }, []);

  // Draw the pins for whatever the filters currently show, then frame them.
  useEffect(() => {
    if (!map || !layerRef.current) return;
    let cancelled = false;

    (async () => {
      const mod = (await import("leaflet")) as unknown as {
        default?: typeof import("leaflet");
      } & typeof import("leaflet");
      const L = mod.default ?? mod;
      if (cancelled || !layerRef.current) return;

      const layer = layerRef.current;
      layer.clearLayers();
      markersRef.current.clear();

      filtered.forEach((chapter) => {
        const selectedPin = chapter.id === activeIdRef.current;
        const icon = L.divIcon({
          className: "pfc-pin-wrap",
          html: `<span class="pfc-pin${selectedPin ? " is-selected" : ""}"><span class="pfc-pin-dot"></span></span>`,
          iconSize: [34, 40],
          iconAnchor: [17, 38],
          popupAnchor: [0, -34],
        });

        const marker = L.marker([chapter.lat, chapter.lng], {
          icon,
          title: chapter.name,
          alt: `${chapter.name} in ${chapter.city}`,
          keyboard: true,
        });
        marker.bindPopup(popupMarkup(chapter, recordById.get(chapter.id)), { maxWidth: 270, closeButton: true });
        marker.on("click", () => setSelected(chapter.id));
        marker.addTo(layer);
        markersRef.current.set(chapter.id, marker);
      });

      if (filtered.length) {
        const bounds = L.latLngBounds(filtered.map((chapter) => [chapter.lat, chapter.lng] as [number, number]));
        map.fitBounds(bounds, { padding: [46, 46], maxZoom: 6 });
      } else {
        map.setView([22, 10], 2);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [filtered, map, recordById]);

  // Reflect the current selection on the marker without rebuilding the map.
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const element = marker.getElement();
      const pin = element?.querySelector<HTMLElement>(".pfc-pin");
      pin?.classList.toggle("is-selected", id === active?.id);
      element?.setAttribute("aria-pressed", id === active?.id ? "true" : "false");
    });
  }, [active?.id, map, filtered]);

  function selectChapter(id: string) {
    setSelected(id);
    const instance = mapRef.current;
    const marker = markersRef.current.get(id);
    if (!instance || !marker) return;
    instance.panTo(marker.getLatLng(), { animate: true, duration: 0.4 });
    marker.openPopup();
  }

  function clearFilters() {
    setQuery("");
    setRegion("All");
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft className="h-4 w-4" aria-hidden /> Public site
        </Link>
        <div className="mt-6 max-w-3xl">
          <p className="eyebrow w-fit">Chapter roster</p>
          <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">
            Chapter directory &amp; map
          </h1>
          <p className="mt-3 text-lg text-muted">
            {chapters.length} branches across California, DFW, the Southeast, Canada, Qatar, and India.
            Search, filter, then pick a pin or a name.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">Search chapters</span>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
              aria-hidden
            />
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
            <p className="mt-3 text-xs font-bold leading-5 text-muted">
              Real OpenStreetMap view. Drag to pan, use + / − to zoom. Pins mark the chapter&apos;s city, not an
              exact address.{" "}
              <a href="#branch-list" className="text-rose underline decoration-2 underline-offset-2">
                Skip to the list
              </a>
              .
            </p>

            <div className="relative mt-4 overflow-hidden rounded-[1.8rem] border-2 border-cocoa">
              <div
                ref={mapNode}
                className="h-[400px] w-full sm:h-[440px]"
                role="region"
                aria-label="Interactive map of PawsForCause chapter cities"
                aria-describedby="map-help"
              />
              <p id="map-help" className="sr-only">
                Drag to pan and use the plus and minus controls to zoom. Every chapter on this map also appears
                in the list below, where each entry opens the matching pin and chapter details.
              </p>
              {!map ? (
                <div className="pointer-events-none absolute inset-0 z-[800] grid place-items-center bg-[#f4ede1]">
                  <p className="flex items-center gap-2 text-sm font-black text-cocoa">
                    <MapPin className="h-4 w-4" aria-hidden /> Loading interactive map…
                  </p>
                </div>
              ) : null}
            </div>

            {tilesFailed ? (
              <p
                role="status"
                className="mt-3 rounded-xl border-2 border-[#8a5a24] bg-[#fff3d6] px-3 py-2 text-xs font-bold text-[#5c3b12]"
              >
                Map tiles could not load (offline, blocked, or rate-limited). The pins, details, and list below
                still work.
              </p>
            ) : (
              <p className="mt-3 text-[.7rem] font-semibold leading-4 text-muted">
                Map data ©{" "}
                <a
                  href="https://www.openstreetmap.org/copyright"
                  className="underline decoration-1 underline-offset-2"
                  rel="noreferrer"
                  target="_blank"
                >
                  OpenStreetMap
                </a>{" "}
                contributors. Tiles are fetched from OpenStreetMap when this page opens.
              </p>
            )}

            {active ? (
              <div className="mt-4 rounded-2xl border-2 border-cocoa bg-white p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-display text-2xl font-extrabold text-cocoa">{active.name}</p>
                    <p className="mt-1 text-sm text-muted">
                      {active.school} · {active.city}
                      {active.region ? ` (${active.region})` : ""} · {active.country}
                    </p>
                  </div>
                  <StatusPill
                    tone={active.status === "At risk" ? "bad" : active.status === "Launching" ? "warn" : "good"}
                  >
                    {active.status}
                  </StatusPill>
                </div>
                <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
                  <MiniStat label="Toys" value={String(activeRecord?.toysMade ?? 0)} />
                  <MiniStat label="Funds" value={`$${activeRecord?.fundsRaised ?? 0}`} />
                  <MiniStat label="Projects" value={String(activeRecord?.projectsApproved ?? 0)} />
                  <MiniStat label="Members" value={String(activeRecord?.members ?? 0)} />
                  <MiniStat label="Hours" value={String(activeRecord?.verifiedHours ?? 0)} />
                </dl>
                {!activeHasEntries ? (
                  <p className="mt-3 rounded-xl border border-dashed border-cocoa/30 bg-cream px-3 py-2 text-xs font-semibold text-muted">
                    No portal entries yet. Totals start here when this chapter logs work.
                  </p>
                ) : null}
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border-2 border-dashed border-cocoa bg-white p-5">
                <p className="font-display text-lg font-extrabold text-cocoa">No chapters match that search.</p>
                <p className="mt-1 text-sm text-muted">Try a city, school, or region, or clear the filters.</p>
                <button type="button" className="button-paper mt-3 min-h-0 px-4 py-2 text-xs" onClick={clearFilters}>
                  Clear filters
                </button>
              </div>
            )}
          </Panel>

          <Panel>
            <h2 className="font-display text-2xl font-extrabold text-cocoa">All branches</h2>
            <ul id="branch-list" className="mt-5 space-y-3">
              {filtered.map((chapter) => (
                <li key={chapter.id}>
                  <button
                    type="button"
                    onClick={() => selectChapter(chapter.id)}
                    aria-pressed={chapter.id === active?.id}
                    className={`w-full rounded-2xl border-2 border-cocoa p-4 text-left transition ${
                      chapter.id === active?.id ? "bg-blush shadow-[3px_3px_0_#6e493b]" : "bg-cream hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-lg font-extrabold text-cocoa">{chapter.city}</p>
                        <p className="mt-1 text-xs font-bold text-muted">
                          {chapter.name}
                          {chapter.region ? ` · ${chapter.region}` : ` · ${chapter.country}`}
                        </p>
                      </div>
                      <StatusPill tone="good">{chapter.status}</StatusPill>
                    </div>
                  </button>
                </li>
              ))}
              {!filtered.length ? (
                <li className="rounded-2xl border-2 border-dashed border-cocoa bg-cream p-4">
                  <p className="text-sm font-bold text-muted">No chapters match that filter.</p>
                  <button type="button" className="button-paper mt-3 min-h-0 px-4 py-2 text-xs" onClick={clearFilters}>
                    Clear filters
                  </button>
                </li>
              ) : null}
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
      <p className="text-[.65rem] font-black uppercase tracking-[.12em] text-muted">{label}</p>
    </div>
  );
}

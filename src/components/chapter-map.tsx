"use client";

import { useEffect, useRef, useState } from "react";
import type { ChapterRecord } from "@/lib/platform-store";

type Props = {
  chapters: ChapterRecord[];
  selectedId: string;
  onSelect: (id: string) => void;
};

export function ChapterMap({ chapters, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const markersRef = useRef<import("leaflet").LayerGroup | null>(null);
  const onSelectRef = useRef(onSelect);
  const [mapReady, setMapReady] = useState(false);
  onSelectRef.current = onSelect;

  useEffect(() => {
    let cancelled = false;

    async function setup() {
      const L = (await import("leaflet")).default;
      await import("leaflet/dist/leaflet.css");
      if (cancelled || !containerRef.current || mapRef.current) return;

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false,
        worldCopyJump: true,
      }).setView([28, -20], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);

      markersRef.current = L.layerGroup().addTo(map);
      mapRef.current = map;
      requestAnimationFrame(() => {
        map.invalidateSize();
        if (!cancelled) setMapReady(true);
      });
    }

    setup();

    return () => {
      cancelled = true;
      setMapReady(false);
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
        markersRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapReady) return;

    async function syncMarkers() {
      const L = (await import("leaflet")).default;
      const map = mapRef.current;
      const group = markersRef.current;
      if (!map || !group) return;

      group.clearLayers();
      const bounds: import("leaflet").LatLngExpression[] = [];

      chapters.forEach((chapter) => {
        const selected = chapter.id === selectedId;
        const label = chapter.city.slice(0, 2).toUpperCase();
        const icon = L.divIcon({
          className: "pfc-map-marker",
          html: `<div style="display:flex;flex-direction:column;align-items:center;gap:2px;">
            <button type="button" aria-label="${chapter.name}" style="
              display:grid;place-items:center;min-width:36px;height:36px;padding:0 8px;border-radius:999px;
              border:2px solid #5c4338;background:${selected ? "#c45d7f" : "#fffaf4"};
              color:${selected ? "#fff6ef" : "#5c4338"};font:800 11px/1 Syne,sans-serif;
              box-shadow:2px 2px 0 rgba(92,67,56,.35);cursor:pointer;
            ">${label}</button>
            <span style="
              max-width:90px;padding:2px 6px;border-radius:999px;border:1px solid #5c4338;
              background:#fffaf4;color:#5c4338;font:800 9px/1.2 Figtree,sans-serif;
              white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
            ">${chapter.city}</span>
          </div>`,
          iconSize: [96, 56],
          iconAnchor: [48, 28],
        });
        const marker = L.marker([chapter.lat, chapter.lng], { icon, zIndexOffset: selected ? 500 : 0 });
        marker.on("click", () => onSelectRef.current(chapter.id));
        marker.bindTooltip(`${chapter.name} · ${chapter.toys} toys · $${chapter.funds}`, {
          direction: "top",
          offset: [0, -18],
        });
        group.addLayer(marker);
        bounds.push([chapter.lat, chapter.lng]);
      });

      if (bounds.length) {
        map.fitBounds(L.latLngBounds(bounds), { padding: [48, 48], maxZoom: 4 });
      }

      const active = chapters.find((chapter) => chapter.id === selectedId);
      if (active) {
        map.panTo([active.lat, active.lng], { animate: true });
      }
      requestAnimationFrame(() => map.invalidateSize());
    }

    syncMarkers();
  }, [chapters, selectedId, mapReady]);

  return (
    <div className="relative mt-5 h-[400px] overflow-hidden rounded-[1.8rem] border-2 border-cocoa bg-[#e8f0e4]">
      <div ref={containerRef} className="h-full w-full" />
      <p className="pointer-events-none absolute bottom-3 left-3 rounded-full border border-border bg-surface/95 px-3 py-1 text-[0.65rem] font-extrabold uppercase tracking-[0.12em] text-muted">
        Live OpenStreetMap
      </p>
    </div>
  );
}

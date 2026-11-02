"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Megaphone, Send } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import { chapters, shelterRequests as seedRequests } from "@/lib/platform-data";

export function ShelterPortal() {
  const [requests, setRequests] = useState(seedRequests);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(requests.map((item) => item.city)))],
    [requests],
  );

  const visible = filter === "All" ? requests : requests.filter((item) => item.city === filter);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const city = String(data.get("city"));
    setRequests((current) => [
      {
        id: `s${Date.now()}`,
        shelter: String(data.get("shelter")),
        title: String(data.get("title")),
        need: String(data.get("need")),
        when: String(data.get("when")),
        city,
        urgent: data.get("urgent") === "on",
      },
      ...current,
    ]);
    const nearby = chapters.filter((chapter) => city.toLowerCase().includes(chapter.city.toLowerCase()) || city.includes(chapter.state));
    setToast(
      nearby.length
        ? `Need broadcast to ${nearby.length} nearby chapter${nearby.length === 1 ? "" : "s"}.`
        : "Need posted to the network board for chapter matching.",
    );
    window.setTimeout(() => setToast(null), 4200);
    event.currentTarget.reset();
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Partner shelters</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Shelter request portal</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Broadcast immediate physical needs or event help requests directly to nearby chapters.
            </p>
          </div>
          <StatusPill tone="info">Shelter partner preview</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <Megaphone className="mt-1 h-6 w-6 text-rose" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Post a need</h2>
                <p className="mt-2 text-sm text-ink/65">Keep it specific: what, when, and how many hands or supplies.</p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={submit}>
              <Field label="Shelter / rescue name">
                <input name="shelter" required className="form-control" placeholder="Austin Animal Center" />
              </Field>
              <Field label="Request title">
                <input name="title" required className="form-control" placeholder="Kitten room refresh" />
              </Field>
              <Field label="What do you need?" hint="Volunteers, supplies, walks, enrichment, sorting…">
                <input name="need" required className="form-control" placeholder="6 volunteers · 3 hrs" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="When">
                  <input name="when" required className="form-control" placeholder="Nov 8 or Ongoing" />
                </Field>
                <Field label="City / region">
                  <input name="city" required className="form-control" placeholder="Austin, TX" list="shelter-cities" />
                  <datalist id="shelter-cities">
                    {Array.from(new Set(seedRequests.map((item) => item.city))).map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </Field>
              </div>
              <label className="flex items-center gap-3 text-sm font-bold text-cocoa">
                <input name="urgent" type="checkbox" className="h-4 w-4 accent-[#c94d78]" />
                Mark as urgent (needs help this week)
              </label>
              <button type="submit" className="button-primary">
                <Send className="h-4 w-4" /> Broadcast to chapters
              </button>
            </form>
          </Panel>

          <Panel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Live request board</h2>
                <p className="mt-2 text-sm text-ink/65">Chapters see matching city requests inside their hub.</p>
              </div>
              <label className="text-sm font-black text-cocoa">
                Filter
                <select
                  className="form-control mt-2 min-w-[180px]"
                  value={filter}
                  onChange={(event) => setFilter(event.target.value)}
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <ul className="mt-6 space-y-3">
              {visible.map((request) => (
                <li key={request.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-black text-cocoa">{request.title}</p>
                      <p className="mt-1 text-sm text-cocoa/65">
                        {request.shelter} · {request.city}
                      </p>
                      <p className="mt-2 text-sm font-bold text-rose">{request.need}</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-cocoa/45">{request.when}</p>
                    </div>
                    <StatusPill tone={request.urgent ? "bad" : "neutral"}>{request.urgent ? "Urgent" : "Open"}</StatusPill>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

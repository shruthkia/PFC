"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, GraduationCap, HeartHandshake } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import { alumni as alumniSeed } from "@/lib/platform-data";

export function AlumniPortal() {
  const [people, setPeople] = useState(alumniSeed);
  const [toast, setToast] = useState<string | null>(null);

  function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setPeople((current) => [
      {
        id: `al${Date.now()}`,
        name: String(data.get("name")),
        year: Number(data.get("year")),
        school: String(data.get("school")),
        focus: String(data.get("focus")),
        status: "Available",
      },
      ...current,
    ]);
    setToast("You're on the mentor directory. Chapters can request a match.");
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
            <p className="eyebrow w-fit">Graduating seniors & mentors</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Alumni portal</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Sign up as a mentor or bridge into university animal-welfare circles so the next class does not start from zero.
            </p>
          </div>
          <StatusPill tone="good">Mentor network open</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Panel tone="lilac">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-1 h-6 w-6 text-cocoa" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Join the directory</h2>
                <p className="mt-2 text-sm text-ink/65">Share what you can coach: launches, fundraising, shelter ops, or campus clubs.</p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={join}>
              <Field label="Full name">
                <input name="name" required className="form-control" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Graduation year">
                  <input name="year" required type="number" min="2020" max="2035" className="form-control" defaultValue={2026} />
                </Field>
                <Field label="High school chapter">
                  <input name="school" required className="form-control" placeholder="Westview High" />
                </Field>
              </div>
              <Field label="Mentoring focus">
                <select name="focus" required className="form-control">
                  <option value="">Choose a focus</option>
                  <option>Shelter ops mentoring</option>
                  <option>Fundraising coaching</option>
                  <option>University club bridge</option>
                  <option>Design & outreach kits</option>
                  <option>Launch planning</option>
                </select>
              </Field>
              <Field label="University / city (optional)">
                <input name="uni" className="form-control" placeholder="UT Austin · animal welfare org" />
              </Field>
              <button type="submit" className="button-primary">
                <HeartHandshake className="h-4 w-4" /> Add me to the mentor pack
              </button>
            </form>
          </Panel>

          <Panel>
            <h2 className="font-display text-2xl font-black text-cocoa">Mentor directory</h2>
            <p className="mt-2 text-sm text-ink/65">Chapter presidents can request a short call or campus handoff.</p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {people.map((person) => (
                <li key={person.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-black text-cocoa">{person.name}</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-rose">
                        Class of {person.year} · {person.school}
                      </p>
                    </div>
                    <StatusPill tone={person.status === "Available" ? "good" : "warn"}>{person.status}</StatusPill>
                  </div>
                  <p className="mt-3 text-sm font-bold text-cocoa/70">{person.focus}</p>
                  <button
                    type="button"
                    className="button-paper mt-4 min-h-0 px-3 py-2 text-xs"
                    onClick={() => {
                      setToast(`Mentorship request sent to ${person.name}.`);
                      window.setTimeout(() => setToast(null), 3500);
                    }}
                    disabled={person.status !== "Available"}
                  >
                    Request mentor match
                  </button>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}

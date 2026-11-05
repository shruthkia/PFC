"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, GraduationCap, HeartHandshake } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import type { MentorRecord } from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";

type Mentor = MentorRecord;

export function AlumniPortal({ memberName = "Alumni mentor" }: { memberName?: string }) {
  const [people, setPeople] = useStoredState<Mentor[]>(storageKeys.mentors, []);
  const [requests, setRequests] = useStoredState<string[]>(storageKeys.mentorRequests, []);
  const [toast, setToast] = useState<string | null>(null);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4200);
  }

  function join(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setPeople((current) => [
      {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? `al${crypto.randomUUID().slice(0, 8)}`
            : `al${Date.now()}`,
        name: String(data.get("name")),
        year: Number(data.get("year")),
        school: String(data.get("school")),
        focus: String(data.get("focus")),
        status: "Available",
      },
      ...current,
    ]);
    flash(`Thanks, ${memberName.split(" ")[0]}. Added to the shared mentor directory.`);
    form.reset();
  }

  function toggleRequest(person: Mentor) {
    const requested = requests.includes(person.id);
    setRequests((current) =>
      requested ? current.filter((id) => id !== person.id) : [...current, person.id],
    );
    flash(
      requested
        ? `Match request to ${person.name} cancelled.`
        : `Match request to ${person.name} saved. You still need to send an email.`,
    );
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Graduating seniors &amp; mentors</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Alumni portal</h1>
            <p className="mt-3 max-w-2xl text-muted">
              Keep the next class from starting at zero. Offer one specific kind of help: a launch call,
              fundraising review, or a campus club handoff.
            </p>
          </div>
          <StatusPill tone="good">{people.filter((person) => person.status === "Available").length} available</StatusPill>
        </div>

        {toast ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
          >
            <BadgeCheck aria-hidden className="h-5 w-5" /> {toast}
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]">
          <Panel tone="lilac">
            <div className="flex items-start gap-3">
              <GraduationCap aria-hidden className="mt-1 h-6 w-6 text-cocoa" />
              <div>
                <h2 className="font-display text-2xl font-black text-cocoa">Join the directory</h2>
                <p className="mt-2 text-sm text-muted">
                  Share what you can coach. Be specific: &quot;30-minute launch call&quot; beats &quot;happy
                  to help&quot;.
                </p>
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
                  <input name="school" required className="form-control" placeholder="Coppell HS" />
                </Field>
              </div>
              <Field label="Mentoring focus">
                <select name="focus" required className="form-control">
                  <option value="">Choose a focus</option>
                  <option>Shelter ops mentoring</option>
                  <option>Fundraising coaching</option>
                  <option>University club bridge</option>
                  <option>Design &amp; outreach kits</option>
                  <option>Launch planning</option>
                </select>
              </Field>
              <Field label="University / city (optional)">
                <input name="uni" className="form-control" placeholder="UT Austin · animal welfare org" />
              </Field>
              <button type="submit" className="button-primary">
                <HeartHandshake aria-hidden className="h-4 w-4" /> Add me to the mentor pack
              </button>
              <p className="text-xs font-semibold leading-5 text-muted">
                Saved to the shared mentor directory.
              </p>
            </form>
          </Panel>

          <Panel>
            <h2 className="font-display text-2xl font-black text-cocoa">Mentor directory</h2>
            <p className="mt-2 text-sm text-muted">
              Chapter presidents can request a short call or campus handoff.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {people.map((person) => {
                const requested = requests.includes(person.id);
                const available = person.status === "Available";
                return (
                  <li key={person.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-display text-xl font-black text-cocoa">{person.name}</p>
                        <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-rose">
                          Class of {person.year} · {person.school}
                        </p>
                      </div>
                      <StatusPill tone={requested ? "info" : available ? "good" : "warn"}>
                        {requested ? "Requested" : person.status}
                      </StatusPill>
                    </div>
                    <p className="mt-3 text-sm font-bold text-muted">{person.focus}</p>
                    <button
                      type="button"
                      className="button-paper mt-4 min-h-0 px-3 py-2 text-xs"
                      onClick={() => toggleRequest(person)}
                      disabled={!available && !requested}
                    >
                      {requested ? "Cancel request" : "Request mentor match"}
                    </button>
                  </li>
                );
              })}
            </ul>
            {!people.length ? (
              <p className="mt-4 rounded-2xl border border-dashed border-border bg-cream p-4 text-sm font-semibold text-muted">
                No mentors yet. Add the first one above.
              </p>
            ) : null}
            <p className="mt-5 text-xs font-semibold leading-5 text-muted">
              Requests are saved for the chapter and listed here. Nothing is emailed automatically.
            </p>
          </Panel>
        </div>
      </div>
    </div>
  );
}

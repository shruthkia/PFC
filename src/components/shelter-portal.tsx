"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ListChecks, Send } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import { chapters, shelterTasks as seedTasks, type ShelterTaskRecord } from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";

export function ShelterPortal() {
  const [tasks, setTasks] = useStoredState<ShelterTaskRecord[]>(storageKeys.tasks, seedTasks);
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const cities = useMemo(
    () => ["All", ...Array.from(new Set(tasks.map((item) => item.city)))],
    [tasks],
  );
  const visible = filter === "All" ? tasks : tasks.filter((item) => item.city === filter);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4600);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const city = String(data.get("city"));
    const shelter = String(data.get("shelter"));
    const title = String(data.get("title"));

    setTasks((current) => [
      {
        id:
          typeof crypto !== "undefined" && "randomUUID" in crypto
            ? `t${crypto.randomUUID().slice(0, 8)}`
            : `t${Date.now()}`,
        shelter,
        title,
        detail: String(data.get("detail")),
        effort: String(data.get("effort")),
        when: String(data.get("when")),
        city,
        urgent: data.get("urgent") === "on",
        category: String(data.get("category")),
      },
      ...current,
    ]);

    const nearby = chapters.filter(
      (chapter) =>
        city.toLowerCase().includes(chapter.city.toLowerCase()) ||
        city.toLowerCase().includes((chapter.region || "").toLowerCase()) ||
        city.includes(chapter.state),
    );

    flash(
      nearby.length
        ? `"${title}" is live on the board for ${nearby.length} nearby chapter${nearby.length === 1 ? "" : "s"}. Open the public board to see it as a student would.`
        : `"${title}" is live on the public board for any chapter to claim.`,
    );
    form.reset();
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Partner shelters</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">
              Shelter partner portal
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Post one small, completable job and a nearby high school chapter can claim it. Not animal
              listings, not rescue requests — just work that helps your team this week.
            </p>
          </div>
          <StatusPill tone="info">Shared task board</StatusPill>
        </div>

        {toast ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
          >
            <BadgeCheck aria-hidden className="h-5 w-5" /> {toast}
          </div>
        ) : null}

        <div className="mt-10 grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <Panel tone="blush">
            <div className="flex items-start gap-3">
              <ListChecks aria-hidden className="mt-1 h-6 w-6 text-rose" />
              <div>
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Post a mini-task</h2>
                <p className="mt-2 text-sm text-muted">
                  Be specific: what to do, how long it takes, how many students, and when you need it.
                </p>
              </div>
            </div>
            <form className="mt-6 space-y-4" onSubmit={submit}>
              <Field label="Shelter / rescue name">
                <input name="shelter" required className="form-control" placeholder="Austin Animal Center" />
              </Field>
              <Field label="Task title">
                <input name="title" required className="form-control" placeholder="Sort donation towels by size" />
              </Field>
              <Field label="What should students do?" hint="Concrete steps a chapter can finish in one sitting.">
                <textarea
                  name="detail"
                  required
                  rows={3}
                  className="form-control resize-y"
                  placeholder="Fold and bin clean towels into small / medium / large…"
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Effort">
                  <input name="effort" required className="form-control" placeholder="45 min · 2–4 students" />
                </Field>
                <Field label="Category">
                  <select name="category" required className="form-control">
                    <option>Supplies</option>
                    <option>Enrichment</option>
                    <option>Ops</option>
                    <option>Education</option>
                    <option>Outreach</option>
                  </select>
                </Field>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="When">
                  <input name="when" required className="form-control" placeholder="This week or Nov 15" />
                </Field>
                <Field label="City / region for matching">
                  <input name="city" required className="form-control" placeholder="Coppell / Plano" list="task-cities" />
                  <datalist id="task-cities">
                    {Array.from(new Set(seedTasks.map((item) => item.city))).map((city) => (
                      <option key={city} value={city} />
                    ))}
                  </datalist>
                </Field>
              </div>
              <label className="flex items-center gap-3 text-sm font-bold text-cocoa">
                <input name="urgent" type="checkbox" className="h-4 w-4 accent-[#a8385d]" />
                Mark as urgent (needed this week)
              </label>
              <button type="submit" className="button-primary">
                <Send aria-hidden className="h-4 w-4" /> Post task to chapters
              </button>
              <p className="text-xs font-semibold leading-5 text-muted">
                The task publishes to the shared board immediately for every chapter. Email alerts to chapter
                presidents are not wired yet, so tell your contact to check the board.
              </p>
            </form>
          </Panel>

          <Panel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Live task board</h2>
                <p className="mt-2 text-sm text-muted">
                  Students see this same list on the public task board. Claims update here immediately.
                </p>
              </div>
              <label className="text-sm font-black text-cocoa">
                Filter by area
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
              {visible.map((task) => (
                <li key={task.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <p className="font-display text-xl font-extrabold text-cocoa">{task.title}</p>
                      <p className="mt-1 text-sm text-muted">
                        {task.shelter} · {task.city}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted">{task.detail}</p>
                      <p className="mt-2 text-sm font-bold text-rose">{task.effort}</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-muted">
                        {task.category} · {task.when}
                      </p>
                    </div>
                    <StatusPill tone={task.claimedBy ? "info" : task.urgent ? "bad" : "neutral"}>
                      {task.claimedBy ? `Claimed · ${task.claimedBy}` : task.urgent ? "Urgent" : "Open"}
                    </StatusPill>
                  </div>
                </li>
              ))}
            </ul>
            {!visible.length ? (
              <p className="mt-4 text-sm font-bold text-muted">No tasks for that area yet.</p>
            ) : null}
            <Link
              href="/adopt"
              className="mt-6 inline-flex text-sm font-black text-rose underline decoration-2 underline-offset-4"
            >
              View the public task board
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}

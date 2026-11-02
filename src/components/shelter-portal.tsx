"use client";

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, ListChecks, Send } from "lucide-react";
import { Field, Panel, StatusPill } from "@/components/platform/ui";
import { chapters, shelterTasks as seedTasks } from "@/lib/platform-data";

type Task = Omit<(typeof seedTasks)[number], "status"> & {
  status: "Open" | "Claimed";
  claimedBy?: string;
};

export function ShelterPortal() {
  const [tasks, setTasks] = useState<Task[]>(seedTasks.map((task) => ({ ...task, status: "Open" as const })));
  const [toast, setToast] = useState<string | null>(null);
  const [filter, setFilter] = useState("All");

  const cities = useMemo(() => ["All", ...Array.from(new Set(tasks.map((item) => item.city)))], [tasks]);
  const visible = filter === "All" ? tasks : tasks.filter((item) => item.city === filter);

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4200);
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const city = String(data.get("city"));
    setTasks((current) => [
      {
        id: `t${Date.now()}`,
        shelter: String(data.get("shelter")),
        title: String(data.get("title")),
        detail: String(data.get("detail")),
        effort: String(data.get("effort")),
        when: String(data.get("when")),
        city,
        urgent: data.get("urgent") === "on",
        category: String(data.get("category")),
        status: "Open",
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
        ? `Mini-task posted to ${nearby.length} nearby chapter${nearby.length === 1 ? "" : "s"}.`
        : "Mini-task posted to the network board for chapter matching.",
    );
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
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">Shelter mini-task portal</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Post small, completable jobs for nearby chapters — sort supplies, sew scrap toys, assemble packets. Not animal listings.
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
              <ListChecks className="mt-1 h-6 w-6 text-rose" />
              <div>
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Post a mini-task</h2>
                <p className="mt-2 text-sm text-ink/65">One clear job, time estimate, and when you need it done.</p>
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
                <textarea name="detail" required rows={3} className="form-control resize-y" placeholder="Fold and bin clean towels into small / medium / large…" />
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
                <input name="urgent" type="checkbox" className="h-4 w-4 accent-[#c94d78]" />
                Mark as urgent (needed this week)
              </label>
              <button type="submit" className="button-primary">
                <Send className="h-4 w-4" /> Post task to chapters
              </button>
            </form>
          </Panel>

          <Panel>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 className="font-display text-2xl font-extrabold text-cocoa">Live mini-task board</h2>
                <p className="mt-2 text-sm text-ink/65">Chapters claim these inside their hub and on the public task board.</p>
              </div>
              <label className="text-sm font-black text-cocoa">
                Filter
                <select className="form-control mt-2 min-w-[180px]" value={filter} onChange={(event) => setFilter(event.target.value)}>
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
                      <p className="mt-1 text-sm text-cocoa/65">
                        {task.shelter} · {task.city}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-cocoa/75">{task.detail}</p>
                      <p className="mt-2 text-sm font-bold text-rose">{task.effort}</p>
                      <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-cocoa/45">
                        {task.category} · {task.when}
                      </p>
                    </div>
                    <StatusPill tone={task.status === "Claimed" ? "info" : task.urgent ? "bad" : "neutral"}>
                      {task.status === "Claimed" ? "Claimed" : task.urgent ? "Urgent" : "Open"}
                    </StatusPill>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/adopt" className="mt-6 inline-flex text-sm font-black text-rose underline decoration-2 underline-offset-4">
              View public task board
            </Link>
          </Panel>
        </div>
      </div>
    </div>
  );
}

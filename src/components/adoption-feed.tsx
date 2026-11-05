"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ListChecks, RotateCcw } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { type ShelterTaskRecord } from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";
import { useSessionUser } from "@/components/auth/use-session-user";

export function AdoptionFeed() {
  const [tasks, setTasks] = useStoredState<ShelterTaskRecord[]>(storageKeys.tasks, []);
  const user = useSessionUser();
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(tasks.map((task) => task.category)))],
    [tasks],
  );

  const visible = category === "All" ? tasks : tasks.filter((task) => task.category === category);
  const openCount = tasks.filter((task) => !task.claimedBy).length;

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4200);
  }

  function claim(id: string) {
    if (!user) return;
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, claimedBy: user.name, claimedAt: new Date().toLocaleDateString() }
          : task,
      ),
    );
    flash("Task claimed. It now shows as claimed for everyone on this board.");
  }

  function release(id: string) {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, claimedBy: undefined, claimedAt: undefined } : task)),
    );
    flash("Claim released. The task is open again.");
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Shelter partners → chapters</p>
            <h1 className="mt-4 font-display text-5xl font-extrabold tracking-tight text-cocoa">
              Shelter mini-task board
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Small jobs shelters need done: sort supplies, sew scrap toys, assemble packets. Not animal
              profiles or adoption listings.
            </p>
          </div>
          <StatusPill tone="good">{openCount} open</StatusPill>
        </div>

        {toast ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
          >
            <CheckCircle2 aria-hidden className="h-5 w-5" /> {toast}
          </div>
        ) : null}

        <section className="mt-8 rounded-[1.5rem] border-2 border-border bg-surface-strong p-5">
          <h2 className="font-display text-2xl font-extrabold text-cocoa">How claiming works</h2>
          <ol className="mt-3 grid gap-3 text-sm leading-6 text-muted sm:grid-cols-3">
            <li>
              <strong className="text-cocoa">1. Claim a task.</strong> It shows as claimed for everyone on
              this board.
            </li>
            <li>
              <strong className="text-cocoa">2. Do the work.</strong> Keep the shelter contact and any proof
              your advisor needs.
            </li>
            <li>
              <strong className="text-cocoa">3. Log it.</strong> Add the hours and proof in the chapter hub
              so it counts.
            </li>
          </ol>
        </section>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Filter mini-tasks by category">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              aria-pressed={category === option}
              onClick={() => setCategory(option)}
              className="tab-pill"
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((task) => {
            const claimedByUs = Boolean(user && task.claimedBy === user.name);
            const claimed = Boolean(task.claimedBy);
            return (
              <article key={task.id} className="sticker-card bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <span className="rounded-full border border-cocoa/30 bg-blush/60 px-3 py-1 text-[.65rem] font-black uppercase tracking-[.12em] text-cocoa">
                    {task.category}
                  </span>
                  <StatusPill tone={claimed ? "info" : task.urgent ? "bad" : "neutral"}>
                    {claimed ? "Claimed" : task.urgent ? "Urgent" : "Open"}
                  </StatusPill>
                </div>
                <h2 className="mt-4 font-display text-2xl font-extrabold text-cocoa">{task.title}</h2>
                <p className="mt-2 text-sm text-muted">
                  {task.shelter} · {task.city}
                </p>
                <p className="mt-3 text-sm leading-6 text-muted">{task.detail}</p>
                <p className="mt-4 text-sm font-bold text-rose">{task.effort}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-muted">{task.when}</p>
                {claimedByUs ? (
                  <div className="mt-5">
                    <p className="text-sm font-bold text-cocoa">
                      Claimed by you{task.claimedAt ? ` · ${task.claimedAt}` : ""}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Link href="/login" className="button-primary min-h-0 px-3 py-2 text-xs">
                        Open the chapter hub
                      </Link>
                      <button
                        type="button"
                        className="button-paper min-h-0 px-3 py-2 text-xs"
                        onClick={() => release(task.id)}
                      >
                        <RotateCcw aria-hidden className="h-3.5 w-3.5" /> Release
                      </button>
                    </div>
                  </div>
                ) : claimed ? (
                  <p className="mt-5 text-sm font-bold text-muted">Claimed by {task.claimedBy}</p>
                ) : user ? (
                  <button
                    type="button"
                    className="button-primary mt-5 min-h-0 px-4 py-2 text-xs"
                    onClick={() => claim(task.id)}
                  >
                    <ListChecks aria-hidden className="h-3.5 w-3.5" /> Claim this task
                  </button>
                ) : (
                  <Link href="/login" className="button-primary mt-5 min-h-0 px-4 py-2 text-xs">
                    Sign in to claim
                  </Link>
                )}
              </article>
            );
          })}
        </div>

        {!visible.length ? (
          <p className="mt-8 rounded-2xl border border-dashed border-border bg-surface-strong p-5 text-sm font-semibold text-muted">
            {tasks.length
              ? "No tasks in this category yet. Switch the filter or check the shelter portal."
              : "No tasks yet. Shelter partners post them from the shelter portal."}
          </p>
        ) : null}

        <Panel tone="butter" className="mt-10">
          <h2 className="font-display text-2xl font-extrabold text-cocoa">For shelter partners</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">
            Need a job done? Sign in to the{" "}
            <Link href="/login" className="font-black text-rose underline decoration-2 underline-offset-4">
              shelter portal
            </Link>{" "}
            to post a task. Keep it specific enough to finish in one meeting or afternoon, and say what a
            chapter should bring.
          </p>
          <p className="mt-3 text-sm font-semibold text-muted">
            Claims are saved on this board and reserved for the account that claimed them.
          </p>
        </Panel>
      </div>
    </div>
  );
}

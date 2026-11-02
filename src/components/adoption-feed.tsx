"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ListChecks } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { shelterTasks as seedTasks } from "@/lib/platform-data";

type BoardTask = (typeof seedTasks)[number] & { claimedBy?: string };

export function AdoptionFeed() {
  const [tasks, setTasks] = useState<BoardTask[]>(seedTasks);
  const [category, setCategory] = useState("All");
  const [toast, setToast] = useState<string | null>(null);

  const categories = useMemo(
    () => ["All", ...Array.from(new Set(seedTasks.map((task) => task.category)))],
    [],
  );

  const visible = category === "All" ? tasks : tasks.filter((task) => task.category === category);

  function claim(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, status: "Open", claimedBy: "Coppell Paws" } : task,
      ),
    );
    setToast("Task claimed for Coppell Paws. Finish it, then log proof in the chapter hub.");
    window.setTimeout(() => setToast(null), 4200);
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Shelter partners → chapters</p>
            <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">Shelter mini-task board</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              These are completable jobs shelters ask for: sew scrap toys, sort supplies, assemble packets. Not animal profiles.
            </p>
          </div>
          <StatusPill tone="good">Claim · finish · log</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <CheckCircle2 className="h-5 w-5" /> {toast}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by category">
          {categories.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={category === option}
              onClick={() => setCategory(option)}
              className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-black ${
                category === option ? "bg-rose text-white shadow-[3px_3px_0_#6e493b]" : "bg-white text-cocoa"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((task) => {
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
                <p className="mt-2 text-sm text-cocoa/60">
                  {task.shelter} · {task.city}
                </p>
                <p className="mt-3 text-sm leading-6 text-cocoa/75">{task.detail}</p>
                <p className="mt-4 text-sm font-bold text-rose">{task.effort}</p>
                <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-cocoa/45">{task.when}</p>
                {claimed ? (
                  <p className="mt-5 text-sm font-bold text-cocoa/65">Claimed by {task.claimedBy}</p>
                ) : (
                  <button type="button" className="button-primary mt-5 min-h-0 px-4 py-2 text-xs" onClick={() => claim(task.id)}>
                    <ListChecks className="h-3.5 w-3.5" /> Claim for my chapter
                  </button>
                )}
              </article>
            );
          })}
        </div>

        <Panel tone="butter" className="mt-10">
          <h2 className="font-display text-2xl font-extrabold text-cocoa">For shelter partners</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/65">
            Need a job done? Post it from the{" "}
            <Link href="/shelter" className="font-black text-rose underline decoration-2 underline-offset-4">
              shelter mini-task portal
            </Link>
            . Keep it specific so a chapter can finish it in one meeting or afternoon.
          </p>
        </Panel>
      </div>
    </div>
  );
}

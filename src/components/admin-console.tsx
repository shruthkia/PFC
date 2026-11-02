"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, Megaphone, ShieldAlert } from "lucide-react";
import { Field, Panel, ProgressBar, StatusPill } from "@/components/platform/ui";
import {
  activeHealth,
  announcements,
  cmsPages,
  pendingClaims,
  socialQueue,
} from "@/lib/platform-data";

type AdminTab = "Claims" | "Active standard" | "CMS" | "Impact reports" | "Social spotlight";

export function AdminConsole() {
  const [tab, setTab] = useState<AdminTab>("Claims");
  const [claims, setClaims] = useState(pendingClaims);
  const [posts, setPosts] = useState(announcements);
  const [social, setSocial] = useState(socialQueue);
  const [toast, setToast] = useState<string | null>(null);
  const [cmsDraft, setCmsDraft] = useState("People still do not understand sterilization and responsible adoption. That is the PFC-wide thread.");

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4000);
  }

  function decide(id: string, status: "approved" | "rejected") {
    setClaims((current) => current.map((claim) => (claim.id === id ? { ...claim, status } : claim)));
    flash(status === "approved" ? "Claim approved and queued for public totals." : "Claim rejected with note to chapter.");
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Network management</p>
            <h1 className="mt-4 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">National admin desk</h1>
            <p className="mt-3 max-w-2xl text-ink/65">Claim review, Active Standard health, public CMS, impact PDFs, and social spotlight queue.</p>
          </div>
          <StatusPill tone="warn">Organizer preview</StatusPill>
        </div>

        {toast && (
          <div role="status" className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]">
            <BadgeCheck className="h-5 w-5" /> {toast}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Admin tools">
          {(["Claims", "Active standard", "CMS", "Impact reports", "Social spotlight"] as AdminTab[]).map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={tab === item}
              onClick={() => setTab(item)}
              className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-black ${tab === item ? "bg-rose text-white shadow-[3px_3px_0_#6e493b]" : "bg-white text-cocoa"}`}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Claims" && (
            <Panel>
              <h2 className="font-display text-3xl font-black text-cocoa">Claim review dashboard</h2>
              <p className="mt-2 text-sm text-ink/65">Approve or reject chapter logs before they go public.</p>
              <ul className="mt-6 space-y-3">
                {claims.map((claim) => (
                  <li key={claim.id} className="rounded-2xl border-2 border-cocoa bg-cream p-4 sm:flex sm:items-center sm:justify-between sm:gap-4">
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{claim.chapter} · {claim.student}</p>
                      <p className="mt-1 text-sm text-cocoa/65">{claim.type}: {claim.summary}</p>
                      <p className="mt-2 text-xs font-bold text-cocoa/45">Submitted {claim.submitted}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
                      <StatusPill tone={claim.status === "approved" ? "good" : claim.status === "rejected" ? "bad" : claim.status === "needs_info" ? "warn" : "info"}>{claim.status.replace("_", " ")}</StatusPill>
                      {claim.status === "pending" || claim.status === "needs_info" ? (
                        <>
                          <button type="button" className="button-primary min-h-0 px-3 py-2 text-xs" onClick={() => decide(claim.id, "approved")}>Approve</button>
                          <button type="button" className="button-paper min-h-0 px-3 py-2 text-xs" onClick={() => decide(claim.id, "rejected")}>Reject</button>
                        </>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {tab === "Active standard" && (
            <Panel tone="butter">
              <div className="flex items-start gap-3">
                <ShieldAlert className="mt-1 h-6 w-6 text-cocoa" />
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Active Standard monitor</h2>
                  <p className="mt-2 text-sm text-ink/65">Flags chapters behind on activity, check-ins, or role updates.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {activeHealth.map((row) => (
                  <li key={row.chapter} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-display text-xl font-black text-cocoa">{row.chapter}</p>
                      <StatusPill tone={row.risk === "high" ? "bad" : row.risk === "medium" ? "warn" : "good"}>{row.pulse}</StatusPill>
                    </div>
                    <p className="mt-2 text-sm text-cocoa/65">{row.note}</p>
                  </li>
                ))}
              </ul>
            </Panel>
          )}

          {tab === "CMS" && (
            <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
              <Panel tone="lilac">
                <h2 className="font-display text-2xl font-black text-cocoa">Public CMS pages</h2>
                <ul className="mt-5 space-y-3">
                  {cmsPages.map((page) => (
                    <li key={page.slug} className="rounded-xl border border-cocoa/30 bg-white p-3">
                      <p className="font-bold text-cocoa">{page.label}</p>
                      <p className="text-xs font-black uppercase tracking-[.12em] text-cocoa/45">Updated {page.updated}</p>
                    </li>
                  ))}
                </ul>
              </Panel>
              <Panel>
                <h2 className="font-display text-2xl font-black text-cocoa">Edit public copy</h2>
                <p className="mt-2 text-sm text-ink/65">Network admins update announcements and rules without a redeploy.</p>
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const data = new FormData(event.currentTarget);
                    setPosts((current) => [
                      {
                        id: `n${Date.now()}`,
                        title: String(data.get("title")),
                        body: String(data.get("body")),
                        date: "2026-11-01",
                        audience: String(data.get("audience")),
                      },
                      ...current,
                    ]);
                    flash("Announcement published to the public feed.");
                    event.currentTarget.reset();
                  }}
                >
                  <Field label="Announcement title"><input name="title" required className="form-control" /></Field>
                  <Field label="Audience">
                    <select name="audience" className="form-control"><option>All chapters</option><option>Advisors</option><option>Presidents</option></select>
                  </Field>
                  <Field label="Body"><textarea name="body" required rows={4} className="form-control resize-y" /></Field>
                  <button type="submit" className="button-primary">Publish announcement</button>
                </form>
                <div className="mt-8 border-t border-cocoa/15 pt-6">
                  <Field label="Homepage campaign copy">
                    <textarea className="form-control min-h-28 resize-y" value={cmsDraft} onChange={(event) => setCmsDraft(event.target.value)} />
                  </Field>
                  <button type="button" className="button-paper mt-3" onClick={() => flash("Homepage copy saved.")}>Save copy</button>
                </div>
                <div className="mt-8">
                  <h3 className="font-display text-xl font-black text-cocoa">Live announcements</h3>
                  <ul className="mt-4 space-y-3">
                    {posts.map((post) => (
                      <li key={post.id} className="rounded-xl border border-cocoa/20 bg-cream p-4">
                        <p className="font-bold text-cocoa">{post.title}</p>
                        <p className="mt-1 text-sm text-cocoa/65">{post.body}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </div>
          )}

          {tab === "Impact reports" && (
            <Panel tone="mint">
              <h2 className="font-display text-3xl font-black text-cocoa">Automated impact reports</h2>
              <p className="mt-2 text-sm text-ink/65">Bundle semester stats into polished PDF summaries for shelters and school boards.</p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <form
                  className="space-y-4 rounded-2xl border-2 border-cocoa bg-white p-5"
                  onSubmit={(event) => {
                    event.preventDefault();
                    flash("Impact PDF packaged and ready to download (demo).");
                  }}
                >
                  <Field label="Report audience">
                    <select className="form-control"><option>School board</option><option>Shelter partner</option><option>Grant packet</option></select>
                  </Field>
                  <Field label="Semester"><select className="form-control"><option>Fall 2026</option><option>Spring 2026</option></select></Field>
                  <Field label="Include chapters">
                    <select className="form-control"><option>All active chapters</option><option>DFW only</option><option>Coppell Paws only</option></select>
                  </Field>
                  <ProgressBar value={100} label="Stats ready to package" />
                  <button type="submit" className="button-primary">Generate impact PDF</button>
                </form>
                <div className="rounded-2xl border-2 border-dashed border-cocoa bg-white/70 p-6">
                  <p className="font-hand text-2xl font-bold text-rose">Fall 2026 snapshot</p>
                  <ul className="mt-4 space-y-2 text-sm font-bold text-cocoa">
                    <li>85+ enrichment toys donated (~$1,550 value)</li>
                    <li>$400 raised so far</li>
                    <li>Fashion scrap-to-toy workshops active</li>
                    <li>11 chapter branches across 3 countries</li>
                  </ul>
                </div>
              </div>
            </Panel>
          )}

          {tab === "Social spotlight" && (
            <Panel tone="blush">
              <div className="flex items-start gap-3">
                <Megaphone className="mt-1 h-6 w-6 text-rose" />
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Social media spotlight hook</h2>
                  <p className="mt-2 text-sm text-ink/65">When a top-tier project claim is approved, queue an image and caption for social.</p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {social.map((item) => (
                  <li key={item.id} className="rounded-2xl border-2 border-cocoa bg-white p-4 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{item.project}</p>
                      <p className="mt-1 max-w-xl text-sm text-cocoa/65">{item.caption}</p>
                    </div>
                    <div className="mt-3 flex gap-2 sm:mt-0">
                      <StatusPill tone={item.status === "Queued" ? "info" : "neutral"}>{item.status}</StatusPill>
                      <button
                        type="button"
                        className="button-paper min-h-0 px-3 py-2 text-xs"
                        onClick={() => {
                          setSocial((current) => current.map((row) => (row.id === item.id ? { ...row, status: "Queued" } : row)));
                          flash("Caption queued for scheduling.");
                        }}
                      >
                        Queue
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </Panel>
          )}
        </div>
      </div>
    </div>
  );
}

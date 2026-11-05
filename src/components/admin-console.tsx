"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, BadgeCheck, FileText, Megaphone, ShieldAlert } from "lucide-react";
import { Field, Panel, ProgressBar, StatusPill } from "@/components/platform/ui";
import {
  cmsPages,
  type AnnouncementRecord,
  type ApplicationRecord,
  type ClaimRecord,
  type PublicNetwork,
  type SocialPostRecord,
} from "@/lib/platform-data";
import { storageKeys, useStoredState } from "@/lib/storage";
import { CHAPTER_FORM_URL } from "@/lib/utils";

type AdminTab = "Claims" | "Applications" | "Active standard" | "CMS" | "Impact reports" | "Social spotlight";

const tabs: AdminTab[] = [
  "Claims",
  "Applications",
  "Active standard",
  "CMS",
  "Impact reports",
  "Social spotlight",
];

export function AdminConsole({ network }: { network: PublicNetwork }) {
  const [tab, setTab] = useState<AdminTab>("Claims");
  const [claims, setClaims] = useStoredState<ClaimRecord[]>(storageKeys.claims, []);
  const [applications, setApplications] = useStoredState<ApplicationRecord[]>(storageKeys.applications, []);
  const [posts, setPosts] = useStoredState<AnnouncementRecord[]>(storageKeys.announcements, []);
  const [social, setSocial] = useStoredState<SocialPostRecord[]>(storageKeys.social, []);
  const [cmsDraft, setCmsDraft] = useStoredState(
    storageKeys.cmsDraft,
    "People still do not understand sterilization and responsible adoption. That is the PFC-wide thread.",
  );
  const [toast, setToast] = useState<string | null>(null);

  const openClaims = claims.filter((claim) => claim.status === "pending" || claim.status === "needs_info");
  const newApplications = applications.filter((app) => app.status === "Received");
  const countries = Array.from(new Set(network.records.map((record) => record.country))).join(", ");

  function flash(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(null), 4200);
  }

  function decide(id: string, status: "approved" | "rejected") {
    setClaims((current) => current.map((claim) => (claim.id === id ? { ...claim, status } : claim)));
    flash(
      status === "approved"
        ? "Approved. The chapter's fund or project row now shows Verified."
        : "Rejected. The chapter's row shows Rejected and can be resubmitted with better proof.",
    );
  }

  function reviewApplication(id: string) {
    setApplications((current) =>
      current.map((app) => (app.id === id ? { ...app, status: "Reviewed" } : app)),
    );
    flash("Application marked reviewed.");
  }

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-muted hover:text-rose">
          <ArrowLeft aria-hidden className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Network management</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">
              National admin desk
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              What HQ does: read applications, approve claims, watch chapter health, publish announcements,
              and export the impact report.
            </p>
          </div>
          <StatusPill tone="good">National workspace</StatusPill>
        </div>

        {toast ? (
          <div
            role="status"
            className="mt-6 flex items-center gap-3 rounded-2xl border-2 border-[#4d7357] bg-mint p-4 font-bold text-[#31513a]"
          >
            <BadgeCheck aria-hidden className="h-5 w-5" /> {toast}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Admin tool views">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className="tab-pill"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="mt-8">
          {tab === "Claims" ? (
            <Panel>
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Claim review</h2>
                  <p className="mt-2 text-sm text-muted">
                    Chapter submissions land here before public totals move. Approving unlocks certificates
                    and impact counts.
                  </p>
                </div>
                <StatusPill tone={openClaims.length ? "warn" : "good"}>
                  {openClaims.length} waiting
                </StatusPill>
              </div>
              <ul className="mt-6 space-y-3">
                {claims.map((claim) => (
                  <li
                    key={claim.id}
                    className="rounded-2xl border-2 border-cocoa bg-cream p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">
                        {claim.chapter} · {claim.student}
                      </p>
                      <p className="mt-1 text-sm text-muted">
                        {claim.type}: {claim.summary}
                      </p>
                      <p className="mt-2 text-xs font-bold text-muted">Submitted {claim.submitted}</p>
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-2 sm:mt-0">
                      <StatusPill
                        tone={
                          claim.status === "approved"
                            ? "good"
                            : claim.status === "rejected"
                              ? "bad"
                              : claim.status === "needs_info"
                                ? "warn"
                                : "info"
                        }
                      >
                        {claim.status.replace("_", " ")}
                      </StatusPill>
                      {claim.status === "pending" || claim.status === "needs_info" ? (
                        <>
                          <button
                            type="button"
                            className="button-primary min-h-0 px-3 py-2 text-xs"
                            onClick={() => decide(claim.id, "approved")}
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            className="button-paper min-h-0 px-3 py-2 text-xs"
                            onClick={() => decide(claim.id, "rejected")}
                          >
                            Reject
                          </button>
                        </>
                      ) : null}
                    </div>
                  </li>
                ))}
              </ul>
              {!claims.length ? (
                <p className="mt-4 rounded-2xl border border-dashed border-border bg-white p-4 text-sm font-semibold text-muted">
                  No claims yet. Log hours, funds, or a project in the{" "}
                  <Link href="/portal" className="text-rose underline decoration-2 underline-offset-4">
                    chapter hub
                  </Link>{" "}
                  and they appear here.
                </p>
              ) : null}
            </Panel>
          ) : null}

          {tab === "Applications" ? (
            <Panel tone="lilac">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Chapter applications</h2>
                  <p className="mt-2 text-sm text-muted">
                    New applications are collected in the approved Google Form. This queue only
                    keeps submissions created before the form moved.
                  </p>
                </div>
                <StatusPill tone={newApplications.length ? "info" : "neutral"}>
                  {newApplications.length} new
                </StatusPill>
              </div>
              {applications.length ? (
                <ul className="mt-6 space-y-3">
                  {applications.map((app) => (
                    <li key={app.id} className="rounded-2xl border-2 border-cocoa bg-white p-4">
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <p className="font-display text-xl font-black text-cocoa">
                            {app.school} · {app.city}, {app.region}
                          </p>
                          <p className="mt-1 text-sm text-muted">
                            {app.name} · {app.email} · grade {app.grade}
                          </p>
                          <p className="mt-1 text-xs font-black uppercase tracking-[.12em] text-muted">
                            {app.reference} · {new Date(app.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <StatusPill tone={app.status === "Reviewed" ? "good" : "info"}>{app.status}</StatusPill>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-muted">{app.why}</p>
                      <p className="mt-2 text-sm leading-6 text-cocoa">
                        <strong>Community need:</strong> {app.need}
                      </p>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        <a
                          href={`mailto:${app.email}?subject=${encodeURIComponent(`Your PFC application ${app.reference}`)}`}
                          className="button-paper min-h-0 px-3 py-2 text-xs"
                        >
                          Email applicant
                        </a>
                        {app.status === "Received" ? (
                          <button
                            type="button"
                            className="button-primary min-h-0 px-3 py-2 text-xs"
                            onClick={() => reviewApplication(app.id)}
                          >
                            Mark reviewed
                          </button>
                        ) : null}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-6 rounded-2xl border border-dashed border-border bg-white p-5 text-sm font-semibold leading-6 text-muted">
                  No submissions. Open the{" "}
                  <a
                    href={CHAPTER_FORM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-rose underline decoration-2 underline-offset-4"
                  >
                    approved chapter application form
                  </a>{" "}
                  to apply.
                </p>
              )}
            </Panel>
          ) : null}

          {tab === "Active standard" ? (
            <Panel tone="butter">
              <div className="flex items-start gap-3">
                <ShieldAlert aria-hidden className="mt-1 h-6 w-6 text-cocoa" />
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Active Standard monitor</h2>
                  <p className="mt-2 text-sm text-muted">
                    Flags chapters behind on activity, check-ins, or role updates. A quiet chapter is paused
                    honestly rather than counted as active.
                  </p>
                </div>
              </div>
              <p className="mt-6 rounded-2xl border border-dashed border-border bg-white p-4 text-sm font-semibold text-muted">
                No chapter check-ins yet. Health notes appear here when a chapter files one.
              </p>
            </Panel>
          ) : null}

          {tab === "CMS" ? (
            <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
              <Panel tone="lilac">
                <h2 className="font-display text-2xl font-black text-cocoa">Public pages</h2>
                <ul className="mt-5 space-y-3">
                  {cmsPages.map((page) => (
                    <li key={page.slug} className="rounded-xl border border-cocoa/30 bg-white p-3">
                      <p className="font-bold text-cocoa">{page.label}</p>
                      <p className="text-xs font-black uppercase tracking-[.12em] text-muted">
                        Updated {page.updated}
                      </p>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs font-semibold leading-5 text-muted">
                  Page copy itself lives in the codebase and ships with a deploy. Announcements below are the
                  part this desk controls directly.
                </p>
              </Panel>
              <Panel>
                <h2 className="font-display text-2xl font-black text-cocoa">Announcements</h2>
                <p className="mt-2 text-sm text-muted">
                  Publishing adds the post to the public announcements list on the impact board, from this
                  browser.
                </p>
                <form
                  className="mt-5 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    const form = event.currentTarget;
                    const data = new FormData(form);
                    setPosts((current) => [
                      {
                        id:
                          typeof crypto !== "undefined" && "randomUUID" in crypto
                            ? `n${crypto.randomUUID().slice(0, 8)}`
                            : `n${Date.now()}`,
                        title: String(data.get("title")),
                        body: String(data.get("body")),
                        date: new Date().toISOString().slice(0, 10),
                        audience: String(data.get("audience")),
                      },
                      ...current,
                    ]);
                    flash("Announcement published. It is live on the public impact board.");
                    form.reset();
                  }}
                >
                  <Field label="Announcement title">
                    <input name="title" required className="form-control" />
                  </Field>
                  <Field label="Audience">
                    <select name="audience" className="form-control">
                      <option>All chapters</option>
                      <option>Advisors</option>
                      <option>Presidents</option>
                      <option>Shelter partners</option>
                    </select>
                  </Field>
                  <Field label="Body">
                    <textarea name="body" required rows={4} className="form-control resize-y" />
                  </Field>
                  <button type="submit" className="button-primary">
                    Publish announcement
                  </button>
                </form>

                <div className="mt-8 border-t border-border pt-6">
                  <Field
                    label="Homepage campaign copy"
                    hint="Saved here as a working draft; the public homepage changes after a deploy."
                  >
                    <textarea
                      className="form-control min-h-28 resize-y"
                      value={cmsDraft}
                      onChange={(event) => setCmsDraft(event.target.value)}
                    />
                  </Field>
                  <button
                    type="button"
                    className="button-paper mt-3"
                    onClick={() => flash("Draft saved. It is not published.")}
                  >
                    Save draft
                  </button>
                </div>

                <h3 className="mt-8 font-display text-xl font-black text-cocoa">Published announcements</h3>
                <ul className="mt-4 space-y-3">
                  {posts.map((post) => (
                    <li key={post.id} className="rounded-xl border border-border bg-cream p-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="font-bold text-cocoa">{post.title}</p>
                        <StatusPill tone="neutral">{post.audience}</StatusPill>
                      </div>
                      <p className="mt-1 text-sm text-muted">{post.body}</p>
                      <p className="mt-2 text-xs font-bold text-muted">{post.date}</p>
                    </li>
                  ))}
                  {!posts.length ? (
                    <li className="rounded-xl border border-dashed border-border bg-cream p-4 text-sm font-semibold text-muted">
                      No announcements yet.
                    </li>
                  ) : null}
                </ul>
              </Panel>
            </div>
          ) : null}

          {tab === "Impact reports" ? (
            <Panel tone="mint">
              <h2 className="font-display text-3xl font-black text-cocoa">Impact reports</h2>
              <p className="mt-2 max-w-2xl text-sm text-muted">
                Build a one-page report for a school board, shelter partner, or grant packet. It opens as a
                clean printable page, so &quot;Save as PDF&quot; in the print dialog gives you a real file.
              </p>
              <div className="mt-6 grid gap-4 lg:grid-cols-2">
                <form action="/impact/report" method="get" className="space-y-4 rounded-2xl border-2 border-cocoa bg-white p-5">
                  <Field label="Report audience">
                    <select name="audience" className="form-control">
                      <option>School board</option>
                      <option>Shelter partner</option>
                      <option>Grant packet</option>
                    </select>
                  </Field>
                  <Field label="Semester">
                    <select name="semester" className="form-control">
                      <option>Fall 2026</option>
                      <option>Spring 2026</option>
                    </select>
                  </Field>
                  <Field label="Chapters">
                    <select name="scope" className="form-control">
                      <option>All active chapters</option>
                      <option>DFW only</option>
                      <option>Coppell Paws only</option>
                    </select>
                  </Field>
                  <ProgressBar value={100} label="Stats ready to package" />
                  <button type="submit" className="button-primary">
                    <FileText aria-hidden className="h-4 w-4" /> Open printable report
                  </button>
                </form>
                <div className="rounded-2xl border-2 border-dashed border-cocoa bg-white/70 p-6">
                  <p className="font-hand text-2xl font-bold text-rose">Fall 2026 snapshot</p>
                  <ul className="mt-4 space-y-2 text-sm font-bold text-cocoa">
                    <li>{network.totals.toysMade} enrichment toys from approved projects</li>
                    <li>${network.totals.fundsRaised} raised across {network.totals.chapters} chapters</li>
                    <li>{network.totals.countries} countries: {countries}</li>
                    <li>{network.totals.verifiedHours} verified hours from advisor-signed logs</li>
                  </ul>
                  <Link
                    href="/impact"
                    className="mt-5 inline-flex text-sm font-black text-rose underline decoration-2 underline-offset-4"
                  >
                    View public impact board
                  </Link>
                </div>
              </div>
            </Panel>
          ) : null}

          {tab === "Social spotlight" ? (
            <Panel tone="blush">
              <div className="flex items-start gap-3">
                <Megaphone aria-hidden className="mt-1 h-6 w-6 text-rose" />
                <div>
                  <h2 className="font-display text-3xl font-black text-cocoa">Social spotlight</h2>
                  <p className="mt-2 text-sm text-muted">
                    Approved project claims can become a short caption. Queue one here; scheduling still
                    happens in the social tool, not this workspace.
                  </p>
                </div>
              </div>
              <ul className="mt-6 space-y-3">
                {social.map((item) => (
                  <li
                    key={item.id}
                    className="rounded-2xl border-2 border-cocoa bg-white p-4 sm:flex sm:items-center sm:justify-between sm:gap-4"
                  >
                    <div>
                      <p className="font-display text-lg font-black text-cocoa">{item.project}</p>
                      <p className="mt-1 max-w-xl text-sm text-muted">{item.caption}</p>
                    </div>
                    <div className="mt-3 flex shrink-0 items-center gap-2 sm:mt-0">
                      <StatusPill tone={item.status === "Queued" ? "info" : "neutral"}>{item.status}</StatusPill>
                      <button
                        type="button"
                        className="button-paper min-h-0 px-3 py-2 text-xs"
                        onClick={() => {
                          const nextStatus = item.status === "Queued" ? "Draft" : "Queued";
                          setSocial((current) =>
                            current.map((row) =>
                              row.id === item.id ? { ...row, status: nextStatus } : row,
                            ),
                          );
                          flash(
                            nextStatus === "Queued"
                              ? "Caption queued for scheduling."
                              : "Caption moved back to draft.",
                          );
                        }}
                      >
                        {item.status === "Queued" ? "Unqueue" : "Queue"}
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {!social.length ? (
                <p className="mt-4 rounded-2xl border border-dashed border-border bg-cream p-4 text-sm font-semibold text-muted">
                  No captions in the queue yet.
                </p>
              ) : null}
            </Panel>
          ) : null}
        </div>
      </div>
    </div>
  );
}

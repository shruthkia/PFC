import { cache } from "react";
import { db } from "@/lib/auth/db";
import { confirmedChapterWork } from "@/lib/confirmed-work";
import {
  chapters,
  type AnnouncementRecord,
  type ClaimStatus,
  type PublicNetwork,
  type PublicRecord,
  type ShelterTaskRecord,
} from "@/lib/platform-data";
import { stateKeys } from "@/lib/state-keys";

type WorkspaceRow = {
  chapter_id: string;
  key: string;
  value: string;
  updated_at: string;
};

type MemberRow = {
  chapter_id: string;
  count: number;
};

type StoredHour = {
  hours?: number;
  status?: string;
};

type StoredFund = {
  amount?: number;
  status?: string;
  claimId?: string;
};

type StoredProject = {
  toys?: number;
  status?: string;
  claimId?: string;
};

type StoredClaim = {
  id?: string;
  status?: ClaimStatus;
};

function parseArray<T>(value: string | undefined): T[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function findClaim(claims: StoredClaim[], claimId?: string) {
  if (!claimId) return undefined;
  return claims.find((claim) => claim.id === claimId);
}

function buildRecord(
  chapter: (typeof chapters)[number],
  state: Map<string, string>,
  memberCount: number,
  updatedAt: string | null,
): PublicRecord {
  const confirmed = confirmedChapterWork[chapter.id];
  const hours = parseArray<StoredHour>(state.get(stateKeys.hours));
  const loggedHours = hours.reduce((total, row) => total + Math.max(0, Number(row.hours) || 0), 0);
  const verifiedHours = hours
    .filter((row) => row.status === "Verified")
    .reduce((total, row) => total + Math.max(0, Number(row.hours) || 0), 0);

  const claims = parseArray<StoredClaim>(state.get(stateKeys.claims));
  const funds = parseArray<StoredFund>(state.get(stateKeys.funds));
  let fundsRaised = 0;
  let pendingFunds = 0;

  for (const row of funds) {
    const amount = Math.max(0, Number(row.amount) || 0);
    const claim = findClaim(claims, row.claimId);
    const status = claim?.status
      ? claim.status === "approved"
        ? "Verified"
        : claim.status === "rejected"
          ? "Rejected"
          : "Pending HQ"
      : row.status;

    if (status === "Verified") fundsRaised += amount;
    else if (status !== "Rejected") pendingFunds += amount;
  }

  const projects = parseArray<StoredProject>(state.get(stateKeys.projects));
  let projectsApproved = 0;
  let toysMade = 0;

  for (const project of projects) {
    const claim = findClaim(claims, project.claimId);
    const status = claim?.status
      ? claim.status === "approved"
        ? "Approved"
        : claim.status === "rejected"
          ? "Rejected"
          : "Pending review"
      : project.status;

    if (status === "Approved") {
      projectsApproved += 1;
      toysMade += Math.max(0, Math.floor(Number(project.toys) || 0));
    }
  }

  const tasks = parseArray<ShelterTaskRecord>(state.get(stateKeys.tasks));
  const announcements = parseArray<AnnouncementRecord>(state.get(stateKeys.announcements));

  return {
    chapterId: chapter.id,
    chapterName: chapter.name,
    city: chapter.city,
    region: chapter.region,
    country: chapter.country,
    status: chapter.status,
    loggedHours,
    verifiedHours,
    pendingHours: Math.max(0, loggedHours - verifiedHours),
    fundsRaised: fundsRaised + (confirmed?.fundsRaised ?? 0),
    pendingFunds,
    projectsDocumented: projects.length + (confirmed?.projectsApproved ?? 0),
    projectsApproved: projectsApproved + (confirmed?.projectsApproved ?? 0),
    toysMade: toysMade + (confirmed?.toysMade ?? 0),
    toyValue: confirmed?.toyValue ?? 0,
    confirmedNote: confirmed?.note ?? null,
    members: memberCount,
    openTasks: tasks.filter((task) => !task.claimedBy).length,
    tasks,
    announcements,
    updatedAt,
  };
}

let databaseFallbackLogged = false;

function readPortalRows(): { stateRows: WorkspaceRow[]; memberRows: MemberRow[] } {
  try {
    const stateRows = db
      .prepare("SELECT chapter_id, key, value, updated_at FROM workspace_state")
      .all() as unknown as WorkspaceRow[];
    const memberRows = db
      .prepare("SELECT chapter_id, COUNT(*) AS count FROM users WHERE role = 'student' GROUP BY chapter_id")
      .all() as unknown as MemberRow[];
    return { stateRows, memberRows };
  } catch (error) {
    // Public impact must stay available when the portal database is unreachable,
    // including on serverless hosts where the filesystem is read-only.
    if (!databaseFallbackLogged) {
      console.error(
        "[public-record] Portal database unavailable; serving confirmed chapter work only.",
        error,
      );
      databaseFallbackLogged = true;
    }
    return { stateRows: [], memberRows: [] };
  }
}

export const getPublicNetwork = cache(async (): Promise<PublicNetwork> => {
  const { stateRows, memberRows } = readPortalRows();

  const memberCounts = new Map(memberRows.map((row) => [row.chapter_id, Number(row.count)]));
  const stateByChapter = new Map<string, Map<string, string>>();
  const updatedByChapter = new Map<string, string>();

  for (const row of stateRows) {
    const state = stateByChapter.get(row.chapter_id) ?? new Map<string, string>();
    state.set(row.key, row.value);
    stateByChapter.set(row.chapter_id, state);

    const previous = updatedByChapter.get(row.chapter_id);
    if (!previous || row.updated_at > previous) {
      updatedByChapter.set(row.chapter_id, row.updated_at);
    }
  }

  const records = chapters.map((chapter) =>
    buildRecord(
      chapter,
      stateByChapter.get(chapter.id) ?? new Map<string, string>(),
      memberCounts.get(chapter.id) ?? 0,
      updatedByChapter.get(chapter.id) ?? null,
    ),
  );

  const primary = records.find((record) => record.chapterId === "coppell") ?? records[0];
  const countries = new Set(records.map((record) => record.country));
  const updatedAt =
    records
      .map((record) => record.updatedAt)
      .filter((value): value is string => Boolean(value))
      .sort()
      .at(-1) ?? null;

  return {
    records,
    totals: {
      chapters: records.length,
      countries: countries.size,
      verifiedHours: records.reduce((total, record) => total + record.verifiedHours, 0),
      fundsRaised: records.reduce((total, record) => total + record.fundsRaised, 0),
      projectsApproved: records.reduce((total, record) => total + record.projectsApproved, 0),
      toysMade: records.reduce((total, record) => total + record.toysMade, 0),
      toyValue: records.reduce((total, record) => total + record.toyValue, 0),
      members: records.reduce((total, record) => total + record.members, 0),
      openTasks: records.reduce((total, record) => total + record.openTasks, 0),
    },
    announcements: primary?.announcements ?? [],
    tasks: primary?.tasks ?? [],
    updatedAt,
  };
});

export const getPublicRecord = cache(async (chapterId: string) => {
  const network = await getPublicNetwork();
  return network.records.find((record) => record.chapterId === chapterId) ?? null;
});

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  chapters as seedChapters,
  networkMetrics as seedMetrics,
} from "@/lib/platform-data";

export type UserRole = "student" | "advisor" | "admin" | "shelter" | "alumni";

export type ChapterRecord = {
  id: string;
  name: string;
  school: string;
  city: string;
  state: string;
  country: string;
  region?: string;
  lat: number;
  lng: number;
  status: "Active" | "Launching" | "At risk";
  hours: number;
  funds: number;
  projects: number;
  members: number;
  toys: number;
};

export type Session = {
  email: string;
  name: string;
  role: UserRole;
  chapterId: string;
  loggedInAt: string;
};

export type HourLog = {
  id: string;
  chapterId: string;
  student: string;
  activity: string;
  date: string;
  amount: number;
  status: "Advisor review" | "Verified";
};

export type FundLog = {
  id: string;
  chapterId: string;
  event: string;
  category: string;
  amount: number;
  status: "Pending HQ" | "Verified";
};

export type ToyLog = {
  id: string;
  chapterId: string;
  count: number;
  note: string;
  date: string;
  status: "Pending review" | "Counted";
};

export type ProjectLog = {
  id: string;
  chapterId: string;
  title: string;
  tags: string[];
  status: "Draft" | "Pending review" | "Approved";
};

type PersistedState = {
  chapters: ChapterRecord[];
  hours: HourLog[];
  funds: FundLog[];
  toys: ToyLog[];
  projects: ProjectLog[];
  session: Session | null;
};

type PlatformContextValue = {
  ready: boolean;
  session: Session | null;
  chapters: ChapterRecord[];
  hours: HourLog[];
  funds: FundLog[];
  toys: ToyLog[];
  projects: ProjectLog[];
  metrics: {
    toysDonated: number;
    toyValueUsd: number;
    fundsRaised: number;
    activeChapters: number;
    countries: number;
    semesterFundGoal: number;
    toyGoal: number;
    fashionPartnerNote: string;
  };
  login: (input: { email: string; name?: string; role: UserRole; chapterId?: string }) => Session;
  logout: () => void;
  addChapter: (input: {
    leadName: string;
    email: string;
    school: string;
    city: string;
    state: string;
    interested: number;
  }) => ChapterRecord & { chapterNumber: number };
  logHours: (input: { activity: string; date: string; amount: number; notes?: string }) => void;
  logFunds: (input: { event: string; category: string; amount: number }) => void;
  logToys: (input: { count: number; note: string; date: string }) => void;
  logProject: (input: { title: string; tags: string[] }) => void;
  chapterForSession: ChapterRecord | null;
};

const STORAGE_KEY = "pfc-platform-v1";
const TOY_VALUE = 18;

const ROLE_HOME: Record<UserRole, string> = {
  student: "/portal",
  advisor: "/advisor",
  admin: "/admin",
  shelter: "/shelter",
  alumni: "/alumni",
};

export const roleHome = ROLE_HOME;

const seedHourLogs: HourLog[] = [
  { id: "h1", chapterId: "coppell", student: "Maya Chen", activity: "Toy-making night", date: "2026-10-29", amount: 3.5, status: "Advisor review" },
  { id: "h2", chapterId: "coppell", student: "Maya Chen", activity: "Shelter volunteer shift", date: "2026-10-18", amount: 4, status: "Verified" },
];

const seedFundLogs: FundLog[] = [
  { id: "f1", chapterId: "coppell", event: "Bake sale", category: "Bake sale / campus sale", amount: 55, status: "Verified" },
  { id: "f2", chapterId: "coppell", event: "Wishlist drive", category: "Wishlist / supplies", amount: 0, status: "Pending HQ" },
];

const seedToyLogs: ToyLog[] = [
  { id: "ty1", chapterId: "coppell", count: 14, note: "Fashion scrap enrichment night", date: "2026-10-29", status: "Counted" },
];

const seedProjectLogs: ProjectLog[] = [
  { id: "p1", chapterId: "coppell", title: "October enrichment night", tags: ["Enrichment", "Shelter task"], status: "Approved" },
  { id: "p2", chapterId: "coppell", title: "Sterilization hallway posters", tags: ["Education"], status: "Draft" },
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
}

function guessCoords(city: string, state: string): { lat: number; lng: number; country: string; region?: string } {
  const key = `${city}|${state}`.toLowerCase();
  const known: Record<string, { lat: number; lng: number; country: string; region?: string }> = {
    "austin|tx": { lat: 30.27, lng: -97.74, country: "USA", region: "DFW" },
    "dallas|tx": { lat: 32.78, lng: -96.8, country: "USA", region: "DFW" },
    "houston|tx": { lat: 29.76, lng: -95.37, country: "USA", region: "DFW" },
    "los angeles|ca": { lat: 34.05, lng: -118.24, country: "USA" },
    "chicago|il": { lat: 41.88, lng: -87.63, country: "USA" },
    "atlanta|ga": { lat: 33.75, lng: -84.39, country: "USA" },
    "miami|fl": { lat: 25.76, lng: -80.19, country: "USA" },
    "doha|qa": { lat: 25.29, lng: 51.53, country: "Qatar" },
    "coimbatore|tn": { lat: 11.02, lng: 76.96, country: "India" },
  };
  if (known[key]) return known[key];

  const stateDefaults: Record<string, { lat: number; lng: number; country: string; region?: string }> = {
    TX: { lat: 31.5, lng: -99.0, country: "USA", region: "DFW" },
    CA: { lat: 36.7, lng: -119.5, country: "USA" },
    GA: { lat: 32.7, lng: -83.5, country: "USA" },
    AL: { lat: 32.6, lng: -86.7, country: "USA" },
    FL: { lat: 27.8, lng: -81.7, country: "USA" },
    NY: { lat: 42.9, lng: -75.5, country: "USA" },
    IL: { lat: 40.0, lng: -89.0, country: "USA" },
    QA: { lat: 25.3, lng: 51.5, country: "Qatar" },
    TN: { lat: 11.1, lng: 78.0, country: "India" },
  };
  const upper = state.trim().toUpperCase();
  if (stateDefaults[upper]) {
    const base = stateDefaults[upper];
    return {
      ...base,
      lat: base.lat + (Math.random() - 0.5) * 0.4,
      lng: base.lng + (Math.random() - 0.5) * 0.4,
    };
  }
  return {
    lat: 39.5 + (Math.random() - 0.5) * 8,
    lng: -98 + (Math.random() - 0.5) * 20,
    country: "USA",
  };
}

function deriveMetrics(chapterList: ChapterRecord[]) {
  const toysDonated = chapterList.reduce((sum, chapter) => sum + chapter.toys, 0);
  const fundsRaised = chapterList.reduce((sum, chapter) => sum + chapter.funds, 0);
  const countries = new Set(chapterList.map((chapter) => chapter.country)).size;
  return {
    toysDonated,
    toyValueUsd: toysDonated * TOY_VALUE,
    fundsRaised,
    activeChapters: chapterList.length,
    countries,
    semesterFundGoal: seedMetrics.semesterFundGoal,
    toyGoal: seedMetrics.toyGoal,
    fashionPartnerNote: seedMetrics.fashionPartnerNote,
  };
}

function seedState(): PersistedState {
  return {
    chapters: seedChapters.map((chapter) => ({
      ...chapter,
      status: chapter.status as ChapterRecord["status"],
    })),
    hours: seedHourLogs,
    funds: seedFundLogs.filter((item) => item.amount > 0),
    toys: seedToyLogs,
    projects: seedProjectLogs,
    session: null,
  };
}

function readStorage(): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PersistedState;
    if (!Array.isArray(parsed.chapters) || parsed.chapters.length < 1) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeStorage(state: PersistedState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

const PlatformContext = createContext<PlatformContextValue | null>(null);

export function PlatformProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [state, setState] = useState<PersistedState>(seedState);

  useEffect(() => {
    const stored = readStorage();
    if (stored) setState(stored);
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    writeStorage(state);
  }, [ready, state]);

  const login = useCallback(
    (input: { email: string; name?: string; role: UserRole; chapterId?: string }) => {
      const email = input.email.trim().toLowerCase();
      const local = email.split("@")[0] || "member";
      const name =
        input.name?.trim() ||
        local
          .split(/[._-]/)
          .filter(Boolean)
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join(" ") ||
        "Chapter member";
      const chapterId = input.chapterId || state.chapters.find((c) => c.id === "coppell")?.id || state.chapters[0]?.id;
      const session: Session = {
        email,
        name,
        role: input.role,
        chapterId,
        loggedInAt: new Date().toISOString(),
      };
      setState((current) => ({ ...current, session }));
      return session;
    },
    [state.chapters],
  );

  const logout = useCallback(() => {
    setState((current) => ({ ...current, session: null }));
  }, []);

  const addChapter = useCallback(
    (input: {
      leadName: string;
      email: string;
      school: string;
      city: string;
      state: string;
      interested: number;
    }) => {
      const city = input.city.trim();
      const school = input.school.trim();
      const baseId = slugify(`${city}-${school}`) || `chapter-${Date.now()}`;
      let created: ChapterRecord & { chapterNumber: number } | null = null;
      setState((current) => {
        let nextId = baseId;
        let n = 2;
        while (current.chapters.some((chapter) => chapter.id === nextId)) {
          nextId = `${baseId}-${n++}`;
        }
        const geo = guessCoords(city, input.state);
        const chapter: ChapterRecord = {
          id: nextId,
          name: `${city} Paws`,
          school,
          city,
          state: input.state.trim(),
          country: geo.country,
          region: geo.region,
          lat: geo.lat,
          lng: geo.lng,
          status: "Launching",
          hours: 0,
          funds: 0,
          projects: 0,
          members: Math.max(1, Number(input.interested) || 1),
          toys: 0,
        };
        created = { ...chapter, chapterNumber: current.chapters.length + 1 };
        return { ...current, chapters: [...current.chapters, chapter] };
      });
      return created!;
    },
    [],
  );

  const logHours = useCallback((input: { activity: string; date: string; amount: number; notes?: string }) => {
    setState((current) => {
      if (!current.session) return current;
      const chapterId = current.session.chapterId;
      const amount = Number(input.amount) || 0;
      const entry: HourLog = {
        id: `h${Date.now()}`,
        chapterId,
        student: current.session.name,
        activity: input.activity,
        date: input.date,
        amount,
        status: "Advisor review",
      };
      return {
        ...current,
        hours: [entry, ...current.hours],
        chapters: current.chapters.map((chapter) =>
          chapter.id === chapterId ? { ...chapter, hours: Number((chapter.hours + amount).toFixed(2)) } : chapter,
        ),
      };
    });
  }, []);

  const logFunds = useCallback((input: { event: string; category: string; amount: number }) => {
    setState((current) => {
      if (!current.session) return current;
      const chapterId = current.session.chapterId;
      const amount = Number(input.amount) || 0;
      const entry: FundLog = {
        id: `f${Date.now()}`,
        chapterId,
        event: input.event,
        category: input.category,
        amount,
        status: "Pending HQ",
      };
      return {
        ...current,
        funds: [entry, ...current.funds],
        chapters: current.chapters.map((chapter) =>
          chapter.id === chapterId ? { ...chapter, funds: chapter.funds + amount } : chapter,
        ),
      };
    });
  }, []);

  const logToys = useCallback((input: { count: number; note: string; date: string }) => {
    setState((current) => {
      if (!current.session) return current;
      const chapterId = current.session.chapterId;
      const count = Math.max(0, Math.round(Number(input.count) || 0));
      const entry: ToyLog = {
        id: `ty${Date.now()}`,
        chapterId,
        count,
        note: input.note,
        date: input.date,
        status: "Pending review",
      };
      return {
        ...current,
        toys: [entry, ...current.toys],
        chapters: current.chapters.map((chapter) =>
          chapter.id === chapterId ? { ...chapter, toys: chapter.toys + count } : chapter,
        ),
      };
    });
  }, []);

  const logProject = useCallback((input: { title: string; tags: string[] }) => {
    setState((current) => {
      if (!current.session) return current;
      const chapterId = current.session.chapterId;
      const entry: ProjectLog = {
        id: `p${Date.now()}`,
        chapterId,
        title: input.title,
        tags: input.tags,
        status: "Pending review",
      };
      return {
        ...current,
        projects: [entry, ...current.projects],
        chapters: current.chapters.map((chapter) =>
          chapter.id === chapterId ? { ...chapter, projects: chapter.projects + 1 } : chapter,
        ),
      };
    });
  }, []);

  const metrics = useMemo(() => deriveMetrics(state.chapters), [state.chapters]);
  const chapterForSession = useMemo(
    () => state.chapters.find((chapter) => chapter.id === state.session?.chapterId) ?? null,
    [state.chapters, state.session],
  );

  const value = useMemo<PlatformContextValue>(
    () => ({
      ready,
      session: state.session,
      chapters: state.chapters,
      hours: state.hours,
      funds: state.funds,
      toys: state.toys,
      projects: state.projects,
      metrics,
      login,
      logout,
      addChapter,
      logHours,
      logFunds,
      logToys,
      logProject,
      chapterForSession,
    }),
    [
      ready,
      state,
      metrics,
      login,
      logout,
      addChapter,
      logHours,
      logFunds,
      logToys,
      logProject,
      chapterForSession,
    ],
  );

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  const ctx = useContext(PlatformContext);
  if (!ctx) throw new Error("usePlatform must be used within PlatformProvider");
  return ctx;
}

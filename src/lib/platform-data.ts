export type ClaimStatus = "pending" | "approved" | "rejected" | "needs_info";

export const networkMetrics = {
  fashionPartnerNote: "Fashion department scrap-to-toy workshops",
  semesterFundGoal: 1500,
  toyGoal: 150,
};

export const chapters = [
  { id: "shafter", name: "Shafter Paws", school: "Shafter High", city: "Shafter", state: "CA", country: "USA", lat: 35.5, lng: -119.27, status: "Active" },
  { id: "eastvale", name: "Eastvale Paws", school: "Eastvale area HS", city: "Eastvale", state: "CA", country: "USA", lat: 33.96, lng: -117.56, status: "Active" },
  { id: "richmond-hill", name: "Richmond Hill Paws", school: "Richmond Hill HS", city: "Richmond Hill", state: "ON", country: "Canada", lat: 43.88, lng: -79.44, status: "Active" },
  { id: "doha", name: "Doha Paws", school: "Doha partner school", city: "Doha", state: "QA", country: "Qatar", lat: 25.29, lng: 51.53, status: "Active" },
  { id: "coimbatore", name: "Coimbatore Paws", school: "Coimbatore partner school", city: "Coimbatore", state: "TN", country: "India", lat: 11.02, lng: 76.96, status: "Active" },
  { id: "sulphur-springs", name: "Sulphur Springs Paws", school: "Sulphur Springs HS", city: "Sulphur Springs", state: "TX", country: "USA", lat: 33.14, lng: -95.6, status: "Active" },
  { id: "san-jose", name: "San Jose Paws", school: "San Jose area HS", city: "San Jose", state: "CA", country: "USA", lat: 37.34, lng: -121.89, status: "Active" },
  { id: "coppell", name: "Coppell Paws", school: "Coppell HS", city: "Coppell", state: "TX", country: "USA", region: "DFW", lat: 32.95, lng: -97.0, status: "Active" },
  { id: "spanish-fort", name: "Spanish Fort Paws", school: "Spanish Fort HS", city: "Spanish Fort", state: "AL", country: "USA", lat: 30.67, lng: -87.92, status: "Active" },
  { id: "plano", name: "Plano Paws", school: "Plano area HS", city: "Plano", state: "TX", country: "USA", region: "DFW", lat: 33.02, lng: -96.7, status: "Active" },
  { id: "frisco", name: "Frisco Paws", school: "Lebanon Trail High School", city: "Frisco", state: "TX", country: "USA", region: "DFW", lat: 33.15, lng: -96.82, status: "Active" },
];

export type ShelterTaskRecord = {
  id: string;
  shelter: string;
  title: string;
  detail: string;
  effort: string;
  when: string;
  city: string;
  urgent: boolean;
  category: string;
  claimedBy?: string;
  claimedAt?: string;
};

/** Starts empty. Shelter partners add the real tasks. */
export const shelterTasks: ShelterTaskRecord[] = [];

export type AnnouncementRecord = {
  id: string;
  title: string;
  body: string;
  date: string;
  audience: string;
};

export type PublicRecord = {
  chapterId: string;
  chapterName: string;
  city: string;
  region?: string;
  country: string;
  status: string;
  loggedHours: number;
  verifiedHours: number;
  pendingHours: number;
  fundsRaised: number;
  pendingFunds: number;
  projectsDocumented: number;
  projectsApproved: number;
  toysMade: number;
  toyValue: number;
  confirmedNote: string | null;
  members: number;
  openTasks: number;
  tasks: ShelterTaskRecord[];
  announcements: AnnouncementRecord[];
  updatedAt: string | null;
};

export type PublicNetwork = {
  records: PublicRecord[];
  totals: {
    chapters: number;
    countries: number;
    verifiedHours: number;
    fundsRaised: number;
    projectsApproved: number;
    toysMade: number;
    toyValue: number;
    members: number;
    openTasks: number;
  };
  announcements: AnnouncementRecord[];
  tasks: ShelterTaskRecord[];
  updatedAt: string | null;
};

/** Starts empty. National organizers publish the real announcements. */
export const announcements: AnnouncementRecord[] = [];

export const resources = [
  { id: "r1", title: "First meeting agenda", type: "DOCX", category: "Launch", size: "42 KB" },
  { id: "r2", title: "Chapter bylaws template", type: "PDF", category: "Governance", size: "180 KB" },
  { id: "r3", title: "Shelter outreach email", type: "DOCX", category: "Partnerships", size: "28 KB" },
  { id: "r4", title: "Scrap-to-toy workshop guide", type: "PDF", category: "Enrichment", size: "210 KB" },
  { id: "r5", title: "Printable hallway flyer set", type: "PDF", category: "Outreach", size: "2.1 MB" },
  { id: "r6", title: "Parent consent packet", type: "PDF", category: "Safety", size: "310 KB" },
  { id: "r7", title: "Hour logging guide", type: "PDF", category: "Reporting", size: "140 KB" },
  { id: "r8", title: "Fashion dept partnership one-pager", type: "PDF", category: "Partnerships", size: "95 KB" },
];

export const launchChecklist = [
  { id: "l1", label: "Submit chapter registration", done: false },
  { id: "l2", label: "Confirm faculty advisor", done: false },
  { id: "l3", label: "Receive school approval", done: false },
  { id: "l4", label: "Invite founding team", done: false },
  { id: "l5", label: "Schedule first meeting", done: false },
  { id: "l6", label: "Claim first shelter mini-task", done: false },
  { id: "l7", label: "Send parent consent for off-campus work", done: false },
  { id: "l8", label: "File first Activity & Impact Report", done: false },
];

export type ClaimRecord = {
  id: string;
  chapter: string;
  student: string;
  type: string;
  summary: string;
  submitted: string;
  status: ClaimStatus;
};

/** Starts empty. Chapter submissions create the real claims. */
export const pendingClaims: ClaimRecord[] = [];

export type MentorRecord = {
  id: string;
  name: string;
  year: number;
  school: string;
  focus: string;
  status: "Available" | "Limited";
};

/** Starts empty. Alumni add themselves through the alumni portal. */
export const alumni: MentorRecord[] = [];

export type SocialPostRecord = {
  id: string;
  project: string;
  caption: string;
  status: "Queued" | "Draft";
};

/** Starts empty. Organizers queue real captions from approved work. */
export const socialQueue: SocialPostRecord[] = [];

export const cmsPages = [
  { slug: "home-lede", label: "Homepage lede", updated: "Nov 1" },
  { slug: "active-standard", label: "Active standard copy", updated: "Oct 22" },
  { slug: "safety-rules", label: "Safety rules", updated: "Oct 18" },
  { slug: "announcements", label: "Public announcements", updated: "Nov 1" },
];

export const fundCategories = [
  { id: "wishlist", label: "Wishlist / supplies" },
  { id: "bake", label: "Bake sale / campus sale" },
  { id: "event", label: "Benefit event" },
  { id: "grant", label: "Grant (HQ-approved)" },
  { id: "other", label: "Other" },
];

export const projectTags = ["Shelter task", "Enrichment", "Education", "Fundraising", "Outreach", "Fashion scrap"];

export const branchRegions = [
  { label: "California", chapters: ["Shafter", "Eastvale", "San Jose"] },
  { label: "DFW / Texas", chapters: ["Coppell", "Plano", "Frisco", "Sulphur Springs"] },
  { label: "Canada", chapters: ["Richmond Hill"] },
  { label: "Southeast", chapters: ["Spanish Fort"] },
  { label: "International", chapters: ["Doha", "Coimbatore"] },
];

export type HourStatus = "Advisor review" | "Verified";

export type HourEntry = {
  id: string;
  student: string;
  activity: string;
  date: string;
  hours: number;
  note?: string;
  proof: string[];
  status: HourStatus;
};

/** Starts empty. Students add the real entries. */
export const hourEntries: HourEntry[] = [];

export type ApplicationRecord = {
  id: string;
  reference: string;
  submittedAt: string;
  name: string;
  email: string;
  school: string;
  city: string;
  region: string;
  grade: string;
  age: string;
  advisor: string;
  why: string;
  need: string;
  interest: string;
  status: "Received" | "Reviewed";
};

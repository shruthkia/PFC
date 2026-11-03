export type ClaimStatus = "pending" | "approved" | "rejected" | "needs_info";

export const networkMetrics = {
  toysDonated: 85,
  toyValueUsd: 1550,
  fundsRaised: 400,
  activeChapters: 11,
  countries: 4,
  fashionPartnerNote: "Fashion department scrap-to-toy workshops",
  semesterFundGoal: 1500,
  toyGoal: 150,
};

export const chapters = [
  { id: "shafter", name: "Shafter Paws", school: "Shafter High", city: "Shafter", state: "CA", country: "USA", lat: 35.5, lng: -119.27, status: "Active", hours: 64, funds: 40, projects: 3, members: 14, toys: 7 },
  { id: "eastvale", name: "Eastvale Paws", school: "Eastvale area HS", city: "Eastvale", state: "CA", country: "USA", lat: 33.96, lng: -117.56, status: "Active", hours: 72, funds: 35, projects: 4, members: 18, toys: 9 },
  { id: "richmond-hill", name: "Richmond Hill Paws", school: "Richmond Hill HS", city: "Richmond Hill", state: "ON", country: "Canada", lat: 43.88, lng: -79.44, status: "Active", hours: 48, funds: 20, projects: 2, members: 12, toys: 5 },
  { id: "doha", name: "Doha Paws", school: "Doha partner school", city: "Doha", state: "QA", country: "Qatar", lat: 25.29, lng: 51.53, status: "Active", hours: 55, funds: 50, projects: 3, members: 16, toys: 6 },
  { id: "coimbatore", name: "Coimbatore Paws", school: "Coimbatore partner school", city: "Coimbatore", state: "TN", country: "India", lat: 11.02, lng: 76.96, status: "Active", hours: 61, funds: 30, projects: 3, members: 20, toys: 8 },
  { id: "sulphur-springs", name: "Sulphur Springs Paws", school: "Sulphur Springs HS", city: "Sulphur Springs", state: "TX", country: "USA", lat: 33.14, lng: -95.6, status: "Active", hours: 42, funds: 25, projects: 2, members: 11, toys: 4 },
  { id: "san-jose", name: "San Jose Paws", school: "San Jose area HS", city: "San Jose", state: "CA", country: "USA", lat: 37.34, lng: -121.89, status: "Active", hours: 80, funds: 45, projects: 5, members: 22, toys: 11 },
  { id: "coppell", name: "Coppell Paws", school: "Coppell HS", city: "Coppell", state: "TX", country: "USA", region: "DFW", lat: 32.95, lng: -97.0, status: "Active", hours: 96, funds: 55, projects: 6, members: 24, toys: 13 },
  { id: "spanish-fort", name: "Spanish Fort Paws", school: "Spanish Fort HS", city: "Spanish Fort", state: "AL", country: "USA", lat: 30.67, lng: -87.92, status: "Active", hours: 38, funds: 20, projects: 2, members: 10, toys: 3 },
  { id: "plano", name: "Plano Paws", school: "Plano area HS", city: "Plano", state: "TX", country: "USA", region: "DFW", lat: 33.02, lng: -96.7, status: "Active", hours: 88, funds: 40, projects: 5, members: 21, toys: 10 },
  { id: "frisco", name: "Frisco Paws", school: "Frisco area HS", city: "Frisco", state: "TX", country: "USA", region: "DFW", lat: 33.15, lng: -96.82, status: "Active", hours: 74, funds: 40, projects: 4, members: 19, toys: 9 },
];

export const leaderboardMonth = [
  { rank: 1, chapter: "Coppell Paws", metric: "14 toys", badge: "Most toys donated" },
  { rank: 2, chapter: "San Jose Paws", metric: "12 toys", badge: "Scrap workshop lead" },
  { rank: 3, chapter: "Plano Paws", metric: "11 toys", badge: "Steady DFW climb" },
  { rank: 4, chapter: "Eastvale Paws", metric: "10 toys", badge: "Fashion scrap night" },
  { rank: 5, chapter: "Frisco Paws", metric: "9 toys", badge: "Rising" },
];

/** Mini tasks shelters post for chapters to claim and finish — not animal listings. */
export const shelterTasks = [
  { id: "t1", shelter: "Austin Animal Center", title: "Sort donation towels by size", detail: "Fold and bin clean towels into small / medium / large for kennel restock.", effort: "45 min · 2–4 students", when: "This week", city: "DFW area", urgent: true, category: "Supplies" },
  { id: "t2", shelter: "Safe Harbor Rescue", title: "Sew 12 scrap enrichment toys", detail: "Use donated fabric scraps (fashion dept leftovers welcome). Stuff with clean fleece.", effort: "2 hrs · craft table", when: "By Nov 15", city: "Coppell / Plano", urgent: false, category: "Enrichment" },
  { id: "t3", shelter: "East Bay Humane", title: "Label wishlist bins", detail: "Print labels and mark incoming Amazon wishlist boxes so staff can shelve faster.", effort: "30 min · 2 students", when: "Weekend", city: "San Jose", urgent: true, category: "Ops" },
  { id: "t4", shelter: "Coastal Pets AL", title: "Assemble welcome packets", detail: "Stuff folders with adoption tip sheets, local vet list, and sterilization FAQ.", effort: "1 hr · 3 students", when: "Ongoing", city: "Spanish Fort", urgent: false, category: "Education" },
  { id: "t5", shelter: "Valley Friends", title: "Cut t-shirt yarn for tug toys", detail: "Prep yarn strands from old tees so volunteers can braid toys next shift.", effort: "1 hr · scissors + bins", when: "Nov 12", city: "Shafter / Eastvale", urgent: false, category: "Enrichment" },
  { id: "t6", shelter: "Community Rescue Hub", title: "Photograph empty kennel enrichment", detail: "Take clear photos of finished toys in empty kennels for social (no animal faces required).", effort: "40 min · 1–2 students", when: "Flexible", city: "Frisco", urgent: false, category: "Outreach" },
];

export const announcements = [
  { id: "n1", title: "Scrap-to-toy with fashion", body: "Chapters partnering with their school fashion department can log scrap fabric nights under Enrichment. Those toys count toward the 85+ network total.", date: "2026-11-01", audience: "All chapters" },
  { id: "n2", title: "DFW chapters check-in", body: "Coppell, Plano, and Frisco — share one shelter mini-task claim before the 15th so HQ can feature it.", date: "2026-10-28", audience: "DFW" },
  { id: "n3", title: "Photo permission reminder", body: "Prefer kennel and craft-table photos. Do not upload student faces without school and family permission.", date: "2026-10-20", audience: "All chapters" },
];

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
  { id: "l1", label: "Submit chapter registration", done: true },
  { id: "l2", label: "Confirm faculty advisor", done: true },
  { id: "l3", label: "Receive school approval", done: true },
  { id: "l4", label: "Invite founding team", done: true },
  { id: "l5", label: "Schedule first meeting", done: false },
  { id: "l6", label: "Claim first shelter mini-task", done: false },
  { id: "l7", label: "Send parent consent for off-campus work", done: false },
  { id: "l8", label: "File first Activity & Impact Report", done: false },
];

export const pendingClaims = [
  { id: "c1", chapter: "Coppell Paws", student: "Maya Chen", type: "Toys", summary: "Scrap enrichment night · 14 toys", submitted: "Oct 30", status: "pending" as ClaimStatus },
  { id: "c2", chapter: "Plano Paws", student: "Jordan Lee", type: "Funds", summary: "Bake sale · $80", submitted: "Oct 29", status: "pending" as ClaimStatus },
  { id: "c3", chapter: "San Jose Paws", student: "Ava Ruiz", type: "Project", summary: "Fashion scrap workshop gallery", submitted: "Oct 28", status: "needs_info" as ClaimStatus },
  { id: "c4", chapter: "Eastvale Paws", student: "Sam Ortiz", type: "Hours", summary: "Shelter task shift · 3 hrs", submitted: "Oct 27", status: "pending" as ClaimStatus },
];

export const activeHealth = [
  { chapter: "Coppell Paws", pulse: "Healthy", note: "Monthly check-in on time · scrap workshop logged", risk: "low" },
  { chapter: "San Jose Paws", pulse: "Healthy", note: "Strong reporting · fashion partner active", risk: "low" },
  { chapter: "Spanish Fort Paws", pulse: "Watch", note: "One mini-task still unclaimed this month", risk: "medium" },
  { chapter: "Doha Paws", pulse: "Healthy", note: "International chapter check-in received", risk: "low" },
  { chapter: "Coimbatore Paws", pulse: "Healthy", note: "Toy batch photos pending captions", risk: "low" },
];

export const advisorQueue = [
  { id: "v1", student: "Maya Chen", activity: "Scrap enrichment night", hours: 3.5, date: "Oct 29", proof: "3 craft-table photos + roster" },
  { id: "v2", student: "Eli Park", activity: "Wishlist bin labeling", hours: 1.5, date: "Oct 28", proof: "Supervisor email" },
  { id: "v3", student: "Noah Diaz", activity: "Hallway education table", hours: 1.5, date: "Oct 26", proof: "Photo + flyer" },
];

/** @deprecated use shelterTasks — kept as alias for older imports */
export const shelterRequests = shelterTasks.map((task) => ({
  id: task.id,
  shelter: task.shelter,
  title: task.title,
  need: task.effort,
  when: task.when,
  city: task.city,
  urgent: task.urgent,
}));

export const alumni = [
  { id: "al1", name: "Priya Nair", year: 2025, school: "Coppell HS", focus: "Shelter task mentoring", status: "Available" },
  { id: "al2", name: "Chris Bell", year: 2024, school: "Plano area HS", focus: "Fundraising coaching", status: "Available" },
  { id: "al3", name: "Lena Cho", year: 2025, school: "San Jose area HS", focus: "University club bridge", status: "Limited" },
  { id: "al4", name: "Diego Santos", year: 2023, school: "Eastvale area HS", focus: "Scrap-to-toy kits", status: "Available" },
];

export const socialQueue = [
  { id: "sm1", project: "Coppell scrap night", caption: "14 enrichment toys from fashion-department scraps — headed to kennels, not a landfill.", status: "Queued" },
  { id: "sm2", project: "Plano bake sale", caption: "$80 toward shelter supply bins. Receipts attached.", status: "Draft" },
];

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

export type ShelterTaskRecord = (typeof shelterTasks)[number] & {
  claimedBy?: string;
  claimedAt?: string;
};

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

/** Sample hour log for the demo chapter. Advisors verify these records. */
export const hourEntries: HourEntry[] = [
  { id: "h1", student: "Maya Chen", activity: "Toy-making night", date: "2026-10-29", hours: 3.5, note: "Fashion scrap night, 14 toys inspected and bagged.", proof: ["craft-table-1.jpg", "roster.pdf"], status: "Advisor review" },
  { id: "h2", student: "Maya Chen", activity: "Shelter volunteer shift", date: "2026-10-18", hours: 4, note: "Kennel laundry and supply restock at Austin Animal Center.", proof: ["supervisor-email.pdf"], status: "Verified" },
  { id: "h3", student: "Eli Park", activity: "Wishlist bin labeling", date: "2026-10-28", hours: 1.5, note: "Printed and applied labels for incoming wishlist boxes.", proof: ["supervisor-email.pdf"], status: "Advisor review" },
  { id: "h4", student: "Noah Diaz", activity: "Hallway education table", date: "2026-10-26", hours: 1.5, note: "Sterilization myth-busting table at lunch.", proof: ["flyer-photo.jpg"], status: "Advisor review" },
  { id: "h5", student: "Maya Chen", activity: "Scrap-to-toy workshop", date: "2026-10-12", hours: 3, note: "Cut and braided fabric strips with the fashion department.", proof: ["count-sheet.pdf"], status: "Verified" },
  { id: "h6", student: "Eli Park", activity: "Shelter supply sort", date: "2026-10-05", hours: 2, note: "Sorted towel donations by size.", proof: [], status: "Verified" },
];

export type AnnouncementRecord = (typeof announcements)[number];
export type ClaimRecord = (typeof pendingClaims)[number];

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

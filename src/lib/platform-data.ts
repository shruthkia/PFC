export type ClaimStatus = "pending" | "approved" | "rejected" | "needs_info";

export const networkMetrics = {
  hoursLogged: 2480,
  fundsRaised: 18640,
  sheltersHelped: 47,
  animalsSupported: 326,
  activeChapters: 15,
  countries: 5,
  monthlyGoalToys: 1000,
  monthlyToysMade: 740,
  semesterFundGoal: 25000,
};

export const chapters = [
  { id: "westview", name: "Westview Paws", school: "Westview High", city: "Austin", state: "TX", lat: 30.27, lng: -97.74, status: "Active", hours: 186, funds: 1840, projects: 8, members: 24 },
  { id: "oakridge", name: "Oakridge Rescue Club", school: "Oakridge Academy", city: "Seattle", state: "WA", lat: 47.61, lng: -122.33, status: "Active", hours: 214, funds: 2210, projects: 11, members: 31 },
  { id: "riverdale", name: "Riverdale Animal Allies", school: "Riverdale HS", city: "Atlanta", state: "GA", lat: 33.75, lng: -84.39, status: "Launching", hours: 42, funds: 310, projects: 2, members: 12 },
  { id: "sunset", name: "Sunset Shelter Squad", school: "Sunset Prep", city: "Los Angeles", state: "CA", lat: 34.05, lng: -118.24, status: "Active", hours: 168, funds: 1560, projects: 7, members: 19 },
  { id: "midwest", name: "Midwest Kindness", school: "Lincoln High", city: "Chicago", state: "IL", lat: 41.88, lng: -87.63, status: "At risk", hours: 28, funds: 90, projects: 1, members: 8 },
  { id: "harbor", name: "Harbor Helping Paws", school: "Harbor Collegiate", city: "New York", state: "NY", lat: 40.71, lng: -74.01, status: "Active", hours: 195, funds: 2030, projects: 9, members: 27 },
];

export const leaderboardMonth = [
  { rank: 1, chapter: "Oakridge Rescue Club", metric: "214 hrs", badge: "Most hours" },
  { rank: 2, chapter: "Harbor Helping Paws", metric: "195 hrs", badge: "Steady climb" },
  { rank: 3, chapter: "Westview Paws", metric: "186 hrs", badge: "Top fundraiser" },
  { rank: 4, chapter: "Sunset Shelter Squad", metric: "168 hrs", badge: "Best gallery" },
  { rank: 5, chapter: "Riverdale Animal Allies", metric: "42 hrs", badge: "Rising" },
];

export const adoptableAnimals = [
  { id: "a1", name: "Mochi", species: "Cat", age: "2 yrs", shelter: "Austin Animal Center", temperament: "Quiet cuddler", tag: "Indoor preferred" },
  { id: "a2", name: "Biscuit", species: "Dog", age: "8 mo", shelter: "Safe in Austin", temperament: "Playful", tag: "Great with teens" },
  { id: "a3", name: "Nori", species: "Cat", age: "4 yrs", shelter: "Austin Animal Center", temperament: "Independent", tag: "Bonded pair OK" },
  { id: "a4", name: "Maple", species: "Dog", age: "3 yrs", shelter: "Travis County Pets", temperament: "Gentle", tag: "Leash manners" },
  { id: "a5", name: "Pip", species: "Rabbit", age: "1 yr", shelter: "Small Friends Rescue", temperament: "Curious", tag: "Needs quiet home" },
  { id: "a6", name: "Clover", species: "Dog", age: "5 yrs", shelter: "Safe in Austin", temperament: "Calm walker", tag: "Senior softie" },
];

export const announcements = [
  { id: "n1", title: "November enrichment challenge", body: "Network goal: 1,000 toys before Thanksgiving. Log projects under Enrichment so they count toward the public bar.", date: "2026-11-01", audience: "All chapters" },
  { id: "n2", title: "Advisor verification window", body: "Advisors should clear pending hour claims by the 15th so certificates can generate before winter break.", date: "2026-10-28", audience: "Advisors" },
  { id: "n3", title: "Photo permission reminder", body: "Do not upload student faces without school and family permission. Shelter kennel photos are preferred when uncertain.", date: "2026-10-20", audience: "All chapters" },
];

export const resources = [
  { id: "r1", title: "First meeting agenda", type: "DOCX", category: "Launch", size: "42 KB" },
  { id: "r2", title: "Chapter bylaws template", type: "PDF", category: "Governance", size: "180 KB" },
  { id: "r3", title: "Shelter outreach email", type: "DOCX", category: "Partnerships", size: "28 KB" },
  { id: "r4", title: "Fundraiser checklist", type: "PDF", category: "Fundraising", size: "96 KB" },
  { id: "r5", title: "Printable hallway flyer set", type: "PDF", category: "Outreach", size: "2.1 MB" },
  { id: "r6", title: "Parent consent packet", type: "PDF", category: "Safety", size: "310 KB" },
  { id: "r7", title: "Hour logging guide", type: "PDF", category: "Reporting", size: "140 KB" },
  { id: "r8", title: "Project photo best practices", type: "PDF", category: "Docs", size: "220 KB" },
];

export const launchChecklist = [
  { id: "l1", label: "Submit chapter registration", done: true },
  { id: "l2", label: "Confirm faculty advisor", done: true },
  { id: "l3", label: "Receive school approval", done: true },
  { id: "l4", label: "Invite founding team", done: true },
  { id: "l5", label: "Schedule first meeting", done: false },
  { id: "l6", label: "Choose first shelter project", done: false },
  { id: "l7", label: "Send parent consent for off-campus work", done: false },
  { id: "l8", label: "File first Activity & Impact Report", done: false },
];

export const pendingClaims = [
  { id: "c1", chapter: "Westview Paws", student: "Maya Chen", type: "Hours", summary: "Toy-making night · 3.5 hrs", submitted: "Oct 30", status: "pending" as ClaimStatus },
  { id: "c2", chapter: "Harbor Helping Paws", student: "Jordan Lee", type: "Funds", summary: "Bake sale · $386", submitted: "Oct 29", status: "pending" as ClaimStatus },
  { id: "c3", chapter: "Sunset Shelter Squad", student: "Ava Ruiz", type: "Project", summary: "Kennel enrichment gallery", submitted: "Oct 28", status: "needs_info" as ClaimStatus },
  { id: "c4", chapter: "Oakridge Rescue Club", student: "Sam Ortiz", type: "Hours", summary: "Shelter shift · 4 hrs", submitted: "Oct 27", status: "pending" as ClaimStatus },
];

export const activeHealth = [
  { chapter: "Westview Paws", pulse: "Healthy", note: "Monthly check-in on time · 2 projects this semester", risk: "low" },
  { chapter: "Oakridge Rescue Club", pulse: "Healthy", note: "Strong reporting · advisor verified hours this week", risk: "low" },
  { chapter: "Midwest Kindness", pulse: "At risk", note: "No check-in in 34 days · roles outdated", risk: "high" },
  { chapter: "Riverdale Animal Allies", pulse: "Watch", note: "Launching · first project still scheduled", risk: "medium" },
  { chapter: "Sunset Shelter Squad", pulse: "Healthy", note: "One pending gallery needs clearer captions", risk: "low" },
];

export const advisorQueue = [
  { id: "v1", student: "Maya Chen", activity: "Toy-making night", hours: 3.5, date: "Oct 29", proof: "3 photos + roster" },
  { id: "v2", student: "Eli Park", activity: "Wishlist sorting", hours: 2.0, date: "Oct 28", proof: "Supervisor email" },
  { id: "v3", student: "Noah Diaz", activity: "Hallway education table", hours: 1.5, date: "Oct 26", proof: "Photo + flyer" },
];

export const shelterRequests = [
  { id: "s1", shelter: "Austin Animal Center", title: "Kitten room refresh", need: "6 volunteers · 3 hrs", when: "Nov 8", city: "Austin, TX", urgent: true },
  { id: "s2", shelter: "Safe in Austin", title: "Blanket & towel drive", need: "Supplies drop-off", when: "Nov 15", city: "Austin, TX", urgent: false },
  { id: "s3", shelter: "Pasadena Humane", title: "Weekend walk crew", need: "8 students · 2 hrs", when: "Nov 9", city: "Los Angeles, CA", urgent: true },
  { id: "s4", shelter: "Seattle Animal Shelter", title: "Enrichment toy restock", need: "Handmade toys", when: "Ongoing", city: "Seattle, WA", urgent: false },
];

export const alumni = [
  { id: "al1", name: "Priya Nair", year: 2025, school: "Westview High", focus: "Shelter ops mentoring", status: "Available" },
  { id: "al2", name: "Chris Bell", year: 2024, school: "Harbor Collegiate", focus: "Fundraising coaching", status: "Available" },
  { id: "al3", name: "Lena Cho", year: 2025, school: "Oakridge Academy", focus: "University club bridge", status: "Limited" },
  { id: "al4", name: "Diego Santos", year: 2023, school: "Sunset Prep", focus: "Design & outreach kits", status: "Available" },
];

export const socialQueue = [
  { id: "sm1", project: "Westview toy night", caption: "42 enrichment toys headed to Austin kennels. Built by students who stayed after school.", status: "Queued" },
  { id: "sm2", project: "Harbor bake sale", caption: "$386 for medical fund supplies — receipts attached, smiles optional.", status: "Draft" },
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

export const projectTags = ["Shelter day", "Enrichment", "Education", "Fundraising", "Outreach", "Adoption"];

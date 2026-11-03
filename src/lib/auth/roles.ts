export const ROLE_IDS = ["student", "advisor", "admin", "shelter", "alumni"] as const;

export type RoleId = (typeof ROLE_IDS)[number];

export const roles: {
  id: RoleId;
  label: string;
  home: string;
  hint: string;
}[] = [
  {
    id: "student",
    label: "Student leader",
    home: "/portal",
    hint: "Log hours with proof, track funds, document projects, manage consent, and print certificates.",
  },
  {
    id: "advisor",
    label: "Faculty advisor",
    home: "/advisor",
    hint: "Review and sign off student service hours before they count toward certificates.",
  },
  {
    id: "admin",
    label: "National organizer",
    home: "/admin",
    hint: "Approve claims, watch chapter health, publish announcements, and prepare impact reports.",
  },
  {
    id: "shelter",
    label: "Shelter partner",
    home: "/shelter",
    hint: "Post a small, completable task and see when a nearby chapter claims it.",
  },
  {
    id: "alumni",
    label: "Alumni mentor",
    home: "/alumni",
    hint: "Offer mentoring and bridge graduating members into university animal-welfare groups.",
  },
];

export function isRoleId(value: string): value is RoleId {
  return (ROLE_IDS as readonly string[]).includes(value);
}

export function roleLabel(role: RoleId): string {
  return roles.find((item) => item.id === role)?.label ?? "Member";
}

export function roleHome(role: RoleId): string {
  return roles.find((item) => item.id === role)?.home ?? "/portal";
}

/** National organizers can inspect every workspace. Everyone else sees their own. */
export function canAccess(actor: RoleId, required: RoleId): boolean {
  return actor === "admin" || actor === required;
}

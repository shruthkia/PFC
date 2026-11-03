export const stateKeys = {
  checklist: "pfc:checklist-v1",
  hours: "pfc:hours-v1",
  funds: "pfc:funds-v1",
  projects: "pfc:projects-v1",
  consents: "pfc:consents-v1",
  tasks: "pfc:tasks-v1",
  announcements: "pfc:announcements-v1",
  claims: "pfc:claims-v1",
  applications: "pfc:applications-v1",
  mentors: "pfc:mentors-v1",
  mentorRequests: "pfc:mentor-requests-v1",
  social: "pfc:social-v1",
  cmsDraft: "pfc:cms-draft-v1",
  role: "pfc:last-role-v1",
  applicationDraft: "pfc:application-draft-v1",
} as const;

export type StateKey = (typeof stateKeys)[keyof typeof stateKeys];

export const serverStateKeys: StateKey[] = [
  stateKeys.checklist,
  stateKeys.hours,
  stateKeys.funds,
  stateKeys.projects,
  stateKeys.consents,
  stateKeys.tasks,
  stateKeys.announcements,
  stateKeys.claims,
  stateKeys.applications,
  stateKeys.mentors,
  stateKeys.mentorRequests,
  stateKeys.social,
  stateKeys.cmsDraft,
];

export const publicStateKeys: StateKey[] = [stateKeys.tasks, stateKeys.announcements];

export function isServerStateKey(key: string): boolean {
  return (serverStateKeys as string[]).includes(key);
}

/**
 * Completed chapter work that predates the portal record.
 *
 * These are confirmed totals supplied by the chapter, not demo data. They are
 * merged into the public record so completed work is not lost while the portal
 * starts empty. Do not enter the same work again as a new portal record.
 */
export type ConfirmedChapterWork = {
  toysMade: number;
  toyValue: number;
  fundsRaised: number;
  projectsApproved: number;
  note: string;
};

export const confirmedChapterWork: Record<string, ConfirmedChapterWork> = {
  frisco: {
    toysMade: 85,
    toyValue: 1550,
    fundsRaised: 400,
    projectsApproved: 1,
    note: "Confirmed completed work from Frisco Paws at Lebanon Trail High School.",
  },
};

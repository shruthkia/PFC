/**
 * Real, usable starting documents for the chapter resource library.
 *
 * These are plain-text templates so the download buttons produce an actual
 * file instead of a "demo" toast. Chapters can copy them into Docs or Word.
 */

export const resourceFiles: Record<string, { filename: string; body: string }> = {
  r1: {
    filename: "pfc-first-meeting-agenda.txt",
    body: `PAWSFORCAUSE: FIRST CHAPTER MEETING AGENDA
Length: 45 minutes. Goal: leave with a first project and a next meeting date.

1. Welcome and why we exist (5 min)
   - One sentence: students doing documented work for local animals.
   - Say the chapter is not official until registration and school approval are done.

2. Introductions (10 min)
   - Name, grade, one animal-welfare issue you actually care about.

3. Officer roles (10 min)
   - President, Operations/VP, Outreach, Events/Service, Fundraising.
   - Fill every role or write "open" next to it. Open is allowed.

4. Pick a first project (15 min)
   - Choose one: shelter support day, scrap-to-toy night, wishlist drive,
     responsible-adoption talk.
   - Name the shelter or beneficiary before you leave the room.

5. Logistics (5 min)
   - Faculty advisor check-in, meeting cadence, where officers talk.
   - Parent consent needs for any off-campus work.

6. Close
   - Next meeting date, who emails the shelter, who files the project doc.

AFTER THE MEETING
[ ] Faculty advisor confirms the meeting happened
[ ] First project added in the chapter hub
[ ] Launch checklist updated
`,
  },
  r2: {
    filename: "pfc-chapter-bylaws-template.txt",
    body: `PAWSFORCAUSE CHAPTER BYLAWS (TEMPLATE)
Replace bracketed text. Keep it short enough that members will read it.

ARTICLE I: NAME
The name of this organization is [School] PawsForCause, a chapter of the
PawsForCause student animal-welfare network.

ARTICLE II: PURPOSE
The chapter supports local shelters, rescues, and responsible adoption through
documented service, education, and supply or fundraising projects. The chapter
does not handle animal rescue, transport, or medical decisions.

ARTICLE III: MEMBERSHIP
Membership is open to students at [School] who follow school rules and the PFC
Code of Conduct. No dues beyond [amount, or "none"]. Membership does not
require owning a pet.

ARTICLE IV: OFFICERS
President, Operations/VP, Outreach, Events/Service, and Fundraising/Partnerships.
Term: [one school year]. Elections: [month]. Vacancies are filled by chapter vote.

ARTICLE V: FACULTY ADVISOR
A school-approved faculty advisor must be named at all times. The advisor
receives meeting notices and reviews off-campus activity plans.

ARTICLE VI: MEETINGS
The chapter meets [cadence] during the school year. A quorum is [number].

ARTICLE VII: FINANCES
All funds are raised for a named shelter, rescue, or supply list. The treasurer
or president keeps receipts. No fundraiser goes live without HQ review.

ARTICLE VIII: SAFETY
School, shelter, and guardian rules take priority. Off-campus work requires the
school's permission process and parent/guardian consent. Photos of minors need
permission before publication.

ARTICLE IX: AMENDMENTS
Amendments pass by [two-thirds] vote with the advisor informed.

Adopted on [date] by [chapter name].
`,
  },
  r3: {
    filename: "pfc-shelter-outreach-email.txt",
    body: `SUBJECT: High school chapter looking for a small, completable task

Hi [name],

I'm [your name], president of [School] PawsForCause, a student animal-welfare
chapter. We are looking for one concrete job we can finish well rather than a
general tour.

What we can offer:
- [number] students for [hours] hours on [weekday options]
- Adult supervision from [advisor name] and the school's volunteer process
- Supplies for tasks like sorting donations or making enrichment toys
- A short write-up and photos (no animal or student faces without permission)

What would help us most is a task with a clear finish line, for example:
- sorting donated towels or newspapers by size
- assembling adoption welcome packets
- cutting fabric for enrichment toys
- labeling wishlist bins

Could we book a 20-minute call or a first shift in the next few weeks? If a
different task is more useful, we will take that instead.

Thank you,
[your name] · [School] PawsForCause
[email] · [phone, optional]
Faculty advisor: [name, email]
`,
  },
  r4: {
    filename: "pfc-scrap-to-toy-workshop-guide.txt",
    body: `SCRAP-TO-TOY WORKSHOP GUIDE
Goal: turn clean fabric scraps into safe enrichment toys for a named shelter.

BEFORE THE DAY
[ ] Shelter confirmed the toy style and quantity they want
[ ] Donation source agreed (fashion department, family fabric, thrift offcuts)
[ ] Advisor and room booked; scissors counted
[ ] Nothing includes buttons, zippers, wire, or loose plastic

MATERIALS
- Clean cotton or fleece strips, 2-4 cm wide, 30-60 cm long
- Scissors, cutting mats if available
- Optional: clean tennis balls, cardboard cores (shelter approval first)

STEPS (2 hours, 10-20 students)
1. Sort fabric: clean and solid only. Set aside anything stretchy or frayed.
2. Cut strips. Keep one color per bin so the braid is easy to inspect.
3. Braid tightly, tie a double knot, trim loose threads.
4. Inspect every toy: no staples, no small parts, no exposed filling.
5. Count, bag by size, label with the date and fabric type.

SAFETY
- Supervise cutting; no rotary cutters unless the school allows them.
- Wash hands; dust masks if the fabric is dusty.
- Shelters may decline certain fabrics. Their call wins.

AFTER
- Deliver in a closed bag with a count sheet.
- Log the activity and hours in the chapter hub, attaching the count sheet.
- Ask the shelter for one sentence of feedback for the impact report.
`,
  },
  r5: {
    filename: "pfc-hallway-flyer-copy.txt",
    body: `HALLWAY FLYER COPY: pick one, keep the QR/date accurate

VERSION A: ADOPTION
Headline: A pet is a 10-year decision, not a surprise.
Body: Shelters are full of animals who were bought on impulse. Meet the animal,
ask about behavior and medical history, and make sure your home can keep them.
Line: Adopt deliberately. Sterilize your pets.
Footer: [School] PawsForCause · [meeting day] in [room]

VERSION B: STERILIZATION
Headline: One litter is cute. Six hundred thousand is not.
Body: Sterilization prevents litters that shelters cannot place. Ask a vet about
timing and cost before you bring home a pet.
Line: Fix your pets. Fund the fix for someone who cannot.
Footer: [School] PawsForCause · [meeting day] in [room]

VERSION C: VOLUNTEER
Headline: Two hours. Real tasks. No sad-puppy photos required.
Body: Our chapter sorts supplies, makes enrichment toys, and runs supply drives
for [shelter name]. Come to one meeting and pick a job.
Footer: [School] PawsForCause · [meeting day] in [room]

PRINT NOTES
- 8.5x11 in, one message per flyer, body text at least 18 pt.
- Use school-approved locations only; remove flyers after the event.
- Do not use shelter animal photos without written permission.
`,
  },
  r6: {
    filename: "pfc-parent-consent-packet.txt",
    body: `PAWSFORCAUSE OFF-CAMPUS ACTIVITY: PARENT/GUARDIAN CONSENT
This is a template. Your school's own form wins wherever it is stricter.

STUDENT
Name: ______________________  Grade: ______  Date of birth: __________
School: ____________________  Chapter: _____________________________

ACTIVITY
What: _____________________________________________________________
Where: ____________________________________________________________
Date and time: ____________________________________________________
Supervising adult: ______________________  Phone: __________________
Transport: [ ] school bus  [ ] parent drop-off  [ ] approved carpool

WHAT STUDENTS WILL DO
Sort donations, assemble packets, make enrichment toys, clean common areas, or
other tasks confirmed by the shelter. Students will not handle animals, perform
medical care, or transport animals unless the shelter and school approve it in
writing for this specific activity.

RISKS DISCUSSED
Animal allergies, bending and lifting, sharp tools for craft tasks, and travel.

CONSENT
I give permission for my student to take part in the activity above.
I understand I can ask questions or withdraw permission before the activity.

Guardian name: ______________________________
Signature: __________________________________  Date: ____________
Phone: ______________________  Email: _____________________________

EMERGENCY CONTACT (if different): ______________________ Phone: ________

RETURN TO
[advisor name] at [school] by [date]. Students without a signed form do not
travel with the group.
`,
  },
  r7: {
    filename: "pfc-hour-logging-guide.txt",
    body: `HOW HOURS GET LOGGED AND VERIFIED

WHAT COUNTS
- Shelter and rescue shifts arranged through the chapter
- Chapter events: toy nights, supply drives, education tables, fundraisers
- Work the chapter actually used: flyers, graphics, research, outreach lists
- Representing PFC at a school or community event
- Educational pet content the chapter published

WHAT DOES NOT COUNT
- Scrolling, reposting without context, or personal pet photos with no purpose
- Time someone else did on your behalf
- Anything that breaks school, shelter, or safety rules

HOW TO LOG (student)
1. Chapter hub → Service hours → Log hours.
2. Enter the date, activity, hours in 0.25 increments, and a specific note.
3. Attach proof: a supervisor email, a count sheet, or photos with permission.
4. Submit. Status becomes "Advisor review".

HOW VERIFICATION WORKS
- The faculty advisor checks attendance and proof, then signs off.
- Only verified hours appear on certificates and count toward network totals.
- Missing proof is the most common reason a log is sent back. Add a name and
  contact for the supervising adult.

HOUSE RULES
- Log within one week of the activity.
- Do not round up. 3 hours is 3, not 4.
- One log per activity, not per photo.
- If you are unsure whether something counts, ask before you log it.
`,
  },
  r8: {
    filename: "pfc-fashion-partnership-one-pager.txt",
    body: `FASHION DEPARTMENT x PAWSFORCAUSE: ONE PAGE

THE IDEA
Fashion classes already generate fabric offcuts. Local shelters need washable
enrichment toys. We connect the two in one supervised workshop.

WHAT THE FASHION DEPARTMENT PROVIDES
- Clean cotton, fleece, or denim offcuts (no buttons, zippers, or interfacing)
- A classroom or studio for a 2-hour session
- One faculty contact for scheduling and safety

WHAT THE PFC CHAPTER PROVIDES
- Student volunteers, scissors, and cutting mats
- A confirmed shelter request and delivery plan
- Documentation: count, photos with permission, and the impact report

WHAT STUDENTS LEARN
- Material sorting and basic construction
- How shelters use enrichment to reduce stress
- Why adoption and sterilization messaging matters

TIMELINE
Week 1: agree on fabric types and a date
Week 2: collect and sort scraps; confirm shelter need
Week 3: workshop and toy inspection
Week 4: delivery, photos, and report filed

CONTACT
[chapter president] · [email]
Faculty advisor: [name] · [email]
PawsForCause: hello@pawsforcause.org
`,
  },
};

export function resourceSizeKb(id: string) {
  const file = resourceFiles[id];
  if (!file) return "";
  return `${Math.max(1, Math.ceil(file.body.length / 1024))} KB`;
}

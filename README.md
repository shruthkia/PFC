# PawsForCause

Public site for **PFC (PawsForCause)**, a student-led animal-welfare network. High school chapters run shelter support, adoption education, and community projects, then report the work.

## Pages

- `/` Home
- `/about` Mission, HQ, Adopurr, public claim rules
- `/start` Chapter path, 30-day launch, roles, Active standard
- `/work` Projects, volunteer hours, fundraising, member value
- `/faq` The questions founders ask before they apply
- `/apply` Redirects to the approved Google Form
- `/directory` Chapter directory and real OpenStreetMap map
- `/impact` Network totals, progress bars, announcements
- `/impact/report` Printable semester report (school board, shelter, grant packet)
- `/leaderboard` Inter-chapter rankings
- `/adopt` Shelter mini-task board
- `/shelter` Shelter partner portal
- `/portal` Chapter hub (checklist, hours, funds, projects, consent, certificates)
- `/advisor` Advisor verification desk
- `/admin` National admin desk (claims, Active Standard, CMS, reports)
- `/alumni` Alumni mentor directory
- `/login` Sign in to the chapter workspace
- `/contact` Role-based contact channels
- `/safety`, `/conduct`, `/privacy`, `/cookies`, `/terms`, `/accessibility`: trust and legal pages
- `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest`, `/opengraph-image`: generated metadata

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317).

## Checks

```bash
npm run lint
npm run build
```

## Notes

- Design system lives in `src/app/globals.css` (cream paper, dusty rose, gingham, scallops, sticker cards). Display type is Bricolage Grotesque, accents are Shantell Sans, body copy is Figtree.
- Brand and contact details come from `src/lib/config.ts`; set `NEXT_PUBLIC_SITE_URL` for canonical URLs and metadata.
- Accounts use email and password with scrypt hashing, server-side sessions in an HttpOnly cookie, and a one-time recovery code for password resets. Workspace records are stored in Postgres when `DATABASE_URL` is set, or in the local SQLite file at `.data/pawsforcause.db` for development, and shared by students, advisors, and organizers; the browser keeps an offline copy under `pfc:` keys.
- Confirmed chapter work completed before the portal is stored in `src/lib/confirmed-work.ts` and merged into public totals. Do not enter the same work again as a new portal record.
- For a hosted deployment, set `DATABASE_URL` to a Postgres connection string. Use the pooled connection string when the provider offers one. The app creates its tables on first request. Without `DATABASE_URL`, it uses the local SQLite file at `.data/pawsforcause.db`; set `PFC_DATABASE_PATH` to move that file. Before a public launch, add verified email plus role approval.
- Chapter applications are collected only through the approved Google Form. The native application form and its API were removed from the live path.
- Real outputs work without external services: resource templates download as files, and the practice certificate and impact report print from the browser. Nothing is emailed or sent to a school, shelter, or national program.

Primary CTA: the live [chapter interest form](https://docs.google.com/forms/d/e/1FAIpQLSftTTnp2gOjve20xRyvtBdNwr7hclFw8jJgq4vW5q9Ub9sc0w/viewform).

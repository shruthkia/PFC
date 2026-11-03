import Link from "next/link";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function LegalPage({
  eyebrow,
  title,
  intro,
  sections,
  effective = "November 1, 2026",
}: {
  eyebrow: string;
  title: string;
  intro: string;
  sections: LegalSection[];
  effective?: string;
}) {
  return (
    <article className="paper-grid px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1100px]">
        <header className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 text-balance font-display text-4xl font-extrabold tracking-tight text-cocoa sm:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-muted">{intro}</p>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.14em] text-cocoa">
            Effective {effective}
          </p>
        </header>

        <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr]">
          <nav aria-label={`On this page: ${title}`} className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[1.5rem] border-2 border-border bg-surface p-5">
              <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-rose">On this page</p>
              <ol className="mt-3 space-y-2">
                {sections.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${slugify(section.title)}`}
                      className="block py-1 text-sm font-semibold text-muted underline-offset-4 hover:text-rose hover:underline"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-5">
            {sections.map((section) => (
              <section
                key={section.title}
                id={slugify(section.title)}
                className="scroll-mt-24 rounded-[1.5rem] border-2 border-border bg-surface p-6 shadow-sketch sm:p-8"
              >
                <h2 className="font-display text-2xl font-extrabold text-cocoa">{section.title}</h2>
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph} className="mt-3 leading-7 text-muted">
                    {paragraph}
                  </p>
                ))}
                {section.bullets ? (
                  <ul className="mt-4 space-y-2.5 leading-7 text-muted">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-rose" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}

            <aside className="rounded-[1.5rem] border-2 border-border bg-blush/70 p-6 text-sm leading-6 text-cocoa">
              <p className="font-extrabold">Questions about this page?</p>
              <p className="mt-2">
                Email{" "}
                <a
                  href="mailto:hello@pawsforcause.org"
                  className="font-bold underline decoration-2 underline-offset-2 hover:text-rose"
                >
                  hello@pawsforcause.org
                </a>
                . For a safety concern, contact a trusted adult and local emergency services first, then{" "}
                <a
                  href="mailto:safety@pawsforcause.org"
                  className="font-bold underline decoration-2 underline-offset-2 hover:text-rose"
                >
                  safety@pawsforcause.org
                </a>
                .
              </p>
            </aside>

            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/" className="button-paper">
                Return home
              </Link>
              <Link href="/contact" className="button-paper">
                Contact the team
              </Link>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

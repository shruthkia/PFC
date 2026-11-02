import Link from "next/link";

export type LegalSection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

export function LegalPage({ eyebrow, title, intro, sections }: { eyebrow: string; title: string; intro: string; sections: LegalSection[] }) {
  return (
    <article className="bg-cream px-5 pb-24 pt-32 sm:px-10">
      <header className="mx-auto max-w-3xl border-b-2 border-cocoa/20 pb-10">
        <p className="eyebrow w-fit">{eyebrow}</p>
        <h1 className="mt-5 max-w-full font-display text-3xl font-extrabold leading-tight tracking-tight text-cocoa [overflow-wrap:anywhere] sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-ink/70">{intro}</p>
        <p className="mt-5 text-xs font-black uppercase tracking-[.14em] text-cocoa/50">Effective November 1, 2026</p>
      </header>
      <div className="mx-auto mt-10 max-w-3xl space-y-10">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-display text-2xl font-black text-cocoa">{section.title}</h2>
            {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-3 leading-7 text-ink/70">{paragraph}</p>)}
            {section.bullets && (
              <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-ink/70">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            )}
          </section>
        ))}
        <aside className="rounded-2xl border-2 border-cocoa bg-blush/50 p-5 text-sm leading-6 text-cocoa">
          Questions about this page? Contact the PawsForCause national team through the contact method listed on the organization’s official channels. For immediate safety concerns, contact a trusted adult or local emergency service.
        </aside>
        <Link href="/" className="button-paper">Return home</Link>
      </div>
    </article>
  );
}

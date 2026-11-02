"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, PawPrint } from "lucide-react";
import { Panel, StatusPill } from "@/components/platform/ui";
import { adoptableAnimals } from "@/lib/platform-data";

export function AdoptionFeed() {
  const [species, setSpecies] = useState("All");
  const speciesOptions = useMemo(
    () => ["All", ...Array.from(new Set(adoptableAnimals.map((animal) => animal.species)))],
    [],
  );
  const animals =
    species === "All" ? adoptableAnimals : adoptableAnimals.filter((animal) => animal.species === species);

  return (
    <div className="paper-grid min-h-screen px-5 pb-24 pt-28 sm:px-10">
      <div className="mx-auto max-w-[1250px]">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-black text-cocoa/65 hover:text-rose">
          <ArrowLeft className="h-4 w-4" /> Public site
        </Link>
        <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow w-fit">Shelter partners</p>
            <h1 className="mt-4 font-display text-5xl font-black tracking-tight text-cocoa">Adoption partner feed</h1>
            <p className="mt-3 max-w-2xl text-ink/65">
              Adoptable animals from local shelter partners — a public widget chapters can also embed on outreach pages.
            </p>
          </div>
          <StatusPill tone="warn">Demo feed · not a live rescue API</StatusPill>
        </div>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by species">
          {speciesOptions.map((option) => (
            <button
              key={option}
              type="button"
              role="tab"
              aria-selected={species === option}
              onClick={() => setSpecies(option)}
              className={`rounded-full border-2 border-cocoa px-4 py-2 text-sm font-black ${
                species === option ? "bg-rose text-white shadow-[3px_3px_0_#6e493b]" : "bg-white text-cocoa"
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {animals.map((animal) => (
            <article key={animal.id} className="sticker-card overflow-hidden bg-white p-0">
              <div
                className={`relative grid h-44 place-items-center border-b-2 border-cocoa ${
                  animal.species === "Dog"
                    ? "bg-[#f4e3a6]"
                    : animal.species === "Cat"
                      ? "bg-[#f6d8e1]"
                      : "bg-[#cfe1d2]"
                }`}
              >
                <PawPrint className="h-16 w-16 fill-cocoa/15 text-cocoa/25" aria-hidden />
                <span className="absolute left-4 top-4 rounded-full border-2 border-cocoa bg-white px-3 py-1 text-xs font-black text-cocoa">
                  {animal.species}
                </span>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-2xl font-black text-cocoa">{animal.name}</h2>
                    <p className="mt-1 text-sm text-cocoa/60">
                      {animal.age} · {animal.shelter}
                    </p>
                  </div>
                  <StatusPill tone="info">{animal.tag}</StatusPill>
                </div>
                <p className="mt-4 text-sm font-bold text-cocoa/75">{animal.temperament}</p>
                <a
                  href="https://www.austintexas.gov/department/austin-animal-center"
                  target="_blank"
                  rel="noreferrer"
                  className="button-paper mt-5 inline-flex min-h-0 px-4 py-2 text-xs"
                >
                  View on partner site
                </a>
              </div>
            </article>
          ))}
        </div>

        <Panel tone="butter" className="mt-10">
          <h2 className="font-display text-2xl font-black text-cocoa">For chapter sites</h2>
          <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/65">
            Embed this feed on school club pages with a partner shelter ID. Live rescue API wiring is staged behind the
            demo data shown here so chapters can practice outreach before credentials are issued.
          </p>
        </Panel>
      </div>
    </div>
  );
}

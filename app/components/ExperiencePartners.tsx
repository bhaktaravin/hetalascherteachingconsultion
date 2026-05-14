import Image from "next/image";

import { partners, workLocations } from "@/lib/experienceContent";

export default function ExperiencePartners() {
  const hasLocations = workLocations.length > 0;
  const hasPartners = partners.length > 0;
  const hasLists = hasLocations || hasPartners;

  return (
    <section
      id="experience-partners"
      className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 sm:py-20"
      aria-labelledby="experience-partners-heading"
    >
      <div className="mx-auto max-w-5xl">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">
          Experience
        </p>
        <h2
          id="experience-partners-heading"
          className="mt-3 text-center font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-4xl"
        >
          Where she has worked & who she has partnered with
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-600">
          Highlights of regions and collaborations will be listed here as they are finalized for the site.
        </p>

        {hasLists ? (
          <div
            className={`mt-10 grid gap-10 ${hasLocations && hasPartners ? "md:grid-cols-2 md:gap-12" : ""}`}
          >
            {hasLocations ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Locations</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {workLocations.map((place, index) => (
                    <li
                      key={`${place}-${index}`}
                      className="rounded-full border border-gray-200 bg-[var(--color-brand-soft)] px-4 py-2 text-sm text-gray-800"
                    >
                      {place}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {hasPartners ? (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Partners</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {partners.map((partner, index) => (
                    <li
                      key={`${partner.name}-${index}`}
                      className="flex gap-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4 shadow-sm"
                    >
                      {partner.logoSrc ? (
                        <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-md border border-gray-200 bg-white">
                          <Image
                            src={partner.logoSrc}
                            alt={partner.name}
                            width={48}
                            height={48}
                            className="object-contain p-1"
                          />
                        </div>
                      ) : null}
                      <div className="min-w-0">
                        <p className="font-medium text-gray-900">{partner.name}</p>
                        {partner.detail ? <p className="mt-1 text-sm text-gray-600">{partner.detail}</p> : null}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : (
          <p className="mx-auto mt-10 max-w-2xl rounded-xl border border-dashed border-gray-300 bg-gray-50/80 p-6 text-center text-sm leading-relaxed text-gray-600">
            Specific locations and partner names are coming soon. In the meantime, see the overview of Hetal’s
            experience on this page, or get in touch from the contact form.
          </p>
        )}
      </div>
    </section>
  );
}

"use client";

import { useId, useState } from "react";

const focusAreas: {
  title: string;
  paragraphs: string[];
}[] = [
  {
    title: "Multilingual learner education",
    paragraphs: [
      "Workshops and coaching sessions focus on practical strategies for supporting multilingual learners across grade levels—from foundational language development to academic language in content-area classes.",
      "Professional learning in this area has taken place with teams in U.S. public school districts and with educator communities in British international schools across Asia, reflecting both domestic and international contexts.",
    ],
  },
  {
    title: "Teaching reading and writing for multilingual learners",
    paragraphs: [
      "Sessions emphasize evidence-aligned approaches to literacy instruction for multilingual learners, including scaffolding reading and writing in ways that honor students’ linguistic assets.",
      "Facilitation has reached educators working within varied curricula (including Common Core–aligned settings as well as IGCSE and IB programs), with workshops delivered both in the United States and internationally.",
    ],
  },
  {
    title: "Scaffolding instruction in mainstream classrooms",
    paragraphs: [
      "Offerings help classroom teachers adjust instruction so English learners can access grade-level content with appropriate supports—not simplified expectations, but deliberate scaffolding.",
      "This work has included onsite and virtual professional development with schools in the U.S. and with international faculties preparing to integrate language supports in mainstream courses.",
    ],
  },
  {
    title: "Hands-on professional learning for educators",
    paragraphs: [
      "Formats prioritize interaction: demonstrations, classroom-ready routines, and time to plan next steps so ideas translate quickly into practice.",
      "These engagements have served educator cohorts locally and abroad—from district-wide sessions in the United States to collaborative workshops with international school staff.",
    ],
  },
];

export default function FocusAreasAccordion() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Core Focus Areas</h2>
      <p className="mt-2 text-sm text-gray-600">
        Select a focus area to read about typical workshop themes and the kinds of settings where this work has taken place.
      </p>
      <ul className="mt-3 grid list-none gap-2 p-0 md:grid-cols-2">
        {focusAreas.map((area, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const triggerId = `${baseId}-trigger-${index}`;

          return (
            <li key={area.title} className="min-w-0">
              <div
                className={`rounded-lg border bg-[var(--color-brand-soft)] transition-colors ${
                  isOpen ? "border-[var(--color-brand)] shadow-sm" : "border-gray-200"
                }`}
              >
                <button
                  type="button"
                  id={triggerId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-gray-800 outline-none select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)]"
                >
                  <span>{area.title}</span>
                  <span
                    className={`shrink-0 text-[var(--color-brand)] transition-transform duration-200 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden
                  >
                    ▼
                  </span>
                </button>
                <section
                  id={panelId}
                  aria-labelledby={triggerId}
                  hidden={!isOpen}
                  className="space-y-2 border-t border-gray-200/90 px-4 pt-3 pb-4 text-sm leading-relaxed text-gray-600"
                >
                  {area.paragraphs.map((p, i) => (
                    <p key={`${area.title}-${i}`}>{p}</p>
                  ))}
                </section>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import FocusAreasAccordion from "./FocusAreasAccordion";

export default function About() {
  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm">
          About
        </p>
        <h1 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-5xl">
          Meet Hetal Ascher
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
          Professional development and coaching for schools and educators supporting multilingual learners.
        </p>

        <div className="mt-8 rounded-xl border border-gray-200 bg-gray-50/80 p-5 sm:p-6">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Credentials</h2>
          <div className="mt-4 grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">
                Education & licensure
              </h3>
              <ul className="mt-2 list-none space-y-2 p-0 text-sm leading-relaxed text-gray-700">
                <li>B.A., English as a Second Language Education</li>
                <li>Minnesota K–12 ESL Teaching License</li>
                <li>M.A., ESL Education</li>
                <li>
                  Doctoral candidate, Curriculum and Instruction — University of Wisconsin–Madison
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">Roles</h3>
              <ul className="mt-2 list-none space-y-2 p-0 text-sm leading-relaxed text-gray-700">
                <li>English learner teacher</li>
                <li>Sheltered content language arts teacher</li>
                <li>Reading interventionist</li>
                <li>Instructional coach</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
              <Image
                src="/about-profile.webp"
                alt="Hetal Ascher, educational consultant specializing in multilingual learner education and professional development."
                width={1200}
                height={1500}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-6 text-gray-700">
            <p className="leading-relaxed">
              Hetal Ascher is a specialist in multilingual learner education and professional development.
            </p>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">Experience</p>
              <p className="mt-2 leading-relaxed">
                Her experience spans elementary, middle, and high school settings, including roles as an English
                learner teacher, sheltered content language arts teacher, reading interventionist, and instructional coach.
                She has worked across both U.S. public schools and British international schools in Asia, with
                experience in Common Core, IGCSE, and IB curricula.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gray-500">
                Workshops & professional learning
              </p>
              <p className="mt-2 leading-relaxed">
                Over the years, Hetal has led workshops for educators around the world on topics such as teaching reading
                for multilingual learners, scaffolding writing, and supporting English learners in mainstream classrooms.
                Her sessions are practical, engaging, and immediately applicable.
              </p>
            </div>
          </div>
        </div>

        <FocusAreasAccordion />

        <div className="mt-10 border-t border-gray-200 pt-10">
          <div className="rounded-xl border border-[var(--color-brand)]/15 bg-[var(--color-brand-soft)] p-6 sm:flex sm:items-center sm:justify-between sm:gap-8 sm:p-8">
            <div className="max-w-xl">
              <p className="font-serif text-lg font-semibold text-[var(--color-brand)] sm:text-xl">
                Planning PD, coaching, or schoolwide support?
              </p>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">
                Reach out to discuss your school, district, or team.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-flex min-h-11 shrink-0 items-center justify-center rounded-lg bg-[var(--color-brand)] px-6 py-3 text-center text-sm font-medium text-white transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-brand)] sm:mt-0"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


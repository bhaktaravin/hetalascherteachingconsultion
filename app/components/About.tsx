import Image from "next/image";

const expertise = [
  "Multilingual learner education",
  "Teaching reading and writing for multilingual learners",
  "Scaffolding instruction in mainstream classrooms",
  "Hands-on professional learning for educators",
];

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

        <div className="mt-6 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-start">
          <div className="mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-sm">
              <Image
                src="/about-profile.webp"
                alt="Portrait for About section"
                width={1200}
                height={1500}
                className="h-full w-full object-cover"
                priority
              />
            </div>
          </div>

          <div className="space-y-4 text-gray-700">
            <p>
              Hetal Ascher is a specialist in multilingual learner education and professional development.
              She holds a B.A. in English as a Second Language Education, a Minnesota K-12 ESL Teaching
              License, and an M.A. in ESL Education. She is currently pursuing a doctorate at the University
              of Wisconsin-Madison in Curriculum and Instruction.
            </p>
            <p>
              Her experience spans elementary, middle, and high school settings, including roles as an English
              learner teacher, sheltered content language arts teacher, reading interventionist, and instructional coach.
              She has worked across both U.S. public schools and British international schools in Asia, with
              experience in Common Core, IGCSE, and IB curricula.
            </p>
            <p>
              Over the years, Hetal has led workshops for educators around the world on topics such as teaching reading
              for multilingual learners, scaffolding writing, and supporting English learners in mainstream classrooms.
              Her sessions are practical, engaging, and immediately applicable.
            </p>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">Core Focus Areas</h2>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {expertise.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-gray-200 bg-[var(--color-brand-soft)] px-4 py-3 text-sm text-gray-800"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}


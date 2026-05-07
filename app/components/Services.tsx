const services = [
  {
    title: "Workshops for Schools",
    description:
      "Hands-on professional learning sessions with practical strategies educators can use immediately.",
  },
  {
    title: "Instructional Coaching",
    description:
      "Targeted coaching for teachers and leaders to strengthen inclusive and language-rich instruction.",
  },
  {
    title: "Multilingual Learner Support",
    description:
      "Custom plans that help schools better serve multilingual learners across classrooms and grade levels.",
  },
];

export default function Services() {
  return (
    <section className="border-t border-gray-200 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm reveal-up">
            Services
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-[var(--color-brand)] sm:text-4xl reveal-up reveal-delay-1">
            Support Designed for Real Classrooms
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-gray-700 reveal-up reveal-delay-2">
            Collaborative consulting focused on practical outcomes for educators, schools, and multilingual learners.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className={`rounded-2xl border border-gray-200 bg-[var(--color-brand-soft)] p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md reveal-up ${
                index === 0 ? "reveal-delay-1" : index === 1 ? "reveal-delay-2" : "reveal-delay-3"
              }`}
            >
              <h3 className="font-serif text-2xl font-semibold text-[var(--color-brand)]">
                {service.title}
              </h3>
              <p className="mt-3 leading-relaxed text-gray-700">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

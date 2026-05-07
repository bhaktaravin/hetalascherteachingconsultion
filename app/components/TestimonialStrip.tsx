export default function TestimonialStrip() {
  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 reveal-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm reveal-up">
          Educator Feedback
        </p>
        <blockquote className="mt-4 font-serif text-2xl leading-relaxed text-[var(--color-brand)] sm:text-3xl reveal-up reveal-delay-1">
          "It was a useful course with good pacing, lots of new techniques that are implementable, and the trainer was a supportive professional learning leader."
        </blockquote>
        <p className="mt-5 text-sm font-semibold text-gray-900 reveal-up reveal-delay-2">Adam Deshpande</p>
        <p className="text-sm text-gray-600 reveal-up reveal-delay-3">United World College Singapore</p>
      </div>
    </section>
  );
}

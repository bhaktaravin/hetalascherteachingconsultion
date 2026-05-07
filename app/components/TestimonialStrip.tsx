export default function TestimonialStrip() {
  const stars = Array.from({ length: 5 });

  return (
    <section className="bg-gray-50 px-4 py-14 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10 reveal-up">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 sm:text-sm reveal-up">
          Educator Feedback
        </p>
        <div className="mt-4 inline-flex items-center gap-3 rounded-full border border-amber-200 bg-amber-50 px-4 py-2 reveal-up">
          <span className="text-sm font-semibold text-amber-800">5.0</span>
          <div className="flex items-center gap-1">
            {stars.map((_, index) => (
              <svg
                key={index}
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                className="h-4 w-4 text-amber-500"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.09 3.353a1 1 0 00.95.69h3.525c.969 0 1.371 1.24.588 1.81l-2.852 2.072a1 1 0 00-.364 1.118l1.09 3.353c.3.922-.755 1.688-1.539 1.118l-2.852-2.072a1 1 0 00-1.176 0l-2.852 2.072c-.783.57-1.838-.196-1.539-1.118l1.09-3.353a1 1 0 00-.364-1.118L2.896 8.78c-.783-.57-.38-1.81.588-1.81h3.525a1 1 0 00.95-.69l1.09-3.353z" />
              </svg>
            ))}
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-700">
            Verified Feedback
          </span>
        </div>
        <blockquote className="mt-4 font-serif text-2xl leading-relaxed text-[var(--color-brand)] sm:text-3xl reveal-up reveal-delay-1">
          &ldquo;It was a useful course with good pacing, lots of new techniques that are implementable, and the
          trainer was a supportive professional learning leader.&rdquo;
        </blockquote>
        <p className="mt-5 text-sm font-semibold text-gray-900 reveal-up reveal-delay-2">Adam Deshpande</p>
        <p className="text-sm text-gray-600 reveal-up reveal-delay-3">United World College Singapore</p>
      </div>
    </section>
  );
}

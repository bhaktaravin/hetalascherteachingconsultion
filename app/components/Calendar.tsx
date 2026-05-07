export default function CalendarBooking() {
    return (
<section className="border-t border-gray-200 bg-white px-4 py-14 text-center sm:px-6 sm:py-16">
  <div className="mx-auto max-w-3xl rounded-2xl border border-gray-200 bg-[var(--color-brand-soft)] p-6 shadow-sm sm:p-8 reveal-up">
  <h2 className="text-3xl font-semibold text-[var(--color-brand)] reveal-up">
    Book a Consultation
  </h2>

  <p className="mb-6 mt-2 text-gray-600 reveal-up reveal-delay-1">
    Schedule a time that works for you.
  </p>

  <a
    href="https://calendly.com/your-name"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[var(--color-brand)] px-6 py-3 text-white transition hover:opacity-90 sm:w-auto reveal-up reveal-delay-2"
  >
    Schedule on Calendly
  </a>
  </div>
</section>
    );
}
export default function ContactForm() {
    return (
<section className="px-4 py-12 sm:px-6 sm:py-20">
<div className="mx-auto max-w-5xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
<div className="mb-12 text-center">
  <p className="text-sm tracking-widest text-gray-500 uppercase">
    Get in Touch
  </p>

  <h1 className="mt-3 text-3xl font-serif font-bold text-[var(--color-brand)] sm:text-5xl">
    Contact Me
  </h1>

  <p className="mt-4 text-gray-600 max-w-xl mx-auto">
    I’m here to answer your questions and help you create a plan that works for you.
  </p>
</div>

       <form className="mx-auto max-w-3xl space-y-5">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <input
      placeholder="First Name"
      className="min-h-11 rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
    />

    <input
      placeholder="Last Name"
      className="min-h-11 rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
    />
  </div>

  <input
    placeholder="Email Address"
    className="min-h-11 w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
  />

  <textarea
    placeholder="Message"
    rows={6}
    className="w-full rounded-lg border border-gray-300 p-3 text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)]"
  />

  <button
    className="min-h-11 w-full rounded-lg bg-[var(--color-brand)] py-3 font-medium text-white
    hover:opacity-90 transition"
  >
    Send Message
  </button>
</form>

</div>
</section>

    );
}
import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-gray-50 px-4 py-10 sm:px-6 sm:py-12">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="reveal-up">
          <p className="max-w-sm text-sm leading-relaxed text-gray-700">
            Helping schools and multilingual learners thrive.
          </p>
        </div>

        <div className="reveal-up reveal-delay-1">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            Explore
          </h4>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/" className="text-gray-800 transition hover:text-[var(--color-brand)]">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 transition hover:text-[var(--color-brand)]">
              About
            </Link>
            <Link href="/contact" className="text-gray-800 transition hover:text-[var(--color-brand)]">
              Contact
            </Link>
          </div>
        </div>

        <div className="reveal-up reveal-delay-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            Connect
          </h4>
          <a
            className="mt-4 inline-flex text-gray-800 transition hover:text-[var(--color-brand)]"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl items-center justify-between border-t border-gray-200 pt-5 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Hetal Ascher. All rights reserved.</p>
        <span>Built with care.</span>
      </div>
    </footer>
  );
}

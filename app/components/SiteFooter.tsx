import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white px-4 py-12 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div className="reveal-up">
          <h3 className="font-serif text-2xl font-semibold text-[var(--color-brand)]">
            Hetal Ascher Consulting
          </h3>
          <p className="mt-3 max-w-sm text-gray-700">
            Educational consulting that helps schools and educators support multilingual learners with confidence.
          </p>
        </div>

        <div className="reveal-up reveal-delay-1">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            Quick Links
          </h4>
          <div className="mt-4 flex flex-col gap-2">
            <Link href="/" className="text-gray-800 hover:text-[var(--color-brand)]">
              Home
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-[var(--color-brand)]">
              About
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-[var(--color-brand)]">
              Blog
            </Link>
            <Link href="/contact" className="text-gray-800 hover:text-[var(--color-brand)]">
              Contact
            </Link>
          </div>
        </div>

        <div className="reveal-up reveal-delay-2">
          <h4 className="text-sm font-semibold uppercase tracking-[0.15em] text-gray-500">
            Connect
          </h4>
          <a
            className="mt-4 inline-flex text-gray-800 hover:text-[var(--color-brand)]"
            href="https://www.linkedin.com"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>

      <p className="mx-auto mt-10 max-w-6xl text-sm text-gray-500">
        © {new Date().getFullYear()} Hetal Ascher Consulting. All rights reserved.
      </p>
    </footer>
  );
}

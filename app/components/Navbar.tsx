 "use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
]



export default function Navbar(){
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const closeMenu = () => setIsOpen(false);
    return (
        <header className="sticky top-0 z-30 w-full border-b border-gray-200/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto max-w-6xl px-3 py-3 sm:px-8">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center rounded-md px-2 font-serif text-lg font-semibold text-[var(--color-brand)]"
          >
            Hetal Ascher Consulting
          </Link>

          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border border-gray-300 px-3 text-gray-900 md:hidden"
            aria-expanded={isOpen}
            aria-controls="mobile-nav-links"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="text-xl leading-none">{isOpen ? "x" : "="}</span>
          </button>
        </div>

        <div className="mt-2 hidden items-center gap-8 md:flex">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-md px-2 text-base font-medium transition ${
                  isActive
                    ? "text-[var(--color-brand)] underline underline-offset-8"
                    : "text-gray-900 hover:text-[var(--color-brand)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {isOpen && (
          <div id="mobile-nav-links" className="mt-2 border-t border-gray-200 pt-2 md:hidden">
            <div className="flex flex-col">
              {links.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-flex min-h-11 items-center rounded-md px-2 text-base font-medium transition ${
                      isActive
                        ? "text-[var(--color-brand)]"
                        : "text-gray-900 hover:text-[var(--color-brand)]"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </nav>
    </header>
    );
}
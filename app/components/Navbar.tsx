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
    const [useOverlayStyle, setUseOverlayStyle] = useState(() => {
      if (typeof window === "undefined") {
        return true;
      }
      return window.localStorage.getItem("homeNavStyle") !== "classic";
    });
    const isHome = pathname === "/";
    const showBrandTitle = pathname !== "/";
    const homeUsesOverlay = isHome && useOverlayStyle;

    const closeMenu = () => setIsOpen(false);

    const toggleHomeNavStyle = () => {
      setUseOverlayStyle((current) => {
        const next = !current;
        window.localStorage.setItem("homeNavStyle", next ? "overlay" : "classic");
        return next;
      });
    };

    return (
        <header
          className={`sticky top-0 z-30 w-full backdrop-blur ${
            homeUsesOverlay
              ? "border-b border-white/20 bg-black/30"
              : "border-b border-gray-200/80 bg-white/95"
          }`}
        >
      <nav className="mx-auto max-w-6xl px-3 py-3 sm:px-8">
        <div className={`flex items-center ${showBrandTitle ? "justify-between" : "justify-end md:justify-center"}`}>
          {showBrandTitle && (
            <Link
              href="/"
              className="inline-flex min-h-11 items-center rounded-md px-2 font-serif text-lg font-semibold text-[var(--color-brand)]"
            >
              Hetal Ascher Consulting
            </Link>
          )}

          <button
            type="button"
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-md border px-3 md:hidden ${
              homeUsesOverlay ? "border-white/60 text-white drop-shadow-sm" : "border-gray-300 text-gray-900"
            }`}
            aria-expanded={isOpen}
            aria-controls="mobile-nav-links"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen((open) => !open)}
          >
            <span className="text-xl leading-none">{isOpen ? "x" : "="}</span>
          </button>
        </div>

        {isHome && (
          <div className="mt-1 hidden md:flex md:justify-end">
            <button
              type="button"
              onClick={toggleHomeNavStyle}
              className={`rounded-md border px-3 py-1 text-xs font-semibold uppercase tracking-wide transition ${
                homeUsesOverlay
                  ? "border-white/60 text-white drop-shadow-sm hover:bg-white/10"
                  : "border-gray-300 text-gray-800 hover:bg-gray-100"
              }`}
            >
              {homeUsesOverlay ? "Transparent" : "Solid"}
            </button>
          </div>
        )}

        <div className={`${showBrandTitle ? "mt-2" : "mt-0"} hidden items-center gap-8 md:flex`}>
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`inline-flex min-h-11 items-center rounded-md px-2 text-base font-medium transition ${
                  isActive
                    ? homeUsesOverlay
                      ? "text-white font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] underline underline-offset-8"
                      : "text-[var(--color-brand)] underline underline-offset-8"
                    : homeUsesOverlay
                      ? "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:text-white"
                      : "text-gray-900 hover:text-[var(--color-brand)]"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {isOpen && (
          <div
            id="mobile-nav-links"
            className={`mt-2 border-t pt-2 md:hidden ${
              homeUsesOverlay ? "border-white/20" : "border-gray-200"
            }`}
          >
            {isHome && (
              <button
                type="button"
                onClick={toggleHomeNavStyle}
                className={`mb-2 inline-flex min-h-10 items-center rounded-md border px-3 text-xs font-semibold uppercase tracking-wide transition ${
                  homeUsesOverlay
                    ? "border-white/60 text-white drop-shadow-sm hover:bg-white/10"
                    : "border-gray-300 text-gray-800 hover:bg-gray-100"
                }`}
              >
                {homeUsesOverlay ? "Transparent" : "Solid"}
              </button>
            )}
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
                        ? homeUsesOverlay
                          ? "text-white font-semibold [text-shadow:0_1px_2px_rgba(0,0,0,0.45)]"
                          : "text-[var(--color-brand)]"
                        : homeUsesOverlay
                          ? "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,0.45)] hover:text-white"
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
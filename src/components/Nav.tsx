import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SITE } from "../data/site";

const HERO_HEIGHT = 650; // scroll distance (px) before the nav turns solid

const LINKS = [
  { id: "work", label: "Portfolio" },
  { id: "approach", label: "Approach" },
  { id: "investment", label: "Investment" },
  { id: "faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // bar is solid when scrolled OR when the mobile menu is open
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HERO_HEIGHT);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onScrollSpy = () => {
      let current: string | null = null;
      for (const { id } of LINKS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = id;
      }
      setActive(current);
    };
    onScrollSpy();
    window.addEventListener("scroll", onScrollSpy, { passive: true });
    return () => window.removeEventListener("scroll", onScrollSpy);
  }, []);

  // close the mobile menu on Escape, or if the screen grows to desktop size
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? "pt-3 md:pt-4" : "pt-0"
      }`}
    >
      {/* tap outside to close (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 -z-10 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/60 via-black/25 to-transparent transition-opacity duration-300 ${
          solid ? "opacity-0" : "opacity-100"
        }`}
      />

      <div
        className={`relative mx-auto flex w-[min(1340px,calc(100%_-_32px))] items-center justify-between transition-all duration-300 md:w-[min(1340px,calc(100%_-_96px))] ${
          solid ? "rounded-2xl bg-[#041b1c] px-4 py-3 md:px-8" : "py-4 md:py-6"
        }`}
      >
        <a
          href="https://www.seo-growup.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2"
        >
          <img
            src="/images/growupblacklogotransparent.png"
            alt="GrowUp"
            width="180"
            height="48"
            className="h-9 w-auto md:h-11"
          />
        </a>

        {/* desktop links */}
        <nav className="hidden items-center gap-9 text-[15px] md:flex">
          {LINKS.map(({ id, label }) => (
            <a
              key={id}
              href={`/#${id}`}
              className={`font-semibold drop-shadow-[0_1px_4px_rgba(0,0,0,0.7)] transition ${
                active === id ? "text-[#1F9FA1]" : "text-white hover:text-[#1F9FA1]"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-0">
          <a
            href="https://www.seo-growup.com/get-in-touch"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-[#167273] px-4 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-[#1d8f90] md:px-6 md:py-3 md:text-[15px]"
          >
            Let&rsquo;s talk
          </a>

          {/* hamburger (mobile only) */}
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition hover:border-white/50 md:hidden"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>

        {/* mobile dropdown */}
        {open && (
          <nav
            id="mobile-menu"
            className="absolute inset-x-0 top-full mt-2 rounded-2xl bg-[#041b1c] p-3 shadow-2xl ring-1 ring-white/10 md:hidden"
          >
            {LINKS.map(({ id, label }) => (
              <a
                key={id}
                href={`/#${id}`}
                onClick={() => setOpen(false)}
                className={`block rounded-xl px-4 py-3.5 text-base font-semibold transition ${
                  active === id
                    ? "bg-white/5 text-[#1F9FA1]"
                    : "text-white hover:bg-white/5"
                }`}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
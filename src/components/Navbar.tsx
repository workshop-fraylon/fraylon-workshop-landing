"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { label: "About", href: "#about", sectionId: "about" },
  { label: "Timeline", href: "#timeline", sectionId: "timeline" },
  { label: "Domains", href: "#domains", sectionId: "domains" },
  { label: "What you'll learn", href: "#what-youll-learn", sectionId: "what-youll-learn" },
  // { label: "Mentors", href: "#mentors", sectionId: "mentors" },
  { label: "FAQ", href: "#faq", sectionId: "faq" },
] as const;

type SectionId = (typeof NAV_LINKS)[number]["sectionId"];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // Keep a map of which sections are currently intersecting
    const intersecting = new Map<string, boolean>();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Update intersecting map for every entry in this batch
        entries.forEach((e) => intersecting.set(e.target.id, e.isIntersecting));

        // Among all currently-intersecting sections pick the one closest to top
        const active = NAV_LINKS.map(({ sectionId }) => ({
          id: sectionId,
          el: document.getElementById(sectionId),
          visible: intersecting.get(sectionId) ?? false,
        }))
          .filter((s) => s.visible && s.el)
          .sort((a, b) => (a.el!.getBoundingClientRect().top) - (b.el!.getBoundingClientRect().top))[0];

        setActiveSection(active ? (active.id as SectionId) : null);
      },
      { rootMargin: "-10% 0px -80% 0px", threshold: 0 },
    );
    NAV_LINKS.forEach(({ sectionId }) => {
      const el = document.getElementById(sectionId);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`animate-slide-down-in fixed inset-x-0 top-0 z-50 transition-all duration-500 ${isScrolled
        ? "bg-white shadow-md shadow-slate-200/80 border-b border-slate-100"
        : "bg-white/90 border-b border-slate-100/60 backdrop-blur-sm"
        }`}
    >
      <nav className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link
          href="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center transition-opacity duration-200 hover:opacity-80"
          style={{ animation: "fade-in 0.6s 0.1s ease-out both" }}
        >
          <Image
            src="/fraylon_logo.jpeg"
            alt="Fraylon Technologies"
            width={160}
            height={48}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        {/* ── Desktop nav links ──────────────────────────────────────────── */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li key={link.href} style={{ animation: `fade-in-up 0.5s cubic-bezier(0.16,1,0.3,1) ${250 + i * 55}ms both` }}>
                <a
                  href={link.href}
                  className={`relative px-4 py-2 text-base font-medium transition-colors duration-200
                    after:absolute after:bottom-0 after:left-1/2 after:h-[2px] after:rounded-full
                    after:bg-emerald-500 after:transition-all after:duration-300 after:-translate-x-1/2
                    ${isActive
                      ? "text-emerald-600 after:w-3/4"
                      : "text-slate-600 hover:text-slate-900 after:w-0 hover:after:w-3/4"
                    }`}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        {/* ── Register CTA + hamburger ───────────────────────────────────── */}
        <div
          className="flex items-center gap-3"
          style={{ animation: `fade-in 0.6s ${250 + NAV_LINKS.length * 55 + 60}ms ease-out both` }}
        >
          {/* Register button — solid green */}
          <a
            href="#register"
            onClick={closeMenu}
            className="hidden rounded-sm bg-emerald-500 px-6 py-2.5 text-base font-semibold uppercase tracking-wide text-white
              transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.03]
              sm:inline-block"
          >
            Register Now
          </a>

          {/* Hamburger — mobile only */}
          <button
            type="button"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white
              text-slate-700 transition-all duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-600 lg:hidden"
            onClick={() => setIsOpen((v) => !v)}
          >
            <span className="sr-only">{isOpen ? "Close menu" : "Open menu"}</span>
            <span className="relative h-4 w-5" aria-hidden="true">
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "top-2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-2 h-0.5 rounded-full bg-current transition-all duration-300 ${isOpen ? "w-0 opacity-0" : "w-5 opacity-100"}`} />
              <span className={`absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-300 ${isOpen ? "top-2 -rotate-45" : "top-4"}`} />
            </span>
          </button>
        </div>
      </nav>

      {/* ── Mobile: backdrop ────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-0 top-[70px] bg-black/25 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${isOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
          }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* ── Mobile: drawer ──────────────────────────────────────────────────── */}
      <div
        className={`fixed inset-x-0 top-[70px] z-40 overflow-hidden border-b border-slate-100 bg-white shadow-xl
          transition-all duration-500 ease-out lg:hidden ${isOpen ? "max-h-[calc(100dvh-70px)] opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <ul className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {NAV_LINKS.map((link, i) => {
            const isActive = activeSection === link.sectionId;
            return (
              <li
                key={link.href}
                className="transition-all duration-500"
                style={{
                  transitionDelay: isOpen ? `${i * 50}ms` : "0ms",
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? "translateX(0)" : "translateX(-14px)",
                }}
              >
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className={`flex items-center gap-3 rounded-lg px-4 py-3.5 text-base font-medium transition-all duration-200 ${isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                >
                  <span className={`h-5 w-0.5 shrink-0 rounded-full transition-all duration-200 ${isActive ? "bg-emerald-500" : "bg-slate-200"
                    }`} />
                  {link.label}
                </a>
              </li>
            );
          })}

          {/* Mobile register */}
          <li
            className="mt-3 border-t border-slate-100 pt-4 transition-all duration-500"
            style={{
              transitionDelay: isOpen ? `${NAV_LINKS.length * 50 + 30}ms` : "0ms",
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? "translateX(0)" : "translateX(-14px)",
            }}
          >
            <a
              href="#register"
              onClick={closeMenu}
              className="flex w-full items-center justify-center rounded-sm bg-emerald-500 px-5 py-3.5
                text-base font-semibold uppercase tracking-wide text-white
                transition-all duration-200 hover:bg-emerald-600 active:scale-95"
            >
              Register Now
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

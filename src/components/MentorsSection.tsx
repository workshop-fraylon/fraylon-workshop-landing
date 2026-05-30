"use client";

import { useEffect, useRef, useState } from "react";

/* ── Mentor card data — commented out until profiles are ready ─────────────
const MENTORS = [
  {
    name: "Mentor Name",
    role: "Full-Stack Engineer",
    company: "Fraylon Technologies",
    domain: "Web Development",
    domainColor: "#0891b2",
    initials: "MN",
    avatarBg: "#e0f7fa",
    avatarText: "#0891b2",
    bio: "5+ years building scalable web products. Mentors students on React, Node.js, and modern deployment workflows.",
  },
  // ... add remaining mentor objects here when profiles are ready
];

// Card JSX template (use inside a grid when re-enabling):
//
// <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
//   <div className="relative flex items-center justify-center bg-slate-100 py-8">
//     <div className="flex h-24 w-24 items-center justify-center rounded-full ring-4 ring-white" style={{ background: mentor.avatarBg, color: mentor.avatarText }}>
//       <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-40" viewBox="0 0 24 24" fill="currentColor">
//         <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
//       </svg>
//     </div>
//     <span className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide" style={{ background: mentor.domainColor + "18", color: mentor.domainColor, border: `1px solid ${mentor.domainColor}30` }}>
//       {mentor.domain}
//     </span>
//   </div>
//   <div className="flex flex-1 flex-col gap-3 p-5">
//     <div>
//       <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
//       <p className="text-sm font-medium text-slate-500">{mentor.role}</p>
//       <p className="text-xs text-slate-400">{mentor.company}</p>
//     </div>
//     <p className="text-sm leading-relaxed text-slate-500">{mentor.bio}</p>
//     <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-3">
//       <div className="h-7 w-7 rounded-md bg-slate-100" />
//       <div className="h-7 w-7 rounded-md bg-slate-100" />
//       <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-300">Profile coming soon</span>
//     </div>
//   </div>
// </div>
────────────────────────────────────────────────────────────────────────── */

export default function MentorsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.07 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="mentors"
      ref={sectionRef}
      className="scroll-mt-[70px] bg-slate-50 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="mb-10 text-center"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(24px)",
            transition: "opacity 0.55s ease, transform 0.55s ease",
          }}
        >
          <span className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Industry Experts</span>
            <span className="h-px w-6 bg-emerald-500" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Meet Our <span className="text-emerald-600">Mentors</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Learn directly from professionals working at the industry&apos;s cutting edge — not just teachers, but practitioners.
          </p>
        </div>

        {/* Coming soon notice */}
        <div
          className="flex flex-col items-center gap-5 rounded-2xl border border-slate-200 bg-white px-8 py-14 text-center shadow-sm"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(20px)",
            transition: "opacity 0.55s ease 0.1s, transform 0.55s ease 0.1s",
          }}
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Mentor Profiles Coming Soon</h3>
            <p className="mx-auto mt-2 max-w-md text-base text-slate-500">
              The mentor profiles and details will be shared with all registered participants shortly.
            </p>
          </div>
          <a
            href="#register"
            className="mt-2 rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-600"
          >
            Register to Stay Updated
          </a>
        </div>

      </div>
    </section>
  );
}

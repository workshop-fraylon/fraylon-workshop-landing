"use client";

import { useEffect, useRef, useState } from "react";

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
  {
    name: "Mentor Name",
    role: "AI / ML Engineer",
    company: "Fraylon Technologies",
    domain: "AI & Prompt Engineering",
    domainColor: "#10b981",
    initials: "MN",
    avatarBg: "#ecfdf5",
    avatarText: "#10b981",
    bio: "Works on LLM integrations and ML pipelines. Passionate about making AI accessible to every developer.",
  },
  {
    name: "Mentor Name",
    role: "Product Designer",
    company: "Fraylon Technologies",
    domain: "UI/UX Design",
    domainColor: "#8b5cf6",
    initials: "MN",
    avatarBg: "#f5f3ff",
    avatarText: "#8b5cf6",
    bio: "Led design for 10+ products from zero to launch. Teaches Figma, design systems, and user research methods.",
  },
  {
    name: "Mentor Name",
    role: "Growth & Marketing Lead",
    company: "Fraylon Technologies",
    domain: "Digital Marketing",
    domainColor: "#f59e0b",
    initials: "MN",
    avatarBg: "#fffbeb",
    avatarText: "#d97706",
    bio: "Runs growth strategy across SEO, paid acquisition, and brand. Turned 3 startups from 0 to profitable.",
  },
  {
    name: "Mentor Name",
    role: "Cloud & DevOps Architect",
    company: "Fraylon Technologies",
    domain: "Cloud & DevOps",
    domainColor: "#1e3a5f",
    initials: "MN",
    avatarBg: "#f0f4ff",
    avatarText: "#1e3a5f",
    bio: "8 years architecting cloud infrastructure. Guides students through Docker, CI/CD, and AWS fundamentals.",
  },
  {
    name: "Mentor Name",
    role: "Sales & Business Coach",
    company: "Fraylon Technologies",
    domain: "Sales Psychology",
    domainColor: "#ef4444",
    initials: "MN",
    avatarBg: "#fef2f2",
    avatarText: "#ef4444",
    bio: "Closed $2M+ in B2B deals. Teaches sales frameworks, objection handling, and client relationship building.",
  },
];

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

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {MENTORS.map((mentor, i) => (
            <div
              key={i}
              className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(28px)",
                transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              {/* Photo area */}
              <div className="relative flex items-center justify-center bg-slate-100 py-8">
                {/* Placeholder avatar circle */}
                <div
                  className="flex h-24 w-24 items-center justify-center rounded-full text-2xl font-bold ring-4 ring-white"
                  style={{ background: mentor.avatarBg, color: mentor.avatarText }}
                >
                  {/* silhouette icon */}
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 opacity-40" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                  </svg>
                </div>

                {/* Domain badge — top right */}
                <span
                  className="absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                  style={{
                    background: mentor.domainColor + "18",
                    color: mentor.domainColor,
                    border: `1px solid ${mentor.domainColor}30`,
                  }}
                >
                  {mentor.domain}
                </span>
              </div>

              {/* Info */}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div>
                  <h3 className="text-base font-bold text-slate-900">{mentor.name}</h3>
                  <p className="text-sm font-medium text-slate-500">{mentor.role}</p>
                  <p className="text-xs text-slate-400">{mentor.company}</p>
                </div>

                <p className="text-sm leading-relaxed text-slate-500">{mentor.bio}</p>

                {/* Bottom divider + placeholder social */}
                <div className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="h-7 w-7 rounded-md bg-slate-100" title="LinkedIn (coming soon)" />
                  <div className="h-7 w-7 rounded-md bg-slate-100" title="Twitter (coming soon)" />
                  <span className="ml-auto text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    Profile coming soon
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p
          className="mt-8 text-center text-sm text-slate-400"
          style={{
            opacity: visible ? 1 : 0,
            transition: "opacity 0.6s ease 0.5s",
          }}
        >
          20+ mentors will be assigned based on your track and domain selection.
        </p>
      </div>
    </section>
  );
}

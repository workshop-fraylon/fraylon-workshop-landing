"use client";

import { useEffect, useRef, useState } from "react";

/* ── data ─────────────────────────────────────────────────────────────────── */

const SKILLS = [
  "AI & Prompt Engineering",
  "Web Development",
  "UI/UX Design",
  "Cybersecurity",
  "Cloud & DevOps",
  "SaaS Product Building",
  "Digital Marketing",
  "HR & Recruitment",
  "Sales Psychology",
  "Brand Strategy",
];

const OUTCOMES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Job-Ready Portfolio",
    desc: "Ship 2–3 real projects you can show to any employer or client.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
    title: "Mentor Network",
    desc: "Direct access to 20+ industry professionals throughout the program.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
    title: "Industry Certificate",
    desc: "Earn a recognised certificate upon completing the program milestones.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Team Experience",
    desc: "Collaborate in squads — just like you would in a real product team.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
      </svg>
    ),
    title: "Presentation Skills",
    desc: "Demo your work to a panel — practice pitching and defending decisions.",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
      </svg>
    ),
    title: "LinkedIn Profile Optimised",
    desc: "Walk away with a profile that ranks well and gets recruiter attention.",
  },
];

const EVAL_STEPS = [
  {
    label: "Test",
    desc: "Domain-specific knowledge assessment to evaluate conceptual understanding.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    label: "Project",
    desc: "A hands-on project built during the program, reviewed by industry mentors.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
  },
  {
    label: "Assignment",
    desc: "Practical tasks submitted and evaluated throughout the program.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
    ),
  },
];

const YEAR_OPPORTUNITIES = [
  {
    years: "1st & 2nd Year Students",
    badge: "Year 1 – 2",
    badgeColor: "#0891b2",
    badgeBg: "#e0f7fa",
    badgeBorder: "#b2ebf2",
    perks: [
      { label: "Internship Opportunity", note: "Based on performance" },
    ],
    note: "Build foundational experience and get your first industry exposure through a structured internship.",
  },
  {
    years: "3rd Year Students",
    badge: "Year 3",
    badgeColor: "#10b981",
    badgeBg: "#ecfdf5",
    badgeBorder: "#a7f3d0",
    perks: [
      { label: "Internship Opportunity", note: "Based on performance" },
      { label: "PPO — Pre-Placement Offer", note: "Top performers only" },
    ],
    note: "Perform well and you could walk away with not just an internship, but a direct Pre-Placement Offer from Fraylon Technologies.",
  },
];

/* ── component ────────────────────────────────────────────────────────────── */

export default function WhatYoullLearnSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
      },
      { threshold: 0.07 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const appear = (delay: number) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? "none" : "translateY(28px)",
    transition: `opacity 0.55s ease ${delay}s, transform 0.55s ease ${delay}s`,
  });

  return (
    <section
      id="what-youll-learn"
      ref={sectionRef}
      className="scroll-mt-[70px] bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* ── Section header ────────────────────────────────────────────────── */}
        <div className="mb-10 text-center" style={appear(0)}>
          <span className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              What You&apos;ll Learn
            </span>
            <span className="h-px w-6 bg-emerald-500" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Skills, Outcomes &amp; <span className="text-emerald-600">Internship</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Everything you take away from the 15-day program — from hard skills to real opportunities.
          </p>
        </div>

        {/* ── Row 1: Skills + Outcomes ──────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-5">

          {/* Skills — tag cloud style */}
          <div
            className="flex flex-col gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-7 lg:col-span-2"
            style={appear(0.1)}
          >
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Skills You&apos;ll Pick Up
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Hard &amp; Soft Skills</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {SKILLS.map((skill, i) => (
                <span
                  key={skill}
                  className="rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm transition-colors duration-200 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-700"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${0.15 + i * 0.04}s`,
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Small note */}
            <p className="text-xs text-slate-400">
              + domain-specific tools depending on your track.
            </p>
          </div>

          {/* Outcomes — grid of cards */}
          <div className="flex flex-col gap-5 lg:col-span-3" style={appear(0.15)}>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                What You Walk Away With
              </p>
              <h3 className="mt-1 text-xl font-bold text-slate-900">Program Outcomes</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {OUTCOMES.map((item, i) => (
                <div
                  key={item.title}
                  className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-shadow duration-200 hover:shadow-md"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${0.2 + i * 0.07}s, transform 0.5s ease ${0.2 + i * 0.07}s, box-shadow 0.2s`,
                  }}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                    {item.icon}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Outcome After Workshop ────────────────────────────────── */}
        <div className="mt-8 flex flex-col gap-6" style={appear(0.25)}>

          {/* Evaluation process */}
          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="border-b border-slate-200 bg-slate-900 px-7 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
                Post-Workshop Evaluation
              </p>
              <h3 className="mt-0.5 text-xl font-bold text-white">Outcome After the Workshop</h3>
              <p className="mt-2 text-sm text-slate-400">
                All participants will be evaluated across three components based on their selected domain.
              </p>
            </div>
            <div className="grid divide-y divide-slate-100 bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              {EVAL_STEPS.map((step, i) => (
                <div
                  key={step.label}
                  className="flex items-start gap-4 px-6 py-5"
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.5s ease ${0.3 + i * 0.1}s`,
                  }}
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    {step.icon}
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{step.label}</p>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Year-wise opportunities */}
          <div>
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-slate-400">
              Opportunities Based on Performance
            </p>
            <div className="grid gap-5 sm:grid-cols-2">
              {YEAR_OPPORTUNITIES.map((item, i) => (
                <div
                  key={item.years}
                  className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
                  style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? "none" : "translateY(16px)",
                    transition: `opacity 0.5s ease ${0.45 + i * 0.12}s, transform 0.5s ease ${0.45 + i * 0.12}s`,
                  }}
                >
                  {/* Top strip */}
                  <div className="h-1" style={{ background: item.badgeColor }} />

                  <div className="flex flex-1 flex-col gap-4 p-5">
                    {/* Header */}
                    <div className="flex items-center justify-between gap-3">
                      <h4 className="text-base font-bold text-slate-900">{item.years}</h4>
                      <span
                        className="shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
                        style={{ background: item.badgeBg, color: item.badgeColor, border: `1px solid ${item.badgeBorder}` }}
                      >
                        {item.badge}
                      </span>
                    </div>

                    {/* Perks */}
                    <ul className="flex flex-col gap-2.5">
                      {item.perks.map((perk) => (
                        <li key={perk.label} className="flex items-start gap-2.5">
                          <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-4 w-4 shrink-0" viewBox="0 0 20 20" fill={item.badgeColor}>
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <div>
                            <p className="text-sm font-semibold text-slate-800">{perk.label}</p>
                            <p className="text-xs text-slate-400">{perk.note}</p>
                          </div>
                        </li>
                      ))}
                    </ul>

                    {/* Note */}
                    <p className="mt-auto border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-500">
                      {item.note}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA strip */}
          <div className="flex flex-col items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              Secure your spot now — opportunities are based on performance during the program.
            </p>
            <a
              href="#register"
              className="shrink-0 rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-slate-700"
            >
              Register Now
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

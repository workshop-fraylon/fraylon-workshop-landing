"use client";

import { useEffect, useRef, useState } from "react";

const TRACKS = [
  {
    id: "technical",
    label: "Technical Track",
    tagline: "Build. Ship. Scale.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
      </svg>
    ),
    accent: "#0891b2",        // teal
    accentLight: "#e0f7fa",
    accentBorder: "#b2ebf2",
    points: [
      { title: "AI & Prompt Engineering", desc: "Learn to work with LLMs, build AI-powered workflows, and master prompt design for real products." },
      { title: "Web Development", desc: "Full-stack development with modern frameworks  from UI to APIs to deployment." },
      { title: "UI/UX Design", desc: "Figma, design systems, user research, and building interfaces people actually enjoy using." },
      { title: "Cybersecurity", desc: "Understand threat models, basic pen-testing concepts, and how to build secure applications." },
      { title: "Cloud & DevOps", desc: "CI/CD pipelines, Docker, cloud deployment (AWS/GCP), and infrastructure fundamentals." },
      { title: "SaaS Product Building", desc: "Go from idea to a working SaaS architecture, billing, auth, and launch strategy." },
    ],
  },
  {
    id: "non-technical",
    label: "Non-Technical Track",
    tagline: "Communicate. Lead. Deliver.",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    accent: "#10b981",        // green
    accentLight: "#ecfdf5",
    accentBorder: "#a7f3d0",
    points: [
      { title: "Digital Marketing", desc: "SEO, paid ads, content strategy, analytics, and running campaigns that actually convert." },
      { title: "HR & Recruitment", desc: "Talent sourcing, JD writing, interview processes, and managing onboarding pipelines." },
      { title: "Sales Psychology", desc: "Understand buyer behaviour, handle objections, and close deals with confidence." },
      { title: "Brand Strategy", desc: "Build a compelling brand identity — positioning, messaging, tone, and visual direction." },
    ],
  },
] as const;

export default function TracksSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="domains"
      ref={sectionRef}
      className="scroll-mt-[70px] bg-slate-50 py-14 sm:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          className="mb-10 text-center"
          style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "translateY(24px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
        >
          <span className="mb-3 inline-flex items-center gap-2">
            <span className="h-px w-6 bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Workshop Tracks</span>
            <span className="h-px w-6 bg-emerald-500" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Choose Your <span className="text-emerald-600">Track</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Two focused paths designed around where you want to grow — pick the one that fits your goals, or combine both.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-2">
          {TRACKS.map((track, i) => (
            <div
              key={track.id}
              className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "none" : "translateY(32px)",
                transition: `opacity 0.6s ease ${i * 0.15}s, transform 0.6s ease ${i * 0.15}s, box-shadow 0.3s, translate 0.3s`,
              }}
            >
              {/* Top accent strip */}
              <div className="h-1.5 w-full" style={{ background: track.accent }} />

              <div className="flex flex-col gap-6 p-7 sm:p-8">

                {/* Card header */}
                <div className="flex items-start gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
                    style={{ background: track.accentLight, color: track.accent, border: `1px solid ${track.accentBorder}` }}
                  >
                    {track.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{track.label}</h3>
                    <p className="mt-0.5 text-sm font-medium" style={{ color: track.accent }}>{track.tagline}</p>
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-100" />

                {/* Points */}
                <ul className="flex flex-col gap-4">
                  {track.points.map((point) => (
                    <li key={point.title} className="flex items-start gap-3">
                      <span
                        className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                        style={{ background: track.accentLight, border: `1px solid ${track.accentBorder}` }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill={track.accent}>
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-800">{point.title}</p>
                        <p className="text-sm leading-relaxed text-slate-500">{point.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Footer badge */}
                <div
                  className="mt-auto rounded-lg px-4 py-3 text-sm font-medium"
                  style={{ background: track.accentLight, color: track.accent }}
                >
                  {track.id === "technical"
                    ? "Ideal for CS / IT students, developers & engineers"
                    : "Ideal for MBA, BBA, management & communication students"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

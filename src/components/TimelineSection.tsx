"use client";

import { useEffect, useRef, useState } from "react";

const SCHEDULE_META = [
  { label: "Duration",               value: "15 Days" },
  { label: "Start Date",             value: "5th June 2026" },
  { label: "End Date",               value: "20th June 2026" },
  { label: "Daily Session Duration", value: "2 Hours" },
  { label: "Session Timing",         value: "Every Evening" },
];

const STEPS = [
  {
    number: "01",
    day: "Day 1",
    date: "5 June 2026",
    phase: "Kickoff & Orientation",
    desc: "Receive portal access and your welcome kit. Meet your mentors, get introduced to the cohort, and align on tools, workflows, and learning goals.",
  },
  {
    number: "02",
    day: "Days 2 – 6",
    date: "6 – 11 June 2026",
    phase: "Core Live Sessions — Week 1",
    desc: "Five evening sessions of domain-focused live training. Each session runs 2 hours with hands-on tasks, mentor feedback, and daily deliverables.",
  },
  {
    number: "03",
    day: "Days 7 – 12",
    date: "12 – 17 June 2026",
    phase: "Core Live Sessions — Week 2",
    desc: "Deep-dive sessions covering advanced concepts, industry workflows, and collaborative exercises. Begin working on your final project.",
  },
  {
    number: "04",
    day: "Days 13 – 14",
    date: "18 – 19 June 2026",
    phase: "Project Submission",
    desc: "Complete and submit your industry-grade project. Receive a final mentor review and prepare your demo for the closing presentation.",
  },
  {
    number: "05",
    day: "Day 15",
    date: "20 June 2026",
    phase: "Demo Day & Certification",
    desc: "Present your project to a panel of mentors. Top performers are shortlisted for internships. All finishers receive their industry certificate.",
  },
];

function useInView() {
  const ref = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.08 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

export default function TimelineSection() {
  const { ref, inView } = useInView();

  return (
    <section
      id="timeline"
      ref={ref}
      className="scroll-mt-[70px] bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="h-0.5 w-6 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              15-Day Program
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Timeline &amp; Schedule
          </h2>
          <p className="mt-3 max-w-lg text-base text-slate-500">
            Five structured phases across 15 days — every evening, 2 hours of live, practical training.
          </p>
        </div>

        {/* ── Schedule meta pills ──────────────────────────────────────────── */}
        <div
          className="mb-16 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
          style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "none" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
          }}
        >
          {SCHEDULE_META.map((item) => (
            <div
              key={item.label}
              className="flex flex-col gap-0.5 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
            >
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{item.label}</p>
              <p className="text-sm font-semibold text-slate-800">{item.value}</p>
            </div>
          ))}
        </div>

        {/* ── Timeline ────────────────────────────────────────────────────── */}
        <div className="relative">

          {/* Vertical line — desktop only */}
          <div
            className="absolute left-1/2 hidden h-full w-px -translate-x-1/2 lg:block"
            aria-hidden="true"
          >
            {/* Static track */}
            <div className="h-full w-full bg-slate-200" />
            {/* Animated fill */}
            <div
              className="absolute top-0 left-0 w-full bg-emerald-400 transition-all duration-[2500ms] ease-out"
              style={{ height: inView ? "100%" : "0%" }}
            />
          </div>

          {/* Steps */}
          <div className="flex flex-col gap-0">
            {STEPS.map((step, i) => {
              const isRight = i % 2 === 0; // even = content right, odd = content left
              return (
                <div
                  key={step.number}
                  className="relative grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] lg:gap-x-10"
                  style={{
                    transition: "opacity 0.6s ease, transform 0.6s ease",
                    transitionDelay: inView ? `${i * 160}ms` : "0ms",
                    opacity: inView ? 1 : 0,
                    transform: inView ? "none" : `translateY(24px)`,
                  }}
                >
                  {/* Left column — content or spacer */}
                  <div className={`hidden lg:flex lg:items-start lg:justify-end ${isRight ? "lg:invisible" : ""}`}>
                    {!isRight && <StepCard step={step} align="right" />}
                  </div>

                  {/* Centre — dot */}
                  <div className="hidden lg:flex lg:flex-col lg:items-center lg:py-1">
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-white transition-all duration-300">
                      <span className="text-[11px] font-bold text-emerald-600">{step.number}</span>
                    </div>
                  </div>

                  {/* Right column — content or spacer */}
                  <div className={`hidden lg:flex lg:items-start lg:justify-start ${!isRight ? "lg:invisible" : ""}`}>
                    {isRight && <StepCard step={step} align="left" />}
                  </div>

                  {/* Mobile layout — single column */}
                  <div className="flex gap-4 pb-10 lg:hidden">
                    {/* Left line + dot */}
                    <div className="flex flex-col items-center">
                      <div className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-emerald-500 bg-white">
                        <span className="text-[11px] font-bold text-emerald-600">{step.number}</span>
                      </div>
                      {i < STEPS.length - 1 && (
                        <div className="mt-1 w-px flex-1 bg-slate-200" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="flex-1 pb-2 pt-1">
                      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{step.day}</p>
                      <p className="mt-0.5 text-xs font-medium text-emerald-600">{step.date}</p>
                      <h3 className="mt-1 text-lg font-bold text-slate-900">{step.phase}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Day-wise note ─────────────────────────────────────────────────── */}
        <div
          className="mt-12 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-5 py-4"
          style={{
            opacity: inView ? 1 : 0,
            transition: "opacity 0.6s ease 0.85s",
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p className="text-sm leading-relaxed text-emerald-800">
            <span className="font-semibold">Detailed Day-wise Schedule (Day 1 to Day 15)</span> will be shared with all participants after successful registration and joining.
          </p>
        </div>

        {/* ── Footer ────────────────────────────────────────────────────────── */}
        <div
          className="mt-16 flex flex-col items-start gap-4 border-t border-slate-100 pt-10 sm:flex-row sm:items-center sm:justify-between"
          style={{
            transition: "opacity 0.7s ease",
            transitionDelay: inView ? "900ms" : "0ms",
            opacity: inView ? 1 : 0,
          }}
        >
          <div>
            <p className="text-base font-semibold text-slate-800">15 days. Structured. Practical. Recognised.</p>
            <p className="mt-1 text-sm text-slate-400">5th June 2026 – 20th June 2026</p>
          </div>
          <a
            href="#register"
            className="rounded-sm bg-emerald-500 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-emerald-600 hover:shadow-md hover:shadow-emerald-500/25"
          >
            Reserve Your Seat
          </a>
        </div>

      </div>
    </section>
  );
}

/* ── Card subcomponent ─────────────────────────────────────────────────────── */
function StepCard({ step, align }: { step: typeof STEPS[number]; align: "left" | "right" }) {
  return (
    <div className={`group w-full max-w-[380px] py-6 ${align === "right" ? "text-right" : "text-left"}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{step.day}</p>
      <p className="mt-0.5 text-xs font-medium text-emerald-600">{step.date}</p>
      <h3 className="mt-1.5 text-xl font-bold text-slate-900 transition-colors duration-200 group-hover:text-emerald-600">
        {step.phase}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
      <div className={`mt-4 flex ${align === "right" ? "justify-end" : "justify-start"}`}>
        <span className="h-px w-10 rounded-full bg-emerald-400 transition-all duration-300 group-hover:w-16" />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

const STEPS = [
  {
    number: "01",
    day: "Day 1",
    phase: "Registration",
    desc: "Complete your registration and receive portal access, your welcome kit, and an invite to the student community.",
  },
  {
    number: "02",
    day: "Days 2 – 3",
    phase: "Orientation",
    desc: "Meet your mentors, align on tools and workflows, and set your learning goals for the program ahead.",
  },
  {
    number: "03",
    day: "Days 4 – 11",
    phase: "Live Sessions",
    desc: "Eight days of hands-on live training. Daily tasks, real feedback from mentors, and execution-first learning across your domain.",
  },
  {
    number: "04",
    day: "Days 12 – 13",
    phase: "Project",
    desc: "Build a full industry-grade project in teams. Apply everything from the sessions and get a final mentor review.",
  },
  {
    number: "05",
    day: "Days 14 – 15",
    phase: "Certification",
    desc: "Present your project, earn your industry-recognised certificate, and get introduced to our hiring partner network.",
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
          className="mb-20 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(20px)" }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="h-0.5 w-6 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">
              15-Day Program
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Timeline
          </h2>
          <p className="mt-3 max-w-lg text-base text-slate-500">
            Five structured phases. Each one builds directly on the last.
          </p>
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
                      <h3 className="mt-1 text-lg font-bold text-slate-900">{step.phase}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
            <p className="mt-1 text-sm text-slate-400">Next cohort starts July 2025.</p>
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

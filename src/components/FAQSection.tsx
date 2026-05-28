"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "Who is this workshop designed for?",
    a: "This workshop is open to college students, fresh graduates, and early-career professionals who want to close the gap between academic learning and real industry expectations. No prior work experience is required.",
  },
  {
    q: "Is the workshop fully online or in-person?",
    a: "The program is fully remote. All live sessions, project submissions, and mentor interactions happen online — you can join from anywhere.",
  },
  {
    q: "How long is the program?",
    a: "The core workshop runs for 15 days with live sessions, assignments, and a final project. Post-workshop, top performers get access to the internship program which runs for 1–3 months.",
  },
  {
    q: "Do I need to choose only one track?",
    a: "You can register for either the Technical or Non-Technical track based on your interest. If you want exposure to both, you can let us know during onboarding and we'll guide you accordingly.",
  },
  {
    q: "What happens after the workshop ends?",
    a: "You receive an industry certificate on completion. Top performers are shortlisted for paid/stipend-based internships within Fraylon or our partner companies. You also walk away with a portfolio of projects.",
  },
  {
    q: "Is there a certificate at the end?",
    a: "Yes. Every participant who completes the program milestones receives a Fraylon Industry Readiness Certificate. Interns receive a separate internship completion letter.",
  },
  {
    q: "What is the fee for the workshop?",
    a: "Registration details including fees will be shared during the registration process. We keep it affordable — our goal is access, not profit.",
  },
  {
    q: "Will there be live sessions or is it pre-recorded?",
    a: "The program is built around live sessions with mentors. Recordings are provided for each session so you can revisit them at your own pace.",
  },
  {
    q: "How are mentors assigned?",
    a: "Mentors are assigned based on the track and domain you select during registration. You'll have dedicated mentors for your core domain plus access to the broader mentor pool for Q&A.",
  },
  {
    q: "Can I get a refund if I am unable to attend?",
    a: "We have a fair refund policy. If you withdraw before the program begins, a full refund is processed. Mid-program withdrawals are reviewed case by case. Reach out to us and we'll sort it out.",
  },
];

export default function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.07 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const toggle = (i: number) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="scroll-mt-[70px] bg-white py-14 sm:py-20"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

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
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600">Got Questions?</span>
            <span className="h-px w-6 bg-emerald-500" />
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-500">
            Everything you need to know before registering. Can&apos;t find your answer?{" "}
            <a href="mailto:hello@fraylon.com" className="font-medium text-emerald-600 underline underline-offset-2 hover:text-emerald-700">
              Reach out to us.
            </a>
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col divide-y divide-slate-100 rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                style={{
                  opacity: visible ? 1 : 0,
                  transition: `opacity 0.45s ease ${0.05 + i * 0.04}s`,
                }}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200 ${
                    isOpen ? "bg-slate-50" : "bg-white hover:bg-slate-50"
                  }`}
                >
                  <span className={`text-sm font-semibold leading-snug sm:text-base transition-colors duration-200 ${
                    isOpen ? "text-emerald-700" : "text-slate-800"
                  }`}>
                    {faq.q}
                  </span>

                  {/* +/– icon */}
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                    isOpen
                      ? "border-emerald-200 bg-emerald-50 text-emerald-600"
                      : "border-slate-200 bg-white text-slate-400"
                  }`}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${isOpen ? "rotate-45" : "rotate-0"}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </span>
                </button>

                {/* Answer — CSS height transition via grid trick */}
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 pt-1 text-sm leading-relaxed text-slate-500 sm:text-base">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

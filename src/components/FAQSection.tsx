"use client";

import { useEffect, useRef, useState } from "react";

const FAQS = [
  {
    q: "What is the Fraylon Industry Readiness Workshop?",
    a: "The Fraylon Industry Readiness Workshop is a practical training program designed to help students gain real-world industry skills through hands-on learning, live sessions, and project-based training.",
  },
  {
    q: "Who can participate in the workshop?",
    a: "College students, freshers, graduates, and learners interested in improving their technical and professional skills can participate.",
  },
  {
    q: "Is the workshop conducted online or offline?",
    a: "The workshop is conducted remotely, making it accessible for students from different locations.",
  },
  {
    q: "What skills will participants learn?",
    a: "Participants will gain industry-oriented technical skills, teamwork experience, communication skills, and practical project execution knowledge.",
  },
  {
    q: "Will participants work on real-time projects?",
    a: "Yes, the program includes practical assignments and real-world project-based learning activities.",
  },
  {
    q: "Are certificates provided after completion?",
    a: "Yes, participants will receive a certificate upon successful completion of the workshop program.",
  },
  {
    q: "Is there any internship or full-time opportunity?",
    a: "Yes, based on performance during the workshop and hackathon activities, selected participants may receive internship or full-time role opportunities with Fraylon Technologies.",
  },
  {
    q: "Do participants need prior experience?",
    a: "No prior industry experience is required. Beginners and learners at different skill levels can join.",
  },
  {
    q: "How long is the workshop program?",
    a: "The duration may vary depending on the workshop module and training schedule.",
  },
  {
    q: "What makes this workshop different?",
    a: "The workshop focuses on practical implementation, industry workflows, mentorship, and collaborative learning instead of only theoretical teaching.",
  },
  {
    q: "Will mentorship be provided during the program?",
    a: "Yes, participants will receive guidance and mentorship throughout the training process.",
  },
  {
    q: "How can colleges collaborate with Fraylon Technologies?",
    a: "Colleges can collaborate for workshops, hackathons, technical sessions, and student development initiatives by contacting Fraylon Technologies.",
  },
  {
    q: "Is the workshop suitable for non-technical students?",
    a: "Yes, both technical and non-technical students can participate depending on the workshop category.",
  },
  {
    q: "How can students register for the workshop?",
    a: "Students can register through the official registration form or by contacting the Fraylon team directly.",
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

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden border-b border-slate-100 bg-white pt-[70px]">

      {/* ── Main content grid ─────────────────────────────────────────────── */}
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-70px)] max-w-7xl grid-cols-1 items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-24">

        {/* ─── LEFT: text ──────────────────────────────────────────────────── */}
        <div className="flex flex-col gap-6 lg:gap-8">

          {/* Tag */}
          <div
            className="inline-flex w-fit items-center gap-2"
            style={{ animation: "fade-in-up 0.6s 0.1s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <span className="h-0.5 w-6 rounded-full bg-[--color-primary]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[--color-primary]">
              Training &amp; Workshop Program
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-4xl font-bold leading-[1.1] tracking-tight text-[--color-navy-dark] sm:text-5xl xl:text-6xl"
            style={{ animation: "fade-in-up 0.65s 0.2s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            We Bridge the Gap Between{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-[--color-primary]">Education</span>
              {/* Teal underline accent */}
              <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-[--color-primary]/30" />
            </span>{" "}
            &amp;{" "}
            <span className="text-[--color-navy]">Industry.</span>
          </h1>

          {/* Sub-tagline */}
          <p
            className="max-w-xl text-base leading-relaxed text-[--color-text-secondary] sm:text-lg"
            style={{ animation: "fade-in-up 0.65s 0.32s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            We help institutions improve student industry readiness through
            practical training programs — taught by real-world mentors and
            built for the skills employers actually need.
          </p>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-6 sm:gap-10"
            style={{ animation: "fade-in-up 0.65s 0.42s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            {[
              { value: "500+", label: "Students Trained" },
              { value: "20+",  label: "Industry Mentors" },
              { value: "10",   label: "Domains Covered" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <span className="text-2xl font-bold text-[--color-navy] sm:text-3xl">
                  {stat.value}
                </span>
                <span className="text-sm font-medium text-[--color-text-muted]">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4"
            style={{ animation: "fade-in-up 0.65s 0.52s cubic-bezier(0.16,1,0.3,1) both" }}
          >
            <a
              href="#register"
              className="group relative overflow-hidden rounded-sm bg-slate-900 px-8 py-3.5 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition-all duration-300 hover:scale-[1.03] hover:bg-slate-700 hover:shadow-lg"
            >
              Register Now
            </a>
            <a
              href="#about"
              className="group flex items-center gap-2 px-2 py-3.5 text-sm font-semibold text-[--color-primary] transition-all duration-300 hover:gap-3"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>

        {/* ─── RIGHT: visual ───────────────────────────────────────────────── */}
        <div
          className="relative flex items-center justify-center"
          style={{ animation: "fade-in-right 0.75s 0.35s cubic-bezier(0.16,1,0.3,1) both" }}
        >
          <WorkshopVisual />
        </div>
      </div>
    </section>
  );
}

/* ── Placeholder visual — replace with real image once provided ────────────── */
function WorkshopVisual() {
  return (
    <div className="relative w-full max-w-[560px]">

      {/* Floating card — main */}
      <div className="relative z-10 overflow-hidden rounded-2xl border border-[--color-border] bg-white shadow-2xl shadow-slate-200/80">

        {/* Card top gradient strip */}
        <div className="h-2 w-full bg-gradient-to-r from-[--color-navy] via-[--color-primary] to-[--color-accent]" />

        <div className="p-6 sm:p-8">
          {/* Header row */}
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[--color-primary]/10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[--color-primary]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[--color-text-muted]">Fraylon</p>
              <h3 className="text-lg font-bold text-[--color-navy-dark]">Industry Workshop 2026</h3>
            </div>
          </div>

          {/* Progress bars — domain skills */}
          <div className="flex flex-col gap-4">
            {[
              { label: "AI & Prompt Engineering", pct: 92, color: "var(--color-primary)" },
              { label: "Web Development",         pct: 88, color: "var(--color-accent)" },
              { label: "Cloud & DevOps",          pct: 74, color: "var(--color-navy)" },
              { label: "UI/UX Design",            pct: 80, color: "#8b5cf6" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[--color-text-secondary]">{item.label}</span>
                  <span className="text-sm font-semibold" style={{ color: item.color }}>{item.pct}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-[--color-bg-raised]">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{ width: `${item.pct}%`, background: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-[--color-border]" />

          {/* Mentor avatars row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {["0EA5E9","0F2340","10B981","8B5CF6","F59E0B"].map((hex, i) => (
                  <div
                    key={i}
                    className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white text-xs font-bold text-white"
                    style={{ background: `#${hex}` }}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <span className="text-sm text-[--color-text-muted]">20+ mentors</span>
            </div>
            <a
              href="#register"
              className="rounded-sm bg-[--color-primary] px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-all duration-200 hover:bg-[--color-primary-dark]"
            >
              Join Now
            </a>
          </div>
        </div>
      </div>

      {/* Floating badge — top right */}
      <div className="animate-float absolute -right-4 -top-4 z-20 rounded-xl border border-[--color-border] bg-white px-4 py-3 shadow-lg">
        <p className="text-xs font-semibold uppercase tracking-widest text-[--color-text-muted]">Next Batch</p>
        <p className="text-base font-bold text-[--color-navy]">July 2025</p>
      </div>

      {/* Floating badge — bottom left */}
      <div
        className="animate-float-slow absolute -bottom-4 -left-4 z-20 flex items-center gap-3 rounded-xl border border-[--color-border] bg-white px-4 py-3 shadow-lg"
        style={{ animationDelay: "1.5s" }}
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[--color-accent]/10">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[--color-accent]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-semibold text-[--color-text-muted]">Certificate Provided</p>
          <p className="text-sm font-bold text-[--color-navy]">Industry Recognised</p>
        </div>
      </div>

      {/* Background decorative rings */}
      <div className="absolute -right-8 -top-8 h-48 w-48 rounded-full border border-[--color-primary]/10" aria-hidden="true" />
      <div className="absolute -bottom-10 -left-10 h-64 w-64 rounded-full border border-[--color-navy]/5" aria-hidden="true" />
    </div>
  );
}

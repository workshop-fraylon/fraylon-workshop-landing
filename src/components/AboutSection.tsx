const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
    label: "Remote Training",
    desc: "Join from anywhere — fully online, no commute required.",
    key: "remote",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
      </svg>
    ),
    label: "Execution-Based",
    desc: "Learn by doing, not by watching — every session has a deliverable.",
    key: "execution",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
      </svg>
    ),
    label: "Industry Workflows",
    desc: "Follow real processes used in product teams and agencies.",
    key: "workflow",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    label: "Collaborative Projects",
    desc: "Work in teams that simulate real startup and company environments.",
    key: "collaboration",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
      </svg>
    ),
    label: "Portfolio Building",
    desc: "Walk away with work you can show employers on day one.",
    key: "portfolio",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
      </svg>
    ),
    label: "Industry Certificate",
    desc: "Earn a recognised credential backed by Fraylon Technologies.",
    key: "certificate",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-[70px] bg-white py-14 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Section label ─────────────────────────────────────────────── */}
        <div className="mb-4 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            About the Program
          </span>
        </div>

        {/* ── Two-column layout ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">

          {/* ─── LEFT: text ─────────────────────────────────────────────── */}
          <div className="flex flex-col justify-center gap-6">
            <h2 className="text-3xl font-bold leading-snug tracking-tight text-slate-900 sm:text-4xl">
              Bridging the Gap Between{" "}
              <span className="relative inline-block text-emerald-600">
                Academia
                <span className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-emerald-200" />
              </span>{" "}
              &amp; Industry
            </h2>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              The Industry Readiness Workshop Program is a{" "}
              <strong className="font-semibold text-slate-800">remote practical training initiative</strong>{" "}
              designed to bridge the gap between academic learning and real industry
              expectations. The workshop is built around{" "}
              <strong className="font-semibold text-slate-800">execution-based learning</strong>{" "}
              rather than theoretical teaching.
            </p>

            <p className="text-base leading-relaxed text-slate-600 sm:text-lg">
              Students work on practical tasks, industry workflows, collaborative projects,
              and portfolio-building activities that help them develop real skills demanded
              by modern companies and startups.
            </p>

            <a
              href="#register"
              className="mt-2 inline-flex w-fit items-center gap-2 rounded-sm bg-emerald-500 px-7 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 hover:scale-[1.02]"
            >
              Join the Program
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>

          {/* ─── RIGHT: feature grid ─────────────────────────────────────── */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((feat, index) => (
              <div
                key={feat.key}
                className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition-all duration-200 hover:border-emerald-200 hover:shadow-sm"
              >
                <span className="mt-0.5 text-[11px] font-semibold text-slate-400">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 transition-colors group-hover:text-emerald-700">
                    {feat.label}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-500">{feat.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom accent strip ────────────────────────────────────────── */}
        <div className="mt-20 flex flex-col items-center gap-6 rounded-xl border border-slate-200 bg-slate-50 px-8 py-8 text-center sm:flex-row sm:text-left">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              Why it matters
            </p>
            <p className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
              83% of graduates lack the practical skills employers need on day one.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              We fix that one cohort at a time.
            </p>
          </div>
          <a
            href="#register"
            className="shrink-0 rounded-sm bg-emerald-500 px-8 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-200 hover:bg-emerald-600"
          >
            Register Now
          </a>
        </div>

      </div>
    </section>
  );
}

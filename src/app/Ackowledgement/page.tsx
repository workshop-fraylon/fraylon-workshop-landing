import Link from "next/link";

const acknowledgementSteps = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Z" />
        <path d="M8.5 12.75 11 15.25l4.5-4.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "Registration Received",
    description:
      "Your submission is confirmed and safely recorded in the Fraylon workshop queue.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M7 12h10" strokeLinecap="round" />
        <path d="M12 7v10" strokeLinecap="round" />
        <circle cx="12" cy="12" r="9" />
      </svg>
    ),
    title: "Team Review",
    description:
      "The Fraylon team will review your registration and ensure your details are ready for next-stage coordination.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6">
        <path d="M8 13.5h4" strokeLinecap="round" />
        <path d="M8 16h4" strokeLinecap="round" />
        <path d="M15 8.5h.01" strokeLinecap="round" />
        <path d="M15 11h.01" strokeLinecap="round" />
        <path d="M15 13.5h.01" strokeLinecap="round" />
        <path d="M12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9Z" />
      </svg>
    ),
    title: "Next Communication",
    description:
      "We will contact you with the next steps and workshop details within business hours.",
  },
];

export default function AcknowledgementPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">

        <section className="mb-10 max-w-4xl space-y-4">
          <p className="text-sm uppercase tracking-[0.26em] text-emerald-600">
            Acknowledgement
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Registration Acknowledgement
          </h1>
          <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
            Thank you for completing your registration for the Fraylon workshop.
            We appreciate your interest and commitment to joining this industry readiness program.
          </p>
        </section>

        <article className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-10 text-center text-white sm:px-12 sm:py-14">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-white/15 shadow-lg shadow-cyan-600/20">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-10 w-10 text-white">
                <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-100">
              Confirmation Received
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Thank You for Registering
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-emerald-100/90 sm:text-base">
              Your registration has been received successfully. The Fraylon team will review your submission and share the next steps shortly.
            </p>
          </div>

          <div className="space-y-8 px-6 py-10 sm:px-10 sm:py-12 lg:px-12">
            <div className="grid gap-4 sm:grid-cols-3">
              {acknowledgementSteps.map((step) => (
                <div
                  key={step.title}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-left shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md"
                >
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-emerald-600 ring-1 ring-emerald-100">
                    {step.icon}
                  </div>
                  <h3 className="text-base font-semibold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="space-y-4 border-t border-slate-200 pt-8 sm:flex sm:items-center sm:justify-between sm:space-y-0">
              <div className="max-w-2xl text-slate-600 sm:text-sm">
                We value your interest in Fraylon Technologies workshops and look forward to supporting your professional growth.
              </div>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  Return to homepage
                </Link>
                <Link
                  href="/#about"
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
                >
                  View workshop information
                </Link>
              </div>
            </div>
          </div>
        </article>

        <footer className="mt-10 rounded-3xl border border-slate-200 bg-white/80 p-6 text-center text-sm text-slate-500 shadow-sm sm:p-8">
          Fraylon Technologies appreciates your registration. This acknowledgement confirms receipt of your workshop interest and reflects our commitment to a smooth, professional experience.
        </footer>
      </div>
    </main>
  );
}


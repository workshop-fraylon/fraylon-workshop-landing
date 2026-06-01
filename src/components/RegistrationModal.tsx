"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type SubmitPhase = "idle" | "checking" | "opening-payment";

type AlertPopup = {
  title: string;
  message: string;
  variant: "duplicate" | "error";
};

// ── Domain config ────────────────────────────────────────────────────────────
const TECHNICAL_DOMAINS = [
  "AI & Prompt Engineering",
  "Web Development",
  "UI/UX Design",
  "Cybersecurity",
  "SaaS Product Building",
];

const NON_TECHNICAL_DOMAINS = [
  "Digital Marketing",
  "HR & Recruitment",
  "Sales Psychology",
  "Brand Strategy",
];

const ALL_DOMAINS = [...TECHNICAL_DOMAINS, ...NON_TECHNICAL_DOMAINS];

const TECHNICAL_PRICE = 499;
const NON_TECHNICAL_PRICE = 399;

function getPriceForDomain(domain: string | null): number {
  if (!domain) return 0;
  return TECHNICAL_DOMAINS.includes(domain) ? TECHNICAL_PRICE : NON_TECHNICAL_PRICE;
}

function dedupeColleges(names: string[]): string[] {
  const seen = new Set<string>();
  const unique: string[] = [];
  for (const name of names) {
    const trimmed = name.trim();
    const key = trimmed.toLowerCase();
    if (!trimmed || seen.has(key)) continue;
    seen.add(key);
    unique.push(trimmed);
  }
  return unique.sort((a, b) => a.localeCompare(b));
}

// ── College list ─────────────────────────────────────────────────────────────
const FALLBACK_COLLEGES = [
  "IIT Bombay","IIT Delhi","IIT Madras","IIT Kanpur","IIT Kharagpur",
  "IIT Roorkee","IIT Guwahati","IIT Hyderabad","IIT Indore","IIT Jodhpur",
  "IIT Mandi","IIT Patna","IIT Ropar","IIT Bhubaneswar","IIT Gandhinagar",
  "IIT Tirupati","IIT Dhanbad (ISM)","IIT Palakkad","IIT Jammu","IIT Goa",
  "IIT Bhilai","IIT Dharwad","IIT Varanasi (BHU)",
  "NIT Trichy","NIT Surathkal","NIT Warangal","NIT Calicut","NIT Rourkela",
  "NIT Kurukshetra","NIT Silchar","NIT Durgapur","NIT Jamshedpur",
  "NIT Allahabad (MNNIT)","NIT Nagpur (VNIT)","NIT Surat","NIT Patna",
  "NIT Bhopal (MANIT)","NIT Hamirpur","NIT Jalandhar",
  "BITS Pilani","BITS Goa","BITS Hyderabad",
  "VIT Vellore","VIT Chennai","SRM University",
  "Manipal Academy of Higher Education","Amity University Noida",
  "Lovely Professional University (LPU)","Chandigarh University",
  "Anna University","Delhi University","Mumbai University",
  "Pune University","Osmania University","Jadavpur University",
  "Calcutta University","Madras University","Bangalore University",
  "Banaras Hindu University (BHU)","Aligarh Muslim University (AMU)",
  "Jawaharlal Nehru University (JNU)",
];

// ── Razorpay type ────────────────────────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => {
      open(): void;
      on(event: string, cb: (r: Record<string, unknown>) => void): void;
    };
  }
}

// Dynamically load Razorpay script if not already present
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof window.Razorpay !== "undefined") { resolve(true); return; }
    const s = document.createElement("script");
    s.src = "https://checkout.razorpay.com/v1/checkout.js";
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });
}

// ── Component ────────────────────────────────────────────────────────────────
export default function RegistrationModal() {
  const router = useRouter();
  const emailInputRef = useRef<HTMLInputElement>(null);
  const [isOpen, setIsOpen]               = useState(false);
  const [fullName, setFullName]           = useState("");
  const [email, setEmail]                 = useState("");
  const [phone, setPhone]                 = useState("");
  const [referralCode, setReferralCode]   = useState("");
  const [activeDomain, setActiveDomain]   = useState<string | null>(null);
  const [institutionQuery, setInstitutionQuery] = useState("");
  const [showColleges, setShowColleges]   = useState(false);
  const [submitPhase, setSubmitPhase]     = useState<SubmitPhase>("idle");
  const [alertPopup, setAlertPopup]       = useState<AlertPopup | null>(null);
  const [formError, setFormError]         = useState<string | null>(null);
  const [collegeList, setCollegeList]     = useState<string[]>(() => dedupeColleges(FALLBACK_COLLEGES));
  const [collegesLoading, setCollegesLoading] = useState(false);

  // Load comprehensive college list from public JSON on first open
  useEffect(() => {
    if (!isOpen) return;
    setCollegesLoading(true);
    fetch("/india-colleges.json")
      .then((r) => r.json())
      .then((data: string[]) => {
        const unique = dedupeColleges(data);
        if (unique.length > 0) setCollegeList(unique);
      })
      .catch(() => {})
      .finally(() => setCollegesLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Hash-based open/close functionality.
  useEffect(() => {
    const handle = () => {
      const open = window.location.hash === "#register";
      setIsOpen(open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    handle();
    window.addEventListener("hashchange", handle);
    return () => { window.removeEventListener("hashchange", handle); document.body.style.overflow = ""; };
  }, []);

  const closeModal = () => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  const trimmedQuery = institutionQuery.trim().toLowerCase();
  const filteredColleges = trimmedQuery.length < 1
    ? []
    : collegeList.filter((c) => c.toLowerCase().includes(trimmedQuery)).slice(0, 10);

  const price = getPriceForDomain(activeDomain);
  const isSubmitting = submitPhase !== "idle";

  const closeAlertPopup = () => {
    const wasDuplicate = alertPopup?.variant === "duplicate";
    setAlertPopup(null);
    setSubmitPhase("idle");
    if (wasDuplicate) {
      setFormError("This email is already registered. Please use a different email address.");
      requestAnimationFrame(() => {
        emailInputRef.current?.focus();
        emailInputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setAlertPopup(null);

    if (!activeDomain) { alert("Please select a domain before proceeding."); return; }

    setSubmitPhase("checking");

    try {
      const checkRes = await fetch("/api/check-registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const check = await checkRes.json();

      if (!checkRes.ok && !check.registered) {
        setSubmitPhase("idle");
        setAlertPopup({
          title: "Could not verify email",
          message: "We couldn't verify your email right now. Please check your connection and try again.",
          variant: "error",
        });
        return;
      }

      if (check.registered) {
        setSubmitPhase("idle");
        setAlertPopup({
          title: "Already registered",
          message:
            "This email is already registered for the Fraylon workshop. Please use a different email address to continue. If you believe this is a mistake, contact workshopfraylon@gmail.com.",
          variant: "duplicate",
        });
        return;
      }
    } catch {
      setSubmitPhase("idle");
      setAlertPopup({
        title: "Could not verify email",
        message: "We couldn't verify your email right now. Please check your connection and try again.",
        variant: "error",
      });
      return;
    }

    setSubmitPhase("opening-payment");

    // Ensure Razorpay script is loaded
    const loaded = await loadRazorpayScript();
    if (!loaded) {
      setSubmitPhase("idle");
      setAlertPopup({
        title: "Payment unavailable",
        message: "Failed to load the payment gateway. Please check your internet connection and try again.",
        variant: "error",
      });
      return;
    }

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: price * 100,          // paise — fixed, user cannot modify
      currency: "INR",
      name: "Fraylon Technologies",
      description: `Workshop Registration — ${activeDomain}`,
      image: "/fraylon_logo2.png",
      prefill: { name: fullName, email, contact: phone },
      notes: { domain: activeDomain, referral_code: referralCode || "NONE" },
      theme: { color: "#10b981" },
      config: {
        display: {
          hide: [{ method: "paylater" }],
          blocks: {
            qr: {
              name: "Pay via QR Code",
              instruments: [{ method: "upi", flows: ["qr"] }],
            },
          },
          sequence: ["block.qr", "block.default"],
          preferences: { show_default_blocks: true },
        },
      },
      handler: async (response: { razorpay_payment_id: string }) => {
        try {
          const res = await fetch("/api/save-registration", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              fullName, email, phone, referralCode,
              collegeName: institutionQuery,
              domainTrack: activeDomain,
              razorpay_payment_id: response.razorpay_payment_id,
            }),
          });
          const result = await res.json();
          if (result.success) {
            setFullName(""); setEmail(""); setPhone("");
            setReferralCode(""); setInstitutionQuery(""); setActiveDomain(null);
            setFormError(null);
            closeModal();
            router.push("/Ackowledgement");
          } else if (result.code === "ALREADY_REGISTERED") {
            setAlertPopup({
              title: "Already registered",
              message:
                `Payment was received, but this email is already registered. Please contact workshopfraylon@gmail.com with your payment ID: ${response.razorpay_payment_id}`,
              variant: "duplicate",
            });
          } else {
            setAlertPopup({
              title: "Registration not saved",
              message:
                `Payment was received but we could not save your registration. Please contact workshopfraylon@gmail.com with payment ID: ${response.razorpay_payment_id}`,
              variant: "error",
            });
          }
        } catch {
          setAlertPopup({
            title: "Registration not saved",
            message:
              `Payment was received but a server error occurred. Please contact workshopfraylon@gmail.com with payment ID: ${response.razorpay_payment_id}`,
            variant: "error",
          });
        } finally {
          setSubmitPhase("idle");
        }
      },
      modal: {
        ondismiss: () => {
          setSubmitPhase("idle");
        },
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", () => {
      setSubmitPhase("idle");
      setAlertPopup({
        title: "Payment failed",
        message: "Your payment did not go through. Please try again.",
        variant: "error",
      });
    });
    rzp.open();
    setSubmitPhase("idle");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-slate-900/60 p-3 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={closeModal}
    >
      <div
        className="relative my-4 w-full max-w-4xl animate-slide-down-in overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900"
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* ── Left sidebar — hidden on mobile ── */}
          <div className="hidden md:flex md:w-1/3 flex-col justify-center border-r border-slate-200 bg-slate-50 p-10">
            <span className="mb-2 block text-sm font-semibold uppercase tracking-wider text-emerald-600">Registration</span>
            <h2 className="mb-4 text-2xl font-bold text-slate-900">Reserve your seat</h2>
            <p className="mb-8 text-sm leading-relaxed text-slate-600">
              Complete the form and a Fraylon advisor will confirm your enrollment within one business day.
            </p>
            <ul className="mb-8 space-y-3 text-sm text-slate-700">
              {["Flexible rescheduling", "Invoice billing available", "Confirmation within one business day"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" />
                  {t}
                </li>
              ))}
            </ul>

            {/* Pricing summary on sidebar */}
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">Registration Fee</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Technical domains</span>
                <span className="font-bold text-slate-900">₹{TECHNICAL_PRICE}</span>
              </div>
              <div className="mt-1 flex items-center justify-between text-sm">
                <span className="text-slate-600">Non-technical domains</span>
                <span className="font-bold text-slate-900">₹{NON_TECHNICAL_PRICE}</span>
              </div>
            </div>

            <div className="mt-auto border-t border-slate-200 pt-6">
              <strong className="block text-sm text-slate-900">Need help?</strong>
              <a href="mailto:workshopfraylon@gmail.com" className="text-sm text-emerald-600 hover:underline">workshopfraylon@gmail.com</a>
            </div>
          </div>

          {/* ── Right: form ── */}
          <div className="flex w-full flex-col overflow-y-auto md:w-2/3" style={{ maxHeight: "92dvh" }}>

            {/* Mobile compact header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3 md:hidden">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Registration</p>
                <p className="text-base font-bold text-slate-900">Reserve your seat</p>
              </div>
              <a href="mailto:workshopfraylon@gmail.com" className="text-xs text-emerald-600 underline underline-offset-2">Need help?</a>
            </div>

            <form className="space-y-8 p-5 sm:p-8 md:p-10" onSubmit={handleSubmit}>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Applicant details</h3>
                <p className="mt-1 text-sm text-slate-500">All fields are required unless marked optional.</p>
              </div>

              {formError && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800"
                >
                  {formError}
                </div>
              )}

              {/* Step 1 — Personal info */}
              <div className="space-y-5">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</span>
                  <span className="font-semibold text-slate-900">Personal information</span>
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-slate-700">Full name</label>
                    <input id="fullName" type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email address</label>
                    <input ref={emailInputRef} id="email" type="email" value={email} onChange={(e) => { setEmail(e.target.value); setFormError(null); setAlertPopup(null); }}
                      className={`w-full rounded-lg border px-4 py-2.5 transition-colors focus:outline-none focus:ring-1 ${
                        formError
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500"
                          : "border-slate-300 focus:border-emerald-500 focus:ring-emerald-500"
                      }`} required />
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">Phone number</label>
                    <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" required />
                  </div>
                  <div>
                    <label htmlFor="referralCode" className="mb-1 block text-sm font-medium text-slate-700">
                      Referral Code <span className="ml-1 text-xs text-slate-400">(Optional)</span>
                    </label>
                    <input id="referralCode" type="text" value={referralCode} onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter ambassador referral code"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                  </div>
                  <div className="relative sm:col-span-2">
                    <label htmlFor="institution" className="mb-1 block text-sm font-medium text-slate-700">
                      College / Institution
                      {collegesLoading && <span className="ml-2 text-xs font-normal text-slate-400">Loading colleges…</span>}
                    </label>
                    <input id="institution" type="text" value={institutionQuery} autoComplete="off" required
                      onChange={(e) => { setInstitutionQuery(e.target.value); setShowColleges(true); }}
                      onFocus={() => setShowColleges(true)}
                      onBlur={() => setTimeout(() => setShowColleges(false), 150)}
                      placeholder="Search your college or university…"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                    {showColleges && filteredColleges.length > 0 && (
                      <ul className="absolute z-20 mt-1 w-full overflow-y-auto rounded-lg border border-slate-200 bg-white shadow-lg" style={{ maxHeight: 200 }}>
                        {filteredColleges.map((c, i) => (
                          <li key={`${c}-${i}`} onMouseDown={() => { setInstitutionQuery(c); setShowColleges(false); }}
                            className="cursor-pointer px-4 py-2 text-sm text-slate-700 transition-colors hover:bg-emerald-50">
                            {c}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2 — Domain */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">2</span>
                  <span className="font-semibold text-slate-900">Choose your domain</span>
                </div>

                <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Technical — ₹{TECHNICAL_PRICE}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {TECHNICAL_DOMAINS.map((domain) => (
                    <button key={domain} type="button" onClick={() => setActiveDomain(domain)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                        activeDomain === domain
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                      }`}>
                      <span className={`text-sm font-semibold ${activeDomain === domain ? "text-emerald-700" : "text-slate-900"}`}>{domain}</span>
                      <span className={`ml-2 shrink-0 text-xs font-bold ${activeDomain === domain ? "text-emerald-600" : "text-slate-400"}`}>₹{TECHNICAL_PRICE}</span>
                    </button>
                  ))}
                </div>

                <p className="pt-1 text-xs font-bold uppercase tracking-widest text-slate-400">Non-Technical — ₹{NON_TECHNICAL_PRICE}</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {NON_TECHNICAL_DOMAINS.map((domain) => (
                    <button key={domain} type="button" onClick={() => setActiveDomain(domain)}
                      className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                        activeDomain === domain
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                          : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                      }`}>
                      <span className={`text-sm font-semibold ${activeDomain === domain ? "text-emerald-700" : "text-slate-900"}`}>{domain}</span>
                      <span className={`ml-2 shrink-0 text-xs font-bold ${activeDomain === domain ? "text-emerald-600" : "text-slate-400"}`}>₹{NON_TECHNICAL_PRICE}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 — Motivation */}
              <div className="space-y-4">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">3</span>
                  <span className="font-semibold text-slate-900">Tell us about yourself</span>
                </div>
                <div>
                  <label htmlFor="motivation" className="mb-1 block text-sm font-medium text-slate-700">Why do you want to join?</label>
                  <textarea id="motivation" rows={3} required placeholder="Share your goals and what you'd like to learn."
                    className="w-full resize-none rounded-lg border border-slate-300 px-4 py-3 transition-colors focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500" />
                </div>
              </div>

              {/* Agreement */}
              <div className="flex items-start gap-3">
                <input type="checkbox" id="agree" required className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <label htmlFor="agree" className="text-sm text-slate-600">
                  I agree to receive workshop information from Fraylon Technologies and accept the privacy policy.
                </label>
              </div>

              {/* Footer — price + submit */}
              <div className="flex flex-col gap-3 border-t border-slate-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  {activeDomain ? (
                    <div>
                      <p className="text-xs text-slate-400">{activeDomain}</p>
                      <p className="text-lg font-bold text-slate-900">
                        Amount to Pay: <span className="text-emerald-600">₹{price}</span>
                      </p>
                    </div>
                  ) : (
                    <p className="text-sm italic text-slate-400">Select a domain to see price</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <button type="button" onClick={closeModal}
                    className="rounded-lg px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900">
                    Cancel
                  </button>
                  <button type="submit" disabled={isSubmitting}
                    className="rounded-lg bg-emerald-500 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-60">
                    {submitPhase === "checking"
                      ? "Checking email…"
                      : submitPhase === "opening-payment"
                        ? "Opening payment…"
                        : `Pay ₹${price || "—"} & Register`}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Alert popup — duplicate email / errors (no scroll needed) */}
        {alertPopup && (
          <div
            className="absolute inset-0 z-[120] flex items-center justify-center bg-slate-900/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reg-alert-title"
            onClick={closeAlertPopup}
          >
            <div
              className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full ${
                  alertPopup.variant === "duplicate" ? "bg-amber-100 text-amber-600" : "bg-red-100 text-red-600"
                }`}
              >
                {alertPopup.variant === "duplicate" ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 4.88c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )}
              </div>
              <h4 id="reg-alert-title" className="text-center text-lg font-bold text-slate-900">
                {alertPopup.title}
              </h4>
              <p className="mt-3 text-center text-sm leading-relaxed text-slate-600">
                {alertPopup.message}
              </p>
              <button
                type="button"
                onClick={closeAlertPopup}
                className="mt-6 w-full rounded-lg bg-emerald-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
              >
                {alertPopup.variant === "duplicate" ? "Change email" : "OK"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

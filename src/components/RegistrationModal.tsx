"use client";

import { useEffect, useState } from "react";

// Fallback list shown while JSON is loading
const FALLBACK_COLLEGES = [
  // All IITs
  "IIT Bombay","IIT Delhi","IIT Madras","IIT Kanpur","IIT Kharagpur",
  "IIT Roorkee","IIT Guwahati","IIT Hyderabad","IIT Indore","IIT Jodhpur",
  "IIT Mandi","IIT Patna","IIT Ropar","IIT Bhubaneswar","IIT Gandhinagar",
  "IIT Tirupati","IIT Dhanbad (ISM)","IIT Palakkad","IIT Jammu","IIT Goa",
  "IIT Bhilai","IIT Dharwad","IIT Varanasi (BHU)",
  // All NITs
  "NIT Trichy","NIT Surathkal","NIT Warangal","NIT Calicut","NIT Rourkela",
  "NIT Kurukshetra","NIT Silchar","NIT Durgapur","NIT Jamshedpur",
  "NIT Allahabad (MNNIT)","NIT Nagpur (VNIT)","NIT Surat","NIT Patna",
  "NIT Bhopal (MANIT)","NIT Hamirpur","NIT Jalandhar",
  // Popular private & deemed
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

// Extend Window to include Razorpay (loaded via external script in layout)
declare global {
  interface Window {
    Razorpay: new (options: Record<string, unknown>) => { open(): void; on(event: string, cb: (r: Record<string, unknown>) => void): void };
  }
}

export default function RegistrationModal() {
  const [isOpen, setIsOpen] = useState(false);

  // Controlled fields — needed so Razorpay prefill reads them at submit time
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [referralCode, setReferralCode] = useState("");

  const [activeDomain, setActiveDomain] = useState<string | null>(null);
  const [institutionQuery, setInstitutionQuery] = useState("");
  const [showUniversities, setShowUniversities] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [collegeList, setCollegeList] = useState<string[]>(FALLBACK_COLLEGES);
  const [collegesLoading, setCollegesLoading] = useState(false);

  // Load comprehensive Indian colleges list from local JSON on first open
  useEffect(() => {
    if (!isOpen || collegeList !== FALLBACK_COLLEGES) return;
    setCollegesLoading(true);
    fetch("/india-colleges.json")
      .then((r) => r.json())
      .then((data: string[]) => {
        const sorted = [...data].sort((a, b) => a.localeCompare(b));
        if (sorted.length > 0) setCollegeList(sorted);
      })
      .catch(() => { /* keep fallback list */ })
      .finally(() => setCollegesLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const trimmedQuery = institutionQuery.trim().toLowerCase();
  const filteredUniversities = trimmedQuery.length < 1
    ? []
    : collegeList.filter((uni) =>
        uni.toLowerCase().includes(trimmedQuery)
      ).slice(0, 10);

  const getPriceForDomain = (domain: string | null) => {
    if (!domain) return 0;
    const technicalDomains = ['AI & Prompt Engineering', 'Web Development', 'Cybersecurity'];
    return technicalDomains.includes(domain) ? 499 : 399;
  };

  useEffect(() => {
    const handleHashChange = () => {
      setIsOpen(window.location.hash === "#register");
      if (window.location.hash === "#register") {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    };

    handleHashChange(); // initial check

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
      document.body.style.overflow = "";
    };
  }, []);

  const closeModal = () => {
    window.history.pushState(null, "", window.location.pathname + window.location.search);
    setIsOpen(false);
    document.body.style.overflow = "";
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-slate-900/60 backdrop-blur-sm overflow-y-auto p-3 sm:p-6 sm:items-center" onClick={closeModal}>
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl my-4 sm:my-8 overflow-hidden animate-slide-down-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left Side: Intro — hidden on mobile, visible md+ */}
          <div className="hidden md:flex bg-slate-50 p-10 md:w-1/3 border-r border-slate-200 flex-col justify-center">
            <span className="text-emerald-600 font-semibold text-sm uppercase tracking-wider mb-2 block">Registration</span>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Reserve your seat</h2>
            <p className="text-slate-600 mb-8 text-sm leading-relaxed">
              Complete the form and a Fraylon advisor will confirm your enrollment within one business day.
            </p>
            <ul className="space-y-3 mb-8 text-slate-700 text-sm">
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
                Flexible rescheduling
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
                Invoice billing available
              </li>
              <li className="flex items-center gap-3">
                <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500"></span>
                Confirmation within one business day
              </li>
            </ul>
            <div className="mt-auto pt-6 border-t border-slate-200">
              <strong className="block text-slate-900 mb-1 text-sm">Need help?</strong>
              <span className="text-slate-600 text-sm">Email <a href="mailto:workshopfraylon@gmail.com" className="text-emerald-600 hover:underline">workshopfraylon@gmail.com</a></span>
            </div>
          </div>

          {/* Right Side: Form — full width on mobile */}
          <div className="w-full md:w-2/3 flex flex-col max-h-[92dvh] md:max-h-[88vh] overflow-y-auto">

            {/* Mobile-only compact header */}
            <div className="md:hidden sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">Registration</p>
                <p className="text-base font-bold text-slate-900">Reserve your seat</p>
              </div>
              <a href="mailto:workshopfraylon@gmail.com" className="text-xs text-emerald-600 underline underline-offset-2">Need help?</a>
            </div>
            <form
              className="space-y-8 p-5 sm:p-8 md:p-10"
              onSubmit={async (e) => {
                e.preventDefault();

                if (!activeDomain) {
                  alert("Please select a domain before proceeding.");
                  return;
                }

                setIsSubmitting(true);

                const priceInRupees = getPriceForDomain(activeDomain);

                const options = {
                  key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                  amount: priceInRupees * 100,
                  currency: "INR",
                  name: "Fraylon Technologies",
                  description: "Workshop Registration",
                  image: "/fraylon_logo.jpeg",

                  // Prefill from controlled state
                  prefill: {
                    name: fullName,
                    email: email,
                    contact: phone,
                  },

                  theme: { color: "#10b981" },

                  config: {
                    display: {
                      hide: [{ method: "paylater" }],
                    },
                  },

                  handler: async (response: { razorpay_payment_id: string }) => {
                    try {
                      const res = await fetch("/api/save-registration", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          fullName,
                          email,
                          phone,
                          referralCode,
                          collegeName: institutionQuery,
                          domainTrack: activeDomain,
                          razorpay_payment_id: response.razorpay_payment_id,
                        }),
                      });

                      const result = await res.json();

                      if (result.success) {
                        // Reset all controlled state
                        setFullName("");
                        setEmail("");
                        setPhone("");
                        setReferralCode("");
                        setInstitutionQuery("");
                        setActiveDomain(null);

                        closeModal();
                        alert("Registration successful! We'll confirm your enrollment within one business day.");
                      } else {
                        alert("Payment was received but we couldn't save your registration. Please contact contact@fraylontech.com with your payment ID: " + response.razorpay_payment_id);
                      }
                    } catch {
                      alert("Payment received but server error occurred. Please contact contact@fraylontech.com with your payment ID: " + response.razorpay_payment_id);
                    } finally {
                      setIsSubmitting(false);
                    }
                  },
                };

                const rzp = new window.Razorpay(options);

                rzp.on("payment.failed", () => {
                  setIsSubmitting(false);
                  alert("Payment failed. Please try again.");
                });

                rzp.open();
              }}
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Applicant details</h3>
                <p className="text-sm text-slate-500">All fields are required unless marked optional.</p>
              </div>

              {/* Step 1 */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">1</span>
                  <span className="font-semibold text-slate-900">Personal information</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1">Full name</label>
                    <input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">Phone number</label>
                    <input
                      type="tel"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="referralCode"
                      className="block text-sm font-medium text-slate-700 mb-1"
                    >
                      Referral Code
                      <span className="text-slate-400 text-xs ml-1">(Optional)</span>
                    </label>

                    <input
                      type="text"
                      id="referralCode"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      placeholder="Enter ambassador referral code"
                    />
                  </div>
                  <div className="relative">
                    <label htmlFor="institution" className="block text-sm font-medium text-slate-700 mb-1">
                      College / Institution
                      {collegesLoading && <span className="ml-2 text-xs font-normal text-slate-400">Loading colleges…</span>}
                    </label>
                    <input
                      type="text"
                      id="institution"
                      value={institutionQuery}
                      onChange={(e) => {
                        setInstitutionQuery(e.target.value);
                        setShowUniversities(true);
                      }}
                      onFocus={() => setShowUniversities(true)}
                      onBlur={() => setTimeout(() => setShowUniversities(false), 200)}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors"
                      placeholder="Search your college or university…"
                      required
                      autoComplete="off"
                    />
                    {showUniversities && filteredUniversities.length > 0 && (
                      <ul className="absolute z-10 w-full mt-1 bg-white border border-slate-200 rounded-lg shadow-lg max-h-48 overflow-y-auto">
                        {filteredUniversities.map((uni) => (
                          <li
                            key={uni}
                            onMouseDown={() => {
                              setInstitutionQuery(uni);
                              setShowUniversities(false);
                            }}
                            className="px-4 py-2 hover:bg-emerald-50 cursor-pointer text-sm text-slate-700 transition-colors"
                          >
                            {uni}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">2</span>
                  <span className="font-semibold text-slate-900">Choose your domain</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {["AI & Prompt Engineering", "Web Development", "UI/UX Design", "Cybersecurity", "Digital Marketing", "HR & Recruitment", "Sales Psychology", "Brand Strategy"].map(domain => (
                    <button
                      key={domain}
                      type="button"
                      onClick={() => setActiveDomain(domain)}
                      className={`flex flex-col items-start p-4 rounded-xl border text-left transition-all ${activeDomain === domain
                        ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-500"
                        : "border-slate-200 hover:border-emerald-300 hover:bg-slate-50"
                        }`}
                    >
                      <span className={`font-semibold ${activeDomain === domain ? "text-emerald-700" : "text-slate-900"}`}>{domain}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3 */}
              <div className="space-y-6">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">3</span>
                  <span className="font-semibold text-slate-900">Tell us about yourself</span>
                </div>

                <div>
                  <label htmlFor="motivation" className="block text-sm font-medium text-slate-700 mb-1">Why do you want to join?</label>
                  <textarea id="motivation" rows={4} className="w-full rounded-lg border border-slate-300 px-4 py-3 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-colors resize-none" placeholder="Share your goals, what you'd like to learn, and how this workshop fits your path." required></textarea>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4">
                <input type="checkbox" id="agree" className="mt-1 h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" required />
                <label htmlFor="agree" className="text-sm text-slate-600">
                  I agree to receive workshop information from Fraylon Technologies and accept the privacy policy.
                </label>
              </div>

              <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="w-full sm:w-auto text-left">
                  {activeDomain ? (
                    <span className="text-slate-700 font-medium text-lg">
                      Amount to Pay: <strong className="text-emerald-700">₹{getPriceForDomain(activeDomain)}</strong>
                    </span>
                  ) : (
                    <span className="text-slate-400 text-sm italic">Select a domain to see price</span>
                  )}
                </div>
                <div className="flex gap-4 w-full sm:w-auto justify-end">
                  <button type="button" onClick={closeModal} className="px-6 py-2.5 text-slate-600 font-medium hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-6 py-2.5 bg-emerald-500 text-white font-semibold rounded-lg hover:bg-emerald-600 transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Opening payment..." : "Pay & Register"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";

const LINKS = {
  Services: [
    "WordPress Development",
    "Custom Software",
    "Design Services",
    "Digital Marketing",
    "AI & Data Science",
    "Mobile Apps",
    "MVP Development",
  ],
  Solutions: [
    "IT Consulting",
    "Cloud Transformation",
    "Cyber Security",
    "Enterprise ERP",
    "Data Analytics",
  ],
  Industries: [
    "Banking & Finance",
    "Healthcare",
    "Manufacturing",
    "Retail & E-commerce",
    "Energy & Utilities",
    "Public Sector",
  ],
  Company: [
    "About Us",
    "Leadership",
    "Careers",
    "Case Studies",
    "News & Media",
    "Partners",
    "Contact Us",
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-[#eef0f3] pt-14 pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Main grid ─────────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-[260px_1fr_1fr_1fr_1fr]">

          {/* ── Col 1: Brand ──────────────────────────────────────────────── */}
          <div className="flex flex-col gap-6">
            {/* Logo */}
            <a href="#">
              <Image
                src="/fraylon_logo.jpeg"
                alt="Fraylon Technologies"
                width={150}
                height={46}
                className="h-12 w-auto object-contain"
              />
            </a>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition-colors hover:border-[#0a66c2] hover:text-[#0a66c2]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              {/* X / Twitter */}
              <a href="#" aria-label="X" className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition-colors hover:border-slate-900 hover:text-slate-900">
                <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Facebook */}
              <a href="#" aria-label="Facebook" className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition-colors hover:border-[#1877f2] hover:text-[#1877f2]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" className="flex h-8 w-8 items-center justify-center rounded border border-slate-300 bg-white text-slate-500 transition-colors hover:border-[#e1306c] hover:text-[#e1306c]">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>

            {/* Stay Informed */}
            <div>
              <p className="mb-2.5 text-sm font-semibold text-slate-700">Stay Informed</p>
              <form
                className="flex"
                onSubmit={(e) => { e.preventDefault(); setEmail(""); }}
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 rounded-l border border-r-0 border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 placeholder-slate-400 outline-none focus:border-slate-400"
                />
                <button
                  type="submit"
                  className="rounded-r bg-slate-800 px-4 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-slate-700"
                >
                  Join
                </button>
              </form>
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-1.5 text-sm text-slate-500">
              <p className="leading-snug">
                6-477, Sri Ram Nagar Colony, Balaji Nagar,<br />
                Hyderabad, Telangana – 500087
              </p>
              <a href="mailto:contact@fraylontech.com" className="transition-colors hover:text-slate-800">
                contact@fraylontech.com
              </a>
              <a href="tel:+17048281085" className="transition-colors hover:text-slate-800">
                +1 (704) 828-1085
              </a>
              <a href="tel:+919381617904" className="transition-colors hover:text-slate-800">
                +91 93816 17904
              </a>
            </div>
          </div>

          {/* ── Link columns ──────────────────────────────────────────────── */}
          {(Object.entries(LINKS) as [string, string[]][]).map(([heading, items]) => (
            <div key={heading}>
              <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.15em] text-slate-800">
                {heading}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-sm text-slate-500 transition-colors duration-150 hover:text-slate-900"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────────────── */}
        <div className="border-t border-slate-300/60 py-5">
          <p className="text-center text-xs text-slate-400">
            © {new Date().getFullYear()} Fraylon Technologies. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fraylon Workshop | Registration",
  description:
    "Register for the Fraylon workshop — learn from industry mentors through hands-on sessions.",
  icons: {
    icon: "/fraylon_logo2.png",
    shortcut: "/fraylon_logo2.png",
    apple: "/fraylon_logo2.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {/* Load Razorpay checkout SDK globally so window.Razorpay is available */}
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

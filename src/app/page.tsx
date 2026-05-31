import AboutSection from "@/components/AboutSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import TimelineSection from "@/components/TimelineSection"; //  CORRECT (No curly braces)
import TracksSection from "@/components/TracksSection";
import WhatYoullLearnSection from "@/components/WhatYoullLearnSection";
import MentorsSection from "@/components/MentorsSection";
import FAQSection from "@/components/FAQSection";

import RegistrationModal from "@/components/RegistrationModal";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <TimelineSection />
        <TracksSection />
        <WhatYoullLearnSection />
        <MentorsSection />
        <FAQSection />

        <RegistrationModal />
      </main>

      <Footer />
    </div>
  );
}

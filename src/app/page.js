// src/app/page.js

import Navbar from "./components/navbar/page";
import HeroSection from "./components/heroSection/heroSection";
import AboutSection from "./components/aboutSection/page";
import ProjectSection from "./components/carousel/page";
import ExperienceSection from "./components/ExperienceSection/page";
import SkillSection from "./components/skillSection/page";
import ContactSection from "./components/contactSection/page";
import Footer from "./components/footer/page";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] transition-colors duration-300">
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectSection />
        <ExperienceSection />
        <SkillSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

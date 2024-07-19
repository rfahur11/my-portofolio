// src/app/page.js

import Navbar from "./components/navbar/page";
import HeroSection from "./components/heroSection/heroSection";
import ProjectSection from "./components/carousel/page";
import ExperienceSection from "./components/ExperienceSection/page";
import SkillSection from "./components/skillSection/page";
import ContactSection from "./components/contactSection/page";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <ProjectSection />
      <ExperienceSection />
      <SkillSection />
      <ContactSection />

      <footer className="bg-gray-800 text-white text-center p-4">
        &copy; 2024 My Portfolio. All rights reserved.
      </footer>
    </div>
  );
}

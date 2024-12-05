"use client";
// src/app/components/ProjectSection.js

import React from "react";
import ProjectCarousel from "../projectCarousel";

const ProjectSection = () => {
  return (
    <section id="projects" className="py-16 bg-green-300">
      <ProjectCarousel />
    </section>
  );
};

export default ProjectSection;

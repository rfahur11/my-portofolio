// src/app/components/ExperienceSection.js

"use client";

import React from "react";

const experiences = [
  {
    title:
      "Bangkit Academy 2024 Batch 1 Machine Learning Path - Bandung, West Java",
    description:
      "●	Self-studying through the Coursera and Dicoding platforms to master machine learning material and learn the soft skills needed in the workplace, as well as improving English language proficiency.●	Collaborating with the cloud computing and mobile development (Android) teams on the capstone project to create an application for learning Javanese script",
  },
  {
    title: "Experience 2",
    description: "Description for experience 2.",
  },
  {
    title: "Experience 3",
    description: "Description for experience 3.",
  },
  {
    title: "Experience 4",
    description: "Description for experience 4.",
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-8">
          Experience
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {experiences.map((experience, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-bold mb-4">{experience.title}</h3>
              <p className="text-gray-600">{experience.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

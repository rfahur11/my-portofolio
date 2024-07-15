// src/app/components/ExperienceSection.js

"use client";

import React from "react";

const experiences = [
  {
    id: 1,
    title:
      "Bangkit Academy 2024 Batch 1 Machine Learning Path - Bandung, West Java",
    icon: "/bangkit.png",
    description:
      "Machine learning and data analyst concept understanding (16 February 2024 - 30 June 2024)",
    list: [
      "Self-studying through the Coursera and Dicoding platforms to master machine learning material and learn the soft skills needed in the workplace, as well as improving English language proficiency",
      "Collaborating with the cloud computing and mobile development (Android) teams on the capstone project to create an application for learning Javanese script.",
    ],
  },
  {
    id: 2,
    title:
      "State Vocational High School (SMK N) 2 of Purwakarta - Purwakarta, West Java",
    icon: "/logo_smekda.png",
    description:
      "Teaching and administrative staff (22 August – 22 December 2023)",
    list: [
      "Instructed Computer and Network Engineering subjects for 10th-grade students, utilizing the Merdeka Curriculum to deliver educational content and cultivate a positive learning environment during the internship at SMKN 2 Purwakarta.",
      "Collaborated with the administrative team to enhance the school's operational processes, gaining a deep understanding of the dynamics of education and efficient administrative practices.",
    ],
  },
  {
    id: 3,
    title: "Health Center of Bantarsari - Cilacap, Central Java",
    icon: "/logo-puskesmas.png",
    description: "IT Staff (18 July – 29 October 2022)",
    list: [
      "Oversaw the publication and management of the public health center's website, ensuring up-to-date content availability and an enhanced user interface; achieved a 20% increase in user engagement within 3 months.",
      "Conceptualized and crafted an Excel-based VBA information system, optimizing data management procedures and achieving a remarkable 30% increase in productivity within an estimate 2 months.",
    ],
  },
  {
    id: 4,
    title: "Binar Academy 2023 Fullstack Web Developer - Tangerang, West Java",
    icon: "/binar_academy_logo.jpeg",
    description:
      "Javascript (react js and next js framework) understanding (16 February 2023 - 30 June 2023)",
    list: [
      "Self and group studying through the virtual meeting platforms to master fullstack web concept and learn the soft skills needed in the workplace, as well as improving collaboration skills.",
      "Collaborating with the mobile development (Android) teams on the capstone project to create an fly ticket booking.",
    ],
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
          {experiences.map((experience) => (
            <div
              key={experience.id}
              className="bg-gradient-to-r from-green-400 via-white to-gray-400 p-6 rounded-lg shadow-md relative"
            >
              <div className="flex items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {experience.title}
                </h3>
                <img
                  src={experience.icon}
                  alt="Custom Icon"
                  className="h-9 w-9 ml-2"
                />
              </div>
              <p className="text-gray-900 mb-2">{experience.description}</p>
              <ul className="list-disc list-inside space-y-1">
                {experience.list.map((item, index) => (
                  <li key={index} className="text-gray-700">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

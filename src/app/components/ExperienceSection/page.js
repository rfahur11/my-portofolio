"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const experiences = [
  {
    id: 1,
    title: "Bangkit Academy 2024 — Machine Learning Path",
    organization: "Bangkit Academy, MSIB Batch 6",
    location: "Bandung, West Java",
    icon: "/bangkit.png",
    period: "Feb 2024 — Jun 2024",
    description:
      "Intensive program on machine learning and data analytics, powered by Google, GoTo, and Traveloka.",
    highlights: [
      "Mastered ML concepts through Coursera and Dicoding platforms, including deep learning, computer vision, and NLP",
      "Developed capstone project: Caraka — Javanese script learning app with TensorFlow Lite model for character recognition",
      "Collaborated with Cloud Computing and Android teams across disciplines",
    ],
  },
  {
    id: 2,
    title: "Teaching & Administrative Staff",
    organization: "SMKN 2 Purwakarta",
    location: "Purwakarta, West Java",
    icon: "/logo_smekda.png",
    period: "Aug 2023 — Dec 2023",
    description:
      "Internship as teaching and administrative staff at state vocational high school.",
    highlights: [
      "Instructed Computer and Network Engineering for 10th-grade students using the Merdeka Curriculum",
      "Collaborated with administrative team to enhance school operational processes",
      "Cultivated a positive learning environment and gained deep understanding of education dynamics",
    ],
  },
  {
    id: 3,
    title: "IT Staff",
    organization: "Puskesmas Bantarsari",
    location: "Cilacap, Central Java",
    icon: "/logo-puskesmas.png",
    period: "Jul 2022 — Oct 2022",
    description:
      "IT internship managing digital infrastructure at a public health center.",
    highlights: [
      "Managed and published the health center's website, achieving 20% increase in user engagement within 3 months",
      "Built VBA-based Excel information system for stock management, increasing productivity by 30%",
      "Developed automated letters management system to streamline administrative correspondence",
    ],
  },
  {
    id: 4,
    title: "Fullstack Web Developer Program",
    organization: "Binar Academy, MSIB Batch 4",
    location: "Tangerang, Banten",
    icon: "/binar_academy_logo.jpeg",
    period: "Feb 2023 — Jun 2023",
    description:
      "Intensive fullstack web development program with JavaScript (React.js & Next.js).",
    highlights: [
      "Mastered fullstack web development concepts through virtual learning platforms",
      "Built capstone project: FlyTicket — a flight ticket booking website deployed on Netlify",
      "Enhanced collaboration and soft skills through group project development",
    ],
  },
];

const ExperienceSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [experiences, setExperiences] = useState([]);

  React.useEffect(() => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-accent-emerald/5 dark:bg-accent-emerald/[0.03] rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent-emerald text-sm font-medium tracking-wider uppercase">
            {language === "id" ? "Perjalanan Saya" : "My Journey"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-2 text-[var(--text-primary)]">
            {language === "id" ? "Pengalaman " : "Work "}<span className="text-gradient">{language === "id" ? "Kerja" : "Experience"}</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-blue via-accent-violet to-accent-emerald md:-translate-x-px" />

          {experiences.map((exp, index) => {
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.15 }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 md:gap-0 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Node */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-gradient-to-r from-accent-blue to-accent-violet -translate-x-1.5 md:-translate-x-1.5 mt-8 z-10 ring-4 ring-[var(--bg-primary)]" />

                {/* Card */}
                <div
                  className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? "md:pr-0 md:mr-auto" : "md:pl-0 md:ml-auto"
                  }`}
                >
                  <div className="glass-card p-6 hover-lift group">
                    {/* Period Badge */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-blue/10 dark:bg-accent-blue/10 mb-4">
                      <span className="text-xs font-medium text-accent-blue">
                        {exp.period}
                      </span>
                    </div>

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-dark-700 p-1">
                        <img
                          src={exp.icon}
                          alt={exp.organization}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] leading-snug">
                          {language === "id" && exp.title_id ? exp.title_id : exp.title}
                        </h3>
                        <p className="text-sm text-accent-blue mt-0.5">
                          {exp.organization}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] mt-0.5">
                          📍 {exp.location}
                        </p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[var(--text-muted)] mb-4">
                      {language === "id" && exp.description_id ? exp.description_id : exp.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {(language === "id" && exp.highlights_id && exp.highlights_id.length > 0 ? exp.highlights_id : exp.highlights).map((highlight, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;

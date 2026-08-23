"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin, Code2, Briefcase } from "lucide-react";

const stats = [
  { label: "Projects", value: "5+", icon: Code2 },
  { label: "Experiences", value: "4+", icon: Briefcase },
  { label: "Fresh Graduate", value: "2024", icon: GraduationCap },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-blue/5 dark:bg-accent-blue/[0.03] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-accent-blue text-sm font-medium tracking-wider uppercase">
            Get to know me
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-2 text-[var(--text-primary)]">
            About <span className="text-gradient">Me</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-6"
          >
            <p className="text-lg leading-relaxed text-[var(--text-secondary)]">
              Fresh graduate from{" "}
              <span className="font-semibold text-[var(--text-primary)]">
                Indonesia University of Education
              </span>
              , majoring in Information and System Technology. Currently a
              freelance developer passionate about solving real-world problems
              through technology.
            </p>

            <p className="text-base leading-relaxed text-[var(--text-muted)]">
              A self-taught fullstack web developer with a strong interest in
              machine learning and data-driven solutions. I believe in building
              meaningful and delightful digital products that create an
              equilibrium between user needs and business goals.
            </p>

            <p className="text-base leading-relaxed text-[var(--text-muted)]">
              I&apos;m always eager to learn new technologies and collaborate
              with talented people. Whether it&apos;s crafting responsive web
              interfaces, building intelligent ML models, or designing
              user-centric experiences — I&apos;m all in.
            </p>

            {/* Location */}
            <div className="flex items-center gap-2 text-[var(--text-muted)]">
              <MapPin size={16} className="text-accent-blue" />
              <span className="text-sm">Indonesia</span>
            </div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-2 space-y-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="glass-card p-5 flex items-center gap-4 hover-lift group cursor-default"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent-blue/20 to-accent-violet/20 flex items-center justify-center group-hover:from-accent-blue/30 group-hover:to-accent-violet/30 transition-all duration-300">
                  <stat.icon
                    size={22}
                    className="text-accent-blue group-hover:scale-110 transition-transform"
                  />
                </div>
                <div>
                  <div className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[var(--text-muted)]">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Education Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="glass-card p-5 hover-lift cursor-default"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-accent-emerald/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-accent-emerald" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">
                    S.Pd. Information & System Technology
                  </div>
                  <div className="text-xs text-[var(--text-muted)] mt-1">
                    Indonesia University of Education
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

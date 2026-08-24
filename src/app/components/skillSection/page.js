"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";

const categoriesTemplate = [
  {
    key: "Frontend",
    title: "Frontend",
    color: "from-accent-blue to-blue-400",
    bgColor: "bg-accent-blue/10",
    textColor: "text-accent-blue",
  },
  {
    key: "Backend",
    title: "Backend & Database",
    color: "from-accent-violet to-purple-400",
    bgColor: "bg-accent-violet/10",
    textColor: "text-accent-violet",
  },
  {
    key: "Machine Learning",
    title: "Machine Learning",
    color: "from-accent-emerald to-green-400",
    bgColor: "bg-accent-emerald/10",
    textColor: "text-accent-emerald",
  },
  {
    key: "Tools",
    title: "Tools & Design",
    color: "from-accent-amber to-orange-400",
    bgColor: "bg-accent-amber/10",
    textColor: "text-accent-amber",
  },
];

const SkillSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error(err));
  }, []);

  // Map database categories to UI groups
  const groupedCategories = categoriesTemplate.map((cat) => {
    const catSkills = skills.filter((s) => {
      if (cat.key === "Backend") return s.category.includes("Backend");
      if (cat.key === "Tools") return s.category.includes("Tools");
      return s.category === cat.key;
    });

    return {
      ...cat,
      skills: catSkills,
    };
  }).filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-accent-amber/5 dark:bg-accent-amber/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-amber text-sm font-medium tracking-wider uppercase">
            What I Know
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-2 text-[var(--text-primary)]">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto text-base">
            Technologies and tools I use to bring ideas to life.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {groupedCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + catIndex * 0.1 }}
              className="glass-card p-6 hover-lift"
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`w-3 h-8 rounded-full bg-gradient-to-b ${category.color}`}
                />
                <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)]">
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.4 + catIndex * 0.1 + skillIndex * 0.05,
                    }}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-medium text-[var(--text-secondary)]">
                        {skill.name}
                      </span>
                      <span
                        className={`text-xs font-medium ${category.textColor}`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-[var(--bg-secondary)] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${skill.level}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: 0.6 + catIndex * 0.15 + skillIndex * 0.08,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${category.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillSection;

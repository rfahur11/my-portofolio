"use client";

import React, { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";

const categories = ["All", "Web", "Mobile", "Data", "Tools"];

const projects = [
  {
    id: 1,
    title: "FlyTicket — Flight Booking",
    imageUrl: "/flyTicket.png",
    link: "https://flyticket.netlify.app/",
    description:
      "Full-featured website to book flight tickets. Capstone project from Binar Academy MSIB Batch 4. Built with React.js and deployed on Netlify.",
    techStack: ["React.js", "Node.js", "REST API"],
    category: "Web",
  },
  {
    id: 2,
    title: "E-Commerce Analytics Dashboard",
    imageUrl: "/e-commerce.png",
    link: "https://data-ecommerce.streamlit.app/",
    description:
      "Interactive data analytics dashboard built with Python to extract actionable insights from e-commerce sample data. Deployed on Streamlit Cloud.",
    techStack: ["Python", "Streamlit", "Pandas", "Matplotlib"],
    category: "Data",
  },
  {
    id: 3,
    title: "Caraka — Javanese Script Learning",
    imageUrl: "/carakaMobile.jpg",
    link: "https://mega.nz/file/df9TCIaK#GVV4GWSJ_eYaaQoMvO4VDJson6ALVY7hygZsVQZef1Y",
    description:
      "Android app educating elementary students about Javanese script using ML-powered recognition. Bangkit Academy MSIB Batch 6 capstone project.",
    techStack: ["TensorFlow Lite", "Keras", "Android", "Kotlin"],
    category: "Mobile",
  },
  {
    id: 4,
    title: "Stock Management System",
    imageUrl: "/vba-stock.png",
    link: "https://docs.google.com/spreadsheets/d/1gg4H02IjGb1D9wStSXTSn1rb4x6WV9GG/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
    description:
      "VBA-powered Excel information system optimizing stock management at Bantarsari Health Center. Achieved 30% productivity increase.",
    techStack: ["VBA", "Excel", "Automation"],
    category: "Tools",
  },
  {
    id: 5,
    title: "Letters Management System",
    imageUrl: "/vba-letter.png",
    link: "https://docs.google.com/spreadsheets/d/13y6N0kSHGIqXUFyAdYU2-OXcvYysZWw1/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
    description:
      "Automated letter management system using VBA macro, streamlining correspondence processes at Bantarsari Health Center.",
    techStack: ["VBA", "Excel", "Automation"],
    category: "Tools",
  },
];

const ProjectSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);

  React.useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const filteredProjects =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-violet/5 dark:bg-accent-violet/[0.03] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="text-accent-violet text-sm font-medium tracking-wider uppercase">
            My Work
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-2 text-[var(--text-primary)]">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-2xl text-base">
            A collection of projects showcasing my skills in web development,
            mobile apps, data analytics, and automation.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-5 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                activeFilter === cat
                  ? "bg-gradient-to-r from-accent-blue to-accent-violet text-white shadow-lg shadow-accent-blue/25"
                  : "glass text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="glass-card overflow-hidden hover-lift h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Overlay Actions */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                      <span className="text-white text-xs font-medium px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
                        {project.category}
                      </span>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors"
                      >
                        <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] mb-2 line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 flex-1">
                      {project.description}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2.5 py-1 rounded-md bg-accent-blue/10 dark:bg-accent-blue/10 text-accent-blue font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card max-w-2xl w-full max-h-[85vh] overflow-y-auto"
            >
              {/* Modal Image */}
              <div className="relative aspect-video">
                <img
                  src={selectedProject.imageUrl}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-md text-white hover:bg-black/60 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 sm:p-8">
                <span className="text-xs font-medium tracking-wider uppercase text-accent-blue">
                  {selectedProject.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-[var(--text-primary)] mt-2 mb-4">
                  {selectedProject.title}
                </h3>
                <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
                  {selectedProject.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-sm px-3 py-1.5 rounded-lg bg-accent-blue/10 text-accent-blue font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white text-sm font-medium hover:shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectSection;

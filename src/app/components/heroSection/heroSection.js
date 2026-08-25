"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail, ChevronDown, Download } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "../icons";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/rfahur11",
    label: "GitHub",
    color: "hover:text-white hover:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-900",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fahrur-rozi-336b04164/",
    label: "LinkedIn",
    color: "hover:text-white hover:bg-[#0077B5]",
  },
  {
    icon: Mail,
    href: "mailto:rfahrur6045@gmail.com",
    label: "Email",
    color: "hover:text-white hover:bg-accent-rose",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const HeroSection = () => {
  const [avatarUrl, setAvatarUrl] = React.useState("/images/avatar.jpg");

  React.useEffect(() => {
    fetch("/api/settings?key=avatarUrl")
      .then((res) => {
        if (res.ok) return res.json();
      })
      .then((data) => {
        if (data && data.value) {
          setAvatarUrl(data.value);
        }
      })
      .catch((err) => console.error("Error loading avatarUrl:", err));
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-hero-gradient-light dark:bg-hero-gradient" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent-blue/20 dark:bg-accent-blue/10 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent-violet/20 dark:bg-accent-violet/10 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent-cyan/10 dark:bg-accent-cyan/5 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(var(--text-primary) 1px, transparent 1px), linear-gradient(90deg, var(--text-primary) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 container-custom px-4 sm:px-6 flex flex-col md:flex-row items-center gap-12 md:gap-16 pt-20"
      >
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div variants={item}>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase glass mb-6 text-accent-blue">
              Available for opportunities
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-6"
          >
            <span className="text-[var(--text-primary)]">Hi, I&apos;m </span>
            <span className="text-gradient">Fahrur Rozi</span>
          </motion.h1>

          <motion.div variants={item} className="mb-6">
            <div className="text-xl sm:text-2xl lg:text-3xl font-heading font-medium text-[var(--text-secondary)]">
              <span>I&apos;m a </span>
              <TypeAnimation
                sequence={[
                  "Fullstack Developer",
                  2000,
                  "AI Native Engineer",
                  2000,
                  "MLOps Engineer",
                  2000,
                  "Backend Engineer",
                  2000,
                ]}
                wrapper="span"
                speed={40}
                repeat={Infinity}
                className="text-gradient font-semibold"
              />
            </div>
          </motion.div>

          <motion.p
            variants={item}
            className="text-base sm:text-lg text-[var(--text-muted)] max-w-xl mx-auto md:mx-0 mb-8 leading-relaxed"
          >
            Fullstack & Integration Engineer with ~2.5 years of experience architecting AI-powered systems,
            resilient ERP pipelines, high-throughput backend services (Go/Fiber), and cross-platform apps.
            Currently building automation & ML solutions at PT Bharata International Pharmaceutical.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-4 justify-center md:justify-start mb-10"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-sm shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all duration-300 hover:scale-105"
            >
              <Mail size={18} />
              Contact Me
            </a>
            <a
              href="/resume.docx"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl glass font-medium text-sm text-[var(--text-primary)] hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Download size={18} />
              Download CV
            </a>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={item}
            className="flex gap-3 justify-center md:justify-start"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`p-3 rounded-xl glass text-[var(--text-muted)] transition-all duration-300 hover:scale-110 ${social.color}`}
              >
                <social.icon size={20} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Profile Image */}
        <motion.div variants={item} className="flex-shrink-0">
          <div className="relative">
            {/* Gradient Ring */}
            <div className="absolute -inset-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan rounded-full animate-spin-slow opacity-75 blur-sm" />
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[var(--bg-primary)]">
              <img
                src={avatarUrl}
                alt="Fahrur Rozi"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 px-3 py-1.5 rounded-lg glass-card text-xs font-medium text-accent-blue"
            >
              🚀 Open to Work
            </motion.div>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute -bottom-4 -left-4 px-3 py-1.5 rounded-lg glass-card text-xs font-medium text-accent-emerald"
            >
              💻 2.5yr Experience
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <a
          href="#about"
          className="flex flex-col items-center gap-2 text-[var(--text-muted)] hover:text-accent-blue transition-colors"
        >
          <span className="text-xs font-medium tracking-wider uppercase">
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <ChevronDown size={20} />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
};

export default HeroSection;

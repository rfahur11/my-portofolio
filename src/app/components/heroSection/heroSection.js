"use client";

import React from "react";
import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Mail, ChevronDown, Download } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { GithubIcon as Github, LinkedinIcon as Linkedin, WhatsappIcon, XIcon, MediumIcon } from "../icons";

const socialLinks = [
  {
    icon: Github,
    href: "https://github.com/rfahur11",
    label: "GitHub",
    color: "hover:text-white hover:bg-gray-800 dark:hover:bg-white dark:hover:text-gray-900",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fahrur-rozi-k-336b04164/",
    label: "LinkedIn",
    color: "hover:text-white hover:bg-[#0077B5]",
  },
  {
    icon: WhatsappIcon,
    href: "https://wa.me/62895380146029",
    label: "WhatsApp",
    color: "hover:text-white hover:bg-[#25D366]",
  },
  {
    icon: XIcon,
    href: "https://x.com/FahrurR41870299",
    label: "X",
    color: "hover:text-white hover:bg-gray-800",
  },
  {
    icon: MediumIcon,
    href: "https://medium.com/@rfahrur6045",
    label: "Medium",
    color: "hover:text-white hover:bg-[#12100E]",
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

const HeroSection = ({ initialAvatarUrl = "/images/avatar.jpg" }) => {
  const { language } = useLanguage();
  const [avatarUrl, setAvatarUrl] = React.useState(initialAvatarUrl);

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
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-16 sm:pb-24 md:py-0">
      {/* Animated Background Wrapper with overflow-hidden */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
      </div>

      {/* Content */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 container-custom px-4 sm:px-6 flex flex-col md:flex-row items-center gap-8 sm:gap-10 md:gap-16 pt-2 pb-6 sm:pt-6 sm:pb-10 md:pt-20 md:pb-0"
      >
        {/* Text Content */}
        <div className="flex-1 text-center md:text-left">
          <motion.div variants={item}>
            <span className="inline-block px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-medium tracking-wider uppercase glass mb-4 sm:mb-6 text-accent-blue">
              {language === "id" ? "Tersedia untuk peluang kerja" : "Available for opportunities"}
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="text-2xl min-[380px]:text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold leading-tight mb-3 sm:mb-6"
          >
            <span className="text-[var(--text-primary)]">{language === "id" ? "Halo, Saya " : "Hi, I'm "}</span>
            <span className="text-gradient">Fahrur Rozi</span>
          </motion.h1>

          <motion.div variants={item} className="mb-4 sm:mb-6">
            <div className="text-base min-[380px]:text-lg sm:text-2xl lg:text-3xl font-heading font-medium text-[var(--text-secondary)] min-h-[1.75rem] sm:min-h-[2.25rem]">
              <span>{language === "id" ? "Saya seorang " : "I'm a "}</span>
              <TypeAnimation
                sequence={[
                  "Fullstack Developer",
                  2000,
                  "Workflow Automation (n8n)",
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
            className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-xl mx-auto md:mx-0 mb-6 sm:mb-8 leading-relaxed"
          >
            {language === "id"
              ? "Fullstack & Integration Engineer dengan ~2.5 tahun pengalaman merancang sistem berbasis AI, pipeline ERP tangguh, layanan backend throughput tinggi (Go/Fiber), dan aplikasi lintas platform. Saat ini membangun solusi otomatisasi & ML di PT Bharata International Pharmaceutical."
              : "Fullstack & Integration Engineer with ~2.5 years of experience architecting AI-powered systems, resilient ERP pipelines, high-throughput backend services (Go/Fiber), and cross-platform apps. Currently building automation & ML solutions at PT Bharata International Pharmaceutical."}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={item}
            className="flex flex-wrap gap-3 sm:gap-4 justify-center md:justify-start mb-6 sm:mb-10"
          >
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-accent-blue to-accent-violet text-white font-medium text-sm shadow-lg shadow-accent-blue/25 hover:shadow-accent-blue/40 transition-all duration-300 hover:scale-105"
            >
              <Mail size={18} />
              {language === "id" ? "Hubungi Saya" : "Contact Me"}
            </a>
            <a
              href={language === "id" ? "/cv-id.pdf" : "/cv-en.pdf"}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl glass font-medium text-sm text-[var(--text-primary)] hover:shadow-glow transition-all duration-300 hover:scale-105"
            >
              <Download size={18} />
              {language === "id" ? "Unduh CV" : "Download CV"}
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
        <motion.div variants={item} className="flex-shrink-0 order-first md:order-last mb-4 md:mb-0">
          <div className="relative p-2 sm:p-3">
            {/* Gradient Ring */}
            <div className="absolute inset-0.5 sm:inset-1 bg-gradient-to-r from-accent-blue via-accent-violet to-accent-cyan rounded-full animate-spin-slow opacity-75 blur-sm will-change-transform" />
            <div className="relative w-40 h-40 min-[380px]:w-48 min-[380px]:h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-[var(--bg-primary)] shadow-2xl transition-all duration-300">
              <img
                src={avatarUrl}
                alt="Fahrur Rozi"
                className="w-full h-full object-cover object-[center_20%]"
                loading="eager"
              />
            </div>

            {/* Floating Badges */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1 -right-1 sm:top-2 sm:-right-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl glass-card text-[10px] min-[380px]:text-[11px] sm:text-xs font-medium text-accent-blue whitespace-nowrap shadow-lg z-10 flex items-center gap-1.5 backdrop-blur-md border border-white/20 dark:border-white/10"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-blue opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-blue"></span>
              </span>
              <span>🚀 Open to Work</span>
            </motion.div>
            <motion.div
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.5,
              }}
              className="absolute bottom-1 -left-1 sm:bottom-2 sm:-left-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl glass-card text-[10px] min-[380px]:text-[11px] sm:text-xs font-medium text-accent-emerald whitespace-nowrap shadow-lg z-10 flex items-center gap-1.5 backdrop-blur-md border border-white/20 dark:border-white/10"
            >
              <span>💻 2.5yr Experience</span>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2"
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

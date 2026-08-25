"use client";

import React, { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

const getNavLinks = (lang) => [
  { href: "#about", label: lang === "id" ? "Tentang" : "About" },
  { href: "#projects", label: lang === "id" ? "Proyek" : "Projects" },
  { href: "#experience", label: lang === "id" ? "Pengalaman" : "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: lang === "id" ? "Kontak" : "Contact" },
];

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const navLinks = getNavLinks(language);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map((link) => link.href.slice(1));
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [language]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/5 dark:shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20 px-4 sm:px-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="relative group"
          >
            <span className="text-xl md:text-2xl font-heading font-bold text-gradient">
              FR
            </span>
            <span className="text-xl md:text-2xl font-heading font-light text-[var(--text-primary)] ml-1">
              .dev
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent-blue to-accent-violet transition-all duration-300 group-hover:w-full" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300
                  ${
                    activeSection === link.href.slice(1)
                      ? "text-accent-blue dark:text-accent-blue"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                  }`}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.span
                    layoutId="activeNav"
                    className="absolute inset-0 bg-accent-blue/10 dark:bg-accent-blue/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}

            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="ml-3 px-2 py-1.5 rounded-xl glass hover:shadow-glow transition-all duration-300 flex items-center gap-1 text-[11px] font-bold text-[var(--text-primary)]"
              aria-label="Toggle language"
            >
              <Globe size={14} className="text-accent-blue" />
              <span>{language === "en" ? "EN" : "ID"}</span>
            </button>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="ml-3 p-2.5 rounded-xl glass hover:shadow-glow transition-all duration-300"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ y: -10, opacity: 0, rotate: -90 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 10, opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {theme === "dark" ? (
                      <Sun size={18} className="text-accent-amber" />
                    ) : (
                      <Moon size={18} className="text-accent-violet" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            )}
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === "en" ? "id" : "en")}
              className="px-2 py-1 rounded-lg glass flex items-center gap-1 text-[10px] font-bold text-[var(--text-primary)]"
              aria-label="Toggle language"
            >
              <Globe size={12} className="text-accent-blue" />
              <span>{language === "en" ? "EN" : "ID"}</span>
            </button>

            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg glass"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <Sun size={18} className="text-accent-amber" />
                ) : (
                  <Moon size={18} className="text-accent-violet" />
                )}
              </button>
            )}

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg glass"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {isOpen ? (
                    <X size={20} className="text-[var(--text-primary)]" />
                  ) : (
                    <Menu size={20} className="text-[var(--text-primary)]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-1">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200
                      ${
                        activeSection === link.href.slice(1)
                          ? "text-accent-blue bg-accent-blue/10"
                          : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                      }`}
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

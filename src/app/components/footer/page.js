"use client";

import React from "react";
import { Mail, ArrowUp, Heart } from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin } from "../icons";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/rfahur11", label: "GitHub" },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/fahrur-rozi-336b04164/",
    label: "LinkedIn",
  },
  { icon: Mail, href: "mailto:rfahrur6045@gmail.com", label: "Email" },
];

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-[var(--border-color)]">
      <div className="container-custom px-4 sm:px-6 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="mb-3">
              <span className="text-xl font-heading font-bold text-gradient">
                FR
              </span>
              <span className="text-xl font-heading font-light text-[var(--text-primary)] ml-1">
                .dev
              </span>
            </div>
            <p className="text-sm text-[var(--text-muted)] max-w-xs leading-relaxed">
              Building meaningful digital products that create an equilibrium
              between user needs and business goals.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-[var(--text-muted)] hover:text-accent-blue transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social & Back to Top */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4">
              Connect
            </h4>
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-2.5 rounded-lg glass text-[var(--text-muted)] hover:text-accent-blue transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 text-sm text-[var(--text-muted)] hover:text-accent-blue transition-colors group"
            >
              <ArrowUp
                size={16}
                className="group-hover:-translate-y-1 transition-transform"
              />
              Back to top
            </button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-muted)]">
            &copy; {new Date().getFullYear()} Fahrur Rozi. All rights reserved.
          </p>
          <p className="text-xs text-[var(--text-muted)] flex items-center gap-1">
            Built with <Heart size={12} className="text-accent-rose fill-accent-rose" /> using Next.js & TailwindCSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

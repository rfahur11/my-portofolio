"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { GithubIcon as Github, LinkedinIcon as Linkedin, WhatsappIcon, XIcon, MediumIcon } from "../icons";
import { useLanguage } from "@/lib/LanguageContext";

const ContactSection = () => {
  const { language } = useLanguage();

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "rfahrur6045@gmail.com",
      href: "mailto:rfahrur6045@gmail.com",
      color: "text-accent-rose",
      bgColor: "bg-accent-rose/10",
    },
    {
      icon: Phone,
      label: language === "id" ? "Nomor HP / WA" : "Phone / WA",
      value: "+62 895 3801 46029",
      href: "https://wa.me/62895380146029",
      color: "text-accent-emerald",
      bgColor: "bg-accent-emerald/10",
    },
    {
      icon: MapPin,
      label: language === "id" ? "Lokasi" : "Location",
      value: language === "id" ? "Cilacap, Jawa Tengah, Indonesia" : "Cilacap, Central Java, Indonesia",
      href: null,
      color: "text-accent-blue",
      bgColor: "bg-accent-blue/10",
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/rfahur11",
      label: "GitHub",
      hoverColor: "hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/fahrur-rozi-k-336b04164/",
      label: "LinkedIn",
      hoverColor: "hover:bg-[#0077B5] hover:text-white",
    },
    {
      icon: WhatsappIcon,
      href: "https://wa.me/62895380146029",
      label: "WhatsApp",
      hoverColor: "hover:bg-[#25D366] hover:text-white",
    },
    {
      icon: XIcon,
      href: "https://x.com/FahrurR41870299",
      label: "X",
      hoverColor: "hover:bg-gray-800 hover:text-white",
    },
    {
      icon: MediumIcon,
      href: "https://medium.com/@rfahrur6045",
      label: "Medium",
      hoverColor: "hover:bg-[#12100E] hover:text-white",
    },
    {
      icon: Mail,
      href: "mailto:rfahrur6045@gmail.com",
      label: "Email",
      hoverColor: "hover:bg-accent-rose hover:text-white",
    },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle, sending, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-rose/5 dark:bg-accent-rose/[0.03] rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      <div className="absolute top-0 left-0 w-64 h-64 bg-accent-blue/5 dark:bg-accent-blue/[0.03] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />

      <div ref={ref} className="container-custom relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-accent-rose text-sm font-medium tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mt-2 text-[var(--text-primary)]">
            Let&apos;s Work{" "}
            <span className="text-gradient">Together</span>
          </h2>
          <p className="text-[var(--text-muted)] mt-4 max-w-2xl mx-auto text-base">
            Have a project in mind or want to collaborate? Feel free to reach out
            — I&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-6"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                {info.href ? (
                  <a
                    href={info.href}
                    className="glass-card p-4 flex items-center gap-4 hover-lift group block"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl ${info.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                    >
                      <info.icon size={22} className={info.color} />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                        {info.value}
                      </div>
                    </div>
                  </a>
                ) : (
                  <div className="glass-card p-4 flex items-center gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl ${info.bgColor} flex items-center justify-center`}
                    >
                      <info.icon size={22} className={info.color} />
                    </div>
                    <div>
                      <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                        {info.label}
                      </div>
                      <div className="text-sm font-medium text-[var(--text-primary)] mt-0.5">
                        {info.value}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <p className="text-sm text-[var(--text-muted)] mb-3">
                Follow me on
              </p>
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`p-3 rounded-xl glass text-[var(--text-muted)] transition-all duration-300 hover:scale-110 ${social.hoverColor}`}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass-card p-6 sm:p-8">
              <div className="space-y-5">
                {/* Name */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-[var(--text-secondary)] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all resize-none"
                    placeholder="Tell me about your project or idea..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending" || status === "success"}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    status === "success"
                      ? "bg-accent-emerald text-white"
                      : "bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:shadow-lg hover:shadow-accent-blue/25 hover:scale-[1.02]"
                  } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {status === "sending" && (
                    <Loader2 size={18} className="animate-spin" />
                  )}
                  {status === "success" && <CheckCircle size={18} />}
                  {status === "idle" && <Send size={18} />}
                  {status === "error" && <Send size={18} />}

                  {status === "idle" && "Send Message"}
                  {status === "sending" && "Sending..."}
                  {status === "success" && "Message Sent!"}
                  {status === "error" && "Failed — Try Again"}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

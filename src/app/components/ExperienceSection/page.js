"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/lib/LanguageContext";

const fallbackTranslations = {
  "PT Bharata International Pharmaceutical": {
    title_id: "Full Stack Developer",
    description_id: "Merancang dan mengimplementasikan sistem otomatisasi bertenaga AI untuk meningkatkan efisiensi operasional bisnis serta mendukung pengambilan keputusan berbasis data.",
    highlights_id: [
      "Mengatasi kegagalan pembatasan laju API Terbuka Shopee yang kritis, memulihkan stabilitas sinkronisasi pesanan 100% di bawah pembekuan kode vendor aktif",
      "Merekayasa pipeline penyerapan pesanan asinkron idempoten untuk saluran multi-marketplace dengan mekanisme retry backoff dan dead-letter queue recovery",
      "Melatih dan menerapkan model Computer Vision untuk analisis kulit otomatis dalam alur kerja produk R&D",
      "Membangun modul keuangan enterprise dengan Java & React, mengotomatiskan pelacakan arus kas dan efisiensi administratif",
      "Menetapkan standar kontrak API termasuk versioning request, taksonomi error, dan automated test gates"
    ]
  },
  "Bangkit": {
    title_id: "Machine Learning — Bangkit Academy",
    description_id: "Program intensif machine learning dan analitik data dari Google, GoTo, dan Traveloka. Mendalami konsep machine learning, deep learning, dan computer vision.",
    highlights_id: [
      "Menguasai konsep ML melalui platform Coursera dan Dicoding, mencakup deep learning, computer vision, dan pemrosesan bahasa alami (NLP)",
      "Mengembangkan proyek capstone: Caraka — aplikasi pembelajaran aksara Jawa dengan model TensorFlow Lite untuk pengenalan karakter",
      "Berkolaborasi dengan tim Cloud Computing dan Android lintas disiplin dalam pengembangan aplikasi capstone"
    ]
  },
  "SMK": {
    title_id: "Staf Pengajar & Asisten IT",
    description_id: "Praktik kerja lapangan sebagai asisten guru IT di SMK Negeri 2 Purwakarta, mengajar materi Dasar Teknik Jaringan Komputer dan Telekomunikasi (TJKT) untuk siswa kelas 10.",
    highlights_id: [
      "Mengajar materi Dasar Teknik Jaringan Komputer dan Telekomunikasi (TJKT) untuk siswa kelas 10 menggunakan Kurikulum Merdeka",
      "Berkolaborasi dengan tim administrasi untuk meningkatkan efisiensi proses operasional sekolah",
      "Menciptakan lingkungan belajar yang positif dan interaktif serta mendalami dinamika manajemen pendidikan"
    ]
  },
  "Binar": {
    title_id: "Program Fullstack Web Developer",
    description_id: "Bootcamp intensif pengembangan web fullstack dengan ekosistem JavaScript modern (React.js & Next.js).",
    highlights_id: [
      "Menguasai konsep pengembangan web modern (frontend dan backend) melalui platform pembelajaran interaktif",
      "Membangun proyek capstone: FlyTicket — website pemesanan tiket pesawat yang di-deploy di Netlify",
      "Meningkatkan kemampuan kolaborasi tim, komunikasi teknis, dan manajemen proyek secara terstruktur"
    ]
  },
  "Bantarsari": {
    title_id: "Staf IT & Sistem Informasi",
    description_id: "Magang IT dalam pengelolaan infrastruktur digital dan otomatisasi administrasi di Puskesmas Bantarsari.",
    highlights_id: [
      "Mengelola dan mempublikasikan konten website resmi puskesmas, meningkatkan kunjungan informasi sebesar 20% dalam 3 bulan",
      "Membangun sistem informasi manajemen stok berbasis Excel VBA, meningkatkan produktivitas staf hingga 30%",
      "Mengembangkan sistem otomasi persuratan digital berbasis makro VBA untuk mempercepat alur surat-menyurat puskesmas"
    ]
  }
};

const formatPeriod = (period, lang) => {
  if (!period) return "";
  if (lang !== "id") return period;
  return period
    .replace(/Present/gi, "Sekarang")
    .replace(/Aug/gi, "Agu")
    .replace(/Oct/gi, "Okt")
    .replace(/Dec/gi, "Des");
};

const getExperienceField = (exp, field, lang) => {
  if (lang !== "id") return exp[field];

  const idField = `${field}_id`;
  const val = exp[idField];

  // If valid translation string/array exists in item (length > 1 guards against typo like "s")
  if (Array.isArray(val) && val.length > 0) return val;
  if (typeof val === "string" && val.trim().length > 1) return val;

  // Check fallback dictionary
  for (const [key, fallback] of Object.entries(fallbackTranslations)) {
    if (
      (exp.organization && exp.organization.toLowerCase().includes(key.toLowerCase())) ||
      (exp.title && exp.title.toLowerCase().includes(key.toLowerCase()))
    ) {
      if (fallback[idField]) return fallback[idField];
    }
  }

  return exp[field];
};

const ExperienceSection = () => {
  const { language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setExperiences(data);
        }
      })
      .catch((err) => console.error("Error fetching experiences:", err));
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
            const title = getExperienceField(exp, "title", language);
            const description = getExperienceField(exp, "description", language);
            const highlights = getExperienceField(exp, "highlights", language) || [];
            const period = formatPeriod(exp.period, language);

            return (
              <motion.div
                key={exp.id || index}
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
                        {period}
                      </span>
                    </div>

                    {/* Header */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-white dark:bg-dark-700 p-1">
                        <img
                          src={exp.icon || "/placeholder-logo.png"}
                          alt={exp.organization}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] leading-snug">
                          {title}
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
                      {description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {highlights.map((highlight, i) => (
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

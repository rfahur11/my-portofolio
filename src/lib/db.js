import fs from "fs";
import path from "path";
import { supabase, isSupabaseConfigured } from "./supabase";

const mockDbPath = path.join(process.cwd(), "src/lib/mockDb.json");

// Default initial seed data
const initialData = {
  projects: [
    {
      id: 1,
      title: "FlyTicket — Flight Booking",
      imageUrl: "/flyTicket.png",
      link: "https://flyticket.netlify.app/",
      description: "Full-featured website to book flight tickets. Capstone project from Binar Academy MSIB Batch 4. Built with React.js and deployed on Netlify.",
      techStack: ["React.js", "Node.js", "REST API"],
      category: "Web"
    },
    {
      id: 2,
      title: "E-Commerce Analytics Dashboard",
      imageUrl: "/e-commerce.png",
      link: "https://data-ecommerce.streamlit.app/",
      description: "Interactive data analytics dashboard built with Python to extract actionable insights from e-commerce sample data. Deployed on Streamlit Cloud.",
      techStack: ["Python", "Streamlit", "Pandas", "Matplotlib"],
      category: "Data"
    },
    {
      id: 3,
      title: "Caraka — Javanese Script Learning",
      imageUrl: "/carakaMobile.jpg",
      link: "https://mega.nz/file/df9TCIaK#GVV4GWSJ_eYaaQoMvO4VDJson6ALVY7hygZsVQZef1Y",
      description: "Android app educating elementary students about Javanese script using ML-powered recognition. Bangkit Academy MSIB Batch 6 capstone project.",
      techStack: ["TensorFlow Lite", "Keras", "Android", "Kotlin"],
      category: "Mobile"
    },
    {
      id: 4,
      title: "Stock Management System",
      imageUrl: "/vba-stock.png",
      link: "https://docs.google.com/spreadsheets/d/1gg4H02IjGb1D9wStSXTSn1rb4x6WV9GG/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
      description: "VBA-powered Excel information system optimizing stock management at Bantarsari Health Center. Achieved 30% productivity increase.",
      techStack: ["VBA", "Excel", "Automation"],
      category: "Tools"
    },
    {
      id: 5,
      title: "Letters Management System",
      imageUrl: "/vba-letter.png",
      link: "https://docs.google.com/spreadsheets/d/13y6N0kSHGIqXUFyAdYU2-OXcvYysZWw1/edit?usp=sharing&ouid=103583580848086143171&rtpof=true&sd=true",
      description: "Automated letter management system using VBA macro, streamlining correspondence processes at Bantarsari Health Center.",
      techStack: ["VBA", "Excel", "Automation"],
      category: "Tools"
    }
  ],
  experiences: [
    {
      id: 1,
      title: "Bangkit Academy 2024 — Machine Learning Path",
      organization: "Bangkit Academy, MSIB Batch 6",
      location: "Bandung, West Java",
      icon: "/bangkit.png",
      period: "Feb 2024 — Jun 2024",
      description: "Intensive program on machine learning and data analytics, powered by Google, GoTo, and Traveloka.",
      highlights: [
        "Mastered ML concepts through Coursera and Dicoding platforms, including deep learning, computer vision, and NLP",
        "Developed capstone project: Caraka — Javanese script learning app with TensorFlow Lite model for character recognition",
        "Collaborated with Cloud Computing and Android teams across disciplines"
      ]
    },
    {
      id: 2,
      title: "Teaching & Administrative Staff",
      organization: "SMKN 2 Purwakarta",
      location: "Purwakarta, West Java",
      icon: "/logo_smekda.png",
      period: "Aug 2023 — Dec 2023",
      description: "Internship as teaching and administrative staff at state vocational high school.",
      highlights: [
        "Instructed Computer and Network Engineering for 10th-grade students using the Merdeka Curriculum",
        "Collaborated with administrative team to enhance school operational processes",
        "Cultivated a positive learning environment and gained deep understanding of education dynamics"
      ]
    },
    {
      id: 3,
      title: "IT Staff",
      organization: "Puskesmas Bantarsari",
      location: "Cilacap, Central Java",
      icon: "/logo-puskesmas.png",
      period: "Jul 2022 — Oct 2022",
      description: "IT internship managing digital infrastructure at a public health center.",
      highlights: [
        "Managed and published the health center's website, achieving 20% increase in user engagement within 3 months",
        "Built VBA-based Excel information system for stock management, increasing productivity by 30%",
        "Developed automated letters management system to streamline administrative correspondence"
      ]
    },
    {
      id: 4,
      title: "Fullstack Web Developer Program",
      organization: "Binar Academy, MSIB Batch 4",
      location: "Tangerang, Banten",
      icon: "/binar_academy_logo.jpeg",
      period: "Feb 2023 — Jun 2023",
      description: "Intensive fullstack web development program with JavaScript (React.js & Next.js).",
      highlights: [
        "Mastered fullstack web development concepts through virtual learning platforms",
        "Built capstone project: FlyTicket — a flight ticket booking website deployed on Netlify",
        "Enhanced collaboration and soft skills through group project development"
      ]
    }
  ],
  skills: [
    { id: 1, name: "React.js", level: 85, category: "Frontend" },
    { id: 2, name: "Next.js", level: 80, category: "Frontend" },
    { id: 3, name: "HTML/CSS", level: 90, category: "Frontend" },
    { id: 4, name: "TailwindCSS", level: 85, category: "Frontend" },
    { id: 5, name: "JavaScript", level: 85, category: "Frontend" },
    { id: 6, name: "Node.js", level: 70, category: "Backend" },
    { id: 7, name: "REST API", level: 75, category: "Backend" },
    { id: 8, name: "PostgreSQL", level: 65, category: "Backend" },
    { id: 9, name: "Express.js", level: 70, category: "Backend" },
    { id: 10, name: "TensorFlow", level: 75, category: "Machine Learning" },
    { id: 11, name: "Keras", level: 75, category: "Machine Learning" },
    { id: 12, name: "Python", level: 80, category: "Machine Learning" },
    { id: 13, name: "Data Analysis", level: 70, category: "Machine Learning" },
    { id: 14, name: "Figma", level: 80, category: "Tools" },
    { id: 15, name: "Git & GitHub", level: 85, category: "Tools" },
    { id: 16, name: "VS Code", level: 90, category: "Tools" },
    { id: 17, name: "VBA Excel", level: 75, category: "Tools" }
  ],
  contacts: []
};

// Ensure JSON file exists and is populated
const loadLocalData = () => {
  try {
    if (!fs.existsSync(mockDbPath)) {
      fs.writeFileSync(mockDbPath, JSON.stringify(initialData, null, 2));
      return initialData;
    }
    const data = fs.readFileSync(mockDbPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading local db:", error);
    return initialData;
  }
};

const saveLocalData = (data) => {
  try {
    fs.writeFileSync(mockDbPath, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing local db:", error);
  }
};

export const getItems = async (table) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from(table).select("*").order("id", { ascending: true });
    if (!error) return data;
  }
  const local = loadLocalData();
  return local[table] || [];
};

export const insertItem = async (table, item) => {
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from(table).insert([item]).select();
    if (!error) return data[0];
  }
  const local = loadLocalData();
  const newItem = { ...item, id: Date.now() };
  local[table] = [...(local[table] || []), newItem];
  saveLocalData(local);
  return newItem;
};

export const updateItem = async (table, id, item) => {
  const numericId = Number(id);
  const finalId = isNaN(numericId) || String(id).trim() === "" ? id : numericId;
  if (isSupabaseConfigured) {
    const { data, error } = await supabase.from(table).update(item).eq("id", finalId).select();
    if (!error) return data[0];
  }
  const local = loadLocalData();
  local[table] = (local[table] || []).map((x) => (x.id === finalId ? { ...x, ...item } : x));
  saveLocalData(local);
  return { ...item, id: finalId };
};

export const deleteItem = async (table, id) => {
  const numericId = Number(id);
  const finalId = isNaN(numericId) || String(id).trim() === "" ? id : numericId;
  if (isSupabaseConfigured) {
    const { error } = await supabase.from(table).delete().eq("id", finalId);
    if (!error) return true;
  }
  const local = loadLocalData();
  local[table] = (local[table] || []).filter((x) => x.id !== finalId);
  saveLocalData(local);
  return true;
};

export const getSetting = async (key) => {
  const settings = await getItems("settings");
  const found = settings.find((s) => s.key === key);
  return found ? found.value : null;
};

export const updateSetting = async (key, value) => {
  const settings = await getItems("settings");
  const found = settings.find((s) => s.key === key);
  if (found) {
    return await updateItem("settings", found.id, { key, value });
  } else {
    // Generate simple numeric id for mock if needed, Supabase handles serial ids
    const tempId = isSupabaseConfigured ? undefined : Date.now();
    return await insertItem("settings", { id: tempId, key, value });
  }
};


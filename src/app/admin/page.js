"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FolderKanban,
  Briefcase,
  GraduationCap,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Save,
  X,
  Loader2,
  CheckCircle,
  Eye,
  Settings,
  Cpu,
  Clock,
  Play,
  Sparkles,
  RefreshCw,
  CheckCircle2,
  Sliders,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const compressImage = (file, maxWidth = 800, maxHeight = 800, quality = 0.8) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob(
          (blob) => {
            resolve(
              new File([blob], file.name, {
                type: "image/jpeg",
                lastModified: Date.now(),
              })
            );
          },
          "image/jpeg",
          quality
        );
      };
    };
  });
};

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [experiences, setExperiences] = useState([]);
  const [skills, setSkills] = useState([]);
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("/images/avatar.jpg");
  const [selectedMessage, setSelectedMessage] = useState(null);
  const router = useRouter();

  // Form states
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    description_id: "",
    imageUrl: "",
    link: "",
    techStack: "",
    category: "Web",
  });
  const [expForm, setExpForm] = useState({
    title: "",
    title_id: "",
    organization: "",
    location: "",
    period: "",
    description: "",
    description_id: "",
    highlights: "",
    highlights_id: "",
    icon: "/placeholder-logo.png",
  });
  const [skillForm, setSkillForm] = useState({
    name: "",
    level: 80,
    category: "Frontend",
  });

  const [editingId, setEditingId] = useState(null);

  // Automation & Cron state
  const [automationConfig, setAutomationConfig] = useState({
    preset: "0 1 * * *",
    cronExpression: "0 1 * * *",
    query: "Coffee Shop Bandung",
    limit: 10,
    autoTelegram: true,
    enabled: true,
    lastRun: null,
    lastStatus: "Ready",
    lastLeadsCount: 0,
    lastLog: "",
  });
  const [isTriggering, setIsTriggering] = useState(false);
  const [triggerLog, setTriggerLog] = useState("");

  const handleFileUpload = async (file, onUploadSuccess, folder = "general") => {
    try {
      const maxWidth = folder === "avatar" ? 400 : 800;
      const compressed = await compressImage(file, maxWidth, maxWidth, 0.85);

      const formData = new FormData();
      formData.append("file", compressed);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      onUploadSuccess(data.url);
      showToast("Image uploaded and compressed successfully!");
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  useEffect(() => {
    fetchData();
    
    // Poll for new messages every 10 seconds for real-time updates
    const interval = setInterval(() => {
      fetch("/api/contact", { cache: "no-store" })
        .then((res) => {
          if (res.ok) return res.json();
        })
        .then((data) => {
          if (data) setMessages(data);
        })
        .catch((err) => console.error("Poll messages failed:", err));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, expRes, skillRes, msgRes, setRes] = await Promise.all([
        fetch("/api/projects", { cache: "no-store" }),
        fetch("/api/experiences", { cache: "no-store" }),
        fetch("/api/skills", { cache: "no-store" }),
        fetch("/api/contact", { cache: "no-store" }),
        fetch("/api/settings?key=avatarUrl", { cache: "no-store" }),
        fetch("/api/automation", { cache: "no-store" }),
      ]);

      if (projRes.ok) setProjects(await projRes.json());
      if (expRes.ok) setExperiences(await expRes.json());
      if (skillRes.ok) setSkills(await skillRes.json());
      if (msgRes.ok) setMessages(await msgRes.json());
      if (setRes.ok) {
        const val = await setRes.json();
        if (val && val.value) setAvatarUrl(val.value);
      }
      if (arguments[5] || autoRes.ok) {
        const autoData = await autoRes.json();
        if (autoData) setAutomationConfig(autoData);
      }
    } catch (err) {
      setError("Failed to load CMS data.");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type = "success") => {
    if (type === "success") {
      setSuccess(message);
      setTimeout(() => setSuccess(""), 3000);
    } else {
      setError(message);
      setTimeout(() => setError(""), 3000);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  };

  // --- CRUD Projects ---
  const saveProject = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...projectForm,
        techStack: projectForm.techStack.split(",").map((s) => s.trim()),
      };
      
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/projects/${editingId}` : "/api/projects";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save project");

      showToast("Project saved successfully!");
      fetchData();
      resetProjectForm();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const resetProjectForm = () => {
    setProjectForm({
      title: "",
      description: "",
      description_id: "",
      imageUrl: "",
      link: "",
      techStack: "",
      category: "Web",
    });
    setEditingId(null);
  };

  const startEditProject = (p) => {
    setEditingId(p.id);
    setProjectForm({
      title: p.title,
      description: p.description,
      description_id: p.description_id || "",
      imageUrl: p.imageUrl,
      link: p.link,
      techStack: p.techStack.join(", "),
      category: p.category,
    });
  };

  const deleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Project deleted.");
      fetchData();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // --- CRUD Experiences ---
  const saveExperience = async (e) => {
    e.preventDefault();
    try {
      const body = {
        ...expForm,
        highlights: expForm.highlights.split("\n").map((s) => s.trim()).filter(Boolean),
        highlights_id: expForm.highlights_id.split("\n").map((s) => s.trim()).filter(Boolean),
      };

      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/experiences/${editingId}` : "/api/experiences";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save experience");

      showToast("Experience saved!");
      fetchData();
      resetExpForm();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const resetExpForm = () => {
    setExpForm({
      title: "",
      title_id: "",
      organization: "",
      location: "",
      period: "",
      description: "",
      description_id: "",
      highlights: "",
      highlights_id: "",
      icon: "/placeholder-logo.png",
    });
    setEditingId(null);
  };

  const startEditExp = (e) => {
    setEditingId(e.id);
    setExpForm({
      title: e.title,
      title_id: e.title_id || "",
      organization: e.organization,
      location: e.location,
      period: e.period,
      description: e.description,
      description_id: e.description_id || "",
      highlights: e.highlights.join("\n"),
      highlights_id: (e.highlights_id || []).join("\n"),
      icon: e.icon || "/placeholder-logo.png",
    });
  };

  const deleteExperience = async (id) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = await fetch(`/api/experiences/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Experience deleted.");
      fetchData();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  // --- CRUD Skills ---
  const saveSkill = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/skills/${editingId}` : "/api/skills";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(skillForm),
      });

      if (!res.ok) throw new Error("Failed to save skill");

      showToast("Skill saved!");
      fetchData();
      resetSkillForm();
    } catch (err) {
      showToast(err.message, "error");
    }
  };

  const resetSkillForm = () => {
    setSkillForm({ name: "", level: 80, category: "Frontend" });
    setEditingId(null);
  };

  const deleteSkill = async (id) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    try {
      const res = await fetch(`/api/skills/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      showToast("Skill deleted.");
      fetchData();
    } catch (err) {
    }
  };
  const openMessage = async (msg) => {
    setSelectedMessage(msg);
    if (!msg.is_read) {
      try {
        const res = await fetch(`/api/contact/${msg.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_read: true }),
        });
        if (res.ok) {
          setMessages((prev) =>
            prev.map((m) => (m.id === msg.id ? { ...m, is_read: true } : m))
          );
        }
      } catch (err) {
        console.error("Failed to mark message as read:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col md:flex-row">
      {/* Toast notifications */}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-emerald text-white shadow-lg text-sm"
          >
            <CheckCircle size={18} />
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 rounded-xl bg-accent-rose text-white shadow-lg text-sm"
          >
            <X size={18} />
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-[var(--bg-primary)] border-r border-[var(--border-color)] p-6 flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="mb-8 flex items-center justify-between">
            <div>
              <span className="text-2xl font-heading font-bold text-gradient">FR</span>
              <span className="text-2xl font-heading font-light text-[var(--text-primary)] ml-1">.cms</span>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-accent-blue/10 text-accent-blue font-medium">v1.0</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {[
              { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
              { id: "projects", label: "Projects", icon: FolderKanban },
              { id: "experience", label: "Experience", icon: Briefcase },
              { id: "skills", label: "Skills", icon: GraduationCap },
              { id: "messages", label: "Messages", icon: Mail, count: messages.filter(m => !m.is_read).length },
              { id: "automation", label: "Automation & Cron", icon: Cpu },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setEditingId(null);
                }}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all
                  ${
                    activeTab === tab.id
                      ? "bg-accent-blue/10 text-accent-blue"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <tab.icon size={18} />
                  {tab.label}
                </div>
                {tab.count > 0 && (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-accent-rose text-white">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-accent-rose hover:bg-accent-rose/10 transition-all mt-6"
        >
          <LogOut size={18} />
          Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <Loader2 size={36} className="animate-spin text-accent-blue" />
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25 }}
            >
              {/* --- DASHBOARD TAB --- */}
              {activeTab === "dashboard" && (
                <div>
                  <h1 className="text-2xl md:text-3xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    CMS Dashboard
                  </h1>

                  {/* Summary Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      { label: "Projects", val: projects.length, col: "text-accent-blue", bg: "bg-accent-blue/10" },
                      { label: "Experiences", val: experiences.length, col: "text-accent-emerald", bg: "bg-accent-emerald/10" },
                      { label: "Skills", val: skills.length, col: "text-accent-amber", bg: "bg-accent-amber/10" },
                      { label: "Messages", val: messages.length, col: "text-accent-rose", bg: "bg-accent-rose/10" },
                    ].map((card) => (
                      <div key={card.label} className="glass-card p-6">
                        <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-semibold">
                          {card.label}
                        </div>
                        <div className={`text-4xl font-heading font-bold mt-2 ${card.col}`}>
                          {card.val}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Overview Message */}
                  <div className="glass-card p-6">
                    <h3 className="text-base font-semibold text-[var(--text-primary)] mb-2">Welcome to your CMS Dashboard</h3>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      Use the sidebar menu to quickly add, edit, or delete items on your portfolio. If Supabase is configured, all actions write directly to the database in real-time. Otherwise, data changes reflect in-memory locally.
                    </p>
                  </div>
                </div>
              )}

              {/* --- PROJECTS TAB --- */}
              {activeTab === "projects" && (
                <div>
                  <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    Manage Projects
                  </h1>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add/Edit Form */}
                    <div className="lg:col-span-1">
                      <form onSubmit={saveProject} className="glass-card p-6 space-y-4">
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                          {editingId ? "Edit Project" : "Add Project"}
                        </h3>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Title</label>
                          <input
                            type="text"
                            required
                            value={projectForm.title}
                            onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="My Awesome Project"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Description (English)</label>
                          <textarea
                            required
                            rows={3}
                            value={projectForm.description}
                            onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue resize-none"
                            placeholder="Describe this project briefly in English..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Description (Indonesian)</label>
                          <textarea
                            required
                            rows={3}
                            value={projectForm.description_id}
                            onChange={(e) => setProjectForm({ ...projectForm, description_id: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue resize-none"
                            placeholder="Describe this project briefly in Indonesian..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Project Image (Upload or URL)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => {
                                  setProjectForm({ ...projectForm, imageUrl: url });
                                }, "projects");
                              }
                            }}
                            className="w-full text-xs text-[var(--text-muted)] mb-2"
                          />
                          <input
                            type="text"
                            required
                            value={projectForm.imageUrl}
                            onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="/flyTicket.png or https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Demo/Source Link</label>
                          <input
                            type="url"
                            required
                            value={projectForm.link}
                            onChange={(e) => setProjectForm({ ...projectForm, link: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Tech Stack (comma separated)</label>
                          <input
                            type="text"
                            required
                            value={projectForm.techStack}
                            onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="React, Next.js, Node"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Category</label>
                          <select
                            value={projectForm.category}
                            onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                          >
                            <option value="Web">Web</option>
                            <option value="Mobile">Mobile</option>
                            <option value="Data">Data</option>
                            <option value="Tools">Tools</option>
                          </select>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="submit"
                            className="flex-1 py-2 px-4 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/90 flex items-center justify-center gap-1.5"
                          >
                            <Save size={14} />
                            Save
                          </button>
                          {editingId && (
                            <button
                              type="button"
                              onClick={resetProjectForm}
                              className="py-2 px-3 rounded-lg glass text-xs font-medium"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Project List */}
                    <div className="lg:col-span-2 space-y-4">
                      {projects.map((p) => (
                        <div key={p.id} className="glass-card p-5 flex gap-4 items-start">
                          <img src={p.imageUrl} alt={p.title} className="w-20 h-14 object-cover rounded-lg flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-semibold uppercase text-accent-blue px-2 py-0.5 rounded-full bg-accent-blue/10">
                              {p.category}
                            </span>
                            <h4 className="text-sm font-semibold text-[var(--text-primary)] mt-1.5">{p.title}</h4>
                            <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-1">{p.description}</p>
                          </div>
                          <div className="flex gap-1.5 flex-shrink-0">
                            <button
                              onClick={() => startEditProject(p)}
                              className="p-1.5 rounded-lg hover:bg-accent-blue/10 text-accent-blue transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={15} />
                            </button>
                            <button
                              onClick={() => deleteProject(p.id)}
                              className="p-1.5 rounded-lg hover:bg-accent-rose/10 text-accent-rose transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- EXPERIENCE TAB --- */}
              {activeTab === "experience" && (
                <div>
                  <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    Manage Experience
                  </h1>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add/Edit Form */}
                    <div className="lg:col-span-1">
                      <form onSubmit={saveExperience} className="glass-card p-6 space-y-4">
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                          {editingId ? "Edit Experience" : "Add Experience"}
                        </h3>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Title (English)</label>
                          <input
                            type="text"
                            required
                            value={expForm.title}
                            onChange={(e) => setExpForm({ ...expForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Software Engineer Intern"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Title (Indonesian)</label>
                          <input
                            type="text"
                            required
                            value={expForm.title_id}
                            onChange={(e) => setExpForm({ ...expForm, title_id: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Magang Rekayasa Perangkat Lunak"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Organization</label>
                          <input
                            type="text"
                            required
                            value={expForm.organization}
                            onChange={(e) => setExpForm({ ...expForm, organization: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Google"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Location</label>
                          <input
                            type="text"
                            required
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Remote"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Period</label>
                          <input
                            type="text"
                            required
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Feb 2024 - Jun 2024"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Description (English)</label>
                          <input
                            type="text"
                            required
                            value={expForm.description}
                            onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Overall description of the job in English..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Description (Indonesian)</label>
                          <input
                            type="text"
                            required
                            value={expForm.description_id}
                            onChange={(e) => setExpForm({ ...expForm, description_id: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="Deskripsi keseluruhan pekerjaan dalam Bahasa Indonesia..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Organization Logo (Upload or URL)</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                handleFileUpload(e.target.files[0], (url) => {
                                  setExpForm({ ...expForm, icon: url });
                                }, "experiences");
                              }
                            }}
                            className="w-full text-xs text-[var(--text-muted)] mb-2"
                          />
                          <input
                            type="text"
                            required
                            value={expForm.icon}
                            onChange={(e) => setExpForm({ ...expForm, icon: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="/logo-company.png or https://..."
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Highlights - English (one per line)</label>
                          <textarea
                            required
                            rows={3}
                            value={expForm.highlights}
                            onChange={(e) => setExpForm({ ...expForm, highlights: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue resize-none"
                            placeholder="Built X using Y&#10;Led team of size Z"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Highlights - Indonesian (one per line)</label>
                          <textarea
                            required
                            rows={3}
                            value={expForm.highlights_id}
                            onChange={(e) => setExpForm({ ...expForm, highlights_id: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue resize-none"
                            placeholder="Membangun X menggunakan Y&#10;Memimpin tim berukuran Z"
                          />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <button
                            type="submit"
                            className="flex-1 py-2 px-4 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/90 flex items-center justify-center gap-1.5"
                          >
                            <Save size={14} />
                            Save
                          </button>
                          {editingId && (
                            <button
                              type="button"
                              onClick={resetExpForm}
                              className="py-2 px-3 rounded-lg glass text-xs font-medium"
                            >
                              Cancel
                            </button>
                          )}
                        </div>
                      </form>
                    </div>

                    {/* Experiences List */}
                    <div className="lg:col-span-2 space-y-4">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="glass-card p-5">
                          <div className="flex justify-between items-start gap-4 mb-2">
                            <div>
                              <h4 className="text-sm font-semibold text-[var(--text-primary)]">{exp.title}</h4>
                              <p className="text-xs text-accent-blue font-medium">{exp.organization} — {exp.period}</p>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => startEditExp(exp)}
                                className="p-1.5 rounded-lg hover:bg-accent-blue/10 text-accent-blue transition-colors"
                              >
                                <Edit2 size={15} />
                              </button>
                              <button
                                onClick={() => deleteExperience(exp.id)}
                                className="p-1.5 rounded-lg hover:bg-accent-rose/10 text-accent-rose transition-colors"
                              >
                                <Trash2 size={15} />
                              </button>
                            </div>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] border-t border-[var(--border-color)] pt-2 mt-2 leading-relaxed">
                            {exp.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* --- SKILLS TAB --- */}
              {activeTab === "skills" && (
                <div>
                  <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    Manage Skills
                  </h1>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Add Form */}
                    <div className="lg:col-span-1">
                      <form onSubmit={saveSkill} className="glass-card p-6 space-y-4">
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                          Add Skill
                        </h3>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Name</label>
                          <input
                            type="text"
                            required
                            value={skillForm.name}
                            onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                            placeholder="React.js"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Level (%)</label>
                          <input
                            type="number"
                            min="10"
                            max="100"
                            required
                            value={skillForm.level}
                            onChange={(e) => setSkillForm({ ...skillForm, level: parseInt(e.target.value) })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">Category</label>
                          <select
                            value={skillForm.category}
                            onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                            className="w-full px-3 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                          >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend & Database</option>
                            <option value="Machine Learning">Machine Learning</option>
                            <option value="Tools">Tools & Design</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 px-4 rounded-lg bg-accent-blue text-white text-xs font-medium hover:bg-accent-blue/90 flex items-center justify-center gap-1.5"
                        >
                          <Plus size={14} />
                          Add Skill
                        </button>
                      </form>
                    </div>

                    {/* Skill List grouped by Category */}
                    <div className="lg:col-span-2 space-y-4">
                      {["Frontend", "Backend", "Machine Learning", "Tools"].map((cat) => {
                        const catSkills = skills.filter((s) => s.category.includes(cat));
                        if (catSkills.length === 0) return null;

                        return (
                          <div key={cat} className="glass-card p-5">
                            <h4 className="text-xs font-bold uppercase text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2 mb-3">
                              {cat}
                            </h4>
                            <div className="grid sm:grid-cols-2 gap-3">
                              {catSkills.map((s) => (
                                <div key={s.id || s.name} className="flex justify-between items-center p-2 rounded-lg bg-[var(--bg-secondary)]">
                                  <span className="text-xs text-[var(--text-primary)]">{s.name} ({s.level}%)</span>
                                  <button
                                    onClick={() => deleteSkill(s.id)}
                                    className="p-1 rounded-lg text-accent-rose hover:bg-accent-rose/10 transition-colors"
                                  >
                                    <Trash2 size={13} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* --- MESSAGES TAB --- */}
              {activeTab === "messages" && (
                <div>
                  <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    Messages Received
                  </h1>

                  <div className="space-y-4">
                    {messages.length === 0 ? (
                      <p className="text-xs text-[var(--text-muted)]">No messages received yet.</p>
                    ) : (
                      messages.map((msg) => (
                        <div 
                          key={msg.id} 
                          onClick={() => openMessage(msg)}
                          className={`glass-card p-5 cursor-pointer hover:border-accent-blue/50 transition-all duration-300 relative group
                            ${!msg.is_read ? "border-l-4 border-l-accent-emerald bg-accent-emerald/5" : ""}`}
                        >
                          <div className="flex justify-between items-start gap-4 mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="text-sm font-semibold text-[var(--text-primary)]">{msg.name}</h4>
                                {!msg.is_read && (
                                  <span className="px-2 py-0.5 text-[9px] font-bold rounded-full bg-accent-emerald text-white uppercase tracking-wider animate-pulse">
                                    New
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-accent-blue font-medium">{msg.email}</p>
                            </div>
                            <span className="text-[10px] text-[var(--text-muted)] font-mono">
                              {new Date(msg.created_at || Date.now()).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-xs text-[var(--text-secondary)] truncate">
                            {msg.message}
                          </p>
                          <div className="text-[10px] text-accent-blue mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            Click to read full message &rarr;
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Modal Detail Message */}
                  {selectedMessage && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                      <div className="glass-card w-full max-w-lg p-6 relative">
                        <div className="flex justify-between items-start border-b border-[var(--border-color)] pb-3 mb-4">
                          <div>
                            <h3 className="text-base font-heading font-bold text-[var(--text-primary)]">
                              From: {selectedMessage.name}
                            </h3>
                            <p className="text-xs text-accent-blue font-mono">{selectedMessage.email}</p>
                          </div>
                          <span className="text-xs text-[var(--text-muted)]">
                            {new Date(selectedMessage.created_at || Date.now()).toLocaleString()}
                          </span>
                        </div>
                        <div className="max-h-60 overflow-y-auto bg-[var(--bg-secondary)] p-4 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                          {selectedMessage.message}
                        </div>
                        <div className="flex justify-end mt-4">
                          <button
                            onClick={() => setSelectedMessage(null)}
                            className="px-4 py-2 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] hover:bg-[var(--border-color)]"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* --- AUTOMATION & CRON TAB --- */}
              {activeTab === "automation" && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                      <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                        Automation & Cron Scheduler
                      </h1>
                      <p className="text-xs text-[var(--text-muted)] mt-1">
                        Configure automated web scraping schedules, target keywords, and trigger real-time lead generation pipelines.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 ${
                        automationConfig.enabled
                          ? "bg-accent-emerald/10 text-accent-emerald border border-accent-emerald/20"
                          : "bg-accent-rose/10 text-accent-rose border border-accent-rose/20"
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${automationConfig.enabled ? "bg-accent-emerald animate-pulse" : "bg-accent-rose"}`} />
                        {automationConfig.enabled ? "Scheduler Active" : "Scheduler Paused"}
                      </span>
                    </div>
                  </div>

                  <div className="grid lg:grid-cols-3 gap-8">
                    {/* Configuration Form */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className="glass-card p-6 space-y-5">
                        <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3 flex items-center gap-2">
                          <Clock size={18} className="text-accent-blue" />
                          Cron Schedule Configuration
                        </h3>

                        {/* Schedule Preset Selector */}
                        <div>
                          <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5">
                            Schedule Frequency (Preset)
                          </label>
                          <select
                            value={automationConfig.preset}
                            onChange={(e) => {
                              const val = e.target.value;
                              setAutomationConfig({
                                ...automationConfig,
                                preset: val,
                                cronExpression: val === "custom" ? automationConfig.cronExpression : val,
                              });
                            }}
                            className="w-full px-3.5 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue font-medium"
                          >
                            <option value="0 1 * * *">Every Day at 08:00 WIB (01:00 UTC) — Recommended</option>
                            <option value="0 1,10 * * *">Twice Daily (08:00 & 17:00 WIB)</option>
                            <option value="0 2 * * 1-5">Weekdays Only (Mon-Fri 09:00 WIB)</option>
                            <option value="0 */6 * * *">Every 6 Hours (00:00, 06:00, 12:00, 18:00 WIB)</option>
                            <option value="0 */12 * * *">Every 12 Hours</option>
                            <option value="0 1 * * 0">Weekly on Sundays (08:00 WIB)</option>
                            <option value="custom">Custom Cron Expression...</option>
                          </select>
                        </div>

                        {/* Custom Cron Expression Input */}
                        {automationConfig.preset === "custom" && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="space-y-1.5"
                          >
                            <label className="block text-xs font-semibold text-[var(--text-secondary)]">
                              Custom Cron Expression (UTC Standard)
                            </label>
                            <input
                              type="text"
                              value={automationConfig.cronExpression}
                              onChange={(e) =>
                                setAutomationConfig({ ...automationConfig, cronExpression: e.target.value })
                              }
                              placeholder="* * * * *"
                              className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] font-mono focus:outline-none focus:border-accent-blue"
                            />
                            <span className="text-[10px] text-[var(--text-muted)]">
                              Format: <code>[min] [hour] [day] [month] [day-of-week]</code> (e.g. <code>0 1 * * 1-5</code>)
                            </span>
                          </motion.div>
                        )}

                        {/* Target Scraping Parameters */}
                        <div className="pt-2 border-t border-[var(--border-color)]">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-3">
                            Target Lead Parameters
                          </h4>
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                Search Query / Niche & City
                              </label>
                              <input
                                type="text"
                                value={automationConfig.query}
                                onChange={(e) =>
                                  setAutomationConfig({ ...automationConfig, query: e.target.value })
                                }
                                placeholder="Coffee Shop Bandung"
                                className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1">
                                Max Leads per Run (Limit)
                              </label>
                              <input
                                type="number"
                                min="1"
                                max="50"
                                value={automationConfig.limit}
                                onChange={(e) =>
                                  setAutomationConfig({ ...automationConfig, limit: parseInt(e.target.value) || 10 })
                                }
                                className="w-full px-3.5 py-2 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] focus:outline-none focus:border-accent-blue"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Automation Toggles */}
                        <div className="pt-2 border-t border-[var(--border-color)] space-y-3">
                          <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] cursor-pointer hover:bg-[var(--border-color)]/30 transition-colors">
                            <div className="space-y-0.5">
                              <span className="text-xs font-semibold text-[var(--text-primary)] block">
                                Enable Automated Schedule
                              </span>
                              <span className="text-[11px] text-[var(--text-muted)]">
                                Automatically run scraper at configured cron schedule intervals.
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              checked={automationConfig.enabled}
                              onChange={(e) =>
                                setAutomationConfig({ ...automationConfig, enabled: e.target.checked })
                              }
                              className="w-4 h-4 rounded text-accent-blue focus:ring-0 cursor-pointer"
                            />
                          </label>

                          <label className="flex items-center justify-between p-3 rounded-xl bg-[var(--bg-secondary)] cursor-pointer hover:bg-[var(--border-color)]/30 transition-colors">
                            <div className="space-y-0.5">
                              <span className="text-xs font-semibold text-[var(--text-primary)] block">
                                Real-Time Telegram Notifications
                              </span>
                              <span className="text-[11px] text-[var(--text-muted)]">
                                Send instant lead alerts with direct WhatsApp links to your Telegram bot.
                              </span>
                            </div>
                            <input
                              type="checkbox"
                              checked={automationConfig.autoTelegram}
                              onChange={(e) =>
                                setAutomationConfig({ ...automationConfig, autoTelegram: e.target.checked })
                              }
                              className="w-4 h-4 rounded text-accent-blue focus:ring-0 cursor-pointer"
                            />
                          </label>
                        </div>

                        {/* Save Button */}
                        <div className="pt-2 flex justify-end">
                          <button
                            onClick={async () => {
                              try {
                                const res = await fetch("/api/automation", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify(automationConfig),
                                });
                                if (!res.ok) throw new Error("Failed to save settings");
                                showToast("Automation & Cron settings saved successfully!");
                              } catch (err) {
                                showToast(err.message, "error");
                              }
                            }}
                            className="px-6 py-2.5 rounded-xl bg-accent-blue text-white text-xs font-semibold hover:bg-accent-blue/90 transition-all flex items-center gap-2 shadow-lg shadow-accent-blue/20"
                          >
                            <Save size={15} />
                            Save Configuration
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Quick Trigger & Status Card */}
                    <div className="lg:col-span-1 space-y-6">
                      {/* On-Demand Trigger */}
                      <div className="glass-card p-6 space-y-4">
                        <div className="flex items-center gap-2 text-accent-amber">
                          <Sparkles size={18} />
                          <h3 className="text-sm font-heading font-semibold text-[var(--text-primary)]">
                            Run On-Demand
                          </h3>
                        </div>
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          Trigger the scraper instantly using current settings without waiting for the scheduled cron time.
                        </p>

                        <button
                          disabled={isTriggering}
                          onClick={async () => {
                            setIsTriggering(true);
                            setTriggerLog("Initializing scraper pipeline...");
                            try {
                              const res = await fetch("/api/automation/trigger", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                  query: automationConfig.query,
                                  limit: automationConfig.limit,
                                  autoTelegram: automationConfig.autoTelegram,
                                }),
                              });
                              const data = await res.json();
                              if (!res.ok) throw new Error(data.error || "Trigger failed");

                              setTriggerLog(data.log || `Execution success! Found ${data.leadsCaptured} leads.`);
                              setAutomationConfig((prev) => ({
                                ...prev,
                                lastRun: data.timestamp,
                                lastStatus: "Success",
                                lastLeadsCount: data.leadsCaptured,
                                lastLog: data.log,
                              }));
                              showToast(`Scraping triggered successfully! Found ${data.leadsCaptured} leads.`);
                            } catch (err) {
                              setTriggerLog(`Execution failed: ${err.message}`);
                              showToast(err.message, "error");
                            } finally {
                              setIsTriggering(false);
                            }
                          }}
                          className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg
                            ${
                              isTriggering
                                ? "bg-accent-blue/50 text-white cursor-not-allowed"
                                : "bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:scale-[1.02] shadow-accent-blue/20"
                            }`}
                        >
                          {isTriggering ? (
                            <>
                              <Loader2 size={16} className="animate-spin" />
                              Running Pipeline...
                            </>
                          ) : (
                            <>
                              <Play size={16} />
                              Run Scraping Now
                            </>
                          )}
                        </button>
                      </div>

                      {/* Execution Status Card */}
                      <div className="glass-card p-6 space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-color)] pb-2 flex items-center justify-between">
                          <span>Latest Run Status</span>
                          <CheckCircle2 size={15} className="text-accent-emerald" />
                        </h4>

                        <div className="space-y-2.5 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--text-muted)]">Status:</span>
                            <span className="font-semibold text-accent-emerald px-2 py-0.5 rounded-full bg-accent-emerald/10 text-[11px]">
                              {automationConfig.lastStatus || "Ready"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--text-muted)]">Last Executed:</span>
                            <span className="font-medium text-[var(--text-primary)] text-[11px]">
                              {automationConfig.lastRun
                                ? new Date(automationConfig.lastRun).toLocaleString("id-ID", {
                                    dateStyle: "short",
                                    timeStyle: "short",
                                  }) + " WIB"
                                : "Never executed"}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-[var(--text-muted)]">Leads Captured:</span>
                            <span className="font-bold text-accent-blue text-[11px]">
                              {automationConfig.lastLeadsCount || 0} leads
                            </span>
                          </div>
                        </div>

                        {/* Live Log Console */}
                        {(triggerLog || automationConfig.lastLog) && (
                          <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
                            <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block mb-1.5">
                              Live Log Output:
                            </span>
                            <div className="p-3 rounded-lg bg-[var(--bg-secondary)] border border-[var(--border-color)] font-mono text-[11px] text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap max-h-32 overflow-y-auto">
                              {triggerLog || automationConfig.lastLog}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* --- SETTINGS TAB --- */}
              {activeTab === "settings" && (
                <div>
                  <h1 className="text-2xl font-heading font-bold text-[var(--text-primary)] mb-8">
                    Global Settings
                  </h1>
                  <div className="glass-card p-6 max-w-xl space-y-6">
                    <h3 className="text-base font-heading font-semibold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-3">
                      Hero Section Profile Picture
                    </h3>
                    <div className="flex items-center gap-6">
                      <img
                        src={avatarUrl}
                        alt="Avatar Preview"
                        className="w-24 h-24 rounded-full object-cover border border-[var(--border-color)] bg-[var(--bg-secondary)]"
                      />
                      <div className="space-y-3 flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              handleFileUpload(e.target.files[0], async (url) => {
                                setAvatarUrl(url);
                                await fetch("/api/settings", {
                                  method: "POST",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ key: "avatarUrl", value: url }),
                                });
                              }, "avatar");
                            }
                          }}
                          className="w-full text-xs text-[var(--text-muted)]"
                        />
                        <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                          Upload a professional picture for your hero section. The image will be compressed and optimized dynamically to save storage and bandwidth.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}


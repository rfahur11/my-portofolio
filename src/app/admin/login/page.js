"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Success
      router.push("/admin");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-accent-blue/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-violet/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card max-w-md w-full p-8 relative z-10"
      >
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 text-xs text-[var(--text-muted)] hover:text-accent-blue transition-colors mb-6 group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Portfolio
        </button>

        <div className="text-center mb-8">
          <span className="text-3xl font-heading font-bold text-gradient">FR</span>
          <span className="text-3xl font-heading font-light text-[var(--text-primary)] ml-1">.cms</span>
          <p className="text-sm text-[var(--text-muted)] mt-2">
            Sign in to manage your portfolio content
          </p>
        </div>

        {error && (
          <div className="p-3 mb-6 rounded-xl bg-accent-rose/10 border border-accent-rose/25 text-xs text-accent-rose text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" size={16} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] text-sm placeholder:text-[var(--text-muted)] focus:outline-none focus:ring-2 focus:ring-accent-blue/50 focus:border-accent-blue transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-medium bg-gradient-to-r from-accent-blue to-accent-violet text-white hover:shadow-lg hover:shadow-accent-blue/25 hover:scale-[1.02] transition-all disabled:opacity-75 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign In"
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-[var(--border-color)] text-center">
          <p className="text-xs text-[var(--text-muted)] leading-relaxed">
            Note: If Supabase env variables are empty, use:
            <br />
            <span className="font-semibold text-[var(--text-secondary)]">admin@example.com / admin</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

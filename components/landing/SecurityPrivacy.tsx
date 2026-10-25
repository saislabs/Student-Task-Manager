"use client";

import { ShieldCheck, Lock, KeyRound, Server } from "lucide-react";

export function SecurityPrivacy() {
  const points = [
    {
      icon: ShieldCheck,
      title: "Strict Database Row Level Security (RLS)",
      desc: "Every database table enforces PostgreSQL RLS policies checking auth.uid(). Students can never access or view another user's tasks or study plans.",
    },
    {
      icon: KeyRound,
      title: "Server-Only AI Integration",
      desc: "All LLM requests execute exclusively within secure server-side API endpoints. Private API keys and tokens are never exposed in browser bundles.",
    },
    {
      icon: Lock,
      title: "Encrypted Cookie Sessions",
      desc: "Built with modern @supabase/ssr cookie validation. Session tokens are securely rotated and protected against cross-site scripting attacks.",
    },
    {
      icon: Server,
      title: "Zero Selling of Student Data",
      desc: "StudyFlow AI is designed as a student productivity tool by SAIS LABS. Your notes, grades, and schedules remain 100% confidential.",
    },
  ];

  return (
    <section className="py-20 bg-navy-900/30 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-emerald-400">
            Security & Compliance
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            Your Privacy and Study Data Are Protected
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Built with production-grade engineering principles to safeguard student information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-navy-900/70 border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

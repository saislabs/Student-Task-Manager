"use client";

import { CheckSquare, Calendar, Sparkles, BarChart3, Clock, Target, Shield, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FeaturesSection() {
  const features = [
    {
      icon: CheckSquare,
      title: "Smart Task Manager",
      description:
        "Track, prioritize, and conquer assignments and lab submissions. Filter by subject, deadline urgency, or completion status with zero friction.",
      badge: "Core Workflow",
      color: "from-blue-500/20 to-indigo-500/20 text-brand-400 border-brand-500/30",
    },
    {
      icon: Calendar,
      title: "Study Planner & Calendar",
      description:
        "Visualize your semester schedule across monthly, weekly, and daily views. Never be blindsided by surprise midterms or assignment deadlines.",
      badge: "Time Management",
      color: "from-emerald-500/20 to-teal-500/20 text-emerald-400 border-emerald-500/30",
    },
    {
      icon: Sparkles,
      title: "AI Study Planner",
      description:
        "Input your exam date and study hours — StudyFlow AI automatically structures realistic day-by-day study sessions, topic pacing, and revision blocks.",
      badge: "AI Powered",
      color: "from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30",
    },
    {
      icon: BarChart3,
      title: "Progress Analytics",
      description:
        "Visualize your study momentum, completion rate, overdue risks, and subject-wise workload distribution with clean, real-time charts.",
      badge: "Deep Insights",
      color: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
    },
  ];

  const highlights = [
    {
      icon: Clock,
      title: "Smart Countdown Badges",
      desc: "Live deadline counters highlight tasks due in 24h, 2 days, or overdue items in striking amber and red indicators.",
    },
    {
      icon: Target,
      title: "AI Project Subtask Breakdown",
      desc: "Deconstruct intimidating projects like 'Build an AI model' into 6 actionable bite-sized tasks ready to schedule.",
    },
    {
      icon: Shield,
      title: "PostgreSQL Row-Level Security",
      desc: "Your tasks, notes, and study plans are strictly isolated with verified database RLS policies. Your data belongs to you.",
    },
    {
      icon: Zap,
      title: "Fast Keyboard Navigation",
      desc: "Quick add modals, instant toggles, and snappy responses engineered for busy students and hackathon hackers.",
    },
  ];

  return (
    <section id="features" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-xs uppercase tracking-widest font-semibold text-brand-400 bg-brand-500/10 px-3 py-1 rounded-full border border-brand-500/20">
          Engineered for Academic Excellence
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4">
          Everything You Need to Ace Your Semester
        </h2>
        <p className="text-slate-400 text-base sm:text-lg">
          Built specifically for college students, school students, project teams, and hackathon participants.
        </p>
      </div>

      {/* 4 Main Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {features.map((f, i) => {
          const Icon = f.icon;
          return (
            <Card
              key={i}
              className="relative group hover:border-brand-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              <div
                className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${f.color} border flex items-center justify-center mb-5 shadow-lg`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 mb-2 block">
                {f.badge}
              </span>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {f.description}
              </p>
            </Card>
          );
        })}
      </div>

      {/* 4 Additional Highlight Points */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10 border-t border-white/5">
        {highlights.map((h, i) => {
          const Icon = h.icon;
          return (
            <div key={i} className="flex gap-4">
              <div className="h-9 w-9 shrink-0 rounded-xl bg-navy-800 border border-white/10 flex items-center justify-center text-brand-400">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-slate-200 mb-1">{h.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{h.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

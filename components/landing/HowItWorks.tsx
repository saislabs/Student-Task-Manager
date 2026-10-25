"use client";

import { ListPlus, Sparkles, Trophy } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: ListPlus,
      title: "Add Your Courses & Deadlines",
      desc: "Input your subjects, upcoming exams, project milestones, and daily assignments in seconds with smart category tags.",
    },
    {
      num: "02",
      icon: Sparkles,
      title: "Generate AI-Optimized Plan",
      desc: "Tell StudyFlow AI your exam date and daily available study hours. It constructs a structured, realistic day-by-day roadmap.",
    },
    {
      num: "03",
      icon: Trophy,
      title: "Track, Study & Achieve",
      desc: "Check off tasks on your calendar, track your weekly productivity metrics, and stay in flow without academic burnout.",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-navy-900/30 border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-brand-400">
            Simple 3-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            How STUDYFLOW AI Works
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            Turn chaotic syllabus PDFs and scattered deadlines into a clear, stress-free daily study routine.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={i}
                className="relative rounded-2xl bg-navy-900/80 border border-white/10 p-6 sm:p-8 backdrop-blur-md"
              >
                <span className="text-5xl font-black text-white/5 absolute top-4 right-4 pointer-events-none">
                  {s.num}
                </span>
                <div className="h-12 w-12 rounded-xl bg-brand-500/10 border border-brand-500/30 flex items-center justify-center text-brand-400 mb-6">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

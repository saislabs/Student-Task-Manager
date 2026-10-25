"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does the AI Study Planner generate study schedules?",
      a: "You provide your exam name, subject, number of days until the test, available daily hours, and key topics. The planner calculates pacing, allocates realistic 45-minute study sessions, builds in formula recap and practice blocks, and warns you if the deadline has high risk.",
    },
    {
      q: "Can I use STUDYFLOW AI without configuring an external AI key?",
      a: "Yes! StudyFlow AI includes an intelligent deterministic rule-based study planner and subtask breakdown engine. You can run all planning features immediately without an external API key.",
    },
    {
      q: "Will my tasks persist if I refresh the browser?",
      a: "Yes. When connected to Supabase PostgreSQL, all changes are persisted securely to your user account. In preview/demo mode, your tasks, subjects, and settings are cached persistently in local storage.",
    },
    {
      q: "Can other students view my tasks or notes?",
      a: "No. Every database table enforces PostgreSQL Row Level Security (RLS) policies checking auth.uid(). Only your authenticated account has permission to read or modify your data.",
    },
    {
      q: "Is STUDYFLOW AI mobile and tablet friendly?",
      a: "Yes. The UI is fully responsive with accessible mobile sidebar drawers, responsive cards, and touch-optimized action buttons.",
    },
  ];

  return (
    <section id="faq" className="py-20 relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-14">
        <span className="text-xs uppercase tracking-widest font-semibold text-brand-400">
          Got Questions?
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-slate-400 text-sm sm:text-base">
          Find clear answers about how StudyFlow AI operates and protects your academic progress.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-navy-900/60 overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left text-sm sm:text-base font-semibold text-slate-200 hover:text-white transition-colors"
              >
                <span>{f.q}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-slate-400 shrink-0 transition-transform duration-200",
                    isOpen && "rotate-180 text-brand-400"
                  )}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs sm:text-sm text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                  {f.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

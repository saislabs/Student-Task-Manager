"use client";

import Link from "next/link";
import { Sparkles, Brain, Clock, ShieldAlert, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AIExplanation() {
  return (
    <section id="ai-planner" className="py-20 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-purple/15 border border-brand-purple/30 text-purple-300 text-xs font-semibold mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI Planning Engine</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5 leading-tight">
            Stop Guessing How Much to Study. Let AI Build Your Schedule.
          </h2>

          <p className="text-slate-300 text-sm sm:text-base mb-6 leading-relaxed">
            Most students fail to finish their syllabus not due to lack of effort, but due to unrealistic planning.
            StudyFlow AI calculates your available study hours, balances chapter complexity, and injects critical revision buffers before exam day.
          </p>

          <div className="space-y-3.5 mb-8">
            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle className="h-3.5 w-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white">Structured Day-by-Day Sessions:</strong> Breaks multi-chapter syllabi into 45-minute focused blocks.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldAlert className="h-3.5 w-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white">Deadline Risk Warnings:</strong> Alerts you if your remaining study hours are insufficient to cover high-weightage topics.
              </p>
            </div>

            <div className="flex items-start gap-3">
              <div className="h-5 w-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="h-3.5 w-3.5" />
              </div>
              <p className="text-xs sm:text-sm text-slate-300">
                <strong className="text-white">Scheduled Revision & Breaks:</strong> Protects cognitive retention through active recall and spaced rest intervals.
              </p>
            </div>
          </div>

          <Link href="/dashboard/ai-planner">
            <Button variant="gradient">
              Try AI Planner Now
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Right Column Interactive Card Example */}
        <div className="lg:col-span-6 rounded-2xl border border-brand-500/30 bg-navy-900/90 p-6 shadow-2xl relative overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-48 h-48 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-8 w-8 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-400">
                <Brain className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-white">Generated Study Plan Preview</p>
                <p className="text-[10px] text-slate-400">DBMS Exam • 3 Days Left • 2h/day</p>
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
              Low Risk
            </span>
          </div>

          {/* Example Day Sessions */}
          <div className="space-y-3 text-xs mb-5">
            <div className="p-3 rounded-xl bg-navy-850 border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white">Day 1: Review Core DBMS Concepts</span>
                <span className="text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded">45 mins</span>
              </div>
              <p className="text-[11px] text-slate-400">Relational algebra, ER diagrams, primary & foreign keys</p>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white">Day 2: Practice SQL & Normalization</span>
                <span className="text-[10px] text-brand-300 bg-brand-500/10 px-2 py-0.5 rounded">45 mins</span>
              </div>
              <p className="text-[11px] text-slate-400">1NF to BCNF decomposition proofs & JOIN queries</p>
            </div>

            <div className="p-3 rounded-xl bg-navy-850 border border-white/5">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-white">Day 3: Revise Weak Topics & Mock Exam</span>
                <span className="text-[10px] text-purple-300 bg-purple-500/10 px-2 py-0.5 rounded">Revision</span>
              </div>
              <p className="text-[11px] text-slate-400">Formulas, ACID properties, transaction concurrency tests</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-navy-950/80 border border-white/5 text-[11px] text-slate-400">
            <p className="font-medium text-slate-300 mb-1">Break Recommendation:</p>
            <p>10-minute eye relaxation between sessions. Review high-yield notes 30 minutes before sleep.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

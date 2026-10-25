"use client";

import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Search,
  Bell,
  Sparkles,
  Plus,
  BookOpen,
  Calendar,
  LayoutDashboard,
  Bot,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function DashboardPreview() {
  return (
    <section id="preview" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
      {/* Decorative caption */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-widest font-semibold text-brand-400">
          Live Interactive Showcase
        </span>
        <Link
          href="/dashboard"
          className="text-xs text-slate-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
        >
          Open Full Dashboard <ExternalLink className="h-3 w-3" />
        </Link>
      </div>

      {/* Main Mockup Frame */}
      <div className="relative rounded-3xl border border-white/15 bg-navy-900/90 shadow-2xl shadow-brand-500/10 backdrop-blur-2xl overflow-hidden p-3 sm:p-6 transition-all">
        {/* Glow ambient background inside mockup */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-purple/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-electric/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Header of Mockup */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-80">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <input
                type="text"
                readOnly
                placeholder="Search tasks, subjects, or anything..."
                className="w-full h-9 pl-9 pr-4 rounded-xl bg-navy-800/80 border border-white/10 text-xs text-slate-300 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="h-8 w-8 rounded-lg bg-navy-800 border border-white/10 flex items-center justify-center text-slate-400">
              <Bell className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-purple to-brand-electric flex items-center justify-center text-xs font-bold text-white shadow-md">
                S
              </div>
              <div className="text-left text-xs leading-none">
                <p className="font-semibold text-slate-200">Surya</p>
                <p className="text-[10px] text-slate-400 mt-0.5">Student</p>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Greeting in Mockup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              Good morning, Surya! <span className="text-xl">👋</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Ready to make progress today? You have 5 tasks scheduled.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-800 border border-white/10 text-xs text-slate-300">
              <Calendar className="h-3.5 w-3.5 text-brand-400" />
              <span>Tue, 21 Oct 2025</span>
            </div>
            <Link href="/dashboard/tasks">
              <Button size="sm" variant="primary" className="text-xs">
                <Plus className="h-3.5 w-3.5 mr-1" />
                Add Task
              </Button>
            </Link>
            <Link href="/dashboard/ai-planner">
              <Button size="sm" variant="gradient" className="text-xs">
                <Sparkles className="h-3.5 w-3.5 mr-1" />
                Generate Study Plan
              </Button>
            </Link>
          </div>
        </div>

        {/* 4 Glowing Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {/* Total Tasks */}
          <div className="p-4 rounded-2xl bg-navy-850/80 border border-brand-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Total Tasks</span>
              <div className="h-7 w-7 rounded-lg bg-brand-500/15 flex items-center justify-center text-brand-400">
                <LayoutDashboard className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">12</p>
            <p className="text-[11px] text-brand-400 mt-1">3 completed today</p>
          </div>

          {/* In Progress */}
          <div className="p-4 rounded-2xl bg-navy-850/80 border border-emerald-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">In Progress</span>
              <div className="h-7 w-7 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                <Clock className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">5</p>
            <p className="text-[11px] text-emerald-400 mt-1">41% of total</p>
          </div>

          {/* Overdue */}
          <div className="p-4 rounded-2xl bg-navy-850/80 border border-rose-500/20 shadow-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Overdue</span>
              <div className="h-7 w-7 rounded-lg bg-rose-500/15 flex items-center justify-center text-rose-400">
                <AlertTriangle className="h-4 w-4" />
              </div>
            </div>
            <p className="text-2xl font-extrabold text-white">2</p>
            <p className="text-[11px] text-rose-400 mt-1">Need immediate attention</p>
          </div>

          {/* Completion Rate */}
          <div className="p-4 rounded-2xl bg-navy-850/80 border border-cyan-500/20 shadow-md flex items-center justify-between">
            <div>
              <span className="text-xs font-medium text-slate-400">Completion Rate</span>
              <p className="text-2xl font-extrabold text-white mt-1">58%</p>
              <p className="text-[11px] text-cyan-400 mt-1">Good study momentum</p>
            </div>
            {/* Circular Ring SVG */}
            <div className="relative h-12 w-12 flex items-center justify-center">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-navy-700"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="text-cyan-400"
                  strokeDasharray="58, 100"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <span className="absolute text-[10px] font-bold text-white">58%</span>
            </div>
          </div>
        </div>

        {/* Middle 3-Column Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Today's Tasks (5 Cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-navy-850/80 border border-white/10 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-brand-400" />
                Today&apos;s Tasks
              </h3>
              <span className="text-[11px] text-brand-400 hover:underline cursor-pointer">View all →</span>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/90 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded bg-brand-500 text-white flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-200 line-through opacity-70">Complete DBMS Assignment</p>
                    <p className="text-[10px] text-slate-400">Database Management Systems</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-rose-500/20 text-rose-300">High</span>
                  <p className="text-[10px] text-slate-400 mt-1">Today 5:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/90 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded border border-slate-600" />
                  <div>
                    <p className="text-xs font-medium text-slate-200">Prepare Presentation Slides</p>
                    <p className="text-[10px] text-slate-400">Machine Learning</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-amber-500/20 text-amber-300">Medium</span>
                  <p className="text-[10px] text-slate-400 mt-1">Today 7:00 PM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/90 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded border border-slate-600" />
                  <div>
                    <p className="text-xs font-medium text-slate-200">Read Research Paper</p>
                    <p className="text-[10px] text-slate-400">AI & Data Science</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-emerald-500/20 text-emerald-300">Low</span>
                  <p className="text-[10px] text-slate-400 mt-1">Tomorrow 10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-navy-900/90 border border-white/5">
                <div className="flex items-center gap-2.5">
                  <div className="h-4 w-4 rounded border border-slate-600" />
                  <div>
                    <p className="text-xs font-medium text-slate-200">Work on Mini Project</p>
                    <p className="text-[10px] text-slate-400">Web Development</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-rose-500/20 text-rose-300">High</span>
                  <p className="text-[10px] text-slate-400 mt-1">Tomorrow 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* This Week Schedule Strip (3 Cols) */}
          <div className="lg:col-span-3 rounded-2xl bg-navy-850/80 border border-white/10 p-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <h3 className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-emerald-400" />
                This Week
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300">Oct 20-26</span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-3">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div
                  key={i}
                  className={`py-1 rounded text-[10px] ${
                    i === 1 ? "bg-brand-500 text-white font-bold" : "text-slate-400 bg-navy-900/60"
                  }`}
                >
                  <p className="text-[9px] opacity-75">{d}</p>
                  <p>{20 + i}</p>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2 rounded-lg bg-navy-900/90 border-l-2 border-brand-500 text-slate-300 text-[11px]">
                <p className="font-medium text-white">09:00 AM • DBMS Class</p>
                <p className="text-[10px] text-slate-400">Room 302, Prof. Rao</p>
              </div>
              <div className="p-2 rounded-lg bg-navy-900/90 border-l-2 border-brand-purple text-slate-300 text-[11px]">
                <p className="font-medium text-white">11:00 AM • Study Session</p>
                <p className="text-[10px] text-slate-400">Library 2nd Floor</p>
              </div>
              <div className="p-2 rounded-lg bg-navy-900/90 border-l-2 border-emerald-500 text-slate-300 text-[11px]">
                <p className="font-medium text-white">02:00 PM • Project Work</p>
                <p className="text-[10px] text-slate-400">Hackathon Lab</p>
              </div>
            </div>
          </div>

          {/* AI Study Planner Quick Widget (4 Cols) */}
          <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-navy-850 to-navy-900 border border-brand-500/30 p-4 relative overflow-hidden">
            <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-3">
              <div className="h-6 w-6 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-300">
                <Sparkles className="h-3.5 w-3.5" />
              </div>
              <h3 className="text-xs font-semibold text-white">AI Study Planner</h3>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              What do you want to study or plan today?
            </p>

            <div className="p-2.5 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-slate-400 mb-3 italic">
              &quot;I have a DBMS exam in 3 days. I can study 2 hours each day. Help me prepare.&quot;
            </div>

            <Link href="/dashboard/ai-planner">
              <Button size="sm" variant="gradient" className="w-full text-xs">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Generate Plan
              </Button>
            </Link>

            <div className="mt-4 flex items-center justify-center gap-2 text-[10px] text-brand-300/80">
              <Bot className="h-3.5 w-3.5" />
              <span>Smart breakdown & deadline risk detector</span>
            </div>
          </div>
        </div>

        {/* Bottom 3 Widgets: Deadlines, Subject Progress, Weekly Productivity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Upcoming Deadlines */}
          <div className="rounded-2xl bg-navy-850/80 border border-white/10 p-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-3">
              <h4 className="text-xs font-semibold text-slate-200">Upcoming Deadlines</h4>
              <span className="text-[11px] text-brand-400">View all →</span>
            </div>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60">
                <div>
                  <p className="font-medium text-slate-200">DBMS Assignment</p>
                  <p className="text-[10px] text-slate-400">Oct 22, 2025</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-rose-500/20 text-rose-300 font-semibold">2 days left</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60">
                <div>
                  <p className="font-medium text-slate-200">ML Project Report</p>
                  <p className="text-[10px] text-slate-400">Oct 28, 2025</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-amber-500/20 text-amber-300 font-semibold">8 days left</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-navy-900/60">
                <div>
                  <p className="font-medium text-slate-200">Final Exam - AI</p>
                  <p className="text-[10px] text-slate-400">Nov 05, 2025</p>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300 font-semibold">16 days left</span>
              </div>
            </div>
          </div>

          {/* Subject Progress */}
          <div className="rounded-2xl bg-navy-850/80 border border-white/10 p-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-3">
              <h4 className="text-xs font-semibold text-slate-200">Subject Progress</h4>
              <span className="text-[11px] text-brand-400">View all →</span>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Machine Learning</span>
                  <span className="text-brand-purple font-semibold">75%</span>
                </div>
                <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-purple rounded-full" style={{ width: "75%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Database Management</span>
                  <span className="text-brand-electric font-semibold">60%</span>
                </div>
                <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-electric rounded-full" style={{ width: "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Web Development</span>
                  <span className="text-emerald-400 font-semibold">45%</span>
                </div>
                <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400 rounded-full" style={{ width: "45%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-slate-300">Mathematics</span>
                  <span className="text-amber-400 font-semibold">30%</span>
                </div>
                <div className="h-1.5 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-400 rounded-full" style={{ width: "30%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Weekly Productivity */}
          <div className="rounded-2xl bg-navy-850/80 border border-white/10 p-4">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-3">
              <h4 className="text-xs font-semibold text-slate-200">Weekly Productivity</h4>
              <span className="text-[11px] text-brand-400">View all →</span>
            </div>
            {/* Visual Bar representation matching the image */}
            <div className="h-32 flex items-end justify-between gap-2 pt-4 px-2">
              {[
                { day: "Mon", h: "100%", color: "bg-brand-500" },
                { day: "Tue", h: "75%", color: "bg-brand-500" },
                { day: "Wed", h: "50%", color: "bg-brand-500/70" },
                { day: "Thu", h: "75%", color: "bg-brand-500" },
                { day: "Fri", h: "90%", color: "bg-brand-500" },
                { day: "Sat", h: "50%", color: "bg-brand-500/70" },
                { day: "Sun", h: "30%", color: "bg-brand-500/40" },
              ].map((item, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                  <div className="w-full bg-navy-950/80 rounded-t h-full flex items-end">
                    <div
                      className={`w-full rounded-t ${item.color} transition-all duration-500`}
                      style={{ height: item.h }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400">{item.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

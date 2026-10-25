"use client";

import { useState } from "react";
import Link from "next/link";
import { format } from "date-fns";
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  LayoutDashboard,
  Calendar as CalendarIcon,
  Plus,
  Sparkles,
  Bot,
  ArrowRight,
  Database,
  Check,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { TaskModal } from "@/components/dashboard/TaskModal";
import { formatDueDate, getDeadlineCountdown, getPriorityColor } from "@/lib/utils";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function DashboardOverviewPage() {
  const {
    tasks,
    subjects,
    profile,
    metrics,
    subjectProgress,
    weeklyProductivity,
    isHydrated,
    toggleTaskComplete,
    loadSampleData,
  } = useTaskStore();

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  // Time of day greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleToggle = (id: string, title: string, wasCompleted: boolean) => {
    toggleTaskComplete(id);
    if (!wasCompleted) {
      confetti({
        particleCount: 40,
        spread: 50,
        origin: { y: 0.7 },
        colors: ["#10B981", "#6366F1", "#3B82F6"],
      });
      toast.success(`Completed: ${title}`);
    } else {
      toast.info(`Reopened: ${title}`);
    }
  };

  // Today's tasks (due today or top active tasks)
  const todayTasks = tasks.slice(0, 5);

  // Upcoming deadlines (tasks with due dates sorted by due date)
  const upcomingDeadlines = tasks
    .filter((t) => t.status !== "Completed" && t.due_at)
    .sort((a, b) => new Date(a.due_at!).getTime() - new Date(b.due_at!).getTime())
    .slice(0, 4);

  if (!isHydrated) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-20 bg-navy-900/60 rounded-2xl" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-28 bg-navy-900/60 rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="h-64 bg-navy-900/60 rounded-2xl" />
          <div className="h-64 bg-navy-900/60 rounded-2xl" />
          <div className="h-64 bg-navy-900/60 rounded-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Greeting & Action Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
            {getGreeting()}, {profile.full_name}! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Ready to make progress today? You have {metrics.pendingTasks + metrics.inProgressTasks} active tasks to tackle.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-navy-850 border border-white/10 text-xs text-slate-300">
            <CalendarIcon className="h-3.5 w-3.5 text-brand-400" />
            <span>{format(new Date(), "EEE, d MMM yyyy")}</span>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => setIsTaskModalOpen(true)}
            className="text-xs"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Task
          </Button>

          <Link href="/dashboard/ai-planner">
            <Button size="sm" variant="gradient" className="text-xs">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Generate Study Plan
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Stat Metric Cards (Matching Screenshot) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-brand-500/20 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-brand-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Tasks</span>
            <div className="h-8 w-8 rounded-xl bg-brand-500/15 border border-brand-500/20 flex items-center justify-center text-brand-400">
              <LayoutDashboard className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{metrics.totalTasks}</p>
          <p className="text-xs text-brand-400 mt-1 font-medium">
            {metrics.completedToday} completed today
          </p>
        </div>

        {/* In Progress */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-emerald-500/20 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-emerald-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">In Progress</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{metrics.inProgressTasks}</p>
          <p className="text-xs text-emerald-400 mt-1 font-medium">
            {metrics.totalTasks > 0
              ? `${Math.round((metrics.inProgressTasks / metrics.totalTasks) * 100)}% of total`
              : "0% of total"}
          </p>
        </div>

        {/* Overdue */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-rose-500/20 shadow-xl backdrop-blur-md relative overflow-hidden group hover:border-rose-500/40 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Overdue</span>
            <div className="h-8 w-8 rounded-xl bg-rose-500/15 border border-rose-500/20 flex items-center justify-center text-rose-400">
              <AlertTriangle className="h-4 w-4" />
            </div>
          </div>
          <p className="text-3xl font-black text-white">{metrics.overdueTasks}</p>
          <p className="text-xs text-rose-400 mt-1 font-medium">
            {metrics.overdueTasks > 0 ? "Need immediate attention" : "No overdue tasks"}
          </p>
        </div>

        {/* Completion Rate with SVG circular ring */}
        <div className="p-5 rounded-2xl bg-navy-900/70 border border-cyan-500/20 shadow-xl backdrop-blur-md flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
          <div>
            <span className="text-xs font-medium text-slate-400">Completion Rate</span>
            <p className="text-3xl font-black text-white mt-1">{metrics.completionRate}%</p>
            <p className="text-xs text-cyan-400 mt-1 font-medium">
              {metrics.completedTasks} of {metrics.totalTasks} completed
            </p>
          </div>
          <div className="relative h-14 w-14 flex items-center justify-center shrink-0">
            <svg className="w-14 h-14 transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-navy-800"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-cyan-400 transition-all duration-700 ease-out"
                strokeDasharray={`${metrics.completionRate}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-extrabold text-white">
              {metrics.completionRate}%
            </span>
          </div>
        </div>
      </div>

      {/* Middle 3 Sections: Today's Tasks (5 cols), This Week (3 cols), AI Planner (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Today's Tasks */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-900/70 border border-white/10 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-brand-400" />
                Today&apos;s Tasks
              </h3>
              <Link
                href="/dashboard/tasks"
                className="text-xs text-brand-400 hover:text-brand-300 flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            {todayTasks.length === 0 ? (
              <div className="py-8 text-center">
                <p className="text-xs text-slate-400 mb-3">No tasks added yet.</p>
                <Button size="sm" variant="outline" onClick={loadSampleData}>
                  <Database className="h-3.5 w-3.5 mr-1 text-brand-400" />
                  Load Demo Data
                </Button>
              </div>
            ) : (
              <div className="space-y-2.5">
                {todayTasks.map((t) => {
                  const sub = subjects.find((s) => s.id === t.subject_id);
                  const isCompleted = t.status === "Completed";
                  const priorityStyles = getPriorityColor(t.priority);

                  return (
                    <div
                      key={t.id}
                      className="group flex items-center justify-between p-3 rounded-xl bg-navy-950/70 border border-white/5 hover:border-brand-500/30 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0 pr-2">
                        <button
                          onClick={() => handleToggle(t.id, t.title, isCompleted)}
                          className={`h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 transition-all ${
                            isCompleted
                              ? "bg-brand-500 border-brand-500 text-white"
                              : "border-slate-600 hover:border-brand-400 bg-navy-900"
                          }`}
                          aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
                        >
                          {isCompleted && <Check className="h-3.5 w-3.5" />}
                        </button>
                        <div className="min-w-0">
                          <p
                            className={`text-xs font-medium truncate ${
                              isCompleted
                                ? "line-through text-slate-500"
                                : "text-slate-200 group-hover:text-white"
                            }`}
                          >
                            {t.title}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate">
                            {sub ? sub.name : t.category}
                          </p>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                        >
                          {t.priority}
                        </span>
                        <p className="text-[10px] text-slate-400 mt-1">
                          {formatDueDate(t.due_at)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* This Week Schedule Strip */}
        <div className="lg:col-span-3 rounded-2xl bg-navy-900/70 border border-white/10 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
              <h3 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-emerald-400" />
                This Week
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded bg-brand-500/20 text-brand-300 font-medium border border-brand-500/30">
                Oct 20-26
              </span>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => {
                const isSelected = i === 1; // Tue Oct 21
                return (
                  <div
                    key={i}
                    className={`py-1.5 rounded-lg text-xs transition-colors ${
                      isSelected
                        ? "bg-brand-500 text-white font-bold shadow-md shadow-brand-500/25"
                        : "text-slate-400 bg-navy-950/60"
                    }`}
                  >
                    <p className="text-[9px] opacity-75">{d}</p>
                    <p className="font-semibold">{20 + i}</p>
                  </div>
                );
              })}
            </div>

            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-navy-950/80 border-l-2 border-brand-500 text-slate-300 text-[11px]">
                <p className="font-semibold text-white">09:00 AM • DBMS Class</p>
                <p className="text-[10px] text-slate-400">Room 302, Lecture Hall</p>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-950/80 border-l-2 border-brand-purple text-slate-300 text-[11px]">
                <p className="font-semibold text-white">11:00 AM • Study Session</p>
                <p className="text-[10px] text-slate-400">Library 2nd Floor Quiet Zone</p>
              </div>
              <div className="p-2.5 rounded-xl bg-navy-950/80 border-l-2 border-emerald-500 text-slate-300 text-[11px]">
                <p className="font-semibold text-white">02:00 PM • Project Work</p>
                <p className="text-[10px] text-slate-400">Hackathon Team Sync</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Study Planner Quick Widget */}
        <div className="lg:col-span-4 rounded-2xl bg-gradient-to-br from-navy-900 to-navy-850 border border-brand-500/30 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-purple/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-white/5 mb-3">
              <div className="h-7 w-7 rounded-lg bg-brand-500/20 flex items-center justify-center text-brand-400">
                <Sparkles className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-white">AI Study Planner</h3>
                <p className="text-[10px] text-brand-300">Intelligent Rule-Based Engine</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 mb-3">
              What do you want to study or plan today?
            </p>

            <div className="p-3 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-slate-400 mb-4 italic">
              &quot;I have a DBMS exam in 3 days. I can study 2 hours each day. Help me prepare.&quot;
            </div>
          </div>

          <div>
            <Link href="/dashboard/ai-planner">
              <Button size="sm" variant="gradient" className="w-full text-xs font-semibold">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Generate Plan
              </Button>
            </Link>

            <div className="mt-3 flex items-center justify-center gap-1.5 text-[10px] text-brand-300/80">
              <Bot className="h-3.5 w-3.5" />
              <span>Smart breakdown • Zero API keys required</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 3 Sections: Upcoming Deadlines, Subject Progress, Weekly Productivity */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Upcoming Deadlines */}
        <div className="rounded-2xl bg-navy-900/70 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <h4 className="text-xs font-semibold text-slate-200">Upcoming Deadlines</h4>
            <Link href="/dashboard/tasks" className="text-[11px] text-brand-400 hover:underline">
              View all →
            </Link>
          </div>

          {upcomingDeadlines.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center">No upcoming deadlines.</p>
          ) : (
            <div className="space-y-2.5 text-xs">
              {upcomingDeadlines.map((t) => {
                const countdown = getDeadlineCountdown(t.due_at);
                return (
                  <div
                    key={t.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-navy-950/70 border border-white/5"
                  >
                    <div className="min-w-0 pr-2">
                      <p className="font-semibold text-slate-200 truncate">{t.title}</p>
                      <p className="text-[10px] text-slate-400">{formatDueDate(t.due_at)}</p>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold shrink-0 ${
                        countdown.isOverdue
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : countdown.isUrgent
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      }`}
                    >
                      {countdown.label}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Subject Progress */}
        <div className="rounded-2xl bg-navy-900/70 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <h4 className="text-xs font-semibold text-slate-200">Subject Progress</h4>
            <Link href="/dashboard/analytics" className="text-[11px] text-brand-400 hover:underline">
              View all →
            </Link>
          </div>

          <div className="space-y-3.5">
            {subjectProgress.map((sub) => (
              <div key={sub.id}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium truncate pr-2">{sub.name}</span>
                  <span className="font-bold text-white shrink-0">{sub.percentage}%</span>
                </div>
                <div className="h-2 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${sub.percentage}%`,
                      backgroundColor: sub.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Weekly Productivity */}
        <div className="rounded-2xl bg-navy-900/70 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3">
            <h4 className="text-xs font-semibold text-slate-200">Weekly Productivity</h4>
            <Link href="/dashboard/analytics" className="text-[11px] text-brand-400 hover:underline">
              View all →
            </Link>
          </div>

          <div className="h-36 flex items-end justify-between gap-2 pt-2 px-1">
            {weeklyProductivity.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <div className="w-full bg-navy-950/80 rounded-t h-full flex items-end">
                  <div
                    className="w-full rounded-t bg-brand-500 hover:bg-brand-400 transition-all duration-500"
                    style={{ height: `${item.ratePercentage}%` }}
                    title={`${item.day}: ${item.ratePercentage}% study rate`}
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-medium">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task Creation Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </div>
  );
}

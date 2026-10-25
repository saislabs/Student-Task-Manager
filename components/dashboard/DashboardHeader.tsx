"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  Database,
  Plus,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Clock,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface HeaderProps {
  onOpenMobileMenu?: () => void;
  onOpenAddTask?: () => void;
  onOpenGeneratePlan?: () => void;
}

export function DashboardHeader({
  onOpenMobileMenu,
  onOpenAddTask,
  onOpenGeneratePlan,
}: HeaderProps) {
  const router = useRouter();
  const { profile, theme, toggleTheme, loadSampleData, tasks } = useTaskStore();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard/tasks?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLoadSample = () => {
    loadSampleData();
    toast.success("Loaded realistic student demo tasks!");
  };

  // Notification items: overdue & due today
  const overdueCount = tasks.filter((t) => {
    if (t.status === "Completed" || !t.due_at) return false;
    return new Date(t.due_at) < new Date();
  }).length;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-navy-950/80 px-4 sm:px-6 backdrop-blur-xl">
      <div className="flex items-center gap-3">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden rounded-lg p-2 text-slate-400 hover:text-white hover:bg-white/5"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Global Search Bar */}
        <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-72 md:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tasks, subjects, or tags..."
            className="h-9 w-full rounded-xl border border-white/10 bg-navy-900/80 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500/50 focus:ring-1 focus:ring-brand-500/50 transition-colors"
          />
        </form>
      </div>

      <div className="flex items-center gap-2.5 sm:gap-3">
        {/* Load Demo Data Quick Pill for Hackathon Evaluators */}
        <button
          onClick={handleLoadSample}
          title="Reset to realistic demo dataset"
          className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-navy-850 hover:bg-navy-800 border border-white/10 text-xs text-slate-300 transition-colors"
        >
          <Database className="h-3.5 w-3.5 text-brand-400" />
          <span className="text-[11px] font-medium">Reset Demo Data</span>
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          aria-label="Toggle dark/light theme"
          className="rounded-xl p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-400" />}
        </button>

        {/* Notification Bell with Badge */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative rounded-xl p-2 text-slate-400 hover:text-white hover:bg-white/5 transition-colors border border-white/5"
          >
            <Bell className="h-4 w-4" />
            {overdueCount > 0 && (
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-white/10 bg-navy-900/95 p-3 shadow-2xl backdrop-blur-xl z-50">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/5">
                <span className="text-xs font-semibold text-white">Notifications</span>
                <span className="text-[10px] text-brand-400">{overdueCount} Alerts</span>
              </div>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {overdueCount > 0 ? (
                  <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300 flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">{overdueCount} Overdue Tasks</p>
                      <p className="text-[10px] text-slate-400">Review pending deadlines in My Tasks.</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    <span>All deadlines are on schedule!</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Quick Add Task button */}
        {onOpenAddTask && (
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenAddTask}
            className="text-xs hidden sm:inline-flex"
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            Add Task
          </Button>
        )}

        {/* User Pill */}
        <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-white/10">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-brand-purple to-brand-electric flex items-center justify-center text-xs font-bold text-white shadow-md">
            {profile.full_name.charAt(0)}
          </div>
          <div className="hidden md:block text-left text-xs leading-none">
            <p className="font-semibold text-slate-200">{profile.full_name}</p>
            <p className="text-[10px] text-slate-400 mt-0.5">Student</p>
          </div>
        </div>
      </div>
    </header>
  );
}

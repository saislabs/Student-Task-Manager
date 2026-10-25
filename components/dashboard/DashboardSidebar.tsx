"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Sparkles,
  BarChart3,
  Settings,
  X,
  Sparkle,
} from "lucide-react";
import { cn } from "@/lib/utils";
import confetti from "canvas-confetti";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function DashboardSidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
    },
    {
      name: "AI Planner",
      href: "/dashboard/ai-planner",
      icon: Sparkles,
      badge: "Smart",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  const handleConfetti = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#6366F1", "#8B5CF6", "#3B82F6", "#10B981"],
    });
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-navy-950/80 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 bottom-0 left-0 z-40 w-64 border-r border-white/10 bg-navy-950/95 p-5 backdrop-blur-2xl flex flex-col justify-between transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64 shrink-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div>
          {/* Brand Header */}
          <div className="flex items-center justify-between pb-6 mb-4 border-b border-white/5">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-purple flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-sm tracking-tight text-white">STUDYFLOW</span>
                  <span className="font-extrabold text-sm text-brand-400">AI</span>
                </div>
                <p className="text-[9px] uppercase tracking-wider font-semibold text-slate-400">SAIS LABS</p>
              </div>
            </Link>

            {onClose && (
              <button
                onClick={onClose}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                item.href === "/dashboard"
                  ? pathname === "/dashboard"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all group",
                    isActive
                      ? "bg-brand-500/20 text-brand-300 border border-brand-500/40 shadow-sm shadow-brand-500/20"
                      : "text-slate-400 hover:text-slate-100 hover:bg-white/5"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-brand-400" : "text-slate-400 group-hover:text-slate-200"
                      )}
                    />
                    <span>{item.name}</span>
                  </div>

                  {item.badge && (
                    <span className="px-1.5 py-0.5 rounded text-[9px] font-semibold bg-brand-purple/20 text-purple-300 border border-purple-500/30">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Motivation Card matching design image screenshot */}
        <div className="pt-4">
          <div className="relative rounded-2xl overflow-hidden border border-white/10 p-4 text-center bg-gradient-to-t from-navy-900 to-navy-850 shadow-xl">
            {/* Mountain sunrise background graphic */}
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/90 via-navy-950/60 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-brand-500/20 text-brand-300 mb-2">
                <Sparkle className="h-4 w-4" />
              </div>
              <p className="text-xs font-semibold text-white leading-tight">Small steps create big results.</p>
              <p className="text-[10px] text-slate-400 mt-0.5 mb-3">Keep your study momentum going!</p>
              <button
                onClick={handleConfetti}
                className="w-full py-1.5 px-3 rounded-xl bg-gradient-to-r from-brand-purple to-brand-500 hover:opacity-95 text-white text-xs font-medium shadow-md shadow-brand-500/25 transition-all active:scale-95"
              >
                Keep Going! 🎉
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

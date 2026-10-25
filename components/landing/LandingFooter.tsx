"use client";

import Link from "next/link";
import { GraduationCap, Heart } from "lucide-react";

export function LandingFooter() {
  return (
    <footer className="border-t border-white/5 bg-navy-950/80 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="h-8 w-8 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-purple flex items-center justify-center text-white shadow-md">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="font-bold text-base tracking-tight text-white">STUDYFLOW AI</span>
            </Link>
            <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-4 leading-relaxed">
              Plan Smarter. Study Better. Achieve More. The complete academic productivity platform for modern students, project teams, and hackathon contenders.
            </p>
            <p className="text-[11px] text-slate-500">
              A product by <strong className="text-slate-300">SAIS LABS</strong>
            </p>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Platform</h4>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              <li><Link href="/dashboard/tasks" className="hover:text-white transition-colors">Task Management</Link></li>
              <li><Link href="/dashboard/calendar" className="hover:text-white transition-colors">Study Calendar</Link></li>
              <li><Link href="/dashboard/ai-planner" className="hover:text-white transition-colors">AI Study Planner</Link></li>
              <li><Link href="/dashboard/analytics" className="hover:text-white transition-colors">Productivity Analytics</Link></li>
            </ul>
          </div>

          {/* Legal & Workshop Links */}
          <div>
            <h4 className="font-semibold text-slate-200 uppercase tracking-wider text-[11px] mb-3">Legal & Info</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Student Login</Link></li>
              <li><Link href="/signup" className="hover:text-white transition-colors">Create Account</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-[11px]">
            © {new Date().getFullYear()} SAIS LABS. All rights reserved. Built for College Hackathon Workshop Demonstration.
          </p>
          <div className="flex items-center gap-1.5 text-slate-500 text-[11px]">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for student success</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

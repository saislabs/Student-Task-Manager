"use client";

import Link from "next/link";
import { ArrowRight, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Brand Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/25 text-brand-300 text-xs font-medium mb-8 backdrop-blur-md">
          <Sparkles className="h-3.5 w-3.5 text-brand-400" />
          <span>SAIS LABS Production Release • Hackathon Edition</span>
        </div>

        {/* Cursive Tagline preview */}
        <p className="text-xl sm:text-2xl font-serif italic text-brand-300/90 mb-3 tracking-wide">
          Plan Smarter.
        </p>

        {/* Main Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
          Study <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple via-brand-400 to-brand-electric">Better.</span> Achieve More.
        </h1>

        <p className="text-2xl sm:text-3xl font-bold text-slate-200 mb-6">
          Your Semester, Organized.
        </p>

        {/* Supporting description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-10 leading-relaxed font-normal">
          Manage your assignments, exams, projects and daily tasks — all in one place.
          Powered by AI to help you study smarter, balance your academic workload, and never miss a deadline.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-14">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button variant="gradient" size="lg" className="w-full sm:w-auto text-base">
              Get Started Free
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
          <a href="#features" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto text-base">
              Explore Features
            </Button>
          </a>
        </div>

        {/* Feature Pills under hero */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-4 border-t border-white/5">
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 bg-navy-900/40 p-2.5 rounded-xl border border-white/5">
            <Zap className="h-4 w-4 text-brand-400" />
            <span>AI Powered Schedules</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 bg-navy-900/40 p-2.5 rounded-xl border border-white/5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Secure & Isolated RLS</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 bg-navy-900/40 p-2.5 rounded-xl border border-white/5">
            <Layers className="h-4 w-4 text-brand-electric" />
            <span>Responsive Multi-Device</span>
          </div>
          <div className="flex items-center justify-center gap-2 text-xs font-medium text-slate-400 bg-navy-900/40 p-2.5 rounded-xl border border-white/5">
            <CheckCircle2 className="h-4 w-4 text-purple-400" />
            <span>Built for Students</span>
          </div>
        </div>
      </div>
    </section>
  );
}

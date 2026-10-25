"use client";

import Link from "next/link";
import { GraduationCap, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 bg-navy-950/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-purple flex items-center justify-center shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-lg tracking-tight text-white">STUDYFLOW</span>
              <span className="font-extrabold text-lg text-brand-400">AI</span>
            </div>
            <p className="text-[10px] tracking-wider uppercase text-slate-400 font-medium">SAIS LABS</p>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#preview" className="hover:text-white transition-colors">Platform</a>
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#ai-planner" className="hover:text-white transition-colors flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-brand-400" />
            AI Planner
          </a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        {/* Action CTAs */}
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm">
              Log In
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="gradient" size="sm" className="hidden sm:inline-flex">
              Launch App
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}

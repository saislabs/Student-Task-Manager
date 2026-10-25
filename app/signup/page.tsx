"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { GraduationCap, ArrowRight, Laptop } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTaskStore } from "@/lib/store/task-store";
import { toast } from "sonner";

export default function SignupPage() {
  const router = useRouter();
  const { updateProfile } = useTaskStore();
  const [studentName, setStudentName] = useState("Surya");

  const handleCreateWorkspace = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentName.trim()) {
      updateProfile({ full_name: studentName.trim() });
    }
    toast.success(`Welcome to your new workspace, ${studentName || "Student"}!`);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-brand-purple/15 rounded-full blur-[140px] pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center mb-6">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-4">
          <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-brand-500 to-brand-purple flex items-center justify-center text-white shadow-lg group-hover:scale-105 transition-transform">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div className="text-left">
            <span className="font-extrabold text-xl tracking-tight text-white">STUDYFLOW AI</span>
            <p className="text-[10px] uppercase font-semibold text-brand-400">SAIS LABS</p>
          </div>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-white">
          Create Student Workspace
        </h2>
        <p className="mt-1 text-xs text-slate-400">
          Instant setup • No credit card, database, or passwords required
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4 sm:px-0">
        <div className="rounded-2xl border border-white/10 bg-navy-900/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-6 p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/25 flex items-start gap-2.5">
            <Laptop className="h-4 w-4 text-brand-400 shrink-0 mt-0.5" />
            <div className="text-[11px] text-slate-300 leading-relaxed">
              STUDYFLOW AI runs directly in your browser. All your tasks, courses, and schedules are saved locally and immediately available.
            </div>
          </div>

          <form onSubmit={handleCreateWorkspace} className="space-y-4">
            <Input
              id="studentName"
              label="Your Name / Nickname"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              placeholder="e.g. Surya"
            />

            <Button type="submit" variant="gradient" className="w-full mt-2">
              Start Organizing Now
              <ArrowRight className="h-4 w-4 ml-1.5" />
            </Button>
          </form>

          <div className="mt-6 pt-4 border-t border-white/5 text-center">
            <Link href="/dashboard" className="text-xs text-slate-400 hover:text-white transition-colors">
              Already initialized? Jump directly to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

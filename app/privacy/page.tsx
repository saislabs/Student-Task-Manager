import Link from "next/link";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { ArrowLeft, Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <LandingHeader />
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-brand-400 hover:text-brand-300 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </Link>

        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
            <p className="text-xs text-slate-400">SAIS LABS • STUDYFLOW AI</p>
          </div>
        </div>

        <div className="prose prose-invert max-w-none text-slate-300 text-sm space-y-6 leading-relaxed">
          <p>
            Welcome to STUDYFLOW AI, a product developed by SAIS LABS. We are dedicated to protecting your academic privacy and ensuring that your educational data is stored securely.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">1. Data Ownership and Row Level Security</h3>
          <p>
            All tasks, courses, project notes, and study sessions entered into STUDYFLOW AI are owned strictly by you. Every Supabase PostgreSQL table enforces strict Row Level Security (RLS) policies tied directly to your unique authenticated user identifier (<code>auth.uid()</code>). Other students or unauthorized third parties cannot read, query, or mutate your data.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">2. Artificial Intelligence Integration</h3>
          <p>
            When you use the AI Study Planner or AI Subtask Breakdown, your inputs (subject name, days until deadline, study hours, and key topics) are forwarded through a secure server-side proxy to the configured language model API. We do not store or use your personal prompts to train commercial AI models, and student names or contact details are never attached to LLM requests.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">3. Cookies and Session Tokens</h3>
          <p>
            We use secure HTTP cookies to maintain authentication state across browser sessions. We do not utilize third-party cross-site advertising cookies or tracking beacons.
          </p>

          <h3 className="text-lg font-bold text-white pt-2">4. Contact Information</h3>
          <p>
            If you have questions regarding data privacy or wish to request data deletion, please contact the SAIS LABS workshop development team.
          </p>
        </div>
      </main>
      <LandingFooter />
    </div>
  );
}

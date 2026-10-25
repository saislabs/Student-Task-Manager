import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { TaskProvider } from "@/lib/store/task-store";

export const metadata: Metadata = {
  title: "STUDYFLOW AI — Plan Smarter. Study Better. Achieve More. | SAIS LABS",
  description:
    "The smart student task and study management platform by SAIS LABS. Manage assignments, exams, projects, and daily tasks in one place.",
  keywords: [
    "student task manager",
    "study planner",
    "AI study plan",
    "hackathon",
    "college productivity",
    "SAIS LABS",
    "studyflow ai",
  ],
  authors: [{ name: "SAIS LABS" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-navy-950 text-slate-100 antialiased font-sans">
        <div className="fixed inset-0 pointer-events-none radial-glow" />
        <div className="fixed inset-0 pointer-events-none radial-glow-violet" />
        <TaskProvider>
          <div className="relative z-10 flex flex-col min-h-screen">
            {children}
          </div>
          <Toaster
            position="bottom-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0E1424",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                color: "#F8FAFC",
              },
            }}
          />
        </TaskProvider>
      </body>
    </html>
  );
}

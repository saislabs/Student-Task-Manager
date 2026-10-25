"use client";

import { useState } from "react";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { TaskModal } from "@/components/dashboard/TaskModal";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-navy-950 text-slate-100">
      {/* Sidebar */}
      <DashboardSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        <DashboardHeader
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
          onOpenAddTask={() => setIsAddTaskModalOpen(true)}
        />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Global Quick Add Task Modal */}
      <TaskModal
        isOpen={isAddTaskModalOpen}
        onClose={() => setIsAddTaskModalOpen(false)}
      />
    </div>
  );
}

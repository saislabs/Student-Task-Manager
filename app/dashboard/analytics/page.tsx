"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  BarChart3,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  PieChart as PieIcon,
  Sparkles,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { TaskPriority } from "@/types";

export default function AnalyticsPage() {
  const { tasks, subjects, metrics, subjectProgress, weeklyProductivity } = useTaskStore();

  // 1. Pending vs Completed Pie Data
  const statusPieData = useMemo(() => {
    return [
      { name: "Completed", value: metrics.completedTasks, color: "#10B981" },
      { name: "In Progress", value: metrics.inProgressTasks, color: "#3B82F6" },
      { name: "Pending", value: metrics.pendingTasks, color: "#8B5CF6" },
    ].filter((item) => item.value > 0);
  }, [metrics]);

  // 2. Priority Distribution Data
  const priorityData = useMemo(() => {
    const counts: Record<TaskPriority, number> = { Urgent: 0, High: 0, Medium: 0, Low: 0 };
    tasks.forEach((t) => {
      counts[t.priority] = (counts[t.priority] || 0) + 1;
    });

    return [
      { priority: "Urgent", count: counts.Urgent, color: "#EF4444" },
      { priority: "High", count: counts.High, color: "#F97316" },
      { priority: "Medium", count: counts.Medium, color: "#F59E0B" },
      { priority: "Low", count: counts.Low, color: "#10B981" },
    ];
  }, [tasks]);

  // 3. Subject Comparison Data
  const subjectChartData = useMemo(() => {
    return subjectProgress.map((s) => ({
      name: s.name.length > 15 ? `${s.name.slice(0, 12)}...` : s.name,
      total: s.total,
      completed: s.completed,
      pending: s.total - s.completed,
    }));
  }, [subjectProgress]);

  // Total estimated study hours
  const totalEstimatedMinutes = useMemo(() => {
    return tasks.reduce((acc, t) => acc + (t.estimated_minutes || 0), 0);
  }, [tasks]);

  const completedEstimatedMinutes = useMemo(() => {
    return tasks
      .filter((t) => t.status === "Completed")
      .reduce((acc, t) => acc + (t.estimated_minutes || 0), 0);
  }, [tasks]);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="pb-2 border-b border-white/5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Productivity Analytics</h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Objective workspace performance data derived strictly from your stored tasks and completed milestones.
        </p>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400 font-medium">Overall Completion</span>
          <p className="text-3xl font-black text-white mt-2">{metrics.completionRate}%</p>
          <p className="text-xs text-emerald-400 mt-1 font-medium">
            {metrics.completedTasks} of {metrics.totalTasks} tasks done
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400 font-medium">Study Time Invested</span>
          <p className="text-3xl font-black text-white mt-2">
            {(completedEstimatedMinutes / 60).toFixed(1)} <span className="text-sm font-normal text-slate-400">hours</span>
          </p>
          <p className="text-xs text-slate-400 mt-1">
            of {(totalEstimatedMinutes / 60).toFixed(1)} planned hours
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400 font-medium">Active Workload</span>
          <p className="text-3xl font-black text-white mt-2">
            {metrics.pendingTasks + metrics.inProgressTasks}
          </p>
          <p className="text-xs text-brand-400 mt-1">
            {metrics.inProgressTasks} currently in progress
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-navy-900/80 border border-white/10 shadow-lg backdrop-blur-md">
          <span className="text-xs text-slate-400 font-medium">Overdue Rate</span>
          <p className="text-3xl font-black text-white mt-2">{metrics.overdueTasks}</p>
          <p className="text-xs text-rose-400 mt-1 font-medium">
            {metrics.overdueTasks > 0 ? "Requires deadline review" : "Zero overdue tasks"}
          </p>
        </div>
      </div>

      {/* Row 1: Weekly Productivity Bar Chart + Status Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Weekly Productivity Bar Chart (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-brand-400" />
              Weekly Productivity Completion Rate
            </h3>
            <span className="text-xs text-slate-400">Current Week</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProductivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="day" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0E1424",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "0.75rem",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                  formatter={(val: any) => [`${val}%`, "Study Progress"]}
                />
                <Bar dataKey="ratePercentage" fill="#6366F1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Task Status Donut Chart (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-2">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <PieIcon className="h-4 w-4 text-emerald-400" />
              Task Status Distribution
            </h3>
            <span className="text-xs text-slate-400">{tasks.length} Total</span>
          </div>

          <div className="h-56 w-full flex items-center justify-center">
            {statusPieData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statusPieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {statusPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0E1424",
                      borderColor: "rgba(255,255,255,0.1)",
                      borderRadius: "0.75rem",
                      color: "#f8fafc",
                      fontSize: "12px",
                    }}
                  />
                  <Legend
                    wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                    formatter={(val) => <span className="text-slate-300">{val}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-xs text-slate-400">No task data available.</p>
            )}
          </div>
        </div>
      </div>

      {/* Row 2: Priority Distribution + Subject Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Priority Breakdown (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-400" />
              Task Breakdown by Priority
            </h3>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={priorityData} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={11} allowDecimals={false} />
                <YAxis dataKey="priority" type="category" stroke="#64748b" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0E1424",
                    borderColor: "rgba(255,255,255,0.1)",
                    borderRadius: "0.75rem",
                    color: "#f8fafc",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject-wise Progress (6 cols) */}
        <div className="lg:col-span-6 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <h3 className="text-sm font-semibold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-brand-electric" />
              Subject-wise Completion Breakdown
            </h3>
          </div>

          <div className="space-y-4">
            {subjectProgress.map((s) => (
              <div key={s.id} className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="font-medium text-slate-200">{s.name}</span>
                  </div>
                  <span className="font-semibold text-slate-300">
                    {s.completed}/{s.total} ({s.percentage}%)
                  </span>
                </div>
                <div className="h-2 w-full bg-navy-950 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700 ease-out"
                    style={{
                      width: `${s.percentage}%`,
                      backgroundColor: s.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

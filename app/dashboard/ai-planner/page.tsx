"use client";

import { useState } from "react";
import {
  Sparkles,
  Bot,
  Brain,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ListPlus,
  ArrowRight,
  ShieldAlert,
  Check,
  Edit2,
  Trash2,
  Plus,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  generateRuleBasedStudyPlan,
  generateRuleBasedBreakdown,
  GeneratedSubtask,
} from "@/lib/ai/planner";
import { StudyPlanData } from "@/types";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function AIPlannerPage() {
  const { subjects, addTask } = useTaskStore();

  const [activeTab, setActiveTab] = useState<"planner" | "breakdown">("planner");

  // Study Plan Form State
  const [examName, setExamName] = useState("Database Management Systems Exam");
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]?.name || "Database Management");
  const [deadlineDays, setDeadlineDays] = useState(3);
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(2);
  const [sessionMinutes, setSessionMinutes] = useState(45);
  const [topics, setTopics] = useState(
    "Relational Algebra & Tuple Calculus\nSQL Queries & Nested Subqueries\n1NF, 2NF, 3NF, BCNF Normalization\nTransaction ACID properties & Concurrency Control"
  );

  const [generatedPlan, setGeneratedPlan] = useState<StudyPlanData | null>(() =>
    generateRuleBasedStudyPlan({
      examOrProjectName: "Database Management Systems Exam",
      subject: "Database Management",
      deadlineDays: 3,
      studyHoursPerDay: 2,
      topics:
        "Relational Algebra & Tuple Calculus\nSQL Queries & Nested Subqueries\n1NF, 2NF, 3NF, BCNF Normalization\nTransaction ACID properties & Concurrency Control",
      preferredSessionMinutes: 45,
    })
  );

  // Breakdown Form State
  const [breakdownGoal, setBreakdownGoal] = useState(
    "Prepare a machine learning project presentation"
  );
  const [subtasks, setSubtasks] = useState<GeneratedSubtask[]>(() =>
    generateRuleBasedBreakdown("Prepare a machine learning project presentation")
  );

  // Handler: Generate Study Plan
  const handleGeneratePlan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!examName.trim() || !topics.trim()) {
      toast.error("Please provide an exam/goal name and topics to study.");
      return;
    }

    const plan = generateRuleBasedStudyPlan({
      examOrProjectName: examName,
      subject: selectedSubject,
      deadlineDays: Number(deadlineDays),
      studyHoursPerDay: Number(studyHoursPerDay),
      topics,
      preferredSessionMinutes: Number(sessionMinutes),
    });

    setGeneratedPlan(plan);
    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ["#8B5CF6", "#6366F1", "#3B82F6"],
    });
    toast.success("Study schedule generated successfully!");
  };

  // Handler: Save All Sessions to Tasks
  const handleSaveSessionsToTasks = () => {
    if (!generatedPlan) return;

    let addedCount = 0;
    const today = new Date();

    generatedPlan.sessions.forEach((session, index) => {
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + (session.day - 1));
      const dateStr = targetDate.toISOString().split("T")[0];

      // Match subject if possible
      const matchedSub = subjects.find(
        (s) => s.name.toLowerCase() === selectedSubject.toLowerCase()
      );

      addTask({
        title: session.title,
        description: `Study session covering: ${session.topics.join(", ")}`,
        subject_id: matchedSub?.id || subjects[0]?.id || null,
        category: session.type === "Revision" ? "Revision" : session.type === "Assessment" ? "Exam" : "Assignment",
        priority: session.type === "Revision" || session.type === "Assessment" ? "High" : "Medium",
        status: "Pending",
        due_at: `${dateStr}T18:00:00.000Z`,
        estimated_minutes: session.durationMinutes,
        tags: ["ai-plan", session.type.toLowerCase()],
      });
      addedCount++;
    });

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.7 },
      colors: ["#10B981", "#6366F1", "#8B5CF6"],
    });
    toast.success(`Added ${addedCount} study sessions to your tasks!`);
  };

  // Handler: Generate Subtasks
  const handleGenerateBreakdown = (goalText?: string) => {
    const target = goalText || breakdownGoal;
    if (!target.trim()) {
      toast.error("Please enter a goal description");
      return;
    }
    const results = generateRuleBasedBreakdown(target);
    setSubtasks(results);
    toast.success(`Generated ${results.length} suggested subtasks!`);
  };

  // Handler: Toggle Subtask selection
  const handleToggleSubtask = (id: string) => {
    setSubtasks((prev) =>
      prev.map((st) => (st.id === id ? { ...st, selected: !st.selected } : st))
    );
  };

  // Handler: Save Selected Subtasks
  const handleSaveSubtasks = () => {
    const toSave = subtasks.filter((st) => st.selected);
    if (toSave.length === 0) {
      toast.info("Please select at least one subtask to save.");
      return;
    }

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const dateStr = tomorrow.toISOString().split("T")[0];

    toSave.forEach((st) => {
      addTask({
        title: st.title,
        description: `Derived from goal: ${breakdownGoal}`,
        subject_id: subjects[0]?.id || null,
        category: st.category,
        priority: st.priority,
        status: "Pending",
        due_at: `${dateStr}T17:00:00.000Z`,
        estimated_minutes: st.estimatedMinutes,
        tags: ["subtask", "breakdown"],
      });
    });

    confetti({
      particleCount: 45,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#10B981", "#6366F1"],
    });
    toast.success(`Saved ${toSave.length} subtasks to My Tasks!`);
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Navigation Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              AI Study & Goal Planner
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-brand-purple/20 text-purple-300 border border-purple-500/30">
              Rule-Based Engine
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Intelligent academic schedule generation and goal breakdown — runs instantly with zero external API keys.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center rounded-xl bg-navy-900 border border-white/10 p-1">
          <button
            onClick={() => setActiveTab("planner")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "planner"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Study Schedule Generator
          </button>
          <button
            onClick={() => setActiveTab("breakdown")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeTab === "breakdown"
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Project Subtask Breakdown
          </button>
        </div>
      </div>

      {/* Transparent Labeling Banner as required in prompt */}
      <div className="p-3.5 rounded-2xl bg-brand-500/10 border border-brand-500/20 backdrop-blur-md flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <Bot className="h-4 w-4 text-brand-400 shrink-0" />
          <p className="text-xs text-brand-200">
            <strong>Deterministic Academic Planner:</strong> Evaluates deadline constraints, spreads topic weightage, and injects formula revision blocks using heuristic rules.
          </p>
        </div>
        <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 shrink-0">
          Vercel Ready
        </span>
      </div>

      {/* TAB 1: STUDY PLANNER */}
      {activeTab === "planner" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Inputs Column (5 cols) */}
          <div className="lg:col-span-5 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-brand-400" />
              Exam / Goal Parameters
            </h2>

            <form onSubmit={handleGeneratePlan} className="space-y-4">
              <Input
                id="examName"
                label="Exam or Project Name *"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                placeholder="e.g. DBMS Final Exam"
              />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Subject
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="flex h-10 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Days Remaining
                  </label>
                  <Input
                    type="number"
                    min={1}
                    max={60}
                    value={deadlineDays}
                    onChange={(e) => setDeadlineDays(Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Study Hours / Day
                  </label>
                  <Input
                    type="number"
                    min={0.5}
                    max={14}
                    step={0.5}
                    value={studyHoursPerDay}
                    onChange={(e) => setStudyHoursPerDay(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Session Length
                  </label>
                  <select
                    value={sessionMinutes}
                    onChange={(e) => setSessionMinutes(Number(e.target.value))}
                    className="flex h-10 w-full rounded-xl border border-white/10 bg-navy-950/80 px-3 py-2 text-xs text-slate-100 focus:outline-none"
                  >
                    <option value={30}>30 mins</option>
                    <option value={45}>45 mins (Recommended)</option>
                    <option value={60}>60 mins</option>
                    <option value={90}>90 mins</option>
                  </select>
                </div>
              </div>

              <Textarea
                id="topics"
                label="Topics or Chapters to Cover *"
                rows={4}
                value={topics}
                onChange={(e) => setTopics(e.target.value)}
                placeholder="List topics separated by lines or commas..."
              />

              <Button type="submit" variant="gradient" className="w-full">
                <Sparkles className="h-4 w-4 mr-2" />
                Generate Study Schedule
              </Button>
            </form>
          </div>

          {/* Plan Display Column (7 cols) */}
          <div className="lg:col-span-7 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
            {generatedPlan ? (
              <div className="space-y-5">
                {/* Plan Overview & Risk Badge */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/5">
                  <div>
                    <h3 className="text-base font-bold text-white">{generatedPlan.overview}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {generatedPlan.sessions.length} structured sessions • {deadlineDays} days total
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold border ${
                        generatedPlan.deadlineRisk === "High"
                          ? "bg-rose-500/20 text-rose-300 border-rose-500/30"
                          : generatedPlan.deadlineRisk === "Medium"
                          ? "bg-amber-500/20 text-amber-300 border-amber-500/30"
                          : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                      }`}
                    >
                      {generatedPlan.deadlineRisk} Deadline Risk
                    </span>
                  </div>
                </div>

                {/* Priority Reasoning */}
                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 text-xs text-slate-300 leading-relaxed">
                  <p className="font-semibold text-brand-300 mb-1">Recommended Strategy:</p>
                  <p>{generatedPlan.priorityReasoning}</p>
                </div>

                {/* Day-by-Day Sessions */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Day-by-Day Study Roadmap
                  </h4>

                  {generatedPlan.sessions.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-navy-950/70 border border-white/5 hover:border-brand-500/30 transition-all flex items-start justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-white">{s.title}</span>
                          <span
                            className={`px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                              s.type === "Revision"
                                ? "bg-purple-500/20 text-purple-300"
                                : s.type === "Practice"
                                ? "bg-blue-500/20 text-blue-300"
                                : s.type === "Assessment"
                                ? "bg-rose-500/20 text-rose-300"
                                : "bg-emerald-500/20 text-emerald-300"
                            }`}
                          >
                            {s.type}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400">
                          {s.topics.join(" • ")}
                        </p>
                      </div>

                      <span className="text-[11px] font-semibold text-slate-300 bg-navy-800 px-2 py-1 rounded-lg shrink-0">
                        {s.durationMinutes}m
                      </span>
                    </div>
                  ))}
                </div>

                {/* Break Suggestions */}
                <div className="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 text-xs text-slate-400">
                  <p className="font-semibold text-slate-300 mb-1.5">Break & Retention Tips:</p>
                  <ul className="list-disc pl-4 space-y-1">
                    {generatedPlan.breakSuggestions.map((tip, i) => (
                      <li key={i}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Import to Tasks Action Button */}
                <div className="pt-2">
                  <Button
                    variant="primary"
                    className="w-full text-xs font-semibold py-2.5"
                    onClick={handleSaveSessionsToTasks}
                  >
                    <ListPlus className="h-4 w-4 mr-2" />
                    Approve & Save All {generatedPlan.sessions.length} Sessions to My Tasks
                  </Button>
                </div>
              </div>
            ) : (
              <div className="py-20 text-center text-slate-400">
                <Brain className="h-10 w-10 mx-auto mb-3 text-slate-600" />
                <p className="text-sm font-semibold text-white mb-1">No Study Plan Generated</p>
                <p className="text-xs">Fill in your exam details on the left to generate a roadmap.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: PROJECT SUBTASK BREAKDOWN */}
      {activeTab === "breakdown" && (
        <div className="rounded-2xl bg-navy-900/80 border border-white/10 p-6 backdrop-blur-md shadow-xl max-w-4xl mx-auto">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white mb-1">
              AI Project & Goal Subtask Breakdown
            </h2>
            <p className="text-xs text-slate-400">
              Deconstruct large, daunting goals into actionable milestone subtasks you can check off one by one.
            </p>
          </div>

          {/* Goal Input & Sample Triggers */}
          <div className="mb-6 space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={breakdownGoal}
                onChange={(e) => setBreakdownGoal(e.target.value)}
                placeholder="e.g. Build an AI-based college project and prepare a presentation"
                className="flex-1 h-11 px-4 rounded-xl border border-white/10 bg-navy-950/80 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
              />
              <Button
                variant="gradient"
                className="shrink-0"
                onClick={() => handleGenerateBreakdown()}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Break Down Goal
              </Button>
            </div>

            {/* Quick Suggestions pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-slate-400 text-[11px]">Try sample goals:</span>
              {[
                "Prepare a machine learning project presentation",
                "Study for DBMS end-semester examination",
                "Build a full-stack portfolio website with Next.js",
              ].map((sample, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setBreakdownGoal(sample);
                    handleGenerateBreakdown(sample);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-navy-850 hover:bg-navy-800 border border-white/10 text-[11px] text-slate-300 transition-colors"
                >
                  {sample}
                </button>
              ))}
            </div>
          </div>

          {/* Subtasks List */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-between pb-2 border-b border-white/5">
              <span className="text-xs font-semibold text-slate-300">
                Suggested Subtasks ({subtasks.filter((st) => st.selected).length} selected)
              </span>
              <span className="text-[11px] text-slate-400">
                Select subtasks to save to your task list
              </span>
            </div>

            {subtasks.map((st) => (
              <div
                key={st.id}
                onClick={() => handleToggleSubtask(st.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                  st.selected
                    ? "bg-navy-950/90 border-brand-500/50 shadow-sm"
                    : "bg-navy-950/40 border-white/5 opacity-50"
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className={`h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 ${
                      st.selected
                        ? "bg-brand-500 border-brand-500 text-white"
                        : "border-slate-600 bg-navy-900"
                    }`}
                  >
                    {st.selected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                  </div>

                  <span className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                    {st.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] bg-navy-800 text-slate-300">
                    {st.estimatedMinutes} mins
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      st.priority === "Urgent"
                        ? "bg-rose-500/20 text-rose-300"
                        : st.priority === "High"
                        ? "bg-orange-500/20 text-orange-300"
                        : "bg-amber-500/20 text-amber-300"
                    }`}
                  >
                    {st.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Action button */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
            <Button
              variant="primary"
              size="sm"
              onClick={handleSaveSubtasks}
              className="text-xs"
            >
              <Plus className="h-4 w-4 mr-1.5" />
              Save Selected Subtasks to My Tasks
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

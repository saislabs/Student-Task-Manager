"use client";

import { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Filter,
  Check,
  Edit2,
  Trash2,
  LayoutGrid,
  List,
  Clock,
  Tag,
  AlertTriangle,
  FolderOpen,
  ArrowUpDown,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { TaskModal } from "@/components/dashboard/TaskModal";
import { Task, TaskPriority, TaskStatus } from "@/types";
import { formatDueDate, getDeadlineCountdown, getPriorityColor } from "@/lib/utils";
import confetti from "canvas-confetti";
import { toast } from "sonner";

export default function TasksPage() {
  const { tasks, subjects, toggleTaskComplete, deleteTask, loadSampleData } = useTaskStore();

  // Filters & State
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [priorityFilter, setPriorityFilter] = useState<string>("All");
  const [subjectFilter, setSubjectFilter] = useState<string>("All");
  const [sortBy, setSortBy] = useState<"dueDate" | "priority" | "created">("dueDate");
  const [viewMode, setViewMode] = useState<"list" | "card">("list");

  // Modals
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Filtered & Sorted Tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        // Search
        if (search.trim()) {
          const query = search.toLowerCase();
          const matchTitle = t.title.toLowerCase().includes(query);
          const matchDesc = t.description?.toLowerCase().includes(query);
          const matchTag = t.tags?.some((tag) => tag.toLowerCase().includes(query));
          if (!matchTitle && !matchDesc && !matchTag) return false;
        }

        // Status
        if (statusFilter !== "All" && t.status !== statusFilter) return false;

        // Priority
        if (priorityFilter !== "All" && t.priority !== priorityFilter) return false;

        // Subject
        if (subjectFilter !== "All" && t.subject_id !== subjectFilter) return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "dueDate") {
          if (!a.due_at) return 1;
          if (!b.due_at) return -1;
          return new Date(a.due_at).getTime() - new Date(b.due_at).getTime();
        }
        if (sortBy === "priority") {
          const weights: Record<TaskPriority, number> = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        // Created
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
  }, [tasks, search, statusFilter, priorityFilter, subjectFilter, sortBy]);

  const handleToggle = (t: Task) => {
    toggleTaskComplete(t.id);
    if (t.status !== "Completed") {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#10B981", "#6366F1", "#3B82F6"],
      });
      toast.success(`Marked complete: ${t.title}`);
    } else {
      toast.info(`Reopened: ${t.title}`);
    }
  };

  const handleEdit = (t: Task) => {
    setEditingTask(t);
    setIsModalOpen(true);
  };

  const confirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      toast.success(`Deleted task: ${taskToDelete.title}`);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Task Management</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Track, prioritize, and complete your academic assignments, projects, and lab submissions.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center border border-white/10 rounded-xl p-1 bg-navy-900">
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "list" ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="List View"
            >
              <List className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode("card")}
              className={`p-1.5 rounded-lg text-xs transition-colors ${
                viewMode === "card" ? "bg-brand-500 text-white" : "text-slate-400 hover:text-white"
              }`}
              title="Card View"
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => {
              setEditingTask(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4 mr-1.5" />
            New Task
          </Button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="p-4 rounded-2xl bg-navy-900/80 border border-white/10 backdrop-blur-md shadow-xl flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, description, or tags..."
            className="w-full h-9 pl-9 pr-3 rounded-xl bg-navy-950/80 border border-white/10 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-brand-500"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 rounded-xl bg-navy-950/80 border border-white/10 px-2.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          {/* Priority */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="h-9 rounded-xl bg-navy-950/80 border border-white/10 px-2.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="All">All Priorities</option>
            <option value="Urgent">Urgent</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          {/* Subject */}
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="h-9 rounded-xl bg-navy-950/80 border border-white/10 px-2.5 text-xs text-slate-300 focus:outline-none max-w-[130px] truncate"
          >
            <option value="All">All Subjects</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>

          {/* Sort By */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="h-9 rounded-xl bg-navy-950/80 border border-white/10 px-2.5 text-xs text-slate-300 focus:outline-none"
          >
            <option value="dueDate">Sort: Due Date</option>
            <option value="priority">Sort: Priority</option>
            <option value="created">Sort: Recently Added</option>
          </select>
        </div>
      </div>

      {/* Task Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong className="text-white">{filteredTasks.length}</strong> of{" "}
          <strong className="text-white">{tasks.length}</strong> tasks
        </span>
        {(search || statusFilter !== "All" || priorityFilter !== "All" || subjectFilter !== "All") && (
          <button
            onClick={() => {
              setSearch("");
              setStatusFilter("All");
              setPriorityFilter("All");
              setSubjectFilter("All");
            }}
            className="text-brand-400 hover:underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Tasks View: List or Card */}
      {filteredTasks.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-navy-900/40 border border-white/10">
          <FolderOpen className="h-10 w-10 text-slate-500 mx-auto mb-3" />
          <h3 className="text-base font-semibold text-white mb-1">No tasks found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto mb-4">
            Try adjusting your search filters, or click below to populate realistic student tasks.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={loadSampleData}
            >
              Load Demo Tasks
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setEditingTask(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-1" /> Create Task
            </Button>
          </div>
        </div>
      ) : viewMode === "list" ? (
        /* LIST VIEW */
        <div className="space-y-2.5">
          {filteredTasks.map((t) => {
            const sub = subjects.find((s) => s.id === t.subject_id);
            const isCompleted = t.status === "Completed";
            const priorityStyles = getPriorityColor(t.priority);
            const countdown = getDeadlineCountdown(t.due_at);

            return (
              <div
                key={t.id}
                className="group p-3.5 sm:p-4 rounded-2xl bg-navy-900/80 border border-white/10 hover:border-brand-500/40 transition-all backdrop-blur-md shadow-md flex items-center justify-between gap-3"
              >
                {/* Left check & details */}
                <div className="flex items-start sm:items-center gap-3.5 min-w-0 flex-1">
                  <button
                    onClick={() => handleToggle(t)}
                    className={`h-6 w-6 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 transition-all ${
                      isCompleted
                        ? "bg-brand-500 border-brand-500 text-white shadow-sm shadow-brand-500/30"
                        : "border-slate-600 hover:border-brand-400 bg-navy-950/60"
                    }`}
                    aria-label={isCompleted ? "Mark incomplete" : "Mark complete"}
                  >
                    {isCompleted && <Check className="h-4 w-4 stroke-[3]" />}
                  </button>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span
                        className={`text-sm font-semibold truncate ${
                          isCompleted ? "line-through text-slate-500" : "text-white group-hover:text-brand-300"
                        }`}
                      >
                        {t.title}
                      </span>

                      {/* Subject pill */}
                      {sub && (
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold"
                          style={{
                            backgroundColor: `${sub.color}20`,
                            color: sub.color,
                            border: `1px solid ${sub.color}40`,
                          }}
                        >
                          {sub.name}
                        </span>
                      )}

                      {/* Category pill */}
                      <span className="px-2 py-0.5 rounded-full text-[10px] bg-navy-800 text-slate-400 border border-white/5">
                        {t.category}
                      </span>
                    </div>

                    {t.description && (
                      <p className="text-xs text-slate-400 line-clamp-1 mb-1.5">{t.description}</p>
                    )}

                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-slate-500" />
                        {formatDueDate(t.due_at)}
                      </span>

                      {t.estimated_minutes && (
                        <span>• {t.estimated_minutes} mins</span>
                      )}

                      {t.tags && t.tags.length > 0 && (
                        <div className="flex items-center gap-1">
                          <Tag className="h-3 w-3 text-slate-500" />
                          {t.tags.slice(0, 3).map((tag, idx) => (
                            <span key={idx} className="text-slate-400">
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Badges & Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <div className="hidden sm:flex flex-col items-end gap-1">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                    >
                      {t.priority}
                    </span>
                    {!isCompleted && (
                      <span
                        className={`text-[10px] font-medium ${
                          countdown.isOverdue ? "text-rose-400" : "text-slate-400"
                        }`}
                      >
                        {countdown.label}
                      </span>
                    )}
                  </div>

                  {/* Edit & Delete Action Buttons */}
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleEdit(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
                      title="Edit task"
                    >
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setTaskToDelete(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete task"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* CARD VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.map((t) => {
            const sub = subjects.find((s) => s.id === t.subject_id);
            const isCompleted = t.status === "Completed";
            const priorityStyles = getPriorityColor(t.priority);
            const countdown = getDeadlineCountdown(t.due_at);

            return (
              <div
                key={t.id}
                className="group p-5 rounded-2xl bg-navy-900/80 border border-white/10 hover:border-brand-500/40 transition-all backdrop-blur-md shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                    >
                      {t.priority}
                    </span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleEdit(t)}
                        className="p-1 rounded text-slate-400 hover:text-white"
                        title="Edit"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setTaskToDelete(t)}
                        className="p-1 rounded text-slate-400 hover:text-rose-400"
                        title="Delete"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>

                  <h3
                    className={`text-sm font-semibold mb-1.5 leading-snug ${
                      isCompleted ? "line-through text-slate-500" : "text-white"
                    }`}
                  >
                    {t.title}
                  </h3>

                  {t.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{t.description}</p>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {sub && (
                      <span
                        className="px-2 py-0.5 rounded-full text-[10px] font-medium"
                        style={{
                          backgroundColor: `${sub.color}20`,
                          color: sub.color,
                        }}
                      >
                        {sub.name}
                      </span>
                    )}
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-navy-800 text-slate-400">
                      {t.category}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
                  <div className="text-[11px] text-slate-400">
                    <p>{formatDueDate(t.due_at)}</p>
                    {!isCompleted && (
                      <p
                        className={`font-medium ${
                          countdown.isOverdue ? "text-rose-400" : "text-brand-400"
                        }`}
                      >
                        {countdown.label}
                      </p>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant={isCompleted ? "secondary" : "primary"}
                    className="text-xs h-8"
                    onClick={() => handleToggle(t)}
                  >
                    {isCompleted ? "Reopen" : "Complete"}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Task Edit/Create Modal */}
      <TaskModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        taskToEdit={editingTask}
      />

      {/* Delete Confirmation Modal */}
      {taskToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm">
          <div className="rounded-2xl border border-white/10 bg-navy-900 p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-base font-semibold text-white mb-2">Delete Task?</h3>
            <p className="text-xs text-slate-400 mb-5 leading-relaxed">
              Are you sure you want to delete &quot;<strong className="text-slate-200">{taskToDelete.title}</strong>&quot;? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button size="sm" variant="ghost" onClick={() => setTaskToDelete(null)}>
                Cancel
              </Button>
              <Button size="sm" variant="danger" onClick={confirmDelete}>
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

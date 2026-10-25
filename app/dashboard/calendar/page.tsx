"use client";

import { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  isToday,
  isPast,
  parseISO,
} from "date-fns";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  Check,
  AlertTriangle,
} from "lucide-react";
import { useTaskStore } from "@/lib/store/task-store";
import { Button } from "@/components/ui/button";
import { TaskModal } from "@/components/dashboard/TaskModal";
import { Task } from "@/types";
import { getPriorityColor } from "@/lib/utils";
import { toast } from "sonner";

export default function CalendarPage() {
  const { tasks, subjects, toggleTaskComplete } = useTaskStore();

  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Calendar matrix calculations
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart, { weekStartsOn: 1 }); // Monday start
  const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: startDate, end: endDate });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const goToToday = () => {
    const today = new Date();
    setCurrentMonth(today);
    setSelectedDate(today);
  };

  // Helper to extract YYYY-MM-DD in local time
  const formatLocalYMD = (d: Date) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Tasks for selected date
  const selectedDateYMD = formatLocalYMD(selectedDate);
  const tasksForSelectedDate = tasks.filter((t) => {
    if (!t.due_at) return false;
    try {
      const taskDate = parseISO(t.due_at);
      return formatLocalYMD(taskDate) === selectedDateYMD;
    } catch {
      return false;
    }
  });

  const handleOpenAddTaskForDate = (date: Date) => {
    setSelectedDate(date);
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Study Calendar</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Plan your preparation schedule, review submission due dates, and track daily agendas.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button size="sm" variant="outline" onClick={goToToday} className="text-xs">
            Today
          </Button>

          <div className="flex items-center rounded-xl border border-white/10 bg-navy-900 p-1">
            <button
              onClick={prevMonth}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 text-xs font-bold text-white min-w-[130px] text-center">
              {format(currentMonth, "MMMM yyyy")}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 rounded-lg text-slate-400 hover:text-white transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <Button
            size="sm"
            variant="primary"
            onClick={() => handleOpenAddTaskForDate(selectedDate)}
            className="text-xs"
          >
            <Plus className="h-4 w-4 mr-1" /> Add Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Main Monthly Calendar (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2 pb-2 border-b border-white/5">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
              <span key={d} className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {d}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1.5">
            {calendarDays.map((day, i) => {
              const dayYMD = formatLocalYMD(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isCurrentSelected = isSameDay(day, selectedDate);
              const isCurrentDay = isToday(day);

              // Tasks on this day
              const dayTasks = tasks.filter((t) => {
                if (!t.due_at) return false;
                try {
                  return formatLocalYMD(parseISO(t.due_at)) === dayYMD;
                } catch {
                  return false;
                }
              });

              const hasOverdue = dayTasks.some(
                (t) => t.status !== "Completed" && isPast(parseISO(t.due_at!))
              );

              return (
                <div
                  key={i}
                  onClick={() => setSelectedDate(day)}
                  onDoubleClick={() => handleOpenAddTaskForDate(day)}
                  className={`min-h-[90px] sm:min-h-[105px] p-2 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isCurrentSelected
                      ? "border-brand-500 bg-brand-500/10 shadow-lg shadow-brand-500/10"
                      : isCurrentMonth
                      ? "border-white/5 bg-navy-950/40 hover:border-white/20 hover:bg-white/5"
                      : "border-transparent bg-navy-950/20 opacity-30"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs font-semibold flex items-center justify-center h-6 w-6 rounded-lg ${
                        isCurrentDay
                          ? "bg-brand-500 text-white font-extrabold shadow-md shadow-brand-500/30"
                          : isCurrentSelected
                          ? "text-brand-300 font-bold"
                          : "text-slate-300"
                      }`}
                    >
                      {format(day, "d")}
                    </span>

                    {dayTasks.length > 0 && (
                      <span
                        className={`text-[9px] font-semibold px-1.5 py-0.2 rounded-full ${
                          hasOverdue
                            ? "bg-rose-500/20 text-rose-400"
                            : "bg-brand-500/20 text-brand-300"
                        }`}
                      >
                        {dayTasks.length}
                      </span>
                    )}
                  </div>

                  {/* Task pill preview inside date cell */}
                  <div className="space-y-1 mt-1 overflow-hidden">
                    {dayTasks.slice(0, 2).map((t) => {
                      const isDone = t.status === "Completed";
                      const sub = subjects.find((s) => s.id === t.subject_id);
                      return (
                        <div
                          key={t.id}
                          className={`text-[10px] px-1.5 py-0.5 rounded truncate font-medium flex items-center gap-1 ${
                            isDone
                              ? "bg-emerald-500/15 text-emerald-300 line-through opacity-70"
                              : "bg-navy-800/90 text-slate-200 border border-white/5"
                          }`}
                        >
                          <span
                            className="h-1.5 w-1.5 rounded-full shrink-0"
                            style={{ backgroundColor: sub ? sub.color : "#6366F1" }}
                          />
                          <span className="truncate">{t.title}</span>
                        </div>
                      );
                    })}
                    {dayTasks.length > 2 && (
                      <p className="text-[9px] text-slate-400 pl-1">
                        +{dayTasks.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Agenda Sidebar (4 cols) */}
        <div className="lg:col-span-4 rounded-2xl bg-navy-900/80 border border-white/10 p-5 backdrop-blur-md shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Daily Agenda
              </span>
              <h3 className="text-base font-bold text-white">
                {format(selectedDate, "EEEE, MMMM d")}
              </h3>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleOpenAddTaskForDate(selectedDate)}
              className="text-xs h-8 px-2"
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              Add
            </Button>
          </div>

          {tasksForSelectedDate.length === 0 ? (
            <div className="py-12 text-center">
              <CalendarIcon className="h-8 w-8 text-slate-500 mx-auto mb-2 opacity-50" />
              <p className="text-xs text-slate-400 mb-3">No tasks due on this date.</p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => handleOpenAddTaskForDate(selectedDate)}
                className="text-xs"
              >
                Schedule Task
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {tasksForSelectedDate.map((t) => {
                const sub = subjects.find((s) => s.id === t.subject_id);
                const isCompleted = t.status === "Completed";
                const priorityStyles = getPriorityColor(t.priority);

                return (
                  <div
                    key={t.id}
                    className="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 hover:border-brand-500/30 transition-all flex items-start justify-between gap-3"
                  >
                    <div className="flex items-start gap-2.5 min-w-0 flex-1">
                      <button
                        onClick={() => {
                          toggleTaskComplete(t.id);
                          toast.success(
                            isCompleted ? `Reopened: ${t.title}` : `Completed: ${t.title}`
                          );
                        }}
                        className={`h-5 w-5 rounded-lg border flex items-center justify-center shrink-0 mt-0.5 transition-all ${
                          isCompleted
                            ? "bg-brand-500 border-brand-500 text-white"
                            : "border-slate-600 hover:border-brand-400 bg-navy-900"
                        }`}
                      >
                        {isCompleted && <Check className="h-3.5 w-3.5 stroke-[3]" />}
                      </button>

                      <div className="min-w-0">
                        <p
                          className={`text-xs font-semibold truncate ${
                            isCompleted ? "line-through text-slate-500" : "text-white"
                          }`}
                        >
                          {t.title}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {sub ? sub.name : t.category}
                        </p>
                        {t.description && (
                          <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                            {t.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span
                        className={`px-1.5 py-0.5 rounded text-[9px] font-semibold border ${priorityStyles.bg} ${priorityStyles.text} ${priorityStyles.border}`}
                      >
                        {t.priority}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Task Modal for Creating on Clicked Date */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => {
          setIsTaskModalOpen(false);
          setEditingTask(null);
        }}
        defaultDate={formatLocalYMD(selectedDate)}
        taskToEdit={editingTask}
      />
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, TaskFormValues } from "@/lib/validations/task";
import { useTaskStore } from "@/lib/store/task-store";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Task, TaskPriority, TaskCategory, TaskStatus } from "@/types";
import { toast } from "sonner";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToEdit?: Task | null;
  defaultDate?: string;
}

export function TaskModal({
  isOpen,
  onClose,
  taskToEdit,
  defaultDate,
}: TaskModalProps) {
  const { subjects, addTask, updateTask } = useTaskStore();

  const isEditing = Boolean(taskToEdit);

  // Today's date YYYY-MM-DD
  const todayStr = defaultDate || new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      subject_id: subjects[0]?.id || "",
      category: "Assignment",
      priority: "Medium",
      status: "Pending",
      due_date: todayStr,
      due_time: "18:00",
      estimated_minutes: 60,
      tags: "",
    },
  });

  const selectedPriority = watch("priority");
  const selectedCategory = watch("category");

  useEffect(() => {
    if (taskToEdit) {
      let dueDatePart = todayStr;
      let dueTimePart = "18:00";

      if (taskToEdit.due_at) {
        try {
          const d = new Date(taskToEdit.due_at);
          dueDatePart = d.toISOString().split("T")[0];
          const hours = String(d.getHours()).padStart(2, "0");
          const mins = String(d.getMinutes()).padStart(2, "0");
          dueTimePart = `${hours}:${mins}`;
        } catch {
          // fallback
        }
      }

      reset({
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        subject_id: taskToEdit.subject_id || "",
        category: taskToEdit.category,
        priority: taskToEdit.priority,
        status: taskToEdit.status,
        due_date: dueDatePart,
        due_time: dueTimePart,
        estimated_minutes: taskToEdit.estimated_minutes || 60,
        tags: taskToEdit.tags?.join(", ") || "",
      });
    } else {
      reset({
        title: "",
        description: "",
        subject_id: subjects[0]?.id || "",
        category: "Assignment",
        priority: "Medium",
        status: "Pending",
        due_date: defaultDate || todayStr,
        due_time: "18:00",
        estimated_minutes: 60,
        tags: "",
      });
    }
  }, [taskToEdit, defaultDate, reset, subjects, todayStr]);

  const onSubmit = (values: TaskFormValues) => {
    try {
      const combinedDueAt = `${values.due_date}T${values.due_time || "18:00"}:00.000Z`;
      const tagsArray = values.tags
        ? values.tags
            .split(",")
            .map((t) => t.trim().toLowerCase())
            .filter((t) => t.length > 0)
        : [];

      if (isEditing && taskToEdit) {
        updateTask(taskToEdit.id, {
          title: values.title,
          description: values.description || "",
          subject_id: values.subject_id || null,
          category: values.category as TaskCategory,
          priority: values.priority as TaskPriority,
          status: values.status as TaskStatus,
          due_at: combinedDueAt,
          estimated_minutes: values.estimated_minutes,
          tags: tagsArray,
        });
        toast.success("Task updated successfully!");
      } else {
        addTask({
          title: values.title,
          description: values.description || "",
          subject_id: values.subject_id || null,
          category: values.category as TaskCategory,
          priority: values.priority as TaskPriority,
          status: values.status as TaskStatus,
          due_at: combinedDueAt,
          estimated_minutes: values.estimated_minutes,
          tags: tagsArray,
        });
        toast.success("New task created!");
      }
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Failed to save task");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Edit Task" : "Create New Task"}
      description="Add details to keep your semester assignments and exams organized."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <Input
          id="title"
          label="Task Title *"
          placeholder="e.g. Complete DBMS Assignment 3"
          error={errors.title?.message}
          {...register("title")}
        />

        {/* Subject & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Subject</label>
            <select
              className="flex h-10 w-full rounded-xl border border-white/10 bg-navy-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              {...register("subject_id")}
            >
              <option value="">No Subject (General)</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Category</label>
            <select
              className="flex h-10 w-full rounded-xl border border-white/10 bg-navy-900/80 px-3 py-2 text-xs text-slate-100 focus:outline-none focus:border-brand-500"
              {...register("category")}
            >
              <option value="Assignment">Assignment</option>
              <option value="Exam">Exam</option>
              <option value="Project">Project</option>
              <option value="Reading">Reading</option>
              <option value="Revision">Revision</option>
              <option value="Lab">Lab</option>
              <option value="General">General</option>
            </select>
          </div>
        </div>

        {/* Priority Selector */}
        <div>
          <label className="block text-xs font-medium text-slate-300 mb-1.5">Priority</label>
          <div className="grid grid-cols-4 gap-2">
            {(["Low", "Medium", "High", "Urgent"] as TaskPriority[]).map((p) => {
              const isSelected = selectedPriority === p;
              return (
                <button
                  type="button"
                  key={p}
                  onClick={() => setValue("priority", p)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                    isSelected
                      ? p === "Urgent"
                        ? "bg-rose-500 text-white border-rose-400 shadow-md shadow-rose-500/25"
                        : p === "High"
                        ? "bg-orange-500 text-white border-orange-400 shadow-md shadow-orange-500/25"
                        : p === "Medium"
                        ? "bg-amber-500 text-navy-950 border-amber-400 shadow-md shadow-amber-500/25"
                        : "bg-emerald-500 text-white border-emerald-400 shadow-md shadow-emerald-500/25"
                      : "bg-navy-900/60 text-slate-400 border-white/10 hover:border-white/20"
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Due Date & Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            id="due_date"
            type="date"
            label="Due Date *"
            error={errors.due_date?.message}
            {...register("due_date")}
          />
          <Input
            id="due_time"
            type="time"
            label="Due Time"
            error={errors.due_time?.message}
            {...register("due_time")}
          />
        </div>

        {/* Duration & Tags */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Est. Duration (Minutes)
            </label>
            <Input
              id="estimated_minutes"
              type="number"
              min={5}
              max={1440}
              placeholder="60"
              error={errors.estimated_minutes?.message}
              {...register("estimated_minutes", { valueAsNumber: true })}
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">
              Tags (comma separated)
            </label>
            <Input
              id="tags"
              type="text"
              placeholder="sql, chapter3, finals"
              error={errors.tags?.message}
              {...register("tags")}
            />
          </div>
        </div>

        {/* Description */}
        <Textarea
          id="description"
          label="Notes / Description"
          placeholder="Include assignment instructions, problem numbers, or reference links..."
          rows={3}
          error={errors.description?.message}
          {...register("description")}
        />

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/5">
          <Button type="button" variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
            {isEditing ? "Save Changes" : "Create Task"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

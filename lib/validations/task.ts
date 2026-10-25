import { z } from "zod";

export const taskSchema = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters")
    .max(120, "Title cannot exceed 120 characters"),
  description: z.string().max(1000, "Description cannot exceed 1000 characters").optional().default(""),
  subject_id: z.string().nullable().optional(),
  category: z.enum([
    "Assignment",
    "Exam",
    "Project",
    "Reading",
    "Revision",
    "Lab",
    "General",
  ]),
  priority: z.enum(["Low", "Medium", "High", "Urgent"]),
  status: z.enum(["Pending", "In Progress", "Completed"]),
  due_date: z.string().min(1, "Due date is required"),
  due_time: z.string().optional().default("18:00"),
  estimated_minutes: z
    .number()
    .min(5, "Estimated duration must be at least 5 minutes")
    .max(1440, "Estimated duration cannot exceed 24 hours")
    .optional()
    .default(60),
  tags: z.string().optional().default(""),
});

export type TaskFormValues = z.infer<typeof taskSchema>;

export const aiPlannerSchema = z.object({
  examOrProjectName: z
    .string()
    .min(2, "Subject/Project name must be at least 2 characters")
    .max(100, "Subject name too long"),
  subject: z.string().min(2, "Please provide subject name"),
  deadlineDays: z
    .number()
    .min(1, "Must be at least 1 day away")
    .max(60, "Cannot plan beyond 60 days"),
  studyHoursPerDay: z
    .number()
    .min(0.5, "Minimum 0.5 hours per day")
    .max(14, "Maximum 14 hours per day"),
  topics: z
    .string()
    .min(5, "Please list key topics or chapters to cover")
    .max(1500, "Topics description too long"),
  preferredSessionMinutes: z.number().min(15).max(180).default(45),
});

export type AIPlannerFormValues = z.infer<typeof aiPlannerSchema>;

export const aiBreakdownSchema = z.object({
  goal: z
    .string()
    .min(5, "Goal description must be at least 5 characters")
    .max(300, "Goal is too long"),
  subject_id: z.string().nullable().optional(),
});

export type AIBreakdownFormValues = z.infer<typeof aiBreakdownSchema>;

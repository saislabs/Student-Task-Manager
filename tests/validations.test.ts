import { describe, it, expect } from "vitest";
import { taskSchema, aiPlannerSchema } from "@/lib/validations/task";

describe("Form Validation Schemas", () => {
  it("validates valid task inputs correctly", () => {
    const validTask = {
      title: "Complete Assignment 3",
      description: "Solve problems 1 through 5",
      category: "Assignment",
      priority: "High",
      status: "Pending",
      due_date: "2026-10-28",
      due_time: "18:00",
      estimated_minutes: 90,
      tags: "sql, dbms",
    };

    const parsed = taskSchema.safeParse(validTask);
    expect(parsed.success).toBe(true);
  });

  it("rejects tasks with titles that are too short", () => {
    const invalidTask = {
      title: "A",
      category: "Assignment",
      priority: "High",
      status: "Pending",
      due_date: "2026-10-28",
    };

    const parsed = taskSchema.safeParse(invalidTask);
    expect(parsed.success).toBe(false);
  });

  it("validates AI study planner parameters", () => {
    const validParams = {
      examOrProjectName: "DBMS Exam",
      subject: "Database Management",
      deadlineDays: 5,
      studyHoursPerDay: 3,
      topics: "Relational Algebra, SQL, Normalization",
      preferredSessionMinutes: 45,
    };

    const parsed = aiPlannerSchema.safeParse(validParams);
    expect(parsed.success).toBe(true);
  });
});

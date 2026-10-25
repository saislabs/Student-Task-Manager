import { describe, it, expect } from "vitest";
import { formatDueDate, getDeadlineCountdown, getPriorityColor } from "@/lib/utils";
import { generateSeedTasks, calculateDashboardMetrics, calculateSubjectProgress } from "@/lib/store/demo-store";
import { Task, Subject } from "@/types";

describe("Task Utils & Calculations", () => {
  it("generates 12 realistic seed tasks matching the product screenshot", () => {
    const tasks = generateSeedTasks();
    expect(tasks.length).toBe(12);
    expect(tasks[0].title).toBe("Complete DBMS Assignment");
    expect(tasks[0].priority).toBe("High");
  });

  it("calculates dashboard metrics accurately", () => {
    const seed = generateSeedTasks();
    const metrics = calculateDashboardMetrics(seed);

    expect(metrics.totalTasks).toBe(12);
    expect(metrics.pendingTasks).toBeGreaterThanOrEqual(4);
    expect(metrics.inProgressTasks).toBeGreaterThanOrEqual(3);
    expect(metrics.completedTasks).toBe(3);
    expect(metrics.completionRate).toBe(25);
    expect(metrics.overdueTasks).toBe(2);
  });

  it("calculates subject progress correctly", () => {
    const seed = generateSeedTasks();
    const subjects: Subject[] = [
      { id: "sub-1", user_id: "demo-user-1", name: "Database Management Systems", color: "#3B82F6" },
      { id: "sub-2", user_id: "demo-user-1", name: "Machine Learning", color: "#8B5CF6" },
    ];

    const progress = calculateSubjectProgress(seed, subjects);
    expect(progress.length).toBe(2);
    expect(progress[0].name).toBe("Database Management Systems");
    expect(progress[0].total).toBeGreaterThan(0);
    expect(typeof progress[0].percentage).toBe("number");
  });

  it("calculates deadline countdown correctly", () => {
    const pastDate = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const futureDate = new Date(Date.now() + 48 * 60 * 60 * 1000).toISOString();

    const pastCountdown = getDeadlineCountdown(pastDate);
    expect(pastCountdown.isOverdue).toBe(true);

    const futureCountdown = getDeadlineCountdown(futureDate);
    expect(futureCountdown.isOverdue).toBe(false);
  });

  it("returns correct priority colors and badges", () => {
    const urgent = getPriorityColor("Urgent");
    expect(urgent.text).toBe("text-rose-400");

    const high = getPriorityColor("High");
    expect(high.text).toBe("text-orange-400");

    const low = getPriorityColor("Low");
    expect(low.text).toBe("text-emerald-400");
  });
});

import { describe, it, expect } from "vitest";
import { generateRuleBasedStudyPlan, generateRuleBasedBreakdown } from "@/lib/ai/planner";

describe("Rule-Based Study Planner & Breakdown Engine", () => {
  it("generates a structured multi-day study plan without external API key", () => {
    const plan = generateRuleBasedStudyPlan({
      examOrProjectName: "Operating Systems Final",
      subject: "Operating Systems",
      deadlineDays: 4,
      studyHoursPerDay: 2,
      topics: "Processes, Threads, Virtual Memory, Deadlocks, File Systems",
      preferredSessionMinutes: 45,
    });

    expect(plan.overview).toContain("Operating Systems Final");
    expect(plan.sessions.length).toBeGreaterThan(0);
    expect(plan.sessions[0].durationMinutes).toBe(45);
    expect(plan.breakSuggestions.length).toBeGreaterThan(0);
    expect(["Low", "Medium", "High"]).toContain(plan.deadlineRisk);
  });

  it("identifies high deadline risk when too many topics in short duration", () => {
    const highRiskPlan = generateRuleBasedStudyPlan({
      examOrProjectName: "Machine Learning Final",
      subject: "AI",
      deadlineDays: 1,
      studyHoursPerDay: 1,
      topics: "Topic A, Topic B, Topic C, Topic D, Topic E, Topic F",
      preferredSessionMinutes: 45,
    });

    expect(highRiskPlan.deadlineRisk).toBe("High");
  });

  it("breaks down a machine learning project goal into actionable subtasks", () => {
    const subtasks = generateRuleBasedBreakdown("Build an AI project and prepare presentation");
    expect(subtasks.length).toBeGreaterThanOrEqual(5);
    expect(subtasks.some((st) => st.title.toLowerCase().includes("presentation") || st.title.toLowerCase().includes("problem"))).toBe(true);
    expect(subtasks[0].selected).toBe(true);
  });
});

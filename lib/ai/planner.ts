import { StudyPlanData, StudyPlanSession } from "@/types";

export interface AIPlanRequest {
  examOrProjectName: string;
  subject: string;
  deadlineDays: number;
  studyHoursPerDay: number;
  topics: string;
  preferredSessionMinutes?: number;
}

export interface AIBreakdownRequest {
  goal: string;
  subjectName?: string;
}

export interface GeneratedSubtask {
  id: string;
  title: string;
  estimatedMinutes: number;
  priority: "Low" | "Medium" | "High" | "Urgent";
  category: "Assignment" | "Exam" | "Project" | "Reading" | "Revision" | "Lab" | "General";
  selected: boolean;
}

// 1. Rule-based Deterministic Planner (Clearly labelled Fallback / Demo Mode)
export function generateRuleBasedStudyPlan(req: AIPlanRequest): StudyPlanData {
  const { examOrProjectName, deadlineDays, studyHoursPerDay, topics, preferredSessionMinutes = 45 } = req;

  // Split topics into items
  const topicList = topics
    .split(/[\n,;]+/)
    .map((t) => t.trim())
    .filter((t) => t.length > 0);

  const totalAvailableHours = deadlineDays * studyHoursPerDay;
  const sessions: StudyPlanSession[] = [];

  // Determine deadline risk
  let deadlineRisk: "Low" | "Medium" | "High" = "Low";
  if (deadlineDays <= 2 && topicList.length > 4) {
    deadlineRisk = "High";
  } else if (deadlineDays <= 4 || totalAvailableHours < topicList.length * 1.5) {
    deadlineRisk = "Medium";
  }

  // Generate day-by-day plan
  const sessionDuration = preferredSessionMinutes;
  let currentTopicIdx = 0;

  for (let day = 1; day <= deadlineDays; day++) {
    // If last day and multi-day, focus on final revision & mock testing
    if (day === deadlineDays && deadlineDays > 1) {
      sessions.push({
        day,
        title: `Day ${day}: Comprehensive Revision & Formula Recap`,
        durationMinutes: sessionDuration,
        topics: ["Review cheat sheets", "High-yield summary notes", "Formulas & key definitions"],
        type: "Revision",
      });
      if (studyHoursPerDay >= 2) {
        sessions.push({
          day,
          title: `Day ${day}: Past Exam Questions & Mock Test`,
          durationMinutes: sessionDuration,
          topics: ["Timed problem solving", "Identify weak spots"],
          type: "Assessment",
        });
      }
      continue;
    }

    // Regular study days
    const topicsForToday: string[] = [];
    const countToPick = Math.max(1, Math.min(3, Math.ceil(topicList.length / deadlineDays)));

    for (let i = 0; i < countToPick; i++) {
      if (currentTopicIdx < topicList.length) {
        topicsForToday.push(topicList[currentTopicIdx]);
        currentTopicIdx++;
      }
    }

    if (topicsForToday.length === 0) {
      topicsForToday.push(`Deep Dive & Practice: ${examOrProjectName}`);
    }

    sessions.push({
      day,
      title: `Day ${day}: Core Concepts & Fundamentals`,
      durationMinutes: sessionDuration,
      topics: topicsForToday,
      type: "Study",
    });

    if (studyHoursPerDay >= 2) {
      sessions.push({
        day,
        title: `Day ${day}: Hands-on Problem Practice & Code`,
        durationMinutes: sessionDuration,
        topics: topicsForToday.map((t) => `Practice exercises: ${t}`),
        type: "Practice",
      });
    }
  }

  const breakSuggestions = [
    "Follow 45-min study followed by a strict 10-min screen-free break.",
    "Stay hydrated — keep a water bottle near your desk.",
    "Take a brisk 15-minute walk before your evening session.",
    "Sleep at least 7 hours before the exam for optimal memory consolidation.",
  ];

  const priorityReasoning =
    deadlineRisk === "High"
      ? `High Urgency: You have ${deadlineDays} day(s) for ${topicList.length} topics. We have prioritized high-yield core concepts and problem solving over passive reading.`
      : `Optimal Pacing: You have ${totalAvailableHours} total study hours scheduled across ${deadlineDays} days with balanced revision phases to maximize retention.`;

  return {
    overview: `Structured ${deadlineDays}-Day Preparation Plan for ${examOrProjectName}`,
    sessions,
    breakSuggestions,
    deadlineRisk,
    priorityReasoning,
  };
}

// 2. Rule-based Subtask Breakdown (Fallback / Demo Mode)
export function generateRuleBasedBreakdown(goal: string): GeneratedSubtask[] {
  const lower = goal.toLowerCase();

  if (lower.includes("ai") || lower.includes("machine learning") || lower.includes("project")) {
    return [
      { id: "st-1", title: "Define problem statement and success metrics", estimatedMinutes: 60, priority: "High", category: "Project", selected: true },
      { id: "st-2", title: "Literature review & explore existing GitHub repositories", estimatedMinutes: 90, priority: "Medium", category: "Reading", selected: true },
      { id: "st-3", title: "Collect and preprocess dataset (cleaning, normalization)", estimatedMinutes: 120, priority: "High", category: "Project", selected: true },
      { id: "st-4", title: "Design model architecture and establish baseline", estimatedMinutes: 90, priority: "High", category: "Project", selected: true },
      { id: "st-5", title: "Train and evaluate model (Accuracy, F1, Loss curves)", estimatedMinutes: 120, priority: "Urgent", category: "Lab", selected: true },
      { id: "st-6", title: "Build interactive demo frontend / UI", estimatedMinutes: 90, priority: "Medium", category: "Project", selected: true },
      { id: "st-7", title: "Prepare final presentation slide deck & report", estimatedMinutes: 75, priority: "High", category: "Assignment", selected: true },
    ];
  }

  if (lower.includes("exam") || lower.includes("study") || lower.includes("test")) {
    return [
      { id: "st-1", title: "Gather syllabus, lecture slides, and past papers", estimatedMinutes: 45, priority: "Medium", category: "Revision", selected: true },
      { id: "st-2", title: "Read and summarize high-weightage chapters", estimatedMinutes: 90, priority: "High", category: "Reading", selected: true },
      { id: "st-3", title: "Create flashcards for formulas and definitions", estimatedMinutes: 60, priority: "Medium", category: "Revision", selected: true },
      { id: "st-4", title: "Solve previous 3 years examination question papers", estimatedMinutes: 120, priority: "Urgent", category: "Exam", selected: true },
      { id: "st-5", title: "Review mistakes and revisit weak concepts", estimatedMinutes: 60, priority: "High", category: "Revision", selected: true },
    ];
  }

  // Generic breakdown
  return [
    { id: "st-1", title: `Research requirements for: ${goal.slice(0, 40)}`, estimatedMinutes: 45, priority: "High", category: "Project", selected: true },
    { id: "st-2", title: "Break down core milestones and outline strategy", estimatedMinutes: 60, priority: "Medium", category: "Project", selected: true },
    { id: "st-3", title: "Execute phase 1 implementation", estimatedMinutes: 90, priority: "High", category: "Assignment", selected: true },
    { id: "st-4", title: "Review progress, test, and refine output", estimatedMinutes: 60, priority: "Medium", category: "General", selected: true },
    { id: "st-5", title: "Final polish, documentation, and submission", estimatedMinutes: 45, priority: "Urgent", category: "Assignment", selected: true },
  ];
}

// 3. Real Server-side LLM Caller (Google Gemini or OpenAI)
export async function generateStudyPlanWithLLM(req: AIPlanRequest): Promise<{ plan: StudyPlanData; provider: "llm" | "rule-based" }> {
  const geminiKey = process.env.GEMINI_API_KEY;
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!geminiKey && !openAiKey) {
    return {
      plan: generateRuleBasedStudyPlan(req),
      provider: "rule-based",
    };
  }

  try {
    const prompt = `You are an expert academic study planner for college and school students.
Create a structured, highly realistic study schedule based on:
- Exam/Project Name: "${req.examOrProjectName}"
- Subject: "${req.subject}"
- Days Available: ${req.deadlineDays}
- Study Hours Per Day: ${req.studyHoursPerDay}
- Topics to Cover: "${req.topics}"
- Preferred Session Length: ${req.preferredSessionMinutes || 45} minutes

Return ONLY valid raw JSON adhering strictly to this schema:
{
  "overview": "Short 1-line summary",
  "deadlineRisk": "Low" | "Medium" | "High",
  "priorityReasoning": "Brief 1-2 sentence explanation of study priorities",
  "sessions": [
    {
      "day": 1,
      "title": "Clear action title",
      "durationMinutes": 45,
      "topics": ["topic 1", "topic 2"],
      "type": "Study" | "Practice" | "Revision" | "Assessment"
    }
  ],
  "breakSuggestions": [
    "Break tip 1",
    "Break tip 2"
  ]
}`;

    if (geminiKey) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType: "application/json",
              temperature: 0.2,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!rawText) throw new Error("No response content from Gemini");

      const parsed: StudyPlanData = JSON.parse(rawText);
      return { plan: parsed, provider: "llm" };
    }

    if (openAiKey) {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify({
          model: process.env.AI_MODEL || "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.statusText}`);
      }

      const data = await response.json();
      const rawText = data.choices?.[0]?.message?.content;
      if (!rawText) throw new Error("No response content from OpenAI");

      const parsed: StudyPlanData = JSON.parse(rawText);
      return { plan: parsed, provider: "llm" };
    }
  } catch (err) {
    console.error("AI Planner external call failed, falling back to rule-based:", err);
  }

  // Graceful fallback to rule-based planner if external API failed or timed out
  return {
    plan: generateRuleBasedStudyPlan(req),
    provider: "rule-based",
  };
}

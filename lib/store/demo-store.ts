import { Task, Subject, Profile, StudyPlan, DashboardMetrics, SubjectProgress, WeeklyProductivityDay } from "@/types";
import { isPast, parseISO, isToday } from "date-fns";

const DEFAULT_PROFILE: Profile = {
  id: "demo-user-1",
  full_name: "Surya",
  avatar_url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  timezone: "Asia/Kolkata",
  study_duration_pref: 45,
  theme: "dark",
  created_at: new Date().toISOString(),
};

const DEFAULT_SUBJECTS: Subject[] = [
  { id: "sub-1", user_id: "demo-user-1", name: "Database Management Systems", color: "#3B82F6" },
  { id: "sub-2", user_id: "demo-user-1", name: "Machine Learning", color: "#8B5CF6" },
  { id: "sub-3", user_id: "demo-user-1", name: "Web Development", color: "#10B981" },
  { id: "sub-4", user_id: "demo-user-1", name: "Mathematics", color: "#F59E0B" },
];

export function generateSeedTasks(): Task[] {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const todayStr = `${year}-${month}-${day}`;

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = `${tomorrow.getFullYear()}-${String(tomorrow.getMonth() + 1).padStart(2, "0")}-${String(tomorrow.getDate()).padStart(2, "0")}`;

  const in2Days = new Date(now);
  in2Days.setDate(now.getDate() + 2);
  const in2DaysStr = `${in2Days.getFullYear()}-${String(in2Days.getMonth() + 1).padStart(2, "0")}-${String(in2Days.getDate()).padStart(2, "0")}`;

  const in8Days = new Date(now);
  in8Days.setDate(now.getDate() + 8);
  const in8DaysStr = `${in8Days.getFullYear()}-${String(in8Days.getMonth() + 1).padStart(2, "0")}-${String(in8Days.getDate()).padStart(2, "0")}`;

  const in16Days = new Date(now);
  in16Days.setDate(now.getDate() + 16);
  const in16DaysStr = `${in16Days.getFullYear()}-${String(in16Days.getMonth() + 1).padStart(2, "0")}-${String(in16Days.getDate()).padStart(2, "0")}`;

  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const yesterdayStr = `${yesterday.getFullYear()}-${String(yesterday.getMonth() + 1).padStart(2, "0")}-${String(yesterday.getDate()).padStart(2, "0")}`;

  const twoDaysAgo = new Date(now);
  twoDaysAgo.setDate(now.getDate() - 2);
  const twoDaysAgoStr = `${twoDaysAgo.getFullYear()}-${String(twoDaysAgo.getMonth() + 1).padStart(2, "0")}-${String(twoDaysAgo.getDate()).padStart(2, "0")}`;

  return [
    {
      id: "task-1",
      user_id: "demo-user-1",
      subject_id: "sub-1",
      title: "Complete DBMS Assignment",
      description: "SQL queries, relational algebra solutions, and schema ER diagram submission.",
      category: "Assignment",
      priority: "High",
      status: "Completed",
      due_at: `${todayStr}T17:00:00.000Z`,
      estimated_minutes: 90,
      tags: ["sql", "assignment", "dbms"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: now.toISOString(),
    },
    {
      id: "task-2",
      user_id: "demo-user-1",
      subject_id: "sub-2",
      title: "Prepare Presentation Slides",
      description: "Draft slide deck for deep learning project milestone 2.",
      category: "Project",
      priority: "Medium",
      status: "Pending",
      due_at: `${todayStr}T19:00:00.000Z`,
      estimated_minutes: 60,
      tags: ["slides", "milestone", "ai"],
      created_at: yesterday.toISOString(),
      updated_at: yesterday.toISOString(),
      completed_at: null,
    },
    {
      id: "task-3",
      user_id: "demo-user-1",
      subject_id: "sub-2",
      title: "Read Research Paper",
      description: "Attention Is All You Need — annotate transformers self-attention mechanism.",
      category: "Reading",
      priority: "Low",
      status: "Pending",
      due_at: `${tomorrowStr}T10:00:00.000Z`,
      estimated_minutes: 45,
      tags: ["paper", "research", "transformers"],
      created_at: yesterday.toISOString(),
      updated_at: yesterday.toISOString(),
      completed_at: null,
    },
    {
      id: "task-4",
      user_id: "demo-user-1",
      subject_id: "sub-3",
      title: "Work on Mini Project",
      description: "Implement responsive dashboard navigation and Supabase connection.",
      category: "Project",
      priority: "High",
      status: "In Progress",
      due_at: `${tomorrowStr}T14:00:00.000Z`,
      estimated_minutes: 120,
      tags: ["react", "tailwind", "workshop"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: null,
    },
    {
      id: "task-5",
      user_id: "demo-user-1",
      subject_id: "sub-4",
      title: "Study for Finals",
      description: "Review linear algebra eigenvalues, eigenvectors, and matrix calculus.",
      category: "Revision",
      priority: "Medium",
      status: "Pending",
      due_at: `${in2DaysStr}T18:00:00.000Z`,
      estimated_minutes: 180,
      tags: ["math", "exam", "finals"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: twoDaysAgo.toISOString(),
      completed_at: null,
    },
    {
      id: "task-6",
      user_id: "demo-user-1",
      subject_id: "sub-2",
      title: "ML Project Report",
      description: "Writeup model evaluation, precision/recall metrics, and confusion matrix.",
      category: "Project",
      priority: "Urgent",
      status: "In Progress",
      due_at: `${in8DaysStr}T23:59:00.000Z`,
      estimated_minutes: 150,
      tags: ["report", "metrics"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: null,
    },
    {
      id: "task-7",
      user_id: "demo-user-1",
      subject_id: "sub-2",
      title: "Final Exam - AI & Data Science",
      description: "Comprehensive end-semester examination in Hall 4B.",
      category: "Exam",
      priority: "Urgent",
      status: "Pending",
      due_at: `${in16DaysStr}T09:30:00.000Z`,
      estimated_minutes: 180,
      tags: ["exam", "semester"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: twoDaysAgo.toISOString(),
      completed_at: null,
    },
    {
      id: "task-8",
      user_id: "demo-user-1",
      subject_id: "sub-1",
      title: "SQL Query Practice",
      description: "Solve 15 LeetCode SQL 50 database questions.",
      category: "Assignment",
      priority: "Medium",
      status: "Completed",
      due_at: `${todayStr}T12:00:00.000Z`,
      estimated_minutes: 45,
      tags: ["sql", "practice"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: now.toISOString(),
    },
    {
      id: "task-9",
      user_id: "demo-user-1",
      subject_id: "sub-1",
      title: "Normalization Exercise (1NF to BCNF)",
      description: "Decompose tables and verify functional dependency preservation.",
      category: "Assignment",
      priority: "Low",
      status: "Completed",
      due_at: `${todayStr}T11:00:00.000Z`,
      estimated_minutes: 60,
      tags: ["normalization", "theory"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: now.toISOString(),
    },
    {
      id: "task-10",
      user_id: "demo-user-1",
      subject_id: "sub-3",
      title: "UI Component System",
      description: "Build reusable card and button components with Tailwind CSS.",
      category: "Project",
      priority: "Medium",
      status: "In Progress",
      due_at: `${in2DaysStr}T16:00:00.000Z`,
      estimated_minutes: 90,
      tags: ["ui", "components"],
      created_at: yesterday.toISOString(),
      updated_at: now.toISOString(),
      completed_at: null,
    },
    {
      id: "task-11",
      user_id: "demo-user-1",
      subject_id: "sub-4",
      title: "Linear Algebra Problem Set 4",
      description: "Submit orthogonal projections and Gram-Schmidt orthogonalization proofs.",
      category: "Assignment",
      priority: "High",
      status: "Pending",
      due_at: `${twoDaysAgoStr}T23:59:00.000Z`,
      estimated_minutes: 120,
      tags: ["math", "homework"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: twoDaysAgo.toISOString(),
      completed_at: null,
    },
    {
      id: "task-12",
      user_id: "demo-user-1",
      subject_id: "sub-1",
      title: "OS Deadlock Lab Submission",
      description: "Resource allocation graph deadlock detection program in C++.",
      category: "Lab",
      priority: "Urgent",
      status: "In Progress",
      due_at: `${yesterdayStr}T17:00:00.000Z`,
      estimated_minutes: 120,
      tags: ["lab", "code"],
      created_at: twoDaysAgo.toISOString(),
      updated_at: now.toISOString(),
      completed_at: null,
    },
  ];
}

// Storage helpers with SSR guards
const STORAGE_KEYS = {
  TASKS: "studyflow_tasks_v1",
  SUBJECTS: "studyflow_subjects_v1",
  PROFILE: "studyflow_profile_v1",
  PLANS: "studyflow_plans_v1",
  DEMO_MODE: "studyflow_demo_mode",
};

export function getStoredTasks(): Task[] {
  if (typeof window === "undefined") return generateSeedTasks();
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TASKS);
    if (!raw) {
      const seeded = generateSeedTasks();
      localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(seeded));
      return seeded;
    }
    return JSON.parse(raw);
  } catch {
    return generateSeedTasks();
  }
}

export function saveStoredTasks(tasks: Task[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  } catch (e) {
    console.error("Failed to save tasks", e);
  }
}

export function getStoredSubjects(): Subject[] {
  if (typeof window === "undefined") return DEFAULT_SUBJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SUBJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
      return DEFAULT_SUBJECTS;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_SUBJECTS;
  }
}

export function saveStoredSubjects(subjects: Subject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(subjects));
  } catch (e) {
    console.error("Failed to save subjects", e);
  }
}

export function getStoredProfile(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROFILE);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
      return DEFAULT_PROFILE;
    }
    return JSON.parse(raw);
  } catch {
    return DEFAULT_PROFILE;
  }
}

export function saveStoredProfile(profile: Profile): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
  } catch (e) {
    console.error("Failed to save profile", e);
  }
}

export function resetToDemoData(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(generateSeedTasks()));
  localStorage.setItem(STORAGE_KEYS.SUBJECTS, JSON.stringify(DEFAULT_SUBJECTS));
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(DEFAULT_PROFILE));
}

// Calculate Dashboard Metrics
export function calculateDashboardMetrics(tasks: Task[]): DashboardMetrics {
  const total = tasks.length;
  const pending = tasks.filter((t) => t.status === "Pending").length;
  const inProgress = tasks.filter((t) => t.status === "In Progress").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;

  const overdue = tasks.filter((t) => {
    if (t.status === "Completed" || !t.due_at) return false;
    try {
      return isPast(parseISO(t.due_at));
    } catch {
      return false;
    }
  }).length;

  const completedToday = tasks.filter((t) => {
    if (t.status !== "Completed" || !t.completed_at) return false;
    try {
      return isToday(parseISO(t.completed_at));
    } catch {
      return false;
    }
  }).length;

  const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

  return {
    totalTasks: total,
    pendingTasks: pending,
    inProgressTasks: inProgress,
    completedTasks: completed,
    overdueTasks: overdue,
    completionRate,
    completedToday,
  };
}

// Calculate Subject Progress
export function calculateSubjectProgress(tasks: Task[], subjects: Subject[]): SubjectProgress[] {
  return subjects.map((sub) => {
    const subTasks = tasks.filter((t) => t.subject_id === sub.id);
    const total = subTasks.length;
    const completed = subTasks.filter((t) => t.status === "Completed").length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      id: sub.id,
      name: sub.name,
      color: sub.color,
      total,
      completed,
      percentage,
    };
  });
}

// Weekly productivity chart data
export function calculateWeeklyProductivity(tasks: Task[]): WeeklyProductivityDay[] {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  // Calculate realistic distribution based on actual completed tasks
  const completedCount = tasks.filter((t) => t.status === "Completed").length;
  
  return [
    { day: "Mon", dateStr: "Oct 20", completedCount: Math.min(completedCount, 4), ratePercentage: 100 },
    { day: "Tue", dateStr: "Oct 21", completedCount: Math.min(completedCount, 3), ratePercentage: 75 },
    { day: "Wed", dateStr: "Oct 22", completedCount: Math.min(completedCount, 2), ratePercentage: 50 },
    { day: "Thu", dateStr: "Oct 23", completedCount: Math.min(completedCount, 3), ratePercentage: 75 },
    { day: "Fri", dateStr: "Oct 24", completedCount: Math.min(completedCount, 4), ratePercentage: 90 },
    { day: "Sat", dateStr: "Oct 25", completedCount: Math.min(completedCount, 2), ratePercentage: 50 },
    { day: "Sun", dateStr: "Oct 26", completedCount: Math.min(completedCount, 1), ratePercentage: 25 },
  ];
}

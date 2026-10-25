export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'Pending' | 'In Progress' | 'Completed';
export type TaskCategory =
  | 'Assignment'
  | 'Exam'
  | 'Project'
  | 'Reading'
  | 'Revision'
  | 'Lab'
  | 'General';

export interface Subject {
  id: string;
  user_id: string;
  name: string;
  color: string;
  created_at?: string;
}

export interface Task {
  id: string;
  user_id: string;
  subject_id: string | null;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  due_at: string | null;
  estimated_minutes: number | null;
  tags: string[];
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  subject?: Subject | null;
}

export interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  timezone: string;
  study_duration_pref: number;
  theme: 'dark' | 'light';
  created_at?: string;
  updated_at?: string;
}

export interface StudyPlanSession {
  day: number;
  title: string;
  durationMinutes: number;
  topics: string[];
  type: 'Study' | 'Practice' | 'Revision' | 'Assessment';
  suggestedDate?: string;
}

export interface StudyPlanData {
  overview: string;
  sessions: StudyPlanSession[];
  breakSuggestions: string[];
  deadlineRisk: 'Low' | 'Medium' | 'High';
  priorityReasoning: string;
}

export interface StudyPlan {
  id: string;
  user_id: string;
  title: string;
  subject_id: string | null;
  target_deadline: string | null;
  plan_data: StudyPlanData;
  created_at: string;
  updated_at: string;
}

export interface DashboardMetrics {
  totalTasks: number;
  pendingTasks: number;
  inProgressTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number;
  completedToday: number;
}

export interface SubjectProgress {
  id: string;
  name: string;
  color: string;
  total: number;
  completed: number;
  percentage: number;
}

export interface WeeklyProductivityDay {
  day: string;
  dateStr: string;
  completedCount: number;
  ratePercentage: number;
}

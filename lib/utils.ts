import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, isToday, isTomorrow, isYesterday, formatDistanceToNow, parseISO, isPast } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDueDate(dateString: string | null | undefined): string {
  if (!dateString) return "No due date";
  try {
    const date = parseISO(dateString);
    if (isToday(date)) {
      return `Today, ${format(date, "h:mm a")}`;
    }
    if (isTomorrow(date)) {
      return `Tomorrow, ${format(date, "h:mm a")}`;
    }
    if (isYesterday(date)) {
      return `Yesterday, ${format(date, "h:mm a")}`;
    }
    return format(date, "MMM d, yyyy");
  } catch {
    return dateString;
  }
}

export function getDeadlineCountdown(dateString: string | null | undefined): {
  label: string;
  isOverdue: boolean;
  isUrgent: boolean;
} {
  if (!dateString) {
    return { label: "No deadline", isOverdue: false, isUrgent: false };
  }

  try {
    const date = parseISO(dateString);
    const now = new Date();
    const diffMs = date.getTime() - now.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffMs < 0) {
      return {
        label: `${formatDistanceToNow(date)} overdue`,
        isOverdue: true,
        isUrgent: true,
      };
    }

    if (diffHours < 24) {
      const hours = Math.max(1, Math.round(diffHours));
      return {
        label: `${hours}h left`,
        isOverdue: false,
        isUrgent: true,
      };
    }

    const days = Math.round(diffHours / 24);
    return {
      label: `${days} ${days === 1 ? "day" : "days"} left`,
      isOverdue: false,
      isUrgent: days <= 3,
    };
  } catch {
    return { label: "Invalid date", isOverdue: false, isUrgent: false };
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "Urgent":
      return {
        bg: "bg-rose-500/10",
        text: "text-rose-400",
        border: "border-rose-500/30",
        badge: "bg-rose-500 text-white",
      };
    case "High":
      return {
        bg: "bg-orange-500/10",
        text: "text-orange-400",
        border: "border-orange-500/30",
        badge: "bg-orange-500 text-white",
      };
    case "Medium":
      return {
        bg: "bg-amber-500/10",
        text: "text-amber-400",
        border: "border-amber-500/30",
        badge: "bg-amber-500/90 text-navy-950 font-semibold",
      };
    case "Low":
    default:
      return {
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
        border: "border-emerald-500/30",
        badge: "bg-emerald-500/80 text-white",
      };
  }
}

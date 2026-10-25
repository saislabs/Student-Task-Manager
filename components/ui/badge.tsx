import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "purple" | "outline";
}

export function Badge({
  className,
  variant = "default",
  ...props
}: BadgeProps) {
  const variantStyles = {
    default: "bg-brand-500/15 text-brand-300 border-brand-500/30",
    secondary: "bg-navy-800 text-slate-300 border-white/10",
    success: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    danger: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    purple: "bg-purple-500/15 text-purple-300 border-purple-500/30",
    outline: "text-slate-400 border-white/10",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-colors",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

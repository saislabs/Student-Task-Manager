import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "gradient";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const sizeStyles = {
      sm: "h-8 px-3 text-xs gap-1.5",
      md: "h-10 px-4 text-sm gap-2",
      lg: "h-12 px-6 text-base gap-2.5",
      icon: "h-9 w-9 p-0",
    };

    const variantStyles = {
      primary:
        "bg-brand-500 hover:bg-brand-600 text-white shadow-lg shadow-brand-500/25 border border-brand-400/30",
      gradient:
        "bg-gradient-to-r from-brand-purple via-brand-500 to-brand-electric hover:opacity-95 text-white shadow-lg shadow-brand-500/20 border border-white/10",
      secondary:
        "bg-navy-800 hover:bg-navy-750 text-slate-200 border border-white/10",
      outline:
        "border border-white/15 hover:border-brand-500/50 hover:bg-white/5 text-slate-300 hover:text-white",
      ghost:
        "text-slate-400 hover:text-white hover:bg-white/5",
      danger:
        "bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

import React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant =
  | "cyan"
  | "cobalt"
  | "titanium"
  | "emerald"
  | "muted";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  pulse?: boolean;
  icon?: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  cyan: "bg-[#00f0ff]/10 text-[#00f0ff] border-[#00f0ff]/30 shadow-[0_0_15px_-4px_rgba(0,240,255,0.25)]",
  cobalt:
    "bg-[#3b82f6]/10 text-[#60a5fa] border-[#3b82f6]/35 shadow-[0_0_15px_-4px_rgba(59,130,246,0.25)]",
  titanium:
    "bg-[#0d0e15]/90 text-[#f8fafc] border-[#1f2232] backdrop-blur-md",
  emerald:
    "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_-4px_rgba(16,185,129,0.25)]",
  muted: "bg-white/[0.03] text-[#94a3b8] border-white/10 backdrop-blur-md",
};

const dotStyles: Record<BadgeVariant, string> = {
  cyan: "bg-[#00f0ff]",
  cobalt: "bg-[#3b82f6]",
  titanium: "bg-[#f8fafc]",
  emerald: "bg-emerald-400",
  muted: "bg-[#94a3b8]",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      className,
      variant = "cyan",
      pulse = false,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-mono font-medium uppercase tracking-widest transition-colors duration-200",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        {pulse && (
          <span className="relative flex h-2 w-2">
            <span
              className={cn(
                "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
                dotStyles[variant]
              )}
            />
            <span
              className={cn(
                "relative inline-flex rounded-full h-2 w-2",
                dotStyles[variant]
              )}
            />
          </span>
        )}
        {icon && <span className="shrink-0">{icon}</span>}
        <span>{children}</span>
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;

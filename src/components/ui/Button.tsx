"use client";

import React from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-[#00f0ff] text-[#050507] font-semibold border border-[#00f0ff]/80 glow-cyan hover:bg-[#33f3ff] hover:shadow-[0_0_32px_-4px_rgba(0,240,255,0.5)]",
  secondary:
    "bg-[#0d0e15] text-[#f8fafc] font-medium border border-[#1f2232] hover:border-[#00f0ff]/40 hover:bg-[#131521] hover:text-white",
  outline:
    "backdrop-blur-md bg-white/[0.03] text-[#f8fafc] font-medium border border-white/10 hover:border-[#00f0ff]/50 hover:bg-[#00f0ff]/[0.07] hover:text-[#00f0ff]",
  ghost:
    "bg-transparent text-[#94a3b8] font-medium border border-transparent hover:text-[#f8fafc] hover:bg-white/[0.04]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 px-3.5 text-xs rounded-lg gap-1.5",
  md: "h-11 px-5 text-sm rounded-xl gap-2",
  lg: "h-13 px-7 text-base rounded-xl gap-2.5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      fullWidth = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center tracking-tight transition-all duration-200 ease-out select-none cursor-pointer",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00f0ff]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050507]",
          "disabled:opacity-50 disabled:pointer-events-none disabled:hover:scale-100",
          variantClasses[variant],
          sizeClasses[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;

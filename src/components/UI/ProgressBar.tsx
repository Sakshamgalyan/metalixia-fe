"use client";

import React from "react";

export interface ProgressBarProps {
  /** Current progress value (0-100) */
  progress: number;
  /** Height of the progress bar */
  size?: "sm" | "md" | "lg" | "xl";
  /** Color variant */
  variant?: "primary" | "success" | "warning" | "danger" | "info" | "gradient";
  /** Whether to show the percentage label */
  showLabel?: boolean;
  /** Custom label text to show above the bar */
  label?: string;
  /** Whether to show the progress value on the right */
  showValue?: boolean;
  /** Custom class name for the container */
  className?: string;
  /** Custom class name for the bar itself */
  barClassName?: string;
}

const ProgressBar = ({
  progress,
  size = "md",
  variant = "primary",
  showLabel = false,
  label,
  showValue = false,
  className = "",
  barClassName = "",
}: ProgressBarProps) => {
  // Clamp progress between 0 and 100
  const clampedProgress = Math.min(100, Math.max(0, progress));

  // Size definition
  const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
    xl: "h-6",
  };

  // Variant definition
  const variantClasses = {
    primary: "bg-[#707FDD]",
    success: "bg-emerald-500",
    warning: "bg-amber-500",
    danger: "bg-red-500",
    info: "bg-sky-500",
    gradient: "bg-gradient-to-r from-[#707FDD] to-[#5a67c4]",
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || showValue || showLabel) && (
        <div className="flex justify-between mb-1.5 items-center">
          {label && (
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
              {label}
            </span>
          )}
          {(showValue || showLabel) && (
            <span
              className={`text-sm font-medium text-slate-700 dark:text-slate-200 ${!label ? "ml-auto" : ""}`}
            >
              {Math.round(clampedProgress)}%
            </span>
          )}
        </div>
      )}

      <div
        className={`w-full bg-slate-100 rounded-full dark:bg-slate-700 overflow-hidden ${sizeClasses[size]}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-500 ease-out ${variantClasses[variant]} ${barClassName}`}
          style={{ width: `${clampedProgress}%` }}
          role="progressbar"
          aria-valuenow={clampedProgress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
};

export default ProgressBar;

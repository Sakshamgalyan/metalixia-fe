"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export interface CardProps {
  variant?: "default" | "outlined" | "elevated";
  padding?: "none" | "sm" | "md" | "lg" | "xl";
  hoverEffect?: boolean;
  label?: React.ReactNode;
  bgColor?: string;
  border?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const Card = ({
  variant = "default",
  padding = "md",
  hoverEffect = false,
  label,
  bgColor,
  border = true,
  isLoading = false,
  className = "",
  children,
  onClick,
}: CardProps) => {
  // Padding variants
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "px-6 py-4",
    lg: "p-8",
    xl: "p-10",
  };

  // Variant styles
  const variantClasses = {
    default: "bg-white border-slate-200 shadow-sm",
    outlined: "bg-transparent border-slate-300 shadow-none",
    elevated: "bg-white border-slate-200 shadow-xl shadow-slate-200/50",
  };

  // Hover effect
  const hoverClasses = hoverEffect
    ? "hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
    : "";

  // Border classes
  const borderClasses = border ? "border" : "border-0";

  // Background color override
  const backgroundColorClass = bgColor || "";

  // Combined classes
  const baseClasses = `rounded-xl ${paddingClasses[padding]} ${variantClasses[variant]} ${borderClasses} ${hoverClasses} ${className}`;

  // Loading overlay component
  const LoadingOverlay = () => (
    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-xl flex items-center justify-center z-10">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="w-8 h-8 text-slate-700 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading...</p>
      </div>
    </div>
  );

  // If onClick is provided, use motion.div with cursor pointer
  if (onClick) {
    return (
      <motion.div
        onClick={onClick}
        className={`relative ${baseClasses} cursor-pointer`}
        style={bgColor ? { backgroundColor: bgColor } : {}}
        whileHover={hoverEffect ? { scale: 1.02 } : {}}
        whileTap={hoverEffect ? { scale: 0.98 } : {}}
      >
        {isLoading && <LoadingOverlay />}
        <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
          {label && <div className="mb-4">{label}</div>}
          {children}
        </div>
      </motion.div>
    );
  }

  // Static card without onClick
  return (
    <div
      className={`relative ${baseClasses}`}
      style={bgColor ? { backgroundColor: bgColor } : {}}
    >
      {isLoading && <LoadingOverlay />}
      <div className={isLoading ? "opacity-50 pointer-events-none" : ""}>
        {label && <div className="mb-4">{label}</div>}
        {children}
      </div>
    </div>
  );
};

export default Card;

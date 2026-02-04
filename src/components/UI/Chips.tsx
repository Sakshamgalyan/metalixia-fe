"use client";

import { X } from "lucide-react";
import { ReactNode } from "react";

export interface ChipProps {
    label: ReactNode;
    variant?: "filled" | "soft" | "outlined";
    colorScheme?: "primary" | "secondary" | "success" | "warning" | "danger" | "default";
    size?: "sm" | "md";
    icon?: ReactNode;
    onDelete?: () => void;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
    active?: boolean;
}

const Chips = ({
    label,
    variant = "soft",
    colorScheme = "default",
    size = "md",
    icon,
    onDelete,
    onClick,
    className = "",
    disabled = false,
    active = false,
}: ChipProps) => {
    // Size variants
    const sizeClasses = {
        sm: "px-2.5 py-0.5 text-xs gap-1.5",
        md: "px-3 py-1 text-sm gap-2",
    };

    // Icon sizes
    const iconSizes = {
        sm: "w-3 h-3",
        md: "w-4 h-4",
    };

    // Color Scheme Configs (Backgrounds, Text, Borders)
    const colorSchemes = {
        primary: {
            filled: "bg-[#707FDD] text-white hover:bg-[#5a67c4]",
            soft: "bg-[#707FDD]/10 text-[#707FDD] hover:bg-[#707FDD]/20",
            outlined: "border border-[#707FDD] text-[#707FDD] hover:bg-[#707FDD]/5",
        },
        secondary: {
            filled: "bg-slate-800 text-white hover:bg-slate-900",
            soft: "bg-slate-100 text-slate-700 hover:bg-slate-200",
            outlined: "border border-slate-300 text-slate-700 hover:bg-slate-50",
        },
        success: {
            filled: "bg-green-600 text-white hover:bg-green-700",
            soft: "bg-green-100 text-green-700 hover:bg-green-200",
            outlined: "border border-green-600 text-green-600 hover:bg-green-50",
        },
        warning: {
            filled: "bg-amber-500 text-white hover:bg-amber-600",
            soft: "bg-amber-100 text-amber-700 hover:bg-amber-200",
            outlined: "border border-amber-500 text-amber-600 hover:bg-amber-50",
        },
        danger: {
            filled: "bg-red-600 text-white hover:bg-red-700",
            soft: "bg-red-100 text-red-700 hover:bg-red-200",
            outlined: "border border-red-600 text-red-600 hover:bg-red-50",
        },
        default: {
            filled: "bg-slate-500 text-white hover:bg-slate-600",
            soft: "bg-slate-100 text-slate-600 hover:bg-slate-200",
            outlined: "border border-slate-300 text-slate-600 hover:bg-slate-50",
        },
    };

    // Select color styles based on scheme and variant
    const selectedScheme = colorSchemes[colorScheme] || colorSchemes.default;
    const colorClass = selectedScheme[variant];

    // Interaction classes
    const interactiveClass = onClick && !disabled ? "cursor-pointer active:scale-95" : "";
    const disabledClass = disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : "";

    // Active state override (mainly for filter selections)
    const activeClass = active
        ? variant === 'outlined' || variant === 'soft'
            ? "!bg-[#707FDD] !text-white !border-[#707FDD]"
            : ""
        : "";

    return (
        <div
            className={`
                inline-flex items-center justify-center rounded-full font-medium transition-all duration-200
                ${sizeClasses[size]}
                ${colorClass}
                ${interactiveClass}
                ${disabledClass}
                ${activeClass}
                ${className}
            `.trim()}
            onClick={!disabled && onClick ? onClick : undefined}
        >
            {icon && <span className="flex-shrink-0 flex items-center justify-center">{icon}</span>}

            <span className="truncate">{label}</span>

            {onDelete && !disabled && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onDelete();
                    }}
                    className={`
                        rounded-full p-0.5 hover:bg-black/10 transition-colors
                        flex items-center justify-center
                    `}
                    aria-label="Remove"
                >
                    <X className={iconSizes[size]} />
                </button>
            )}
        </div>
    );
};

export default Chips;

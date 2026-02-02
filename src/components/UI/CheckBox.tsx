"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Minus } from "lucide-react";

export interface CheckBoxProps {
    size?: "sm" | "md" | "lg";
    color?: string;
    label?: string | React.ReactNode;
    checked?: boolean;
    variant?: "default" | "bordered" | "filled";
    indeterminate?: boolean;
    isDisabled?: boolean;
    isRequired?: boolean;
    name?: string;
    value?: string;
    onChange?: (checked: boolean, event: React.ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const CheckBox = ({
    size = "md",
    color,
    label,
    checked = false,
    variant = "default",
    indeterminate = false,
    isDisabled = false,
    isRequired = false,
    name,
    value,
    onChange,
    className = "",
}: CheckBoxProps) => {
    // Size variants
    const sizeClasses = {
        sm: {
            box: "w-4 h-4",
            icon: "w-2.5 h-2.5",
            text: "text-sm",
        },
        md: {
            box: "w-5 h-5",
            icon: "w-3 h-3",
            text: "text-base",
        },
        lg: {
            box: "w-6 h-6",
            icon: "w-4 h-4",
            text: "text-lg",
        },
    };

    // Default brand color
    const checkboxColor = color || "#707FDD";

    // Variant styles
    const getVariantClasses = () => {
        const isCheckedOrIndeterminate = checked || indeterminate;

        switch (variant) {
            case "bordered":
                return {
                    box: `border-2 ${isCheckedOrIndeterminate ? "" : "border-slate-300 bg-white"}`,
                    checkedBorder: checkboxColor,
                };
            case "filled":
                return {
                    box: `border-2 ${isCheckedOrIndeterminate ? "" : "border-slate-300 bg-slate-50"}`,
                    checkedBorder: checkboxColor,
                };
            default: // default
                return {
                    box: `border-2 ${isCheckedOrIndeterminate ? "" : "border-slate-300 bg-white"}`,
                    checkedBorder: checkboxColor,
                };
        }
    };

    const variantStyles = getVariantClasses();

    // Handle change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (isDisabled) return;
        onChange?.(!checked, e);
    };

    return (
        <label
            className={`inline-flex items-center gap-2 cursor-pointer group ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
                } ${className}`}
        >
            <div className="relative flex-shrink-0">
                {/* Hidden native checkbox for accessibility */}
                <input
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={handleChange}
                    disabled={isDisabled}
                    required={isRequired}
                    className="sr-only"
                />

                {/* Custom checkbox */}
                <motion.div
                    className={`
                        ${sizeClasses[size].box}
                        ${variantStyles.box}
                        rounded
                        flex items-center justify-center
                        transition-all duration-200
                        ${!isDisabled && !checked && !indeterminate ? "group-hover:border-slate-400" : ""}
                    `}
                    style={
                        checked || indeterminate
                            ? {
                                backgroundColor: checkboxColor,
                                borderColor: variantStyles.checkedBorder,
                            }
                            : {}
                    }
                    whileTap={!isDisabled ? { scale: 0.95 } : {}}
                >
                    <AnimatePresence mode="wait">
                        {indeterminate ? (
                            <motion.div
                                key="indeterminate"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Minus className={`${sizeClasses[size].icon} text-white`} strokeWidth={3} />
                            </motion.div>
                        ) : checked ? (
                            <motion.div
                                key="checked"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <Check className={`${sizeClasses[size].icon} text-white`} strokeWidth={3} />
                            </motion.div>
                        ) : null}
                    </AnimatePresence>
                </motion.div>

                {/* Focus ring */}
                {!isDisabled && (
                    <div
                        className="absolute inset-0 rounded opacity-0 group-focus-within:opacity-100 transition-opacity ring-2 ring-offset-2"
                        style={{ '--tw-ring-color': checkboxColor } as React.CSSProperties}
                    />
                )}
            </div>

            {/* Label */}
            {label && (
                <span
                    className={`
                        ${sizeClasses[size].text}
                        select-none
                        ${!isDisabled ? "text-slate-700 group-hover:text-slate-900" : "text-slate-400"}
                        transition-colors
                    `}
                >
                    {label}
                    {isRequired && <span className="text-red-500 ml-1">*</span>}
                </span>
            )}
        </label>
    );
};

export default CheckBox;

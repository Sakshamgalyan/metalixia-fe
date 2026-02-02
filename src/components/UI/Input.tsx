"use client";

import React, { useState } from "react";
import { AlertCircle } from "lucide-react";

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size' | 'onChange'> {
    label?: string;
    placeholder?: string;
    helperText?: string;
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    variant?: "default" | "outlined" | "filled";
    type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search" | "date" | "time" | "datetime-local";
    isDisabled?: boolean;
    hasError?: boolean;
    leftIcon?: React.ReactNode;
    onLeftIconClick?: () => void;
    rightIcon?: React.ReactNode;
    onRightIconClick?: () => void;
    value?: string | number;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    borderRadius?: "none" | "sm" | "md" | "lg" | "full";
    className?: string;
}

const Input = ({
    label,
    placeholder,
    helperText,
    size = "md",
    fullWidth = false,
    variant = "default",
    type = "text",
    isDisabled = false,
    hasError = false,
    leftIcon,
    onLeftIconClick,
    rightIcon,
    onRightIconClick,
    value,
    onChange,
    borderRadius = "md",
    className = "",
    ...restProps
}: InputProps) => {
    // Valid HTML input types
    const validTypes = ["text", "email", "password", "number", "tel", "url", "search", "date", "time", "datetime-local"];
    const isValidType = validTypes.includes(type);

    // Show error if type is invalid
    const [typeError] = useState(!isValidType ? `Invalid input type: "${type}". Using "text" instead.` : null);
    const finalType = isValidType ? type : "text";
    const displayError = hasError || !!typeError;

    // Size variants
    const sizeClasses = {
        sm: "text-sm py-2 px-3",
        md: "text-base py-3 px-4",
        lg: "text-lg py-4 px-5",
    };

    // Icon sizes based on input size
    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    // Border radius variants
    const radiusClasses = {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-lg",
        lg: "rounded-xl",
        full: "rounded-full",
    };

    // Variant styles
    const variantClasses = {
        default: "bg-white border border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200",
        outlined: "bg-transparent border-2 border-slate-300 focus:border-slate-600 focus:ring-2 focus:ring-slate-200",
        filled: "bg-slate-100 border border-transparent focus:bg-white focus:border-slate-400 focus:ring-2 focus:ring-slate-200",
    };

    // Base input classes
    const inputClasses = `
        w-full
        ${sizeClasses[size]}
        ${radiusClasses[borderRadius]}
        ${variantClasses[variant]}
        placeholder:text-slate-400
        transition-all duration-200
        outline-none
        ${displayError ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""}
        ${isDisabled ? "bg-slate-100 text-slate-500 cursor-not-allowed opacity-60" : ""}
        ${leftIcon ? "pl-10" : ""}
        ${rightIcon ? "pr-10" : ""}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    return (
        <div className={`${fullWidth ? "w-full" : "w-auto"}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-regular text-slate-700 ml-1">
                    {label}
                </label>
            )}

            {/* Input Container */}
            <div className="relative">
                {/* Left Icon */}
                {leftIcon && (
                    <div
                        className={`absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 ${onLeftIconClick ? "cursor-pointer hover:text-slate-700" : ""}`}
                        onClick={onLeftIconClick}
                    >
                        <div className={iconSizes[size]}>
                            {leftIcon}
                        </div>
                    </div>
                )}

                {/* Input Field */}
                <input
                    type={finalType}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    style={{ color: '#707FDD' }}
                    disabled={isDisabled}
                    className={inputClasses}
                    aria-invalid={displayError}
                    aria-describedby={helperText || typeError ? "helper-text" : undefined}
                    {...restProps}
                />

                {/* Right Icon or Error Icon */}
                {(rightIcon || displayError) && (
                    <div
                        className={`absolute right-3 top-1/2 -translate-y-1/2 ${displayError ? "text-red-500" : "text-slate-500"} ${onRightIconClick ? "cursor-pointer hover:text-slate-700" : ""}`}
                        onClick={onRightIconClick}
                    >
                        <div className={iconSizes[size]}>
                            {displayError && !rightIcon ? (
                                <AlertCircle className={iconSizes[size]} />
                            ) : (
                                rightIcon
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Helper Text / Error Message */}
            {(helperText || typeError) && (
                <p
                    id="helper-text"
                    className={`mt-1.5 text-xs ${displayError ? "text-red-600" : "text-slate-600"}`}
                >
                    {typeError || helperText}
                </p>
            )}
        </div>
    );
};

export default Input;

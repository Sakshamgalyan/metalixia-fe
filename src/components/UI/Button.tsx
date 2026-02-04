"use client";

import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "primary" | "secondary" | "outline" | "ghost" | "danger" | "link" | "menu" | "tertiary";
    size?: "sm" | "md" | "lg";
    fullWidth?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    isLoading?: boolean;
    loadingText?: string;
    disabled?: boolean;
    bgColor?: string;
    textColor?: string;
    children: React.ReactNode;
}

const Button = ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    leftIcon,
    rightIcon,
    isLoading = false,
    loadingText,
    disabled = false,
    bgColor,
    textColor,
    children,
    className = "",
    onClick,
    type = "button",
    ...restProps
}: ButtonProps) => {
    // Size variants
    const sizeClasses = {
        sm: "text-sm py-2 px-4 gap-2",
        md: "text-base py-3 px-6 gap-2",
        lg: "text-lg py-4 px-8 gap-3",
    };

    // Link variant has minimal padding
    const linkSizeClasses = {
        sm: "text-sm gap-1",
        md: "text-base gap-2",
        lg: "text-lg gap-2",
    };

    // Menu variant has left alignment and padding
    const menuSizeClasses = {
        sm: "text-sm py-2 px-4 gap-3",
        md: "text-base py-2.5 px-4 gap-3",
        lg: "text-lg py-3 px-4 gap-3",
    };

    // Variant styles
    const variantClasses = {
        primary: "bg-gradient-to-r from-[#707FDD] to-[#5a67c4] hover:from-[#5a67c4] hover:to-[#4a57b4] text-white shadow-md hover:shadow-lg",
        secondary: "bg-slate-100 hover:bg-slate-200 border-2 border-slate-200 hover:border-slate-300",
        outline: "bg-transparent hover:bg-slate-50 border-2 border-slate-300 hover:border-slate-400",
        ghost: "bg-transparent hover:bg-slate-100 text-slate-700",
        danger: "bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-md hover:shadow-lg",
        link: "bg-transparent p-0 hover:underline underline-offset-2",
        menu: "bg-transparent hover:bg-slate-50 text-slate-700 font-normal justify-start",
        tertiary: "bg-transparent hover:bg-slate-50 text-slate-600 font-medium justify-start hover:text-slate-900 border border-transparent",
    };

    // Icon sizes based on button size
    const iconSizes = {
        sm: "w-4 h-4",
        md: "w-5 h-5",
        lg: "w-6 h-6",
    };

    // Disabled state
    const isDisabled = disabled || isLoading;

    // Custom colors override variant styles
    const hasCustomColors = bgColor || textColor;

    // Combined classes
    const baseClasses = `
        inline-flex items-center ${variant === 'menu' || variant === 'tertiary' ? 'justify-start' : 'justify-center'}
        font-semibold
        ${variant === 'link' ? '' : 'rounded-lg'}
        transition-all duration-300
        ${variant === 'link' ? linkSizeClasses[size] : (variant === 'menu' || variant === 'tertiary') ? menuSizeClasses[size] : sizeClasses[size]}
        ${!hasCustomColors ? variantClasses[variant] : ''}
        ${variant === 'secondary' && !hasCustomColors ? '' : ''}
        ${fullWidth ? "w-full" : ""}
        ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        onClick?.(e);
    };

    // Custom inline styles
    const customStyles: React.CSSProperties = {};
    if (bgColor) customStyles.backgroundColor = bgColor;
    if (textColor) {
        customStyles.color = textColor;
    } else if (variant === 'secondary' && !hasCustomColors) {
        customStyles.color = '#707FDD';
    } else if (variant === 'outline' && !hasCustomColors) {
        customStyles.color = '#707FDD';
    } else if (variant === 'link' && !hasCustomColors) {
        customStyles.color = '#707FDD';
    }

    // Omit conflicting props
    const { onDrag, onDragStart, onDragEnd, ...safeProps } = restProps as any;

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={isDisabled}
            className={baseClasses}
            style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
            {...safeProps}
        >
            {/* Loading Spinner */}
            {isLoading && (
                <Loader2 className={`${iconSizes[size]} animate-spin`} />
            )}

            {/* Left Icon */}
            {!isLoading && leftIcon && (
                <span className={`${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
                    {leftIcon}
                </span>
            )}

            {/* Button Text */}
            <span>
                {isLoading && loadingText ? loadingText : children}
            </span>

            {/* Right Icon */}
            {!isLoading && rightIcon && (
                <span className={`${iconSizes[size]} flex-shrink-0 flex items-center justify-center`}>
                    {rightIcon}
                </span>
            )}
        </button>
    );
};

export default Button;

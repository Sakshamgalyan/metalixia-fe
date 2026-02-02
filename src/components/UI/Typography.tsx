"use client";

import React from "react";

export interface TypographyProps {
    variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "label" | "small";
    weight?: "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
    align?: "left" | "center" | "right" | "justify";
    margin?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
    textColor?: string;
    bgColor?: string;
    className?: string;
    children: React.ReactNode;
    as?: React.ElementType;
}

const Typography = ({
    variant = "p",
    weight = "normal",
    align = "left",
    margin = "none",
    textColor,
    bgColor,
    className = "",
    children,
    as,
}: TypographyProps) => {
    // Variant styles - default text sizes and styles
    const variantClasses = {
        h1: "text-4xl md:text-5xl font-bold tracking-tight",
        h2: "text-3xl md:text-4xl font-bold tracking-tight",
        h3: "text-2xl md:text-3xl font-medium tracking-tight",
        h4: "text-xl md:text-2xl font-medium",
        h5: "text-lg md:text-xl font-medium",
        h6: "text-base md:text-lg font-medium",
        p: "text-base leading-relaxed",
        span: "text-base",
        label: "text-sm font-medium",
        small: "text-xs",
    };

    // Font weight classes
    const weightClasses = {
        light: "font-light",
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
        extrabold: "font-extrabold",
    };

    // Text alignment classes
    const alignClasses = {
        left: "text-left",
        center: "text-center",
        right: "text-right",
        justify: "text-justify",
    };

    // Margin classes
    const marginClasses = {
        none: "",
        xs: "mb-1",
        sm: "mb-2",
        md: "mb-4",
        lg: "mb-6",
        xl: "mb-8",
    };

    // Custom colors override variant styles
    const hasCustomTextColor = textColor !== undefined;
    const hasCustomBgColor = bgColor !== undefined;

    // Combined classes
    const baseClasses = `
        ${variantClasses[variant]}
        ${weightClasses[weight]}
        ${alignClasses[align]}
        ${marginClasses[margin]}
        ${className}
    `.trim().replace(/\s+/g, ' ');

    // Remove default color classes if custom color is provided
    const finalClasses = hasCustomTextColor
        ? baseClasses.replace(/text-slate-\d+/g, '').trim()
        : baseClasses;

    // Custom inline styles
    const customStyles: React.CSSProperties = {};

    // Apply custom brand color for headings if no custom textColor is provided
    if (textColor) {
        customStyles.color = textColor;
    } else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(variant)) {
        customStyles.color = '#707FDD';
    }

    if (bgColor) customStyles.backgroundColor = bgColor;

    // Determine which element to render
    const Component = as || variant;

    return (
        <Component
            className={finalClasses}
            style={Object.keys(customStyles).length > 0 ? customStyles : undefined}
        >
            {children}
        </Component>
    );
};

export default Typography;

"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

export interface AccordionProps {
    trigger: React.ReactNode;
    children: React.ReactNode;
    className?: string;
    triggerClassName?: string;
    contentClassName?: string;
    align?: "left" | "right";
    offset?: number;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
    showArrow?: boolean;
}

const Accordion = ({
    trigger,
    children,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    align = "right",
    offset = 8,
    open,
    onOpenChange,
    showArrow = true,
}: AccordionProps) => {
    const [internalOpen, setInternalOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const isControlled = open !== undefined;
    const isOpen = isControlled ? open : internalOpen;

    const handleOpenChange = (newOpen: boolean) => {
        if (!isControlled) {
            setInternalOpen(newOpen);
        }
        onOpenChange?.(newOpen);
    };

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                if (isOpen) {
                    handleOpenChange(false);
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onOpenChange, isControlled]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Trigger */}
            {/* Trigger */}
            <div
                role="button"
                tabIndex={0}
                onClick={() => handleOpenChange(!isOpen)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleOpenChange(!isOpen);
                    }
                }}
                className={`flex items-center gap-2 cursor-pointer ${triggerClassName}`}
            >
                {trigger}
                {showArrow && (
                    <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                            }`}
                    />
                )}
            </div>

            {/* Dropdown Content */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={contentRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className={`absolute z-50 mt-2 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden ${align === "right" ? "right-0" : "left-0"
                            } ${contentClassName}`}
                        style={{ top: `calc(100% + ${offset}px)` }}
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Accordion;
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
}

const Accordion = ({
    trigger,
    children,
    className = "",
    triggerClassName = "",
    contentClassName = "",
    align = "right",
    offset = 8,
}: AccordionProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 ${triggerClassName}`}
            >
                {trigger}
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

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

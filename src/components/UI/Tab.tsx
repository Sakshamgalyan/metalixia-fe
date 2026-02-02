"use client";

import { motion } from "framer-motion";

export interface TabItem {
    id: string;
    label: string;
    icon?: React.ReactNode;
    disabled?: boolean;
}

export interface TabProps {
    variant?: "classic" | "button" | "link";
    size?: "sm" | "md" | "lg";
    activeTab: string;
    items: TabItem[];
    onTabChange: (tabId: string) => void;
    fullWidth?: boolean;
    className?: string;
}

const Tab = ({
    variant = "classic",
    size = "md",
    activeTab,
    items,
    onTabChange,
    fullWidth = false,
    className = "",
}: TabProps) => {
    // Size variants
    const sizeClasses = {
        sm: "text-sm py-2 px-4",
        md: "text-md py-3 px-6",
        lg: "text-lg py-4 px-8",
    };

    // Classic variant - rounded pills with background
    const ClassicTab = () => (
        <div
            className={`flex gap-2 p-2 bg-slate-100 rounded-xl border border-slate-200 ${fullWidth ? "w-full" : "w-fit"
                } ${className}`}
        >
            {items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => !item.disabled && onTabChange(item.id)}
                        disabled={item.disabled}
                        className={`
                            ${fullWidth ? "flex-1" : "flex-shrink-0"}
                            ${sizeClasses[size]}
                            rounded-lg font-semibold transition-all duration-300
                            flex items-center justify-center gap-2
                            ${isActive
                                ? "bg-gradient-to-r from-[#707FDD] to-[#5a67c4] text-white shadow-md"
                                : "text-slate-600 hover:bg-slate-50"
                            }
                            ${item.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }
                        `}
                        style={!isActive ? { transition: 'color 0.3s' } : undefined}
                        onMouseEnter={(e) => {
                            if (!isActive && !item.disabled) {
                                e.currentTarget.style.color = '#707FDD';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (!isActive && !item.disabled) {
                                e.currentTarget.style.color = '';
                            }
                        }}
                    >
                        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );

    // Button variant - individual buttons with spacing
    const ButtonTab = () => (
        <div
            className={`flex gap-3 ${fullWidth ? "w-full" : "w-fit"} ${className}`}
        >
            {items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => !item.disabled && onTabChange(item.id)}
                        disabled={item.disabled}
                        className={`
                            ${fullWidth ? "flex-1" : "flex-shrink-0"}
                            ${sizeClasses[size]}
                            rounded-lg font-semibold transition-all duration-300
                            flex items-center justify-center gap-2
                            border-2
                            ${isActive
                                ? "text-white shadow-lg border-[#707FDD]"
                                : "bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50"
                            }
                            ${item.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }
                        `}
                        style={isActive ? { background: 'linear-gradient(to right, #707FDD, #5a67c4)' } : undefined}
                    >
                        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                        <span>{item.label}</span>
                    </button>
                );
            })}
        </div>
    );

    // Link variant - underlined tabs with minimal styling
    const LinkTab = () => (
        <div
            className={`flex gap-6 border-b border-slate-200 ${fullWidth ? "w-full" : "w-fit"
                } ${className}`}
        >
            {items.map((item) => {
                const isActive = activeTab === item.id;
                return (
                    <button
                        key={item.id}
                        onClick={() => !item.disabled && onTabChange(item.id)}
                        disabled={item.disabled}
                        className={`
                            ${fullWidth ? "flex-1" : "flex-shrink-0"}
                            ${sizeClasses[size]}
                            font-semibold transition-all duration-300
                            relative flex items-center justify-center gap-2
                            pb-2 border-b-2 transition-colors duration-200
                            ${isActive
                                ? ""
                                : "text-slate-500 hover:text-slate-700 border-transparent"
                            }
                            ${item.disabled
                                ? "opacity-50 cursor-not-allowed"
                                : "cursor-pointer"
                            }
                        `}
                        style={isActive ? { color: '#707FDD' } : undefined}
                    >
                        {item.icon && <span className="flex-shrink-0">{item.icon}</span>}
                        <span>{item.label}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute bottom-0 left-0 right-0 h-0.5"
                                style={{ backgroundColor: '#707FDD' }}
                                transition={{
                                    type: "spring",
                                    stiffness: 380,
                                    damping: 30,
                                }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );

    // Render the appropriate variant
    switch (variant) {
        case "classic":
            return <ClassicTab />;
        case "button":
            return <ButtonTab />;
        case "link":
            return <LinkTab />;
        default:
            return <ClassicTab />;
    }
};

export default Tab;

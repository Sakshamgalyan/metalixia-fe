"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Search, Check, Loader2 } from "lucide-react";

export interface DropdownOption {
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ReactNode;
}

export interface DropdownProps {
    options: DropdownOption[];
    value?: string | string[];
    onChange?: (value: string | string[]) => void;
    onOpen?: () => void;
    onClose?: () => void;
    placeholder?: string;
    label?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    size?: "sm" | "md" | "lg";
    disabled?: boolean;
    multiple?: boolean;
    searchable?: boolean;
    searchPlaceholder?: string;
    clearable?: boolean;
    loading?: boolean;
    hasError?: boolean;
    errorMessage?: string;
    helperText?: string;
    className?: string;
    maxTagCount?: number;
    placement?: "bottom" | "top";
    alignment?: "left" | "right";
    showSelectAll?: boolean;
    dropdownWidth?: string | number;
}

const Dropdown = ({
    options = [],
    value,
    onChange,
    onOpen,
    onClose,
    placeholder = "Select an option",
    label,
    leftIcon,
    rightIcon,
    size = "md",
    disabled = false,
    multiple = false,
    searchable = false,
    searchPlaceholder = "Search...",
    clearable = false,
    loading = false,
    hasError = false,
    errorMessage,
    helperText,
    className = "",
    maxTagCount = 3,
    placement = "bottom",
    alignment = "left",
    showSelectAll = false,
    dropdownWidth = "100%",
}: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Size variants
    const sizeClasses = {
        sm: "text-sm py-2 px-3",
        md: "text-base py-3 px-4",
        lg: "text-lg py-4 px-5",
    };

    // Get selected options
    const selectedValues = Array.isArray(value) ? value : value ? [value] : [];
    const selectedOptions = options.filter(opt => selectedValues.includes(opt.value));

    // Filter options based on search
    const filteredOptions = useMemo(() => {
        if (!searchable || !searchQuery) return options;
        return options.filter(opt =>
            opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [options, searchable, searchQuery]);

    const toggleDropdown = () => {
        if (disabled || loading) return;

        if (!isOpen) {
            setIsOpen(true);
            onOpen?.();
            setTimeout(() => searchInputRef.current?.focus(), 100);
        } else {
            setIsOpen(false);
            onClose?.();
            setSearchQuery("");
        }
    };

    // Handle option selection
    const handleOptionClick = (option: DropdownOption) => {
        if (option.disabled) return;

        if (multiple) {
            const newValue = selectedValues.includes(option.value)
                ? selectedValues.filter(v => v !== option.value)
                : [...selectedValues, option.value];
            onChange?.(newValue);
        } else {
            onChange?.(option.value);
            setIsOpen(false);
            onClose?.();
            setSearchQuery("");
        }
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectedValues.length === options.length) {
            onChange?.([]);
        } else {
            onChange?.(options.filter(opt => !opt.disabled).map(opt => opt.value));
        }
    };

    // Handle clear
    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange?.(multiple ? [] : "");
    };

    // Handle remove tag
    const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (multiple) {
            onChange?.(selectedValues.filter(v => v !== optionValue));
        }
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node) &&
                (!menuRef.current || !menuRef.current.contains(event.target as Node))
            ) {
                if (isOpen) {
                    setIsOpen(false);
                    onClose?.();
                    setSearchQuery("");
                }
            }
        };

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            return () => document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [isOpen, onClose]);

    // Render selected value display
    const renderSelectedValue = () => {
        if (loading) {
            return <span className="text-slate-400">Loading...</span>;
        }

        if (selectedOptions.length === 0) {
            return <span className="text-slate-400">{placeholder}</span>;
        }

        if (multiple) {
            const visibleTags = selectedOptions.slice(0, maxTagCount);
            const remainingCount = selectedOptions.length - maxTagCount;

            return (
                <div className="flex items-center gap-1 flex-wrap">
                    {visibleTags.map(option => (
                        <motion.span
                            key={option.value}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium text-white"
                            style={{ backgroundColor: '#707FDD' }}
                        >
                            {option.label}
                            <button
                                type="button"
                                onClick={(e) => handleRemoveTag(option.value, e)}
                                className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                            >
                                <X className="w-3 h-3" />
                            </button>
                        </motion.span>
                    ))}
                    {remainingCount > 0 && (
                        <span className="text-xs text-slate-600 font-medium">
                            +{remainingCount} more
                        </span>
                    )}
                </div>
            );
        }

        return (
            <span className="truncate" style={{ color: '#707FDD' }}>
                {selectedOptions[0].icon && (
                    <span className="mr-2 inline-flex">{selectedOptions[0].icon}</span>
                )}
                {selectedOptions[0].label}
            </span>
        );
    };

    const MenuContent = (
        <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: placement === "bottom" ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: placement === "bottom" ? -10 : 10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border border-slate-300 rounded-lg shadow-xl overflow-hidden flex flex-col absolute"
            style={{
                top: placement === 'bottom' ? '100%' : 'auto',
                bottom: placement === 'top' ? '100%' : 'auto',
                left: alignment === 'right' ? 'auto' : 0,
                right: alignment === 'right' ? 0 : 'auto',
                width: dropdownWidth,
                maxHeight: "300px",
                zIndex: 9999, // Enforce high z-index
                marginTop: placement === 'bottom' ? 4 : 0,
                marginBottom: placement === 'top' ? 4 : 0,
            }}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => e.stopPropagation()}
        >
            {/* Search box */}
            {searchable && (
                <div className="p-2 border-b border-slate-200">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            ref={searchInputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-200 focus:border-slate-400"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}

            {/* Select All */}
            {multiple && showSelectAll && (
                <div className="p-2 border-b border-slate-200">
                    <button
                        type="button"
                        onClick={handleSelectAll}
                        className="w-full px-3 py-2 text-sm text-left hover:bg-slate-50 rounded flex items-center gap-2 transition-colors"
                    >
                        <div className={`w-4 h-4 border-2 rounded flex items-center justify-center ${selectedValues.length === options.length
                            ? 'border-[#707FDD] bg-[#707FDD]'
                            : 'border-slate-300'
                            }`}>
                            {selectedValues.length === options.length && (
                                <Check className="w-3 h-3 text-white" />
                            )}
                        </div>
                        <span className="font-medium">Select All</span>
                    </button>
                </div>
            )}

            {/* Options list */}
            <div className="overflow-y-auto custom-scrollbar flex-1">
                {filteredOptions.length === 0 ? (
                    <div className="px-4 py-8 text-center text-sm text-slate-500">
                        No options found
                    </div>
                ) : (
                    filteredOptions.map((option) => {
                        const isSelected = selectedValues.includes(option.value);
                        return (
                            <button
                                key={option.value}
                                type="button"
                                onClick={() => handleOptionClick(option)}
                                disabled={option.disabled}
                                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 transition-colors ${option.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:bg-slate-50 cursor-pointer"
                                    } ${isSelected ? "bg-slate-50" : ""}`}
                            >
                                {multiple && (
                                    <div className={`w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0 ${isSelected
                                        ? 'border-[#707FDD] bg-[#707FDD]'
                                        : 'border-slate-300'
                                        }`}>
                                        {isSelected && <Check className="w-3 h-3 text-white" />}
                                    </div>
                                )}
                                {option.icon && (
                                    <span className="flex-shrink-0">{option.icon}</span>
                                )}
                                <span
                                    className={`flex-1 truncate ${isSelected ? "font-medium" : ""
                                        }`}
                                    style={isSelected ? { color: '#707FDD' } : {}}
                                >
                                    {option.label}
                                </span>
                                {!multiple && isSelected && (
                                    <Check className="w-4 h-4 flex-shrink-0" style={{ color: '#707FDD' }} />
                                )}
                            </button>
                        );
                    })
                )}
            </div>
        </motion.div>
    );

    return (
        <div className={`w-full ${className} relative`} ref={containerRef}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-regular text-slate-700 ml-1">
                    {label}
                </label>
            )}

            <button
                type="button"
                onClick={toggleDropdown}
                disabled={disabled || loading}
                className={`
                    w-full flex items-center justify-between gap-2
                    ${sizeClasses[size]}
                    bg-white border rounded-lg
                    transition-all duration-200 outline-none
                    ${hasError
                        ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                    }
                    ${disabled || loading ? "opacity-50 cursor-not-allowed bg-slate-50" : "cursor-pointer hover:border-slate-400"}
                `}
            >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                    {leftIcon && <span className="flex-shrink-0 text-slate-400">{leftIcon}</span>}
                    <div className="flex-1 min-w-0 text-left">{renderSelectedValue()}</div>
                </div>

                <div className="flex items-center gap-1 flex-shrink-0">
                    {loading && <Loader2 className="w-4 h-4 text-slate-400 animate-spin" />}
                    {clearable && selectedValues.length > 0 && !loading && !disabled && (
                        <div
                            role="button"
                            onClick={handleClear}
                            className="p-0.5 hover:bg-slate-100 rounded transition-colors"
                        >
                            <X className="w-4 h-4 text-slate-400 hover:text-slate-600" />
                        </div>
                    )}
                    {rightIcon ? (
                        <span className="text-slate-400">{rightIcon}</span>
                    ) : (
                        <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                        />
                    )}
                </div>
            </button>

            {/* Helper text or error message */}
            {(helperText || errorMessage) && (
                <p
                    className={`text-xs mt-1.5 ml-1 ${hasError ? "text-red-600" : "text-slate-500"
                        }`}
                >
                    {hasError ? errorMessage : helperText}
                </p>
            )}

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && !disabled && (
                    MenuContent
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dropdown;

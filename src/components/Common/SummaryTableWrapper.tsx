"use client";

import React from "react";
import { Search, X } from "lucide-react";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import NoDataState from "@/components/Common/NoDataState";
import { PaginationConfig } from "@/types/common";

interface SummaryTableWrapperProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    isLoading?: boolean;
    keyExtractor: (item: T) => string | number;
    paginationConfig?: PaginationConfig;
    
    // Search props
    searchPlaceholder?: string;
    searchValue: string;
    onSearchChange: (value: string) => void;
    
    // Empty state props
    emptyTitle?: string;
    emptyMessage?: string;
    searchQuery?: string;
}

const SummaryTableWrapper = <T,>({
    data,
    columns,
    isLoading = false,
    keyExtractor,
    paginationConfig,
    searchPlaceholder = "Search...",
    searchValue,
    onSearchChange,
    emptyTitle = "No Data Found",
    emptyMessage = "There are no entries available.",
    searchQuery = "",
}: SummaryTableWrapperProps<T>) => {
    const handleClearSearch = () => {
        onSearchChange("");
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Search Section */}
            <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                    <div className="w-full md:w-96 relative">
                        <Input
                            placeholder={searchPlaceholder}
                            leftIcon={<Search size={18} className="text-slate-400" />}
                            rightIcon={searchValue ? (
                                <button 
                                    onClick={handleClearSearch}
                                    className="p-1 hover:bg-slate-100 rounded-full transition-colors"
                                    type="button"
                                >
                                    <X size={14} className="text-slate-400" />
                                </button>
                            ) : undefined}
                            value={searchValue}
                            onChange={(e) => onSearchChange(e.target.value)}
                            fullWidth
                            className="bg-white border-slate-200 focus:border-indigo-500 focus:ring-indices-500/20"
                        />
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-0">
                {!isLoading && data.length === 0 ? (
                    <div className="py-12">
                        <NoDataState
                            title={emptyTitle}
                            message={
                                searchQuery 
                                    ? `No results for "${searchQuery}"` 
                                    : emptyMessage
                            }
                        />
                    </div>
                ) : (
                    <Table
                        data={data}
                        columns={columns}
                        isLoading={isLoading}
                        keyExtractor={keyExtractor}
                        paginationConfig={paginationConfig}
                    />
                )}
            </div>
        </div>
    );
};

export default SummaryTableWrapper;

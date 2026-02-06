"use client";

import { ReactNode } from "react";
import Skeleton from "./Skeleton";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";
import Button from "./Button";
import Typography from "./Typography";

export interface TableColumn<T> {
    header: ReactNode;
    accessor: keyof T | ((row: T) => ReactNode);
    className?: string;
    headerClassName?: string;
    render?: (row: T) => ReactNode;
}

export interface PaginationConfig {
    totalPages: number;
    currentPage: number;
    totalCount: number;
    onPageChange: (page: number) => void;
    itemsPerPage?: number;
}

interface TableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    headerAlign?: "left" | "center" | "right";
    isLoading?: boolean;
    onRowClick?: (row: T) => void;
    keyExtractor: (row: T) => string | number;
    emptyMessage?: string;
    paginationConfig?: PaginationConfig;
}

const Table = <T,>({
    data,
    columns,
    headerAlign = "center",
    isLoading = false,
    onRowClick,
    keyExtractor,
    emptyMessage = "No data available",
    paginationConfig,
}: TableProps<T>) => {
    return (
        <div className="w-full flex flex-col gap-4">
            <div className="w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200">
                                {columns.map((column, index) => (
                                    <th
                                        key={index}
                                        className={`py-3 px-4 ${headerAlign === "center" ? "text-center" : headerAlign === "right" ? "text-right" : "text-left"
                                            } text-xs font-semibold text-slate-500 uppercase tracking-wider ${column.headerClassName || ""
                                            }`}
                                    >
                                        {column.header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                            {isLoading ? (
                                Array.from({ length: 5 }).map((_, rowIndex) => (
                                    <tr key={`skeleton-row-${rowIndex}`}>
                                        {columns.map((_, colIndex) => (
                                            <td key={`skeleton-col-${colIndex}`} className="py-3 px-4">
                                                <Skeleton height="20px" variant="circular" />
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : data.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={columns.length}
                                        className="py-10 text-center text-slate-500"
                                    >
                                        {emptyMessage}
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => (
                                    <tr
                                        key={keyExtractor(row)}
                                        onClick={() => onRowClick?.(row)}
                                        className={`group transition-colors ${onRowClick
                                            ? "cursor-pointer hover:bg-slate-50"
                                            : "hover:bg-slate-50/50"
                                            }`}
                                    >
                                        {columns.map((column, index) => {
                                            const content = column.render
                                                ? column.render(row)
                                                : typeof column.accessor === "function"
                                                    ? column.accessor(row)
                                                    : (row[column.accessor] as ReactNode);

                                            return (
                                                <td
                                                    key={index}
                                                    className={`py-3 px-4 text-sm text-center text-slate-700 whitespace-nowrap ${column.className || ""
                                                        }`}
                                                >
                                                    {content}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {paginationConfig && !isLoading && paginationConfig.totalCount > 0 && (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
                    <Typography variant="small" className="text-slate-500">
                        Showing {Math.min((paginationConfig.currentPage - 1) * (paginationConfig.itemsPerPage || 10) + 1, paginationConfig.totalCount)} to{" "}
                        {Math.min(paginationConfig.currentPage * (paginationConfig.itemsPerPage || 10), paginationConfig.totalCount)} of{" "}
                        {paginationConfig.totalCount} entries
                    </Typography>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={paginationConfig.currentPage === 1}
                            onClick={() => paginationConfig.onPageChange(1)}
                            className="w-8 h-8 p-0"
                        >
                            <ChevronsLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={paginationConfig.currentPage === 1}
                            onClick={() => paginationConfig.onPageChange(paginationConfig.currentPage - 1)}
                            className="w-8 h-8 p-0"
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>

                        <div className="flex items-center gap-1 mx-2">
                            <Typography variant="small" className="font-medium text-slate-700">
                                Page {paginationConfig.currentPage} of {paginationConfig.totalPages}
                            </Typography>
                        </div>

                        <Button
                            variant="outline"
                            size="sm"
                            disabled={paginationConfig.currentPage === paginationConfig.totalPages}
                            onClick={() => paginationConfig.onPageChange(paginationConfig.currentPage + 1)}
                            className="w-8 h-8 p-0"
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={paginationConfig.currentPage === paginationConfig.totalPages}
                            onClick={() => paginationConfig.onPageChange(paginationConfig.totalPages)}
                            className="w-8 h-8 p-0"
                        >
                            <ChevronsRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Table;

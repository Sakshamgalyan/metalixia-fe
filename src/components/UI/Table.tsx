"use client";

import { ReactNode, useState, useRef, useEffect } from "react";
import Skeleton from "./Skeleton";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import Button from "./Button";
import Typography from "./Typography";

export interface TableColumn<T> {
  header: ReactNode;
  accessor: keyof T | ((row: T) => ReactNode);
  className?: string;
  headerClassName?: string;
  render?: (row: T) => ReactNode;
  fixedColumn?: "left" | "right" | "customfix";
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
  const [leftOffsets, setLeftOffsets] = useState<Record<number, number>>({});
  const [rightOffsets, setRightOffsets] = useState<Record<number, number>>({});
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    const table = tableRef.current;
    if (!table) return;

    const updateOffsets = () => {
      const ths = Array.from(
        table.querySelectorAll("thead th")
      ) as HTMLTableCellElement[];

      let currentLeft = 0;
      const newLefts: Record<number, number> = {};
      columns.forEach((col, index) => {
        if (col.fixedColumn === "left") {
          newLefts[index] = currentLeft;
          currentLeft += ths[index]?.getBoundingClientRect().width || 0;
        }
      });

      let currentRight = 0;
      const newRights: Record<number, number> = {};
      for (let i = columns.length - 1; i >= 0; i--) {
        if (columns[i].fixedColumn === "right") {
          newRights[i] = currentRight;
          currentRight += ths[i]?.getBoundingClientRect().width || 0;
        }
      }

      setLeftOffsets((prev) =>
        JSON.stringify(prev) === JSON.stringify(newLefts) ? prev : newLefts
      );
      setRightOffsets((prev) =>
        JSON.stringify(prev) === JSON.stringify(newRights) ? prev : newRights
      );
    };

    const observer = new ResizeObserver(updateOffsets);
    const ths = table.querySelectorAll("thead th");
    ths.forEach((th) => observer.observe(th));

    updateOffsets();

    return () => {
      observer.disconnect();
    };
  }, [columns, data]);

  const leftFixedIndices = columns
    .map((c, i) => (c.fixedColumn === "left" ? i : -1))
    .filter((i) => i !== -1);
  const rightmostLeftFixedIndex =
    leftFixedIndices.length > 0 ? Math.max(...leftFixedIndices) : -1;

  const rightFixedIndices = columns
    .map((c, i) => (c.fixedColumn === "right" ? i : -1))
    .filter((i) => i !== -1);
  const leftmostRightFixedIndex =
    rightFixedIndices.length > 0 ? Math.min(...rightFixedIndices) : -1;

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full overflow-hidden rounded-lg border border-slate-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="w-full" ref={tableRef}>
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                {columns.map((column, index) => {
                  const isRightmostLeft = index === rightmostLeftFixedIndex;
                  const isLeftmostRight = index === leftmostRightFixedIndex;
                  return (
                  <th
                    key={index}
                    style={{
                      left: column.fixedColumn === 'left' && leftOffsets[index] !== undefined ? `${leftOffsets[index]}px` : undefined,
                      right: column.fixedColumn === 'right' && rightOffsets[index] !== undefined ? `${rightOffsets[index]}px` : undefined,
                    }}
                    className={`py-3 px-4 ${
                      headerAlign === "center"
                        ? "text-center"
                        : headerAlign === "right"
                          ? "text-right"
                          : "text-left"
                    } text-xs font-semibold text-slate-500 uppercase tracking-wider ${
                      column.headerClassName || ""
                    } ${
                      column.fixedColumn === "left"
                        ? `sticky z-20 bg-slate-50 ${isRightmostLeft ? "shadow-[1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-right-[15px] after:w-[15px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                        : column.fixedColumn === "right"
                          ? `sticky z-20 bg-slate-50 ${isLeftmostRight ? "shadow-[-1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-left-[15px] after:w-[15px] after:bg-[linear-gradient(-90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                          : column.fixedColumn === "customfix"
                            ? "sticky z-20 bg-slate-50"
                            : ""
                    }`}
                  >
                    {column.header}
                  </th>
                )})}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {isLoading ? (
                Array.from({ length: 5 }).map((_, rowIndex) => (
                  <tr key={`skeleton-row-${rowIndex}`}>
                    {columns.map((column, colIndex) => {
                      const isRightmostLeft = colIndex === rightmostLeftFixedIndex;
                      const isLeftmostRight = colIndex === leftmostRightFixedIndex;
                      return (
                      <td
                        key={`skeleton-col-${colIndex}`}
                        style={{
                          left: column.fixedColumn === 'left' && leftOffsets[colIndex] !== undefined ? `${leftOffsets[colIndex]}px` : undefined,
                          right: column.fixedColumn === 'right' && rightOffsets[colIndex] !== undefined ? `${rightOffsets[colIndex]}px` : undefined,
                        }}
                        className={`py-3 px-4 ${
                          column.fixedColumn === "left"
                            ? `sticky z-10 bg-white ${isRightmostLeft ? "shadow-[1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-right-[15px] after:w-[15px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                            : column.fixedColumn === "right"
                              ? `sticky z-10 bg-white ${isLeftmostRight ? "shadow-[-1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-left-[15px] after:w-[15px] after:bg-[linear-gradient(-90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                              : column.fixedColumn === "customfix"
                                ? "sticky z-10 bg-white"
                                : ""
                        }`}
                      >
                        <Skeleton height="20px" variant="circular" />
                      </td>
                    )})}
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
                    className={`group transition-colors ${
                      onRowClick
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

                      const isRightmostLeft = index === rightmostLeftFixedIndex;
                      const isLeftmostRight = index === leftmostRightFixedIndex;

                      return (
                        <td
                          key={index}
                          style={{
                            left: column.fixedColumn === 'left' && leftOffsets[index] !== undefined ? `${leftOffsets[index]}px` : undefined,
                            right: column.fixedColumn === 'right' && rightOffsets[index] !== undefined ? `${rightOffsets[index]}px` : undefined,
                          }}
                          className={`py-3 px-4 text-sm text-center text-slate-700 whitespace-nowrap ${
                            column.className || ""
                          } ${
                            column.fixedColumn === "left"
                              ? `sticky z-10 bg-white group-hover:bg-slate-50 ${isRightmostLeft ? "shadow-[1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-right-[15px] after:w-[15px] after:bg-[linear-gradient(90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                              : column.fixedColumn === "right"
                                ? `sticky z-10 bg-white group-hover:bg-slate-50 ${isLeftmostRight ? "shadow-[-1px_0_0_0_#e2e8f0] after:content-[''] after:absolute after:inset-y-0 after:-left-[15px] after:w-[15px] after:bg-[linear-gradient(-90deg,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0)_100%)] after:pointer-events-none" : ''}`
                                : column.fixedColumn === "customfix"
                                  ? "sticky z-10 bg-white group-hover:bg-slate-50"
                                  : ""
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
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-2 bg-slate-100">
          <Typography variant="small" className="text-slate-500">
            Showing{" "}
            {Math.min(
              (paginationConfig.currentPage - 1) *
                (paginationConfig.itemsPerPage || 10) +
                1,
              paginationConfig.totalCount,
            )}{" "}
            to{" "}
            {Math.min(
              paginationConfig.currentPage *
                (paginationConfig.itemsPerPage || 10),
              paginationConfig.totalCount,
            )}{" "}
            of {paginationConfig.totalCount} entries
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
              onClick={() =>
                paginationConfig.onPageChange(paginationConfig.currentPage - 1)
              }
              className="w-8 h-8 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <div className="flex items-center gap-1 mx-2">
              <Typography
                variant="small"
                className="font-medium text-slate-700"
              >
                Page {paginationConfig.currentPage} of{" "}
                {paginationConfig.totalPages}
              </Typography>
            </div>

            <Button
              variant="outline"
              size="sm"
              disabled={
                paginationConfig.currentPage === paginationConfig.totalPages
              }
              onClick={() =>
                paginationConfig.onPageChange(paginationConfig.currentPage + 1)
              }
              className="w-8 h-8 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={
                paginationConfig.currentPage === paginationConfig.totalPages
              }
              onClick={() =>
                paginationConfig.onPageChange(paginationConfig.totalPages)
              }
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

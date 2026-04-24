"use client";

import Table, { TableColumn } from "@/components/UI/Table";
import Card from "@/components/UI/Card";
import NoDataState from "@/components/Common/NoDataState";
import { PaginationConfig } from "@/types/common";

interface SummaryTableWrapperProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    isLoading?: boolean;
    keyExtractor: (item: T) => string | number;
    paginationConfig?: PaginationConfig;
    
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
    emptyTitle = "No Data Found",
    emptyMessage = "There are no entries available.",
    searchQuery = "",
}: SummaryTableWrapperProps<T>) => {

    return (
        <Card padding="none" className="bg-white/80 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-md">
            {/* Content Section */}
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
        </Card>
    );
};

export default SummaryTableWrapper;

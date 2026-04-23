"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Search, Plus, Archive, Trash2 } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import {
    useRawMaterialStateContext,
    useRawMaterialDispatchContext,
} from "@/context/Summary/RawMaterial/hooks";
import {
    getRawMaterialsApi,
    deleteRawMaterialApi,
    getRawMaterialStatsApi,
} from "@/context/Summary/RawMaterial/api";
import { useAppSelector } from "@/store/hooks";
import { setPage, setModal } from "@/context/Summary/RawMaterial/actions";
import { RawMaterialItem } from "@/context/Summary/RawMaterial/type";
import AddModal from "./AddModal";
import ExportModal from "./ExportModal";
import DeleteModal from "@/components/Common/DeleteModal";
import { RawStatsCards } from "./RawStatsCards";
import SummaryTableWrapper from "@/components/Common/SummaryTableWrapper";
import { formatDate, formatDateTime } from "@/utils/date";

const RawMaterialCompt = () => {
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; id: string | null; name: string }>({
        isOpen: false,
        id: null,
        name: ""
    });
    const [deleting, setDeleting] = useState(false);
    const { listData, listLoading, statsData, statsLoading, page } = useRawMaterialStateContext();
    const dispatch = useRawMaterialDispatchContext();

    const fetchData = useCallback(async (p = 1, query = "") => {
        await getRawMaterialsApi(dispatch, p, 10, query);
    }, [dispatch]);

    useEffect(() => {
        fetchData(page, searchQuery);
        getRawMaterialStatsApi(dispatch);
    }, [page, searchQuery, fetchData, dispatch]);

    // Search debouncing
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery !== searchInput) {
                setSearchQuery(searchInput);
                if (page !== 1) {
                    dispatch(setPage(1));
                }
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchInput, searchQuery, page, dispatch]);

    const { user } = useAppSelector((state) => state.auth);
    const isSuperAdmin = user?.role === "superAdmin";

    const handleDelete = async () => {
        if (!deleteModal.id) return;
        setDeleting(true);
        try {
            await deleteRawMaterialApi(deleteModal.id);
            setDeleteModal({ isOpen: false, id: null, name: "" });
            fetchData(page, searchQuery);
        } finally {
            setDeleting(false);
        }
    };

    const handleOpenAdd = () => {
        dispatch(setModal({ isOpen: true, type: "add" }));
    };

    const handleOpenExport = () => {
        dispatch(setModal({ isOpen: true, type: "export" }));
    };

    const columns: TableColumn<RawMaterialItem>[] = [
        {
            header: "Material Name",
            accessor: "materialName",
            className: "font-semibold text-slate-800",
        },
        {
            header: "Source",
            accessor: "source",
            className: "text-slate-600",
        },
        {
            header: "Quantity",
            accessor: "quantity",
            render: (row) => (
                <span className="font-medium text-slate-700">
                    {row.quantity} {row.unit}
                </span>
            ),
        },
        ...(isSuperAdmin
            ? [
                {
                    header: "Price",
                    accessor: "price",
                    render: (row) => (
                        <span className="font-medium text-slate-700">
                            ₹{row.price.toLocaleString("en-US")}
                        </span>
                    ),
                } as TableColumn<RawMaterialItem>,
            ]
            : []),
        {
            header: "Inventory Location",
            accessor: "inventoryLocation",
            render: (row) => (
                <span className="font-medium text-slate-700">
                    {row.inventoryLocation}
                </span>
            ),
        },
        {
            header: "Invoice Number",
            accessor: "invoiceNumber",
            render: (row) => (
                <span className="font-medium text-slate-700">
                    {row.invoiceNumber}
                </span>
            ),
        },  
        {
            header: "Received Time",
            accessor: "receivedAt",
            render: (row) => formatDateTime(row.receivedAt),
        },
        {
            header: "Expected On",
            accessor: "expectedOn",
            render: (row) => formatDate(row.expectedOn),
        },
        {
            header: "Received By",
            accessor: "receivedBy",
            render: (row) => (
                <div className="flex flex-col text-left">
                    <span className="font-medium text-slate-900">{row.receivedBy}</span>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {row.receivedById.match(/\((.*?)\)/)?.[1] || row.receivedById}</span>
                </div>
            ),
        },
        ...(isSuperAdmin
            ? [
                {
                    header: "Actions",
                    fixedColumn: "right",
                    render: (row: RawMaterialItem) => (
                        <div className="flex items-center gap-2 justify-center">
                            <Button
                                variant="outline"
                                size="sm"
                                leftIcon={<Trash2 size={16} className="text-red-500" />}
                                onClick={() => setDeleteModal({ isOpen: true, id: row._id, name: row.materialName })}
                                className="p-1 px-2 border-slate-200 hover:bg-red-50 hover:border-red-200 transition-colors"
                            />
                        </div>
                    ),
                } as TableColumn<RawMaterialItem>,
            ]
            : []),
    ];

    const safeData = listData?.data || [];

    return (
        <div className="space-y-6 w-[95%] mx-auto py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Typography variant="h3" className="text-slate-900 font-bold tracking-tight">
                        Raw Material
                    </Typography>
                    <Typography variant="p" className="text-slate-500">
                        Track procurement of raw materials and supplies
                    </Typography>
                </div>
                <div className="flex gap-3">
                    <Button 
                        variant="outline" 
                        size="sm" 
                        leftIcon={<Archive size={16} />}
                        onClick={handleOpenExport}
                        disabled={safeData.length === 0}
                    >
                        Export
                    </Button>
                    <Button 
                        variant="primary" 
                        size="sm" 
                        leftIcon={<Plus size={16} />}
                        onClick={handleOpenAdd}
                    >
                        Add Entry
                    </Button>
                </div>
            </div>

            <RawStatsCards statsData={statsData} statsLoading={statsLoading} isSuperAdmin={isSuperAdmin} />

            <SummaryTableWrapper
                data={safeData}
                columns={columns}
                isLoading={listLoading}
                keyExtractor={(item) => item._id}
                searchValue={searchInput}
                onSearchChange={setSearchInput}
                searchQuery={searchQuery}
                searchPlaceholder="Search by material or source..."
                paginationConfig={{
                    currentPage: page,
                    totalPages: listData?.totalPages || 1,
                    totalCount: listData?.totalCount || 0,
                    onPageChange: (newPage) => dispatch(setPage(newPage)),
                    itemsPerPage: 10,
                }}
                emptyTitle="No Raw Materials Found"
                emptyMessage="There are no raw material entries available. Click 'Add Entry' to create one."
            />

            <AddModal onSuccess={() => fetchData(page, searchQuery)} />
            <ExportModal />

            <DeleteModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, id: null, name: "" })}
                onConfirm={handleDelete}
                itemName={deleteModal.name}
                isLoading={deleting}
            />
        </div>
    );
};

export default RawMaterialCompt;

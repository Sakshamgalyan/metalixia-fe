"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Archive, Eye, Edit, Trash2 } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import { useRawMaterialStateContext, useRawMaterialDispatchContext } from "@/context/Summary/RawMaterial/hooks";
import { getRawMaterialsApi } from "@/context/Summary/RawMaterial/api";
import { setPage } from "@/context/Summary/RawMaterial/actions";
import { RawMaterialItem } from "@/context/Summary/RawMaterial/type";

const RawMaterialCompt = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { listData, listLoading, page } = useRawMaterialStateContext();
    const dispatch = useRawMaterialDispatchContext();

    const fetchData = async (p = 1) => {
        await getRawMaterialsApi(dispatch, p, 10);
    };

    useEffect(() => {
        fetchData(page);
    }, [page, dispatch]);

    // Table Columns
    const columns: TableColumn<RawMaterialItem>[] = [
        {
            header: "Material Name",
            accessor: "materialName",
            className: "font-semibold text-slate-800",
        },
        {
            header: "Received Time",
            accessor: "receivedAt",
            render: (row) => new Date(row.receivedAt).toLocaleString(),
        },
        {
            header: "Received By",
            accessor: "receivedBy",
            render: (row) => (
                <div className="flex flex-col text-left">
                    <span className="font-medium text-slate-900">{row.receivedBy}</span>
                    <span className="text-xs text-slate-500">ID: {row.receivedById}</span>
                </div>
            ),
        },
        {
            header: "Price",
            accessor: "price",
            render: (row) => <span className="font-medium text-slate-700">${row.price.toLocaleString("en-US")}</span>,
        },
        {
            header: "Source",
            accessor: "source",
        },
        {
            header: "Quantity",
            accessor: "quantity",
            render: (row) => <span className="font-medium text-slate-700">{row.quantity} {row.unit}</span>,
        }
    ];

    const safeData = listData?.data || [];
    const filteredData = safeData.filter((item) =>
        item.materialName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 w-[95%] mx-auto py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Typography variant="h3" className="text-slate-900">
                        Raw Material
                    </Typography>
                    <Typography variant="p" className="text-slate-500">
                        Track procurement of raw materials and supplies
                    </Typography>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" size="sm" leftIcon={<Archive size={16} />}>
                        Export
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<Plus size={16} />}>
                        Add Entry
                    </Button>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
                <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
                    <div className="w-full md:w-96">
                        <Input
                            placeholder="Search materials..."
                            leftIcon={<Search size={18} />}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            fullWidth
                        />
                    </div>
                </div>

                <Table
                    data={filteredData}
                    columns={columns}
                    headerAlign="left"
                    keyExtractor={(item) => item._id}
                    paginationConfig={{
                        currentPage: page,
                        totalPages: listData?.totalPages || 1,
                        totalCount: listData?.total || 0,
                        onPageChange: (newPage) => dispatch(setPage(newPage)),
                        itemsPerPage: 10,
                    }}
                    emptyMessage={listLoading ? "Loading entries..." : "No raw material entries found."}
                />
            </div>
        </div>
    );
};

export default RawMaterialCompt;

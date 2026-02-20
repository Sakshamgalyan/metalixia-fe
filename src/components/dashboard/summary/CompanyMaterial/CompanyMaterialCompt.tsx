"use client";

import React, { useState, useEffect } from "react";
import { Search, Plus, Archive, Edit } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import { useAppSelector } from "@/store/hooks";
import { useCompanyMaterialStateContext, useCompanyMaterialDispatchContext } from "@/context/Summary/CompanyMaterial/hooks";
import { getCompanyMaterialsApi } from "@/context/Summary/CompanyMaterial/api";
import { setPage } from "@/context/Summary/CompanyMaterial/actions";
import { CompanyMaterialItem } from "@/context/Summary/CompanyMaterial/type";

const CompanyMaterialCompt = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const { listData, listLoading, page } = useCompanyMaterialStateContext();
    const dispatch = useCompanyMaterialDispatchContext();

    const { user } = useAppSelector((state) => state.auth);
    const canEditReceiver = user?.role === "superAdmin" || user?.role === "reportAdmin";

    const fetchData = async (p = 1) => {
        await getCompanyMaterialsApi(dispatch, p, 10);
    };

    useEffect(() => {
        fetchData(page);
    }, [page, dispatch]);

    const columns: TableColumn<CompanyMaterialItem>[] = [
        {
            header: "Material Name",
            accessor: "materialName",
            className: "font-semibold text-slate-800",
        },
        {
            header: "Company Name",
            accessor: "companyName",
            className: "text-slate-600",
        },
        {
            header: "Quantity",
            accessor: "quantity",
            render: (row) => <span className="font-medium text-slate-700">{row.quantity} {row.unit}</span>,
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
                <div className="flex items-center gap-2">
                    <div className="flex flex-col text-left">
                        <span className="font-medium text-slate-900">{row.receivedBy}</span>
                    </div>
                    {canEditReceiver && (
                        <button className="text-blue-500 hover:text-blue-700" title="Edit Receiver">
                            <Edit size={14} />
                        </button>
                    )}
                </div>
            ),
        },
        {
            header: "Inventory Location",
            accessor: "inventoryLocation",
            className: "text-slate-600",
        }
    ];

    const safeData = listData?.data || [];
    const filteredData = safeData.filter((item) =>
        item.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.companyName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 w-[95%] mx-auto py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <Typography variant="h3" className="text-slate-900">
                        Company Material
                    </Typography>
                    <Typography variant="p" className="text-slate-500">
                        Track materials received from client companies
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
                            placeholder="Search materials or companies..."
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
                    emptyMessage={listLoading ? "Loading entries..." : "No company material entries found."}
                />
            </div>
        </div>
    );
};

export default CompanyMaterialCompt;

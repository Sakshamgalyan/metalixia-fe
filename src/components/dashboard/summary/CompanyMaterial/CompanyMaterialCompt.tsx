"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Search, Plus, Archive, Edit, CheckCircle } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import MaterialModals from "./MaterialModal";
import { useAppSelector } from "@/store/hooks";
import {
  useCompanyMaterialStateContext,
  useCompanyMaterialDispatchContext,
} from "@/context/Summary/CompanyMaterial/hooks";
import {
  getCompanyMaterialsApi,
  getCompanyMaterialStatsApi,
} from "@/context/Summary/CompanyMaterial/api";
import { setPage, setModal } from "@/context/Summary/CompanyMaterial/actions";
import { CompanyMaterialItem } from "@/context/Summary/CompanyMaterial/type";
import { StatsCards } from "./StatsCards";
import { formatDate } from "./Constants";

const CompanyMaterialCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Context
  const { listData, listLoading, page, statsData, statsLoading } =
    useCompanyMaterialStateContext();
  const dispatch = useCompanyMaterialDispatchContext();

  // Auth
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === "superAdmin";

  // ── Fetch Data ────────────────────────────────────────────────
  const fetchData = useCallback(
    async (p = 1) => {
      await getCompanyMaterialsApi(dispatch, p, 10);
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page);
  }, [page, fetchData]);

  useEffect(() => {
    getCompanyMaterialStatsApi(dispatch);
  }, [dispatch]);

  // ── Debounced Search ──────────────────────────────────────────
  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    setSearchQuery(value);
  };

  // ── Modal openers (dispatch to context) ───────────────────────
  const openAddModal = () => {
    dispatch(setModal({ mode: "add", selectedItem: null }));
  };

  const openEditModal = (item: CompanyMaterialItem) => {
    dispatch(setModal({ mode: "edit", selectedItem: item }));
  };

  const openReceiveModal = (item: CompanyMaterialItem) => {
    dispatch(setModal({ mode: "receive", selectedItem: item }));
  };

  // ── Table Columns ─────────────────────────────────────────────
  const columns: TableColumn<CompanyMaterialItem>[] = [
    {
      header: "Company Name",
      accessor: "companyName",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Part Name",
      accessor: "materialName",
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
    {
      header: "Expected On",
      accessor: "expectedOn",
      render: (row) => (
        <span className="text-slate-600">{formatDate(row.expectedOn)}</span>
      ),
    },
    {
      header: "Delivery By",
      accessor: "deliveryBy",
      render: (row) => (
        <span className="text-slate-600">{formatDate(row.deliveryBy)}</span>
      ),
    },
    {
      header: "Received On",
      accessor: "receivedOn",
      render: (row) => (
        <span className="text-slate-600">{formatDate(row.receivedOn)}</span>
      ),
    },
    {
      header: "Inventory Location",
      accessor: "inventoryLocation",
      className: "text-slate-600",
    },
    {
      header: "Received By",
      accessor: "receivedBy",
      fixedColumn: "right",
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.receivedBy ? (
            <span className="font-medium text-slate-900">{row.receivedBy}</span>
          ) : (
            <div className="flex items-center justify-center">
              <Button
                bgColor="#16a34a"
                textColor="#ffffff"
                size="sm"
                onClick={() => openReceiveModal(row)}
              >
                <CheckCircle size={14} />
              </Button>
            </div>
          )}
        </div>
      ),
    },
    ...(isSuperAdmin
      ? [
          {
            header: "Actions",
            fixedColumn: "right",
            render: (row: CompanyMaterialItem) => (
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-indigo-600 bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 transition-colors"
                  onClick={() => openEditModal(row)}
                  title="Edit"
                >
                  <Edit size={13} />
                  <span>Edit</span>
                </button>
              </div>
            ),
          } as TableColumn<CompanyMaterialItem>,
        ]
      : []),
  ];

  // ── Filter Data ───────────────────────────────────────────────
  const safeData = listData?.data || [];
  const filteredData = safeData.filter(
    (item) =>
      item.materialName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.companyName.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  // ── Render ────────────────────────────────────────────────────
  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
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
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={openAddModal}
          >
            Add Entry
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <StatsCards statsData={statsData} statsLoading={statsLoading} />

      {/* Table Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search materials or companies..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              fullWidth
            />
          </div>
        </div>

        <Table
          data={filteredData}
          columns={columns}
          keyExtractor={(item) => item._id}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.total || 0,
            onPageChange: (newPage) => dispatch(setPage(newPage)),
            itemsPerPage: 10,
          }}
          emptyMessage={
            listLoading
              ? "Loading entries..."
              : "No company material entries found."
          }
        />
      </div>

      {/* All Modals (reads state from context) */}
      <MaterialModals />
    </div>
  );
};

export default CompanyMaterialCompt;

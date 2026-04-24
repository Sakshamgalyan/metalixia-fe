"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import {
  Search,
  Plus,
  Archive,
  CheckCircle,
  Trash2,
  Pencil,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import { TableColumn } from "@/components/UI/Table";
import MaterialModals from "./MaterialModal";
import { useAppSelector } from "@/store/hooks";
import {
  useCompanyMaterialStateContext,
  useCompanyMaterialDispatchContext,
} from "@/context/Summary/CompanyMaterial/hooks";
import {
  getCompanyMaterialsApi,
  getCompanyMaterialStatsApi,
  deleteCompanyMaterialApi,
} from "@/context/Summary/CompanyMaterial/api";
import { setPage, setModal } from "@/context/Summary/CompanyMaterial/actions";
import { CompanyMaterialItem } from "@/context/Summary/CompanyMaterial/type";
import { StatsCards } from "./StatsCards";
import { formatDate } from "./Constants";
import DeleteModal from "@/components/Common/DeleteModal";
import SummaryTableWrapper from "@/components/Common/SummaryTableWrapper";
import debounce from "lodash/debounce";

const CompanyMaterialCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CompanyMaterialItem | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  // Context
  const { listData, listLoading, page, statsData, statsLoading } =
    useCompanyMaterialStateContext();
  const dispatch = useCompanyMaterialDispatchContext();

  // Auth
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === "superAdmin";

  // ── Fetch Data ────────────────────────────────────────────────
  const fetchData = useCallback(
    async (p = 1, query = "") => {
      await getCompanyMaterialsApi(dispatch, p, 10, query);
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery);
  }, [page, searchQuery, fetchData]);

  useEffect(() => {
    getCompanyMaterialStatsApi(dispatch);
  }, [dispatch]);

  // ── Debounced Search ──────────────────────────────────────────
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string, currentPage: number) => {
        setSearchQuery(value);
        if (currentPage !== 1) {
          dispatch(setPage(1));
        }
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value, page);
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

  const openDeleteModal = (item: CompanyMaterialItem) => {
    setSelectedItem(item);
    setDeleteModalOpen(true);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;

    try {
      setIsDeleting(true);
      await deleteCompanyMaterialApi(selectedItem._id);

      setDeleteModalOpen(false);
      setSelectedItem(null);

      fetchData(page, searchQuery);
    } finally {
      setIsDeleting(false);
    }
  };

  // ── Table Columns ─────────────────────────────────────────────
  const columns: TableColumn<CompanyMaterialItem>[] = [
    {
      header: "Company Name",
      accessor: "companyName",
      headerClassName: "text-left",
      className: "font-semibold text-slate-800 text-left",
    },
    {
      header: "Part Name",
      accessor: "partName",
      headerClassName: "text-left",
      className: "text-slate-600 text-left",
      render: (row) => (
        <span className="font-medium text-slate-700">
          {row.partNumber} - {row.partName}
        </span>
      ),
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
                leftIcon={<CheckCircle size={14} />}
                onClick={() => openReceiveModal(row)}
              >
                Receive
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
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Pencil size={16} className="text-blue-600" />}
                  onClick={() => openEditModal(row)}
                  title="Edit"
                />
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Trash2 size={16} className="text-red-600" />}
                  onClick={() => openDeleteModal(row)}
                  title="Delete"
                />
              </div>
            ),
          } as TableColumn<CompanyMaterialItem>,
        ]
      : []),
  ];

  // ── Data ───────────────────────────────────────────────
  const safeData = listData?.data || [];

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

        <SummaryTableWrapper
          data={safeData}
          columns={columns}
          isLoading={listLoading}
          keyExtractor={(item) => item._id}
          searchQuery={searchQuery}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.totalCount || 0,
            onPageChange: (newPage) => dispatch(setPage(newPage)),
            itemsPerPage: 10,
          }}
          emptyTitle="No Company Materials Found"
          emptyMessage="There are no company material entries available. Click 'Add Entry' to create one."
        />
      </div>

      {/* All Modals (reads state from context) */}
      <MaterialModals />

      <DeleteModal
        itemName={
          selectedItem
            ? `${selectedItem.partNumber} - ${selectedItem.partName}`
            : ""
        }
        isLoading={isDeleting}
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setSelectedItem(null);
        }}
        onConfirm={handleDelete}
        title="Delete Company Material"
        message="Are you sure you want to delete this company material?"
      />
    </div>
  );
};

export default CompanyMaterialCompt;

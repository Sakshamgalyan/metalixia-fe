"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus, Pencil, Trash2 } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import {
  useCompanyStateContext,
  useCompanyDispatchContext,
} from "@/context/admin/Company/hooks";
import { getCompaniesApi, deleteCompanyApi } from "@/context/admin/Company/api";
import { setPage, setModal } from "@/context/admin/Company/actions";
import { CompanyItem } from "@/context/admin/Company/type";
import CompanyModal from "./CompanyModal";
import SummaryTableWrapper from "@/components/Common/SummaryTableWrapper";
import DeleteModal from "@/components/Common/DeleteModal";

const CompaniesCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const [deleteModalState, setDeleteModalState] = useState<{
    isOpen: boolean;
    id: string | null;
    name?: string;
  }>({ isOpen: false, id: null });
  const [isDeleting, setIsDeleting] = useState(false);

  const { listData, listLoading, page } = useCompanyStateContext();
  const dispatch = useCompanyDispatchContext();

  const fetchData = useCallback(
    async (p = 1, query = "") => {
      await getCompaniesApi(dispatch, p, 10, query);
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery);
  }, [page, searchQuery, fetchData]);

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

  const openAddModal = () => {
    dispatch(setModal({ mode: "add", selectedItem: null }));
  };

  const openEditModal = (item: CompanyItem) => {
    dispatch(setModal({ mode: "edit", selectedItem: item }));
  };

  const promptDelete = (item: CompanyItem) => {
    setDeleteModalState({ isOpen: true, id: item._id, name: item.companyName });
  };

  const confirmDelete = async () => {
    if (!deleteModalState.id) return;
    setIsDeleting(true);
    try {
      await deleteCompanyApi(dispatch, deleteModalState.id);
      fetchData(page, searchQuery);
      setDeleteModalState({ isOpen: false, id: null });
    } catch (error) {
      // Handle error implicitly
    } finally {
      setIsDeleting(false);
    }
  };

  const columns: TableColumn<any>[] = [
    {
      header: "Company Name",
      accessor: "companyName",
      className: "font-semibold text-slate-800",
    },
    {
      header: "Contact Person",
      accessor: "contactPerson",
      className: "text-slate-600",
    },
    {
      header: "Email",
      accessor: "email",
      className: "text-slate-600",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "text-slate-600",
    },
    {
      header: "Address",
      accessor: "address",
      className: "text-slate-600",
    },
    {
      header: "Actions",
      accessor: "actions",
      fixedColumn: "right",
      render: (item: CompanyItem) => (
        <div className="flex gap-2 justify-center">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Pencil size={16} className="text-blue-600" />}
            onClick={() => openEditModal(item)}
            className="p-1.5 min-w-0"
          />
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Trash2 size={16} className="text-red-600" />}
            onClick={() => promptDelete(item)}
            className="p-1.5 min-w-0"
          />
        </div>
      ),
    },
  ];

  const safeData = listData?.data || [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900 font-bold tracking-tight">
            Companies
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Manage your client companies and their details
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Plus size={16} />}
            onClick={openAddModal}
          >
            Add Company
          </Button>
        </div>
      </div>

      <SummaryTableWrapper
        data={safeData}
        columns={columns}
        isLoading={listLoading}
        keyExtractor={(item: CompanyItem) => item._id}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        searchQuery={searchQuery}
        searchPlaceholder="Search companies, emails..."
        paginationConfig={{
          currentPage: page,
          totalPages: listData?.totalPages || 1,
          totalCount: listData?.totalCount || 0,
          onPageChange: (newPage) => dispatch(setPage(newPage)),
          itemsPerPage: 10,
        }}
        emptyTitle="No Companies Found"
        emptyMessage="There are no companies available at the moment. Click 'Add Company' to create one."
      />

      <CompanyModal onSuccess={() => fetchData(page, searchQuery)} />

      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        itemName={deleteModalState.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CompaniesCompt;
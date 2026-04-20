"use client";

import { useState, useEffect, useCallback } from "react";
import { Search, Plus } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Table, { TableColumn } from "@/components/UI/Table";
import {
  useCompanyStateContext,
  useCompanyDispatchContext,
} from "@/context/Admin/Company/hooks";
import { getCompaniesApi } from "@/context/Admin/Company/api";
import { setPage, setModal } from "@/context/Admin/Company/actions";
import { CompanyItem } from "@/context/Admin/Company/type";
import CompanyModal from "./CompanyModal";

const CompaniesCompt = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

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

  const columns: TableColumn<CompanyItem>[] = [
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
  ];

  const safeData = listData?.data || [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900">
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

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search companies, emails..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              fullWidth
            />
          </div>
        </div>

        <Table
          columns={columns}
          data={safeData}
          keyExtractor={(item: CompanyItem) => item._id}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.total || 0,
            onPageChange: (newPage) => dispatch(setPage(newPage)),
            itemsPerPage: 10,
          }}
          emptyMessage={
            listLoading ? "Loading companies..." : "No companies found."
          }
        />
      </div>

      <CompanyModal onSuccess={() => fetchData(page, searchQuery)} />
    </div>
  );
};

export default CompaniesCompt;
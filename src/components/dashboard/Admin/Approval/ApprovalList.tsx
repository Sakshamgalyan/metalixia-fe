"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "@/ApiClient/Admin/admin";
import SummaryTableWrapper from "@/components/Common/SummaryTableWrapper";
import { columns } from "@/components/dashboard/Admin/Approval/Constants";
import { EmployeeListResponse } from "@/ApiClient/Admin/type";

const ApprovalList = () => {
  const [users, setUsers] = useState<EmployeeListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchInput, setSearchInput] = useState("");

  const fetchUsers = async (payload?: any) => {
    setLoading(true);
    try {
      const response = await getAllEmployees(payload);
      setUsers(response || null);
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to fetch approval list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const payload = {
      page: currentPage,
      limit: 10,
      role: ["user"],
      search: searchInput || undefined
    };
    fetchUsers(payload);
  }, [currentPage, searchInput]);

  const handleApprove = async (user: any) => {
    try {
      const { password, confirmPassword, ...userData } = user;
      await updateEmployee({ ...userData, role: "employee" });
      fetchUsers({ page: currentPage, limit: 10, role: ["user"] });
    } catch (error) {
      console.error("Failed to approve user", error);
    }
  };

  const handleDelete = async (user: any) => {
    try {
      await deleteEmployee(user.id);
      fetchUsers({ page: currentPage, limit: 10, role: ["user"] });
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col gap-1 mb-6">
        <Typography variant="h2" className="font-bold tracking-tight">Pending Approvals</Typography>
        <Typography variant="p" className="text-slate-500">
          Approve or reject new user registrations
        </Typography>
      </div>

      <SummaryTableWrapper
        data={users?.data || []}
        columns={columns(handleApprove, handleDelete)}
        isLoading={loading}
        keyExtractor={(item: any) => item.id}
        searchValue={searchInput}
        onSearchChange={setSearchInput}
        searchPlaceholder="Search by name or email..."
        paginationConfig={{
          totalPages: users?.totalPages || 1,
          currentPage: currentPage,
          totalCount: users?.totalCount || 0,
          onPageChange: handlePageChange,
          itemsPerPage: 10,
        }}
        emptyTitle="No Pending Approvals"
        emptyMessage="No pending user approval requests found at the moment."
      />
    </div>
  );
};

export default ApprovalList;

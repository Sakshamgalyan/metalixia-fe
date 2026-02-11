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
import NoDataState from "@/components/Common/NoDataState";
import { columns } from "@/components/dashboard/Admin/Approval/Constants";
import { EmployeeListResponse } from "@/ApiClient/Admin/type";

const ApprovalList = () => {
  const [users, setUsers] = useState<EmployeeListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  console.log(users);
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
    };
    fetchUsers(payload);
  }, [currentPage]);

  const handleApprove = async (user: any) => {
    try {
      const { password, confirmPassword, ...userData } = user;
      await updateEmployee({ ...userData, role: "employee" });
      fetchUsers();
    } catch (error) {
      console.error("Failed to approve user", error);
    }
  };

  const handleDelete = async (user: any) => {
    try {
      await deleteEmployee(user.id);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const payload = {
      page: currentPage,
      limit: 10,
      role: ["user"],
    };
    fetchUsers(payload);
  };

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col gap-1 mb-6">
        <Typography variant="h2">Pending Approvals</Typography>
        <Typography variant="p" className="text-slate-500">
          Approve or reject new user registrations
        </Typography>
      </div>

      {loading ? (
        <Table
          data={[]}
          columns={columns(handleApprove, handleDelete)}
          isLoading
          headerAlign="center"
          keyExtractor={(item: any) => item.id}
        />
      ) : users?.data && users.data.length > 0 ? (
        <Table
          data={users.data}
          columns={columns(handleApprove, handleDelete)}
          headerAlign="center"
          keyExtractor={(item: any) => item.id}
          paginationConfig={{
            totalPages: users.pagination.totalPages,
            currentPage: currentPage,
            totalCount: users.pagination.total,
            onPageChange: handlePageChange,
          }}
        />
      ) : (
        <NoDataState message="No pending approvals found" />
      )}
    </div>
  );
};

export default ApprovalList;

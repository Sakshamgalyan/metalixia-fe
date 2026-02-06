"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Check, Trash2 } from "lucide-react";

import Button from "@/components/UI/Button";
import Table, { TableColumn } from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import {
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
} from "@/ApiClient/Admin/admin";
import NoDataState from "@/components/Common/NoDataState";
import { columns } from "./Constants";

const ApprovalList = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getAllEmployees({ role: ["user"] });
      setUsers(response?.data || []);
    } catch (error) {
      console.error("Failed to fetch users", error);
      toast.error("Failed to fetch approval list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
      ) : users.length > 0 ? (
        <Table
          data={users}
          columns={columns(handleApprove, handleDelete)}
          headerAlign="center"
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <NoDataState message="No pending approvals found" />
      )}
    </div>
  );
};

export default ApprovalList;

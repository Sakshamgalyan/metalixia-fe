import ApiClient from "@/lib/apiClient";
import { EmployeeListPayload, EmployeeListResponse } from "./type";
import { toast } from "sonner";

export const getAllEmployees = async (data?: EmployeeListPayload) => {
  try {
    const response: EmployeeListResponse = await ApiClient.post("/admin/get-employees", data);
    return response;
  } catch (error: any) {
    toast.error("Employee List Fetching Failed", {
      description:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      duration: 4000,
    });
    throw error;
  }
};

export const deleteEmployee = async (id: string) => {
    try {
        const response: EmployeeListResponse = await ApiClient.delete(`/admin/delete-employee/${id}`);
        toast.success("Employee Deleted Successfully", {
            duration: 4000,
        });
        return response;
    } catch (error: any) {
        toast.error("Employee Deleting Failed", {
            description:
                error?.response?.data?.message ||
                "Something went wrong. Please try again.",
            duration: 4000,
        });
        throw error;
    }
};

export const addEmployee = async (data: any) => {
    try {
        const response: EmployeeListResponse = await ApiClient.post("/admin/add-employee", data);
        toast.success("Employee Added Successfully", {
            duration: 4000,
        });
        return response;
    } catch (error: any) {
        toast.error("Employee Adding Failed", {
            description:
                error?.response?.data?.message ||
                "Something went wrong. Please try again.",
            duration: 4000,
        });
        throw error;
    }
};

export const updateEmployee = async (data: any) => {
    try {
        const response: EmployeeListResponse = await ApiClient.post(`/admin/update-employee`, data);
        toast.success("Employee Updated Successfully", {
            duration: 4000,
        });
        return response;
    } catch (error: any) {
        toast.error("Employee Updating Failed", {
            description:
                error?.response?.data?.message ||
                "Something went wrong. Please try again.",
            duration: 4000,
        });
        throw error;
    }
};
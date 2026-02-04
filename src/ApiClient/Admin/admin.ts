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
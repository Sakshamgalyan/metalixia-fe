import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";

export interface Report {
  id: string;
  name: string;
  files: any[]; // Adjust based on actual file object structure if needed
  date: string;
  status: "Pending" | "Approved" | "Rejected";
}

export interface ReportListResponse {
  data: Report[];
}

export const uploadReport = async (data: FormData) => {
  try {
    const response = await ApiClient.post<any>(
      "/employee/upload-report",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("Report uploaded successfully");
    return response;
  } catch (error: any) {
    toast.error("Failed to upload report", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  }
};

export const getMyReports = async () => {
  try {
    const response =
      await ApiClient.get<ReportListResponse>("/employee/reports");
    return response;
  } catch (error: any) {
    console.error("Failed to fetch reports", error);
    // Optional: toast error here or handle in component
    throw error;
  }
};

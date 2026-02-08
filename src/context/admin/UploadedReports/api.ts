import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { ReportList, ReportUpload, UploadedReportAction } from "./type";
import { approveReportLoading, deleteReportLoading, fetchReportListSuccess, fetchReportUploadSuccess } from "./actions";

export const getAllReports = async (
  dispatch: Dispatch<UploadedReportAction>,
  page: number,
  limit: number,
) => {
  try {
    
    const response = await ApiClient.get<ReportList>("/employee/get-all-reports", {
      params: {
        page,
        limit,
      },
    });
    dispatch(fetchReportListSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to fetch reports", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  }
};

export const deleteReportApi = async (
  dispatch: Dispatch<UploadedReportAction>,
  id: string,
) => {
  dispatch(deleteReportLoading(true));
  try {
    console.log(id);
    await ApiClient.post(`/employee/delete-report`, { id });
    return;
  } catch (error: any) {
    toast.error("Failed to delete report", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(deleteReportLoading(false));
  }
};

export const approveReportApi = async (
  dispatch: Dispatch<UploadedReportAction>,
  id: string,
  status: string,
) => {
  dispatch(approveReportLoading(true));
  try {
    await ApiClient.post(`/employee/approve-report`, { reportId: id.toString(), status });
    toast.success("Report status updated successfully");
    return;
  } catch (error: any) {
    toast.error("Failed to update report status", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(approveReportLoading(false));
  }
};

export const downloadReportApi = async (id: string, filename: string) => {
  try {
    const response = await ApiClient.get<Blob>(
      `/employee/download-report/${id}`,
      {
        responseType: "blob",
      },
    );
    const url = window.URL.createObjectURL(new Blob([response])); // response is data (Blob)
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return response;
  } catch (error: any) {
    toast.error("Failed to download report", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  }
};

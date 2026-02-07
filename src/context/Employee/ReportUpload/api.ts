import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { ReportList, ReportUpload, ReportUploadAction } from "./type";
import { deleteReportLoading, fetchReportListSuccess, fetchReportUploadSuccess } from "./actions";

export const uploadReportApi = async (
  dispatch: Dispatch<ReportUploadAction>,
  data: FormData,
) => {
  try {
    const response = await ApiClient.post<ReportUpload>(
      "/employee/report-upload",
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    toast.success("Report uploaded successfully");
    dispatch(fetchReportUploadSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to upload report", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  }
};

export const getMyReports = async (
  dispatch: Dispatch<ReportUploadAction>,
  page: number,
  limit: number,
  employeeId: string,
) => {
  try {
    const response = await ApiClient.get<ReportList>(`/employee/get-reports/${employeeId}`, {
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
  dispatch: Dispatch<ReportUploadAction>,
  id: string,
) => {
  dispatch(deleteReportLoading(true));
  try {
    await ApiClient.post(`/employee/delete-report`, { id });
    toast.success("Report deleted successfully");
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
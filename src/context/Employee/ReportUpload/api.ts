import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { ReportList, ReportUpload, ReportUploadAction } from "./type";
import {
  deleteReportLoading,
  fetchReportListLoading,
  fetchReportListSuccess,
  fetchReportUploadSuccess,
} from "./actions";

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
    const response = await ApiClient.get<ReportList>(
      `/employee/get-reports/${employeeId}`,
      {
        params: {
          page,
          limit,
        },
      },
    );
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

export const mailedReportsApi = async (
  dispatch: Dispatch<ReportUploadAction>,
  page: number,
  limit: number,
) => {
  try {
    dispatch(fetchReportListLoading(true));
    const response = await ApiClient.get<ReportList>(
      `/employee/mailed-reports`,
      {
        params: {
          page,
          limit,
        },
      },
    );
    dispatch(fetchReportListSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to fetch reports", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchReportListLoading(false));
  }
};

export const getAllReports = async (
  dispatch: Dispatch<ReportUploadAction>,
  page: number,
  limit: number,
) => {
  try {
    dispatch(fetchReportListLoading(true));
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
  } finally {
    dispatch(fetchReportListLoading(false));
  }
};
import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import {
  deleteReportLoading,
  fetchReportListLoading,
  fetchReportListSuccess,
  fetchReportUploadLoading,
} from "./actions";
import { ReportList, UploadPaySlipAction } from "./type";

export const getAllPayslips = async (
  dispatch: Dispatch<UploadPaySlipAction>,
  page: number = 1,
  limit: number = 10,
  employeeId?: string,
) => {
  dispatch(fetchReportListLoading(true));
  try {
    const response = await ApiClient.get<ReportList>(
      "/payslip/get-all-payslips",
      {
        params: {
          page,
          limit,
          employeeId,
        },
      },
    );
    dispatch(fetchReportListSuccess(response));
  } catch (error: any) {
    toast.error("Failed to fetch payslips", {
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    dispatch(fetchReportListLoading(false));
  }
};

export const uploadPayslipApi = async (
  dispatch: Dispatch<UploadPaySlipAction>,
  formData: FormData,
  onSuccess: () => void,
) => {
  dispatch(fetchReportUploadLoading(true));
  try {
    await ApiClient.post("/payslip/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    toast.success("Payslip uploaded successfully");
    onSuccess();
  } catch (error: any) {
    toast.error("Failed to upload payslip", {
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    dispatch(fetchReportUploadLoading(false));
  }
};

export const deletePayslipApi = async (
  dispatch: Dispatch<UploadPaySlipAction>,
  id: string,
  onSuccess: () => void,
) => {
  dispatch(deleteReportLoading(true));
  try {
    await ApiClient.delete(`/payslip/${id}`);
    toast.success("Payslip deleted successfully");
    onSuccess();
  } catch (error: any) {
    toast.error("Failed to delete payslip", {
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    dispatch(deleteReportLoading(false));
  }
};

export const downloadPayslipApi = async (id: string, fileName: string) => {
  try {
    const response = await ApiClient.get<Blob>(`/payslip/download/${id}`, {
      responseType: "blob",
    });

    // Create blob link to download
    const url = window.URL.createObjectURL(new Blob([response]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error: any) {
    toast.error("Failed to download file", {
      description: error?.response?.data?.message || "Something went wrong",
    });
  }
};

export const getAllPayslipsApi = async (
  dispatch: Dispatch<UploadPaySlipAction>,
  page: number = 1,
  limit: number = 10,
) => {
  dispatch(fetchReportListLoading(true));
  try {
    const response = await ApiClient.get<ReportList>(
      "/payslip/get-payslips",
      {
        params: {
          page,
          limit,
        },
      },
    );
    dispatch(fetchReportListSuccess(response));
  } catch (error: any) {
    toast.error("Failed to fetch payslips", {
      description: error?.response?.data?.message || "Something went wrong",
    });
  } finally {
    dispatch(fetchReportListLoading(false));
  }
};
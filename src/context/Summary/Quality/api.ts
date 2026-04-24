import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { QualityAction, QualityListResponse, QualityStats, PendingOrder } from "./type";
import {
  fetchQualityListLoading, fetchQualityListSuccess,
  fetchQualityStatsLoading, fetchQualityStatsSuccess,
  fetchQualityPendingLoading, fetchQualityPendingSuccess,
} from "./actions";

export const getQualityChecksApi = async (
  dispatch: Dispatch<QualityAction>,
  page: number, limit: number, search?: string, result?: string,
) => {
  dispatch(fetchQualityListLoading(true));
  try {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    if (result) params.result = result;
    const response = await ApiClient.get<QualityListResponse>("/quality", { params });
    dispatch(fetchQualityListSuccess(response));
  } catch (error: any) {
    toast.error("Failed to fetch quality checks", { description: error?.response?.data?.message || "Something went wrong" });
  } finally {
    dispatch(fetchQualityListLoading(false));
  }
};

export const getQualityStatsApi = async (dispatch: Dispatch<QualityAction>) => {
  dispatch(fetchQualityStatsLoading(true));
  try {
    const response = await ApiClient.get<QualityStats>("/quality/stats");
    dispatch(fetchQualityStatsSuccess(response));
  } catch (error: any) {
    toast.error("Failed to fetch quality stats", { description: error?.response?.data?.message || "Something went wrong" });
  } finally {
    dispatch(fetchQualityStatsLoading(false));
  }
};

export const getPendingInspectionsApi = async (dispatch: Dispatch<QualityAction>) => {
  dispatch(fetchQualityPendingLoading(true));
  try {
    const response = await ApiClient.get<{ data: PendingOrder[] }>("/quality/pending");
    dispatch(fetchQualityPendingSuccess(response.data));
  } catch (error: any) {
    toast.error("Failed to fetch pending inspections", { description: error?.response?.data?.message || "Something went wrong" });
  } finally {
    dispatch(fetchQualityPendingLoading(false));
  }
};

export const inspectOrderApi = async (
  productionOrderId: string,
  data: {
    inspectedBy: string;
    inspectedById: string;
    result: string;
    defectType?: string;
    defectDescription?: string;
    rejectionReason?: string;
    parameters?: { name: string; expected: string; actual: string; passed: boolean }[];
  },
) => {
  try {
    await ApiClient.post(`/quality/inspect/${productionOrderId}`, data);
    toast.success(data.result === "passed" ? "Material passed quality check" : "Material rejected — sent back to production");
  } catch (error: any) {
    toast.error("Inspection failed", { description: error?.response?.data?.message || "Something went wrong" });
    throw error;
  }
};

export const seedQualityMockApi = async () => {
  try {
    await ApiClient.post("/quality/seed-mock");
    toast.success("Mock quality data seeded");
  } catch (error: any) {
    toast.error("Failed to seed mock data", { description: error?.response?.data?.message || "Something went wrong" });
    throw error;
  }
};

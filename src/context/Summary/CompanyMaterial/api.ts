import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import {
  CompanyList,
  CompanyMaterialAction,
  CompanyMaterialListResponse,
  CompanyMaterialStats,
  CompanyPart,
} from "./type";
import {
  fetchCompanyMaterialListLoading,
  fetchCompanyMaterialListSuccess,
  createCompanyMaterialLoading,
  createCompanyMaterialSuccess,
  updateCompanyMaterialReceiverLoading,
  updateCompanyMaterialReceiverSuccess,
  updateCompanyMaterialLoading,
  updateCompanyMaterialSuccess,
  fetchCompanyMaterialStatsLoading,
  fetchCompanyMaterialStatsSuccess,
  fetchCompaniesListLoading,
  fetchCompaniesListSuccess,
  fetchCompanyPartsLoading,
  fetchCompanyPartsSuccess,
} from "./actions";

export const getCompanyMaterialsApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
  page: number,
  limit: number,
  search?: string,
) => {
  dispatch(fetchCompanyMaterialListLoading(true));
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await ApiClient.get<CompanyMaterialListResponse>(
      "/material/company",
      {
        params,
      },
    );
    dispatch(fetchCompanyMaterialListSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to fetch company materials", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchCompanyMaterialListLoading(false));
  }
};

export const getCompaniesListApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
) => {
  dispatch(fetchCompaniesListLoading(true));
  try {
    const response = await ApiClient.get<CompanyList[]>("/company/list");
    dispatch(fetchCompaniesListSuccess(response));
    return response;
  } catch (error: any) {
    toast.error("Failed to fetch companies list", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchCompaniesListLoading(false));
  }
};

export const getCompanyPartsApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
  companyId: string,
) => {
  dispatch(fetchCompanyPartsLoading(true));
  try {
    const response = await ApiClient.get<CompanyPart[]>(
      `/company/get-parts/${companyId}`,
    );
    dispatch(fetchCompanyPartsSuccess(response));
    return response;
  } catch (error: any) {
    toast.error("Failed to fetch company parts", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchCompanyPartsLoading(false));
  }
};

export const createCompanyMaterialApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
  data: any,
) => {
  dispatch(createCompanyMaterialLoading(true));
  try {
    const response = await ApiClient.post("/material/company", data);
    dispatch(createCompanyMaterialSuccess(response));
    toast.success("Company material created successfully");
    return;
  } catch (error: any) {
    toast.error("Failed to create company material", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(createCompanyMaterialLoading(false));
  }
};

export const updateCompanyMaterialApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
  id: string,
  data: any,
) => {
  dispatch(updateCompanyMaterialLoading(true));
  try {
    const response = await ApiClient.patch(`/material/company/${id}`, data);
    dispatch(updateCompanyMaterialSuccess(response));
    toast.success("Company material updated successfully");
    return;
  } catch (error: any) {
    toast.error("Failed to update company material", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(updateCompanyMaterialLoading(false));
  }
};

export const updateCompanyMaterialReceiverApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
  id: string,
  receiverDetails: { receivedBy: string; receivedById: string },
) => {
  dispatch(updateCompanyMaterialReceiverLoading(true));
  try {
    const response = await ApiClient.patch(
      `/material/company/${id}/receiver`,
      receiverDetails,
    );
    dispatch(updateCompanyMaterialReceiverSuccess(response));
    toast.success("Receiver information updated successfully");
    return;
  } catch (error: any) {
    toast.error("Failed to update receiver information", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(updateCompanyMaterialReceiverLoading(false));
  }
};

export const getCompanyMaterialStatsApi = async (
  dispatch: Dispatch<CompanyMaterialAction>,
) => {
  dispatch(fetchCompanyMaterialStatsLoading(true));
  try {
    const response = await ApiClient.get<CompanyMaterialStats>(
      "/material/company/stats",
    );
    dispatch(fetchCompanyMaterialStatsSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to fetch stats", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchCompanyMaterialStatsLoading(false));
  }
};

export const deleteCompanyMaterialApi = async (id: string) => {
  try {
    const response = await ApiClient.delete(`/material/company/${id}`);
    toast.success("Company material deleted successfully");
    return response;
  } catch (error: any) {
    toast.error("Failed to delete company material", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  }
};

import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { CompanyAction, CompanyListResponse } from "./type";
import {
  fetchCompanyListLoading,
  fetchCompanyListSuccess,
  actionLoading,
  actionSuccess,
} from "./actions";

export const getCompaniesApi = async (
  dispatch: Dispatch<CompanyAction>,
  page: number,
  limit: number,
  search?: string
) => {
  dispatch(fetchCompanyListLoading(true));
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await ApiClient.get<CompanyListResponse>("/company", {
      params,
    });
    dispatch(fetchCompanyListSuccess(response));
    return;
  } catch (error: any) {
    toast.error("Failed to fetch companies", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(fetchCompanyListLoading(false));
  }
};

export const createCompanyApi = async (
  dispatch: Dispatch<CompanyAction>,
  data: any
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.post("/company", data);
    dispatch(actionSuccess());
    toast.success("Company created successfully");
    return response;
  } catch (error: any) {
    toast.error("Failed to create company", {
      description: error?.response?.data?.message || "Something went wrong",
    });
    throw error;
  } finally {
    dispatch(actionLoading(false));
  }
};

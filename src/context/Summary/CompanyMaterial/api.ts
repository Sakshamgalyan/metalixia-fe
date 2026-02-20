import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { CompanyMaterialAction, CompanyMaterialListResponse } from "./type";
import {
    fetchCompanyMaterialListLoading,
    fetchCompanyMaterialListSuccess,
    createCompanyMaterialLoading,
    createCompanyMaterialSuccess,
    updateCompanyMaterialReceiverLoading,
    updateCompanyMaterialReceiverSuccess,
} from "./actions";

export const getCompanyMaterialsApi = async (
    dispatch: Dispatch<CompanyMaterialAction>,
    page: number,
    limit: number,
) => {
    dispatch(fetchCompanyMaterialListLoading(true));
    try {
        const response = await ApiClient.get<CompanyMaterialListResponse>("/material/company", {
            params: { page, limit },
        });
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

export const updateCompanyMaterialReceiverApi = async (
    dispatch: Dispatch<CompanyMaterialAction>,
    id: string,
    receiverDetails: { receivedBy: string; receivedById: string },
) => {
    dispatch(updateCompanyMaterialReceiverLoading(true));
    try {
        const response = await ApiClient.patch(`/material/company/${id}/receiver`, receiverDetails);
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

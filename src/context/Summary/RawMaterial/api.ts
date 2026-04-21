import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { RawMaterialAction, RawMaterialListResponse } from "./type";
import {
    fetchRawMaterialListLoading,
    fetchRawMaterialListSuccess,
    createRawMaterialLoading,
    createRawMaterialSuccess,
    fetchRawMaterialStatsLoading,
    fetchRawMaterialStatsSuccess,
} from "./actions";

export const getRawMaterialStatsApi = async (
    dispatch: Dispatch<RawMaterialAction>,
) => {
    dispatch(fetchRawMaterialStatsLoading(true));
    try {
        const response = await ApiClient.get<any>("/material/raw/stats");
        dispatch(fetchRawMaterialStatsSuccess(response));
    } catch (error: any) {
        toast.error("Failed to fetch statistics", {
            description: error?.response?.data?.message || "Something went wrong",
        });
    } finally {
        dispatch(fetchRawMaterialStatsLoading(false));
    }
};

export const getRawMaterialsApi = async (
    dispatch: Dispatch<RawMaterialAction>,
    page: number,
    limit: number,
    search?: string,
) => {
    dispatch(fetchRawMaterialListLoading(true));
    try {
        const params: any = { page, limit };
        if (search) params.search = search;
        
        const response = await ApiClient.get<RawMaterialListResponse>("/material/raw", {
            params,
        });
        dispatch(fetchRawMaterialListSuccess(response));
        return;
    } catch (error: any) {
        toast.error("Failed to fetch raw materials", {
            description: error?.response?.data?.message || "Something went wrong",
        });
        throw error;
    } finally {
        dispatch(fetchRawMaterialListLoading(false));
    }
};

export const createRawMaterialApi = async (
    dispatch: Dispatch<RawMaterialAction>,
    data: any,
) => {
    dispatch(createRawMaterialLoading(true));
    try {
        const response = await ApiClient.post("/material/raw", data);
        dispatch(createRawMaterialSuccess(response));
        toast.success("Raw material created successfully");
        return response;
    } catch (error: any) {
        toast.error("Failed to create raw material", {
            description: error?.response?.data?.message || "Something went wrong",
        });
        throw error;
    } finally {
        dispatch(createRawMaterialLoading(false));
    }
};

export const deleteRawMaterialApi = async (id: string) => {
    try {
        const response = await ApiClient.delete(`/material/raw/${id}`);
        toast.success("Raw material deleted successfully");
        return response;
    } catch (error: any) {
        toast.error("Failed to delete raw material", {
            description: error?.response?.data?.message || "Something went wrong",
        });
        throw error;
    }
};

export const getEmployeesListApi = async () => {
    try {
        const response = await ApiClient.get<any>("/admin/get-all-employee");
        return response;
    } catch (error: any) {
        toast.error("Failed to fetch employees list", {
            description: error?.response?.data?.message || "Something went wrong",
        });
        return [];
    }
};

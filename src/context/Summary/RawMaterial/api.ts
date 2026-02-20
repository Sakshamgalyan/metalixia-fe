import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { RawMaterialAction, RawMaterialListResponse } from "./type";
import {
    fetchRawMaterialListLoading,
    fetchRawMaterialListSuccess,
    createRawMaterialLoading,
    createRawMaterialSuccess,
} from "./actions";

export const getRawMaterialsApi = async (
    dispatch: Dispatch<RawMaterialAction>,
    page: number,
    limit: number,
) => {
    dispatch(fetchRawMaterialListLoading(true));
    try {
        const response = await ApiClient.get<RawMaterialListResponse>("/material/raw", {
            params: { page, limit },
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
        return;
    } catch (error: any) {
        toast.error("Failed to create raw material", {
            description: error?.response?.data?.message || "Something went wrong",
        });
        throw error;
    } finally {
        dispatch(createRawMaterialLoading(false));
    }
};

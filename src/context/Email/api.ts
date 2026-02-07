import { Dispatch } from "react";
import ApiClient from "@/lib/apiClient";
import { toast } from "sonner";
import { EmailAction } from "./types";
import {
  sendEmailLoading,
  sendEmailSuccess,
  fetchEmailHistoryLoading,
  fetchEmailHistorySuccess,
  fetchTemplatesLoading,
  fetchTemplatesSuccess,
} from "./actions";

export const sendEmailApi = async (
  dispatch: Dispatch<EmailAction>,
  data: FormData,
) => {
  dispatch(sendEmailLoading(true));
  try {
    await ApiClient.post("/email/send", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    dispatch(sendEmailSuccess());
    toast.success("Email sent successfully");
    return true;
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to send email");
    dispatch(sendEmailLoading(false));
    return false;
  }
};

export const getEmailHistoryApi = async (
  dispatch: Dispatch<EmailAction>,
  employeeId: string,
  page = 1,
  limit = 10,
) => {
  dispatch(fetchEmailHistoryLoading(true));
  try {
    const response = await ApiClient.get("/email/history", {
      params: { employeeId, page, limit },
    });
    dispatch(fetchEmailHistorySuccess(response)); // Removed .data since ApiClient response format
  } catch (error: any) {
    console.error("Failed to fetch email history", error);
    dispatch(fetchEmailHistoryLoading(false));
  }
};

export const getTemplatesApi = async (dispatch: Dispatch<EmailAction>) => {
  dispatch(fetchTemplatesLoading(true));
  try {
    const response = await ApiClient.get("/email/templates");
    dispatch(fetchTemplatesSuccess(response));
  } catch (error: any) {
    console.error("Failed to fetch templates", error);
    dispatch(fetchTemplatesLoading(false));
  }
};

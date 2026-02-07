import {
  SEND_EMAIL_LOADING,
  SEND_EMAIL_SUCCESS,
  FETCH_EMAIL_HISTORY_LOADING,
  FETCH_EMAIL_HISTORY_SUCCESS,
  FETCH_TEMPLATES_LOADING,
  FETCH_TEMPLATES_SUCCESS,
  EmailHistoryItem,
  EmailTemplateItem,
} from "./types";

export const sendEmailLoading = (isLoading: boolean) => ({
  type: SEND_EMAIL_LOADING,
  payload: isLoading,
});

export const sendEmailSuccess = () => ({
  type: SEND_EMAIL_SUCCESS,
});

export const fetchEmailHistoryLoading = (isLoading: boolean) => ({
  type: FETCH_EMAIL_HISTORY_LOADING,
  payload: isLoading,
});

export const fetchEmailHistorySuccess = (data: any) => ({
  type: FETCH_EMAIL_HISTORY_SUCCESS,
  payload: data,
});

export const fetchTemplatesLoading = (isLoading: boolean) => ({
  type: FETCH_TEMPLATES_LOADING,
  payload: isLoading,
});

export const fetchTemplatesSuccess = (data: EmailTemplateItem[]) => ({
  type: FETCH_TEMPLATES_SUCCESS,
  payload: data,
});

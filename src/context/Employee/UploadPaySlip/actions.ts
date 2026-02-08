import {
  DELETE_REPORT_LOADING,
  DELETE_REPORT_LOADING_ACTION,
  FETCH_REPORT_LIST_LOADING,
  FETCH_REPORT_LIST_LOADING_ACTION,
  FETCH_REPORT_LIST_SUCCESS,
  FETCH_REPORT_LIST_SUCCESS_ACTION,
  FETCH_REPORT_UPLOAD_LOADING,
  FETCH_REPORT_UPLOAD_LOADING_ACTION,
  SET_PAGE,
  SET_PAGE_ACTION,
} from "./type";

export const fetchReportListLoading = (
  loading: boolean,
): FETCH_REPORT_LIST_LOADING_ACTION => ({
  type: FETCH_REPORT_LIST_LOADING,
  payload: loading,
});

export const fetchReportListSuccess = (
  payload: any,
): FETCH_REPORT_LIST_SUCCESS_ACTION => ({
  type: FETCH_REPORT_LIST_SUCCESS,
  payload: payload,
});

export const fetchReportUploadLoading = (
  loading: boolean,
): FETCH_REPORT_UPLOAD_LOADING_ACTION => ({
  type: FETCH_REPORT_UPLOAD_LOADING,
  payload: loading,
});

export const setPage = (page: number): SET_PAGE_ACTION => ({
  type: SET_PAGE,
  payload: page,
});

export const deleteReportLoading = (
  loading: boolean,
): DELETE_REPORT_LOADING_ACTION => ({
  type: DELETE_REPORT_LOADING,
  payload: loading,
});

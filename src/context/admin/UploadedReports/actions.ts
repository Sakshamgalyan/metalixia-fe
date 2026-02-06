import {
  APPROVE_REPORT_LOADING,
  APPROVE_REPORT_LOADING_ACTION,
  DELETE_REPORT_LOADING,
  DELETE_REPORT_LOADING_ACTION,
  FETCH_REPORT_LIST_LOADING,
  FETCH_REPORT_LIST_LOADING_ACTION,
  FETCH_REPORT_LIST_SUCCESS,
  FETCH_REPORT_LIST_SUCCESS_ACTION,
  FETCH_REPORT_UPLOAD_LOADING,
  FETCH_REPORT_UPLOAD_LOADING_ACTION,
  FETCH_REPORT_UPLOAD_SUCCESS,
  FETCH_REPORT_UPLOAD_SUCCESS_ACTION,
  ReportList,
  ReportUpload,
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
  payload: ReportList,
): FETCH_REPORT_LIST_SUCCESS_ACTION => ({
  type: FETCH_REPORT_LIST_SUCCESS,
  payload,
});

export const fetchReportUploadLoading = (
  loading: boolean,
): FETCH_REPORT_UPLOAD_LOADING_ACTION => ({
  type: FETCH_REPORT_UPLOAD_LOADING,
  payload: loading,
});

export const fetchReportUploadSuccess = (
  payload: ReportUpload,
): FETCH_REPORT_UPLOAD_SUCCESS_ACTION => ({
  type: FETCH_REPORT_UPLOAD_SUCCESS,
  payload,
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

export const approveReportLoading = (
  loading: boolean,
): APPROVE_REPORT_LOADING_ACTION => ({
  type: APPROVE_REPORT_LOADING,
  payload: loading,
});

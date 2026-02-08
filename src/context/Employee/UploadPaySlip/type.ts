export const FETCH_REPORT_LIST_LOADING = "FETCH_REPORT_LIST_LOADING";
export const FETCH_REPORT_LIST_SUCCESS = "FETCH_REPORT_LIST_SUCCESS";
export const FETCH_REPORT_UPLOAD_LOADING = "FETCH_REPORT_UPLOAD_LOADING";
export const FETCH_REPORT_UPLOAD_SUCCESS = "FETCH_REPORT_UPLOAD_SUCCESS";
export const SET_PAGE = "SET_PAGE";
export const DELETE_REPORT_LOADING = "DELETE_REPORT_LOADING";

export interface FETCH_REPORT_LIST_LOADING_ACTION {
  type: typeof FETCH_REPORT_LIST_LOADING;
  payload: boolean;
}

export interface FETCH_REPORT_LIST_SUCCESS_ACTION {
  type: typeof FETCH_REPORT_LIST_SUCCESS;
  payload: any;
}

export interface FETCH_REPORT_UPLOAD_LOADING_ACTION {
  type: typeof FETCH_REPORT_UPLOAD_LOADING;
  payload: boolean;
}

export interface SET_PAGE_ACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export interface DELETE_REPORT_LOADING_ACTION {
  type: typeof DELETE_REPORT_LOADING;
  payload: boolean;
}

export type UploadPaySlipState = {
  listLoading: boolean;
  uploadLoading: boolean;
  page: number;
  deleteLoading: boolean;
};

export type UploadPaySlipAction =
  | FETCH_REPORT_LIST_LOADING_ACTION
  | FETCH_REPORT_LIST_SUCCESS_ACTION
  | FETCH_REPORT_UPLOAD_LOADING_ACTION
  | SET_PAGE_ACTION
  | DELETE_REPORT_LOADING_ACTION;

// api
export interface Payslip {
  id: string;
  employeeId: string;
  firstName: string;
  month: string;
  year: string;
  uploadedAt: string;
  fileName: string;
  uploadedBy: string;
}

export interface ReportList {
  status: string;
  meta: {
    total: number;
    page: number;
    totalPages: number;
    limit: number;
  };
  data: Payslip[];
}

import { Dispatch } from "react";
export type UploadPaySlipDispatch = Dispatch<UploadPaySlipAction>;

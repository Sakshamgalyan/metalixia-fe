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
  payload: ReportList;
}

export interface FETCH_REPORT_UPLOAD_LOADING_ACTION {
  type: typeof FETCH_REPORT_UPLOAD_LOADING;
  payload: boolean;
}

export interface FETCH_REPORT_UPLOAD_SUCCESS_ACTION {
  type: typeof FETCH_REPORT_UPLOAD_SUCCESS;
  payload: ReportUpload;
}

export interface SET_PAGE_ACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export interface DELETE_REPORT_LOADING_ACTION {
  type: typeof DELETE_REPORT_LOADING;
  payload: boolean;
}

export type ReportUploadState = {
  listLoading: boolean;
  listData: ReportList | null;
  uploadLoading: boolean;
  uploadData: ReportUpload | null;
  page: number;
  deleteLoading: boolean;
};

export type ReportUploadAction =
  | FETCH_REPORT_LIST_LOADING_ACTION
  | FETCH_REPORT_LIST_SUCCESS_ACTION
  | FETCH_REPORT_UPLOAD_LOADING_ACTION
  | FETCH_REPORT_UPLOAD_SUCCESS_ACTION
  | SET_PAGE_ACTION
  | DELETE_REPORT_LOADING_ACTION

// api

export interface ReportList {
  status: string;
  meta: {
    total: number;
    page: number;
    totalPages: number;
  };
  data: {
    id: string;
    name: string;
    date: number;
    fileType: string;
  }[];
}

export interface ReportUpload {
  message: string;
  status: string;
}

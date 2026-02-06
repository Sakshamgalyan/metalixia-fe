import type { Reducer } from "react";
import {
  UploadedReportState,
  UploadedReportAction,
  FETCH_REPORT_LIST_LOADING,
  FETCH_REPORT_LIST_SUCCESS,
  FETCH_REPORT_UPLOAD_LOADING,
  FETCH_REPORT_UPLOAD_SUCCESS,
  SET_PAGE,
  DELETE_REPORT_LOADING,
  APPROVE_REPORT_LOADING,
} from "./type";

export const initialState: UploadedReportState = {
  listLoading: false,
  listData: null,
  uploadLoading: false,
  uploadData: null,
  page: 1,
  deleteLoading: false,
  approveLoading: false,
};

const reducer: Reducer<UploadedReportState, UploadedReportAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case FETCH_REPORT_LIST_LOADING:
      return {
        ...state,
        listLoading: action.payload,
      };
    case FETCH_REPORT_LIST_SUCCESS:
      return {
        ...state,
        listData: action.payload,
      };
    case FETCH_REPORT_UPLOAD_LOADING:
      return {
        ...state,
        uploadLoading: action.payload,
      };
    case FETCH_REPORT_UPLOAD_SUCCESS:
      return {
        ...state,
        uploadData: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };

    case DELETE_REPORT_LOADING:
      return {
        ...state,
        deleteLoading: action.payload,
      };

    case APPROVE_REPORT_LOADING:
      return {
        ...state,
        approveLoading: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

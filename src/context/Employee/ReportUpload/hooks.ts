import { useContext } from "react";
import {
  ReportUploadStateContext,
  ReportUploadDispatchContext,
} from "./index";

export const useReportUploadStateContext = () => {
  const context = useContext(ReportUploadStateContext);
  if (!context) {
    throw new Error(
      "useReportUploadStateContext should be wrap under ReportUploadContextProvider",
    );
  }
  const { state } = context;
  return { ...state };
};

export const useReportUploadDispatchContext = () => {
  const dispatchContext = useContext(ReportUploadDispatchContext);
  if (!dispatchContext) {
    throw new Error(
      "useReportUploadDispatchContext should be wrap under ReportUploadContextProvider",
    );
  }
  const { dispatch } = dispatchContext;
  return dispatch;
};

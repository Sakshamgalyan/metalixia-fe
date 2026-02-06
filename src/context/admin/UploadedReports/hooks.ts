import { useContext } from "react";
import {
  UploadedReportStateContext,
  UploadedReportDispatchContext,
} from "./index";

export const useUploadedReportStateContext = () => {
  const context = useContext(UploadedReportStateContext);
  if (!context) {
    throw new Error(
      "useUploadedReportStateContext should be wrap under UploadedReportContextProvider",
    );
  }
  const { state } = context;
  return { ...state };
};

export const useUploadedReportDispatchContext = () => {
  const dispatchContext = useContext(UploadedReportDispatchContext);
  if (!dispatchContext) {
    throw new Error(
      "useUploadedReportDispatchContext should be wrap under UploadedReportContextProvider",
    );
  }
  const { dispatch } = dispatchContext;
  return dispatch;
};

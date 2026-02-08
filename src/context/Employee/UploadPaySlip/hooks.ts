import { useContext } from "react";
import {
  UploadPaySlipStateContext,
  UploadPaySlipDispatchContext,
} from "./index";

export const useUploadPaySlipStateContext = () => {
  const context = useContext(UploadPaySlipStateContext);
  if (!context) {
    throw new Error(
      "useUploadPaySlipStateContext should be wrap under UploadPaySlipContextProvider",
    );
  }
  const { state } = context;
  return { ...state };
};

export const useUploadPaySlipDispatchContext = () => {
  const dispatchContext = useContext(UploadPaySlipDispatchContext);
  if (!dispatchContext) {
    throw new Error(
      "useUploadPaySlipDispatchContext should be wrap under UploadPaySlipContextProvider",
    );
  }
  const { dispatch } = dispatchContext;
  return dispatch;
};

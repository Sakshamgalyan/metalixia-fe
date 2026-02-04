import { useContext } from "react";
import {
  EmployeeListStateContext,
  EmployeeListDispatchContext,
} from "@/context/admin/EmployeeList/index";

export const useEmployeeListStateContext = () => {
  const context = useContext(EmployeeListStateContext);
  if (!context) {
    throw new Error(
      "useEmployeeListStateContext should be wrap under EmployeeListContextProvider",
    );
  }
  const { state } = context;
  return { ...state };
};

export const useEmployeeListDispatchContext = () => {
  const dispatchContext = useContext(EmployeeListDispatchContext);
  if (!dispatchContext) {
    throw new Error(
      "useEmployeeListDispatchContext should be wrap under EmployeeListContextProvider",
    );
  }
  const { dispatch } = dispatchContext;
  return dispatch;
};

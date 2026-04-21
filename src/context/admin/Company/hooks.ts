import { createContext, useContext, Dispatch } from "react";
import { CompanyState, CompanyAction } from "./type";

export const CompanyStateContext = createContext<CompanyState | undefined>(
  undefined
);

export const CompanyDispatchContext = createContext<
  Dispatch<CompanyAction> | undefined
>(undefined);

export const useCompanyStateContext = () => {
  const context = useContext(CompanyStateContext);
  if (context === undefined) {
    throw new Error(
      "useCompanyStateContext must be used within a CompanyContextProvider"
    );
  }
  return context;
};

export const useCompanyDispatchContext = () => {
  const context = useContext(CompanyDispatchContext);
  if (context === undefined) {
    throw new Error(
      "useCompanyDispatchContext must be used within a CompanyContextProvider"
    );
  }
  return context;
};

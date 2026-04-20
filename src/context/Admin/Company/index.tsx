"use client";

import React, { useReducer, ReactNode } from "react";
import { CompanyStateContext, CompanyDispatchContext } from "./hooks";
import { companyReducer, initialCompanyState } from "./reducer";

interface Props {
  children: ReactNode;
}

const CompanyContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(companyReducer, initialCompanyState);

  return (
    <CompanyStateContext.Provider value={state}>
      <CompanyDispatchContext.Provider value={dispatch}>
        {children}
      </CompanyDispatchContext.Provider>
    </CompanyStateContext.Provider>
  );
};

export default CompanyContextProvider;

"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { ReportUploadState, ReportUploadAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = {
  state: ReportUploadState;
};

type DispatchContext = {
  dispatch: Dispatch<ReportUploadAction>;
};

const ReportUploadStateContext = createContext<StateContext | undefined>(
  undefined,
);

const ReportUploadDispatchContext = createContext<
  DispatchContext | undefined
>(undefined);

const ReportUploadContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: ReportUploadAction) => {
      return dispatch(action);
    },
    [dispatch],
  );

  return (
    <ReportUploadDispatchContext.Provider
      value={{ dispatch: enhancedDispatch }}
    >
      <ReportUploadStateContext.Provider value={{ state }}>
        {children}
      </ReportUploadStateContext.Provider>
    </ReportUploadDispatchContext.Provider>
  );
};

export default ReportUploadContextProvider;

// Export context objects for external use
export { ReportUploadStateContext, ReportUploadDispatchContext };

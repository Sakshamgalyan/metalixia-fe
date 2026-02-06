"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { UploadedReportState, UploadedReportAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = {
  state: UploadedReportState;
};

type DispatchContext = {
  dispatch: Dispatch<UploadedReportAction>;
};

const UploadedReportStateContext = createContext<StateContext | undefined>(
  undefined,
);

const UploadedReportDispatchContext = createContext<
  DispatchContext | undefined
>(undefined);

const UploadedReportContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: UploadedReportAction) => {
      return dispatch(action);
    },
    [dispatch],
  );

  return (
    <UploadedReportDispatchContext.Provider
      value={{ dispatch: enhancedDispatch }}
    >
      <UploadedReportStateContext.Provider value={{ state }}>
        {children}
      </UploadedReportStateContext.Provider>
    </UploadedReportDispatchContext.Provider>
  );
};

export default UploadedReportContextProvider;

// Export context objects for external use
export { UploadedReportStateContext, UploadedReportDispatchContext };

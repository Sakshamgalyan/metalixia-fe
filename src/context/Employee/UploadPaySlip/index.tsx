"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import reducer, { initialState } from "./reducer";
import { UploadPaySlipState, UploadPaySlipAction } from "./type";

type StateContext = {
  state: UploadPaySlipState;
};

type DispatchContext = {
  dispatch: Dispatch<UploadPaySlipAction>;
};

const UploadPaySlipStateContext = createContext<StateContext | undefined>(
  undefined,
);

const UploadPaySlipDispatchContext = createContext<
  DispatchContext | undefined
>(undefined);

const UploadPaySlipContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: UploadPaySlipAction) => {
      return dispatch(action);
    },
    [dispatch],
  );

  return (
    <UploadPaySlipDispatchContext.Provider
      value={{ dispatch: enhancedDispatch }}
    >
      <UploadPaySlipStateContext.Provider value={{ state }}>
        {children}
      </UploadPaySlipStateContext.Provider>
    </UploadPaySlipDispatchContext.Provider>
  );
};

export default UploadPaySlipContextProvider;

// Export context objects for external use
export { UploadPaySlipStateContext, UploadPaySlipDispatchContext };

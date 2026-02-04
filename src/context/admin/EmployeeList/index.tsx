"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { EmployeeListState, EmployeeListAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = {
  state: EmployeeListState;
};

type DispatchContext = {
  dispatch: Dispatch<EmployeeListAction>;
};

const EmployeeListStateContext = createContext<StateContext | undefined>(
  undefined,
);

const EmployeeListDispatchContext = createContext<
  DispatchContext | undefined
>(undefined);

const EmployeeListContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: EmployeeListAction) => {
      return dispatch(action);
    },
    [dispatch],
  );

  return (
    <EmployeeListDispatchContext.Provider
      value={{ dispatch: enhancedDispatch }}
    >
      <EmployeeListStateContext.Provider value={{ state }}>
        {children}
      </EmployeeListStateContext.Provider>
    </EmployeeListDispatchContext.Provider>
  );
};

export default EmployeeListContextProvider;

// Export context objects for external use
export { EmployeeListStateContext, EmployeeListDispatchContext };

"use client";
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { InventoryState, InventoryAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = { state: InventoryState };
type DispatchContext = { dispatch: Dispatch<InventoryAction> };

export const InventoryStateContext = createContext<StateContext | undefined>(undefined);
export const InventoryDispatchContext = createContext<DispatchContext | undefined>(undefined);

const InventoryContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const enhancedDispatch = useCallback(
    (action: InventoryAction) => dispatch(action),
    [dispatch],
  );

  return (
    <InventoryDispatchContext.Provider value={{ dispatch: enhancedDispatch }}>
      <InventoryStateContext.Provider value={{ state }}>
        {children}
      </InventoryStateContext.Provider>
    </InventoryDispatchContext.Provider>
  );
};

export default InventoryContextProvider;

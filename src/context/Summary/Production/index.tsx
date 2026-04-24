"use client";
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { ProductionState, ProductionAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = { state: ProductionState };
type DispatchContext = { dispatch: Dispatch<ProductionAction> };

export const ProductionStateContext = createContext<StateContext | undefined>(undefined);
export const ProductionDispatchContext = createContext<DispatchContext | undefined>(undefined);

const ProductionContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const enhancedDispatch = useCallback((action: ProductionAction) => dispatch(action), [dispatch]);

  return (
    <ProductionDispatchContext.Provider value={{ dispatch: enhancedDispatch }}>
      <ProductionStateContext.Provider value={{ state }}>
        {children}
      </ProductionStateContext.Provider>
    </ProductionDispatchContext.Provider>
  );
};

export default ProductionContextProvider;

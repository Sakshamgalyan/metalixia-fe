"use client";
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { QualityState, QualityAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = { state: QualityState };
type DispatchContext = { dispatch: Dispatch<QualityAction> };

export const QualityStateContext = createContext<StateContext | undefined>(undefined);
export const QualityDispatchContext = createContext<DispatchContext | undefined>(undefined);

const QualityContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const enhancedDispatch = useCallback((action: QualityAction) => dispatch(action), [dispatch]);

  return (
    <QualityDispatchContext.Provider value={{ dispatch: enhancedDispatch }}>
      <QualityStateContext.Provider value={{ state }}>
        {children}
      </QualityStateContext.Provider>
    </QualityDispatchContext.Provider>
  );
};

export default QualityContextProvider;

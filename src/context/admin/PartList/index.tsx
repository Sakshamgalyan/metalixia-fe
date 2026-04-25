'use client';

import React, { createContext, useReducer, useCallback } from 'react';
import type { Dispatch, ReactNode } from 'react';
import { PartState, PartAction } from './type';
import reducer, { initialState } from './reducer';

type StateContext = {
  state: PartState;
};

type DispatchContext = {
  dispatch: Dispatch<PartAction>;
};

export const PartStateContext = createContext<StateContext | undefined>(
  undefined,
);
export const PartDispatchContext = createContext<DispatchContext | undefined>(
  undefined,
);

export default function PartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const enhancedDispatch = useCallback(
    (action: PartAction) => {
      return dispatch(action);
    },
    [dispatch],
  );

  return (
    <PartDispatchContext.Provider value={{ dispatch: enhancedDispatch }}>
      <PartStateContext.Provider value={{ state }}>
        {children}
      </PartStateContext.Provider>
    </PartDispatchContext.Provider>
  );
}

"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import { PartState, PartAction } from "./type";

const initialState: PartState = {
  listData: null,
  listLoading: false,
  page: 1,
  modal: {
    mode: null,
    selectedItem: null,
  },
  actionLoading: false,
};

export const PartStateContext = createContext<PartState | undefined>(undefined);
export const PartDispatchContext = createContext<React.Dispatch<PartAction> | undefined>(undefined);

const partReducer = (state: PartState, action: PartAction): PartState => {
  switch (action.type) {
    case "FETCH_PART_LIST_LOADING":
      return { ...state, listLoading: action.payload };
    case "FETCH_PART_LIST_SUCCESS":
      return { ...state, listData: action.payload, listLoading: false };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_MODAL":
      return { ...state, modal: action.payload };
    case "ACTION_LOADING":
      return { ...state, actionLoading: action.payload };
    case "ACTION_SUCCESS":
      return { ...state, actionLoading: false, modal: { mode: null, selectedItem: null } };
    default:
      return state;
  }
};

export default function PartContextProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(partReducer, initialState);

  return (
    <PartStateContext.Provider value={state}>
      <PartDispatchContext.Provider value={dispatch}>
        {children}
      </PartDispatchContext.Provider>
    </PartStateContext.Provider>
  );
}

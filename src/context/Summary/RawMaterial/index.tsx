"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { RawMaterialState, RawMaterialAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = {
    state: RawMaterialState;
};

type DispatchContext = {
    dispatch: Dispatch<RawMaterialAction>;
};

const RawMaterialStateContext = createContext<StateContext | undefined>(
    undefined,
);

const RawMaterialDispatchContext = createContext<
    DispatchContext | undefined
>(undefined);

const RawMaterialContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const enhancedDispatch = useCallback(
        (action: RawMaterialAction) => {
            return dispatch(action);
        },
        [dispatch],
    );

    return (
        <RawMaterialDispatchContext.Provider
            value={{ dispatch: enhancedDispatch }}
        >
            <RawMaterialStateContext.Provider value={{ state }}>
                {children}
            </RawMaterialStateContext.Provider>
        </RawMaterialDispatchContext.Provider>
    );
};

export default RawMaterialContextProvider;

export { RawMaterialStateContext, RawMaterialDispatchContext };

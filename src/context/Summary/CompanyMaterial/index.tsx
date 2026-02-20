"use client"
import React, { createContext, useReducer, useCallback } from "react";
import type { Dispatch, ReactNode } from "react";
import { CompanyMaterialState, CompanyMaterialAction } from "./type";
import reducer, { initialState } from "./reducer";

type StateContext = {
    state: CompanyMaterialState;
};

type DispatchContext = {
    dispatch: Dispatch<CompanyMaterialAction>;
};

const CompanyMaterialStateContext = createContext<StateContext | undefined>(
    undefined,
);

const CompanyMaterialDispatchContext = createContext<
    DispatchContext | undefined
>(undefined);

const CompanyMaterialContextProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const enhancedDispatch = useCallback(
        (action: CompanyMaterialAction) => {
            return dispatch(action);
        },
        [dispatch],
    );

    return (
        <CompanyMaterialDispatchContext.Provider
            value={{ dispatch: enhancedDispatch }}
        >
            <CompanyMaterialStateContext.Provider value={{ state }}>
                {children}
            </CompanyMaterialStateContext.Provider>
        </CompanyMaterialDispatchContext.Provider>
    );
};

export default CompanyMaterialContextProvider;

export { CompanyMaterialStateContext, CompanyMaterialDispatchContext };

import { useContext } from "react";
import {
    CompanyMaterialStateContext,
    CompanyMaterialDispatchContext,
} from "./index";

export const useCompanyMaterialStateContext = () => {
    const context = useContext(CompanyMaterialStateContext);
    if (!context) {
        throw new Error(
            "useCompanyMaterialStateContext should be wrapped under CompanyMaterialContextProvider",
        );
    }
    const { state } = context;
    return { ...state };
};

export const useCompanyMaterialDispatchContext = () => {
    const dispatchContext = useContext(CompanyMaterialDispatchContext);
    if (!dispatchContext) {
        throw new Error(
            "useCompanyMaterialDispatchContext should be wrapped under CompanyMaterialContextProvider",
        );
    }
    const { dispatch } = dispatchContext;
    return dispatch;
};

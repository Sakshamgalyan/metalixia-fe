import { useContext } from "react";
import {
    RawMaterialStateContext,
    RawMaterialDispatchContext,
} from "./index";

export const useRawMaterialStateContext = () => {
    const context = useContext(RawMaterialStateContext);
    if (!context) {
        throw new Error(
            "useRawMaterialStateContext should be wrapped under RawMaterialContextProvider",
        );
    }
    const { state } = context;
    return { ...state };
};

export const useRawMaterialDispatchContext = () => {
    const dispatchContext = useContext(RawMaterialDispatchContext);
    if (!dispatchContext) {
        throw new Error(
            "useRawMaterialDispatchContext should be wrapped under RawMaterialContextProvider",
        );
    }
    const { dispatch } = dispatchContext;
    return dispatch;
};

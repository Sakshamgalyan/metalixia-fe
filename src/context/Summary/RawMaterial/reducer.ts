import type { Reducer } from "react";
import {
    RawMaterialState,
    RawMaterialAction,
    FETCH_RAWMATERIAL_LIST_LOADING,
    FETCH_RAWMATERIAL_LIST_SUCCESS,
    CREATE_RAWMATERIAL_LOADING,
    CREATE_RAWMATERIAL_SUCCESS,
    SET_PAGE,
} from "./type";

export const initialState: RawMaterialState = {
    listLoading: false,
    listData: null,
    createLoading: false,
    page: 1,
};

const reducer: Reducer<RawMaterialState, RawMaterialAction> = (
    state,
    action,
) => {
    switch (action.type) {
        case FETCH_RAWMATERIAL_LIST_LOADING:
            return {
                ...state,
                listLoading: action.payload,
            };
        case FETCH_RAWMATERIAL_LIST_SUCCESS:
            return {
                ...state,
                listData: action.payload,
            };
        case CREATE_RAWMATERIAL_LOADING:
            return {
                ...state,
                createLoading: action.payload,
            };
        case CREATE_RAWMATERIAL_SUCCESS:
            return {
                ...state,
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;

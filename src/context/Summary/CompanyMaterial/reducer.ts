import type { Reducer } from "react";
import {
    CompanyMaterialState,
    CompanyMaterialAction,
    FETCH_COMPANYMATERIAL_LIST_LOADING,
    FETCH_COMPANYMATERIAL_LIST_SUCCESS,
    CREATE_COMPANYMATERIAL_LOADING,
    CREATE_COMPANYMATERIAL_SUCCESS,
    UPDATE_COMPANYMATERIAL_RECEIVER_LOADING,
    UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS,
    UPDATE_COMPANYMATERIAL_LOADING,
    UPDATE_COMPANYMATERIAL_SUCCESS,
    FETCH_COMPANYMATERIAL_STATS_LOADING,
    FETCH_COMPANYMATERIAL_STATS_SUCCESS,
    SET_PAGE,
    SET_MODAL,
} from "./type";

export const initialState: CompanyMaterialState = {
    listLoading: false,
    listData: null,
    createLoading: false,
    updateReceiverLoading: false,
    updateLoading: false,
    statsLoading: false,
    statsData: null,
    page: 1,
    modal: {
        mode: null,
        selectedItem: null,
    },
};

const reducer: Reducer<CompanyMaterialState, CompanyMaterialAction> = (
    state,
    action,
) => {
    switch (action.type) {
        case FETCH_COMPANYMATERIAL_LIST_LOADING:
            return {
                ...state,
                listLoading: action.payload,
            };
        case FETCH_COMPANYMATERIAL_LIST_SUCCESS:
            return {
                ...state,
                listData: action.payload,
            };
        case CREATE_COMPANYMATERIAL_LOADING:
            return {
                ...state,
                createLoading: action.payload,
            };
        case CREATE_COMPANYMATERIAL_SUCCESS:
            return {
                ...state,
            };
        case UPDATE_COMPANYMATERIAL_RECEIVER_LOADING:
            return {
                ...state,
                updateReceiverLoading: action.payload,
            };
        case UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS:
            return {
                ...state,
            };
        case UPDATE_COMPANYMATERIAL_LOADING:
            return {
                ...state,
                updateLoading: action.payload,
            };
        case UPDATE_COMPANYMATERIAL_SUCCESS:
            return {
                ...state,
            };
        case FETCH_COMPANYMATERIAL_STATS_LOADING:
            return {
                ...state,
                statsLoading: action.payload,
            };
        case FETCH_COMPANYMATERIAL_STATS_SUCCESS:
            return {
                ...state,
                statsData: action.payload,
            };
        case SET_PAGE:
            return {
                ...state,
                page: action.payload,
            };
        case SET_MODAL:
            return {
                ...state,
                modal: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;

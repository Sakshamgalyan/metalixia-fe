import {
    FETCH_COMPANYMATERIAL_LIST_LOADING,
    FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION,
    FETCH_COMPANYMATERIAL_LIST_SUCCESS,
    FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION,
    CREATE_COMPANYMATERIAL_LOADING,
    CREATE_COMPANYMATERIAL_LOADING_ACTION,
    CREATE_COMPANYMATERIAL_SUCCESS,
    CREATE_COMPANYMATERIAL_SUCCESS_ACTION,
    UPDATE_COMPANYMATERIAL_RECEIVER_LOADING,
    UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION,
    UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS,
    UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION,
    SET_PAGE,
    SET_PAGE_ACTION,
    CompanyMaterialListResponse,
} from "./type";

export const fetchCompanyMaterialListLoading = (
    loading: boolean,
): FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION => ({
    type: FETCH_COMPANYMATERIAL_LIST_LOADING,
    payload: loading,
});

export const fetchCompanyMaterialListSuccess = (
    payload: CompanyMaterialListResponse,
): FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION => ({
    type: FETCH_COMPANYMATERIAL_LIST_SUCCESS,
    payload,
});

export const createCompanyMaterialLoading = (
    loading: boolean,
): CREATE_COMPANYMATERIAL_LOADING_ACTION => ({
    type: CREATE_COMPANYMATERIAL_LOADING,
    payload: loading,
});

export const createCompanyMaterialSuccess = (
    payload: any,
): CREATE_COMPANYMATERIAL_SUCCESS_ACTION => ({
    type: CREATE_COMPANYMATERIAL_SUCCESS,
    payload,
});

export const updateCompanyMaterialReceiverLoading = (
    loading: boolean,
): UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION => ({
    type: UPDATE_COMPANYMATERIAL_RECEIVER_LOADING,
    payload: loading,
});

export const updateCompanyMaterialReceiverSuccess = (
    payload: any,
): UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION => ({
    type: UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS,
    payload,
});

export const setPage = (page: number): SET_PAGE_ACTION => ({
    type: SET_PAGE,
    payload: page,
});

import {
    FETCH_RAWMATERIAL_LIST_LOADING,
    FETCH_RAWMATERIAL_LIST_LOADING_ACTION,
    FETCH_RAWMATERIAL_LIST_SUCCESS,
    FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION,
    CREATE_RAWMATERIAL_LOADING,
    CREATE_RAWMATERIAL_LOADING_ACTION,
    CREATE_RAWMATERIAL_SUCCESS,
    CREATE_RAWMATERIAL_SUCCESS_ACTION,
    SET_PAGE,
    SET_PAGE_ACTION,
    RawMaterialListResponse,
} from "./type";

export const fetchRawMaterialListLoading = (
    loading: boolean,
): FETCH_RAWMATERIAL_LIST_LOADING_ACTION => ({
    type: FETCH_RAWMATERIAL_LIST_LOADING,
    payload: loading,
});

export const fetchRawMaterialListSuccess = (
    payload: RawMaterialListResponse,
): FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION => ({
    type: FETCH_RAWMATERIAL_LIST_SUCCESS,
    payload,
});

export const createRawMaterialLoading = (
    loading: boolean,
): CREATE_RAWMATERIAL_LOADING_ACTION => ({
    type: CREATE_RAWMATERIAL_LOADING,
    payload: loading,
});

export const createRawMaterialSuccess = (
    payload: any,
): CREATE_RAWMATERIAL_SUCCESS_ACTION => ({
    type: CREATE_RAWMATERIAL_SUCCESS,
    payload,
});

export const setPage = (page: number): SET_PAGE_ACTION => ({
    type: SET_PAGE,
    payload: page,
});

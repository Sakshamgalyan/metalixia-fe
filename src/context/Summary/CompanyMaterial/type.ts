export const FETCH_COMPANYMATERIAL_LIST_LOADING = "FETCH_COMPANYMATERIAL_LIST_LOADING";
export const FETCH_COMPANYMATERIAL_LIST_SUCCESS = "FETCH_COMPANYMATERIAL_LIST_SUCCESS";
export const CREATE_COMPANYMATERIAL_LOADING = "CREATE_COMPANYMATERIAL_LOADING";
export const CREATE_COMPANYMATERIAL_SUCCESS = "CREATE_COMPANYMATERIAL_SUCCESS";
export const UPDATE_COMPANYMATERIAL_RECEIVER_LOADING = "UPDATE_COMPANYMATERIAL_RECEIVER_LOADING";
export const UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS = "UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS";
export const SET_PAGE = "SET_PAGE";

export interface FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION {
    type: typeof FETCH_COMPANYMATERIAL_LIST_LOADING;
    payload: boolean;
}

export interface FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION {
    type: typeof FETCH_COMPANYMATERIAL_LIST_SUCCESS;
    payload: CompanyMaterialListResponse;
}

export interface CREATE_COMPANYMATERIAL_LOADING_ACTION {
    type: typeof CREATE_COMPANYMATERIAL_LOADING;
    payload: boolean;
}

export interface CREATE_COMPANYMATERIAL_SUCCESS_ACTION {
    type: typeof CREATE_COMPANYMATERIAL_SUCCESS;
    payload: any;
}

export interface UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION {
    type: typeof UPDATE_COMPANYMATERIAL_RECEIVER_LOADING;
    payload: boolean;
}

export interface UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION {
    type: typeof UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS;
    payload: any;
}

export interface SET_PAGE_ACTION {
    type: typeof SET_PAGE;
    payload: number;
}

export type CompanyMaterialState = {
    listLoading: boolean;
    listData: CompanyMaterialListResponse | null;
    createLoading: boolean;
    updateReceiverLoading: boolean;
    page: number;
};

export type CompanyMaterialAction =
    | FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION
    | FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION
    | CREATE_COMPANYMATERIAL_LOADING_ACTION
    | CREATE_COMPANYMATERIAL_SUCCESS_ACTION
    | UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION
    | UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION
    | SET_PAGE_ACTION;

export interface CompanyMaterialItem {
    _id: string;
    materialName: string;
    companyName: string;
    quantity: number;
    unit: string;
    receivedBy: string;
    receivedById: string;
    receivedAt: string;
    inventoryLocation: string;
}

export interface CompanyMaterialListResponse {
    data: CompanyMaterialItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

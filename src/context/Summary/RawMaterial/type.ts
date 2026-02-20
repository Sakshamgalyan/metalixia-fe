export const FETCH_RAWMATERIAL_LIST_LOADING = "FETCH_RAWMATERIAL_LIST_LOADING";
export const FETCH_RAWMATERIAL_LIST_SUCCESS = "FETCH_RAWMATERIAL_LIST_SUCCESS";
export const CREATE_RAWMATERIAL_LOADING = "CREATE_RAWMATERIAL_LOADING";
export const CREATE_RAWMATERIAL_SUCCESS = "CREATE_RAWMATERIAL_SUCCESS";
export const SET_PAGE = "SET_PAGE";

export interface FETCH_RAWMATERIAL_LIST_LOADING_ACTION {
    type: typeof FETCH_RAWMATERIAL_LIST_LOADING;
    payload: boolean;
}

export interface FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION {
    type: typeof FETCH_RAWMATERIAL_LIST_SUCCESS;
    payload: RawMaterialListResponse;
}

export interface CREATE_RAWMATERIAL_LOADING_ACTION {
    type: typeof CREATE_RAWMATERIAL_LOADING;
    payload: boolean;
}

export interface CREATE_RAWMATERIAL_SUCCESS_ACTION {
    type: typeof CREATE_RAWMATERIAL_SUCCESS;
    payload: any;
}

export interface SET_PAGE_ACTION {
    type: typeof SET_PAGE;
    payload: number;
}

export type RawMaterialState = {
    listLoading: boolean;
    listData: RawMaterialListResponse | null;
    createLoading: boolean;
    page: number;
};

export type RawMaterialAction =
    | FETCH_RAWMATERIAL_LIST_LOADING_ACTION
    | FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION
    | CREATE_RAWMATERIAL_LOADING_ACTION
    | CREATE_RAWMATERIAL_SUCCESS_ACTION
    | SET_PAGE_ACTION;

export interface RawMaterialItem {
    _id: string;
    materialName: string;
    quantity: number;
    unit: string;
    price: number;
    source: string;
    receivedBy: string;
    receivedById: string;
    receivedAt: string;
}

export interface RawMaterialListResponse {
    data: RawMaterialItem[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

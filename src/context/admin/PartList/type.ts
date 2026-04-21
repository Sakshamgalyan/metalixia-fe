export const FETCH_PART_LIST_LOADING = "FETCH_PART_LIST_LOADING";
export const FETCH_PART_LIST_SUCCESS = "FETCH_PART_LIST_SUCCESS";
export const SET_PAGE = "SET_PAGE";
export const SET_MODAL = "SET_MODAL";
export const ACTION_LOADING = "ACTION_LOADING";
export const ACTION_SUCCESS = "ACTION_SUCCESS";
export const FETCH_COMPANIES_LIST_LOADING = "FETCH_COMPANIES_LIST_LOADING";
export const FETCH_COMPANIES_LIST_SUCCESS = "FETCH_COMPANIES_LIST_SUCCESS";

export interface FETCH_PART_LIST_LOADING_ACTION {
  type: typeof FETCH_PART_LIST_LOADING;
  payload: boolean;
}

export interface FETCH_PART_LIST_SUCCESS_ACTION {
  type: typeof FETCH_PART_LIST_SUCCESS;
  payload: PartListResponse;
}

export interface SET_PAGE_ACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export type ModalMode = "add" | "edit" | null;

export interface ModalState {
  mode: ModalMode;
  selectedItem: PartItem | null;
}

export interface SET_MODAL_ACTION {
  type: typeof SET_MODAL;
  payload: ModalState;
}

export interface ACTION_LOADING_ACTION {
  type: typeof ACTION_LOADING;
  payload: boolean;
}

export interface ACTION_SUCCESS_ACTION {
  type: typeof ACTION_SUCCESS;
}

export interface FETCH_COMPANIES_LIST_LOADING_ACTION {
  type: typeof FETCH_COMPANIES_LIST_LOADING;
  payload: boolean;
}

export interface FETCH_COMPANIES_LIST_SUCCESS_ACTION {
  type: typeof FETCH_COMPANIES_LIST_SUCCESS;
  payload: CompanyItem[];
}

export type PartAction =
  | FETCH_PART_LIST_LOADING_ACTION
  | FETCH_PART_LIST_SUCCESS_ACTION
  | SET_PAGE_ACTION
  | SET_MODAL_ACTION
  | ACTION_LOADING_ACTION
  | ACTION_SUCCESS_ACTION
  | FETCH_COMPANIES_LIST_LOADING_ACTION
  | FETCH_COMPANIES_LIST_SUCCESS_ACTION;

export interface PartItem {
  _id: string;
  companyId?: string;
  companyName?: string;
  partName: string;
  partNumber: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PartListResponse {
  data: PartItem[];
  totalCount: number;
  currentPage: number;
  limit: number;
  totalPages: number;
}

export interface PartState {
  listData: PartListResponse | null;
  listLoading: boolean;
  page: number;
  modal: ModalState;
  actionLoading: boolean;
  companiesList: CompanyItem[];
  companiesListLoading: boolean;
}

export interface CompanyItem {
  label: string;
  value: string;
}

export const FETCH_COMPANYMATERIAL_LIST_LOADING =
  'FETCH_COMPANYMATERIAL_LIST_LOADING';
export const FETCH_COMPANYMATERIAL_LIST_SUCCESS =
  'FETCH_COMPANYMATERIAL_LIST_SUCCESS';
export const CREATE_COMPANYMATERIAL_LOADING = 'CREATE_COMPANYMATERIAL_LOADING';
export const CREATE_COMPANYMATERIAL_SUCCESS = 'CREATE_COMPANYMATERIAL_SUCCESS';
export const UPDATE_COMPANYMATERIAL_RECEIVER_LOADING =
  'UPDATE_COMPANYMATERIAL_RECEIVER_LOADING';
export const UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS =
  'UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS';
export const UPDATE_COMPANYMATERIAL_LOADING = 'UPDATE_COMPANYMATERIAL_LOADING';
export const UPDATE_COMPANYMATERIAL_SUCCESS = 'UPDATE_COMPANYMATERIAL_SUCCESS';
export const FETCH_COMPANYMATERIAL_STATS_LOADING =
  'FETCH_COMPANYMATERIAL_STATS_LOADING';
export const FETCH_COMPANYMATERIAL_STATS_SUCCESS =
  'FETCH_COMPANYMATERIAL_STATS_SUCCESS';
export const FETCH_COMPANIES_LIST_LOADING = 'FETCH_COMPANIES_LIST_LOADING';
export const FETCH_COMPANIES_LIST_SUCCESS = 'FETCH_COMPANIES_LIST_SUCCESS';
export const FETCH_COMPANY_PARTS_LOADING = 'FETCH_COMPANY_PARTS_LOADING';
export const FETCH_COMPANY_PARTS_SUCCESS = 'FETCH_COMPANY_PARTS_SUCCESS';
export const SET_PAGE = 'SET_PAGE';
export const SET_MODAL = 'SET_MODAL';

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

export interface UPDATE_COMPANYMATERIAL_LOADING_ACTION {
  type: typeof UPDATE_COMPANYMATERIAL_LOADING;
  payload: boolean;
}

export interface UPDATE_COMPANYMATERIAL_SUCCESS_ACTION {
  type: typeof UPDATE_COMPANYMATERIAL_SUCCESS;
  payload: any;
}

export interface FETCH_COMPANYMATERIAL_STATS_LOADING_ACTION {
  type: typeof FETCH_COMPANYMATERIAL_STATS_LOADING;
  payload: boolean;
}

export interface FETCH_COMPANYMATERIAL_STATS_SUCCESS_ACTION {
  type: typeof FETCH_COMPANYMATERIAL_STATS_SUCCESS;
  payload: CompanyMaterialStats;
}

export interface FETCH_COMPANIES_LIST_LOADING_ACTION {
  type: typeof FETCH_COMPANIES_LIST_LOADING;
  payload: boolean;
}

export interface FETCH_COMPANIES_LIST_SUCCESS_ACTION {
  type: typeof FETCH_COMPANIES_LIST_SUCCESS;
  payload: any;
}

export interface FETCH_COMPANY_PARTS_LOADING_ACTION {
  type: typeof FETCH_COMPANY_PARTS_LOADING;
  payload: boolean;
}

export interface FETCH_COMPANY_PARTS_SUCCESS_ACTION {
  type: typeof FETCH_COMPANY_PARTS_SUCCESS;
  payload: any;
}

export interface SET_PAGE_ACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export type ModalMode = 'add' | 'edit' | 'receive' | null;

export interface ModalState {
  mode: ModalMode;
  selectedItem: CompanyMaterialItem | null;
}

export interface SET_MODAL_ACTION {
  type: typeof SET_MODAL;
  payload: ModalState;
}

export type CompanyMaterialState = {
  listLoading: boolean;
  listData: CompanyMaterialListResponse | null;
  createLoading: boolean;
  updateReceiverLoading: boolean;
  updateLoading: boolean;
  statsLoading: boolean;
  statsData: CompanyMaterialStats | null;
  page: number;
  companiesListLoading: boolean;
  companiesListData: CompanyList[];
  companyPartsLoading: boolean;
  companyPartsData: CompanyPart[];
  modal: ModalState;
};

export type CompanyMaterialAction =
  | FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION
  | FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION
  | CREATE_COMPANYMATERIAL_LOADING_ACTION
  | CREATE_COMPANYMATERIAL_SUCCESS_ACTION
  | UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION
  | UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION
  | UPDATE_COMPANYMATERIAL_LOADING_ACTION
  | UPDATE_COMPANYMATERIAL_SUCCESS_ACTION
  | FETCH_COMPANYMATERIAL_STATS_LOADING_ACTION
  | FETCH_COMPANYMATERIAL_STATS_SUCCESS_ACTION
  | SET_PAGE_ACTION
  | FETCH_COMPANY_PARTS_LOADING_ACTION
  | FETCH_COMPANY_PARTS_SUCCESS_ACTION
  | FETCH_COMPANIES_LIST_LOADING_ACTION
  | FETCH_COMPANIES_LIST_SUCCESS_ACTION
  | SET_MODAL_ACTION;

export interface CompanyMaterialItem {
  _id: string;
  partName: string;
  partNumber: string;
  companyName: string;
  companyId: string;
  partId: string;
  quantity: number;
  unit: string;
  receivedBy: string;
  receivedById: string;
  inventoryLocation: string;
  expectedOn: string | null;
  deliveryBy: string | null;
  receivedOn: string | null;
  createdAt: string;
  updatedAt: string;
}

import { PaginatedResponse } from '@/types/common';

export interface CompanyMaterialListResponse extends PaginatedResponse<CompanyMaterialItem> {}

export interface DailyCount {
  date: string;
  count: number;
  totalQuantity: number;
}

export interface CompanyMaterialStats {
  dailyCounts: DailyCount[];
  totalThisWeek: number;
  totalQuantityThisWeek: number;
  activeCompanies: number;
}

export interface CompanyList {
  value: string;
  label: string;
}

export interface CompanyPart {
  value: string;
  label: string;
}

export interface CreateCompanyMaterialRequest {
  partName: string;
  partNumber: string;
  companyName: string;
  companyId: string;
  partId: string;
  quantity: number;
  unit: string;
  inventoryLocation: string;
  expectedOn?: string | null;
  deliveryBy?: string | null;
}

export type UpdateCompanyMaterialRequest =
  Partial<CreateCompanyMaterialRequest>;

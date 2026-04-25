export const FETCH_RAWMATERIAL_LIST_LOADING = 'FETCH_RAWMATERIAL_LIST_LOADING';
export const FETCH_RAWMATERIAL_LIST_SUCCESS = 'FETCH_RAWMATERIAL_LIST_SUCCESS';
export const CREATE_RAWMATERIAL_LOADING = 'CREATE_RAWMATERIAL_LOADING';
export const CREATE_RAWMATERIAL_SUCCESS = 'CREATE_RAWMATERIAL_SUCCESS';
export const UPDATE_RAWMATERIAL_LOADING = 'UPDATE_RAWMATERIAL_LOADING';
export const UPDATE_RAWMATERIAL_SUCCESS = 'UPDATE_RAWMATERIAL_SUCCESS';
export const RECEIVE_RAWMATERIAL_LOADING = 'RECEIVE_RAWMATERIAL_LOADING';
export const RECEIVE_RAWMATERIAL_SUCCESS = 'RECEIVE_RAWMATERIAL_SUCCESS';
export const SET_PAGE = 'SET_PAGE';
export const SET_MODAL = 'SET_MODAL';
export const FETCH_RAWMATERIAL_STATS_LOADING =
  'FETCH_RAWMATERIAL_STATS_LOADING';
export const FETCH_RAWMATERIAL_STATS_SUCCESS =
  'FETCH_RAWMATERIAL_STATS_SUCCESS';

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
  payload: RawMaterialItem;
}

export interface UPDATE_RAWMATERIAL_LOADING_ACTION {
  type: typeof UPDATE_RAWMATERIAL_LOADING;
  payload: boolean;
}

export interface UPDATE_RAWMATERIAL_SUCCESS_ACTION {
  type: typeof UPDATE_RAWMATERIAL_SUCCESS;
  payload: RawMaterialItem;
}

export interface RECEIVE_RAWMATERIAL_LOADING_ACTION {
  type: typeof RECEIVE_RAWMATERIAL_LOADING;
  payload: boolean;
}

export interface RECEIVE_RAWMATERIAL_SUCCESS_ACTION {
  type: typeof RECEIVE_RAWMATERIAL_SUCCESS;
  payload: RawMaterialItem;
}

export interface SET_PAGE_ACTION {
  type: typeof SET_PAGE;
  payload: number;
}

export type ModalMode = 'add' | 'edit' | 'receive' | 'export' | null;

export interface ModalState {
  isOpen: boolean;
  type: ModalMode;
  selectedItem: RawMaterialItem | null;
}

export interface SET_MODAL_ACTION {
  type: typeof SET_MODAL;
  payload: ModalState;
}

export interface FETCH_RAWMATERIAL_STATS_LOADING_ACTION {
  type: typeof FETCH_RAWMATERIAL_STATS_LOADING;
  payload: boolean;
}

export interface FETCH_RAWMATERIAL_STATS_SUCCESS_ACTION {
  type: typeof FETCH_RAWMATERIAL_STATS_SUCCESS;
  payload: RawMaterialStats;
}

export type RawMaterialState = {
  listLoading: boolean;
  listData: RawMaterialListResponse | null;
  statsData: RawMaterialStats | null;
  statsLoading: boolean;
  createLoading: boolean;
  updateLoading: boolean;
  receiveLoading: boolean;
  page: number;
  modalState: ModalState;
};

export type RawMaterialAction =
  | FETCH_RAWMATERIAL_LIST_LOADING_ACTION
  | FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION
  | CREATE_RAWMATERIAL_LOADING_ACTION
  | CREATE_RAWMATERIAL_SUCCESS_ACTION
  | UPDATE_RAWMATERIAL_LOADING_ACTION
  | UPDATE_RAWMATERIAL_SUCCESS_ACTION
  | RECEIVE_RAWMATERIAL_LOADING_ACTION
  | RECEIVE_RAWMATERIAL_SUCCESS_ACTION
  | SET_PAGE_ACTION
  | SET_MODAL_ACTION
  | FETCH_RAWMATERIAL_STATS_LOADING_ACTION
  | FETCH_RAWMATERIAL_STATS_SUCCESS_ACTION;

export interface RawMaterialStats {
  totalThisWeek: number;
  totalInvestmentThisWeek: number;
  activeSources: number;
  dailyCounts: {
    date: string;
    count: number;
    totalValue: number;
  }[];
}

export interface RawMaterialItem {
  _id: string;
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
  source: string;
  invoiceNumber: string;
  inventoryLocation: string;
  receivedBy: string;
  receivedById: string;
  receivedAt: string;
  expectedOn: string;
  isReceived: boolean;
  status: string;
}

import { PaginatedResponse } from '@/types/common';

export interface RawMaterialListResponse extends PaginatedResponse<RawMaterialItem> {}

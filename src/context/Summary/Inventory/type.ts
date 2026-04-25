import { PaginatedResponse } from '@/types/common';

// ── Action Types ──────────────────────────────────────────────
export const FETCH_INVENTORY_LIST_LOADING = 'FETCH_INVENTORY_LIST_LOADING';
export const FETCH_INVENTORY_LIST_SUCCESS = 'FETCH_INVENTORY_LIST_SUCCESS';
export const FETCH_INVENTORY_STATS_LOADING = 'FETCH_INVENTORY_STATS_LOADING';
export const FETCH_INVENTORY_STATS_SUCCESS = 'FETCH_INVENTORY_STATS_SUCCESS';
export const SET_INVENTORY_PAGE = 'SET_INVENTORY_PAGE';

// ── Action Interfaces ─────────────────────────────────────────
export interface FETCH_INVENTORY_LIST_LOADING_ACTION {
  type: typeof FETCH_INVENTORY_LIST_LOADING;
  payload: boolean;
}
export interface FETCH_INVENTORY_LIST_SUCCESS_ACTION {
  type: typeof FETCH_INVENTORY_LIST_SUCCESS;
  payload: InventoryListResponse;
}
export interface FETCH_INVENTORY_STATS_LOADING_ACTION {
  type: typeof FETCH_INVENTORY_STATS_LOADING;
  payload: boolean;
}
export interface FETCH_INVENTORY_STATS_SUCCESS_ACTION {
  type: typeof FETCH_INVENTORY_STATS_SUCCESS;
  payload: InventoryStats;
}
export interface SET_INVENTORY_PAGE_ACTION {
  type: typeof SET_INVENTORY_PAGE;
  payload: number;
}

export type InventoryAction =
  | FETCH_INVENTORY_LIST_LOADING_ACTION
  | FETCH_INVENTORY_LIST_SUCCESS_ACTION
  | FETCH_INVENTORY_STATS_LOADING_ACTION
  | FETCH_INVENTORY_STATS_SUCCESS_ACTION
  | SET_INVENTORY_PAGE_ACTION;

export interface InventoryItem {
  _id: string;
  sourceType: 'company' | 'raw';
  sourceId: string;
  materialName: string;
  partName: string;
  partNumber: string;
  companyName: string;
  quantity: number;
  originalQuantity: number;
  unit: string;
  inventoryLocation: string;
  minStock: number;
  status: string;
  receivedAt: string | null;
  receivedBy: string;
  receivedById: string;
  createdAt: string;
  updatedAt: string;
}

export interface InventoryListResponse extends PaginatedResponse<InventoryItem> {}

export interface InventoryStats {
  totalItems: number;
  totalCompany: number;
  totalRaw: number;
  lowStockCount: number;
  outOfStockCount: number;
  statusMap: Record<string, number>;
}

export interface InventoryState {
  listLoading: boolean;
  listData: InventoryListResponse | null;
  statsLoading: boolean;
  statsData: InventoryStats | null;
  page: number;
}

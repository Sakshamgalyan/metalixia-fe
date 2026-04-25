import { PaginatedResponse } from '@/types/common';

export const FETCH_QUALITY_LIST_LOADING = 'FETCH_QUALITY_LIST_LOADING';
export const FETCH_QUALITY_LIST_SUCCESS = 'FETCH_QUALITY_LIST_SUCCESS';
export const FETCH_QUALITY_STATS_LOADING = 'FETCH_QUALITY_STATS_LOADING';
export const FETCH_QUALITY_STATS_SUCCESS = 'FETCH_QUALITY_STATS_SUCCESS';
export const FETCH_QUALITY_PENDING_LOADING = 'FETCH_QUALITY_PENDING_LOADING';
export const FETCH_QUALITY_PENDING_SUCCESS = 'FETCH_QUALITY_PENDING_SUCCESS';
export const SET_QUALITY_PAGE = 'SET_QUALITY_PAGE';

export interface QualityParameter {
  name: string;
  expected: string;
  actual: string;
  passed: boolean;
}

export interface QualityCheckItem {
  _id: string;
  productionOrderId: string;
  batchId: string;
  companyName: string;
  partName: string;
  partNumber: string;
  quantity: number;
  inspectedBy: string;
  inspectedById: string;
  result: string;
  defectType: string | null;
  defectDescription: string | null;
  parameters: QualityParameter[];
  rejectionReason: string | null;
  inspectedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface QualityListResponse extends PaginatedResponse<QualityCheckItem> {}

export interface QualityDailyCount {
  date: string;
  passed: number;
  failed: number;
}

export interface DefectBreakdown {
  type: string;
  count: number;
}

export interface QualityStats {
  pendingCount: number;
  passedToday: number;
  failedToday: number;
  passRate: number;
  dailyCounts: QualityDailyCount[];
  defectBreakdown: DefectBreakdown[];
}

export interface PendingOrder {
  _id: string;
  batchId: string;
  companyName: string;
  partName: string;
  partNumber: string;
  quantity: number;
  unit: string;
  rejectionCount: number;
  completedAt: string | null;
}

export interface QualityState {
  listLoading: boolean;
  listData: QualityListResponse | null;
  statsLoading: boolean;
  statsData: QualityStats | null;
  pendingLoading: boolean;
  pendingData: PendingOrder[];
  page: number;
}

export interface FETCH_QUALITY_LIST_LOADING_ACTION {
  type: typeof FETCH_QUALITY_LIST_LOADING;
  payload: boolean;
}
export interface FETCH_QUALITY_LIST_SUCCESS_ACTION {
  type: typeof FETCH_QUALITY_LIST_SUCCESS;
  payload: QualityListResponse;
}
export interface FETCH_QUALITY_STATS_LOADING_ACTION {
  type: typeof FETCH_QUALITY_STATS_LOADING;
  payload: boolean;
}
export interface FETCH_QUALITY_STATS_SUCCESS_ACTION {
  type: typeof FETCH_QUALITY_STATS_SUCCESS;
  payload: QualityStats;
}
export interface FETCH_QUALITY_PENDING_LOADING_ACTION {
  type: typeof FETCH_QUALITY_PENDING_LOADING;
  payload: boolean;
}
export interface FETCH_QUALITY_PENDING_SUCCESS_ACTION {
  type: typeof FETCH_QUALITY_PENDING_SUCCESS;
  payload: PendingOrder[];
}
export interface SET_QUALITY_PAGE_ACTION {
  type: typeof SET_QUALITY_PAGE;
  payload: number;
}

export type QualityAction =
  | FETCH_QUALITY_LIST_LOADING_ACTION
  | FETCH_QUALITY_LIST_SUCCESS_ACTION
  | FETCH_QUALITY_STATS_LOADING_ACTION
  | FETCH_QUALITY_STATS_SUCCESS_ACTION
  | FETCH_QUALITY_PENDING_LOADING_ACTION
  | FETCH_QUALITY_PENDING_SUCCESS_ACTION
  | SET_QUALITY_PAGE_ACTION;

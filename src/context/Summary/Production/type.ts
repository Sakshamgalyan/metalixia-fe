import { PaginatedResponse } from "@/types/common";

export const FETCH_PRODUCTION_LIST_LOADING = "FETCH_PRODUCTION_LIST_LOADING";
export const FETCH_PRODUCTION_LIST_SUCCESS = "FETCH_PRODUCTION_LIST_SUCCESS";
export const FETCH_PRODUCTION_STATS_LOADING = "FETCH_PRODUCTION_STATS_LOADING";
export const FETCH_PRODUCTION_STATS_SUCCESS = "FETCH_PRODUCTION_STATS_SUCCESS";
export const FETCH_PRODUCTION_PIPELINE_LOADING = "FETCH_PRODUCTION_PIPELINE_LOADING";
export const FETCH_PRODUCTION_PIPELINE_SUCCESS = "FETCH_PRODUCTION_PIPELINE_SUCCESS";
export const SET_PRODUCTION_PAGE = "SET_PRODUCTION_PAGE";

export interface ProcessStep {
  name: string;
  status: string;
  startedAt: string | null;
  completedAt: string | null;
  notes: string;
}

export interface ProductionOrder {
  _id: string;
  batchId: string;
  companyMaterialId?: string;
  rawMaterialId?: string;
  companyName: string;
  partName: string;
  partNumber: string;
  quantity: number;
  unit: string;
  processes: ProcessStep[];
  currentProcess: number;
  lineNumber: number;
  status: string;
  priority: string;
  assignedTo?: string;
  rejectionCount: number;
  startedAt: string | null;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProductionListResponse extends PaginatedResponse<ProductionOrder> {}

export interface ProcessCount {
  name: string;
  index: number;
  count: number;
}

export interface DailyCount {
  date: string;
  count: number;
}

export interface ProductionStats {
  statusMap: Record<string, number>;
  inProduction: number;
  queued: number;
  qualityCheck: number;
  readyForDispatch: number;
  completedToday: number;
  rejectionRate: number;
  activeLines: number;
  dailyCounts: DailyCount[];
  processCounts: ProcessCount[];
}

export interface ProductionState {
  listLoading: boolean;
  listData: ProductionListResponse | null;
  statsLoading: boolean;
  statsData: ProductionStats | null;
  pipelineLoading: boolean;
  pipelineData: ProductionOrder[];
  page: number;
}

export interface FETCH_PRODUCTION_LIST_LOADING_ACTION { type: typeof FETCH_PRODUCTION_LIST_LOADING; payload: boolean; }
export interface FETCH_PRODUCTION_LIST_SUCCESS_ACTION { type: typeof FETCH_PRODUCTION_LIST_SUCCESS; payload: ProductionListResponse; }
export interface FETCH_PRODUCTION_STATS_LOADING_ACTION { type: typeof FETCH_PRODUCTION_STATS_LOADING; payload: boolean; }
export interface FETCH_PRODUCTION_STATS_SUCCESS_ACTION { type: typeof FETCH_PRODUCTION_STATS_SUCCESS; payload: ProductionStats; }
export interface FETCH_PRODUCTION_PIPELINE_LOADING_ACTION { type: typeof FETCH_PRODUCTION_PIPELINE_LOADING; payload: boolean; }
export interface FETCH_PRODUCTION_PIPELINE_SUCCESS_ACTION { type: typeof FETCH_PRODUCTION_PIPELINE_SUCCESS; payload: ProductionOrder[]; }
export interface SET_PRODUCTION_PAGE_ACTION { type: typeof SET_PRODUCTION_PAGE; payload: number; }

export type ProductionAction =
  | FETCH_PRODUCTION_LIST_LOADING_ACTION
  | FETCH_PRODUCTION_LIST_SUCCESS_ACTION
  | FETCH_PRODUCTION_STATS_LOADING_ACTION
  | FETCH_PRODUCTION_STATS_SUCCESS_ACTION
  | FETCH_PRODUCTION_PIPELINE_LOADING_ACTION
  | FETCH_PRODUCTION_PIPELINE_SUCCESS_ACTION
  | SET_PRODUCTION_PAGE_ACTION;

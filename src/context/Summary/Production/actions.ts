import {
  FETCH_PRODUCTION_LIST_LOADING,
  FETCH_PRODUCTION_LIST_SUCCESS,
  FETCH_PRODUCTION_STATS_LOADING,
  FETCH_PRODUCTION_STATS_SUCCESS,
  FETCH_PRODUCTION_PIPELINE_LOADING,
  FETCH_PRODUCTION_PIPELINE_SUCCESS,
  SET_PRODUCTION_PAGE,
  ProductionListResponse,
  ProductionStats,
  ProductionOrder,
  FETCH_PRODUCTION_LIST_LOADING_ACTION,
  FETCH_PRODUCTION_LIST_SUCCESS_ACTION,
  FETCH_PRODUCTION_STATS_LOADING_ACTION,
  FETCH_PRODUCTION_STATS_SUCCESS_ACTION,
  FETCH_PRODUCTION_PIPELINE_LOADING_ACTION,
  FETCH_PRODUCTION_PIPELINE_SUCCESS_ACTION,
  SET_PRODUCTION_PAGE_ACTION,
} from './type';

export const fetchProductionListLoading = (
  loading: boolean,
): FETCH_PRODUCTION_LIST_LOADING_ACTION => ({
  type: FETCH_PRODUCTION_LIST_LOADING,
  payload: loading,
});
export const fetchProductionListSuccess = (
  payload: ProductionListResponse,
): FETCH_PRODUCTION_LIST_SUCCESS_ACTION => ({
  type: FETCH_PRODUCTION_LIST_SUCCESS,
  payload,
});
export const fetchProductionStatsLoading = (
  loading: boolean,
): FETCH_PRODUCTION_STATS_LOADING_ACTION => ({
  type: FETCH_PRODUCTION_STATS_LOADING,
  payload: loading,
});
export const fetchProductionStatsSuccess = (
  payload: ProductionStats,
): FETCH_PRODUCTION_STATS_SUCCESS_ACTION => ({
  type: FETCH_PRODUCTION_STATS_SUCCESS,
  payload,
});
export const fetchProductionPipelineLoading = (
  loading: boolean,
): FETCH_PRODUCTION_PIPELINE_LOADING_ACTION => ({
  type: FETCH_PRODUCTION_PIPELINE_LOADING,
  payload: loading,
});
export const fetchProductionPipelineSuccess = (
  payload: ProductionOrder[],
): FETCH_PRODUCTION_PIPELINE_SUCCESS_ACTION => ({
  type: FETCH_PRODUCTION_PIPELINE_SUCCESS,
  payload,
});
export const setProductionPage = (
  page: number,
): SET_PRODUCTION_PAGE_ACTION => ({ type: SET_PRODUCTION_PAGE, payload: page });

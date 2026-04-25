import {
  FETCH_QUALITY_LIST_LOADING,
  FETCH_QUALITY_LIST_SUCCESS,
  FETCH_QUALITY_STATS_LOADING,
  FETCH_QUALITY_STATS_SUCCESS,
  FETCH_QUALITY_PENDING_LOADING,
  FETCH_QUALITY_PENDING_SUCCESS,
  SET_QUALITY_PAGE,
  QualityListResponse,
  QualityStats,
  PendingOrder,
  FETCH_QUALITY_LIST_LOADING_ACTION,
  FETCH_QUALITY_LIST_SUCCESS_ACTION,
  FETCH_QUALITY_STATS_LOADING_ACTION,
  FETCH_QUALITY_STATS_SUCCESS_ACTION,
  FETCH_QUALITY_PENDING_LOADING_ACTION,
  FETCH_QUALITY_PENDING_SUCCESS_ACTION,
  SET_QUALITY_PAGE_ACTION,
} from './type';

export const fetchQualityListLoading = (
  loading: boolean,
): FETCH_QUALITY_LIST_LOADING_ACTION => ({
  type: FETCH_QUALITY_LIST_LOADING,
  payload: loading,
});
export const fetchQualityListSuccess = (
  payload: QualityListResponse,
): FETCH_QUALITY_LIST_SUCCESS_ACTION => ({
  type: FETCH_QUALITY_LIST_SUCCESS,
  payload,
});
export const fetchQualityStatsLoading = (
  loading: boolean,
): FETCH_QUALITY_STATS_LOADING_ACTION => ({
  type: FETCH_QUALITY_STATS_LOADING,
  payload: loading,
});
export const fetchQualityStatsSuccess = (
  payload: QualityStats,
): FETCH_QUALITY_STATS_SUCCESS_ACTION => ({
  type: FETCH_QUALITY_STATS_SUCCESS,
  payload,
});
export const fetchQualityPendingLoading = (
  loading: boolean,
): FETCH_QUALITY_PENDING_LOADING_ACTION => ({
  type: FETCH_QUALITY_PENDING_LOADING,
  payload: loading,
});
export const fetchQualityPendingSuccess = (
  payload: PendingOrder[],
): FETCH_QUALITY_PENDING_SUCCESS_ACTION => ({
  type: FETCH_QUALITY_PENDING_SUCCESS,
  payload,
});
export const setQualityPage = (page: number): SET_QUALITY_PAGE_ACTION => ({
  type: SET_QUALITY_PAGE,
  payload: page,
});

import {
  FETCH_INVENTORY_LIST_LOADING,
  FETCH_INVENTORY_LIST_LOADING_ACTION,
  FETCH_INVENTORY_LIST_SUCCESS,
  FETCH_INVENTORY_LIST_SUCCESS_ACTION,
  FETCH_INVENTORY_STATS_LOADING,
  FETCH_INVENTORY_STATS_LOADING_ACTION,
  FETCH_INVENTORY_STATS_SUCCESS,
  FETCH_INVENTORY_STATS_SUCCESS_ACTION,
  SET_INVENTORY_PAGE,
  SET_INVENTORY_PAGE_ACTION,
  InventoryListResponse,
  InventoryStats,
} from "./type";

export const fetchInventoryListLoading = (
  loading: boolean,
): FETCH_INVENTORY_LIST_LOADING_ACTION => ({
  type: FETCH_INVENTORY_LIST_LOADING,
  payload: loading,
});

export const fetchInventoryListSuccess = (
  payload: InventoryListResponse,
): FETCH_INVENTORY_LIST_SUCCESS_ACTION => ({
  type: FETCH_INVENTORY_LIST_SUCCESS,
  payload,
});

export const fetchInventoryStatsLoading = (
  loading: boolean,
): FETCH_INVENTORY_STATS_LOADING_ACTION => ({
  type: FETCH_INVENTORY_STATS_LOADING,
  payload: loading,
});

export const fetchInventoryStatsSuccess = (
  payload: InventoryStats,
): FETCH_INVENTORY_STATS_SUCCESS_ACTION => ({
  type: FETCH_INVENTORY_STATS_SUCCESS,
  payload,
});

export const setInventoryPage = (
  page: number,
): SET_INVENTORY_PAGE_ACTION => ({
  type: SET_INVENTORY_PAGE,
  payload: page,
});

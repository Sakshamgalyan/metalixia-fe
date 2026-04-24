import type { Reducer } from "react";
import {
  InventoryState,
  InventoryAction,
  FETCH_INVENTORY_LIST_LOADING,
  FETCH_INVENTORY_LIST_SUCCESS,
  FETCH_INVENTORY_STATS_LOADING,
  FETCH_INVENTORY_STATS_SUCCESS,
  SET_INVENTORY_PAGE,
} from "./type";

export const initialState: InventoryState = {
  listLoading: false,
  listData: null,
  statsLoading: false,
  statsData: null,
  page: 1,
};

const reducer: Reducer<InventoryState, InventoryAction> = (state, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_LIST_LOADING:
      return { ...state, listLoading: action.payload };
    case FETCH_INVENTORY_LIST_SUCCESS:
      return { ...state, listData: action.payload };
    case FETCH_INVENTORY_STATS_LOADING:
      return { ...state, statsLoading: action.payload };
    case FETCH_INVENTORY_STATS_SUCCESS:
      return { ...state, statsData: action.payload };
    case SET_INVENTORY_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default reducer;

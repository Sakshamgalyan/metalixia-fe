import type { Reducer } from "react";
import {
  QualityState, QualityAction,
  FETCH_QUALITY_LIST_LOADING, FETCH_QUALITY_LIST_SUCCESS,
  FETCH_QUALITY_STATS_LOADING, FETCH_QUALITY_STATS_SUCCESS,
  FETCH_QUALITY_PENDING_LOADING, FETCH_QUALITY_PENDING_SUCCESS,
  SET_QUALITY_PAGE,
} from "./type";

export const initialState: QualityState = {
  listLoading: false, listData: null,
  statsLoading: false, statsData: null,
  pendingLoading: false, pendingData: [],
  page: 1,
};

const reducer: Reducer<QualityState, QualityAction> = (state, action) => {
  switch (action.type) {
    case FETCH_QUALITY_LIST_LOADING: return { ...state, listLoading: action.payload };
    case FETCH_QUALITY_LIST_SUCCESS: return { ...state, listData: action.payload };
    case FETCH_QUALITY_STATS_LOADING: return { ...state, statsLoading: action.payload };
    case FETCH_QUALITY_STATS_SUCCESS: return { ...state, statsData: action.payload };
    case FETCH_QUALITY_PENDING_LOADING: return { ...state, pendingLoading: action.payload };
    case FETCH_QUALITY_PENDING_SUCCESS: return { ...state, pendingData: action.payload };
    case SET_QUALITY_PAGE: return { ...state, page: action.payload };
    default: return state;
  }
};
export default reducer;

import type { Reducer } from 'react';
import {
  ProductionState,
  ProductionAction,
  FETCH_PRODUCTION_LIST_LOADING,
  FETCH_PRODUCTION_LIST_SUCCESS,
  FETCH_PRODUCTION_STATS_LOADING,
  FETCH_PRODUCTION_STATS_SUCCESS,
  FETCH_PRODUCTION_PIPELINE_LOADING,
  FETCH_PRODUCTION_PIPELINE_SUCCESS,
  SET_PRODUCTION_PAGE,
} from './type';

export const initialState: ProductionState = {
  listLoading: false,
  listData: null,
  statsLoading: false,
  statsData: null,
  pipelineLoading: false,
  pipelineData: [],
  page: 1,
};

const reducer: Reducer<ProductionState, ProductionAction> = (state, action) => {
  switch (action.type) {
    case FETCH_PRODUCTION_LIST_LOADING:
      return { ...state, listLoading: action.payload };
    case FETCH_PRODUCTION_LIST_SUCCESS:
      return { ...state, listData: action.payload };
    case FETCH_PRODUCTION_STATS_LOADING:
      return { ...state, statsLoading: action.payload };
    case FETCH_PRODUCTION_STATS_SUCCESS:
      return { ...state, statsData: action.payload };
    case FETCH_PRODUCTION_PIPELINE_LOADING:
      return { ...state, pipelineLoading: action.payload };
    case FETCH_PRODUCTION_PIPELINE_SUCCESS:
      return { ...state, pipelineData: action.payload };
    case SET_PRODUCTION_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};

export default reducer;

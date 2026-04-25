import type { Reducer } from 'react';
import {
  RawMaterialState,
  RawMaterialAction,
  FETCH_RAWMATERIAL_LIST_LOADING,
  FETCH_RAWMATERIAL_LIST_SUCCESS,
  CREATE_RAWMATERIAL_LOADING,
  CREATE_RAWMATERIAL_SUCCESS,
  UPDATE_RAWMATERIAL_LOADING,
  UPDATE_RAWMATERIAL_SUCCESS,
  RECEIVE_RAWMATERIAL_LOADING,
  RECEIVE_RAWMATERIAL_SUCCESS,
  SET_PAGE,
  SET_MODAL,
  FETCH_RAWMATERIAL_STATS_LOADING,
  FETCH_RAWMATERIAL_STATS_SUCCESS,
} from './type';

export const initialState: RawMaterialState = {
  listLoading: false,
  listData: null,
  statsData: null,
  statsLoading: false,
  createLoading: false,
  updateLoading: false,
  receiveLoading: false,
  page: 1,
  modalState: {
    isOpen: false,
    type: null,
    selectedItem: null,
  },
};

const reducer: Reducer<RawMaterialState, RawMaterialAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case FETCH_RAWMATERIAL_STATS_LOADING:
      return {
        ...state,
        statsLoading: action.payload,
      };
    case FETCH_RAWMATERIAL_STATS_SUCCESS:
      return {
        ...state,
        statsData: action.payload,
      };
    case FETCH_RAWMATERIAL_LIST_LOADING:
      return {
        ...state,
        listLoading: action.payload,
      };
    case FETCH_RAWMATERIAL_LIST_SUCCESS:
      return {
        ...state,
        listData: action.payload,
      };
    case CREATE_RAWMATERIAL_LOADING:
      return {
        ...state,
        createLoading: action.payload,
      };
    case CREATE_RAWMATERIAL_SUCCESS:
      return {
        ...state,
      };
    case UPDATE_RAWMATERIAL_LOADING:
      return {
        ...state,
        updateLoading: action.payload,
      };
    case UPDATE_RAWMATERIAL_SUCCESS:
      return {
        ...state,
      };
    case RECEIVE_RAWMATERIAL_LOADING:
      return {
        ...state,
        receiveLoading: action.payload,
      };
    case RECEIVE_RAWMATERIAL_SUCCESS:
      return {
        ...state,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_MODAL:
      return {
        ...state,
        modalState: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;

import type { Reducer } from 'react';
import {
  PartState,
  PartAction,
  FETCH_PART_LIST_LOADING,
  FETCH_PART_LIST_SUCCESS,
  SET_PAGE,
  SET_MODAL,
  ACTION_LOADING,
  ACTION_SUCCESS,
  FETCH_COMPANIES_LIST_SUCCESS,
  FETCH_COMPANIES_LIST_LOADING,
  TOGGLE_PART_STATUS,
} from './type';

export const initialState: PartState = {
  listData: null,
  listLoading: false,
  page: 1,
  modal: {
    mode: null,
    selectedItem: null,
  },
  actionLoading: false,
  companiesList: [],
  companiesListLoading: false,
};

const reducer: Reducer<PartState, PartAction> = (state, action) => {
  switch (action.type) {
    case FETCH_PART_LIST_LOADING:
      return { ...state, listLoading: action.payload };
    case FETCH_PART_LIST_SUCCESS:
      return { ...state, listData: action.payload, listLoading: false };
    case SET_PAGE:
      return { ...state, page: action.payload };
    case SET_MODAL:
      return { ...state, modal: action.payload };
    case ACTION_LOADING:
      return { ...state, actionLoading: action.payload };
    case ACTION_SUCCESS:
      return {
        ...state,
        actionLoading: false,
        modal: { mode: null, selectedItem: null },
      };
    case FETCH_COMPANIES_LIST_LOADING:
      return { ...state, companiesListLoading: action.payload };
    case FETCH_COMPANIES_LIST_SUCCESS:
      return { ...state, companiesList: action.payload };
    case TOGGLE_PART_STATUS:
      if (!state.listData) return state;
      return {
        ...state,
        listData: {
          ...state.listData,
          data: state.listData.data.map((part) =>
            part._id === action.payload
              ? { ...part, isActive: !part.isActive }
              : part,
          ),
        },
      };
    default:
      return state;
  }
};

export default reducer;

import type { Reducer } from "react";
import { EmployeeListState, EmployeeListAction, SET_FILTER_ROLE, SET_FILTER_POST, SET_LOADING, SET_PAGE, SET_FILTER_DATA, SET_FILTER_PAYLOAD } from "./type";

export const initialState: EmployeeListState = {
    filterRole: null,
    filterPost: null,
    loading: false,
    page: 1,
    filterData: null,
    filterPayload: null,
};

const reducer: Reducer<EmployeeListState, EmployeeListAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case SET_FILTER_POST:
      return {
        ...state,
        filterPost: action.payload,
      };
    case SET_FILTER_ROLE:
      return {
        ...state,
        filterRole: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case SET_FILTER_DATA:
      return {
        ...state,
        filterData: action.payload,
      };
    case SET_FILTER_PAYLOAD:
      return {
        ...state,
        filterPayload: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;

import {
  SETLOADINGACTION,
  SETPAGEACTION,
  SETFILTERDATACTION,
  SETFILTERPAYLOADACTION,
  SET_FILTER_ROLE,
  SET_FILTER_PAYLOAD,
  SET_LOADING,
  SET_PAGE,
  SET_FILTER_DATA,
  SETFILTERPOSTACTION,
  SET_FILTER_POST,
  SETFILTERROLEACTION,
} from "./type";

export const setFilterPost = (
  filterPost: string[],
): SETFILTERPOSTACTION => ({
  type: SET_FILTER_POST,
  payload: filterPost,
});

export const setFilterRole = (
  filterRole: string[],
): SETFILTERROLEACTION => ({
  type: SET_FILTER_ROLE,
  payload: filterRole,
});

export const setLoading = (
  loading: boolean,
): SETLOADINGACTION => ({
  type: SET_LOADING,
  payload: loading,
});

export const setPage = (
  page: number,
): SETPAGEACTION => ({
  type: SET_PAGE,
  payload: page,
});

export const setFilterData = (
  filterData: any,
): SETFILTERDATACTION => ({
  type: SET_FILTER_DATA,
  payload: filterData,
});

export const setFilterPayload = (
  filterPayload: any,
): SETFILTERPAYLOADACTION => ({
  type: SET_FILTER_PAYLOAD,
  payload: filterPayload,
});
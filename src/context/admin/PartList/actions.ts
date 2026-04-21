import {
  PartAction,
  PartListResponse,
  ModalState,
  FETCH_PART_LIST_LOADING,
  FETCH_PART_LIST_SUCCESS,
  SET_PAGE,
  SET_MODAL,
  ACTION_LOADING,
  ACTION_SUCCESS,
  FETCH_COMPANIES_LIST_LOADING,
  FETCH_COMPANIES_LIST_SUCCESS,
  CompanyItem,
} from "./type";

export const fetchPartListLoading = (loading: boolean): PartAction => ({
  type: FETCH_PART_LIST_LOADING,
  payload: loading,
});

export const fetchPartListSuccess = (data: PartListResponse): PartAction => ({
  type: FETCH_PART_LIST_SUCCESS,
  payload: data,
});

export const setPage = (page: number): PartAction => ({
  type: SET_PAGE,
  payload: page,
});

export const setModal = (modalState: ModalState): PartAction => ({
  type: SET_MODAL,
  payload: modalState,
});

export const actionLoading = (loading: boolean): PartAction => ({
  type: ACTION_LOADING,
  payload: loading,
});

export const actionSuccess = (): PartAction => ({
  type: ACTION_SUCCESS,
});

export const fetchCompaniesListLoading = (loading: boolean): PartAction => ({
  type: FETCH_COMPANIES_LIST_LOADING,
  payload: loading,
});

export const fetchCompaniesListSuccess = (data: CompanyItem[]): PartAction => ({
  type: FETCH_COMPANIES_LIST_SUCCESS,
  payload: data,
});

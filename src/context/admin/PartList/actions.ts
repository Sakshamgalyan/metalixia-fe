import { PartAction, PartListResponse, PartState } from "./type";

export const fetchPartListLoading = (loading: boolean): PartAction => ({
  type: "FETCH_PART_LIST_LOADING",
  payload: loading,
});

export const fetchPartListSuccess = (data: PartListResponse): PartAction => ({
  type: "FETCH_PART_LIST_SUCCESS",
  payload: data,
});

export const setPage = (page: number): PartAction => ({
  type: "SET_PAGE",
  payload: page,
});

export const setModal = (modalState: PartState["modal"]): PartAction => ({
  type: "SET_MODAL",
  payload: modalState,
});

export const actionLoading = (loading: boolean): PartAction => ({
  type: "ACTION_LOADING",
  payload: loading,
});

export const actionSuccess = (): PartAction => ({
  type: "ACTION_SUCCESS",
});

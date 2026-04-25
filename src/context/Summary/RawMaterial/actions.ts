import {
  FETCH_RAWMATERIAL_LIST_LOADING,
  FETCH_RAWMATERIAL_LIST_LOADING_ACTION,
  FETCH_RAWMATERIAL_LIST_SUCCESS,
  FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION,
  CREATE_RAWMATERIAL_LOADING,
  CREATE_RAWMATERIAL_LOADING_ACTION,
  CREATE_RAWMATERIAL_SUCCESS,
  CREATE_RAWMATERIAL_SUCCESS_ACTION,
  UPDATE_RAWMATERIAL_LOADING,
  UPDATE_RAWMATERIAL_LOADING_ACTION,
  UPDATE_RAWMATERIAL_SUCCESS,
  UPDATE_RAWMATERIAL_SUCCESS_ACTION,
  RECEIVE_RAWMATERIAL_LOADING,
  RECEIVE_RAWMATERIAL_LOADING_ACTION,
  RECEIVE_RAWMATERIAL_SUCCESS,
  RECEIVE_RAWMATERIAL_SUCCESS_ACTION,
  SET_PAGE,
  SET_PAGE_ACTION,
  SET_MODAL,
  SET_MODAL_ACTION,
  RawMaterialListResponse,
  FETCH_RAWMATERIAL_STATS_LOADING,
  FETCH_RAWMATERIAL_STATS_LOADING_ACTION,
  FETCH_RAWMATERIAL_STATS_SUCCESS,
  FETCH_RAWMATERIAL_STATS_SUCCESS_ACTION,
  RawMaterialStats,
  RawMaterialItem,
  ModalState,
} from './type';

export const fetchRawMaterialStatsLoading = (
  loading: boolean,
): FETCH_RAWMATERIAL_STATS_LOADING_ACTION => ({
  type: FETCH_RAWMATERIAL_STATS_LOADING,
  payload: loading,
});

export const fetchRawMaterialStatsSuccess = (
  payload: RawMaterialStats,
): FETCH_RAWMATERIAL_STATS_SUCCESS_ACTION => ({
  type: FETCH_RAWMATERIAL_STATS_SUCCESS,
  payload,
});

export const fetchRawMaterialListLoading = (
  loading: boolean,
): FETCH_RAWMATERIAL_LIST_LOADING_ACTION => ({
  type: FETCH_RAWMATERIAL_LIST_LOADING,
  payload: loading,
});

export const fetchRawMaterialListSuccess = (
  payload: RawMaterialListResponse,
): FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION => ({
  type: FETCH_RAWMATERIAL_LIST_SUCCESS,
  payload,
});

export const createRawMaterialLoading = (
  loading: boolean,
): CREATE_RAWMATERIAL_LOADING_ACTION => ({
  type: CREATE_RAWMATERIAL_LOADING,
  payload: loading,
});

export const createRawMaterialSuccess = (
  payload: RawMaterialItem,
): CREATE_RAWMATERIAL_SUCCESS_ACTION => ({
  type: CREATE_RAWMATERIAL_SUCCESS,
  payload,
});

export const updateRawMaterialLoading = (
  loading: boolean,
): UPDATE_RAWMATERIAL_LOADING_ACTION => ({
  type: UPDATE_RAWMATERIAL_LOADING,
  payload: loading,
});

export const updateRawMaterialSuccess = (
  payload: RawMaterialItem,
): UPDATE_RAWMATERIAL_SUCCESS_ACTION => ({
  type: UPDATE_RAWMATERIAL_SUCCESS,
  payload,
});

export const receiveRawMaterialLoading = (
  loading: boolean,
): RECEIVE_RAWMATERIAL_LOADING_ACTION => ({
  type: RECEIVE_RAWMATERIAL_LOADING,
  payload: loading,
});

export const receiveRawMaterialSuccess = (
  payload: RawMaterialItem,
): RECEIVE_RAWMATERIAL_SUCCESS_ACTION => ({
  type: RECEIVE_RAWMATERIAL_SUCCESS,
  payload,
});

export const setPage = (page: number): SET_PAGE_ACTION => ({
  type: SET_PAGE,
  payload: page,
});

export const setModal = (modalState: ModalState): SET_MODAL_ACTION => ({
  type: SET_MODAL,
  payload: modalState,
});

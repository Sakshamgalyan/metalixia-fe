import {
  FETCH_RAWMATERIAL_LIST_LOADING,
  FETCH_RAWMATERIAL_LIST_LOADING_ACTION,
  FETCH_RAWMATERIAL_LIST_SUCCESS,
  FETCH_RAWMATERIAL_LIST_SUCCESS_ACTION,
  CREATE_RAWMATERIAL_LOADING,
  CREATE_RAWMATERIAL_LOADING_ACTION,
  CREATE_RAWMATERIAL_SUCCESS,
  CREATE_RAWMATERIAL_SUCCESS_ACTION,
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

export const setPage = (page: number): SET_PAGE_ACTION => ({
  type: SET_PAGE,
  payload: page,
});

export const setModal = (modalState: {
  isOpen: boolean;
  type: 'add' | 'export' | null;
}): SET_MODAL_ACTION => ({
  type: SET_MODAL,
  payload: modalState,
});

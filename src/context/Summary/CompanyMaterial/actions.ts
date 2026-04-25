import {
  FETCH_COMPANYMATERIAL_LIST_LOADING,
  FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION,
  FETCH_COMPANYMATERIAL_LIST_SUCCESS,
  FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION,
  CREATE_COMPANYMATERIAL_LOADING,
  CREATE_COMPANYMATERIAL_LOADING_ACTION,
  CREATE_COMPANYMATERIAL_SUCCESS,
  CREATE_COMPANYMATERIAL_SUCCESS_ACTION,
  UPDATE_COMPANYMATERIAL_RECEIVER_LOADING,
  UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION,
  UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS,
  UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION,
  UPDATE_COMPANYMATERIAL_LOADING,
  UPDATE_COMPANYMATERIAL_LOADING_ACTION,
  UPDATE_COMPANYMATERIAL_SUCCESS,
  UPDATE_COMPANYMATERIAL_SUCCESS_ACTION,
  FETCH_COMPANYMATERIAL_STATS_LOADING,
  FETCH_COMPANYMATERIAL_STATS_LOADING_ACTION,
  FETCH_COMPANYMATERIAL_STATS_SUCCESS,
  FETCH_COMPANYMATERIAL_STATS_SUCCESS_ACTION,
  FETCH_COMPANIES_LIST_LOADING,
  FETCH_COMPANIES_LIST_LOADING_ACTION,
  FETCH_COMPANIES_LIST_SUCCESS,
  FETCH_COMPANIES_LIST_SUCCESS_ACTION,
  FETCH_COMPANY_PARTS_LOADING,
  FETCH_COMPANY_PARTS_LOADING_ACTION,
  FETCH_COMPANY_PARTS_SUCCESS,
  FETCH_COMPANY_PARTS_SUCCESS_ACTION,
  CompanyPart,
  CompanyList,
  SET_PAGE,
  SET_PAGE_ACTION,
  SET_MODAL,
  SET_MODAL_ACTION,
  CompanyMaterialListResponse,
  CompanyMaterialStats,
  ModalState,
} from './type';

export const fetchCompanyMaterialListLoading = (
  loading: boolean,
): FETCH_COMPANYMATERIAL_LIST_LOADING_ACTION => ({
  type: FETCH_COMPANYMATERIAL_LIST_LOADING,
  payload: loading,
});

export const fetchCompanyMaterialListSuccess = (
  payload: CompanyMaterialListResponse,
): FETCH_COMPANYMATERIAL_LIST_SUCCESS_ACTION => ({
  type: FETCH_COMPANYMATERIAL_LIST_SUCCESS,
  payload,
});

export const createCompanyMaterialLoading = (
  loading: boolean,
): CREATE_COMPANYMATERIAL_LOADING_ACTION => ({
  type: CREATE_COMPANYMATERIAL_LOADING,
  payload: loading,
});

export const createCompanyMaterialSuccess = (
  payload: any,
): CREATE_COMPANYMATERIAL_SUCCESS_ACTION => ({
  type: CREATE_COMPANYMATERIAL_SUCCESS,
  payload,
});

export const updateCompanyMaterialReceiverLoading = (
  loading: boolean,
): UPDATE_COMPANYMATERIAL_RECEIVER_LOADING_ACTION => ({
  type: UPDATE_COMPANYMATERIAL_RECEIVER_LOADING,
  payload: loading,
});

export const updateCompanyMaterialReceiverSuccess = (
  payload: any,
): UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS_ACTION => ({
  type: UPDATE_COMPANYMATERIAL_RECEIVER_SUCCESS,
  payload,
});

export const updateCompanyMaterialLoading = (
  loading: boolean,
): UPDATE_COMPANYMATERIAL_LOADING_ACTION => ({
  type: UPDATE_COMPANYMATERIAL_LOADING,
  payload: loading,
});

export const updateCompanyMaterialSuccess = (
  payload: any,
): UPDATE_COMPANYMATERIAL_SUCCESS_ACTION => ({
  type: UPDATE_COMPANYMATERIAL_SUCCESS,
  payload,
});

export const fetchCompanyMaterialStatsLoading = (
  loading: boolean,
): FETCH_COMPANYMATERIAL_STATS_LOADING_ACTION => ({
  type: FETCH_COMPANYMATERIAL_STATS_LOADING,
  payload: loading,
});

export const fetchCompanyMaterialStatsSuccess = (
  payload: CompanyMaterialStats,
): FETCH_COMPANYMATERIAL_STATS_SUCCESS_ACTION => ({
  type: FETCH_COMPANYMATERIAL_STATS_SUCCESS,
  payload,
});

export const setPage = (page: number): SET_PAGE_ACTION => ({
  type: SET_PAGE,
  payload: page,
});

export const setModal = (modal: ModalState): SET_MODAL_ACTION => ({
  type: SET_MODAL,
  payload: modal,
});

export const fetchCompaniesListLoading = (
  loading: boolean,
): FETCH_COMPANIES_LIST_LOADING_ACTION => ({
  type: FETCH_COMPANIES_LIST_LOADING,
  payload: loading,
});

export const fetchCompaniesListSuccess = (
  payload: CompanyList[],
): FETCH_COMPANIES_LIST_SUCCESS_ACTION => ({
  type: FETCH_COMPANIES_LIST_SUCCESS,
  payload,
});

export const fetchCompanyPartsLoading = (
  loading: boolean,
): FETCH_COMPANY_PARTS_LOADING_ACTION => ({
  type: FETCH_COMPANY_PARTS_LOADING,
  payload: loading,
});

export const fetchCompanyPartsSuccess = (
  payload: CompanyPart[],
): FETCH_COMPANY_PARTS_SUCCESS_ACTION => ({
  type: FETCH_COMPANY_PARTS_SUCCESS,
  payload,
});

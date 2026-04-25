import { CompanyAction, CompanyListResponse, CompanyState } from './type';

export const fetchCompanyListLoading = (loading: boolean): CompanyAction => ({
  type: 'FETCH_COMPANY_LIST_LOADING',
  payload: loading,
});

export const fetchCompanyListSuccess = (
  data: CompanyListResponse,
): CompanyAction => ({
  type: 'FETCH_COMPANY_LIST_SUCCESS',
  payload: data,
});

export const setPage = (page: number): CompanyAction => ({
  type: 'SET_PAGE',
  payload: page,
});

export const setModal = (modalState: CompanyState['modal']): CompanyAction => ({
  type: 'SET_MODAL',
  payload: modalState,
});

export const actionLoading = (loading: boolean): CompanyAction => ({
  type: 'ACTION_LOADING',
  payload: loading,
});

export const actionSuccess = (): CompanyAction => ({
  type: 'ACTION_SUCCESS',
});

export const toggleCompanyStatus = (id: string): CompanyAction => ({
  type: 'TOGGLE_COMPANY_STATUS',
  payload: id,
});

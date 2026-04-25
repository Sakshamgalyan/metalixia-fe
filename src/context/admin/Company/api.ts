import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { CompanyAction, CompanyListResponse } from './type';
import {
  fetchCompanyListLoading,
  fetchCompanyListSuccess,
  actionLoading,
  actionSuccess,
  toggleCompanyStatus,
} from './actions';

export const getCompaniesApi = async (
  dispatch: Dispatch<CompanyAction>,
  page: number,
  limit: number,
  search?: string,
) => {
  dispatch(fetchCompanyListLoading(true));
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await ApiClient.get<any>('/company', {
      params,
    });
    dispatch(fetchCompanyListSuccess(response));
    return;
  } catch (error: any) {
    toast.error('Failed to fetch companies', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  } finally {
    dispatch(fetchCompanyListLoading(false));
  }
};

export const createCompanyApi = async (
  dispatch: Dispatch<CompanyAction>,
  data: any,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.post('/company', data);
    dispatch(actionSuccess());
    toast.success('Company created successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to create company', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const updateCompanyApi = async (
  dispatch: Dispatch<CompanyAction>,
  id: string,
  data: any,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.put(`/company/${id}`, data);
    dispatch(actionSuccess());
    toast.success('Company updated successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to update company', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const deleteCompanyApi = async (
  dispatch: Dispatch<CompanyAction>,
  id: string,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.delete(`/company/${id}`);
    dispatch(actionSuccess());
    toast.success('Company deleted successfully');
    return response;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const toggleCompanyStatusApi = async (
  dispatch: Dispatch<CompanyAction>,
  id: string,
) => {
  try {
    const response = await ApiClient.patch<any>(`/company/${id}/toggle-status`);
    dispatch(toggleCompanyStatus(id));
    toast.success(response.message || 'Status updated successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to update status', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  }
};

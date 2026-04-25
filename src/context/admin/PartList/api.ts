import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { getErrorMessage } from '@/utils/error';
import { PartAction, PartListResponse, CompanyItem } from './type';

import {
  fetchPartListLoading,
  fetchPartListSuccess,
  actionLoading,
  actionSuccess,
  fetchCompaniesListLoading,
  fetchCompaniesListSuccess,
  togglePartStatus,
} from './actions';

export const getPartsApi = async (
  dispatch: Dispatch<PartAction>,
  page: number,
  limit: number,
  search?: string,
) => {
  dispatch(fetchPartListLoading(true));
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await ApiClient.get<any>('/company/get-all-parts', {
      params,
    });

    dispatch(fetchPartListSuccess(response));
  } catch (error: any) {
    toast.error('Failed to fetch parts', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
  } finally {
    dispatch(fetchPartListLoading(false));
  }
};

export const createPartApi = async (
  dispatch: Dispatch<PartAction>,
  data: any,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.post('/company/add-part', {
      companyId: data.companyId,
      part: data,
    });
    dispatch(actionSuccess());
    toast.success('Part created successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to create part', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const updatePartApi = async (
  dispatch: Dispatch<PartAction>,
  id: string,
  data: any,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.put(`/company/update-part/${id}`, data);
    dispatch(actionSuccess());
    toast.success('Part updated successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to update part', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const deletePartApi = async (
  dispatch: Dispatch<PartAction>,
  id: string,
) => {
  dispatch(actionLoading(true));
  try {
    const response = await ApiClient.delete(`/company/remove-part/${id}`);
    dispatch(actionSuccess());
    toast.success('Part deleted successfully');
    return response;
  } finally {
    dispatch(actionLoading(false));
  }
};

export const togglePartStatusApi = async (
  dispatch: Dispatch<PartAction>,
  partId: string,
) => {
  try {
    const response = await ApiClient.patch<any>(
      `/company/part/${partId}/toggle-status`,
    );
    dispatch(togglePartStatus(partId));
    toast.success('Part status updated successfully');
    return response;
  } catch (error: any) {
    toast.error('Failed to update status', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
    throw error;
  }
};

export const getCompaniesListApi = async (dispatch: Dispatch<PartAction>) => {
  dispatch(fetchCompaniesListLoading(true));
  try {
    const response = await ApiClient.get<CompanyItem[]>('/company/list');
    dispatch(fetchCompaniesListSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch companies', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchCompaniesListLoading(false));
  }
};

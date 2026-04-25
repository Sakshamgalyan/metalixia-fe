import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from 'sonner';
import { RawMaterialAction, RawMaterialListResponse } from './type';
import {
  fetchRawMaterialListLoading,
  fetchRawMaterialListSuccess,
  createRawMaterialLoading,
  createRawMaterialSuccess,
  fetchRawMaterialStatsLoading,
  fetchRawMaterialStatsSuccess,
} from './actions';
import { RawMaterialStats, RawMaterialItem } from './type';
import { getErrorMessage } from '@/utils/error';

export const getRawMaterialStatsApi = async (
  dispatch: Dispatch<RawMaterialAction>,
) => {
  dispatch(fetchRawMaterialStatsLoading(true));
  try {
    const response = await ApiClient.get<RawMaterialStats>(
      '/material/raw/stats',
    );
    dispatch(fetchRawMaterialStatsSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch statistics', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchRawMaterialStatsLoading(false));
  }
};

export const getRawMaterialsApi = async (
  dispatch: Dispatch<RawMaterialAction>,
  page: number,
  limit: number,
  search?: string,
) => {
  dispatch(fetchRawMaterialListLoading(true));
  try {
    const params: any = { page, limit };
    if (search) params.search = search;

    const response = await ApiClient.get<RawMaterialListResponse>(
      '/material/raw',
      {
        params,
      },
    );
    dispatch(fetchRawMaterialListSuccess(response));
    return;
  } catch (error: unknown) {
    toast.error('Failed to fetch raw materials', {
      description: getErrorMessage(error),
    });
    throw error;
  } finally {
    dispatch(fetchRawMaterialListLoading(false));
  }
};

export const createRawMaterialApi = async (
  dispatch: Dispatch<RawMaterialAction>,
  data: any,
) => {
  dispatch(createRawMaterialLoading(true));
  try {
    const response = await ApiClient.post<RawMaterialItem>(
      '/material/raw',
      data,
    );
    dispatch(createRawMaterialSuccess(response));
    toast.success('Raw material created successfully');
    return response;
  } catch (error: unknown) {
    toast.error('Failed to create raw material', {
      description: getErrorMessage(error),
    });
    throw error;
  } finally {
    dispatch(createRawMaterialLoading(false));
  }
};

export const deleteRawMaterialApi = async (id: string) => {
  try {
    const response = await ApiClient.delete(`/material/raw/${id}`);
    toast.success('Raw material deleted successfully');
    return response;
  } catch (error: unknown) {
    toast.error('Failed to delete raw material', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const getEmployeesListApi = async () => {
  try {
    const response = await ApiClient.get<any[]>('/admin/get-all-employee');
    return response;
  } catch (error: unknown) {
    toast.error('Failed to fetch employees list', {
      description: getErrorMessage(error),
    });
    return [];
  }
};

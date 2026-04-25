import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { RawMaterialAction, RawMaterialListResponse } from './type';
import {
  fetchRawMaterialListLoading,
  fetchRawMaterialListSuccess,
  createRawMaterialLoading,
  createRawMaterialSuccess,
  updateRawMaterialLoading,
  updateRawMaterialSuccess,
  receiveRawMaterialLoading,
  receiveRawMaterialSuccess,
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
    const params: Record<string, string | number> = { page, limit };
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
  data: Record<string, unknown>,
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

export const updateRawMaterialApi = async (
  dispatch: Dispatch<RawMaterialAction>,
  id: string,
  data: Record<string, unknown>,
) => {
  dispatch(updateRawMaterialLoading(true));
  try {
    const response = await ApiClient.patch<RawMaterialItem>(
      `/material/raw/${id}`,
      data,
    );
    dispatch(updateRawMaterialSuccess(response));
    toast.success('Raw material updated successfully');
    return response;
  } catch (error: unknown) {
    toast.error('Failed to update raw material', {
      description: getErrorMessage(error),
    });
    throw error;
  } finally {
    dispatch(updateRawMaterialLoading(false));
  }
};

export const receiveRawMaterialApi = async (
  dispatch: Dispatch<RawMaterialAction>,
  id: string,
  data: { receivedBy: string; receivedById: string },
) => {
  dispatch(receiveRawMaterialLoading(true));
  try {
    const response = await ApiClient.patch<RawMaterialItem>(
      `/material/raw/${id}/receive`,
      data,
    );
    dispatch(receiveRawMaterialSuccess(response));
    toast.success('Raw material marked as received');
    return response;
  } catch (error: unknown) {
    toast.error('Failed to mark as received', {
      description: getErrorMessage(error),
    });
    throw error;
  } finally {
    dispatch(receiveRawMaterialLoading(false));
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
    const response = await ApiClient.get<{ value: string; label: string }[]>(
      '/admin/get-all-employee',
    );
    return response;
  } catch (error: unknown) {
    toast.error('Failed to fetch employees list', {
      description: getErrorMessage(error),
    });
    return [];
  }
};

export const getRawUniqueFiltersApi = async () => {
  try {
    const response = await ApiClient.get<{
      materialNames: string[];
      sources: string[];
    }>('/material/raw/unique-filters');
    return response;
  } catch (error: unknown) {
    console.error('Failed to fetch unique filters', error);
    return { materialNames: [], sources: [] };
  }
};

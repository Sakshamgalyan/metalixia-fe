import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { getErrorMessage } from '@/utils/error';
import { InventoryAction, InventoryListResponse, InventoryStats } from './type';
import {
  fetchInventoryListLoading,
  fetchInventoryListSuccess,
  fetchInventoryStatsLoading,
  fetchInventoryStatsSuccess,
} from './actions';

export const getInventoryItemsApi = async (
  dispatch: Dispatch<InventoryAction>,
  page: number,
  limit: number,
  search?: string,
  type?: string,
  status?: string,
) => {
  dispatch(fetchInventoryListLoading(true));
  try {
    const params: Record<string, any> = { page, limit };
    if (search) params.search = search;
    if (type) params.type = type;
    if (status) params.status = status;

    const response = await ApiClient.get<InventoryListResponse>(
      '/material/inventory',
      { params },
    );
    dispatch(fetchInventoryListSuccess(response));
  } catch (error: any) {
    toast.error('Failed to fetch inventory', {
      description: error?.response?.data?.message || 'Something went wrong',
    });
  } finally {
    dispatch(fetchInventoryListLoading(false));
  }
};

export const getInventoryStatsApi = async (
  dispatch: Dispatch<InventoryAction>,
) => {
  dispatch(fetchInventoryStatsLoading(true));
  try {
    const response = await ApiClient.get<InventoryStats>(
      '/material/inventory/stats',
    );
    dispatch(fetchInventoryStatsSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch inventory stats', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchInventoryStatsLoading(false));
  }
};

export const updateMaterialStatusApi = async (
  type: string,
  id: string,
  status: string,
) => {
  try {
    await ApiClient.patch(`/material/${type}/${id}/status`, { status });
    toast.success('Material status updated');
  } catch (error: unknown) {
    toast.error('Failed to update status', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const setMinStockApi = async (id: string, minStock: number) => {
  try {
    await ApiClient.patch(`/material/inventory/${id}/min-stock`, { minStock });
    toast.success('Minimum stock level updated');
  } catch (error: unknown) {
    toast.error('Failed to update min stock', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const consumeMaterialApi = async (
  id: string,
  quantity: number,
  notes: string,
) => {
  try {
    await ApiClient.patch(`/material/inventory/${id}/consume`, {
      quantity,
      notes,
    });
    toast.success('Material consumed successfully');
  } catch (error: unknown) {
    toast.error('Failed to consume material', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const getInventoryUniqueFiltersApi = async () => {
  try {
    const response = await ApiClient.get<{
      materialNames: string[];
      companyNames: string[];
      statuses: string[];
    }>('/material/inventory/unique-filters');
    return response;
  } catch (error: unknown) {
    console.error('Failed to fetch unique filters', error);
    return { materialNames: [], companyNames: [], statuses: [] };
  }
};

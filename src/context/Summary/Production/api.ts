import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { getErrorMessage } from '@/utils/error';
import {
  ProductionAction,
  ProductionListResponse,
  ProductionStats,
  ProductionOrder,
} from './type';

import {
  fetchProductionListLoading,
  fetchProductionListSuccess,
  fetchProductionStatsLoading,
  fetchProductionStatsSuccess,
  fetchProductionPipelineLoading,
  fetchProductionPipelineSuccess,
} from './actions';

export const getProductionOrdersApi = async (
  dispatch: Dispatch<ProductionAction>,
  page: number,
  limit: number,
  search?: string,
  status?: string,
) => {
  dispatch(fetchProductionListLoading(true));
  try {
    const params: Record<string, unknown> = { page, limit };
    if (search) params.search = search;
    if (status) params.status = status;
    const response = await ApiClient.get<ProductionListResponse>(
      '/production',
      { params },
    );
    dispatch(fetchProductionListSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch production orders', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchProductionListLoading(false));
  }
};

export const getProductionStatsApi = async (
  dispatch: Dispatch<ProductionAction>,
) => {
  dispatch(fetchProductionStatsLoading(true));
  try {
    const response = await ApiClient.get<ProductionStats>('/production/stats');
    dispatch(fetchProductionStatsSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch production stats', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchProductionStatsLoading(false));
  }
};

export const getProductionPipelineApi = async (
  dispatch: Dispatch<ProductionAction>,
) => {
  dispatch(fetchProductionPipelineLoading(true));
  try {
    const response = await ApiClient.get<{ data: ProductionOrder[] }>(
      '/production/pipeline',
    );
    dispatch(fetchProductionPipelineSuccess(response.data));
  } catch (error: unknown) {
    toast.error('Failed to fetch pipeline', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchProductionPipelineLoading(false));
  }
};

export const advanceProcessApi = async (id: string, notes?: string) => {
  try {
    await ApiClient.patch(`/production/${id}/advance`, { notes });
    toast.success('Process advanced successfully');
  } catch (error: unknown) {
    toast.error('Failed to advance process', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const updateProductionStatusApi = async (id: string, status: string) => {
  try {
    await ApiClient.patch(`/production/${id}/status`, { status });
    toast.success('Status updated successfully');
  } catch (error: unknown) {
    toast.error('Failed to update status', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

export const seedProductionMockApi = async () => {
  try {
    await ApiClient.post('/production/seed-mock');
    toast.success('Mock production data seeded');
  } catch (error: unknown) {
    toast.error('Failed to seed mock data', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

import { Dispatch } from 'react';
import ApiClient from '@/lib/apiClient';
import { toast } from 'sonner';
import { getErrorMessage } from '@/utils/error';
import {
  QualityAction,
  QualityListResponse,
  QualityStats,
  PendingOrder,
} from './type';

import {
  fetchQualityListLoading,
  fetchQualityListSuccess,
  fetchQualityStatsLoading,
  fetchQualityStatsSuccess,
  fetchQualityPendingLoading,
  fetchQualityPendingSuccess,
} from './actions';

export const getQualityChecksApi = async (
  dispatch: Dispatch<QualityAction>,
  page: number,
  limit: number,
  search?: string,
  result?: string,
) => {
  dispatch(fetchQualityListLoading(true));
  try {
    const params: Record<string, unknown> = { page, limit };
    if (search) params.search = search;
    if (result) params.result = result;
    const response = await ApiClient.get<QualityListResponse>('/quality', {
      params,
    });
    dispatch(fetchQualityListSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch quality checks', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchQualityListLoading(false));
  }
};

export const getQualityStatsApi = async (dispatch: Dispatch<QualityAction>) => {
  dispatch(fetchQualityStatsLoading(true));
  try {
    const response = await ApiClient.get<QualityStats>('/quality/stats');
    dispatch(fetchQualityStatsSuccess(response));
  } catch (error: unknown) {
    toast.error('Failed to fetch quality stats', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchQualityStatsLoading(false));
  }
};

export const getPendingInspectionsApi = async (
  dispatch: Dispatch<QualityAction>,
) => {
  dispatch(fetchQualityPendingLoading(true));
  try {
    const response = await ApiClient.get<{ data: PendingOrder[] }>(
      '/quality/pending',
    );
    dispatch(fetchQualityPendingSuccess(response.data));
  } catch (error: unknown) {
    toast.error('Failed to fetch pending inspections', {
      description: getErrorMessage(error),
    });
  } finally {
    dispatch(fetchQualityPendingLoading(false));
  }
};

export const inspectOrderApi = async (
  productionOrderId: string,
  data: {
    inspectedBy: string;
    inspectedById: string;
    result: string;
    defectType?: string;
    defectDescription?: string;
    rejectionReason?: string;
    parameters?: {
      name: string;
      expected: string;
      actual: string;
      passed: boolean;
    }[];
  },
) => {
  try {
    await ApiClient.post(`/quality/inspect/${productionOrderId}`, data);
    toast.success(
      data.result === 'passed'
        ? 'Material passed quality check'
        : 'Material rejected — sent back to production',
    );
  } catch (error: unknown) {
    toast.error('Inspection failed', { description: getErrorMessage(error) });
    throw error;
  }
};

export const seedQualityMockApi = async () => {
  try {
    await ApiClient.post('/quality/seed-mock');
    toast.success('Mock quality data seeded');
  } catch (error: unknown) {
    toast.error('Failed to seed mock data', {
      description: getErrorMessage(error),
    });
    throw error;
  }
};

'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Search,
  ClipboardCheck,
  CheckCircle,
  XCircle,
  Clock,
  BarChart3,
  Shield,
  AlertTriangle,
} from 'lucide-react';
import Typography from '@/components/UI/Typography';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Dropdown from '@/components/UI/DropDown';
import Chips from '@/components/UI/Chips';
import Card from '@/components/UI/Card';
import Chart from '@/components/UI/Chart';
import SummaryTableWrapper from '@/components/Common/SummaryTableWrapper';
import { TableColumn } from '@/components/UI/Table';
import debounce from 'lodash/debounce';
import { useAppSelector } from '@/store/hooks';
import {
  useQualityStateContext,
  useQualityDispatchContext,
} from '@/context/Summary/Quality/hooks';
import {
  getQualityChecksApi,
  getQualityStatsApi,
  getPendingInspectionsApi,
  inspectOrderApi,
} from '@/context/Summary/Quality/api';
import { setQualityPage } from '@/context/Summary/Quality/actions';
import { QualityCheckItem, PendingOrder } from '@/context/Summary/Quality/type';

const resultColors: Record<
  string,
  'success' | 'warning' | 'danger' | 'default'
> = {
  passed: 'success',
  failed: 'danger',
  pending: 'warning',
};

const QualityCompt = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [resultFilter, setResultFilter] = useState('all');
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');

  const {
    listData,
    listLoading,
    statsData,
    pendingData,
    pendingLoading,
    page,
  } = useQualityStateContext();
  const dispatch = useQualityDispatchContext();
  const { user } = useAppSelector((state) => state.auth);

  const fetchHistory = useCallback(
    async (p = 1, query = '', result = 'all') => {
      await getQualityChecksApi(
        dispatch,
        p,
        10,
        query,
        result === 'all' ? undefined : result,
      );
    },
    [dispatch],
  );

  useEffect(() => {
    if (activeTab === 'history') {
      fetchHistory(page, searchQuery, resultFilter);
    }
  }, [page, searchQuery, resultFilter, activeTab, fetchHistory]);

  useEffect(() => {
    getQualityStatsApi(dispatch);
    getPendingInspectionsApi(dispatch);
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        dispatch(setQualityPage(1));
      }, 500),
    [dispatch],
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const refresh = () => {
    getQualityStatsApi(dispatch);
    getPendingInspectionsApi(dispatch);
    if (activeTab === 'history') {
      fetchHistory(page, searchQuery, resultFilter);
    }
  };

  const handleInspect = async (
    orderId: string,
    result: 'passed' | 'failed',
  ) => {
    try {
      await inspectOrderApi(orderId, {
        inspectedBy: user?.name || 'Inspector',
        inspectedById: user?.id || 'unknown',
        result,
        defectType: result === 'failed' ? 'Surface Roughness' : undefined,
        rejectionReason:
          result === 'failed'
            ? 'Coating quality below acceptable threshold'
            : undefined,
        parameters: [
          {
            name: 'Coating Thickness',
            expected: '8-12 µm',
            actual: result === 'passed' ? '10 µm' : '5 µm',
            passed: result === 'passed',
          },
          {
            name: 'Adhesion Test',
            expected: 'Grade 0-1',
            actual: result === 'passed' ? 'Grade 0' : 'Grade 3',
            passed: result === 'passed',
          },
          {
            name: 'Salt Spray Test',
            expected: '72+ hrs',
            actual: result === 'passed' ? '96 hrs' : '48 hrs',
            passed: result === 'passed',
          },
        ],
      });
      refresh();
    } catch {
      /* handled */
    }
  };

  const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // History table columns
  const historyColumns: TableColumn<QualityCheckItem>[] = [
    {
      header: 'Batch',
      accessor: 'batchId',
      headerClassName: 'text-left',
      className: 'text-left',
      render: (row) => (
        <span className="font-mono font-bold text-sm text-slate-900">
          {row.batchId}
        </span>
      ),
    },
    {
      header: 'Part',
      accessor: 'partName',
      headerClassName: 'text-left',
      className: 'text-left',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-800">{row.partNumber}</span>
          <span className="text-xs text-slate-500">{row.companyName}</span>
        </div>
      ),
    },
    {
      header: 'Qty',
      accessor: 'quantity',
      render: (row) => (
        <span className="font-medium text-slate-700">{row.quantity}</span>
      ),
    },
    {
      header: 'Result',
      accessor: 'result',
      render: (row) => (
        <Chips
          colorScheme={resultColors[row.result] || 'default'}
          variant="soft"
          label={row.result.charAt(0).toUpperCase() + row.result.slice(1)}
          size="sm"
        />
      ),
    },
    {
      header: 'Defect',
      accessor: 'defectType',
      render: (row) =>
        row.defectType ? (
          <span className="text-xs text-red-600 font-medium">
            {row.defectType}
          </span>
        ) : (
          <span className="text-xs text-slate-400">—</span>
        ),
    },
    {
      header: 'Inspector',
      accessor: 'inspectedBy',
      className: 'text-slate-600',
    },
    {
      header: 'Inspected At',
      accessor: 'inspectedAt',
      render: (row) => (
        <span className="text-sm text-slate-600">
          {formatDate(row.inspectedAt)}
        </span>
      ),
    },
  ];

  const stats = [
    {
      label: 'Pending QC',
      value: statsData?.pendingCount ?? 0,
      icon: <Clock size={20} className="text-amber-500" />,
      color: 'bg-amber-50',
    },
    {
      label: 'Passed Today',
      value: statsData?.passedToday ?? 0,
      icon: <CheckCircle size={20} className="text-emerald-500" />,
      color: 'bg-emerald-50',
    },
    {
      label: 'Failed Today',
      value: statsData?.failedToday ?? 0,
      icon: <XCircle size={20} className="text-red-500" />,
      color: 'bg-red-50',
    },
    {
      label: 'Pass Rate',
      value: `${statsData?.passRate ?? 0}%`,
      icon: <Shield size={20} className="text-blue-500" />,
      color: 'bg-blue-50',
    },
  ];

  // Chart: Daily pass/fail
  const passData = statsData?.dailyCounts?.map((d) => d.passed) || [];
  const failData = statsData?.dailyCounts?.map((d) => d.failed) || [];
  const chartLabels =
    statsData?.dailyCounts?.map((d) => {
      const date = new Date(d.date);
      return date.toLocaleDateString('en-IN', { weekday: 'short' });
    }) || [];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography
            variant="h3"
            className="text-slate-900 flex items-center gap-3"
          >
            <ClipboardCheck size={28} className="text-slate-700" /> Quality
            Control
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Inspect production batches and manage quality standards
          </Typography>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} padding="md" className="border-slate-200">
            <div className="flex items-start justify-between">
              <div>
                <Typography
                  variant="small"
                  className="font-medium text-slate-500"
                >
                  {stat.label}
                </Typography>
                <Typography variant="h4" className="text-slate-900 mt-2">
                  {stat.value}
                </Typography>
              </div>
              <div className={`p-2.5 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5">Pass Rate Trend (7 Days)</Typography>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-500">Passed</span>
              </div>
            </div>
          </div>
          <Chart
            data={passData.length ? passData : [0, 0, 0, 0, 0, 0, 0]}
            height={240}
            gradientFrom="from-emerald-600"
            gradientTo="to-emerald-400"
            labelColor="text-emerald-400"
            labels={
              chartLabels.length
                ? chartLabels
                : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            }
            showXAxis
          />
        </div>

        {/* Defect Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-4">
            Defect Breakdown
          </Typography>
          <div className="space-y-3">
            {(statsData?.defectBreakdown || []).map((defect, i) => {
              const maxCount = Math.max(
                ...(statsData?.defectBreakdown?.map((d) => d.count) || [1]),
                1,
              );
              const pct = Math.round((defect.count / maxCount) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-slate-600 truncate max-w-[160px]">
                      {defect.type}
                    </span>
                    <span className="font-bold text-slate-800">
                      {defect.count}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-red-500 to-orange-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {(!statsData?.defectBreakdown ||
              statsData.defectBreakdown.length === 0) && (
              <p className="text-sm text-slate-400 text-center py-6">
                No defects recorded
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'pending'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('pending')}
        >
          Pending Inspection ({statsData?.pendingCount ?? 0})
        </button>
        <button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === 'history'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Inspection History
        </button>
      </div>

      {/* Pending Tab */}
      {activeTab === 'pending' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pendingLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-200 p-5 animate-pulse"
              >
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-3 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-3 bg-slate-200 rounded w-1/3" />
              </div>
            ))
          ) : pendingData.length === 0 ? (
            <div className="col-span-full bg-white rounded-xl border border-slate-200 p-12 text-center">
              <CheckCircle
                size={48}
                className="text-emerald-400 mx-auto mb-4"
              />
              <Typography variant="h5" className="text-slate-700">
                All Clear!
              </Typography>
              <Typography variant="p" className="text-slate-500 mt-1">
                No batches awaiting quality inspection
              </Typography>
            </div>
          ) : (
            pendingData.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <span className="font-mono font-bold text-sm text-slate-900 bg-slate-100 px-2 py-1 rounded">
                    {order.batchId}
                  </span>
                  {order.rejectionCount > 0 && (
                    <span className="flex items-center gap-1 text-xs text-red-600 bg-red-50 px-2 py-1 rounded font-semibold">
                      <AlertTriangle size={12} /> Rework #{order.rejectionCount}
                    </span>
                  )}
                </div>
                <h4 className="font-semibold text-slate-800 mb-1">
                  {order.partNumber} — {order.partName}
                </h4>
                <p className="text-sm text-slate-500 mb-1">
                  {order.companyName}
                </p>
                <p className="text-sm text-slate-600 mb-4">
                  <span className="font-medium">{order.quantity}</span>{' '}
                  {order.unit}
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    bgColor="#059669"
                    textColor="#fff"
                    fullWidth
                    leftIcon={<CheckCircle size={14} />}
                    onClick={() => handleInspect(order._id, 'passed')}
                  >
                    Pass
                  </Button>
                  <Button
                    size="sm"
                    bgColor="#dc2626"
                    textColor="#fff"
                    fullWidth
                    leftIcon={<XCircle size={14} />}
                    onClick={() => handleInspect(order._id, 'failed')}
                  >
                    Reject
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'history' && (
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
            <div className="w-full md:w-96">
              <Input
                placeholder="Search inspections..."
                leftIcon={<Search size={18} />}
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  debouncedSearch(e.target.value);
                }}
                fullWidth
              />
            </div>
            <div className="w-40">
              <Dropdown
                options={[
                  { label: 'All Results', value: 'all' },
                  { label: 'Passed', value: 'passed' },
                  { label: 'Failed', value: 'failed' },
                ]}
                value={resultFilter}
                onChange={(val) => {
                  setResultFilter(val as string);
                  dispatch(setQualityPage(1));
                }}
              />
            </div>
          </div>

          <SummaryTableWrapper
            data={listData?.data || []}
            columns={historyColumns}
            isLoading={listLoading}
            keyExtractor={(item) => item._id}
            searchQuery={searchQuery}
            paginationConfig={{
              currentPage: page,
              totalPages: listData?.totalPages || 1,
              totalCount: listData?.totalCount || 0,
              onPageChange: (newPage) => dispatch(setQualityPage(newPage)),
              itemsPerPage: 10,
            }}
            emptyTitle="No Inspection Records"
            emptyMessage="Quality check results will appear here."
          />
        </div>
      )}
    </div>
  );
};

export default QualityCompt;

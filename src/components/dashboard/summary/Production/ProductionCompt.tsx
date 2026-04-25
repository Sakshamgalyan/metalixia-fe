'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Search,
  Factory,
  Zap,
  AlertTriangle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  PlayCircle,
  ChevronRight,
  RefreshCw,
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
import {
  useProductionStateContext,
  useProductionDispatchContext,
} from '@/context/Summary/Production/hooks';
import {
  getProductionOrdersApi,
  getProductionStatsApi,
  advanceProcessApi,
  updateProductionStatusApi,
} from '@/context/Summary/Production/api';
import { setProductionPage } from '@/context/Summary/Production/actions';
import { ProductionOrder } from '@/context/Summary/Production/type';

const PROCESS_SHORT = [
  'DEG',
  'RIN',
  'ACD',
  'RIN',
  'ZNC',
  'RIN',
  'PAS',
  'RIN',
  'DRY',
  'HTR',
  'INS',
  'CLN',
];

const priorityColors: Record<
  string,
  'danger' | 'warning' | 'success' | 'default' | 'primary'
> = {
  urgent: 'danger',
  high: 'warning',
  normal: 'primary',
  low: 'default',
};

const statusLabels: Record<string, string> = {
  queued: 'Queued',
  in_production: 'In Production',
  quality_check: 'Quality Check',
  passed: 'Passed',
  rejected: 'Rejected',
  ready_for_dispatch: 'Ready',
  dispatched: 'Dispatched',
};

const statusColors: Record<
  string,
  'success' | 'warning' | 'danger' | 'default' | 'primary'
> = {
  queued: 'default',
  in_production: 'warning',
  quality_check: 'primary',
  passed: 'success',
  rejected: 'danger',
  ready_for_dispatch: 'success',
  dispatched: 'success',
};

const ProductionCompt = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const { listData, listLoading, statsData, page } =
    useProductionStateContext();
  const dispatch = useProductionDispatchContext();

  const fetchData = useCallback(
    async (p = 1, query = '', status = 'all') => {
      await getProductionOrdersApi(
        dispatch,
        p,
        10,
        query,
        status === 'all' ? undefined : status,
      );
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery, statusFilter);
  }, [page, searchQuery, statusFilter, fetchData]);

  useEffect(() => {
    getProductionStatsApi(dispatch);
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        dispatch(setProductionPage(1));
      }, 500),
    [dispatch],
  );

  useEffect(() => () => debouncedSearch.cancel(), [debouncedSearch]);

  const handleAdvance = async (id: string) => {
    try {
      await advanceProcessApi(id);
      fetchData(page, searchQuery, statusFilter);
      getProductionStatsApi(dispatch);
    } catch {
      /* handled */
    }
  };

  const handleStartProduction = async (id: string) => {
    try {
      await updateProductionStatusApi(id, 'in_production');
      fetchData(page, searchQuery, statusFilter);
      getProductionStatsApi(dispatch);
    } catch {
      /* handled */
    }
  };

  const handleSendToQC = async (id: string) => {
    try {
      await updateProductionStatusApi(id, 'quality_check');
      fetchData(page, searchQuery, statusFilter);
      getProductionStatsApi(dispatch);
    } catch {
      /* handled */
    }
  };

  const columns: TableColumn<ProductionOrder>[] = [
    {
      header: 'Batch',
      accessor: 'batchId',
      headerClassName: 'text-left',
      className: 'text-left',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-mono font-bold text-slate-900 text-sm">
            {row.batchId}
          </span>
          <span className="text-xs text-slate-500">Line {row.lineNumber}</span>
        </div>
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
        <span className="font-medium text-slate-700">
          {row.quantity} {row.unit}
        </span>
      ),
    },
    {
      header: 'Process Pipeline',
      accessor: 'currentProcess',
      render: (row) => (
        <div className="flex items-center gap-[2px]">
          {row.processes.map((proc, idx) => {
            let bg = 'bg-slate-200';
            if (proc.status === 'completed') bg = 'bg-emerald-500';
            if (proc.status === 'in_progress')
              bg = 'bg-amber-500 animate-pulse';
            return (
              <div
                key={idx}
                className={`w-5 h-5 rounded-sm ${bg} flex items-center justify-center`}
                title={`${proc.name}: ${proc.status}`}
              >
                <span className="text-[7px] font-bold text-white leading-none">
                  {PROCESS_SHORT[idx]}
                </span>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      header: 'Priority',
      accessor: 'priority',
      render: (row) => (
        <Chips
          colorScheme={priorityColors[row.priority] || 'default'}
          variant="soft"
          label={row.priority.charAt(0).toUpperCase() + row.priority.slice(1)}
          size="sm"
        />
      ),
    },
    {
      header: 'Status',
      accessor: 'status',
      render: (row) => (
        <Chips
          colorScheme={statusColors[row.status] || 'default'}
          variant="soft"
          label={statusLabels[row.status] || row.status}
          size="sm"
        />
      ),
    },
    {
      header: 'Actions',
      accessor: '_id',
      fixedColumn: 'right',
      render: (row) => {
        if (row.status === 'queued') {
          return (
            <Button
              size="sm"
              bgColor="#059669"
              textColor="#fff"
              leftIcon={<PlayCircle size={14} />}
              onClick={() => handleStartProduction(row._id)}
            >
              Start
            </Button>
          );
        }
        if (row.status === 'in_production') {
          const lastProc = row.currentProcess >= 11;
          return (
            <Button
              size="sm"
              bgColor={lastProc ? '#7c3aed' : '#2563eb'}
              textColor="#fff"
              leftIcon={
                lastProc ? <Zap size={14} /> : <ChevronRight size={14} />
              }
              onClick={() =>
                lastProc ? handleSendToQC(row._id) : handleAdvance(row._id)
              }
            >
              {lastProc ? 'Send QC' : 'Advance'}
            </Button>
          );
        }
        if (row.rejectionCount > 0) {
          return (
            <span className="flex items-center gap-1 text-xs text-red-600 font-semibold">
              <RefreshCw size={12} /> Rework #{row.rejectionCount}
            </span>
          );
        }
        return null;
      },
    },
  ];

  const safeData = listData?.data || [];

  const stats = [
    {
      label: 'Active Lines',
      value: statsData?.activeLines ?? 0,
      icon: <Factory size={20} className="text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      label: 'In Production',
      value: statsData?.inProduction ?? 0,
      icon: <Activity size={20} className="text-emerald-500" />,
      color: 'bg-emerald-50',
    },
    {
      label: 'Completed Today',
      value: statsData?.completedToday ?? 0,
      icon: <ArrowUpRight size={20} className="text-violet-500" />,
      color: 'bg-violet-50',
    },
    {
      label: 'Rejection Rate',
      value: `${statsData?.rejectionRate ?? 0}%`,
      icon: <AlertTriangle size={20} className="text-red-500" />,
      color: 'bg-red-50',
    },
  ];

  const chartData = statsData?.dailyCounts?.map((d) => d.count) || [];
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
            <Factory size={28} className="text-slate-700" /> Production
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Monitor electroplating production lines and batch progress
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

      {/* Process Pipeline Overview + Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-4">
            Throughput (Last 7 Days)
          </Typography>
          <Chart
            data={chartData.length ? chartData : [0, 0, 0, 0, 0, 0, 0]}
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

        {/* Process Breakdown */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <Typography variant="h5" className="mb-4">
            Process Pipeline
          </Typography>
          <div className="space-y-2">
            {(statsData?.processCounts || []).map((proc) => {
              const maxCount = Math.max(
                ...(statsData?.processCounts?.map((p) => p.count) || [1]),
                1,
              );
              const pct = Math.round((proc.count / maxCount) * 100);
              return (
                <div key={proc.index}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-600 truncate max-w-[140px]">
                      {proc.name}
                    </span>
                    <span className="font-bold text-slate-800">
                      {proc.count}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-1.5">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
            {(!statsData?.processCounts ||
              statsData.processCounts.length === 0) && (
              <p className="text-sm text-slate-400 text-center py-6">
                No active production
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-5">
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-start md:items-center">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search batches, companies..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                debouncedSearch(e.target.value);
              }}
              fullWidth
            />
          </div>
          <div className="w-44">
            <Dropdown
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Queued', value: 'queued' },
                { label: 'In Production', value: 'in_production' },
                { label: 'Quality Check', value: 'quality_check' },
                { label: 'Passed', value: 'passed' },
                { label: 'Ready', value: 'ready_for_dispatch' },
              ]}
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val as string);
                dispatch(setProductionPage(1));
              }}
            />
          </div>
        </div>

        <SummaryTableWrapper
          data={safeData}
          columns={columns}
          isLoading={listLoading}
          keyExtractor={(item) => item._id}
          searchQuery={searchQuery}
          paginationConfig={{
            currentPage: page,
            totalPages: listData?.totalPages || 1,
            totalCount: listData?.totalCount || 0,
            onPageChange: (newPage) => dispatch(setProductionPage(newPage)),
            itemsPerPage: 10,
          }}
          emptyTitle="No Production Orders"
          emptyMessage="Send materials from Inventory to start production."
        />
      </div>
    </div>
  );
};

export default ProductionCompt;

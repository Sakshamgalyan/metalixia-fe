'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  Search,
  Package,
  Factory,
  AlertTriangle,
  Send,
  Droplets,
  Settings,
  Archive,
} from 'lucide-react';
import Typography from '@/components/UI/Typography';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Dropdown from '@/components/UI/DropDown';
import Chips from '@/components/UI/Chips';
import Card from '@/components/UI/Card';
import SummaryTableWrapper from '@/components/Common/SummaryTableWrapper';
import { TableColumn } from '@/components/UI/Table';
import debounce from 'lodash/debounce';
import {
  useInventoryStateContext,
  useInventoryDispatchContext,
} from '@/context/Summary/Inventory/hooks';
import {
  getInventoryItemsApi,
  getInventoryStatsApi,
  updateMaterialStatusApi,
} from '@/context/Summary/Inventory/api';
import { setInventoryPage } from '@/context/Summary/Inventory/actions';
import { InventoryItem } from '@/context/Summary/Inventory/type';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';
import { MinStockModal, ConsumeModal } from './InventoryModals';
import ExportModal from './ExportModal';

const statusColors: Record<
  string,
  'success' | 'warning' | 'danger' | 'default' | 'primary'
> = {
  received: 'default',
  in_inventory: 'primary',
  in_production: 'warning',
  quality_check: 'warning',
  ready_for_dispatch: 'success',
  dispatched: 'success',
  consumed: 'danger',
};

const statusLabels: Record<string, string> = {
  received: 'Received',
  in_production: 'In Production',
  quality_check: 'Quality Check',
  ready_for_dispatch: 'Ready',
  dispatched: 'Dispatched',
  consumed: 'Consumed',
};

const InventoryCompt = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const [minStockModal, setMinStockModal] = useState<{
    isOpen: boolean;
    item: InventoryItem | null;
  }>({ isOpen: false, item: null });

  const [consumeModal, setConsumeModal] = useState<{
    isOpen: boolean;
    item: InventoryItem | null;
  }>({ isOpen: false, item: null });

  const [exportModalOpen, setExportModalOpen] = useState(false);

  const { listData, listLoading, statsData, statsLoading, page } =
    useInventoryStateContext();
  const dispatch = useInventoryDispatchContext();

  const fetchData = useCallback(
    async (p = 1, query = '', type = 'all', status = 'all') => {
      await getInventoryItemsApi(
        dispatch,
        p,
        10,
        query,
        type === 'all' ? undefined : type,
        status === 'all' ? undefined : status,
      );
    },
    [dispatch],
  );

  useEffect(() => {
    fetchData(page, searchQuery, typeFilter, statusFilter);
  }, [page, searchQuery, typeFilter, statusFilter, fetchData]);

  useEffect(() => {
    getInventoryStatsApi(dispatch);
  }, [dispatch]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setSearchQuery(value);
        dispatch(setInventoryPage(1));
      }, 500),
    [dispatch],
  );

  useEffect(() => {
    return () => debouncedSearch.cancel();
  }, [debouncedSearch]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handleSendToProduction = async (item: InventoryItem) => {
    // This will eventually open a dynamic batching modal as per user feedback
    toast.info('Opening batching configuration...');
  };

  const formatDate = (date: string | null) => {
    if (!date) return '—';
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const columns: TableColumn<InventoryItem>[] = [
    {
      header: 'Material Details',
      accessor: 'materialName',
      render: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-slate-900">
            {row.materialName}
          </span>
          <span className="text-xs text-slate-500">
            {row.sourceType === 'company' ? row.companyName : 'In-house Supply'}
          </span>
        </div>
      ),
    },
    {
      header: 'Type',
      accessor: 'sourceType',
      render: (row) => (
        <Chips
          colorScheme={row.sourceType === 'company' ? 'primary' : 'default'}
          variant="soft"
          label={row.sourceType === 'company' ? 'Client' : 'Raw'}
          size="sm"
        />
      ),
    },
    {
      header: 'Stock Status',
      accessor: 'quantity',
      render: (row) => {
        const isLow = row.quantity <= row.minStock && row.quantity > 0;
        const isOut = row.quantity === 0;

        return (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span
                className={`font-bold ${isOut ? 'text-red-600' : isLow ? 'text-amber-600' : 'text-slate-700'}`}
              >
                {row.quantity} {row.unit}
              </span>
              {isLow && <AlertTriangle size={14} className="text-amber-500" />}
            </div>
            {row.minStock > 0 && (
              <span className="text-[10px] text-slate-400">
                Min: {row.minStock} {row.unit}
              </span>
            )}
          </div>
        );
      },
    },
    {
      header: 'Location',
      accessor: 'inventoryLocation',
      className: 'text-slate-600',
    },
    {
      header: 'Workflow Status',
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
      header: 'Received',
      accessor: 'receivedAt',
      render: (row) => (
        <span className="text-slate-600 text-sm">
          {formatDate(row.receivedAt)}
        </span>
      ),
    },
    {
      header: 'Actions',
      accessor: '_id',
      fixedColumn: 'right',
      render: (row) => (
        <div className="flex items-center gap-2">
          {row.sourceType === 'raw' && row.quantity > 0 && (
            <Button
              size="sm"
              variant="outline"
              leftIcon={<Droplets size={14} className="text-blue-500" />}
              onClick={() => setConsumeModal({ isOpen: true, item: row })}
              title="Consume"
            />
          )}
          {row.sourceType === 'company' &&
            (row.status === 'received' || row.status === 'in_production') && (
              <Button
                size="sm"
                bgColor="#7c3aed"
                textColor="#ffffff"
                leftIcon={<Send size={14} />}
                onClick={() => handleSendToProduction(row)}
              >
                Batch
              </Button>
            )}
          <Button
            size="sm"
            variant="outline"
            leftIcon={<Settings size={14} className="text-slate-500" />}
            onClick={() => setMinStockModal({ isOpen: true, item: row })}
            title="Set Min Stock"
          />
        </div>
      ),
    },
  ];

  const safeData = listData?.data || [];

  const stats = [
    {
      label: 'Inventory Items',
      value: statsData?.totalItems ?? 0,
      icon: <Package className="text-blue-500" size={20} />,
      color: 'bg-blue-50',
    },
    {
      label: 'Low Stock Alerts',
      value: statsData?.lowStockCount ?? 0,
      icon: <AlertTriangle className="text-amber-500" size={20} />,
      color: 'bg-amber-50',
      trend: statsData?.lowStockCount ? 'critical' : 'good',
    },
    {
      label: 'Out of Stock',
      value: statsData?.outOfStockCount ?? 0,
      icon: <Archive className="text-red-500" size={20} />,
      color: 'bg-red-50',
    },
    {
      label: 'Client Batches',
      value: statsData?.totalCompany ?? 0,
      icon: <Factory className="text-violet-500" size={20} />,
      color: 'bg-violet-50',
    },
  ];

  return (
    <div className="space-y-6 w-[95%] mx-auto py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Typography variant="h3" className="text-slate-900 font-bold">
            Live Inventory
          </Typography>
          <Typography variant="p" className="text-slate-500">
            Monitor real-time stock levels, min-thresholds, and production
            status
          </Typography>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Archive size={16} />}
            onClick={() => setExportModalOpen(true)}
            disabled={safeData.length === 0}
          >
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={index}
            padding="md"
            className="border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <Typography
                  variant="small"
                  className="font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {stat.label}
                </Typography>
                <div className="mt-2 flex items-baseline gap-2">
                  <Typography variant="h3" className="text-slate-900 font-bold">
                    {stat.value}
                  </Typography>
                </div>
              </div>
              <div className={`p-3 rounded-xl ${stat.color}`}>{stat.icon}</div>
            </div>
          </Card>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50/30">
          <div className="w-full md:w-96">
            <Input
              placeholder="Search by material, part or company..."
              leftIcon={<Search size={18} />}
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              fullWidth
            />
          </div>
          <div className="flex gap-3">
            <Dropdown
              options={[
                { label: 'All Types', value: 'all' },
                { label: 'Client Material', value: 'company' },
                { label: 'Raw Material', value: 'raw' },
              ]}
              value={typeFilter}
              onChange={(val) => {
                setTypeFilter(val as string);
                dispatch(setInventoryPage(1));
              }}
            />
            <Dropdown
              options={[
                { label: 'All Status', value: 'all' },
                { label: 'Received', value: 'received' },
                { label: 'In Production', value: 'in_production' },
                { label: 'Quality Check', value: 'quality_check' },
                { label: 'Pending Dispatch', value: 'ready_for_dispatch' },
              ]}
              value={statusFilter}
              onChange={(val) => {
                setStatusFilter(val as string);
                dispatch(setInventoryPage(1));
              }}
            />
          </div>
        </div>

        <div className="p-0">
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
              onPageChange: (newPage) => dispatch(setInventoryPage(newPage)),
              itemsPerPage: 10,
            }}
            emptyTitle="Inventory is Empty"
            emptyMessage="New materials will appear here automatically when they are marked as 'Received' in the procurement sections."
          />
        </div>
      </div>

      <MinStockModal
        isOpen={minStockModal.isOpen}
        item={minStockModal.item}
        onClose={() => setMinStockModal({ isOpen: false, item: null })}
        onSuccess={() => {
          fetchData(page, searchQuery, typeFilter, statusFilter);
          getInventoryStatsApi(dispatch);
        }}
      />

      <ConsumeModal
        isOpen={consumeModal.isOpen}
        item={consumeModal.item}
        onClose={() => setConsumeModal({ isOpen: false, item: null })}
        onSuccess={() => {
          fetchData(page, searchQuery, typeFilter, statusFilter);
          getInventoryStatsApi(dispatch);
        }}
      />

      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        searchQuery={searchQuery}
        typeFilter={typeFilter}
        statusFilter={statusFilter}
      />
    </div>
  );
};

export default InventoryCompt;

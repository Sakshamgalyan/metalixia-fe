'use client';

import React, { useState, useEffect } from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Typography from '@/components/UI/Typography';
import DropDown from '@/components/UI/DropDown';
import DatePicker from '@/components/UI/DatePicker';
import {
  FileDown,
  FileSpreadsheet,
  FileText,
  AlertCircle,
  Calendar,
  Tag,
  ShieldCheck,
  Box,
  Building2,
} from 'lucide-react';
import { getInventoryUniqueFiltersApi } from '@/context/Summary/Inventory/api';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  searchQuery?: string;
  typeFilter?: string;
  statusFilter?: string;
}

const ExportModal = ({
  isOpen,
  onClose,
  searchQuery,
  typeFilter,
  statusFilter,
}: ExportModalProps) => {
  const [loading, setLoading] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    materialName: '',
    companyName: '',
    startDate: '',
    endDate: '',
    type: typeFilter || 'all',
    status: statusFilter || 'all',
  });

  const [uniqueData, setUniqueData] = useState<{
    materialNames: string[];
    companyNames: string[];
    statuses: string[];
  }>({
    materialNames: [],
    companyNames: [],
    statuses: [],
  });

  useEffect(() => {
    if (isOpen) {
      const fetchFilters = async () => {
        const data = await getInventoryUniqueFiltersApi();
        setUniqueData(data);
      };
      fetchFilters();
      setFilters((prev) => ({
        ...prev,
        type: typeFilter || 'all',
        status: statusFilter || 'all',
      }));
    }
  }, [isOpen, typeFilter, statusFilter]);

  const handleClose = () => {
    onClose();
    setFilters({
      materialName: '',
      companyName: '',
      startDate: '',
      endDate: '',
      type: 'all',
      status: 'all',
    });
  };

  const handleExport = async (format: 'xlsx' | 'csv' | 'pdf') => {
    setLoading(format);
    try {
      const response = await ApiClient.get('/material/inventory/export', {
        params: { ...filters, search: searchQuery, format },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response as any]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `Inventory_Export_${new Date().toISOString().split('T')[0]}.${format === 'xlsx' ? 'xlsx' : format}`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success(`${format.toUpperCase()} export downloaded successfully`);
      handleClose();
    } catch (error) {
      console.error('Export failed', error);
      toast.error('Failed to generate export');
    } finally {
      setLoading(null);
    }
  };

  const materialOptions = [
    { label: 'All Materials', value: '' },
    ...uniqueData.materialNames.map((m) => ({ label: m, value: m })),
  ];

  const companyOptions = [
    { label: 'All Companies', value: '' },
    ...uniqueData.companyNames.map((c) => ({ label: c, value: c })),
  ];

  const statusOptions = [
    { label: 'All Statuses', value: 'all' },
    ...uniqueData.statuses.map((s) => ({
      label: s.charAt(0).toUpperCase() + s.slice(1).replace('_', ' '),
      value: s,
    })),
  ];

  const typeOptions = [
    { label: 'All Types', value: 'all' },
    { label: 'Raw Material', value: 'raw' },
    { label: 'Company Material', value: 'company' },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Inventory Stock Reports"
      width="lg"
    >
      <div className="space-y-6 py-2">
        <div className="flex items-start gap-4 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-emerald-800">
          <AlertCircle className="w-5 h-5 mt-0.5 text-emerald-600" />
          <div>
            <Typography variant="p" className="text-sm font-bold">
              Inventory Data Selection
            </Typography>
            <Typography variant="p" className="text-xs text-emerald-600 mt-1">
              Select specific categories, companies, or stock statuses to
              generate specialized inventory reports. PDF reports are optimized
              for physical auditing.
            </Typography>
          </div>
        </div>

        <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <DropDown
                label="Material Type"
                options={typeOptions}
                value={filters.type}
                onChange={(v) => setFilters({ ...filters, type: v as string })}
                placeholder="Select Type"
                leftIcon={<Tag className="w-4 h-4 text-slate-400" />}
              />
              <DropDown
                label="Material Status"
                options={statusOptions}
                value={filters.status}
                onChange={(v) =>
                  setFilters({ ...filters, status: v as string })
                }
                placeholder="Select Status"
                leftIcon={<ShieldCheck className="w-4 h-4 text-slate-400" />}
              />
            </div>
            <div className="space-y-4">
              <DropDown
                label="Specific Material"
                options={materialOptions}
                value={filters.materialName}
                onChange={(v) =>
                  setFilters({ ...filters, materialName: v as string })
                }
                searchable
                placeholder="Select Material"
                leftIcon={<Box className="w-4 h-4 text-slate-400" />}
              />
              <DropDown
                label="Filter by Company"
                options={companyOptions}
                value={filters.companyName}
                onChange={(v) =>
                  setFilters({ ...filters, companyName: v as string })
                }
                searchable
                placeholder="Select Company"
                leftIcon={<Building2 className="w-4 h-4 text-slate-400" />}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DatePicker
              label="Stock Since"
              value={filters.startDate}
              onChange={(v) => setFilters({ ...filters, startDate: v })}
              placeholder="From Date"
              fullWidth
            />
            <DatePicker
              label="Stock Until"
              value={filters.endDate}
              onChange={(v) => setFilters({ ...filters, endDate: v })}
              placeholder="To Date"
              fullWidth
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('xlsx')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-emerald-400 hover:bg-emerald-50 transition-all text-center"
          >
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl mb-3 group-hover:bg-emerald-100 transition-colors">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              Excel
            </Typography>
            {loading === 'xlsx' && (
              <div className="mt-2 w-4 h-4 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          <button
            onClick={() => handleExport('csv')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-400 hover:bg-blue-50 transition-all text-center"
          >
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-3 group-hover:bg-blue-100 transition-colors">
              <FileDown className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              CSV
            </Typography>
            {loading === 'csv' && (
              <div className="mt-2 w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          <button
            onClick={() => handleExport('pdf')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-red-400 hover:bg-red-50 transition-all text-center"
          >
            <div className="p-4 bg-red-50 text-red-600 rounded-2xl mb-3 group-hover:bg-red-100 transition-colors">
              <FileText className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              PDF
            </Typography>
            {loading === 'pdf' && (
              <div className="mt-2 w-4 h-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ExportModal;

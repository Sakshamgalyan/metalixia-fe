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
} from 'lucide-react';
import {
  useRawMaterialStateContext,
  useRawMaterialDispatchContext,
} from '@/context/Summary/RawMaterial/hooks';
import { setModal } from '@/context/Summary/RawMaterial/actions';
import { getRawUniqueFiltersApi } from '@/context/Summary/RawMaterial/api';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';

const ExportModal = () => {
  const { modalState } = useRawMaterialStateContext();
  const dispatch = useRawMaterialDispatchContext();

  const [loading, setLoading] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    materialName: '',
    source: '',
    startDate: '',
    endDate: '',
  });

  const [uniqueData, setUniqueData] = useState<{
    materialNames: string[];
    sources: string[];
  }>({
    materialNames: [],
    sources: [],
  });

  const isOpen = modalState.isOpen && modalState.type === 'export';

  useEffect(() => {
    if (isOpen) {
      const fetchFilters = async () => {
        const data = await getRawUniqueFiltersApi();
        setUniqueData(data);
      };
      fetchFilters();
    }
  }, [isOpen]);

  const handleClose = () => {
    dispatch(setModal({ isOpen: false, type: null, selectedItem: null }));
    setFilters({ materialName: '', source: '', startDate: '', endDate: '' });
  };

  const handleExport = async (format: 'xlsx' | 'csv' | 'pdf') => {
    setLoading(format);
    try {
      const response = await ApiClient.get('/material/raw/export', {
        params: { ...filters, format },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response as any]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `RawMaterials_Export_${new Date().toISOString().split('T')[0]}.${format === 'xlsx' ? 'xlsx' : format}`,
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

  const sourceOptions = [
    { label: 'All Sources', value: '' },
    ...uniqueData.sources.map((s) => ({ label: s, value: s })),
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Advanced Export: Raw Materials"
      width="lg"
    >
      <div className="space-y-6 py-2">
        <div className="flex items-start gap-4 p-4 bg-violet-50 border border-violet-100 rounded-2xl text-violet-800">
          <AlertCircle className="w-5 h-5 mt-0.5 text-violet-600" />
          <div>
            <Typography variant="p" className="text-sm font-bold">
              Custom Report Configuration
            </Typography>
            <Typography variant="p" className="text-xs text-violet-600 mt-1">
              Select specific materials, vendors, or a date range to narrow down
              your report. Leave fields blank to export all records.
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-200 shadow-inner">
          <div className="space-y-4">
            <DropDown
              label="Filter by Material"
              options={materialOptions}
              value={filters.materialName}
              onChange={(v) =>
                setFilters({ ...filters, materialName: v as string })
              }
              searchable
              placeholder="Select Material"
            />
            <DropDown
              label="Filter by Source / Vendor"
              options={sourceOptions}
              value={filters.source}
              onChange={(v) => setFilters({ ...filters, source: v as string })}
              searchable
              placeholder="Select Vendor"
            />
          </div>
          <div className="space-y-4">
            <DatePicker
              label="Start Date"
              value={filters.startDate}
              onChange={(v) => setFilters({ ...filters, startDate: v })}
              placeholder="From Date"
              fullWidth
              leftIcon={<Calendar className="w-4 h-4" />}
            />
            <DatePicker
              label="End Date"
              value={filters.endDate}
              onChange={(v) => setFilters({ ...filters, endDate: v })}
              placeholder="To Date"
              fullWidth
              leftIcon={<Calendar className="w-4 h-4" />}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => handleExport('xlsx')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-green-300 hover:bg-green-50 transition-all text-center"
          >
            <div className="p-4 bg-green-100 text-green-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <FileSpreadsheet className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              Excel
            </Typography>
            <Typography variant="p" className="text-[10px] text-slate-500">
              Stylized Spreadsheet
            </Typography>
            {loading === 'xlsx' && (
              <div className="mt-2 w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          <button
            onClick={() => handleExport('csv')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-300 hover:bg-blue-50 transition-all text-center"
          >
            <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <FileDown className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              CSV
            </Typography>
            <Typography variant="p" className="text-[10px] text-slate-500">
              Pure Data Export
            </Typography>
            {loading === 'csv' && (
              <div className="mt-2 w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            )}
          </button>

          <button
            onClick={() => handleExport('pdf')}
            disabled={!!loading}
            className="group flex flex-col items-center justify-center p-6 bg-white border border-slate-200 rounded-3xl hover:border-red-300 hover:bg-red-50 transition-all text-center"
          >
            <div className="p-4 bg-red-100 text-red-600 rounded-2xl mb-3 group-hover:scale-110 transition-transform">
              <FileText className="w-8 h-8" />
            </div>
            <Typography variant="p" className="font-bold text-slate-800">
              PDF
            </Typography>
            <Typography variant="p" className="text-[10px] text-slate-500">
              Printable Report
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

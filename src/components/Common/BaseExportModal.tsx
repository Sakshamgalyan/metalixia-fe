'use client';

import React, { useState } from 'react';
import Modal from '@/components/UI/Modal';
import Button from '@/components/UI/Button';
import Typography from '@/components/UI/Typography';
import { FileDown, FileSpreadsheet, AlertCircle } from 'lucide-react';
import ApiClient from '@/lib/apiClient';
import { toast } from '@/components/UI/Toaster';

interface BaseExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  exportUrl: string;
  queryParams: Record<string, any>;
  filenameBase: string;
}

const BaseExportModal = ({
  isOpen,
  onClose,
  title,
  exportUrl,
  queryParams,
  filenameBase,
}: BaseExportModalProps) => {
  const [loading, setLoading] = useState<string | null>(null);

  const handleExport = async (format: 'xlsx' | 'csv') => {
    setLoading(format);
    try {
      const response = await ApiClient.get(exportUrl, {
        params: { ...queryParams, format },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response as any]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${filenameBase}_${new Date().toISOString().split('T')[0]}.${format === 'csv' ? 'csv' : 'xlsx'}`,
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast.success('Export downloaded successfully');
      onClose();
    } catch (error) {
      console.error('Export failed', error);
      toast.error('Failed to generate export');
    } finally {
      setLoading(null);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} width="md">
      <div className="space-y-6 py-2">
        <div className="flex items-start gap-4 p-4 bg-blue-50 border border-blue-100 rounded-xl text-blue-800">
          <AlertCircle className="w-5 h-5 mt-0.5" />
          <div>
            <Typography variant="p" className="text-sm font-semibold">
              Export Configuration
            </Typography>
            <Typography variant="p" className="text-xs text-blue-600 mt-1">
              The export will include all records matching your current active
              filters (search, type, status).
            </Typography>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={() => handleExport('xlsx')}
            disabled={!!loading}
            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-violet-300 hover:bg-violet-50 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 text-green-600 rounded-xl group-hover:bg-green-200 transition-colors">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <Typography variant="p" className="font-bold text-slate-800">
                  Excel Spreadsheet
                </Typography>
                <Typography variant="p" className="text-xs text-slate-500">
                  Professional .xlsx format with styling
                </Typography>
              </div>
            </div>
            {loading === 'xlsx' ? (
              <div className="w-5 h-5 border-2 border-violet-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileDown className="w-5 h-5 text-slate-400 group-hover:text-violet-500" />
            )}
          </button>

          <button
            onClick={() => handleExport('csv')}
            disabled={!!loading}
            className="group flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-300 hover:bg-blue-50 transition-all text-left"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-xl group-hover:bg-blue-200 transition-colors">
                <FileDown className="w-6 h-6" />
              </div>
              <div>
                <Typography variant="p" className="font-bold text-slate-800">
                  CSV Document
                </Typography>
                <Typography variant="p" className="text-xs text-slate-500">
                  Simple comma-separated values (.csv)
                </Typography>
              </div>
            </div>
            {loading === 'csv' ? (
              <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <FileDown className="w-5 h-5 text-slate-400 group-hover:text-blue-500" />
            )}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default BaseExportModal;

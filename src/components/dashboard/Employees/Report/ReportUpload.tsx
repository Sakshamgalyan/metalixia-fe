"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FileText, Calendar, Clock } from "lucide-react";

import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FileUpload from "@/components/UI/FileUpload";
import Table, { TableColumn } from "@/components/UI/Table";
import Chips from "@/components/UI/Chips";
import {
  getMyReports,
  uploadReport,
  Report,
} from "@/ApiClient/Employee/report";

const ReportUpload = () => {
  const [reportName, setReportName] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [history, setHistory] = useState<Report[]>([]);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await getMyReports();
      setHistory(response?.data || []);
    } catch (error) {
      console.error("Error fetching report history", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportName.trim()) {
      toast.error("Please enter a report name");
      return;
    }
    if (files.length === 0) {
      toast.error("Please attach at least one file");
      return;
    }

    setSubmitting(true);
    const formData = new FormData();
    formData.append("name", reportName);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await uploadReport(formData);
      // Reset form
      setReportName("");
      setFiles([]);
      // Refresh history
      fetchHistory();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setSubmitting(false);
    }
  };

  const columns: TableColumn<Report>[] = [
    {
      header: "Report Name",
      accessor: "name",
      className: "font-medium text-slate-900",
      render: (item) => (
        <div className="flex items-center gap-2">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
            <FileText size={16} />
          </div>
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: "Date Uploaded",
      accessor: "date",
      render: (item) => (
        <div className="flex items-center gap-2 text-slate-500">
          <Calendar size={14} />
          // Assuming date is ISO string, simple format here for now
          <span>{new Date(item.date).toLocaleDateString()}</span>
        </div>
      ),
    },
    {
      header: "Files",
      accessor: "files",
      render: (item) => (
        <span className="text-slate-600">{item.files?.length || 0} Files</span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (item) => {
        let variant: "default" | "success" | "warning" | "danger" = "default";
        if (item.status === "Approved") variant = "success";
        else if (item.status === "Pending") variant = "warning";
        else if (item.status === "Rejected") variant = "danger";

        return <Chips label={item.status || "Pending"} colorScheme={variant} />;
      },
    },
  ];

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <Typography variant="h2">Upload Monthly Report</Typography>
        <Typography variant="p" className="text-slate-500">
          Submit your work reports and track their status
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-6 sticky top-6">
            <Typography variant="h4">New Submission</Typography>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Report Name"
                placeholder="e.g. October 2023 Performance"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                required
              />

              <div className="space-y-1">
                <FileUpload
                  value={files}
                  onChange={setFiles}
                  accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  maxSize={25}
                  label="Upload files"
                />
              </div>

              <Button
                type="submit"
                fullWidth
                isLoading={submitting}
                loadingText="Uploading..."
              >
                Submit Report
              </Button>
            </form>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="text-slate-400" size={20} />
            <Typography variant="h4">Submission History</Typography>
          </div>

          <Table
            data={history}
            columns={columns}
            isLoading={loading}
            emptyMessage="No reports uploaded yet"
            headerAlign="left"
            keyExtractor={(item) => item.id}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Clock } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import FileUpload from "@/components/UI/FileUpload";
import Table from "@/components/UI/Table";
import { columns, Report } from "./Constants";
import {
  useReportUploadDispatchContext,
  useReportUploadStateContext,
} from "@/context/Employee/ReportUpload/hooks";
import {
  deleteReportApi,
  getMyReports,
  uploadReportApi,
} from "@/context/Employee/ReportUpload/api";
import NoDataState from "@/components/Common/NoDataState";
import { fetchReportUploadLoading } from "@/context/Employee/ReportUpload/actions";
import { useAppSelector } from "@/store/hooks";
import Card from "@/components/UI/Card";

const ReportUpload = () => {
  const [reportName, setReportName] = useState<string>("");
  const [files, setFiles] = useState<File[]>([]);
  const { user } = useAppSelector((state) => state.auth);
  const employeeId = user?.employeeId;
  const dispatch = useReportUploadDispatchContext();
  const { listLoading, uploadLoading, listData } =
    useReportUploadStateContext();

  useEffect(() => {
    getMyReports(dispatch, 1, 10);
  }, [dispatch]);

  const handleSubmit = async () => {
    if (!employeeId) {
      toast.error("Employee ID is missing");
      return;
    }

    if (files.length === 0) {
      toast.error("Please attach at least one file");
      return;
    }

    dispatch(fetchReportUploadLoading(true));
    const formData = new FormData();
    formData.append("reportName", reportName);
    formData.append("employeeId", employeeId);
    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await uploadReportApi(dispatch, formData);
      setReportName("");
      setFiles([]);
      getMyReports(dispatch, 1, 10);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      dispatch(fetchReportUploadLoading(false));
    }
  };

  const handleDelete = async (item: Report) => {
    await deleteReportApi(dispatch, item.id)
    getMyReports(dispatch, 1, 10);
  };
  return (
    <div className="px-3 py-7 max-w-[95%] mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <Typography variant="h2">Upload Monthly Report</Typography>
        <Typography variant="p" className="text-slate-500">
          Submit your work reports and track their status
        </Typography>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Form */}
        <div className="lg:col-span-1">
          <Typography variant="h4" className="mb-4">
            New Submission
          </Typography>

          <Card>
            <div className="space-y-4">
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
                  accept=".pdf,.doc,.docx"
                  maxSize={25}
                  label="Upload files"
                />
              </div>

              <Button
                type="submit"
                fullWidth
                onClick={handleSubmit}
                isLoading={uploadLoading}
                loadingText="Uploading..."
              >
                Submit Report
              </Button>
            </div>
          </Card>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <Clock className="text-slate-400" size={20} />
            <Typography variant="h4">Submission History</Typography>
          </div>

          {listLoading ? (
            <Table
              columns={columns(handleDelete)}
              data={[]}
              isLoading={listLoading}
              emptyMessage="No reports uploaded yet"
              keyExtractor={(item) => item.id}
            />
          ) : (listData?.data?.length ?? 0) > 0 ? (
            <Table
              data={listData?.data ?? []}
              columns={columns(handleDelete)}
              isLoading={listLoading}
              emptyMessage="No reports uploaded yet"
              keyExtractor={(item) => item.id}
            />
          ) : (
            <NoDataState
              title="No reports uploaded yet"
              message="You have not uploaded any reports yet."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportUpload;

"use client";

import { useEffect } from "react";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import NoDataState from "@/components/Common/NoDataState";
import { columns } from "./Constants";
import {
  approveReportApi,
  getAllReports,
  deleteReportApi,
  downloadReportApi,
} from "@/context/admin/UploadedReports/api";
import {
  useUploadedReportDispatchContext,
  useUploadedReportStateContext,
} from "@/context/admin/UploadedReports/hooks";
import { Report } from "@/components/dashboard/Employees/Report/Constants";
import { mailedReportsApi } from "@/context/Employee/ReportUpload/api";
import Button from "@/components/UI/Button";

const UploadedReport = () => {
  const dispatch = useUploadedReportDispatchContext();
  const { listLoading, listData } = useUploadedReportStateContext();

  useEffect(() => {
    getAllReports(dispatch, 1, 10);
  }, []);

  const handleApprove = async (item: any) => {
    await approveReportApi(dispatch, item.id, "approved");
    getAllReports(dispatch, 1, 10);
  };

  const handleReject = async (item: any) => {
    await deleteReportApi(dispatch, item.id);
    await approveReportApi(dispatch, item.id, "rejected");
    getAllReports(dispatch, 1, 10);
  };

  const handleDownload = async (item: Report) => {
    let extension = "pdf";
    const type = item.fileType?.toLowerCase() || "";
    if (type.includes("word") || type.includes("document")) extension = "docx";
    else if (type.includes("excel") || type.includes("spreadsheet"))
      extension = "xlsx";
    else if (type.includes("image")) extension = "png";
    else if (type.includes("csv")) extension = "csv";

    const filename = `${item.name}.${extension}`;
    try {
      await downloadReportApi(item.id, filename);
    } catch (error) {
      console.error("Download failed", error);
    }
  };

  const handleMailedReports = async () => {
    mailedReportsApi(dispatch, 1, 10);
  };

  const handleGetAllReports = async () => {
    getAllReports(dispatch, 1, 10);
  };

  return (
    <div className="px-6 py-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-1 mb-6">
          <Typography variant="h2">Uploaded Reports</Typography>
          <Typography variant="p" className="text-slate-500">
            List of uploaded reports
          </Typography>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={handleMailedReports} size="sm">
            Mailed Reports
          </Button>
          <Button size="sm" onClick={handleGetAllReports}>
            Get All Reports
          </Button>
        </div>
      </div>

      {listLoading ? (
        <Table
          data={[]}
          columns={columns(handleApprove, handleReject, handleDownload)}
          isLoading
          keyExtractor={(item: any) => item.id}
        />
      ) : (listData?.data?.length ?? 0) > 0 ? (
        <Table
          data={listData?.data || []}
          columns={columns(handleApprove, handleReject, handleDownload)}
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <NoDataState message="No uploaded reports found" />
      )}
    </div>
  );
};

export default UploadedReport;

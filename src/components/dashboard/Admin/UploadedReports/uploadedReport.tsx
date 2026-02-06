"use client";

import { useEffect } from "react";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import NoDataState from "@/components/Common/NoDataState";
import { columns } from "./Constants";
import { approveReportApi, getAllReports, deleteReportApi } from "@/context/admin/UploadedReports/api";
import { useUploadedReportDispatchContext, useUploadedReportStateContext } from "@/context/admin/UploadedReports/hooks";

const UploadedReport = () => {
  const dispatch = useUploadedReportDispatchContext();
  const { listLoading, listData } = useUploadedReportStateContext();

  useEffect(() => {
    getAllReports(dispatch, 1, 10);
  }, []);

  const handleApprove = async (item: any) => {
    await approveReportApi(dispatch, item.id, "approved")
    getAllReports(dispatch, 1, 10);
  };

  const handleReject = async (item: any) => {
    await deleteReportApi(dispatch, item.id)
    await approveReportApi(dispatch, item.id, "rejected")
    getAllReports(dispatch, 1, 10);
  };

  return (
    <div className="px-6 py-10">
      <div className="flex flex-col gap-1 mb-6">
        <Typography variant="h2">Uploaded Reports</Typography>
        <Typography variant="p" className="text-slate-500">
            List of uploaded reports
        </Typography>
      </div>

      {listLoading ? (
        <Table
          data={[]}
          columns={columns(handleApprove, handleReject)}
          isLoading
          keyExtractor={(item: any) => item.id}
        />
      ) : (listData?.data?.length ?? 0) > 0 ? (
        <Table
          data={listData?.data || []}
          columns={columns(handleApprove, handleReject)}
          keyExtractor={(item: any) => item.id}
        />
      ) : (
        <NoDataState message="No uploaded reports found" />
      )}
    </div>
  );
};

export default UploadedReport;

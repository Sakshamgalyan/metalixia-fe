"use client";

import Typography from "@/components/UI/Typography";
import { Mail, CheckCircle, Clock, AlertCircle } from "lucide-react";

const MailedReports = () => {
  const reports = [
    {
      id: "RPT-2024-001",
      name: "Weekly Production Summary",
      recipient: "management@metalixia.com",
      date: "2024-02-07 09:00 AM",
      status: "sent",
      type: "Production",
    },
    {
      id: "RPT-2024-002",
      name: "Safety Incident Report",
      recipient: "safety@metalixia.com",
      date: "2024-02-06 04:30 PM",
      status: "sent",
      type: "Safety",
    },
    {
      id: "RPT-2024-003",
      name: "Inventory Status",
      recipient: "logistics@metalixia.com",
      date: "2024-02-06 08:00 AM",
      status: "failed",
      type: "Inventory",
    },
    {
      id: "RPT-2024-004",
      name: "Employee Attendance",
      recipient: "hr@metalixia.com",
      date: "2024-02-05 09:00 AM",
      status: "sent",
      type: "HR",
    },
    {
      id: "RPT-2024-005",
      name: "Maintenance Schedule",
      recipient: "maintenance@metalixia.com",
      date: "2024-02-05 02:15 PM",
      status: "pending",
      type: "Maintenance",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-green-100 text-green-700 border-green-200";
      case "failed":
        return "bg-red-100 text-red-700 border-red-200";
      case "pending":
        return "bg-orange-100 text-orange-700 border-orange-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <CheckCircle size={14} className="mr-1" />;
      case "failed":
        return <AlertCircle size={14} className="mr-1" />;
      case "pending":
        return <Clock size={14} className="mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-end mb-8">
        <div>
          <Typography variant="h2" className="flex items-center gap-3">
            <Mail className="text-slate-800" size={32} /> Mailed Reports
          </Typography>
          <Typography variant="p" className="text-slate-500 mt-1">
            History of automated and manual reports sent to stakeholders
          </Typography>
        </div>
        <div className="flex gap-3">
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium text-slate-600">
              98% Success Rate
            </span>
          </div>
          <div className="bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm flex items-center gap-2">
            <span className="text-sm font-medium text-slate-600">
              Total Sent: 1,240
            </span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Report Name
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Date Sent
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.map((report) => (
                <tr
                  key={report.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">
                      {report.name}
                    </div>
                    <div className="text-xs text-slate-400 font-mono">
                      {report.id}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                      {report.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {report.recipient}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {report.date}
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                        report.status,
                      )}`}
                    >
                      {getStatusIcon(report.status)}
                      <span className="capitalize">{report.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors">
                      View
                    </button>
                    <span className="mx-2 text-slate-300">|</span>
                    <button className="text-slate-400 hover:text-blue-600 text-sm font-medium transition-colors">
                      Resend
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center">
          <span className="text-sm text-slate-500">
            Showing 5 of 124 results
          </span>
          <div className="flex gap-2">
            <button
              className="px-3 py-1 text-sm border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 text-sm border border-slate-200 rounded-md bg-white text-slate-600 hover:bg-slate-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailedReports;

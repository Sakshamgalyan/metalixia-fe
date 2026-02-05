"use client";

import { useState } from "react";
import {
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Chips from "@/components/UI/Chips";
import Button from "@/components/UI/Button";

// Mock Data
const MOCK_ATTENDANCE = [
  {
    date: "2023-10-01",
    status: "Present",
    checkIn: "09:00 AM",
    checkOut: "06:00 PM",
    hours: "9h 0m",
  },
  {
    date: "2023-10-02",
    status: "Present",
    checkIn: "09:15 AM",
    checkOut: "06:15 PM",
    hours: "9h 0m",
  },
  {
    date: "2023-10-03",
    status: "Absent",
    checkIn: "-",
    checkOut: "-",
    hours: "-",
  },
  {
    date: "2023-10-04",
    status: "Present",
    checkIn: "09:05 AM",
    checkOut: "06:05 PM",
    hours: "9h 0m",
  },
  {
    date: "2023-10-05",
    status: "Half Day",
    checkIn: "09:00 AM",
    checkOut: "01:00 PM",
    hours: "4h 0m",
  },
  // ... more statuses can be added
];

const STATS = [
  {
    label: "Total Working Days",
    value: "22",
    icon: <Calendar size={20} className="text-blue-500" />,
    bg: "bg-blue-50",
  },
  {
    label: "Present Days",
    value: "18",
    icon: <CheckCircle size={20} className="text-green-500" />,
    bg: "bg-green-50",
  },
  {
    label: "Absent Days",
    value: "2",
    icon: <XCircle size={20} className="text-red-500" />,
    bg: "bg-red-50",
  },
  {
    label: "Late Arrivals",
    value: "2",
    icon: <Clock size={20} className="text-orange-500" />,
    bg: "bg-orange-50",
  },
];

const AttendanceView = () => {
  const [currentMonth, setCurrentMonth] = useState("October 2023"); // Mock month

  return (
    <div className="px-6 py-10 max-w-7xl mx-auto">
      <div className="flex flex-col gap-1 mb-8">
        <Typography variant="h2">My Attendance</Typography>
        <Typography variant="p" className="text-slate-500">
          Track your daily attendance and work hours
        </Typography>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat, index) => (
          <div
            key={index}
            className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
          >
            <div className={`p-3 rounded-lg ${stat.bg}`}>{stat.icon}</div>
            <div>
              <Typography variant="h4" className="text-slate-900">
                {stat.value}
              </Typography>
              <Typography
                variant="p"
                className="text-xs text-slate-500 font-medium"
              >
                {stat.label}
              </Typography>
            </div>
          </div>
        ))}
      </div>

      {/* Attendance List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <Typography variant="h4">Attendance Log - {currentMonth}</Typography>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => {}}>
              Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => {}}>
              Next
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium">Check In</th>
                <th className="p-4 font-medium">Check Out</th>
                <th className="p-4 font-medium">Work Hours</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_ATTENDANCE.map((record, index) => (
                <tr
                  key={index}
                  className="border-b border-slate-50 last:border-none hover:bg-slate-50/50 transition-colors"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      <span className="text-sm font-medium text-slate-700">
                        {record.date}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <Chips
                      label={record.status}
                      colorScheme={
                        record.status === "Present"
                          ? "success"
                          : record.status === "Absent"
                            ? "danger"
                            : "warning"
                      }
                      size="sm"
                    />
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {record.checkIn}
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {record.checkOut}
                  </td>
                  <td className="p-4 text-sm text-slate-600 font-medium">
                    {record.hours}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AttendanceView;

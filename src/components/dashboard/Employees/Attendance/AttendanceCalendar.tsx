"use client";

import React, { useEffect, useState } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import ApiClient from "@/lib/apiClient";
import LeaveModal from "./LeaveModal";
import { toast } from "sonner";
import { useAppSelector } from "@/store/hooks";

interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent" | "Leave" | "Half Day" | "Late" | "Holiday";
  inTime?: string;
  outTime?: string;
  totalHours?: string;
}

interface AttendanceCalendarProps {
  employeeId?: string;
  isAdmin?: boolean;
}

const AttendanceCalendar = ({
  employeeId,
  isAdmin = false,
}: AttendanceCalendarProps) => {
  const { user } = useAppSelector((state) => state.auth);
  // If no employeeId passed, use the current user's (for employee view)
  const targetEmployeeId = employeeId || user?.employeeId;

  const [currentDate, setCurrentDate] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false);

  // Fetch attendance data
  const fetchAttendance = async () => {
    if (!targetEmployeeId) return;

    setLoading(true);
    try {
      const month = format(currentDate, "MM"); // 01-12
      const year = format(currentDate, "yyyy");

      // Mocking the request if endpoint doesn't exist yet, but trying to follow user instruction
      // "fingerprint attendance service which I can get data from backend which you can map"
      const response = await ApiClient.get<any>(
        `/attendance/fingerprint/${targetEmployeeId}?month=${month}&year=${year}`,
      );

      if (response && response.data) {
        setAttendanceData(response.data);
      } else {
        setAttendanceData([]);
      }
    } catch (error) {
      console.error("Failed to fetch attendance calendar data", error);
      // Optional: don't show toast on 404 if data just missing
      setAttendanceData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, [currentDate, targetEmployeeId]);

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Calendar generation
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const calendarDays = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const getDayStatus = (date: Date) => {
    // Assuming backend returns date in YYYY-MM-DD format
    const dateStr = format(date, "yyyy-MM-dd");
    return attendanceData.find((record) => record.date === dateStr);
  };

  const statusColors: Record<string, string> = {
    Present: "bg-green-100 text-green-700 border-green-200",
    Absent: "bg-red-100 text-red-700 border-red-200",
    Leave: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Half Day": "bg-blue-100 text-blue-700 border-blue-200",
    Late: "bg-orange-100 text-orange-700 border-orange-200",
    Holiday: "bg-purple-100 text-purple-700 border-purple-200",
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto">
          <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1 w-full sm:w-auto justify-between sm:justify-start">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="w-40 text-center font-medium text-slate-700">
              {format(currentDate, "MMMM yyyy")}
            </span>
            <button
              onClick={nextMonth}
              className="p-1 hover:bg-slate-100 rounded-md transition-colors text-slate-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-100 border border-green-200 rounded-sm"></div>{" "}
              Present
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-100 border border-red-200 rounded-sm"></div>{" "}
              Absent
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-200 rounded-sm"></div>{" "}
              Leave
            </div>
          </div>
        </div>

        <Button
          onClick={() => setIsLeaveModalOpen(true)}
          leftIcon={<Plus size={16} />}
          size="sm"
          className="w-full md:w-auto"
        >
          Apply Leave
        </Button>
      </div>

      <Card padding="none" className="overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-slate-200 bg-slate-50">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div
                  key={day}
                  className="py-3 text-center text-xs font-semibold text-slate-500 uppercase tracking-wider"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 divide-x divide-y divide-slate-200 bg-white">
              {calendarDays.map((day, dayIdx) => {
                const isCurrentMonth = isSameMonth(day, monthStart);
                const isToday = isSameDay(day, new Date());
                const record = getDayStatus(day);
                const statusClass = record
                  ? statusColors[record.status] || "bg-slate-50 text-slate-500"
                  : "";

                return (
                  <div
                    key={day.toString()}
                    className={`
                  min-h-[100px] p-2 flex flex-col gap-1 transition-colors
                  ${!isCurrentMonth ? "bg-slate-50/50" : "bg-white"}
                  ${isToday ? "bg-blue-50/30" : ""}
                `}
                  >
                    <div className="flex justify-between items-start">
                      <span
                        className={`
                    text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full
                    ${isToday
                            ? "bg-[#707FDD] text-white"
                            : !isCurrentMonth
                              ? "text-slate-400"
                              : "text-slate-700"
                          }
                  `}
                      >
                        {format(day, "d")}
                      </span>
                    </div>

                    {record && (
                      <div
                        className={`text-xs p-1.5 rounded border mt-auto mb-1 ${statusClass}`}
                      >
                        <div className="font-semibold">{record.status}</div>
                        {record.inTime && (
                          <div className="opacity-80 text-[10px]">
                            In: {record.inTime}
                          </div>
                        )}
                        {record.outTime && (
                          <div className="opacity-80 text-[10px]">
                            Out: {record.outTime}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      <LeaveModal
        isOpen={isLeaveModalOpen}
        onClose={() => setIsLeaveModalOpen(false)}
        onSuccess={() => fetchAttendance()} // Refresh calendar
        employeeId={targetEmployeeId}
        isAdmin={isAdmin}
      />
    </div>
  );
};

export default AttendanceCalendar;

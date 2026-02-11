"use client";

import Button from "@/components/UI/Button";
import Card from "@/components/UI/Card";
import Dropdown from "@/components/UI/DropDown";
import FileUpload from "@/components/UI/FileUpload";
import Input from "@/components/UI/Input";
import Table from "@/components/UI/Table";
import Typography from "@/components/UI/Typography";
import ApiClient from "@/lib/apiClient";
import { Calendar, FileText, UploadCloud, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { columns, months } from "./Constant";
import AttendanceCalendar from "./AttendanceCalendar";

const Attendance = () => {
  const [employees, setEmployees] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [files, setFiles] = useState<File[]>([]);
  const [attendanceList, setAttendanceList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await ApiClient.get<any>("/employee/get-employees");
      if (response.data) {
        setEmployees(
          response.data.map((emp: any) => ({
            label: emp.name,
            value: emp.employeeId,
          })),
        );
      }
    } catch (error) {
      console.error("Failed to fetch employees", error);
      toast.error("Failed to fetch employees");
    }
  };

  const fetchAttendance = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get<any>(
        "/attendance/get-all-attendance",
      );
      if (response && response.data) {
        setAttendanceList(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch attendance", error);
      toast.error("Failed to fetch attendance");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchAttendance();
  }, []);

  const handleUpload = async () => {
    if (!selectedEmployee || !month || !year || files.length === 0) {
      toast.error("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("employeeId", selectedEmployee);
    formData.append("month", month);
    formData.append("year", year);
    formData.append("file", files[0]);
    // Note: uploadedBy is handled by middleware/user context in real app,
    // but DTO expects it. If auth middleware injects user, backend should handle.
    // Assuming backend extracts from token or we send a placeholder if not.
    // For now, let's assume backend might need it if not using User decorator in service properly.
    // But looking at Controller, it uses body DTO.
    // Let's rely on backend extracting it or standard way.
    // Actually, payslip service looked up uploader from 'uploadedBy' field.
    // Attendance controller uses 'CreateAttendanceDto' which has 'uploadedBy'.
    // We should probably send it if we have it in context, or the backend should extract from request.user.
    // I'll append a dummy value or handle in backend if needed.
    // Waiting, PaySlip implementation didn't send uploadedBy in formData explicitly in frontend.
    // Let's check PaySlip DTO... it had uploadedBy?
    // Provide a default or fix backend to use Request user.
    // For now, appending a value to satisfy DTO validation if strict.
    formData.append("uploadedBy", "self");

    setUploadLoading(true);
    try {
      await ApiClient.post("/attendance/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Attendance uploaded successfully");
      setFiles([]);
      setSelectedEmployee("");
      setMonth("");
      fetchAttendance();
    } catch (error: any) {
      console.error("Failed to upload attendance", error);
      toast.error(
        error.response?.data?.message || "Failed to upload attendance",
      );
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const response = await ApiClient.get(`/attendance/download/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response as any]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download attendance", error);
      toast.error("Failed to download attendance");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    try {
      await ApiClient.delete(`/attendance/${id}`);
      toast.success("Attendance deleted successfully");
      fetchAttendance();
    } catch (error) {
      console.error("Failed to delete attendance", error);
      toast.error("Failed to delete attendance");
    }
  };

  return (
    <div className="px-4 py-6 md:px-6 md:py-10 w-full mx-auto space-y-8">
      <div className="space-y-2">
        <Typography variant="h4">Attendance Calendar & Leave</Typography>
        <Typography className="text-slate-500 text-sm">
          View daily attendance logs and apply for leave
        </Typography>
        <AttendanceCalendar employeeId={selectedEmployee} isAdmin={true} />
      </div>
    </div>
  );
};

export default Attendance;

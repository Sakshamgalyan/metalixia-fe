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

const PaySlip = () => {
  const [employees, setEmployees] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [files, setFiles] = useState<File[]>([]);
  const [payslips, setPayslips] = useState<any[]>([]);
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

  const fetchPayslips = async () => {
    setLoading(true);
    try {
      const response = await ApiClient.get<any>("/payslip/get-all-payslips");
      if (response.data) {
        setPayslips(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch payslips", error);
      toast.error("Failed to fetch payslips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchPayslips();
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

    setUploadLoading(true);
    try {
      await ApiClient.post("/payslip/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Payslip uploaded successfully");
      setFiles([]);
      setSelectedEmployee("");
      setMonth("");
      fetchPayslips();
    } catch (error: any) {
      console.error("Failed to upload payslip", error);
      toast.error(error.response?.data?.message || "Failed to upload payslip");
    } finally {
      setUploadLoading(false);
    }
  };

  const handleDownload = async (id: string, fileName: string) => {
    try {
      const response = await ApiClient.get(`/payslip/download/${id}`, {
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
      console.error("Failed to download payslip", error);
      toast.error("Failed to download payslip");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this payslip?")) return;
    try {
      await ApiClient.delete(`/payslip/${id}`);
      toast.success("Payslip deleted successfully");
      fetchPayslips();
    } catch (error) {
      console.error("Failed to delete payslip", error);
      toast.error("Failed to delete payslip");
    }
  };

  return (
    <div className="px-3 py-5 w-[95%] mx-auto space-y-8">
      <div className="flex flex-col gap-1">
        <Typography variant="h2">Upload Payslip</Typography>
        <Typography className="text-slate-500 text-sm">
          Upload PDF payslip for employee
        </Typography>
      </div>

      <div className="flex flex-row gap-4 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8">
        <div className="space-y-2">
          <Typography variant="h4">New Submission</Typography>

          <Card>
            <div className="flex flex-col gap-4">
              <Dropdown
                label={
                  <span className="flex items-center gap-2">
                    <User size={16} /> Select Employee
                  </span>
                }
                options={employees}
                value={selectedEmployee ? [selectedEmployee] : []}
                onChange={(val) => setSelectedEmployee(val as string)}
                className="space-y-1"
                placeholder="Select Employee"
              />

              <div className="flex flex-row gap-4">
                <Dropdown
                  className="space-y-1"
                  label={
                    <span className="flex items-center gap-2">
                      <Calendar size={16} /> Month
                    </span>
                  }
                  options={months.map((m) => ({ label: m, value: m }))}
                  value={month ? [month] : []}
                  onChange={(val) => setMonth(val as string)}
                  placeholder="Select"
                />
                <Input
                  className="space-y-1"
                  label={
                    <span className="flex items-center gap-2">
                      <Calendar size={16} /> Year
                    </span>
                  }
                  placeholder="YYYY"
                  type="number"
                  fullWidth
                  min={1900}
                  max={new Date().getFullYear()}
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
              </div>

              <FileUpload
                label={
                  <span className="flex items-center gap-2">
                    <FileText size={16} /> Upload Payslip
                  </span>
                }
                accept=".pdf"
                maxSize={5}
                allowMultiple={false}
                value={files}
                onChange={setFiles}
              />

              <Button
                leftIcon={<UploadCloud size={18} />}
                onClick={handleUpload}
                isLoading={uploadLoading}
              >
                Upload Payslip
              </Button>
            </div>
          </Card>
        </div>

        <div className="">
          <div className="">
            <Typography variant="h4">Submission History</Typography>
            <Typography className="text-slate-500 text-sm">
              View all payslip submissions
            </Typography>
          </div>
          <Table
            data={payslips}
            keyExtractor={(item: any) => item.id}
            columns={columns(handleDownload, handleDelete)}
            isLoading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default PaySlip;

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { UploadCloud, User, Calendar, FileText } from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/DropDown";
import FileUpload from "@/components/UI/FileUpload";
import { getAllEmployees } from "@/ApiClient/Admin/admin";

const PayslipUpload = () => {
  const [employees, setEmployees] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        // Fetch all employees without pagination for dropdown
        const response = await getAllEmployees({ limit: 1000 });
        if (response?.data) {
          const options = response.data.map((emp: any) => ({
            label: `${emp.firstName} ${emp.lastName} (${emp.email})`,
            value: emp._id,
          }));
          setEmployees(options);
        }
      } catch (error) {
        console.error("Failed to fetch employees", error);
        toast.error("Could not load employee list");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedEmployee) {
      toast.error("Please select an employee");
      return;
    }
    if (!month || !year) {
      toast.error("Please select month and year");
      return;
    }
    if (files.length === 0) {
      toast.error("Please upload the payslip file");
      return;
    }

    setSubmitting(true);
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success("Payslip uploaded successfully");
    setFiles([]);
    setSubmitting(false);
    // Reset form optional
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="px-6 py-10 max-w-2xl mx-auto">
      <div className="flex flex-col gap-1 mb-8 text-center">
        <Typography variant="h2">Upload Payslip</Typography>
        <Typography variant="p" className="text-slate-500">
          Upload and send monthly payslips to employees
        </Typography>
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Employee Selection */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <User size={16} /> Select Employee
            </label>
            <Dropdown
              options={employees}
              value={selectedEmployee ? [selectedEmployee] : []}
              onChange={(val) => setSelectedEmployee(val as string)}
              placeholder={
                loading ? "Loading employees..." : "Search employee..."
              }
              className="w-full"
            />
          </div>

          {/* Period Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                <Calendar size={16} /> Month
              </label>
              <Dropdown
                options={months.map((m) => ({ label: m, value: m }))}
                value={month ? [month] : []}
                onChange={(val) => setMonth(val as string)}
                placeholder="Select Month"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-700">Year</label>
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                type="number"
              />
            </div>
          </div>

          {/* File Upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
              <FileText size={16} /> Payslip Document
            </label>
            <FileUpload
              value={files}
              onChange={setFiles}
              accept=".pdf"
              maxSize={5}
              label="Upload PDF"
            />
            <p className="text-xs text-slate-400 mt-1">
              Supported format: PDF only. Max 5MB.
            </p>
          </div>

          <Button
            type="submit"
            fullWidth
            isLoading={submitting}
            loadingText="Uploading..."
            leftIcon={<UploadCloud size={18} />}
          >
            Upload & Send
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PayslipUpload;

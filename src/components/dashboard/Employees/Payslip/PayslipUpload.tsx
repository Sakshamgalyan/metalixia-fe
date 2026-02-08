"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  UploadCloud,
  User,
  Calendar,
  FileText,
  Trash2,
  Download,
  Edit2,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import Dropdown from "@/components/UI/DropDown";
import FileUpload from "@/components/UI/FileUpload";
import { getAllEmployees } from "@/ApiClient/Admin/admin";
import Table, { TableColumn } from "@/components/UI/Table";
import Chips from "@/components/UI/Chips";
import {
  useUploadPaySlipDispatchContext,
  useUploadPaySlipStateContext,
} from "@/context/Employee/UploadPaySlip/hooks";
import {
  deletePayslipApi,
  downloadPayslipApi,
  getAllPayslips,
  uploadPayslipApi,
} from "@/context/Employee/UploadPaySlip/api";

const PayslipUpload = () => {
  const dispatch = useUploadPaySlipDispatchContext();
  const { listLoading, uploadLoading, deleteLoading } =
    useUploadPaySlipStateContext();

  const [employees, setEmployees] = useState<
    { label: string; value: string }[]
  >([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [files, setFiles] = useState<File[]>([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    getAllPayslips(dispatch);
  }, [dispatch]);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    // if (!selectedEmployee) {
    //   toast.error("Please select an employee");
    //   return;
    // }
    // if (!month || !year) {
    //   toast.error("Please select month and year");
    //   return;
    // }
    if (editingId) {
      // await updatePayslipAp(
      //   dispatch,
      //   editingId,
      //   { employeeId: selectedEmployee, month, year },
      //   () => {
      //     resetForm();
      //     getAllPayslips(dispatch);
      //   },
      // );
    } else {
      if (files.length === 0) {
        toast.error("Please upload the payslip file");
        return;
      }
      const formData = new FormData();
      formData.append("employeeId", "1");
      formData.append("month", month);
      formData.append("year", year);
      formData.append("file", files[0]);

      await uploadPayslipApi(dispatch, formData, () => {
        resetForm();
        getAllPayslips(dispatch);
      });
    }
  };

  const resetForm = () => {
    setFiles([]);
    setSelectedEmployee("");
    setMonth("");
    setYear(new Date().getFullYear().toString());
    setEditingId(null);
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setSelectedEmployee(item.employeeId);
    setMonth(item.month);
    setYear(item.year);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this payslip?")) {
      await deletePayslipApi(dispatch, id, () => {
        getAllPayslips(dispatch);
      });
    }
  };

  const handleDownload = async (id: string, fileName: string) => {
    await downloadPayslipApi(id, fileName || "payslip.pdf");
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

  const columns: TableColumn<any>[] = [
    {
      header: "Employee",
      accessor: "firstName",
      render: (item) => (
        <div className="font-medium text-slate-900">{item.firstName}</div>
      ),
    },
    {
      header: "Month/Year",
      accessor: "month",
      render: (item) => (
        <div className="flex gap-1">
          <Chips label={item.month} size="sm" />
          <Chips label={item.year} size="sm" colorScheme="default" />
        </div>
      ),
    },
    {
      header: "Uploaded At",
      accessor: "uploadedAt",
      render: (item) => (
        <span className="text-slate-500 text-sm">
          {new Date(item.uploadedAt).toLocaleDateString()}
        </span>
      ),
    },
    {
      header: "File",
      accessor: "fileName",
      render: (item) => (
        <div className="flex items-center gap-2 text-slate-500 text-sm">
          <FileText size={14} />
          <span className="truncate max-w-[150px]">{item.fileName}</span>
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "actions",
      render: (item) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleEdit(item)}
            leftIcon={<Edit2 size={14} />}
            disabled={!!editingId} // Disable if already editing something
          >
            Edit
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDownload(item.id, item.fileName)}
            leftIcon={<Download size={14} />}
          >
            Download
          </Button>
          <Button
            size="sm"
            variant="danger"
            onClick={() => handleDelete(item.id)}
            isLoading={deleteLoading} // Note: global loading state might affect all buttons, ideal is local state per item
            disabled={deleteLoading}
            leftIcon={<Trash2 size={14} />}
          />
        </div>
      ),
    },
  ];

  const list = [];

  return (
    <div className="px-6 py-10 max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Upload Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-6">
          <div className="mb-6">
            <Typography variant="h3">
              {editingId ? "Edit Payslip Details" : "Upload New Payslip"}
            </Typography>
            <Typography variant="p" className="text-slate-500 text-sm">
              {editingId
                ? "Update details for the selected payslip."
                : "Upload PDF payslip for an employee."}
            </Typography>
          </div>

          <div className="space-y-5">
            <div className="space-y-1">
              <Dropdown
                options={employees}
                label={
                  <div className="flex items-center gap-2">
                    <User size={16} /> Select Employee
                  </div>
                }
                value={selectedEmployee ? [selectedEmployee] : []}
                onChange={(val) => setSelectedEmployee(val as string)}
                loading={loadingEmployees}
                placeholder={
                  loadingEmployees ? "Loading..." : "Search employee..."
                }
                className="w-full space-y-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Dropdown
                label={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> Month
                  </div>
                }
                options={months.map((m) => ({ label: m, value: m }))}
                value={month ? [month] : []}
                onChange={(val) => setMonth(val as string)}
                placeholder="Select"
                className="w-full space-y-1"
              />
              <Input
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="YYYY"
                type="number"
                label={
                  <div className="flex items-center gap-2">
                    <Calendar size={16} /> Year
                  </div>
                }
                className="w-full space-y-1"
              />
            </div>

            {!editingId && (
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <FileText size={16} /> Document
                </label>
                <FileUpload
                  value={files}
                  onChange={setFiles}
                  allowMultiple={false}
                  accept=".pdf"
                  maxSize={5}
                  label="PDF File"
                />
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={handleSubmit}
                fullWidth
                isLoading={uploadLoading}
                loadingText={editingId ? "Updating..." : "Uploading..."}
                leftIcon={
                  editingId ? <Edit2 size={18} /> : <UploadCloud size={18} />
                }
              >
                {editingId ? "Update Payslip" : "Upload Payslip"}
              </Button>
              {editingId && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={handleCancelEdit}
                >
                  Cancel
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Payslip List */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col gap-1">
          <Typography variant="h2">Payslip History</Typography>
          <Typography variant="p" className="text-slate-500">
            Manage uploaded payslips
          </Typography>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <Table
            data={[]}
            columns={columns}
            isLoading={listLoading}
            keyExtractor={(item) => item.id}
          />
        </div>
      </div>
    </div>
  );
};

export default PayslipUpload;

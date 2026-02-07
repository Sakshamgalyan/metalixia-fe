import { TableColumn } from "@/components/UI/Table";
import {
  Calendar,
  EditIcon,
  FileText,
  TrashIcon,
  FileSpreadsheet,
  FileImage,
  File,
} from "lucide-react";
import Chips from "@/components/UI/Chips";
import Button from "@/components/UI/Button";

export interface Report {
  id: string;
  name: string;
  date: number;
  fileType: string;
  status?: string;
  action?: any;
}

export const columns = (
  onDelete: (item: Report) => void,
): TableColumn<Report>[] => [
  {
    header: "Report Name",
    accessor: "name",
    className: "font-medium text-slate-900",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
          <FileText size={16} />
        </div>
        <span>{item.name}</span>
      </div>
    ),
  },
  {
    header: "Date Uploaded",
    accessor: "date",
    render: (item) => (
      <div className="flex items-center gap-2 text-slate-500">
        <Calendar size={14} />
        <span>{new Date(item.date).toLocaleDateString()}</span>
      </div>
    ),
  },
  {
    header: "Type",
    accessor: "fileType",
    render: (item) => {
      const type = item.fileType?.toLowerCase() || "";
      let icon = <File size={16} className="text-slate-500" />;
      let label = "FILE";

      if (type.includes("pdf")) {
        icon = <FileText size={16} className="text-red-500" />;
        label = "PDF";
      } else if (type.includes("word") || type.includes("document")) {
        icon = <FileText size={16} className="text-blue-500" />;
        label = "DOCX";
      } else if (type.includes("excel") || type.includes("spreadsheet")) {
        icon = <FileSpreadsheet size={16} className="text-green-500" />;
        label = "XLSX";
      } else if (type.includes("image")) {
        icon = <FileImage size={16} className="text-purple-500" />;
        label = "IMG";
      }

      return (
        <div className="flex items-center gap-2">
          {icon}
          <span className="uppercase text-sm font-medium">{label}</span>
        </div>
      );
    },
  },
  {
    header: "Status",
    accessor: "status",
    render: (item) => {
      let variant: "default" | "success" | "warning" | "danger" = "default";
      if (item.status === "approved") variant = "success";
      else if (item.status === "pending") variant = "warning";
      else if (item.status === "rejected") variant = "danger";
      else if (item.status === "mailed") variant = "default";

      return (
        <Chips
          label={item.status || ""}
          colorScheme={variant}
          className="capitalize"
        />
      );
    },
  },
  {
    header: "Actions",
    accessor: "action",
    className: "flex gap-2 justify-center",
    render: (item) => (
      <Button
        variant="danger"
        size="sm"
        leftIcon={<TrashIcon />}
        onClick={() => onDelete(item)}
      />
    ),
  },
];

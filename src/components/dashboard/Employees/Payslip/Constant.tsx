import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";
import { TableColumn } from "@/components/UI/Table";
import { ArrowDown, Download, FileText, Trash2 } from "lucide-react";

export const months = [
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

export const columns = (
  handleDownload: (id: string, fileName: string) => void,
  handleDelete: (id: string) => void,
): TableColumn<any>[] => [
  {
    header: "Employee",
    accessor: "firstName",
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
        {new Date(item.uploadedAt).toLocaleString()}
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
          onClick={() => handleDownload(item.id, item.fileName)}
          leftIcon={<Download size={14} />}
        >
          Download
        </Button>
        <Button
          size="sm"
          variant="danger"
          onClick={() => handleDelete(item.id)}
          leftIcon={<Trash2 size={14} />}
        />
      </div>
    ),
  },
];

import Button from "@/components/UI/Button";
import { Download, Trash2 } from "lucide-react";

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
) => [
  {
    header: "Employee Name",
    accessor: "firstName",
  },
  {
    header: "Month",
    accessor: "month",
  },
  {
    header: "Year",
    accessor: "year",
  },
  {
    header: "Uploaded At",
    accessor: "uploadedAt",
    render: (item: any) => (
      <span className="text-slate-500 text-sm">
        {new Date(item.uploadedAt).toLocaleString()}
      </span>
    ),
  },
  {
    header: "Uploaded By",
    accessor: "uploadedBy",
  },
  {
    header: "Actions",
    accessor: "action",
    render: (item: any) => (
      <div className="flex flex-row gap-2">
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-50"
          onClick={() => handleDownload(item.id, item.fileName)}
        >
          <Download size={16} />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={() => handleDelete(item.id)}
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];

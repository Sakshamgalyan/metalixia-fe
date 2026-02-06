import { TableColumn } from "@/components/UI/Table";
import { Calendar, EditIcon, FileText, TrashIcon } from "lucide-react";
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
    render: (item) => (
      <Chips
        label={item.fileType?.split("/")[1] || "FILE"}
        colorScheme="default"
        className="capitalize"
      />
    ),
  },
  {
    header: "Status",
    accessor: "status",
    render: (item) => {
      let variant: "default" | "success" | "warning" | "danger" = "default";
      if (item.status === "Approved") variant = "success";
      else if (item.status === "Pending") variant = "warning";
      else if (item.status === "Rejected") variant = "danger";

      return <Chips label={item.status || "Pending"} colorScheme={variant} />;
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

import Button from "@/components/UI/Button";
import { Calendar, Check, Download, FileText, Trash2, User, X } from "lucide-react";
import { TableColumn } from "@/components/UI/Table";
import Chips from "@/components/UI/Chips";

export const columns = (
  handleApprove: (item: any) => void,
  handleReject: (item: any) => void,
): TableColumn<any>[] => [
  {
    header: "Report Name",
    accessor: "name",
    className: "font-medium text-slate-900 capitalize",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
          <FileText size={16} />
        </div>
        <span>{item.name}</span>
      </div>
    )
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
    header: "File Type",
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
    header: "Uploaded By",
    accessor: "uploadedBy",
    render: (item) => (
      <div className="flex items-center gap-2">
        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
          <User size={16} />
        </div>
        <span>{item.uploadedBy}</span>
      </div>
    ),
  },
  {
    header: "Status",
    accessor: "status",
    className: "flex gap-2 justify-center",
    render: (item) => {
      if (item.status === "approved") {
        return <Chips label="Approved" colorScheme="success" size="sm" />
      } else if (item.status === "rejected") {
        return <Chips label="Rejected" colorScheme="danger" size="sm" />
      } else if (item.status === "mailed") {
        return <Chips label="Mailed" colorScheme="warning" size="sm" />
      } else {
        return (
          <div className="flex gap-2 justify-center">
            <Button
              bgColor="#16a34a"
              textColor="#ffffff"
              size="sm"
              onClick={() => handleApprove(item)}
            >
              <Check size={16} />
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleReject(item)}
              leftIcon={<X size={16} />}
            />
          </div>
        );
      }
    },
  },
  {
    header: "Cancel Deletion",
    accessor: "cancelDeletionAction",
    render: (item) => (
      <Button
        size="sm"
        leftIcon={<X size={16} />}
        onClick={() => handleApprove(item)}
      />
    ),
  },
  {
    header: "Download",
    accessor: "downloadAction",
    render: (item) => (
      <Button
        size="sm"
        leftIcon={<Download size={16} />}
        onClick={() => handleApprove(item)}
      />
    ),
  },
];

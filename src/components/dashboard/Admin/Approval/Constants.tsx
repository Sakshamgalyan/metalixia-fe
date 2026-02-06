import Button from "@/components/UI/Button";
import { Check, Trash2 } from "lucide-react";
import { TableColumn } from "@/components/UI/Table";

export const columns = (
  handleApprove: (item: any) => void,
  handleDelete: (item: any) => void,
): TableColumn<any>[] => [
  {
    header: "Name",
    accessor: "name",
    className: "font-medium text-slate-900 capitalize",
  },
  {
    header: "Email",
    accessor: "email",
  },
  {
    header: "Mobile No",
    accessor: "mobileNo",
  },
  {
    header: "Actions",
    accessor: "actions",
    className: "flex gap-2 justify-center",
    render: (item) => (
      <div className="flex gap-2 justify-center">
        <Button
          bgColor="#16a34a"
          textColor="#ffffff"
          size="sm"
          onClick={() => handleApprove(item)}
          title="Approve"
        >
          <Check size={16} />
        </Button>
        <Button
          variant="danger"
          size="sm"
          onClick={() => handleDelete(item)}
          title="Delete"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    ),
  },
];

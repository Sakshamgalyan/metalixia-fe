import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";
import { TableColumn } from "@/components/UI/Table";
import { EditIcon, EyeIcon, TrashIcon } from "lucide-react";

export const columns: TableColumn<any>[] = [
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
            header: "Role",
            accessor: "role",
            render: (item) => (
                <Chips label={item.role} />
            )
        },
        {
            header: "Post",
            accessor: "post",
        },
        {
            header: "Actions",
            accessor: "actions",
            render: (item) => (
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm" leftIcon={<EyeIcon />}>
                        View
                    </Button>
                    <Button variant="primary" size="sm" leftIcon={<EditIcon />}>
                        Edit
                    </Button>
                    <Button variant="danger" size="sm" leftIcon={<TrashIcon />}>
                        Delete
                    </Button>
                </div>
            ),  
        }
    ];

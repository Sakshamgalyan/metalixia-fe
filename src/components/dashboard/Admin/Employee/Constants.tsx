import Button from "@/components/UI/Button";
import Chips from "@/components/UI/Chips";
import { TableColumn } from "@/components/UI/Table";
import { EditIcon, TrashIcon } from "lucide-react";

export const limit = 10;

export const getColumns = (
    onEdit: (item: any) => void,
    onDelete: (item: any) => void
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
            header: "Role",
            accessor: "role",
            render: (item) => (
                <Chips label={item.role} className="capitalize" />
            )
        },
        {
            header: "Post",
            accessor: "post",
            className: "capitalize",
        },
        {
            header: "Actions",
            accessor: "actions",
            className: "flex gap-2 justify-center",
            render: (item) => (
                <div className="flex gap-2 justify-center">
                    <Button
                        variant="primary"
                        size="sm"
                        leftIcon={<EditIcon />}
                        onClick={() => onEdit(item)}
                    />
                    <Button
                        variant="danger"
                        size="sm"
                        leftIcon={<TrashIcon />}
                        onClick={() => onDelete(item)}
                    />
                </div>
            ),
        }
    ];

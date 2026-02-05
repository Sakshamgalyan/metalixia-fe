import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import {
  useEmployeeListDispatchContext,
  useEmployeeListStateContext,
} from "@/context/admin/EmployeeList/hooks";
import { setFilterData, setLoading } from "@/context/admin/EmployeeList/action";
import { deleteEmployee } from "@/ApiClient/Admin/admin";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  employeeName: string;
  employee: any;
}

const DeleteModal = ({
  isOpen,
  onClose,
  employeeName,
  employee,
}: DeleteModalProps) => {
  const { loading, filterData } = useEmployeeListStateContext();
  const dispatch = useEmployeeListDispatchContext();

  const handleConfirmDelete = async () => {
    dispatch(setLoading(true));
    console.log("employe list loading", loading);
    try {
      await deleteEmployee(employee?.id);
      const newData = filterData?.data
        ? filterData.data.filter((item: any) => item.id !== employee.id)
        : [];
      dispatch(setFilterData({ ...filterData, data: newData }));
    } catch (error) {
      console.error("Error deleting employee:", error);
    } finally {
      dispatch(setLoading(false));
      onClose();
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Delete"
      width="md"
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={loading}
            isLoading={loading}
            loadingText="Deleting..."
          >
            Delete
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Typography className="text-slate-600">
          Are you sure you want to delete <strong>{employeeName}</strong>? This
          action cannot be undone.
        </Typography>
      </div>
    </Modal>
  );
};

export default DeleteModal;

import Modal from "@/components/UI/Modal";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import { useState } from "react";
import { useAppSelector } from "@/store/hooks";
import { toast } from "sonner";
import {
  deleteReportApi,
  getMyReports,
} from "@/context/Employee/ReportUpload/api";
import { useReportUploadDispatchContext } from "@/context/Employee/ReportUpload/hooks";
import { Report } from "./Constants";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: Report | null;
}

const DeleteModal = ({ isOpen, onClose, item }: DeleteModalProps) => {
  const [loading, setLoading] = useState(false);
  const dispatch = useReportUploadDispatchContext();

  const { user } = useAppSelector((state) => state.auth);
  const employeeId = user?.employeeId;

  const handleConfirmDelete = async () => {
    if (!item) return;

    setLoading(true);
    try {
      if (!employeeId) {
        toast.error("Employee ID is missing");
        return;
      }
      await deleteReportApi(dispatch, item.id);
      getMyReports(dispatch, 1, 10, employeeId);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Error deleting report:", error);
    } finally {
      setLoading(false);
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
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleConfirmDelete}
            disabled={loading || !item}
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
          Are you sure you want to delete{" "}
          <strong>{`${item?.name}.${item?.fileType?.split("/")[1] || "FILE"}`}</strong>? This action
          cannot be undone.
        </Typography>
      </div>
    </Modal>
  );
};

export default DeleteModal;

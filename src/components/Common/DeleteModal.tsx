"use client";

import React from "react";
import Button from "@/components/UI/Button";
import Typography from "@/components/UI/Typography";
import { AlertTriangle } from "lucide-react";
import Modal from "../UI/Modal";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  isLoading?: boolean;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message,
  itemName,
  isLoading = false,
}) => {
  const footerSection = (
    <div className="flex w-full justify-center gap-4">
      <Button
        variant="outline"
        onClick={onClose}
        size="sm"
        disabled={isLoading}
        className="flex-1"
      >
        Cancel
      </Button>
      <Button
        variant="danger"
        onClick={onConfirm}
        size="sm"
        isLoading={isLoading}
        className="flex-1"
      >
        Delete
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footerSection}
    >
      <div className="flex flex-col items-center justify-center py-4 px-2 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-full mb-4">
          <AlertTriangle size={32} />
        </div>
        <Typography variant="h5" className="mb-2 text-slate-800">
          Are you sure?
        </Typography>
        <Typography variant="p" className="text-slate-500 mb-2">
          {message
            ? message
            : itemName
              ? `Do you really want to delete "${itemName}"? This process cannot be undone.`
              : "Do you really want to delete this item? This process cannot be undone."}
        </Typography>
      </div>
    </Modal>
  );
};

export default DeleteModal;

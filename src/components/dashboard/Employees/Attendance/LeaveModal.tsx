"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import TextArea from "@/components/UI/TextArea";
import Dropdown from "@/components/UI/DropDown";
import Button from "@/components/UI/Button";
import ApiClient from "@/lib/apiClient";
import { useAppSelector } from "@/store/hooks";

interface LeaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  employeeId?: string;
  isAdmin?: boolean;
}

const leaveTypes = [
  { label: "Sick Leave", value: "Sick Leave" },
  { label: "Casual Leave", value: "Casual Leave" },
  { label: "Privilege Leave", value: "Privilege Leave" },
  { label: "Unpaid Leave", value: "Unpaid Leave" },
];

const LeaveModal = ({
  isOpen,
  onClose,
  onSuccess,
  employeeId,
  isAdmin = false,
}: LeaveModalProps) => {
  const { user } = useAppSelector((state) => state.auth);
  const targetEmployeeId = employeeId || user?.employeeId;

  const [formData, setFormData] = useState({
    startDate: "",
    endDate: "",
    leaveType: "",
    reason: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formData.startDate ||
      !formData.endDate ||
      !formData.leaveType ||
      !formData.reason
    ) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!targetEmployeeId) {
      toast.error("Employee not identified");
      return;
    }

    setLoading(true);
    try {
      await ApiClient.post("/leave/apply", {
        employeeId: targetEmployeeId,
        ...formData,
      });
      toast.success("Leave applied successfully");
      onSuccess?.();
      onClose();
      // Reset form
      setFormData({
        startDate: "",
        endDate: "",
        leaveType: "",
        reason: "",
      });
    } catch (error: any) {
      console.error("Failed to apply leave", error);
      toast.error(error.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Apply for Leave" width="md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="date"
            label="Start Date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            fullWidth
          />
          <Input
            type="date"
            label="End Date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            fullWidth
          />
        </div>

        <Dropdown
          label="Leave Type"
          options={leaveTypes}
          value={formData.leaveType ? [formData.leaveType] : []}
          onChange={(val) =>
            setFormData({ ...formData, leaveType: val as string })
          }
          placeholder="Select Type"
          className="w-full"
        />

        <TextArea
          label="Reason"
          name="reason"
          value={formData.reason}
          onChange={handleChange}
          required
          placeholder="Reason for leave..."
          rows={3}
          fullWidth
        />

        <div className="flex justify-end gap-3 mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" isLoading={loading}>
            Apply Leave
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default LeaveModal;

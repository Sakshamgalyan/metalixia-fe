"use client";

import { useState } from "react";
import Modal from "@/components/UI/Modal";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import {
  useCompanyStateContext,
  useCompanyDispatchContext,
} from "@/context/Admin/Company/hooks";
import { setModal } from "@/context/Admin/Company/actions";
import { createCompanyApi } from "@/context/Admin/Company/api";

interface CompanyModalProps {
  onSuccess: () => void;
}

const CompanyModal = ({ onSuccess }: CompanyModalProps) => {
  const { modal, actionLoading } = useCompanyStateContext();
  const dispatch = useCompanyDispatchContext();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    phone: "",
    address: "",
    contactPerson: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isAddMode = modal.mode === "add";
  const isOpen = isAddMode; // Update mode can be added later

  const closeModal = () => {
    dispatch(setModal({ mode: null, selectedItem: null }));
    setFormData({
      companyName: "",
      email: "",
      phone: "",
      address: "",
      contactPerson: "",
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    
    try {
      await createCompanyApi(dispatch, formData);
      onSuccess();
      closeModal();
    } catch (err) {
      // API error shown via toast
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title="Add New Company"
    >
      <div className="space-y-4">
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          required
          fullWidth
        />
        <Input
          label="Contact Person"
          name="contactPerson"
          value={formData.contactPerson}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          fullWidth
        />
        <Input
          label="Company Address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          fullWidth
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="outline" onClick={closeModal} disabled={actionLoading}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit} isLoading={actionLoading}>
          Save Company
        </Button>
      </div>
    </Modal>
  );
};

export default CompanyModal;

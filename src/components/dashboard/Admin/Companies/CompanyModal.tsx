'use client';

import { useState } from 'react';
import Modal from '@/components/UI/Modal';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import {
  useCompanyDispatchContext,
  useCompanyStateContext,
} from '@/context/admin/Company/hooks';
import { setModal } from '@/context/admin/Company/actions';
import {
  createCompanyApi,
  updateCompanyApi,
} from '@/context/admin/Company/api';
import { useEffect } from 'react';

interface CompanyModalProps {
  onSuccess: () => void;
}

const CompanyModal = ({ onSuccess }: CompanyModalProps) => {
  const { modal, actionLoading } = useCompanyStateContext();
  const dispatch = useCompanyDispatchContext();

  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    contactPerson: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isAddMode = modal.mode === 'add';
  const isOpen = modal.mode === 'add' || modal.mode === 'edit';

  useEffect(() => {
    if (modal.mode === 'edit' && modal.selectedItem) {
      setFormData({
        companyName: modal.selectedItem.companyName || '',
        email: modal.selectedItem.email || '',
        phone: modal.selectedItem.phone || '',
        address: modal.selectedItem.address || '',
        contactPerson: modal.selectedItem.contactPerson || '',
      });
    }
  }, [modal]);

  const closeModal = () => {
    dispatch(setModal({ mode: null, selectedItem: null }));
    setFormData({
      companyName: '',
      email: '',
      phone: '',
      address: '',
      contactPerson: '',
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (modal.mode === 'edit' && modal.selectedItem) {
        await updateCompanyApi(dispatch, modal.selectedItem._id, {
          ...formData,
          _id: modal.selectedItem._id,
        });
      } else {
        await createCompanyApi(dispatch, formData);
      }
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
      title={modal.mode === 'edit' ? 'Edit Company' : 'Add New Company'}
    >
      <div className="space-y-4">
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleInputChange}
          required
          fullWidth
          hasError={!!errors.companyName}
          errorMessage={errors.companyName}
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
        <Button
          size="sm"
          variant="outline"
          onClick={closeModal}
          disabled={actionLoading}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          variant="primary"
          onClick={handleSubmit}
          isLoading={actionLoading}
        >
          {modal.mode === 'edit' ? 'Update Company' : 'Save Company'}
        </Button>
      </div>
    </Modal>
  );
};

export default CompanyModal;

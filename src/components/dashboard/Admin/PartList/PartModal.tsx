'use client';

import { useState, useEffect } from 'react';
import Modal from '@/components/UI/Modal';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import {
  usePartDispatchContext,
  usePartStateContext,
} from '@/context/admin/PartList/hooks';
import { setModal } from '@/context/admin/PartList/actions';
import {
  createPartApi,
  updatePartApi,
  getCompaniesListApi,
} from '@/context/admin/PartList/api';
import Dropdown from '@/components/UI/DropDown';

import { toast } from '@/components/UI/Toaster';

interface PartModalProps {
  onSuccess: () => void;
}

const PartModal = ({ onSuccess }: PartModalProps) => {
  const { modal, actionLoading, companiesList, companiesListLoading } =
    usePartStateContext();
  const dispatch = usePartDispatchContext();

  const [formData, setFormData] = useState({
    companyId: '',
    partName: '',
    partNumber: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const isOpen = modal.mode === 'add' || modal.mode === 'edit';

  useEffect(() => {
    if (isOpen) {
      getCompaniesListApi(dispatch);
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (modal.mode === 'edit' && modal.selectedItem) {
      setFormData({
        companyId: (modal.selectedItem as any).companyId || '',
        partName: modal.selectedItem.partName || '',
        partNumber: modal.selectedItem.partNumber || '',
        description: modal.selectedItem.description || '',
      });
    }
  }, [modal]);

  const closeModal = () => {
    dispatch(setModal({ mode: null, selectedItem: null }));
    setFormData({
      companyId: '',
      partName: '',
      partNumber: '',
      description: '',
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

  const handleDropdownChange = (name: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [name]: value as string }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.companyId) {
      newErrors.companyId = 'Company selection is required';
    }
    if (!formData.partName.trim()) {
      newErrors.partName = 'Part name is required';
    }
    if (!formData.partNumber.trim()) {
      newErrors.partNumber = 'Part number is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    try {
      if (modal.mode === 'edit' && modal.selectedItem) {
        await updatePartApi(dispatch, modal.selectedItem._id, {
          ...formData,
          _id: modal.selectedItem._id,
        });
      } else {
        await createPartApi(dispatch, formData);
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
      title={modal.mode === 'edit' ? 'Edit Part' : 'Add New Part'}
    >
      <div className="space-y-4">
        <Dropdown
          label="Company Name"
          options={companiesList}
          value={formData.companyId}
          onChange={(v) => handleDropdownChange('companyId', v)}
          loading={companiesListLoading}
          hasError={!!errors.companyId}
          errorMessage={errors.companyId}
          searchable
          placeholder="Select a company"
        />
        <Input
          label="Part Name"
          name="partName"
          value={formData.partName}
          onChange={handleInputChange}
          required
          fullWidth
          hasError={!!errors.partName}
          errorMessage={errors.partName}
        />

        <Input
          label="Part Number"
          name="partNumber"
          value={formData.partNumber}
          onChange={handleInputChange}
          required
          fullWidth
          hasError={!!errors.partNumber}
          errorMessage={errors.partNumber}
        />

        <Input
          label="Description"
          name="description"
          value={formData.description}
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
          {modal.mode === 'edit' ? 'Update Part' : 'Save Part'}
        </Button>
      </div>
    </Modal>
  );
};

export default PartModal;

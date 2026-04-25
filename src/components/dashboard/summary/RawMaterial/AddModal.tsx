'use client';

import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@/components/UI/Modal';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import DropDown from '@/components/UI/DropDown';
import {
  useRawMaterialStateContext,
  useRawMaterialDispatchContext,
} from '@/context/Summary/RawMaterial/hooks';
import { setModal } from '@/context/Summary/RawMaterial/actions';
import {
  createRawMaterialApi,
  getEmployeesListApi,
} from '@/context/Summary/RawMaterial/api';
import DatePicker from '@/components/UI/DatePicker';
import { useAppSelector } from '@/store/hooks';

interface AddRawMaterialFormData {
  materialName: string;
  quantity: number;
  unit: string;
  price: number;
  source: string;
  inventoryLocation: string;
  invoiceNumber: string;
  receivedBy: string;
  receivedById: string;
  expectedOn: string;
}

const AddModal = ({ onSuccess }: { onSuccess: () => void }) => {
  const { modalState, createLoading } = useRawMaterialStateContext();
  const dispatch = useRawMaterialDispatchContext();
  const [employees, setEmployees] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === 'superAdmin';

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AddRawMaterialFormData>({
    defaultValues: {
      unit: 'kg',
      quantity: 0,
      price: 0,
      expectedOn: new Date().toISOString(),
    },
  });

  const isOpen = modalState.isOpen && modalState.type === 'add';

  useEffect(() => {
    if (isOpen) {
      const fetchEmployees = async () => {
        setLoadingEmployees(true);
        const data = await getEmployeesListApi();
        setEmployees(data);
        setLoadingEmployees(false);
      };
      fetchEmployees();
    } else {
      reset();
    }
  }, [isOpen, reset]);

  useEffect(() => {
    register('receivedById', { required: 'Please select an employee' });
    register('receivedBy');
  }, [register]);

  const handleClose = () => {
    dispatch(setModal({ isOpen: false, type: null }));
  };

  const onSubmit = async (data: AddRawMaterialFormData) => {
    try {
      await createRawMaterialApi(dispatch, data);
      handleClose();
      onSuccess();
    } catch (error) {
      console.log(error);
    }
  };

  const selectedEmployeeId = watch('receivedById');

  const handleReceivedByChange = (val: string | string[]) => {
    const value = Array.isArray(val) ? val[0] : val;
    setValue('receivedById', value);
    const emp = employees.find((e) => e.value === value);
    if (emp) setValue('receivedBy', emp.label.split(' (')[0]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Add Raw Material Entry"
      width="lg"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClose}
            disabled={createLoading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit(onSubmit)}
            isLoading={createLoading}
          >
            Save Entry
          </Button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Material Name"
            placeholder="Enter material name"
            {...register('materialName', {
              required: 'Material name is required',
            })}
            hasError={!!errors.materialName?.message}
            errorMessage={errors.materialName?.message}
            fullWidth
          />
          <Input
            label="Source / Vendor"
            placeholder="Enter source / vendor"
            {...register('source', { required: 'Source is required' })}
            hasError={!!errors.source?.message}
            errorMessage={errors.source?.message}
            fullWidth
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Inventory Location"
            placeholder="Enter inventory location"
            {...register('inventoryLocation', {
              required: 'Inventory location is required',
            })}
            hasError={!!errors.inventoryLocation?.message}
            errorMessage={errors.inventoryLocation?.message}
            fullWidth
          />
          <Input
            label="Invoice Number"
            placeholder="Enter invoice number"
            {...register('invoiceNumber', {
              required: 'Invoice number is required',
            })}
            hasError={!!errors.invoiceNumber?.message}
            errorMessage={errors.invoiceNumber?.message}
            fullWidth
          />
        </div>

        <div
          className={`grid grid-cols-1 ${
            isSuperAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'
          } gap-4`}
        >
          <Input
            label="Quantity"
            type="number"
            placeholder="Enter quantity"
            {...register('quantity', {
              required: 'Quantity is required',
              valueAsNumber: true,
              min: { value: 0.1, message: 'Quantity must be greater than 0' },
            })}
            hasError={!!errors.quantity?.message}
            errorMessage={errors.quantity?.message}
            fullWidth
          />
          <Input
            label="Unit"
            placeholder="e.g. kg, ton, pcs"
            {...register('unit', { required: 'Unit is required' })}
            hasError={!!errors.unit?.message}
            errorMessage={errors.unit?.message}
            fullWidth
          />
          {isSuperAdmin && (
            <Input
              label="Price (₹)"
              type="number"
              placeholder="0"
              {...register('price', {
                required: 'Price is required',
                valueAsNumber: true,
                min: { value: 0, message: 'Price cannot be negative' },
              })}
              hasError={!!errors.price?.message}
              errorMessage={errors.price?.message}
              fullWidth
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <DatePicker
              value={watch('expectedOn')}
              label="Expected On"
              onChange={(date) => setValue('expectedOn', date)}
              placeholder="Select date"
              hasError={!!errors.expectedOn?.message}
              errorMessage={errors.expectedOn?.message}
              fullWidth
            />
          </div>

          <DropDown
            label="Received By"
            options={employees}
            value={selectedEmployeeId}
            searchable
            onChange={handleReceivedByChange}
            placeholder={
              loadingEmployees ? 'Loading employees...' : 'Select employee'
            }
            hasError={!!errors.receivedById?.message}
            errorMessage={errors.receivedById?.message}
          />
        </div>
      </form>
    </Modal>
  );
};

export default AddModal;

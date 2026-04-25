'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Button from '@/components/UI/Button';
import Input from '@/components/UI/Input';
import Modal from '@/components/UI/Modal';
import Dropdown from '@/components/UI/DropDown';
import DatePicker from '@/components/UI/DatePicker';
import { useAppSelector } from '@/store/hooks';
import {
  useCompanyMaterialStateContext,
  useCompanyMaterialDispatchContext,
} from '@/context/Summary/CompanyMaterial/hooks';
import {
  createCompanyMaterialApi,
  updateCompanyMaterialApi,
  updateCompanyMaterialReceiverApi,
  getCompanyMaterialsApi,
  getCompanyMaterialStatsApi,
  getCompaniesListApi,
  getCompanyPartsApi,
} from '@/context/Summary/CompanyMaterial/api';
import { setModal } from '@/context/Summary/CompanyMaterial/actions';
import {
  CompanyList,
  CompanyPart,
} from '@/context/Summary/CompanyMaterial/type';

// ─── Constants ───────────────────────────────────────────────────
const UNIT_OPTIONS = [
  { value: 'kg', label: 'Kilograms (kg)' },
  { value: 'pcs', label: 'Pieces (pcs)' },
  { value: 'liters', label: 'Liters' },
  { value: 'meters', label: 'Meters' },
  { value: 'tons', label: 'Tons' },
  { value: 'units', label: 'Units' },
];

type FormValues = {
  companyId: string;
  partId: string;
  quantity: string;
  unit: string;
  expectedOn: string;
  deliveryBy: string;
  receivedOn: string;
  inventoryLocation: string;
  receivedBy: string;
};

const defaultValues: FormValues = {
  companyId: '',
  partId: '',
  quantity: '',
  unit: 'pcs',
  expectedOn: '',
  deliveryBy: '',
  receivedOn: '',
  inventoryLocation: '',
  receivedBy: '',
};

const MaterialFormModal = () => {
  const {
    modal,
    createLoading,
    updateLoading,
    updateReceiverLoading,
    page,
    companiesListData,
    companiesListLoading,
    companyPartsData,
    companyPartsLoading,
  } = useCompanyMaterialStateContext();

  const dispatch = useCompanyMaterialDispatchContext();
  const { user } = useAppSelector((state) => state.auth);

  const isSuperAdmin = user?.role === 'superAdmin';
  const { mode, selectedItem } = modal;

  const isEdit = mode === 'edit';
  const isReceive = mode === 'receive';
  const isOpen = mode === 'add' || isEdit || isReceive;
  const isEditOrReceive = isEdit || isReceive;

  const { control, handleSubmit, watch, reset, setValue } = useForm<FormValues>(
    {
      defaultValues,
    },
  );

  const companyId = watch('companyId');

  // ─── Fetch companies on modal open ──────────────────────────────
  useEffect(() => {
    if (isOpen) {
      getCompaniesListApi(dispatch);
    }
  }, [isOpen]);

  // ─── Fetch parts when company changes ───────────────────────────
  useEffect(() => {
    if (companyId) {
      getCompanyPartsApi(dispatch, companyId);
    }
  }, [companyId]);

  // ─── Prefill form ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && selectedItem && isEditOrReceive) {
      reset({
        companyId: selectedItem.companyId || '',
        partId: selectedItem.partId || '',
        quantity: String(selectedItem.quantity || ''),
        unit: selectedItem.unit || 'pcs',
        expectedOn: selectedItem.expectedOn
          ? new Date(selectedItem.expectedOn).toISOString().split('T')[0]
          : '',
        deliveryBy: selectedItem.deliveryBy
          ? new Date(selectedItem.deliveryBy).toISOString().split('T')[0]
          : '',
        receivedOn: selectedItem.receivedOn
          ? new Date(selectedItem.receivedOn).toISOString().split('T')[0]
          : '',
        inventoryLocation: selectedItem.inventoryLocation || '',
        receivedBy: selectedItem.receivedBy || '',
      });
    } else if (isOpen && mode === 'add') {
      reset(defaultValues);
    }
  }, [isOpen, mode, selectedItem]);

  const closeModal = () => {
    dispatch(setModal({ mode: null, selectedItem: null }));
  };

  // ─── Submit ─────────────────────────────────────────────────────
  const onSubmit = async (data: FormValues) => {
    if (isReceive && selectedItem && user) {
      await updateCompanyMaterialReceiverApi(dispatch, selectedItem._id, {
        receivedBy: user.name || user.email,
        receivedById: user.id || 'unknown',
      });
    } else {
      const payload: any = {
        companyId: data.companyId,
        partId: data.partId,
        quantity: Number(data.quantity),
        unit: data.unit,
        inventoryLocation: data.inventoryLocation,
      };

      if (data.expectedOn) payload.expectedOn = data.expectedOn;
      if (data.deliveryBy) payload.deliveryBy = data.deliveryBy;
      if (data.receivedOn) payload.receivedOn = data.receivedOn;

      if (isEdit && selectedItem) {
        if (isSuperAdmin && data.receivedBy) {
          payload.receivedBy = data.receivedBy;
        }
        await updateCompanyMaterialApi(dispatch, selectedItem._id, payload);
      } else {
        await createCompanyMaterialApi(dispatch, payload);
      }
    }

    closeModal();
    getCompanyMaterialsApi(dispatch, page, 10);
    getCompanyMaterialStatsApi(dispatch);
  };

  const isSubmitting = isReceive
    ? updateReceiverLoading
    : isEdit
      ? updateLoading
      : createLoading;

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={
        isReceive
          ? 'Confirm Material Receipt'
          : isEdit
            ? 'Edit Material Entry'
            : 'Add Material Entry'
      }
      width="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            disabled={
              isSubmitting || companiesListLoading || companyPartsLoading
            }
          >
            {isReceive ? 'Confirm Receipt' : isEdit ? 'Update' : 'Add Entry'}
          </Button>
        </>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Company */}
        <Controller
          control={control}
          name="companyId"
          render={({ field }) => (
            <Dropdown
              label="Company Name"
              options={companiesListData.map((c: CompanyList) => ({
                value: c.value,
                label: c.label,
              }))}
              value={field.value}
              onChange={(val) => {
                field.onChange(val);
                setValue('partId', '');
              }}
              placeholder="Select Company"
              disabled={isEditOrReceive || companiesListLoading}
              searchable
            />
          )}
        />

        {/* Part */}
        <Controller
          control={control}
          name="partId"
          render={({ field }) => (
            <Dropdown
              label="Part Name"
              options={companyPartsData.map((p: CompanyPart) => ({
                value: p.value,
                label: p.label,
              }))}
              value={field.value}
              onChange={field.onChange}
              placeholder="Select Part"
              disabled={isEditOrReceive || !companyId || companyPartsLoading}
              searchable
            />
          )}
        />

        {/* Quantity */}
        <Controller
          control={control}
          name="quantity"
          render={({ field }) => (
            <Input
              label="Quantity"
              type="number"
              placeholder="Enter Quantity"
              {...field}
              required
            />
          )}
        />

        {/* Unit */}
        <Controller
          control={control}
          name="unit"
          render={({ field }) => (
            <Dropdown
              label="Unit"
              placeholder="Select Unit"
              options={UNIT_OPTIONS}
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="expectedOn"
          render={({ field }) => (
            <DatePicker
              label="Expected On"
              placeholder="dd/mm/yyyy"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="deliveryBy"
          render={({ field }) => (
            <DatePicker
              label="Delivery By"
              placeholder="dd/mm/yyyy"
              {...field}
            />
          )}
        />

        <Controller
          control={control}
          name="receivedOn"
          render={({ field }) => (
            <DatePicker
              label="Received On"
              placeholder="dd/mm/yyyy"
              {...field}
            />
          )}
        />

        {/* Location */}
        <Controller
          control={control}
          name="inventoryLocation"
          render={({ field }) => (
            <Input
              label="Inventory Location"
              placeholder="Enter Inventory Location"
              {...field}
              required
            />
          )}
        />
      </div>
    </Modal>
  );
};

export default MaterialFormModal;

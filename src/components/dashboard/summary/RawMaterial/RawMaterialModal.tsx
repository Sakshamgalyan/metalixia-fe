'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Modal from '@/components/UI/Modal';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import DropDown from '@/components/UI/DropDown';
import DatePicker from '@/components/UI/DatePicker';
import {
  useRawMaterialStateContext,
  useRawMaterialDispatchContext,
} from '@/context/Summary/RawMaterial/hooks';
import { setModal } from '@/context/Summary/RawMaterial/actions';
import {
  createRawMaterialApi,
  updateRawMaterialApi,
  receiveRawMaterialApi,
  getEmployeesListApi,
  getRawMaterialsApi,
  getRawMaterialStatsApi,
} from '@/context/Summary/RawMaterial/api';
import { useAppSelector } from '@/store/hooks';

interface RawMaterialFormData {
  materialName: string;
  quantity: string;
  unit: string;
  price: string;
  source: string;
  inventoryLocation: string;
  invoiceNumber: string;
  receivedBy: string;
  receivedById: string;
  expectedOn: string;
}

const defaultValues: RawMaterialFormData = {
  materialName: '',
  quantity: '',
  unit: 'kg',
  price: '',
  source: '',
  inventoryLocation: '',
  invoiceNumber: '',
  receivedBy: '',
  receivedById: '',
  expectedOn: new Date().toISOString(),
};

const RawMaterialModal = () => {
  const { modalState, createLoading, updateLoading, receiveLoading, page } =
    useRawMaterialStateContext();
  const dispatch = useRawMaterialDispatchContext();
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === 'superAdmin';

  const [employees, setEmployees] = useState<
    { value: string; label: string }[]
  >([]);
  const [loadingEmployees, setLoadingEmployees] = useState(false);

  const { type, selectedItem } = modalState;
  const isEdit = type === 'edit';
  const isReceive = type === 'receive';
  const isOpen = type === 'add' || isEdit || isReceive;

  const { control, handleSubmit, reset, setValue, watch } =
    useForm<RawMaterialFormData>({
      defaultValues,
    });

  // ─── Fetch employees on modal open ──────────────────────────────
  useEffect(() => {
    if (isOpen && (type === 'add' || isReceive)) {
      const fetchEmployees = async () => {
        setLoadingEmployees(true);
        const data = await getEmployeesListApi();
        setEmployees(data);
        setLoadingEmployees(false);
      };
      fetchEmployees();
    }
  }, [isOpen, type, isReceive]);

  // ─── Prefill form ───────────────────────────────────────────────
  useEffect(() => {
    if (isOpen && selectedItem && (isEdit || isReceive)) {
      reset({
        materialName: selectedItem.materialName || '',
        quantity: String(selectedItem.quantity || ''),
        unit: selectedItem.unit || 'kg',
        price: String(selectedItem.price || ''),
        source: selectedItem.source || '',
        inventoryLocation: selectedItem.inventoryLocation || '',
        invoiceNumber: selectedItem.invoiceNumber || '',
        receivedBy: selectedItem.receivedBy || '',
        receivedById: selectedItem.receivedById || '',
        expectedOn: selectedItem.expectedOn
          ? new Date(selectedItem.expectedOn).toISOString()
          : '',
      });
    } else if (isOpen && type === 'add') {
      reset(defaultValues);
    }
  }, [isOpen, type, selectedItem, isEdit, isReceive, reset]);

  const closeModal = () => {
    dispatch(setModal({ isOpen: false, type: null, selectedItem: null }));
  };

  // ─── Submit ─────────────────────────────────────────────────────
  const onSubmit = async (data: RawMaterialFormData) => {
    try {
      if (isReceive && selectedItem && user) {
        await receiveRawMaterialApi(dispatch, selectedItem._id, {
          receivedBy: user.name || user.email,
          receivedById: user.id || 'unknown',
        });
      } else if (isEdit && selectedItem) {
        const payload: Record<string, unknown> = {};
        if (data.materialName) payload.materialName = data.materialName;
        if (data.quantity) payload.quantity = Number(data.quantity);
        if (data.unit) payload.unit = data.unit;
        if (data.price) payload.price = Number(data.price);
        if (data.source) payload.source = data.source;
        if (data.inventoryLocation)
          payload.inventoryLocation = data.inventoryLocation;
        if (data.invoiceNumber) payload.invoiceNumber = data.invoiceNumber;
        if (data.expectedOn) payload.expectedOn = data.expectedOn;

        await updateRawMaterialApi(dispatch, selectedItem._id, payload);
      } else {
        // Add mode
        const payload: Record<string, unknown> = {
          materialName: data.materialName,
          quantity: Number(data.quantity),
          unit: data.unit,
          price: Number(data.price),
          source: data.source,
          inventoryLocation: data.inventoryLocation,
          invoiceNumber: data.invoiceNumber,
          receivedBy: data.receivedBy,
          receivedById: data.receivedById,
          expectedOn: data.expectedOn,
        };
        await createRawMaterialApi(dispatch, payload);
      }

      closeModal();
      getRawMaterialsApi(dispatch, page, 10);
      getRawMaterialStatsApi(dispatch);
    } catch (error) {
      console.error(error);
    }
  };

  const isSubmitting = isReceive
    ? receiveLoading
    : isEdit
      ? updateLoading
      : createLoading;

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
      onClose={closeModal}
      title={
        isReceive
          ? 'Confirm Material Receipt'
          : isEdit
            ? 'Edit Raw Material'
            : 'Add Raw Material Entry'
      }
      width="lg"
      footer={
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={closeModal}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit(onSubmit)}
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            {isReceive ? 'Confirm Receipt' : isEdit ? 'Update' : 'Save Entry'}
          </Button>
        </>
      }
    >
      {isReceive ? (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800 font-medium text-sm">
              You are about to mark this material as received. This action will
              record the current time and your details as the receiver.
            </p>
          </div>
          {selectedItem && (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-slate-500">Material:</span>
                <p className="font-semibold text-slate-800">
                  {selectedItem.materialName}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Quantity:</span>
                <p className="font-semibold text-slate-800">
                  {selectedItem.quantity} {selectedItem.unit}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Source:</span>
                <p className="font-semibold text-slate-800">
                  {selectedItem.source}
                </p>
              </div>
              <div>
                <span className="text-slate-500">Location:</span>
                <p className="font-semibold text-slate-800">
                  {selectedItem.inventoryLocation}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="materialName"
              rules={{ required: 'Material name is required' }}
              render={({ field, fieldState }) => (
                <Input
                  label="Material Name"
                  placeholder="Enter material name"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="source"
              rules={{ required: 'Source is required' }}
              render={({ field, fieldState }) => (
                <Input
                  label="Source / Vendor"
                  placeholder="Enter source / vendor"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="inventoryLocation"
              rules={{ required: 'Inventory location is required' }}
              render={({ field, fieldState }) => (
                <Input
                  label="Inventory Location"
                  placeholder="Enter inventory location"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="invoiceNumber"
              rules={{ required: 'Invoice number is required' }}
              render={({ field, fieldState }) => (
                <Input
                  label="Invoice Number"
                  placeholder="Enter invoice number"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
          </div>

          <div
            className={`grid grid-cols-1 ${
              isSuperAdmin ? 'md:grid-cols-3' : 'md:grid-cols-2'
            } gap-4`}
          >
            <Controller
              control={control}
              name="quantity"
              rules={{
                required: 'Quantity is required',
                min: { value: 0.1, message: 'Must be > 0' },
              }}
              render={({ field, fieldState }) => (
                <Input
                  label="Quantity"
                  type="number"
                  placeholder="Enter quantity"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            <Controller
              control={control}
              name="unit"
              render={({ field, fieldState }) => (
                <Input
                  label="Unit"
                  placeholder="e.g. kg, ton, pcs"
                  {...field}
                  hasError={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  fullWidth
                />
              )}
            />
            {isSuperAdmin && (
              <Controller
                control={control}
                name="price"
                rules={{
                  required: 'Price is required',
                  min: { value: 0, message: 'Cannot be negative' },
                }}
                render={({ field, fieldState }) => (
                  <Input
                    label="Price (₹)"
                    type="number"
                    placeholder="0"
                    {...field}
                    hasError={!!fieldState.error}
                    errorMessage={fieldState.error?.message}
                    fullWidth
                  />
                )}
              />
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              control={control}
              name="expectedOn"
              render={({ field }) => (
                <DatePicker
                  value={field.value}
                  label="Expected On"
                  onChange={field.onChange}
                  placeholder="Select date"
                  fullWidth
                />
              )}
            />

            {!isEdit && (
              <DropDown
                label="Received By"
                options={employees}
                value={selectedEmployeeId}
                searchable
                onChange={handleReceivedByChange}
                placeholder={
                  loadingEmployees ? 'Loading employees...' : 'Select employee'
                }
              />
            )}
          </div>
        </form>
      )}
    </Modal>
  );
};

export default RawMaterialModal;

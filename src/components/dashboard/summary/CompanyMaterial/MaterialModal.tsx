"use client";

import { useState, useEffect } from "react";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Input";
import Modal from "@/components/UI/Modal";
import Dropdown from "@/components/UI/DropDown";
import DatePicker from "@/components/UI/DatePicker";
import { useAppSelector } from "@/store/hooks";
import {
  useCompanyMaterialStateContext,
  useCompanyMaterialDispatchContext,
} from "@/context/Summary/CompanyMaterial/hooks";
import {
  createCompanyMaterialApi,
  updateCompanyMaterialApi,
  updateCompanyMaterialReceiverApi,
  getCompanyMaterialsApi,
  getCompanyMaterialStatsApi,
} from "@/context/Summary/CompanyMaterial/api";
import { setModal } from "@/context/Summary/CompanyMaterial/actions";

// ─── Constants ───────────────────────────────────────────────────
const UNIT_OPTIONS = [
  { value: "kg", label: "Kilograms (kg)" },
  { value: "pcs", label: "Pieces (pcs)" },
  { value: "liters", label: "Liters" },
  { value: "meters", label: "Meters" },
  { value: "tons", label: "Tons" },
  { value: "units", label: "Units" },
];

const emptyForm = {
  companyName: "",
  materialName: "",
  quantity: "",
  unit: "pcs",
  expectedOn: "",
  deliveryBy: "",
  receivedOn: "",
  inventoryLocation: "",
  receivedBy: "",
};

const MaterialFormModal = () => {
  const { modal, createLoading, updateLoading, updateReceiverLoading, page } =
    useCompanyMaterialStateContext();
  const dispatch = useCompanyMaterialDispatchContext();
  const { user } = useAppSelector((state) => state.auth);
  const isSuperAdmin = user?.role === "superAdmin";

  const { mode, selectedItem } = modal;
  const isEdit = mode === "edit";
  const isReceive = mode === "receive";
  const isOpen = mode === "add" || isEdit || isReceive;
  const isEditOrReceive = isEdit || isReceive;

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (isOpen && isEditOrReceive && selectedItem) {
      setForm({
        companyName: selectedItem.companyName || "",
        materialName: selectedItem.materialName || "",
        quantity: String(selectedItem.quantity || ""),
        unit: selectedItem.unit || "pcs",
        expectedOn: selectedItem.expectedOn
          ? new Date(selectedItem.expectedOn).toISOString().split("T")[0]
          : "",
        deliveryBy: selectedItem.deliveryBy
          ? new Date(selectedItem.deliveryBy).toISOString().split("T")[0]
          : "",
        receivedOn: selectedItem.receivedOn
          ? new Date(selectedItem.receivedOn).toISOString().split("T")[0]
          : "",
        inventoryLocation: selectedItem.inventoryLocation || "",
        receivedBy: selectedItem.receivedBy || "",
      });
    } else if (isOpen && mode === "add") {
      setForm(emptyForm);
    }
  }, [isOpen, mode, selectedItem, isEditOrReceive]);

  const closeModal = () => {
    dispatch(setModal({ mode: null, selectedItem: null }));
  };

  const handleChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (isReceive && selectedItem && user) {
      await updateCompanyMaterialReceiverApi(dispatch, selectedItem._id, {
        receivedBy: user.name || user.email,
        receivedById: user.id || "unknown",
      });
    } else {
      const payload: any = {
        companyName: form.companyName,
        materialName: form.materialName,
        quantity: Number(form.quantity),
        unit: form.unit,
        inventoryLocation: form.inventoryLocation,
      };
      if (form.expectedOn) payload.expectedOn = form.expectedOn;
      if (form.deliveryBy) payload.deliveryBy = form.deliveryBy;
      if (form.receivedOn) payload.receivedOn = form.receivedOn;

      if (isEdit && selectedItem) {
        delete payload.companyName;
        delete payload.materialName;
        if (isSuperAdmin && form.receivedBy) {
          payload.receivedBy = form.receivedBy;
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

  const title = isReceive
    ? "Confirm Material Receipt"
    : isEdit
      ? "Edit Material Entry"
      : "Add Material Entry";
  const isSubmitting = isReceive
    ? updateReceiverLoading
    : isEdit
      ? updateLoading
      : createLoading;
  const actionText = isReceive
    ? "Confirm Receipt"
    : isEdit
      ? "Update"
      : "Add Entry";

  return (
    <Modal
      isOpen={isOpen}
      onClose={closeModal}
      title={title}
      width="lg"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={closeModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={isSubmitting}
            loadingText="Processing..."
          >
            {actionText}
          </Button>
        </>
      }
    >
      {isReceive && (
        <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-100 text-sm text-blue-800 font-medium">
          Please review the details below. By confirming, your name will be
          officially recorded as the receiver.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Company Name"
          placeholder="Enter company name"
          value={form.companyName}
          onChange={(e) => handleChange("companyName", e.target.value)}
          isDisabled={isEditOrReceive}
          fullWidth
          required
        />
        <Input
          label="Part Name"
          placeholder="Enter part/material name"
          value={form.materialName}
          onChange={(e) => handleChange("materialName", e.target.value)}
          isDisabled={isEditOrReceive}
          fullWidth
          required
        />
        <Input
          label="Quantity"
          placeholder="Enter quantity"
          type="number"
          value={form.quantity}
          onChange={(e) => handleChange("quantity", e.target.value)}
          fullWidth
          required
        />
        <Dropdown
          label="Unit"
          options={UNIT_OPTIONS}
          value={form.unit}
          onChange={(val) => handleChange("unit", val as string)}
          placeholder="Select unit"
        />
        <DatePicker
          label="Expected On"
          value={form.expectedOn}
          onChange={(val) => handleChange("expectedOn", val)}
          fullWidth
        />
        <DatePicker
          label="Delivery By"
          value={form.deliveryBy}
          onChange={(val) => handleChange("deliveryBy", val)}
          fullWidth
        />
        <DatePicker
          label="Received On"
          value={form.receivedOn}
          onChange={(val) => handleChange("receivedOn", val)}
          fullWidth
        />
        <Input
          label="Inventory Location"
          placeholder="Enter location"
          value={form.inventoryLocation}
          onChange={(e) => handleChange("inventoryLocation", e.target.value)}
          fullWidth
          required
        />
        {(isEdit && isSuperAdmin) || isReceive ? (
          <div className="md:col-span-2">
            <Input
              label="Received By"
              placeholder="Receiver name"
              value={
                isReceive ? user?.name || user?.email || "" : form.receivedBy
              }
              onChange={(e) => handleChange("receivedBy", e.target.value)}
              isDisabled={isReceive}
              fullWidth
            />
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

export default MaterialFormModal;

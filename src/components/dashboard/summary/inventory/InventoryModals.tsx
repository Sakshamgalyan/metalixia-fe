'use client';

import { useState } from 'react';
import Modal from '@/components/UI/Modal';
import Input from '@/components/UI/Input';
import Button from '@/components/UI/Button';
import Typography from '@/components/UI/Typography';
import { InventoryItem } from '@/context/Summary/Inventory/type';
import { setMinStockApi } from '@/context/Summary/Inventory/api';

interface MinStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSuccess: () => void;
}

export const MinStockModal = ({
  isOpen,
  onClose,
  item,
  onSuccess,
}: MinStockModalProps) => {
  const [minStock, setMinStock] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!item) return;
    setLoading(true);
    try {
      await setMinStockApi(item._id, Number(minStock));
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Set Minimum Stock Level"
      width="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={loading}
          >
            Update
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <Typography variant="p" className="text-sm text-slate-500">
          Set a threshold for <strong>{item?.materialName}</strong>. You will
          see a warning badge when stock falls below this level.
        </Typography>
        <Input
          label="Minimum Stock Level"
          type="number"
          placeholder="e.g. 10"
          value={minStock}
          onChange={(e) => setMinStock(e.target.value)}
          fullWidth
        />
      </div>
    </Modal>
  );
};

interface ConsumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: InventoryItem | null;
  onSuccess: () => void;
}

export const ConsumeModal = ({
  isOpen,
  onClose,
  item,
  onSuccess,
}: ConsumeModalProps) => {
  const [quantity, setQuantity] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!item) return;
    setLoading(true);
    try {
      await require('@/context/Summary/Inventory/api').consumeMaterialApi(
        item._id,
        Number(quantity),
        notes,
      );
      onSuccess();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Consume Raw Material"
      width="md"
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleSubmit}
            isLoading={loading}
            disabled={!quantity || Number(quantity) > (item?.quantity || 0)}
          >
            Log Consumption
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex justify-between items-center">
          <Typography variant="small" className="text-slate-500">
            Available Stock:
          </Typography>
          <Typography variant="h6" className="text-slate-900">
            {item?.quantity} {item?.unit}
          </Typography>
        </div>
        <Input
          label="Quantity to Consume"
          type="number"
          placeholder="0.00"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          fullWidth
          errorMessage={
            Number(quantity) > (item?.quantity || 0)
              ? 'Exceeds available stock'
              : ''
          }
        />
        <Input
          label="Notes / Purpose"
          placeholder="e.g. For Batch #123 acid dipping"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
        />
      </div>
    </Modal>
  );
};

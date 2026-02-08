"use client";

import React from "react";
import Input, { InputProps } from "./Input";
import { Calendar } from "lucide-react";

interface DatePickerProps extends Omit<
  InputProps,
  "type" | "value" | "onChange"
> {
  value?: string | Date;
  onChange?: (date: string) => void;
}

const DatePicker = ({ value, onChange, ...props }: DatePickerProps) => {
  const formatDate = (date?: string | Date) => {
    if (!date) return "";
    if (typeof date === "string") {
      // Check if it matches YYYY-MM-DD format already
      if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
      // Try to parse if it's an ISO string
      const d = new Date(date);
      return !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "";
    }
    return date.toISOString().split("T")[0];
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <Input
      type="date"
      leftIcon={<Calendar size={18} />}
      value={formatDate(value)}
      onChange={handleChange}
      {...props} // Pass through label, error, etc.
    />
  );
};

export default DatePicker;

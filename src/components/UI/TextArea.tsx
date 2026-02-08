import React from "react";
import { AlertCircle } from "lucide-react";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: React.ReactNode;
  helperText?: string;
  error?: string | boolean;
  fullWidth?: boolean;
  rows?: number;
}

const TextArea = ({
  label,
  helperText,
  error,
  fullWidth = true,
  rows = 4,
  className = "",
  disabled,
  required,
  value,
  onChange,
  ...props
}: TextAreaProps) => {
  const isError = !!error;

  return (
    <div className={`${fullWidth ? "w-full" : "w-auto"} flex flex-col gap-1.5`}>
      {label && (
        <label className="text-sm font-medium text-slate-700 ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        <textarea
          rows={rows}
          className={`
            w-full px-4 py-3 text-sm
            bg-white border rounded-lg
            placeholder:text-slate-400 text-slate-900
            transition-all duration-200 outline-none
            resize-y min-h-[100px]
            ${
              isError
                ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                : "border-slate-300 focus:border-slate-500 focus:ring-2 focus:ring-slate-100"
            }
            ${disabled ? "bg-slate-50 text-slate-500 cursor-not-allowed opacity-70" : ""}
            ${className}
          `}
          disabled={disabled}
          value={value}
          onChange={onChange}
          {...props}
        />

        {isError && (
          <div className="absolute right-3 top-3 text-red-500 pointer-events-none">
            <AlertCircle size={18} />
          </div>
        )}
      </div>

      {(helperText || (typeof error === "string" && error)) && (
        <p
          className={`text-xs ml-1 ${isError ? "text-red-500" : "text-slate-500"}`}
        >
          {typeof error === "string" ? error : helperText}
        </p>
      )}
    </div>
  );
};

export default TextArea;

"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  UploadCloud,
  X,
  FileText,
  File as FileIcon,
  FileImage,
} from "lucide-react";
import Typography from "@/components/UI/Typography";
import { toast } from "sonner";

interface FileUploadProps {
  label?: string;
  description?: string;
  accept?: string; // e.g. "image/*, .pdf"
  maxSize?: number; // in MB
  allowMultiple?: boolean;
  onChange?: (files: File[]) => void;
  value?: File[];
  className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  description = "or drop here",
  accept = "*",
  maxSize = 20, // 20 MB default
  allowMultiple = true,
  onChange,
  value,
  className = "",
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<File[]>(value || []);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync internal state with external value prop
  useEffect(() => {
    if (value) {
      setFileList(value);
    }
  }, [value]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file: File): boolean => {
    // Check size
    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File ${file.name} exceeds the maximum size of ${maxSize}MB`);
      return false;
    }

    // Check type (basic validation based on extension or mime type if accept is provided)
    if (accept && accept !== "*") {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileType = file.type;
      const fileName = file.name.toLowerCase();

      const isValid = acceptedTypes.some((type) => {
        if (type.endsWith("/*")) {
          const baseType = type.split("/")[0];
          return fileType.startsWith(baseType);
        }
        if (type.startsWith(".")) {
          return fileName.endsWith(type.toLowerCase());
        }
        return fileType === type;
      });

      if (!isValid) {
        toast.error(`File ${file.name} is not a valid format`);
        return false;
      }
    }

    return true;
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFiles = Array.from(e.dataTransfer.files);
      addFiles(droppedFiles);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const selectedFiles = Array.from(e.target.files);
      addFiles(selectedFiles);
    }
  };

  const addFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(validateFile);

    if (validFiles.length === 0) return;

    let updatedList: File[];
    if (allowMultiple) {
      updatedList = [...fileList, ...validFiles];
    } else {
      updatedList = [validFiles[0]];
    }

    setFileList(updatedList);
    onChange?.(updatedList);
  };

  const removeFile = (index: number) => {
    const updatedList = fileList.filter((_, i) => i !== index);
    setFileList(updatedList);
    onChange?.(updatedList);

    // Reset input value to allow selecting the same file again if needed
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <FileText className="w-8 h-8 text-red-500" />;
    if (["doc", "docx"].includes(ext || ""))
      return <FileText className="w-8 h-8 text-blue-600" />;
    if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext || ""))
      return <FileImage className="w-8 h-8 text-purple-500" />;
    return <FileIcon className="w-8 h-8 text-slate-400" />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(0)) + " " + sizes[i];
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <Typography variant="p" className="text-sm  text-slate-500">
        {label}
      </Typography>
      {/* Drop Zone */}
      <div
        className={`relative w-full h-32 border-2 border-dashed rounded-xl transition-all duration-200 ease-in-out flex flex-col items-center justify-center text-center
        ${
          dragActive
            ? "border-[#707FDD] bg-[#707FDD]/5"
            : "border-slate-300 hover:border-[#707FDD]/50 hover:bg-slate-50"
        }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          accept={accept}
          multiple={allowMultiple}
          onChange={handleChange}
        />

        <div className="flex flex-col p-4 items-center gap-1 z-0 pointer-events-none">
          <Typography variant="p" className="text-sm">
            <span className="text-[#707FDD] font-semibold underline underline-offset-2 cursor-pointer">
              {label}
            </span>{" "}
            <span className="text-slate-500">{description}</span>
          </Typography>
          <Typography variant="span" className="text-xs text-slate-400">
            {accept === "*" ? "All files" : accept.replace(/,/g, ", ")} only max{" "}
            {maxSize} MB each
          </Typography>
        </div>
      </div>

      {/* File List */}
      {fileList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {fileList.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="relative group bg-white border border-slate-200 rounded-lg p-3 flex items-center gap-3 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0">{getFileIcon(file.name)}</div>
              <div className="flex-1 min-w-0">
                <Typography
                  variant="p"
                  className="text-sm font-medium text-slate-900 truncate"
                >
                  {file.name}
                </Typography>
                <Typography variant="span" className="text-xs text-slate-500">
                  {formatFileSize(file.size)}
                </Typography>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;

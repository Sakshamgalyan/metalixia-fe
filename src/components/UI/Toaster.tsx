'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  CheckCircle2,
  AlertCircle,
  Info,
  AlertTriangle,
  Trash2,
} from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning' | 'default';

export interface Toast {
  id: string;
  title: string;
  description?: string;
  type?: ToastType;
  duration?: number;
}

let toastCount = 0;
let observers: ((toasts: Toast[]) => void)[] = [];
let toasts: Toast[] = [];

const notify = () => {
  observers.forEach((observer) => observer([...toasts]));
};

export type ToastTitle = string | React.ReactNode;
export type ToastOptions = string | { description?: string; duration?: number };

export const toast = {
  success: (title: ToastTitle, options?: ToastOptions, duration = 2000) => {
    const id = `toast-${toastCount++}`;
    const desc = typeof options === 'string' ? options : options?.description;
    const dur =
      typeof options === 'object' && options?.duration
        ? options.duration
        : duration;
    toasts = [
      ...toasts,
      {
        id,
        title: title?.toString() || '',
        description: desc,
        type: 'success',
        duration: dur,
      },
    ];
    notify();
    return id;
  },
  error: (title: ToastTitle, options?: ToastOptions, duration = 5000) => {
    const id = `toast-${toastCount++}`;
    const desc = typeof options === 'string' ? options : options?.description;
    const dur =
      typeof options === 'object' && options?.duration
        ? options.duration
        : duration;
    toasts = [
      ...toasts,
      {
        id,
        title: title?.toString() || '',
        description: desc,
        type: 'error',
        duration: dur,
      },
    ];
    notify();
    return id;
  },
  info: (title: ToastTitle, options?: ToastOptions, duration = 5000) => {
    const id = `toast-${toastCount++}`;
    const desc = typeof options === 'string' ? options : options?.description;
    const dur =
      typeof options === 'object' && options?.duration
        ? options.duration
        : duration;
    toasts = [
      ...toasts,
      {
        id,
        title: title?.toString() || '',
        description: desc,
        type: 'info',
        duration: dur,
      },
    ];
    notify();
    return id;
  },
  warning: (title: ToastTitle, options?: ToastOptions, duration = 5000) => {
    const id = `toast-${toastCount++}`;
    const desc = typeof options === 'string' ? options : options?.description;
    const dur =
      typeof options === 'object' && options?.duration
        ? options.duration
        : duration;
    toasts = [
      ...toasts,
      {
        id,
        title: title?.toString() || '',
        description: desc,
        type: 'warning',
        duration: dur,
      },
    ];
    notify();
    return id;
  },
  dismiss: (id: string) => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  },
  clearAll: () => {
    toasts = [];
    notify();
  },
};

const icons = {
  success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
  error: <AlertCircle className="w-5 h-5 text-rose-500" />,
  info: <Info className="w-5 h-5 text-blue-500" />,
  warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
  default: <Info className="w-5 h-5 text-slate-500" />,
};

const colors = {
  success: 'border-emerald-100 bg-emerald-50/80',
  error: 'border-rose-100 bg-rose-50/80',
  info: 'border-blue-100 bg-blue-50/80',
  warning: 'border-amber-100 bg-amber-50/80',
  default: 'border-slate-100 bg-slate-50/80',
};

const ToastItem = ({
  t,
  onRemove,
}: {
  t: Toast;
  onRemove: (id: string) => void;
}) => {
  useEffect(() => {
    if (t.duration === Infinity) return;

    const timer = setTimeout(() => {
      onRemove(t.id);
    }, t.duration || 5000);

    return () => clearTimeout(timer);
  }, [t.id, t.duration, onRemove]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`pointer-events-auto relative flex w-full max-w-sm gap-4 p-4 rounded-2xl border backdrop-blur-xl shadow-lg transition-all ${colors[t.type || 'default']}`}
    >
      <div className="shrink-0">{icons[t.type || 'default']}</div>

      <div className="flex-1 flex flex-col gap-1 min-w-0">
        <h4 className="text-sm font-semibold text-slate-900 truncate">
          {t.title}
        </h4>
        {t.description && (
          <p className="text-xs text-slate-600 leading-relaxed break-words">
            {t.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onRemove(t.id)}
        className="shrink-0 p-1 rounded-lg hover:bg-black/5 text-slate-400 hover:text-slate-600 transition-colors h-fit"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

const CustomToaster = () => {
  const [activeToasts, setActiveToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const observer = (newToasts: Toast[]) => {
      setActiveToasts(newToasts);
    };
    observers.push(observer);
    return () => {
      observers = observers.filter((obs) => obs !== observer);
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    toast.dismiss(id);
  }, []);

  return (
    <div className="fixed top-6 right-6 z-[9999] flex flex-col items-end gap-3 pointer-events-none w-full max-w-sm">
      <AnimatePresence mode="popLayout">
        {activeToasts.length >= 2 && (
          <motion.button
            key="clear-all"
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            onClick={() => toast.clearAll()}
            className="pointer-events-auto flex items-center gap-2 px-3 py-1.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full shadow-sm text-xs font-medium text-slate-600 hover:text-rose-600 hover:border-rose-200 transition-all mb-1 group"
          >
            <Trash2 className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" />
            Clear all notifications
          </motion.button>
        )}

        {activeToasts.map((t) => (
          <ToastItem key={t.id} t={t} onRemove={removeToast} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default CustomToaster;

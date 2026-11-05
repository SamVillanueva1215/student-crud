import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function AlertBanner({ message, type = 'success', onClose }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  const styles = {
    success: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-800',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />,
      closeBtn: 'text-emerald-700 hover:bg-emerald-100',
    },
    error: {
      bg: 'bg-rose-50 border-rose-200 text-rose-800',
      icon: <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />,
      closeBtn: 'text-rose-700 hover:bg-rose-100',
    },
    info: {
      bg: 'bg-blue-50 border-blue-200 text-blue-800',
      icon: <Info className="w-5 h-5 text-blue-600 shrink-0" />,
      closeBtn: 'text-blue-700 hover:bg-blue-100',
    },
  };

  const currentStyle = styles[type] || styles.info;

  return (
    <div
      role="alert"
      className={`border rounded-xl px-4 py-3 shadow-xs flex items-center justify-between transition-all duration-300 animate-fadeIn ${currentStyle.bg}`}
    >
      <div className="flex items-center gap-3">
        {currentStyle.icon}
        <p className="text-sm font-medium">{message}</p>
      </div>
      <button
        type="button"
        onClick={onClose}
        className={`p-1 rounded-md transition ${currentStyle.closeBtn} cursor-pointer`}
        aria-label="Dismiss message"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}

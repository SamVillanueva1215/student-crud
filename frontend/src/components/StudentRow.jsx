import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, AlertTriangle } from 'lucide-react';

export default function StudentRow({
  student,
  isEditing,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const handleConfirmDelete = () => {
    onDelete(student.id);
    setConfirmingDelete(false);
  };

  return (
    <tr
      className={`border-b border-slate-100 transition-colors ${
        isEditing
          ? 'bg-indigo-50/60 font-medium'
          : confirmingDelete
          ? 'bg-rose-50/50'
          : 'hover:bg-slate-50/80'
      }`}
    >
      {/* ID */}
      <td className="px-4 py-3.5 text-xs font-semibold text-slate-500 whitespace-nowrap">
        #{student.id}
      </td>

      {/* Name */}
      <td className="px-4 py-3.5 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
            {(student.firstname?.[0] || '').toUpperCase()}
            {(student.lastname?.[0] || '').toUpperCase()}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {student.firstname} {student.lastname}
            </div>
            <div className="text-xs text-slate-400 sm:hidden">
              {student.course} - {student.section}
            </div>
          </div>
        </div>
      </td>

      {/* Course */}
      <td className="px-4 py-3.5 whitespace-nowrap hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          {student.course}
        </span>
      </td>

      {/* Section */}
      <td className="px-4 py-3.5 whitespace-nowrap hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
          {student.section}
        </span>
      </td>

      {/* Actions (Zero Modal inline confirm) */}
      <td className="px-4 py-3.5 text-right whitespace-nowrap">
        {confirmingDelete ? (
          <div className="inline-flex items-center gap-1.5 animate-fadeIn">
            <span className="text-xs text-rose-600 font-medium flex items-center gap-1 mr-1">
              <AlertTriangle className="w-3.5 h-3.5" />
              Delete?
            </span>
            <button
              onClick={handleConfirmDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-lg shadow-2xs transition cursor-pointer disabled:opacity-50"
              title="Confirm Delete"
            >
              {isDeleting ? (
                <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <Check className="w-3.5 h-3.5" />
              )}
              <span>Yes</span>
            </button>
            <button
              onClick={() => setConfirmingDelete(false)}
              disabled={isDeleting}
              className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-slate-600 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition cursor-pointer"
              title="Cancel"
            >
              <X className="w-3.5 h-3.5" />
              <span>No</span>
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1.5">
            <button
              onClick={() => onEdit(student)}
              className={`inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium rounded-lg transition cursor-pointer ${
                isEditing
                  ? 'bg-indigo-600 text-white shadow-2xs'
                  : 'text-indigo-600 hover:bg-indigo-50 border border-transparent hover:border-indigo-100'
              }`}
              title="Edit Student"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Edit</span>
            </button>

            <button
              onClick={() => setConfirmingDelete(true)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition cursor-pointer"
              title="Delete Student"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Delete</span>
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

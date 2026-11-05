import React, { useState, useMemo } from 'react';
import { Search, X, Users, RefreshCw, FolderOpen } from 'lucide-react';
import StudentRow from './StudentRow';

export default function StudentTable({
  students,
  loading,
  editingStudent,
  onEdit,
  onDelete,
  deletingId,
  onRefresh,
}) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = useMemo(() => {
    if (!searchTerm.trim()) return students;
    const term = searchTerm.toLowerCase().trim();
    return students.filter((s) => {
      const fullname = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase();
      const course = (s.course || '').toLowerCase();
      const section = (s.section || '').toLowerCase();
      const id = String(s.id || '');

      return (
        fullname.includes(term) ||
        course.includes(term) ||
        section.includes(term) ||
        id.includes(term)
      );
    });
  }, [students, searchTerm]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
      {/* Table toolbar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <Users className="w-5 h-5 text-indigo-600" />
            Student Directory
          </h2>
          <p className="text-xs text-slate-500">
            {loading ? (
              'Synchronizing records...'
            ) : (
              `Showing ${filteredStudents.length} of ${students.length} recorded ${students.length === 1 ? 'student' : 'students'}`
            )}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search by name, course, section..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-8 py-2 text-xs rounded-xl border border-slate-300 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Student Name</th>
              <th className="px-4 py-3 hidden sm:table-cell">Course</th>
              <th className="px-4 py-3 hidden sm:table-cell">Section</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading && students.length === 0 ? (
              // Loading Skeleton
              Array.from({ length: 4 }).map((_, idx) => (
                <tr key={idx} className="animate-pulse">
                  <td className="px-4 py-4">
                    <div className="h-4 bg-slate-200 rounded w-8" />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-200 rounded-full" />
                      <div className="space-y-1.5">
                        <div className="h-4 bg-slate-200 rounded w-32" />
                        <div className="h-3 bg-slate-100 rounded w-20 sm:hidden" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="h-5 bg-slate-200 rounded-full w-14" />
                  </td>
                  <td className="px-4 py-4 hidden sm:table-cell">
                    <div className="h-5 bg-slate-200 rounded-full w-10" />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="h-6 bg-slate-200 rounded w-20 ml-auto" />
                  </td>
                </tr>
              ))
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  isEditing={editingStudent?.id === student.id}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  isDeleting={deletingId === student.id}
                />
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-12 px-4 text-center">
                  <div className="max-w-xs mx-auto flex flex-col items-center justify-center text-slate-400">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                      <FolderOpen className="w-6 h-6 text-slate-400" />
                    </div>
                    {searchTerm ? (
                      <>
                        <p className="text-sm font-semibold text-slate-700">No matching students</p>
                        <p className="text-xs text-slate-400 mt-1">
                          No results found for &ldquo;{searchTerm}&rdquo;. Try another query.
                        </p>
                        <button
                          onClick={() => setSearchTerm('')}
                          className="mt-3 text-xs font-semibold text-indigo-600 hover:text-indigo-700 cursor-pointer"
                        >
                          Clear search filter
                        </button>
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-semibold text-slate-700">No students found</p>
                        <p className="text-xs text-slate-400 mt-1">
                          Use the form on the left to add your first student record into the database.
                        </p>
                        <button
                          onClick={onRefresh}
                          className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition cursor-pointer"
                        >
                          <RefreshCw className="w-3.5 h-3.5" />
                          Refresh List
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

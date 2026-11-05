import React, { useState, useEffect } from 'react';
import { UserPlus, Save, XCircle, RotateCcw, Sparkles } from 'lucide-react';

export default function StudentForm({ editingStudent, onSubmit, onCancelEdit, submitting }) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setValidationErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setValidationErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const errors = {};
    if (!formData.firstname.trim()) errors.firstname = 'First name is required';
    if (!formData.lastname.trim()) errors.lastname = 'Last name is required';
    if (!formData.course.trim()) errors.course = 'Course is required';
    if (!formData.section.trim()) errors.section = 'Section is required';
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim().toUpperCase(),
      section: formData.section.trim().toUpperCase(),
    });
  };

  const handleReset = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    });
    setValidationErrors({});
    if (editingStudent) {
      onCancelEdit();
    }
  };

  const isEditMode = Boolean(editingStudent);

  return (
    <div className={`bg-white rounded-2xl shadow-sm border transition-all duration-200 overflow-hidden ${
      isEditMode ? 'border-indigo-300 ring-2 ring-indigo-100' : 'border-slate-200'
    }`}>
      {/* Header */}
      <div className={`px-6 py-4 border-b flex items-center justify-between ${
        isEditMode ? 'bg-indigo-50/70 border-indigo-100' : 'bg-slate-50/80 border-slate-100'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className={`p-2 rounded-xl text-white ${
            isEditMode ? 'bg-indigo-600' : 'bg-emerald-600'
          }`}>
            {isEditMode ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {isEditMode ? 'Edit Student Details' : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditMode ? `Updating record for Student #${editingStudent.id}` : 'Fill in the information below'}
            </p>
          </div>
        </div>

        {isEditMode && (
          <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-700">
            ID #{editingStudent.id}
          </span>
        )}
      </div>

      {/* Form Body */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        {/* First Name */}
        <div>
          <label htmlFor="firstname" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            First Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            placeholder="e.g. Juan"
            value={formData.firstname}
            onChange={handleChange}
            disabled={submitting}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition ${
              validationErrors.firstname
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {validationErrors.firstname && (
            <p className="mt-1 text-xs text-rose-500">{validationErrors.firstname}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label htmlFor="lastname" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            placeholder="e.g. Dela Cruz"
            value={formData.lastname}
            onChange={handleChange}
            disabled={submitting}
            className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition ${
              validationErrors.lastname
                ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
            }`}
          />
          {validationErrors.lastname && (
            <p className="mt-1 text-xs text-rose-500">{validationErrors.lastname}</p>
          )}
        </div>

        {/* Course and Section row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Course */}
          <div>
            <label htmlFor="course" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Course <span className="text-rose-500">*</span>
            </label>
            <input
              id="course"
              name="course"
              type="text"
              placeholder="e.g. BSIT"
              value={formData.course}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition uppercase ${
                validationErrors.course
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {validationErrors.course && (
              <p className="mt-1 text-xs text-rose-500">{validationErrors.course}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label htmlFor="section" className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              id="section"
              name="section"
              type="text"
              placeholder="e.g. 3A"
              value={formData.section}
              onChange={handleChange}
              disabled={submitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none transition uppercase ${
                validationErrors.section
                  ? 'border-rose-400 focus:ring-2 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100'
              }`}
            />
            {validationErrors.section && (
              <p className="mt-1 text-xs text-rose-500">{validationErrors.section}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
          <button
            type="submit"
            disabled={submitting}
            className={`flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white shadow-xs transition cursor-pointer disabled:opacity-60 ${
              isEditMode
                ? 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
                : 'bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800'
            }`}
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isEditMode ? (
              <Save className="w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            <span>{isEditMode ? 'Update Student' : 'Save Student'}</span>
          </button>

          {isEditMode ? (
            <button
              type="button"
              onClick={onCancelEdit}
              disabled={submitting}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 active:bg-slate-300 transition cursor-pointer"
            >
              <XCircle className="w-4 h-4 text-slate-500" />
              <span>Cancel</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              disabled={submitting}
              title="Clear input fields"
              className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-100 active:bg-slate-200 transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

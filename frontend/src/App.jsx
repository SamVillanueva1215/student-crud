import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import AlertBanner from './components/AlertBanner';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';
import studentApi from './services/studentApi';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [alert, setAlert] = useState(null);

  const formSectionRef = useRef(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const closeAlert = () => {
    setAlert(null);
  };

  // Fetch all students from backend
  const fetchStudents = async () => {
    setLoading(true);
    try {
      const data = await studentApi.getAll();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Error fetching students:', err);
      showAlert(
        'Unable to connect to Student API. Please make sure your Spring Boot backend is running on port 8080.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Form submit handler (handles both Create and Update)
  const handleFormSubmit = async (formData) => {
    setSubmitting(true);
    try {
      if (editingStudent) {
        // Update existing student
        const updated = await studentApi.update(editingStudent.id, formData);
        showAlert(
          `Student "${updated.firstname} ${updated.lastname}" (ID #${updated.id}) updated successfully!`,
          'success'
        );
        setEditingStudent(null);
      } else {
        // Create new student
        const created = await studentApi.create(formData);
        showAlert(
          `Student "${created.firstname} ${created.lastname}" created successfully!`,
          'success'
        );
      }
      await fetchStudents();
    } catch (err) {
      console.error('Save error:', err);
      showAlert(
        err.response?.data?.message || err.response?.data || 'Failed to save student record. Please try again.',
        'error'
      );
    } finally {
      setSubmitting(false);
    }
  };

  // Delete student handler (inline confirmation confirmed)
  const handleDeleteStudent = async (id) => {
    setDeletingId(id);
    try {
      await studentApi.delete(id);
      showAlert(`Student record #${id} was deleted successfully.`, 'success');

      // If the deleted student was currently being edited, reset the form
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }

      await fetchStudents();
    } catch (err) {
      console.error('Delete error:', err);
      showAlert(
        err.response?.data || 'Failed to delete student record.',
        'error'
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Trigger edit mode
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    // Smooth scroll to form if on mobile/smaller screens
    if (window.innerWidth < 1024 && formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cancel edit mode
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navbar */}
      <Navbar
        totalCount={students.length}
        onRefresh={fetchStudents}
        loading={loading}
      />

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {/* Feedback Alert Banner */}
        {alert && (
          <div className="mb-6">
            <AlertBanner
              message={alert.message}
              type={alert.type}
              onClose={closeAlert}
            />
          </div>
        )}

        {/* Dashboard 2-column Layout (NO MODAL: Inline Card + Directory Table) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Panel: Form Card (4 Cols on desktop) */}
          <section ref={formSectionRef} className="lg:col-span-4 sticky lg:top-24">
            <StudentForm
              editingStudent={editingStudent}
              onSubmit={handleFormSubmit}
              onCancelEdit={handleCancelEdit}
              submitting={submitting}
            />

            {/* Quick Helper Note */}
            <div className="mt-4 p-4 rounded-xl bg-indigo-50/50 border border-indigo-100 text-slate-600 text-xs leading-relaxed">
              <p className="font-semibold text-indigo-900 mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                No Modal Quick Editing
              </p>
              Click <strong>Edit</strong> on any student row in the table to load their data directly into this panel. Click <strong>Cancel</strong> at any time to return to adding a new student.
            </div>
          </section>

          {/* Right Panel: Student Directory Table (8 Cols on desktop) */}
          <section className="lg:col-span-8">
            <StudentTable
              students={students}
              loading={loading}
              editingStudent={editingStudent}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              deletingId={deletingId}
              onRefresh={fetchStudents}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-500">
        Student CRUD System &bull; Frontend: Vite + React + Tailwind CSS &bull; Backend: Spring Boot
      </footer>
    </div>
  );
}

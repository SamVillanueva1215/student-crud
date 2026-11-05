import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
const STUDENTS_URL = `${API_BASE}/villanueva/students`;

const studentApi = {
  // Get all students
  getAll: async () => {
    const response = await axios.get(STUDENTS_URL);
    return response.data;
  },

  // Get student by ID
  getById: async (id) => {
    const response = await axios.get(`${STUDENTS_URL}/${id}`);
    return response.data;
  },

  // Create new student
  create: async (studentData) => {
    const response = await axios.post(STUDENTS_URL, studentData);
    return response.data;
  },

  // Update student
  update: async (id, studentData) => {
    const response = await axios.put(`${STUDENTS_URL}/${id}`, studentData);
    return response.data;
  },

  // Delete student
  delete: async (id) => {
    const response = await axios.delete(`${STUDENTS_URL}/${id}`);
    return response.data;
  },
};

export default studentApi;

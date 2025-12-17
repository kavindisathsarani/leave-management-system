import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

// Leave API
export const createLeave = async (leaveData) => {
  const response = await api.post('/leaves', leaveData);
  return response.data;
};

export const getMyLeaves = async () => {
  const response = await api.get('/leaves/my-leaves');
  return response.data;
};

export const getAllLeaves = async () => {
  const response = await api.get('/leaves/all');
  return response.data;
};

export const updateLeaveStatus = async (leaveId, status) => {
  const response = await api.put(`/leaves/${leaveId}/status`, { status });
  return response.data;
};

export default api;


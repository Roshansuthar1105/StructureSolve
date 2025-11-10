import axios from 'axios';

const API_BASE_URL =  import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }).then(res => res.data),
  register: (userData) => api.post('/auth/register', userData).then(res => res.data),
  getMe: () => api.get('/auth/me').then(res => res.data),
};

export const topicsAPI = {
  getAll: () => api.get('/topics').then(res => res.data),
  getById: (id) => api.get(`/topics/${id}`).then(res => res.data),
};

export const sheetsAPI = {
  getAll: () => api.get('/sheets').then(res => res.data),
  getById: (id) => api.get(`/sheets/${id}`).then(res => res.data),
};

export const problemsAPI = {
  getAll: () => api.get('/problems').then(res => res.data),
  getById: (id) => api.get(`/problems/${id}`).then(res => res.data),
  markComplete: (id) => api.post(`/problems/${id}/complete`).then(res => res.data),
};

export const usersAPI = {
  getProfile: () => api.get('/users/profile').then(res => res.data),
  updateProgress: (data) => api.post('/users/progress', data).then(res => res.data),
};

export default api;
import axios, { AxiosInstance } from 'axios';
import {
  DashboardStats,
  User,
  PaginatedResponse,
  AuditLog,
  AuditLogFilter,
  CreateUserRequest,
  UpdateUserRequest,
  UserFilter,
  ChangePasswordRequest,
  LoginRequest,
  LoginResponse,
} from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

const api: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

interface ApiService {
  // Auth
  login(credentials: LoginRequest): Promise<LoginResponse>;
  logout(): Promise<void>;
  
  // Dashboard
  getDashboardStats(): Promise<DashboardStats>;
  
  // Users
  getUsers(params: UserFilter): Promise<PaginatedResponse<User>>;
  getUserById(id: number): Promise<User>;
  createUser(data: CreateUserRequest): Promise<User>;
  updateUser(id: number, data: UpdateUserRequest): Promise<User>;
  deleteUser(id: number): Promise<void>;
  updateUserStatus(id: number, status: string): Promise<User>;
  resetUserPassword(id: number): Promise<string>;
  
  // Profile
  updateProfile(data: Partial<User>): Promise<User>;
  changeMyPassword(data: ChangePasswordRequest): Promise<void>;
  
  // Audit Logs
  getAuditLogs(params: AuditLogFilter): Promise<PaginatedResponse<AuditLog>>;
  exportAuditLogs(params: Omit<AuditLogFilter, 'page' | 'size' | 'sort'>): Promise<Blob>;
}

const apiService: ApiService = {
  // Auth
  login: async (credentials) => {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
  },

  // Dashboard
  getDashboardStats: async () => {
    const response = await api.get<DashboardStats>('/dashboard/stats');
    return response.data;
  },

  // Users
  getUsers: async (params) => {
    const response = await api.get<PaginatedResponse<User>>('/users', { params });
    return response.data;
  },

  getUserById: async (id) => {
    const response = await api.get<User>(`/users/${id}`);
    return response.data;
  },

  createUser: async (data) => {
    const response = await api.post<User>('/users', data);
    return response.data;
  },

  updateUser: async (id, data) => {
    const response = await api.put<User>(`/users/${id}`, data);
    return response.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },

  updateUserStatus: async (id, status) => {
    const response = await api.patch<User>(`/users/${id}/status`, { status });
    return response.data;
  },

  resetUserPassword: async (id) => {
    const response = await api.post<{ newPassword: string }>(`/users/${id}/reset-password`);
    return response.data.newPassword;
  },

  // Profile
  updateProfile: async (data) => {
    const response = await api.put<User>('/profile', data);
    return response.data;
  },

  changeMyPassword: async (data) => {
    await api.patch('/profile/password', data);
  },

  // Audit Logs
  getAuditLogs: async (params) => {
    const response = await api.get<PaginatedResponse<AuditLog>>('/audit-logs', { params });
    return response.data;
  },

  exportAuditLogs: async (params) => {
    const response = await api.get('/audit-logs/export', {
      params,
      responseType: 'blob',
    });
    return response.data;
  },
};

export default apiService; 
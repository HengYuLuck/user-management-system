// 用户相关类型
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status: UserStatus;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER'
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  LOCKED = 'LOCKED',
  PENDING = 'PENDING'
}

// 登录相关类型
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

// 用户DTO
export interface CreateUserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface UpdateUserRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  role?: string;
  status?: UserStatus;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 日志相关类型
export interface AuditLog {
  id: number;
  userId: number;
  username?: string;
  actionType: string;
  actionDetails: string;
  ipAddress: string;
  userAgent: string;
  createdAt: string;
}

export interface AuditLogFilter {
  username?: string;
  actionType?: string;
  startDate?: string;
  endDate?: string;
  page: number;
  size: number;
  sort?: string;
}

export const ACTION_TYPES = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  DELETE_USER: 'DELETE_USER',
  CHANGE_PASSWORD: 'CHANGE_PASSWORD',
  UPDATE_PROFILE: 'UPDATE_PROFILE',
} as const;

export type ActionType = typeof ACTION_TYPES[keyof typeof ACTION_TYPES];

// 分页相关类型
export interface PageRequest {
  page: number;
  size: number;
  sort?: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

// Dashboard统计数据
export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  newUsersToday: number;
  totalLogins: number;
  loginTrends: LoginTrend[];
  usersByRole: UserRoleStats[];
  usersByStatus: UserStatusStats[];
}

export interface LoginTrend {
  date: string;
  count: number;
}

export interface UserRoleStats {
  role: string;
  count: number;
}

export interface UserStatusStats {
  status: string;
  count: number;
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: string[];
}

// 表单类型
export interface UserFormData {
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  password?: string;
  role: UserRole;
  status: UserStatus;
}

// 认证上下文类型
export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

// User Management related types
export interface UserFilter {
  username?: string;
  role?: string;
  status?: UserStatus;
  page: number;
  size: number;
  sort?: string;
}

export const USER_ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES]; 
export type Role = "admin" | "realtor" | "buyer" | "seller";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LogoutRequest {
  token: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface RegisterResponse {
  message: string;
  user_id: number;
}

export interface LogoutResponse {
  status: boolean;
}

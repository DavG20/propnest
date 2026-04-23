import { apiRequest } from "@/lib/auth";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutRequest,
  LogoutResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
} from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },
  logout: async (): Promise<LogoutResponse> => {
    const token = localStorage.getItem("token");

    return apiRequest<LogoutResponse>("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  },

  forgotPassword: async (data: ForgotPasswordRequest): Promise<ForgotPasswordResponse> => {
    return apiRequest<ForgotPasswordResponse>("/forgot-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  resetPassword: async (data: ResetPasswordRequest): Promise<ResetPasswordResponse> => {
    return apiRequest<ResetPasswordResponse>("/reset-password", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },
};

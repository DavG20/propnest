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
  User,
} from "@/types/auth";

export const authService = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const { rememberMe, ...loginData } = credentials;
    const response = await apiRequest<LoginResponse>("/login", {
      method: "POST",
      body: JSON.stringify(loginData),
    });
    
    if (response.token) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem("token", response.token);
      storage.setItem("user", JSON.stringify(response.user));
    }
    return response;
  },

  register: async (userData: RegisterRequest): Promise<RegisterResponse> => {
    return apiRequest<RegisterResponse>("/register", {
      method: "POST",
      body: JSON.stringify(userData),
    });
  },

  logout: async (): Promise<LogoutResponse> => {
    const token = authService.getToken();
    let response: LogoutResponse = { status: true };

    if (token) {
      try {
        response = await apiRequest<LogoutResponse>("/logout", {
          method: "POST",
        });
      } catch (error) {
        console.error("Logout request failed", error);
      }
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    return response;
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

  getCurrentUser: (): User | null => {
    if (typeof window === "undefined") return null;
    const user = localStorage.getItem("user") || sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken: (): string | null => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!(localStorage.getItem("token") || sessionStorage.getItem("token"));
  },
};

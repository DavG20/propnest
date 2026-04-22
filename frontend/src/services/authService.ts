import { apiRequest } from "@/lib/auth";
import {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  LogoutRequest,
  LogoutResponse
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
};

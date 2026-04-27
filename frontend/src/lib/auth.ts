const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api";

export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== "undefined" ? (localStorage.getItem("token") || sessionStorage.getItem("token")) : null;
  
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || `Error: ${response.status} ${response.statusText}`);
  }

  // Handle empty responses
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return response.json();
  }

  return {} as T;
}

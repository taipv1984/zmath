/**
 * API Client - chuẩn để gọi API
 * Hiện tại fake data từ JSON, sau này thay baseUrl
 */

const BASE_URL = ""; // Thay URI API thật sau

export interface ApiConfig {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  params?: Record<string, string | number>;
}

async function request<T>(endpoint: string, config: ApiConfig = {}): Promise<T> {
  const { method = "GET", headers = {}, body, params } = config;

  let url = BASE_URL ? `${BASE_URL}${endpoint}` : endpoint;
  if (params) {
    const search = new URLSearchParams(
      Object.entries(params).map(([k, v]) => [k, String(v)])
    );
    url += (url.includes("?") ? "&" : "?") + search.toString();
  }

  const fetchConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers,
    },
  };
  if (body && method !== "GET") {
    fetchConfig.body = JSON.stringify(body);
  }

  const res = await fetch(url, fetchConfig);
  if (!res.ok) {
    throw new Error(`API Error: ${res.status} ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  get: <T>(url: string, params?: ApiConfig["params"]) =>
    request<T>(url, { method: "GET", params }),

  post: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "POST", body }),

  put: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "PUT", body }),

  delete: <T>(url: string) => request<T>(url, { method: "DELETE" }),

  patch: <T>(url: string, body?: unknown) =>
    request<T>(url, { method: "PATCH", body }),
};

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: DEFAULT_API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let csrfToken: string | null = null;
async function fetchCsrfToken() {
  try {
    const response = await apiClient.get<{ csrfToken: string }>(
      "/auth/csrf-token",
    );
    csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    csrfToken = null;
    console.error("❌ Failed to fetch CSRF token:", error);
    throw error;
  }
}

apiClient.interceptors.request.use(
  async (config) => {
    const method = config.method?.toUpperCase();
    if (method === "POST" || method === "PATCH" || method === "DELETE") {
      const token = await fetchCsrfToken();
      config.headers["X-CSRF-Token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

async function request<T>(
  method: HttpMethod,
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
): Promise<T> {
  try {
    const response: AxiosResponse<T> = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getApiHandler = <T>(url: string, config?: AxiosRequestConfig) =>
  request<T>("GET", url, undefined, config);

export const postApiHandler = <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
) => request<T>("POST", url, data, config);

export const patchApiHandler = <T>(
  url: string,
  data: unknown,
  config?: AxiosRequestConfig,
) => request<T>("PATCH", url, data, config);

export const deleteApiHandler = <T>(url: string, config?: AxiosRequestConfig) =>
  request<T>("DELETE", url, undefined, config);

export const getCurrentUser = async () => {
  return getApiHandler<{
    userId: string;
    email: string;
    username: string;
    isOnboarding: boolean;
    isGoogleAccount: boolean;
  }>("/user/me");
};

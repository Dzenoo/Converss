import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { getCookieValue } from "./utils";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: DEFAULT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getCookieValue("__session");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

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

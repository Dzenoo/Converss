import axios, { AxiosResponse } from "axios";
import { getCookieValue } from "./utils";
import { CustomAxiosRequestConfig, HttpMethod } from "@/types";

const DEFAULT_API_URL = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: DEFAULT_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  if (config.skipAuth) {
    return config;
  }

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
  config?: CustomAxiosRequestConfig,
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

export const getApiHandler = <T>(
  url: string,
  config?: CustomAxiosRequestConfig,
) => request<T>("GET", url, undefined, config);

export const postApiHandler = <T>(
  url: string,
  data: unknown,
  config?: CustomAxiosRequestConfig,
) => request<T>("POST", url, data, config);

export const patchApiHandler = <T>(
  url: string,
  data: unknown,
  config?: CustomAxiosRequestConfig,
) => request<T>("PATCH", url, data, config);

export const deleteApiHandler = <T>(
  url: string,
  config?: CustomAxiosRequestConfig,
) => request<T>("DELETE", url, undefined, config);

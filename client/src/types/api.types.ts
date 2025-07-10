import { InternalAxiosRequestConfig } from "axios";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface CustomAxiosRequestConfig
  extends InternalAxiosRequestConfig<any> {
  skipAuth?: boolean;
}

import { AxiosRequestConfig } from "axios";

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  skipAuth?: boolean;
}

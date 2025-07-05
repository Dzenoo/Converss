"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

import { apiClient } from "@/lib/api";

export function useAuthInterceptor() {
  const { getToken } = useAuth();

  useEffect(() => {
    const id = apiClient.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    return () => {
      apiClient.interceptors.request.eject(id);
    };
  }, [getToken]);
}

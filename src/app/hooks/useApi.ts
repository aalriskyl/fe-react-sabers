/* eslint-disable @typescript-eslint/no-explicit-any */
// src/hooks/useApi.ts
import { useState, useCallback } from "react";
import api from "../api/axios";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface ApiRequestOptions {
  url: string;
  method: HttpMethod;
  data?: any;
  params?: any;
  headers?: any;
}

interface ApiResponse<T> {
  data: T | null;
  error: any;
  loading: boolean;
}

export const useApi = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  const request = useCallback(
    async <T>({
      url,
      method,
      data,
      params,
      headers,
    }: ApiRequestOptions): Promise<ApiResponse<T>> => {
      setLoading(true);
      setError(null);

      try {
        const response = await api.request<T>({
          url,
          method,
          data,
          params,
          headers,
        });

        return {
          data: response.data,
          error: null,
          loading: false,
        };
      } catch (err: any) {
        setError(err.response?.data?.message || err.message);
        return {
          data: null,
          error: err.response?.data?.message || err.message,
          loading: false,
        };
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const get = useCallback(
    async <T>(
      url: string,
      params?: any,
      headers?: any
    ): Promise<ApiResponse<T>> => {
      return request<T>({ url, method: "GET", params, headers });
    },
    [request]
  );

  const post = useCallback(
    async <T>(
      url: string,
      data?: any,
      headers?: any
    ): Promise<ApiResponse<T>> => {
      return request<T>({ url, method: "POST", data, headers });
    },
    [request]
  );

  const put = useCallback(
    async <T>(
      url: string,
      data?: any,
      headers?: any
    ): Promise<ApiResponse<T>> => {
      return request<T>({ url, method: "PUT", data, headers });
    },
    [request]
  );

  const del = useCallback(
    async <T>(
      url: string,
      data?: any,
      headers?: any
    ): Promise<ApiResponse<T>> => {
      return request<T>({ url, method: "DELETE", data, headers });
    },
    [request]
  );

  return {
    request,
    get,
    post,
    put,
    del,
    loading,
    error,
  };
};

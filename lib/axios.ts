import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { refreshAccessTokenHandler } from '@/lib/apis';
import { useAuthStore } from '@/lib/store';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: {
  resolve: (value: unknown) => void;
  reject: (reason: unknown) => void;
  config: AxiosRequestConfig;
}[] = [];

const processQueue = (token: string | null, error?: AxiosError) => {
  failedQueue.forEach((item) => {
    if (token && item.config.headers) {
      item.config.headers.Authorization = `Bearer ${token}`;
      item.resolve(axiosInstance(item.config));
    } else {
      item.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    if (error.response?.status === 440 && originalRequest && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        // Queue other requests while refresh is in progress
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest });
        });
      }

      isRefreshing = true;

      try {
        const newAccessToken = await refreshAccessTokenHandler(
          originalRequest.headers?.Authorization,
        );

        if (newAccessToken) {
          useAuthStore.getState().setAccessToken(newAccessToken);

          // Retry original request
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newAccessToken}`,
          };

          processQueue(newAccessToken);
          return axiosInstance(originalRequest);
        } else {
          processQueue(null);
        }
      } catch (err) {
        processQueue(null, err as AxiosError);
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);

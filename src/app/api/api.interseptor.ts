import { getContentType } from "@/app/api/api.helpers";
import { getAccessToken, removeFromStorage } from "@/services/auth/auth-token.service";
import { authService } from "@/services/auth/auth.service";
import axios, { CreateAxiosDefaults, InternalAxiosRequestConfig } from "axios";

const options: CreateAxiosDefaults = {
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: getContentType(),
    withCredentials: true,
};

export const axiosClassic = axios.create(options);
export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    const accessToken = getAccessToken();

    if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

axiosWithAuth.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;

            try {
                await authService.getNewToken();
                return axiosWithAuth.request(originalRequest);
            } catch (refreshError) {
                removeFromStorage();
                // Опционально: редирект на /login
                // window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        throw error;
    },
);

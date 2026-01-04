import axios, { CreateAxiosDefaults } from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { API_URL } from "@/constants/constants";
import { AuthTokenService, removeAccessToken } from "@/services/auth/auth-token.service";
import authService from "@/services/auth/auth.service";

const axiosOptions: CreateAxiosDefaults = {
    baseURL: API_URL,
    headers: getContentType(),
    withCredentials: true,
};
//гость
export const axiosClassic = axios.create(axiosOptions);

//только для авторизованных
export const instance = axios.create(axiosOptions);

instance.interceptors.request.use((config) => {
    const accessToken = AuthTokenService();

    if (config?.headers && accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
});

instance.interceptors.response.use(
    (config) => config,
    async (error) => {
        const originalRequest = error.config;

        if (error?.response?.status === 401 && error.config && !error.config._isRetry && (errorCatch(error) === "jwt expired" || errorCatch(error) === "jwt must be provided")) {
            originalRequest._isRetry = true;

            const hasToken = Boolean(AuthTokenService());
            if (!hasToken) {
                removeAccessToken();
                throw error;
            }

            try {
                await authService.getNewTokens();
                return instance.request(originalRequest);
            } catch (refreshError) {
                removeAccessToken();
                throw refreshError;
            }
        }

        throw error;
    },
);

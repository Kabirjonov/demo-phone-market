import { refreshAccessToken } from "@/lib/auth-session";
import { getAccessToken } from "@/lib/auth-token";
import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
export const Base_Url =
	process.env.BACKEND_PUBLIC_URL ||
	"https://demo-phone-market-backend.vercel.app";

const api = axios.create({
	baseURL: Base_Url,
	withCredentials: true,
});

export type RetryableRequestConfig = InternalAxiosRequestConfig & {
	_retry?: boolean;
};

api.interceptors.request.use(config => {
	const token = getAccessToken();

	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});

api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config as RetryableRequestConfig | undefined;
		const status = error.response?.status;

		if (!originalRequest || status !== 401 || originalRequest._retry) {
			return Promise.reject(error);
		}

		if (originalRequest.url?.includes("/api/auth/refresh")) {
			return Promise.reject(error);
		}

		originalRequest._retry = true;

		const nextAccessToken = await refreshAccessToken();

		if (!nextAccessToken) {
			return Promise.reject(error);
		}

		originalRequest.headers.Authorization = `Bearer ${nextAccessToken}`;

		return api(originalRequest);
	},
);

export default api;

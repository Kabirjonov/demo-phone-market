"use client";

import { setAccessToken } from "@/lib/auth-token";
import { useSessionStore } from "@/store/useSession.store";
import axios from "axios";

const BASE_URL = process.env.BACKEND_PUBLIC_URL || "http://localhost:5000";

const authApi = axios.create({
	baseURL: BASE_URL,
	withCredentials: true,
});

let refreshPromise: Promise<string | null> | null = null;

export async function refreshAccessToken() {
	if (!refreshPromise) {
		refreshPromise = authApi
			.post<{ accessToken: string }>("/api/auth/refresh")
			.then(response => {
				const nextAccessToken = response.data?.accessToken ?? null;

				if (nextAccessToken) {
					setAccessToken(nextAccessToken);
				}

				return nextAccessToken;
			})
			.catch(() => {
				useSessionStore.getState().logout();
				return null;
			})
			.finally(() => {
				refreshPromise = null;
			});
	}

	return refreshPromise;
}

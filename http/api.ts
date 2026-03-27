import axios from "axios";
export const Base_Url = process.env.BACKEND_PUBLIC_URL;

const api = axios.create({
	baseURL: Base_Url,
	withCredentials: true,
});

api.interceptors.request.use(config => {
	const token = localStorage.getItem("accessToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}

	return config;
});
export default api;

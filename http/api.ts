import axios from "axios";
export const Base_Url = process.env.BACKEND_PUBLIC_URL;

const api = axios.create({
	baseURL: "http://localhost:5000",
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

import axios from "axios";
export const Base_Url = process.env.BACKEND_PUBLIC_URL;

const api = axios.create({ baseURL: Base_Url });
export default api;

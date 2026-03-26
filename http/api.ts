import axios from "axios";
export const Default_Url = process.env.NEXT_PUBLIC_SITE_URL;

const api = axios.create({ baseURL: Default_Url });
export default api;

// lib/axios.ts
import axios from "axios";
export const Default_Url = process.env.Next_Url;

const api = axios.create({ baseURL: Default_Url });
// Add tokens/interceptors here
export default api;

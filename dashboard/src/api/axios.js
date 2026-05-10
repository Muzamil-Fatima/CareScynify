import axios from "axios";
import { BASE_URL } from "../Utils/api";

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
});

// Auto attach token to every request
api.interceptors.request.use((config) => {
  const user = localStorage.getItem("user");

  if (user) {
    const token = JSON.parse(user)?.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

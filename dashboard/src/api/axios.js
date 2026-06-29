import axios from "axios";
import { BASE_URL } from "../Utils/api";

// Create axios instance
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

import axios from "axios";
import { NEXT_PUBLIC_API_URL } from "../env";

const headers = {
  "Content-Type": "application/json",
};

export const apiClient = axios.create({
  baseURL: NEXT_PUBLIC_API_URL,
  headers,
  withCredentials: true,
  timeout: 60 * 1000,
});

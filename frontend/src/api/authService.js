import axios from "axios";

const authFetch = axios.create({
  // baseURL: "https://127.0.0.1",
  baseURL: "http://localhost:3001",
  headers: {
    "Content-Type": "application/json",
  },
});

authFetch.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const API_BASE_URL = "/auth/api/auth";


export const login = async (data) => {
  try {
    const response = await authFetch.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export const register = async (data) => {
  try {
    const response = await authFetch.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}
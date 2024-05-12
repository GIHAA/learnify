import axios from 'axios';

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

const API_BASE_URL = "/auth/api/users";

export const addUsers = async (data) => {
    try {
        const response = await authFetch.post(`${API_BASE_URL}`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding users:", error);
        throw error;
    }
}

export const getUsers = async () => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error getting users:", error);
        throw error;
    }
}

export const updateUser = async (userId, data) => {
    try {
        const response = await authFetch.patch(`${API_BASE_URL}/${userId}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating user:", error);
        throw error;
    }
}

export const removeUser = async (userId) => {
    try {
        const response = await authFetch.delete(`${API_BASE_URL}/${userId}`);
        return response.data;
    } catch (error) {
        console.error("Error removing user:", error);
        throw error;
    }
}
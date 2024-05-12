import axios from 'axios';

const authFetch = axios.create({
  // baseURL: "https://127.0.0.1",
  baseURL: "http://localhost:3006",
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

const API_BASE_URL = "/feedback/api/feedback";

export const sendFeedback = async (data) => {
    try {
        const response = await authFetch.post(`${API_BASE_URL}`, data);
        return response.data;
    } catch (error) {
        console.error("Error adding feedback:", error);
        throw error;
    }
}

export const getFeedbacks = async () => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}`);
        return response.data;
    } catch (error) {
        console.error("Error getting feedback:", error);
        throw error;
    }
}




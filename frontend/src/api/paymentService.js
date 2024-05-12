import axios from 'axios';

const authFetch = axios.create({
  // baseURL: "https://127.0.0.1",
  baseURL: "http://localhost:3004",
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

const API_BASE_URL = "/payment/api/payment";

export const getDashboard = async () => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}/admin-dashboard`);
        return response.data;
    } catch (error) {
        console.error("Error fetching dashboard:", error);
        throw error;
    }
}

export const getPaymentDetails = async (paymentId) => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}/${paymentId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching payment details:", error);
        throw error;
    }
}

export const createPayment = async (paymentData) => {
    try {
        const response = await authFetch.post(`${API_BASE_URL}/create-payment-intent`, paymentData);
        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
}
import axios from 'axios';

const authFetch = axios.create({
  // baseURL: "https://127.0.0.1",
  baseURL: "http://localhost:3002",
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

export default authFetch;
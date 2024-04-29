import authFetch from "./axiosInterceptor";

const API_BASE_URL = "/auth-service/api/auth";


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
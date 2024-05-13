import authFetch from "./axiosInterceptor";

const API_BASE_URL = "/auth/api/";


export const login = async (data) => {
  try {
    const response = await authFetch.post(`${API_BASE_URL}auth/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

export const register = async (data) => {
  try {
    const response = await authFetch.post(`${API_BASE_URL}auth/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
}

export const notify = async (data) => {
  try {
    const response = await authFetch.post(`${API_BASE_URL}/users/notify`, data);
    return response.data;
  } catch (error) {
    console.error("Error notifying:", error);
    throw error;
  }
}
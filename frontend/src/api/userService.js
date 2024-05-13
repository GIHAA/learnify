import authFetch from "./axiosInterceptor";

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
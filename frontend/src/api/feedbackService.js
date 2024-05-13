import authFetch from "./axiosInterceptor";

const API_BASE_URL = "/feedback/api/";

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




import authFetch from "./axiosInterceptor";

const API_BASE_URL = "/enrollment/api/enrollment";


export const getEnrollments = async (page = 1, limit = 4, searchText = "") => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}?page=${page}&limit=${limit}&searchTerm=${searchText}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
    }
}

export const getUserEnrollments = async (id ,page = 1, limit = 4, searchText = "") => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}/user/${id}?page=${page}&limit=${limit}&searchTerm=${searchText}`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
    }

}

export const getAllEnrollments = async (searchText = "") => {
    try {
        const response = await authFetch.get(
            `${API_BASE_URL}?searchTerm=${searchText}`
        );
        return response.data.data;
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        throw error;
    }
}

export const getEnrollment = async (id) => {
    try {
        const response = await authFetch.get(`${API_BASE_URL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching enrollment with ID ${id}:`, error);
        throw error;
    }
}

export const createEnrollment = async (data) => {
    try {
        const response = await authFetch.post(API_BASE_URL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating enrollment:", error);
        throw error;
    }
}

export const updateEnrollment = async (id, data) => {
    try {
        const response = await authFetch.patch(`${API_BASE_URL}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating enrollment with ID ${id}:`, error);
        throw error;
    }
}

export const removeEnrollment = async (id) => {
    try {
        await authFetch.delete(`${API_BASE_URL}/${id}`);
    } catch (error) {
        console.error(`Error deleting enrollment with ID ${id}:`, error);
        throw error;
    }
}
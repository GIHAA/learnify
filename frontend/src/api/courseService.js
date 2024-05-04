import authFetch from "./axiosInterceptor";

const API_BASE_URL = "/course-service/api/course";

export const getCourses = async (page = 1, limit = 4, searchText = "") => {
    console.log(searchText);
  try {
    const response = await authFetch.get(`${API_BASE_URL}?page=${page}&limit=${limit}&searchTerm=${searchText}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const getCourse = async (id) => {
  try {
    const response = await authFetch.get(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching course with ID ${id}:`, error);
    throw error;
  }
};

export const createCourse = async (data) => {
  try {
    const response = await authFetch.post(API_BASE_URL, data);
    return response.data;
  } catch (error) {
    console.error("Error creating course:", error);
    throw error;
  }
};

export const updateCourse = async (id, data) => {
  try {
    const response = await authFetch.put(`${API_BASE_URL}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(`Error updating course with ID ${id}:`, error);
    throw error;
  }
};

export const deleteCourse = async (id) => {
  try {
    await authFetch.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Error deleting course with ID ${id}:`, error);
    throw error;
  }
};
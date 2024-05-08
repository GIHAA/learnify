import authFetch from "./axiosInterceptor";

export const getCourseServiceHealth = async () => {
  try {
    await authFetch.get(`course/health`);
    return true;
  } catch (error) {
    console.error("Error fetching course service health:", error);
    throw error;
  }
};

export const getPaymentServiceHealth = async () => {
  try {
    await authFetch.get(`payment/health`);
    return true;
  } catch (error) {
    console.error("Error fetching payment service health:", error);
    throw error;
  }
};

export const getAuthServiceHealth = async () => {
  try {
    await authFetch.get(`auth/health`);
    return true;
  } catch (error) {
    console.error("Error fetching auth service health:", error);
    throw error;
  }
};

export const getEnrollmentServiceHealth = async () => {
  try {
    await authFetch.get(`enrollment/health`);
    return true;
  } catch (error) {
    console.error("Error fetching enrollment service health:", error);
    throw error;
  }
};

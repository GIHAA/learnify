import authFetch from "./axiosInterceptor";

export const getCourseServiceHealth = async () => {
  try {
    await authFetch.get(`course/health`);
    return true;
  } catch (error) {
    console.error("Error fetching course service health:", error);
    return false;
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

export const getFeedbackServiceHealth = async () => {
  try {
    await authFetch.get(`feedback/health`);
    return true;
  } catch (error) {
    console.error("Error fetching feedback service health:", error);
    throw error;
  }
}

export const notificationServiceHealth = async () => {
  try {
    await authFetch.get(`notification/health`);
    return true;
  } catch (error) {
    console.error("Error fetching notification service health:", error);
    throw error;
  }
}
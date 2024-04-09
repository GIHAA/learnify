import axios from "axios";

const API_URL = `${process.env.REACT_APP_BACKEND_API}/api/auth/`;


// Register user
const forgetPassword = async (userData) => {
  const response = await axios.post(API_URL + "forgot_password", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Register user
const resetPassword = async (userData) => {
  const response = await axios.post(API_URL + `reset_password/${userData.token}`, {new_password : userData.newpass});

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};


// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + "login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data.data));
  }

  return response.data.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
  forgetPassword,
  resetPassword
};

export default authService;

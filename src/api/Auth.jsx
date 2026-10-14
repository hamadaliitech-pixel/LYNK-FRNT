import axios from "axios";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "https://localhost:3000"
).replace(/\/+$/, "");

const API_URL = `${API_BASE_URL}/api/auth`;

export const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/SignUp`,
    userData,
    { withCredentials: true }
  );

  return response;
};

export const login = async (userData) => {
  const response = await axios.post(
    `${API_URL}/Login`,
    userData,
    { withCredentials: true }
  );

  return response.data;
};

export const logout = async () => {
  const response = await axios.post(
    `${API_URL}/Logout`,
    {},
    { withCredentials: true }
  );

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(
    `${API_URL}/forgot-password`,
    { email }
  );

  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(
    `${API_URL}/reset-password/${token}`,
    { password }
  );

  return response.data;
};
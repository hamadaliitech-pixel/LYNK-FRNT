import axios from "axios";

const API_URL = "http://lynk.bonto.run/api/auth";

export const register = async (userData) => {
  const response = await axios.post(
    `${API_URL}/register`,
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
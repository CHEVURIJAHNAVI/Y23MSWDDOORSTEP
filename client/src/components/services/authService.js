import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
    }
    return res.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

export const registerUser = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);
    return res.data;
  } catch (error) {
    return { error: error.response.data.error };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};

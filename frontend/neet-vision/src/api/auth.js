import axios from "axios";

const API = "https://neet-visual-learning.onrender.com/api/users";

export const loginUser = async (data) => {
  return axios.post(`${API}/login`, data);
};

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data);
};
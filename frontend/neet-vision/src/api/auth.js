import axios from "axios";

const API = "http://localhost:5000/api/users";

export const loginUser = async (data) => {
  return axios.post(`${API}/login`, data);
};

export const registerUser = async (data) => {
  return axios.post(`${API}/register`, data);
};
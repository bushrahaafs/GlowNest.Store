import axios from 'axios';

const API = `${import.meta.env.VITE_API_BASE_URL}/auth`;

export const registerUser = async (data: { name: string; email: string; password: string }) => {
  const response = await axios.post(`${API}/register`, data);
  return response.data;
};

export const loginUser = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${API}/login`, data);
  return response.data;
};




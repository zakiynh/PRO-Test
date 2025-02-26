import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_BASE_URL;

export const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/auth/login`, { email, password });
  return response.data;
};

export const register = async (fullName, dob, gender, email, password) => {
  const response = await axios.post(`${API_URL}/auth/register`, { fullName, dob, gender, email, password });
  return response;
};

export const logout = async () => {
  const token = Cookies.get("token");
  const response = await axios.post(
    `${API_URL}/auth/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  Cookies.remove("token");
  return response.data;
};
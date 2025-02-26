import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_BASE_URL;

export const getAllUsers = async (query = {}) => {
  const token = Cookies.get('token');
  const response = await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: query
  });

  return response.data;
}

export const getUserById = async () => {
  const token = Cookies.get('token');
  if (!token) return null;
  try {
    const response = await axios.get(`${API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
}

export const getProfile = async () => {
  const token = Cookies.get('token');
  if (!token) return null;
  try {
    const response = await axios.get(`${API_URL}/users/get/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw error;
  }
};

export const updateUser = async (userId, userData) => {
  const token = Cookies.get("token");
  const response = await axios.put(`${API_URL}/users/${userId}`, userData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export const deleteUser = async (userId) => {
  const token = Cookies.get("token");
  try {
    const response = await axios.delete(`${API_URL}/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Delete user error:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "Failed to delete user");
  }
};
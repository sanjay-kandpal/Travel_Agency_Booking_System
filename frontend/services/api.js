import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const createAuthHeader = (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  return {
    Authorization: `Basic ${credentials}`,
    'Content-Type': 'application/json'
  };
};

export const adminService = {
  validateCredentials: (username, password) => {
    return username === 'admin' && password === 'admin123';
  },

  getAllPackages: async (username, password) => {
    try {
      const response = await axios.get(`${API_URL}/admin/packages`, {
        headers: createAuthHeader(username, password)
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  getAllBookings: async (username, password) => {
    try {
      const response = await axios.get(`${API_URL}/admin/bookings`, {
        headers: createAuthHeader(username, password)
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  createPackage: async (packageData, username, password) => {
    try {
      const response = await axios.post(`${API_URL}/admin/packages`, packageData, {
        headers: createAuthHeader(username, password)
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  },

  deletePackage: async (id, username, password) => {
    try {
      const response = await axios.delete(`${API_URL}/admin/packages/${id}`, {
        headers: createAuthHeader(username, password)
      });
      return response;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }
};
// 1. Update services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to create authenticated headers
const createAuthHeader = (username, password) => {
  const credentials = btoa(`${username}:${password}`);
  return {
    Authorization: `Basic ${credentials}`
  };
};

export const adminService = {
  getAllPackages: (username, password) => {
    return axios.get(`${API_URL}/admin/packages`, {
      headers: createAuthHeader(username, password)
    });
  },

  createPackage: (packageData, username, password) => {
    return axios.post(`${API_URL}/admin/packages`, packageData, {
      headers: createAuthHeader(username, password)
    });
  },

  updatePackage: (id, packageData, username, password) => {
    return axios.put(`${API_URL}/admin/packages/${id}`, packageData, {
      headers: createAuthHeader(username, password)
    });
  },

  deletePackage: (id, username, password) => {
    return axios.delete(`${API_URL}/admin/packages/${id}`, {
      headers: createAuthHeader(username, password)
    });
  },

  getAllBookings: (username, password) => {
    return axios.get(`${API_URL}/admin/bookings`, {
      headers: createAuthHeader(username, password)
    });
  }
};
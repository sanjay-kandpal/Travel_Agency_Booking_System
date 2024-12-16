// services/api.js (Updated)
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Helper function to create authenticated axios instance
const createAuthenticatedAxios = (username, password) => {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Basic ${btoa(`${username}:${password}`)}`
    }
  });
};

export const adminService = {
  // Admin package operations
  getAllPackages: (username, password) => {
    const authAxios = createAuthenticatedAxios(username, password);
    return authAxios.get('/admin/packages');
  },

  createPackage: (packageData, username, password) => {
    const authAxios = createAuthenticatedAxios(username, password);
    return authAxios.post('/admin/packages', packageData);
  },

  updatePackage: (id, packageData, username, password) => {
    const authAxios = createAuthenticatedAxios(username, password);
    return authAxios.put(`/admin/packages/${id}`, packageData);
  },

  deletePackage: (id, username, password) => {
    const authAxios = createAuthenticatedAxios(username, password);
    return authAxios.delete(`/admin/packages/${id}`);
  },

  // Admin bookings operations
  getAllBookings: (username, password) => {
    const authAxios = createAuthenticatedAxios(username, password);
    return authAxios.get('/admin/bookings');
  }
};
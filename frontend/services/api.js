import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const packageService = {
  getAllPackages: () => axios.get(`${API_URL}/packages`),
  getPackageById: (id) => axios.get(`${API_URL}/packages/${id}`),
  createPackage: (packageData, username, password) => 
    axios.post(`${API_URL}/packages`, packageData, {
      headers: { username, password }
    }),
  updatePackage: (id, packageData, username, password) => 
    axios.put(`${API_URL}/packages/${id}`, packageData, {
      headers: { username, password }
    }),
  deletePackage: (id, username, password) => 
    axios.delete(`${API_URL}/packages/${id}`, {
      headers: { username, password }
    })
};

export const bookingService = {
  createBooking: (bookingData) => 
    axios.post(`${API_URL}/bookings`, bookingData),
  getAllBookings: () => axios.get(`${API_URL}/bookings`)
};
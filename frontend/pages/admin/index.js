import React, { useState } from 'react';
import { adminService } from '../../services/api';
import { LoginForm } from '../../components/admin/LoginForm';
import { DashboardContent } from '../../components/admin/DashboardContent';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [adminCredentials, setAdminCredentials] = useState(null);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    availableDates: [],
    difficulty: 'Easy',
    maxTravelers: 20
  });

  const handleLogin = async (credentials) => {
    try {
      const packagesResponse = await adminService.getAllPackages(
        credentials.username, 
        credentials.password
      );
      
      const bookingsResponse = await adminService.getAllBookings(
        credentials.username, 
        credentials.password
      );
      
      const packagesData = packagesResponse.data.packages || packagesResponse.data || [];
      setPackages(packagesData);
      setBookings(bookingsResponse.data || []);
      setAdminCredentials(credentials);
      setIsAuthenticated(true);
      setError(null);
    } catch (err) {
      setError('Authentication failed. Check your credentials.');
      setIsAuthenticated(false);
      console.error('Admin login error:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminCredentials(null);
    setPackages([]);
    setBookings([]);
    setError(null);
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await adminService.createPackage(
        newPackage,
        adminCredentials.username,
        adminCredentials.password
      );

      setNewPackage({
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        availableDates: [],
        difficulty: 'Easy',
        maxTravelers: 20
      });

      const packagesResponse = await adminService.getAllPackages(
        adminCredentials.username, 
        adminCredentials.password
      );
      const packagesData = packagesResponse.data.packages || packagesResponse.data || [];
      setPackages(packagesData);
      setError(null);
    } catch (err) {
      setError('Failed to create package. Please check your input and try again.');
      console.error('Package creation error:', err);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await adminService.deletePackage(
        id, 
        adminCredentials.username,
        adminCredentials.password
      );
      const packagesResponse = await adminService.getAllPackages(
        adminCredentials.username, 
        adminCredentials.password
      );
      const packagesData = packagesResponse.data.packages || packagesResponse.data || [];
      setPackages(packagesData);
      setError(null);
    } catch (err) {
      setError('Failed to delete package');
      console.error('Package delete error:', err);
    }
  };

  return isAuthenticated ? (
    <DashboardContent
      onLogout={handleLogout}
      error={error}
      newPackage={newPackage}
      setNewPackage={setNewPackage}
      onCreatePackage={handleCreatePackage}
      packages={packages}
      onDeletePackage={handleDeletePackage}
      bookings={bookings}
    />
  ) : (
    <LoginForm onLogin={handleLogin} error={error} />
  );
}
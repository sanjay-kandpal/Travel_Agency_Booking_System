import React, { useState } from 'react';
import { adminService } from '../../services/api';
import { LoginForm } from '../../components/admin/LoginForm';
import { CreatePackageForm } from '../../components/admin/CreatePackageForm';
import { PackagesList } from '../../components/admin/PackagesList';
import { BookingsList } from '../../components/admin/BookingsList';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [adminCredentials, setAdminCredentials] = useState(null);

  const handleLogin = async (credentials) => {
    try {
      if (adminService.validateCredentials(credentials.username, credentials.password)) {
        const packagesResponse = await adminService.getAllPackages(
          credentials.username,
          credentials.password
        );

        const bookingsResponse = await adminService.getAllBookings(
          credentials.username,
          credentials.password
        );

        setPackages(packagesResponse.data.packages || packagesResponse.data || []);
        setBookings(bookingsResponse.data || []);
        setAdminCredentials(credentials);
        setIsAuthenticated(true);
        setError(null);
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials.');
      console.error('Login error:', err);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminCredentials(null);
    setPackages([]);
    setBookings([]);
    setError(null);
  };

  const handleCreatePackage = async (packageData) => {
    try {
      await adminService.createPackage(
        packageData,
        adminCredentials.username,
        adminCredentials.password
      );

      const packagesResponse = await adminService.getAllPackages(
        adminCredentials.username,
        adminCredentials.password
      );
      setPackages(packagesResponse.data.packages || packagesResponse.data || []);
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
      setPackages(packagesResponse.data.packages || packagesResponse.data || []);
      setError(null);
    } catch (err) {
      setError('Failed to delete package');
      console.error('Package deletion error:', err);
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={handleLogin} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <CreatePackageForm
          onSubmit={handleCreatePackage}
          error={error}
        />

        <PackagesList
          packages={packages}
          onDelete={handleDeletePackage}
        />

        <BookingsList bookings={bookings} />
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { adminService } from '../../services/api';

// Separate LoginForm component
const LoginForm = ({ onLogin, error }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(credentials);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
      
      <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
        <p className="text-sm text-blue-800">
          <strong>Development Credentials:</strong><br />
          Username: admin<br />
          Password: adminpass
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={credentials.username}
              onChange={(e) => setCredentials({
                ...credentials,
                username: e.target.value
              })}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="admin"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({
                ...credentials,
                password: e.target.value
              })}
              className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="adminpass"
              required
            />
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

// Main AdminDashboard component
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
      
      // Extract packages from the paginated response
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

      // Reset form
      setNewPackage({
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        availableDates: [],
        difficulty: 'Easy',
        maxTravelers: 20
      });

      // Refresh package list
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

  const DashboardContent = () => (
    <div className="container mx-auto px-4 py-8">
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
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Create Package Form */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
        <form onSubmit={handleCreatePackage}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Package Title"
              value={newPackage.title}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                title: e.target.value
              })}
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={newPackage.price}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                price: parseFloat(e.target.value)
              })}
              className="border p-2 rounded"
              required
            />
            <textarea
              placeholder="Description"
              value={newPackage.description}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                description: e.target.value
              })}
              className="border p-2 col-span-2 rounded"
              required
            />
            <input
              type="text"
              placeholder="Image URL"
              value={newPackage.imageUrl}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                imageUrl: e.target.value
              })}
              className="border p-2 col-span-2 rounded"
              required
            />
            <select
              value={newPackage.difficulty}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                difficulty: e.target.value
              })}
              className="border p-2 rounded"
            >
              <option value="Easy">Easy</option>
              <option value="Moderate">Moderate</option>
              <option value="Challenging">Challenging</option>
            </select>
            <input
              type="number"
              placeholder="Max Travelers"
              value={newPackage.maxTravelers}
              onChange={(e) => setNewPackage({
                ...newPackage, 
                maxTravelers: parseInt(e.target.value)
              })}
              className="border p-2 rounded"
              required
            />
          </div>
          <button 
            type="submit" 
            className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Create Package
          </button>
        </form>
      </div>

      {/* Packages List */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
        {packages.length === 0 ? (
          <p className="text-gray-500 text-center">No packages available. Create one above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {packages.map(pkg => (
              <div key={pkg._id} className="border p-4 rounded shadow">
                <img 
                  src={pkg.imageUrl} 
                  alt={pkg.title}
                  className="w-full h-48 object-cover rounded mb-4"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                <h3 className="font-bold text-lg">{pkg.title}</h3>
                <p className="text-gray-600 mb-2">${pkg.price}</p>
                <p className="text-sm text-gray-500 mb-2">Difficulty: {pkg.difficulty}</p>
                <p className="text-sm text-gray-500 mb-2">Max Travelers: {pkg.maxTravelers}</p>
                <button
                  onClick={() => handleDeletePackage(pkg._id)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bookings List */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500 text-center">No bookings available yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border p-2 text-left">Customer Name</th>
                  <th className="border p-2 text-left">Package</th>
                  <th className="border p-2 text-center">Travelers</th>
                  <th className="border p-2 text-right">Total Price</th>
                  <th className="border p-2 text-center">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking._id}>
                    <td className="border p-2">{booking.customerName}</td>
                    <td className="border p-2">
                      {booking.packageId ? booking.packageId.title : 'N/A'}
                    </td>
                    <td className="border p-2 text-center">{booking.numberOfTravelers}</td>
                    <td className="border p-2 text-right">${booking.totalPrice}</td>
                    <td className="border p-2 text-center">
                      <span className={`px-2 py-1 rounded ${
                        booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );

  return isAuthenticated ? <DashboardContent /> : <LoginForm onLogin={handleLogin} error={error} />;
}
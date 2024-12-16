import React, { useState, useEffect } from 'react';
import { adminService  } from '../../services/api';


export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [editingPackage, setEditingPackage] = useState(null);

  const fetchAdminData = async () => {
    try {
      // Fetch packages
      const packagesResponse = await adminService.getAllPackages(
        credentials.username, 
        credentials.password
      );
      
      // Fetch bookings
      const bookingsResponse = await adminService.getAllBookings(
        credentials.username, 
        credentials.password
      );
      
      setPackages(packagesResponse.data);
      setBookings(bookingsResponse.data);
      setError(null);
    } catch (err) {
      setError('Authentication failed. Check your credentials.');
      console.error('Admin data fetch error:', err);
    }
  };

  const handleCreateOrUpdatePackage = async (e) => {
    e.preventDefault();
    try {
      const packageData = editingPackage || {
        title: '',
        description: '',
        price: 0,
        imageUrl: '',
        availableDates: [],
        difficulty: 'Easy',
        maxTravelers: 20
      };

      let response;
      if (packageData._id) {
        // Update existing package
        response = await adminService.updatePackage(
          packageData._id,
          packageData,
          credentials.username,
          credentials.password
        );
      } else {
        // Create new package
        response = await adminService.createPackage(
          packageData,
          credentials.username,
          credentials.password
        );
      }

      // Refresh data
      fetchAdminData();
      
      // Reset editing state
      setEditingPackage(null);
    } catch (err) {
      setError('Failed to create/update package');
      console.error('Package operation error:', err);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await adminService.deletePackage(
        id, 
        credentials.username, 
        credentials.password
      );
      fetchAdminData();
    } catch (err) {
      setError('Failed to delete package');
      console.error('Package delete error:', err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Authentication Section */}
      <div className="mb-6 flex items-center">
        <input
          type="text"
          placeholder="Admin Username"
          value={credentials.username}
          onChange={(e) => setCredentials({
            ...credentials, 
            username: e.target.value
          })}
          className="border p-2 mr-2"
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={credentials.password}
          onChange={(e) => setCredentials({
            ...credentials, 
            password: e.target.value
          })}
          className="border p-2 mr-2"
        />
        <button
          onClick={fetchAdminData}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </div>

      {/* Create Package Form */}
      <form onSubmit={handleCreatePackage} className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Package Title"
            value={newPackage.title}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              title: e.target.value
            })}
            className="border p-2"
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
            className="border p-2"
            required
          />
          <textarea
            placeholder="Description"
            value={newPackage.description}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              description: e.target.value
            })}
            className="border p-2 col-span-2"
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
            className="border p-2 col-span-2"
            required
          />
          <select
            value={newPackage.difficulty}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              difficulty: e.target.value
            })}
            className="border p-2"
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
            className="border p-2"
          />
        </div>
        <button 
          type="submit" 
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Create Package
        </button>
      </form>

      {/* Packages List */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <div key={pkg._id} className="border p-4 rounded">
              <h3 className="font-bold">{pkg.title}</h3>
              <p>${pkg.price}</p>
              <button
                onClick={() => handleDeletePackage(pkg._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Bookings</h2>
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Package</th>
              <th className="border p-2">Travelers</th>
              <th className="border p-2">Total Price</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking._id}>
                <td className="border p-2">{booking.customerName}</td>
                <td className="border p-2">
                  {booking.packageId ? booking.packageId.title : 'N/A'}
                </td>
                <td className="border p-2">{booking.numberOfTravelers}</td>
                <td className="border p-2">${booking.totalPrice}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
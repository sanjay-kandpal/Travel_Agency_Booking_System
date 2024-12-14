import React, { useState, useEffect } from 'react';
import { packageService, bookingService } from '../../services/api';

export default function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [newPackage, setNewPackage] = useState({
    title: '',
    description: '',
    price: 0,
    imageUrl: '',
    availableDates: [],
    difficulty: 'Easy',
    maxTravelers: 20
  });
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const fetchData = async () => {
    try {
      const packagesResponse = await packageService.getAllPackages();
      const bookingsResponse = await bookingService.getAllBookings();
      setPackages(packagesResponse.data);
      setBookings(bookingsResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const handleCreatePackage = async (e) => {
    e.preventDefault();
    try {
      await packageService.createPackage(
        newPackage, 
        credentials.username, 
        credentials.password
      );
      fetchData();
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
    } catch (error) {
      console.error('Failed to create package:', error);
    }
  };

  const handleDeletePackage = async (id) => {
    try {
      await packageService.deletePackage(
        id, 
        credentials.username, 
        credentials.password
      );
      fetchData();
    } catch (error) {
      console.error('Failed to delete package:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* Admin Credentials */}
      <div className="mb-6">
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
          className="border p-2"
        />
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
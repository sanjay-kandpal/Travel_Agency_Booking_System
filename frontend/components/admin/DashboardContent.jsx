import React from 'react';
import { CreatePackageForm } from './CreatePackageForm';
import { PackagesList } from './PackagesList';
import { BookingsList } from './BookingsList';

export const DashboardContent = ({ 
  onLogout, 
  error,
  newPackage,
  setNewPackage,
  onCreatePackage,
  packages,
  onDeletePackage,
  bookings 
}) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={onLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      <CreatePackageForm
        newPackage={newPackage}
        setNewPackage={setNewPackage}
        onSubmit={onCreatePackage}
        error={error}
      />
      
      <PackagesList
        packages={packages}
        onDelete={onDeletePackage}
      />
      
      <BookingsList bookings={bookings} />
    </div>
  );
};
import React from 'react';

export const PackagesList = ({ packages, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
      {packages.length === 0 ? (
        <p className="text-gray-500 text-center">No packages available. Create one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map(pkg => (
            <PackageCard key={pkg._id} package={pkg} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  );
};
import React from 'react';

export const PackageCard = ({ package: pkg, onDelete }) => {
  return (
    <div className="border p-4 rounded shadow">
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
        onClick={() => onDelete(pkg._id)}
        className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
      >
        Delete
      </button>
    </div>
  );
};
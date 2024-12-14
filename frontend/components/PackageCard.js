import React from 'react';
import Link from 'next/link';

const PackageCard = ({ _id, title, description, price, imageUrl }) => {
  return (
    <div className="border rounded-lg overflow-hidden shadow-lg">
      <img 
        src={imageUrl} 
        alt={title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold">${price} per person</span>
          <Link 
            href={`/packages/${_id}`} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
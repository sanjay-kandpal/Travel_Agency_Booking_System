import React, { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';
import { packageService } from '../services/api';

export default function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await packageService.getAllPackages();
        setPackages(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading packages...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Our Tour Packages</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <PackageCard key={pkg._id} {...pkg} />
        ))}
      </div>
    </div>
  );
}
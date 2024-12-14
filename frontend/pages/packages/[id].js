import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { packageService } from '../../services/api';
import BookingForm from '../../components/BookingForm';

export default function PackageDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!id) return;

      try {
        const response = await packageService.getPackageById(id);
        setPkg(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch package details:', error);
        setLoading(false);
      }
    };

    fetchPackageDetails();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading package details...</div>;
  }

  if (!pkg) {
    return <div className="text-center py-10">Package not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <img 
            src={pkg.imageUrl} 
            alt={pkg.title} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{pkg.title}</h1>
          <p className="text-gray-700 mb-4">{pkg.description}</p>
          <div className="mb-4">
            <strong>Price:</strong> ${pkg.price} per person
          </div>
          <div className="mb-4">
            <strong>Available Dates:</strong>
            <ul>
              {pkg.availableDates.map((date, index) => (
                <li key={index}>{new Date(date).toLocaleDateString()}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <strong>Difficulty:</strong> {pkg.difficulty}
            <strong className="ml-4">Max Travelers:</strong> {pkg.maxTravelers}
          </div>
          <BookingForm packageId={pkg._id} price={pkg.price} />
        </div>
      </div>
    </div>
  );
}

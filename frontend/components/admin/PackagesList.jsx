export const PackagesList = ({ packages, onDelete }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Existing Packages</h2>
      {packages.length === 0 ? (
        <p className="text-gray-500 text-center">No packages available. Create one above.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg) => (
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
                onClick={() => onDelete(pkg._id)}
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
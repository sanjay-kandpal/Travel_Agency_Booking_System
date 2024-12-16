import { useState, useEffect } from "react";
import PackageCard from "../components/PackageCard";
import axios from "axios";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/packages?page=${currentPage}`);
        console.log('API Response:', response.data);
        
        // Extract packages array from the response
        const { packages: packagesData, totalPages: total } = response.data;
        
        setPackages(packagesData || []);
        setTotalPages(total);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch packages:', error);
        setError('Failed to load packages. Please try again later.');
        setLoading(false);
      }
    };

    fetchPackages();
  }, [currentPage]);

  const filteredPackages = Array.isArray(packages) ? packages
    .filter(pkg => 
      pkg?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(pkg => {
      switch(priceFilter) {
        case 'low':
          return pkg.price <= 500;
        case 'medium':
          return pkg.price > 500 && pkg.price <= 1000;
        case 'high':
          return pkg.price > 1000;
        default:
          return true;
      }
    }) : [];

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading packages...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error! </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Available Travel Packages</h1>
      
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Prices</option>
          <option value="low">Under $500</option>
          <option value="medium">$500 - $1000</option>
          <option value="high">Above $1000</option>
        </select>
      </div>

      {filteredPackages.length === 0 ? (
        <div className="text-center text-gray-600 py-8">
          <p>No packages found matching your criteria.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPackages.map(pkg => (
              <PackageCard key={pkg._id} {...pkg} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 space-x-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1 
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Previous
              </button>
              <span className="px-4 py-2">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-blue-500 text-white hover:bg-blue-600'
                }`}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
import { useState } from "react";
const Home = () => {
  
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState('all');

  const filteredPackages = packages
    .filter(pkg => 
      pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border rounded"
        />
        
        <select
          value={priceFilter}
          onChange={(e) => setPriceFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="all">All Prices</option>
          <option value="low">Under $500</option>
          <option value="medium">$500 - $1000</option>
          <option value="high">Above $1000</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map(pkg => (
          <PackageCard key={pkg._id} {...pkg} />
        ))}
      </div>
    </div>
  );
};

export default Home;
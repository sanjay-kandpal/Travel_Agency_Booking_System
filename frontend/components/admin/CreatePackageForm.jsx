// components/admin/CreatePackageForm.jsx
import { useState } from "react";
export const CreatePackageForm = ({ onSubmit, error }) => {
  const [packageData, setPackageData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    difficulty: 'Easy',
    maxTravelers: '20'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...packageData,
      price: parseFloat(packageData.price),
      maxTravelers: parseInt(packageData.maxTravelers),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Package Title"
            value={packageData.title}
            onChange={(e) => setPackageData({ ...packageData, title: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={packageData.price}
            onChange={(e) => setPackageData({ ...packageData, price: e.target.value })}
            className="border p-2 rounded"
            required
            min="0"
          />
          <textarea
            placeholder="Description"
            value={packageData.description}
            onChange={(e) => setPackageData({ ...packageData, description: e.target.value })}
            className="border p-2 col-span-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={packageData.imageUrl}
            onChange={(e) => setPackageData({ ...packageData, imageUrl: e.target.value })}
            className="border p-2 col-span-2 rounded"
            required
          />
          <select
            value={packageData.difficulty}
            onChange={(e) => setPackageData({ ...packageData, difficulty: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
          <input
            type="number"
            placeholder="Max Travelers"
            value={packageData.maxTravelers}
            onChange={(e) => setPackageData({ ...packageData, maxTravelers: e.target.value })}
            className="border p-2 rounded"
            required
            min="1"
          />
        </div>
        {error && (
          <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        <button 
          type="submit" 
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Package
        </button>
      </form>
    </div>
  );
};
import React from 'react';

export const CreatePackageForm = ({ newPackage, setNewPackage, onSubmit, error }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
      <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Package Title"
            value={newPackage.title}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              title: e.target.value
            })}
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newPackage.price}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              price: parseFloat(e.target.value)
            })}
            className="border p-2 rounded"
            required
          />
          <textarea
            placeholder="Description"
            value={newPackage.description}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              description: e.target.value
            })}
            className="border p-2 col-span-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={newPackage.imageUrl}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              imageUrl: e.target.value
            })}
            className="border p-2 col-span-2 rounded"
            required
          />
          <select
            value={newPackage.difficulty}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              difficulty: e.target.value
            })}
            className="border p-2 rounded"
          >
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Challenging">Challenging</option>
          </select>
          <input
            type="number"
            placeholder="Max Travelers"
            value={newPackage.maxTravelers}
            onChange={(e) => setNewPackage({
              ...newPackage, 
              maxTravelers: parseInt(e.target.value)
            })}
            className="border p-2 rounded"
            required
          />
        </div>
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
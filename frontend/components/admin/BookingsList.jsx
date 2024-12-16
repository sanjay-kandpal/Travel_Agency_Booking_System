import React from 'react';

export const BookingsList = ({ bookings }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      {bookings.length === 0 ? (
        <p className="text-gray-500 text-center">No bookings available yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-50">
                <th className="border p-2 text-left">Customer Name</th>
                <th className="border p-2 text-left">Package</th>
                <th className="border p-2 text-center">Travelers</th>
                <th className="border p-2 text-right">Total Price</th>
                <th className="border p-2 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(booking => (
                <BookingRow key={booking._id} booking={booking} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
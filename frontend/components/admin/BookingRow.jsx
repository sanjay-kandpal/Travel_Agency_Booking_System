import React from 'react';

export const BookingRow = ({ booking }) => {
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <tr>
      <td className="border p-2">{booking.customerName}</td>
      <td className="border p-2">
        {booking.packageId ? booking.packageId.title : 'N/A'}
      </td>
      <td className="border p-2 text-center">{booking.numberOfTravelers}</td>
      <td className="border p-2 text-right">${booking.totalPrice}</td>
      <td className="border p-2 text-center">
        <span className={`px-2 py-1 rounded ${getStatusStyle(booking.status)}`}>
          {booking.status}
        </span>
      </td>
    </tr>
  );
};
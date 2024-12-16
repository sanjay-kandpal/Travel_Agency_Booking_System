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
              {bookings.map((booking) => (
                <tr key={booking._id}>
                  <td className="border p-2">{booking.customerName}</td>
                  <td className="border p-2">
                    {booking.packageId ? booking.packageId.title : 'N/A'}
                  </td>
                  <td className="border p-2 text-center">{booking.numberOfTravelers}</td>
                  <td className="border p-2 text-right">${booking.totalPrice}</td>
                  <td className="border p-2 text-center">
                    <span className={`px-2 py-1 rounded ${
                      booking.status === 'Confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'Cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
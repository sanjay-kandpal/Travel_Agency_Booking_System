import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { bookingService } from '../services/api';

const bookingSchema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(10, 'Phone number is required'),
  numberOfTravelers: z.number().min(1).max(10),
  specialRequests: z.string().optional()
});

const BookingForm = ({ packageDetails, packageId, price }) => {
  const [bookingStatus, setBookingStatus] = useState(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(bookingSchema)
  });

  const onSubmit = async (data) => {
    try {
      const bookingData = {
        ...data,
        packageId,
        totalPrice: data.numberOfTravelers * price
      };
      
      const response = await bookingService.createBooking(bookingData);
      setBookingStatus('Booking successful!');
      setBookingData({
        ...response.data,
        packageDetails
      });
      setShowInvoice(true);
    } catch (error) {
      setBookingStatus('Booking failed. Please try again.');
    }
  };

  if (showInvoice) {
    return (
      <div className="border p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Booking Invoice</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold">Customer Details</h3>
            <p>Name: {bookingData.customerName}</p>
            <p>Email: {bookingData.email}</p>
            <p>Phone: {bookingData.phoneNumber}</p>
          </div>
          <div>
            <h3 className="font-semibold">Package Details</h3>
            <p>Package: {packageDetails.title}</p>
            <p>Price per person: ${price}</p>
            <p>Number of travelers: {bookingData.numberOfTravelers}</p>
          </div>
          <div>
            <h3 className="font-semibold">Total Amount</h3>
            <p className="text-xl">${bookingData.totalPrice}</p>
          </div>
          <button 
            onClick={() => window.print()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Print Invoice
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block mb-1">Name</label>
        <input 
          {...register('customerName')}
          className="w-full border p-2 rounded"
        />
        {errors.customerName && 
          <p className="text-red-500">{errors.customerName.message}</p>
        }
      </div>
      
      <div>
        <label className="block mb-1">Email</label>
        <input 
          type="email"
          {...register('email')}
          className="w-full border p-2 rounded"
        />
        {errors.email && 
          <p className="text-red-500">{errors.email.message}</p>
        }
      </div>

      <div>
        <label className="block mb-1">Phone Number</label>
        <input 
          {...register('phoneNumber')}
          className="w-full border p-2 rounded"
        />
        {errors.phoneNumber && 
          <p className="text-red-500">{errors.phoneNumber.message}</p>
        }
      </div>

      <div>
        <label className="block mb-1">Number of Travelers</label>
        <input 
          type="number"
          {...register('numberOfTravelers', { valueAsNumber: true })}
          className="w-full border p-2 rounded"
          min="1"
          max="10"
        />
        {errors.numberOfTravelers && 
          <p className="text-red-500">{errors.numberOfTravelers.message}</p>
        }
      </div>

      <div>
        <label className="block mb-1">Special Requests (Optional)</label>
        <textarea 
          {...register('specialRequests')}
          className="w-full border p-2 rounded"
          rows="3"
        />
      </div>

      <button 
        type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        Book Now
      </button>
      
      {bookingStatus && 
        <p className={bookingStatus.includes('failed') ? 'text-red-500' : 'text-green-500'}>
          {bookingStatus}
        </p>
      }
    </form>
  );
};

export default BookingForm;

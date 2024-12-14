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

const BookingForm = ({ packageId, price }) => {
  const [bookingStatus, setBookingStatus] = useState(null);
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
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
    } catch (error) {
      setBookingStatus('Booking failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Form fields with error handling */}
      <div>
        <label>Name</label>
        <input 
          {...register('customerName')}
          className="w-full border p-2"
        />
        {errors.customerName && <p>{errors.customerName.message}</p>}
      </div>
      {/* Similar fields for email, phone, travelers, etc. */}
      <button 
        type="submit" 
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Book Now
      </button>
      {bookingStatus && <p>{bookingStatus}</p>}
    </form>
  );
};

export default BookingForm;

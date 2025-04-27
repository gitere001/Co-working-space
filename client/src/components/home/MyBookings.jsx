import React from 'react';

import { Calendar } from 'lucide-react';
import BookingCard from './BookingCard';

const MyBookings = ({ bookings, onViewDetails, onCancelBooking, onPayNow }) => {
  // Filter active bookings (not cancelled)
  const activeBookings = bookings.filter(booking => booking.status !== 'cancelled');

  return (
    <div className="mb-10 animate-fadeIn">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Calendar className="mr-2 text-blue-500" size={20} />
        My Bookings
      </h2>
      {bookings.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">You don't have any bookings yet.</p>
        </div>
      ) : activeBookings.length === 0 ? (
        <div className="p-6 bg-gray-50 rounded-lg text-center">
          <p className="text-gray-600">You don't have any active bookings.</p>
        </div>
      ) : (
        <div className="space-y-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onViewDetails={onViewDetails}
              onCancelBooking={onCancelBooking}
              onPayNow={onPayNow}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

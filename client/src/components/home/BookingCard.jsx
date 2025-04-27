import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

import Badge from '../../ui/Badge';

import HomeButton from '../../ui/HomeButton';
import { formatDate } from '../../utils/formatDate';


const BookingCard = ({ booking, onViewDetails, onCancelBooking, onPayNow }) => {



  const getStatusVariant = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      default:
        return 'default';
    }
  };

  return (
    <div className="p-4 mb-4 bg-white rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{booking.workspaceName}</h3>
          <div className="mt-2 space-y-1">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2 text-blue-500" />
              <span>
                {formatDate(booking.startDate)} - {formatDate(booking.endDate)}
              </span>
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Badge variant={getStatusVariant(booking.status)}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
        {booking.status !== 'confirmed' && <HomeButton
          variant="primary"
          size="sm"
          onClick={() => onPayNow(booking.id, booking.workspaceName)}
        >
          Pay Now
        </HomeButton>}
        <HomeButton
          variant="primary"
          size="sm"
          onClick={() => onViewDetails(booking.id)}
        >
          View Details
        </HomeButton>
        {booking.status !== 'confirmed' && (
          <HomeButton
            variant="danger"
            size="sm"
            onClick={() => onCancelBooking(booking.id, booking.workspaceName)}
          >
            Cancel Booking
          </HomeButton>
        )}
      </div>
    </div>
  );
};

export default BookingCard;

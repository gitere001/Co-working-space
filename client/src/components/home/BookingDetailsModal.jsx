import React from "react";
import { Calendar, MapPin, CheckCircle, Info } from "lucide-react";
import Modal from "../../ui/Modal";
import Badge from "../../ui/Badge";

import HomeButton from "../../ui/HomeButton";
import { formatDate } from "../../utils/formatDate";

const BookingDetailsModal = ({ isOpen, onClose, booking, onCancelBooking, onPayNow }) => {
  if (!booking) return null;

  const getStatusVariant = (status) => {
    switch (status) {
      case "confirmed":
        return "success";
      case "pending":
        return "warning";
      case "cancelled":
        return "danger";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle size={16} className="mr-1 text-green-500" />;
      case "pending":
        return <Info size={16} className="mr-1 text-yellow-500" />;
      default:
        return null;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Booking Details">
      <div>
        <div className="mb-4">
          <h3 className="font-medium text-gray-900 text-lg">
            {booking.workspaceName}
          </h3>
          <div className="mt-2 flex items-center">
            <Badge variant={getStatusVariant(booking.status)}>
              {getStatusIcon(booking.status)}
              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
            </Badge>
          </div>
        </div>

        <div className="mb-6 space-y-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-start">
            <Calendar
              size={18}
              className="mr-3 text-blue-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <div className="text-sm font-medium text-gray-700">
                Booking Period
              </div>
              <div className="text-sm text-gray-600 mt-1">
                {formatDate(booking.startDate)} to {formatDate(booking.endDate)}
              </div>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin
              size={18}
              className="mr-3 text-blue-500 flex-shrink-0 mt-0.5"
            />
            <div>
              <div className="text-sm font-medium text-gray-700">Workspace</div>
              <div className="text-sm text-gray-600 mt-1">
                {booking.workspaceName}
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="text-sm font-medium text-gray-700 mb-1">
            Booking Reference
          </div>
          <div className="text-sm bg-gray-100 p-2 rounded font-mono">
            {booking.id}
          </div>
        </div>

        {booking.status !== "cancelled" && (
          <div className="flex justify-end gap-4">
            {booking.status !== "confirmed" && (
              <HomeButton
              onClick={()=> onPayNow(booking.id, booking.workspaceName)}
               type="button" variant="primary">
                Pay Now
              </HomeButton>
            )}
            {booking.status !== "confirmed" && (
              <HomeButton
                variant="danger"
                onClick={() => {
                  onCancelBooking(booking.id, booking.workspaceName);
                  onClose();
                }}
              >
                Cancel Booking
              </HomeButton>
            )}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BookingDetailsModal;

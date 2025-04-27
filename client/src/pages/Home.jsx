import React, { useState } from 'react';


import { mockBookings, mockWorkspaces, currentUser } from '../data/mockData';
import Greeting from '../components/home/Greeting';
import MyBookings from '../components/home/MyBookings';
import AvailableWorkspaces from '../components/home/AvailableWorkspaces';
import BookingModal from '../components/home/BookingModal';
import BookingDetailsModal from '../components/home/BookingDetailsModal';
import { useDispatch } from 'react-redux';
import { hideOverlay, showOverlay } from '../features/overlay/overlaySlice';
import scrollToTop from '../utils/scrollTop';

const Toast = ({ toast, onClose }) => {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3000);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      className={`${
        toast.type === 'success' ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
      } border-l-4 p-4 rounded shadow-md animate-slideIn`}
    >
      <div className="flex justify-between items-center">
        <p className={`text-sm ${
          toast.type === 'success' ? 'text-green-700' : 'text-red-700'
        }`}>
          {toast.message}
        </p>
        <button
          onClick={() => onClose(toast.id)}
          className="text-gray-400 hover:text-gray-600"
        >
          X
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const dispatch = useDispatch()
  const [bookings, setBookings] = useState(mockBookings);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type) => {
    const newToast = {
      message,
      type,
      id: Date.now().toString(),
    };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleBookNow = (workspaceId) => {
    const workspace = mockWorkspaces.find((ws) => ws.id === workspaceId);
    if (workspace) {
      setSelectedWorkspace(workspace);
      setBookingModalOpen(true);
      dispatch(showOverlay())
    }
  };

  const handleViewDetails = (bookingId) => {
    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      setSelectedBooking(booking);
      setDetailsModalOpen(true);
      dispatch(showOverlay())

    }
  };

  const handleCancelBooking = (bookingId, bookingName) => {
    const isConfirmed = window.confirm(`Are you sure you want to cancel the booking for ${bookingName}?`);
    if (isConfirmed) {
      setBookings((prev) => prev.filter((booking) => booking.id !== bookingId));
      addToast(`Booking for ${bookingName} cancelled successfully`, 'success');
      scrollToTop()
    }
  };

  const handlePayNow = (bookingId, bookingName) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking.id === bookingId ? { ...booking, status: 'confirmed' } : booking
      )
    );
    if (selectedBooking && selectedBooking.id === bookingId) {
      setSelectedBooking((prev) => ({ ...prev, status: 'confirmed' }));
    }
    addToast(`Payment for ${bookingName} successful! Booking confirmed.`, 'success');
    setTimeout(() => {
      dispatch(hideOverlay());
      setDetailsModalOpen(false);
      scrollToTop()
    }, 3000);
  };


  const handleConfirmBooking = (workspaceId, startDate, endDate) => {
    const workspace = mockWorkspaces.find((ws) => ws.id === workspaceId);
    if (workspace) {
      const newBooking = {
        id: `booking-${Date.now()}`,
        workspaceId,
        workspaceName: workspace.name,
        startDate,
        endDate,
        status: 'pending',
      };
      setBookings((prev) => [...prev, newBooking]);
      setBookingModalOpen(false);
      dispatch(hideOverlay())
      scrollToTop()
      addToast('Workspace booked successfully!', 'success');
    }
  };



  return (
    <div className="container mx-auto px-4 py-8 mt-[70px]">
      <Greeting  />

      <div className="space-y-10">
        <MyBookings
          bookings={bookings}
          onViewDetails={handleViewDetails}
          onCancelBooking={handleCancelBooking}
          onPayNow={handlePayNow}
        />

        <AvailableWorkspaces
          workspaces={mockWorkspaces}
          onBookNow={handleBookNow}
        />
      </div>

      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => {setBookingModalOpen(false); dispatch(hideOverlay())}}
        workspace={selectedWorkspace}
        onConfirmBooking={handleConfirmBooking}
      />

      <BookingDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => {setDetailsModalOpen(false); dispatch(hideOverlay())}}
        booking={selectedBooking}
        onCancelBooking={handleCancelBooking}
        onPayNow={handlePayNow}
      />

      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

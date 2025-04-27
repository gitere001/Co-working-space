import React, { useState } from 'react';
import { Calendar, Check } from 'lucide-react';
import Modal from '../../ui/Modal';
import HomeButton from '../../ui/HomeButton';
import { useDispatch } from 'react-redux';
import { hideOverlay } from '../../features/overlay/overlaySlice';


const BookingModal = ({ isOpen, onClose, workspace, onConfirmBooking }) => {
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split('T')[0]
  );
  const dispatch = useDispatch()

  const [endDate, setEndDate] = useState(
    new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (workspace) {
      onConfirmBooking(workspace.id, startDate, endDate);
    }
  };

  if (!workspace) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Book ${workspace.name}`}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h3 className="font-medium text-gray-900">{workspace.name}</h3>
          <p className="text-sm text-gray-600 mt-1">{workspace.description}</p>
          <div className="mt-2">
            <span className="text-lg font-bold text-blue-600">{workspace.price}</span>
            <span className="text-gray-600 text-sm"> / {workspace.billingPeriod}</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium text-gray-700 mb-2">Features</div>
          <ul className="space-y-1 bg-gray-50 p-3 rounded-md">
            {workspace.features.map((feature, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <Check size={16} className="mr-2 text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-4">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar size={16} className="text-gray-500" />
            </div>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Calendar size={16} className="text-gray-500" />
            </div>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="pl-10 block w-full rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              required
              min={startDate}
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <HomeButton
            type="button"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </HomeButton>
          <HomeButton
          
            type="submit"
            variant="primary"
          >
            Confirm Booking
          </HomeButton>
        </div>
      </form>
    </Modal>
  );
};

export default BookingModal;

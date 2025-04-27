// import {  useDispatch } from 'react-redux';


import { X } from 'lucide-react';
import axios from 'axios';
// import { getNotifications } from '../features/notification/fetchNotificationSlice';

const apiUrl = import.meta.env.VITE_API_URL;

const NotificationsPage = () => {
  // const dispatch = useDispatch();
  const notifications = []
  const loading = false
  const error = false
//   const { notifications, loading, error } = useSelector((state) => state.notification);




  const markAsRead = async (id) => {
    try {
      await axios.patch(`${apiUrl}/api/v1/notification/${id}/read`, {}, {
        withCredentials: true,
      });
      // dispatch(getNotifications()); // Refresh state
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      await axios.patch(`${apiUrl}/api/v1/notification/read`, {}, {
        withCredentials: true,
      });
      // dispatch(getNotifications());
    } catch (error) {
      console.error('Error marking all notifications as read:', error);
    }
  };

  const deleteNotification = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/v1/notification/${id}`, {
        withCredentials: true,
      });
      // dispatch(getNotifications());
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  };

  return (
    <div className="min-h-screen mt-[70px] p-4 md:p-6 bg-[#F5F7FA]">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#333333]">Notifications</h1>
          {notifications.length > 0 && <button
            onClick={markAllAsRead}
            className="text-sm text-[#0069AA] hover:underline"
          >
            Mark all as read
          </button>}
        </div>

        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-10">
              <p className="text-gray-500">Loading notifications...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <p className="text-red-500">Failed to load notifications</p>
            </div>
          ) : notifications?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500">No notifications available</p>
            </div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification._id}
                className={`p-4 rounded-lg border ${
                  !notification.read ? 'border-[#0069AA] bg-blue-50' : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    {notification.type === 'certificate' && (
                      <div className="p-2 rounded-full bg-[#0069AA]/10 text-[#0069AA]"></div>
                    )}
                    {notification.type === 'course' && (
                      <div className="p-2 rounded-full bg-green-500/10 text-green-500"></div>
                    )}
                    {notification.type === 'payment' && (
                      <div className="p-2 rounded-full bg-purple-500/10 text-purple-500"></div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-medium text-[#333333]">{notification.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification._id)}
                        className="text-gray-400 hover:text-[#0069AA]"
                        title="Mark as read"
                      >
                        Mark as Read
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notification._id)}
                      className="text-gray-400 hover:text-[#E32726]"
                      title="Delete"
                    >
                      <X size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
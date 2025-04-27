import React from 'react';
import { useSelector } from 'react-redux';

const Greeting = () => {
  const {  user } = useSelector(
    (state) => state.authorization
  );
  // console.log("user: ", user );
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  if (!user) return null;
  return (
    <div className="mb-8 animate-fadeIn">
      <h1 className="text-2xl font-bold md:text-3xl text-gray-900">
        {getGreeting()}, {user.firstName}!
      </h1>
      <p className="mt-2 text-gray-600">
        Welcome to your workspace dashboard. Here's an overview of your bookings and available spaces.
      </p>
    </div>
  );
};

export default Greeting;

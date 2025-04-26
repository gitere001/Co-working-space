import React from 'react';
import AuthLayout from '../components/authComponents/AuthLayout';
import SignupForm from '../components/authComponents/SignupForm';


const Signup = () => {
  return (
    <AuthLayout
      title="Create a new account"
      description="Join us to discover and book the perfect coworking space!"
    >
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;

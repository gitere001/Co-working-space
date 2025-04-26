import React from 'react';
import AuthLayout from '../components/authComponents/AuthLayout';
import LoginForm from '../components/authComponents/LoginForm';


const Login = () => {
  return (
    <AuthLayout
      title="Sign in to your account"
      description="Welcome back! Please enter your details to access your account."
    >
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyRound } from 'lucide-react';
import AuthLayout from '../components/authComponents/AuthLayout';
import Button from '../ui/Button';
import FormInput from '../ui/FormInput';


const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    if (!email) {
      setError('Email is required');
      return false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Email is invalid');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log('Password reset requested for:', email);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Password reset request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <AuthLayout
        title="Check your email"
        description="We've sent a password reset link to your email address."
      >
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm text-gray-600 mb-6">
            If you don't see it, please check your spam folder or try again.
          </p>
          <Button
            variant="primary"
            onClick={() => setIsSubmitted(false)}
          >
            Try again
          </Button>
          <div className="mt-4">
            <Link
              to="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              Back to sign in
            </Link>
          </div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset your password"
      description="Enter your email address and we'll send you a link to reset your password."
    >
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-3">
          <KeyRound size={32} className="text-blue-600" />
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <FormInput
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError('');
          }}
          error={error}
          required
        />

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isLoading}
          className="transition-all duration-200"
        >
          Send reset link
        </Button>

        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;

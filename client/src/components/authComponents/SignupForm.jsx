import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import registerUser from "../../utils/registerUser";
import scrollToTop from "../../utils/scrollTop";
import Feedback from "../Feedback";

const SignupForm = () => {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formValues.firstName) {
      errors.firstName = "First name is required";
      isValid = false;
    }

    if (!formValues.lastName) {
      errors.lastName = "Last name is required";
      isValid = false;
    }

    if (!formValues.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
      errors.email = "Email is invalid";
      isValid = false;
    }

    if (!formValues.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (formValues.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const signupResult = await registerUser(formValues);

      if (signupResult.success) {
        setMessage("Successfully Registered");
        setError(null);
        setTimeout(() => {
          setMessage(null);
          navigate("/login");
          scrollToTop();
        }, 2000);
      } else {
        setMessage(null);
        setError(signupResult.message);
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (error) {
      console.log("signup error:", error);
      setMessage(null);
      setError("An error occurred during signup.");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };


  console.log("Error state:", error);
console.log("Message state:", message);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {error && <Feedback isSuccess={false} message={error} />}
      {message && <Feedback isSuccess={true} message={message} />}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-3">
          <UserPlus size={32} className="text-blue-600" />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormInput
          id="firstName"
          name="firstName"
          type="text"
          label="First name"
          autoComplete="given-name"
          value={formValues.firstName}
          onChange={handleChange}
          error={formErrors.firstName}
          required
        />
        <FormInput
          id="lastName"
          name="lastName"
          type="text"
          label="Last name"
          autoComplete="family-name"
          value={formValues.lastName}
          onChange={handleChange}
          error={formErrors.lastName}
          required
        />
      </div>

      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email address"
        autoComplete="email"
        value={formValues.email}
        onChange={handleChange}
        error={formErrors.email}
        required
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        label="Password"
        autoComplete="new-password"
        value={formValues.password}
        onChange={handleChange}
        error={formErrors.password}
        required
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        className="transition-all duration-200 transform hover:translate-y-[-2px]"
      >
        Create account
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default SignupForm;

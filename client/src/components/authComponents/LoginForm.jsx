import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import FormInput from "../../ui/FormInput";
import Button from "../../ui/Button";
import loginUser from "../../utils/loginUser";
import scrollToTop from "../../utils/scrollTop";
import Feedback from "../Feedback";
import { useDispatch } from "react-redux";
import { setIsAuthenticated } from "../../features/auth/authorizationSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errors = {};
    let isValid = true;

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

    // Clear error when user starts typing
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
      const loginResult = await loginUser(formValues);

      if (loginResult.success) {
        setMessage("Successfully Logged In");
        setError(null);
        setTimeout(() => {
          setMessage(null);
          navigate("/home");
          dispatch(setIsAuthenticated(true));

          scrollToTop();
        }, 2000);
      } else {
        setMessage(null);
        setError(loginResult.message || "An error occurred during login.");
        setTimeout(() => {
          setError(null);
        }, 2000);
      }
    } catch (error) {
      console.log("login error: ", error);
      setMessage(null);
      setError("An error occurred during login.");
      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 relative">
      {error && <Feedback isSuccess={false} message={error} />}
      {message && <Feedback isSuccess={true} message={message} />}
      <div className="flex justify-center mb-6">
        <div className="bg-blue-100 rounded-full p-3">
          <User size={32} className="text-blue-600" />
        </div>
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
        autoComplete="current-password"
        value={formValues.password}
        onChange={handleChange}
        error={formErrors.password}
        required
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <Link
          to="/reset-password"
          className="text-sm font-medium text-amber-500 hover:text-amber-600 transition-colors"
        >
          Forgot your password?
        </Link>
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        className="transition-all duration-200 transform hover:translate-y-[-2px]"
      >
        Sign in
      </Button>

      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => {
              navigate("/signup");
              scrollToTop();
            }}
            className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            Sign up
          </span>
        </p>
      </div>
    </form>
  );
};

export default LoginForm;

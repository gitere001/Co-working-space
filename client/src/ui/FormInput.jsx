import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = ({
  label,
  id,
  type = 'text',
  error,
  className = '',
  required,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordInput = type === 'password';
  const inputType = isPasswordInput && showPassword ? 'text' : type;

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        <input
          id={id}
          type={inputType}
          className={`
            w-full px-3 py-2 border rounded-md text-gray-900 placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? `${id}-error` : undefined}
          required={required}
          {...props}
        />

        {isPasswordInput && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Eye className="h-5 w-5" aria-hidden="true" />
            )}
            <span className="sr-only">
              {showPassword ? 'Hide password' : 'Show password'}
            </span>
          </button>
        )}
      </div>

      {error && (
        <p className="text-sm text-red-600" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;

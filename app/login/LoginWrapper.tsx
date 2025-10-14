'use client';

import React, { useState } from 'react';
// Assuming useTheme is available for dark mode styling
import { useTheme } from '../Context/ThemeContext'; 

const LoginWrapper: React.FC = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call for login authentication
    setTimeout(() => {
      console.log('Attempting login with:', { email: formData.email });
      console.log('Login successful! Redirecting...');
      
      // Reset form and state
      setFormData({ email: '', password: '' });
      setIsSubmitting(false);
      // In a real app, you would handle successful login and redirect the user here
    }, 1500);
  };

  const isDarkMode = theme === 'dark';
  const containerClasses = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = isDarkMode ? 'bg-gray-800 shadow-2xl' : 'bg-white shadow-xl';
  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white' 
      : 'bg-gray-50 border-gray-300 text-gray-900'
  }`;

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 ${containerClasses}`}>
      <div className={`w-full max-w-md p-8 rounded-xl ${cardClasses}`}>
        <h1 className="text-3xl font-bold text-center text-blue-500 mb-2">
          Welcome Back
        </h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Sign in to access your P2P Cloud account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isSubmitting ? 'Logging In...' : 'Log In'}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Do not have an account? 
          <a href="/signup" className="text-blue-500 hover:underline ml-1 font-medium">
            Sign Up
          </a>
        </p>
        <p className={`text-center text-sm mt-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          <a href="/forgot-password" className="text-blue-500 hover:underline font-medium">
            Forgot Password?
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginWrapper;

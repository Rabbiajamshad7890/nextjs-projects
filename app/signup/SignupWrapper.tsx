'use client';

import React, { useState } from 'react';
// Assuming useTheme is available for dark mode styling
import { useTheme } from '../Context/ThemeContext'; 

const SignupWrapper: React.FC = () => {
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
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

    if (formData.password !== formData.confirmPassword) {
      console.error('Password mismatch');
      alert('Error: Passwords do not match!'); // Use console.log for silent "alert" replacement
      setIsSubmitting(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      console.log('User signed up:', { username: formData.username, email: formData.email });
      console.log('Sign-up successful! Welcome.');
      
      // Reset form and state
      setFormData({ username: '', email: '', password: '', confirmPassword: '' });
      setIsSubmitting(false);
      // In a real app, you would redirect the user here
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
          Create Account
        </h1>
        <p className={`text-center mb-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Join the P2P Cloud community today.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Choose a unique username"
            />
          </div>

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
              minLength={8}
              className={inputClasses}
              placeholder="Must be 8+ characters"
            />
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className={inputClasses}
              placeholder="Re-enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 mt-6 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {isSubmitting ? 'Signing Up...' : 'Sign Up'}
          </button>
        </form>

        <p className={`text-center text-sm mt-6 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
          Already have an account? 
          <a href="/login" className="text-blue-500 hover:underline ml-1 font-medium">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupWrapper;

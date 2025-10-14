'use client';

import React, { useState } from 'react';
// Assuming useTheme path is correct relative to the root or context file
import { useTheme } from '../Context/ThemeContext'; 

// Renamed the component to ContactWrapper for clarity
const ContactWrapper: React.FC = () => {
  // Assuming useTheme is correctly implemented in your app
  const { theme } = useTheme();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to an API endpoint
    console.log('Form Submitted:', formData);
    // IMPORTANT: Replacing alert() with a console log or custom UI due to sandbox restrictions
    console.log('User notified: Thank you for your message! We will get back to you soon.');
    
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  const isDarkMode = theme === 'dark';
  const containerClasses = isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900';
  const cardClasses = isDarkMode ? 'bg-gray-800 shadow-xl' : 'bg-white shadow-lg';
  const inputClasses = `w-full px-4 py-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150 ${
    isDarkMode 
      ? 'bg-gray-700 border-gray-600 placeholder-gray-400 text-white' 
      : 'bg-gray-50 border-gray-300 text-gray-900'
  }`;

  return (
    <div className={`min-h-[calc(100vh-80px)] py-16 ${containerClasses}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-500 mb-4">
            Get In Touch
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We would love to hear from you! Send us a message or find us using the details below.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Contact Information Section */}
          <div className={`lg:col-span-1 p-8 rounded-xl ${cardClasses}`}>
            <h2 className="text-2xl font-bold mb-6 border-b border-blue-500 pb-2">
              Our Details
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-lg text-blue-400 mb-1">Office</h3>
                <p>Arfa Karim Software Technology Park, Ferouzpura Road Lahore, Lahore, Pakistan</p> 
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-400 mb-1">Email</h3>
                <p className="hover:text-blue-500 transition">info@p2pclouds.net</p> 
              </div>
              <div>
                <h3 className="font-semibold text-lg text-blue-400 mb-1">Phone</h3>
                <p>+923072770751</p> 
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className={`lg:col-span-2 p-8 rounded-xl ${cardClasses}`}>
            <h2 className="text-2xl font-bold mb-6 border-b border-blue-500 pb-2">
              Send us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
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
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className={inputClasses}
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
              >
                Submit Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactWrapper;

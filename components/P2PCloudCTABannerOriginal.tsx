"use client"
import React from 'react';

// Define the pages for routing (simulated for external connection)
export type AppView = 'products' | 'courses' | 'docs';

interface FinalCTABannerProps {
    // This prop simulates the navigation action in a real application.
    onNavigate?: (view: AppView) => void;
}

const FinalCTABanner: React.FC<FinalCTABannerProps> = ({ onNavigate }) => {
  // Define consistent button classes for the unified purple/blue style and glow
  const buttonClasses = "px-8 py-3 text-white font-bold rounded-lg transition duration-300 transform hover:scale-[1.03] " +
                        "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 " +
                        "glowing-button shadow-xl";
                        
  const handleAction = (view: AppView) => {
    // In a standalone component, we just log the action if onNavigate isn't provided.
    if (onNavigate) {
      onNavigate(view);
    } else {
      console.log(`Navigating to: ${view}`);
      // In a real app, you might use window.location.href or a router push here.
    }
  };

  return (
    <div className="font-sans antialiased bg-[#0d0617] min-h-screen flex items-center justify-center p-8">
      
      {/* Custom Styles for Glow and Font */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }

          /* Custom CSS for the Pulsing Glow Effect (Purple + Blue) */
          .glowing-button {
            position: relative;
            z-index: 10;
            box-shadow: 0 0 10px #7c3aed, 0 0 20px #4f46e5;
            animation: glow-pulse 2.5s infinite alternate;
          }

          @keyframes glow-pulse {
            0% {
              box-shadow: 0 0 8px rgba(124, 58, 237, 0.7), 0 0 15px rgba(79, 70, 229, 0.5);
            }
            100% {
              box-shadow: 0 0 12px rgba(124, 58, 237, 1), 0 0 25px rgba(79, 70, 229, 0.8);
            }
          }
        `}
      </style>

      {/* FINAL CALL TO ACTION BANNER CONTAINER (border removed here) */}
      <div className="bg-gray-900 p-8 md:p-16 rounded-xl shadow-2xl text-center max-w-4xl w-full">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8 leading-tight">
          Your Engineering Mountain Awaits — Start Learning, Building & Scaling Today!
        </h2>
        
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
          
          {/* Button 1: Explore Docs */}
          <button 
            onClick={() => handleAction('docs')}
            className={buttonClasses}
          >
            Explore Docs
          </button>
          
          {/* Button 2: Enroll in Courses */}
          <button 
            onClick={() => handleAction('courses')}
            className={buttonClasses}
          >
            Enroll in Courses
          </button>
          
          {/* Button 3: Try Products */}
          <button 
            onClick={() => handleAction('products')}
            className={buttonClasses}
          >
            Try Products
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default FinalCTABanner;

"use client"
import React, { FC } from 'react';
import Link from 'next/link';
import { useTheme } from '../app/Context/ThemeContext';

// Define the Theme type and Context interface to support casting
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// Define the pages for routing (simulated for external connection)
export type AppView = 'products' | 'courses' | 'docs';

interface FinalCTABannerProps {
    // This prop simulates the navigation action in a real application.
    onNavigate?: (view: AppView) => void;
}

const FinalCTABanner: React.FC<FinalCTABannerProps> = ({ onNavigate }) => {
    // 1. Get the current theme state using the external hook and casting
    const { theme } = useTheme() as ThemeContextType;

    // 2. Define conditional classes based on theme
    const outerContainerClasses = theme === 'dark'
        ? 'bg-[#0d0617] text-white' // Dark, deep purple background
        : 'bg-gray-100 text-gray-900'; // Light, off-white background

    const innerBannerClasses = theme === 'dark'
        ? 'bg-gray-900' // Dark inner container
        : 'bg-white shadow-lg'; // Light inner container with more prominent shadow

    const headingClasses = theme === 'dark'
        ? 'text-white'
        : 'text-gray-900';
    
    // Define consistent button classes for the unified purple/blue style and glow (kept constant for high-impact CTA)
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
        // Apply theme-dependent outer container class
        <div className={`font-sans antialiased min-h-screen flex items-center justify-center p-8 transition-colors duration-500 ${outerContainerClasses}`}>
            
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
                        /* Glow colors */
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

            {/* FINAL CALL TO ACTION BANNER CONTAINER */}
            <div className={`${innerBannerClasses} p-8 md:p-16 rounded-xl shadow-2xl text-center max-w-4xl w-full`}>
                <h2 className={`text-3xl md:text-4xl font-extrabold mb-8 leading-tight ${headingClasses}`}>
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
                    
                    {/* Button 2: Enroll in Courses (NOW A NEXT.JS LINK to /all-courses) */}
                    <Link 
                        // **FIX:** Changed href to kebab-case to resolve 404 (requires manual folder rename to app/all-courses/page.tsx)
                        href="/all-courses" 
                        // Apply the button classes directly to the Link component
                        className={buttonClasses} 
                    >
                        Enroll in Courses
                    </Link>
                    
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
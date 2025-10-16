"use client"
// import React, { FC } from 'react';
// Re-enabling the real external theme hook import as requested
import { useTheme } from '../app/Context/ThemeContext';

// --- Icon Definitions (Lucide-style SVGs for self-containment) ---
const FileText = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/>
    </svg>
);

const GraduationCap = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21.42 10.922a1 1 0 0 0-.012-1.764L13.793 6.18a3 3 0 0 0-5.586 0L2.592 9.158a1 1 0 0 0-.012 1.764l8.2 4.67a3 3 0 0 0 3 0l8.2-4.67z"/><path d="M15.21 13.916v3.177a3 3 0 0 0 3 0v-3.177M5.79 13.916v3.177a3 3 0 0 0 3 0v-3.177"/>
    </svg>
);

const Package = (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.89 2.14L10.05 4.98C9.53 5.5 9 6.2 9 7v7M12 14v7M12 21h-2M12 21h2M5 5l7 7 7-7M5 19l7-7 7 7"/>
    </svg>
);

// Define the Theme type and Context interface (Necessary for TypeScript)
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    // We keep toggleTheme here even though we don't use it, as it's part of the expected context shape
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
        : 'bg-white shadow-xl'; // Light inner container with more prominent shadow

    const headingClasses = theme === 'dark'
        ? 'text-white'
        : 'text-gray-900';
    
    // --- Primary Button Style (Used for the main CTA: Enroll in Courses) ---
    const primaryButtonClasses = "flex items-center justify-center px-6 py-3 text-white font-semibold rounded-xl transition duration-300 transform hover:scale-[1.05] whitespace-nowrap " +
                                 "bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/50 " +
                                 "focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50";
                            
    // --- Ghost Button Style (Used for secondary CTAs: Docs and Products) ---
    const ghostButtonClasses = () => `flex items-center justify-center px-6 py-3 rounded-xl font-semibold transition duration-300 transform hover:scale-[1.05] whitespace-nowrap border-2 ${
        theme === 'dark' 
            ? 'border-indigo-400 text-indigo-400 hover:bg-indigo-900/40' 
            : 'border-indigo-600 text-indigo-600 hover:bg-indigo-50'
    } focus:outline-none focus:ring-4 focus:ring-indigo-300 focus:ring-opacity-50`;


    const handleAction = (view: AppView) => {
        // In a standalone component, we just log the action if onNavigate isn't provided.
        if (onNavigate) {
            onNavigate(view);
        } else {
            console.log(`Navigating to: ${view}`);
        }
    };

    return (
        // Height reduced by using py-16/py-24 instead of min-h-screen
        <div className={`font-sans antialiased p-4 md:p-8 py-16 md:py-24 transition-colors duration-500 ${outerContainerClasses}`}>
            
            {/* Custom Styles for Font and responsiveness */}
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
                    body {
                        font-family: 'Inter', sans-serif;
                    }
                `}
            </style>

            {/* FINAL CALL TO ACTION BANNER CONTAINER */}
            <div className={`${innerBannerClasses} p-6 md:p-12 rounded-2xl shadow-2xl text-center max-w-4xl w-full mx-auto`}>
                <h2 className={`text-2xl md:text-4xl font-extrabold mb-8 leading-tight ${headingClasses}`}>
                    Your Engineering Mountain Awaits — Start Learning, Building & Scaling Today!
                </h2>
                
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    
                    {/* Button 1: Explore Docs (FileText Icon) - Using Ghost Style */}
                    <button 
                        onClick={() => handleAction('docs')}
                        className={ghostButtonClasses()}
                    >
                        <FileText className="w-5 h-5 mr-2" />
                        Explore Docs
                    </button>
                    
                    {/* Button 2: Enroll in Courses (GraduationCap Icon) - Using Primary Style */}
                    {/* Standard <a> tag remains for simple linking */}
                    <a 
                        href="/all-courses" 
                        className={primaryButtonClasses}
                    >
                        <GraduationCap className="w-5 h-5 mr-2" />
                        Enroll in Courses
                    </a>
                    
                    {/* Button 3: Try Products (Package Icon) - Using Ghost Style */}
                    <button 
                        onClick={() => handleAction('products')}
                        className={ghostButtonClasses()}
                    >
                        <Package className="w-5 h-5 mr-2" />
                        Try Products
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default FinalCTABanner;

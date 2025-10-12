"use client";
import React, { useState } from 'react';

// 1. Import the necessary hook from your dedicated theme context file
// FIX: Adjusting path to a common root import structure that often resolves build errors.
import { useTheme } from '../app/Context/ThemeContext'; 


// ====================================================================
// --- COMMUNITY DATA
// ====================================================================

// Example data for community spaces
const COMMUNITY_SPACES = [
    {
        slug: 'forum',
        name: 'Forum',
        description: 'Discuss ideas, ask questions, and connect with other members.',
        // Updated icons for better visual consistency
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><path d="M14 2v6h6"></path><path d="M8 15h2"></path><path d="M8 19h8"></path><path d="M12 11h4"></path></svg>',
    },
    {
        slug: 'discord',
        name: 'Discord',
        description: 'Join our Discord server for live chat and collaboration.',
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12.5C8 11.12 9.12 10 10.5 10c1.38 0 2.5 1.12 2.5 2.5S11.88 15 10.5 15C9.12 15 8 13.88 8 12.5zm4 0c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5-2.5 1.12-2.5 2.5z"></path><path d="M16 2.5c-2 0-3.92.93-5.26 2.56L8.4 7H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-4.4l-2.34-2.56C16.12 3.43 14 2.5 12 2.5z"></path></svg>',
    },
    {
        slug: 'github',
        name: 'GitHub',
        description: 'Contribute to our open-source projects and explore the codebase.',
        iconSvg: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87c0-1.81-.95-2.22-2.75-2.75 1.5-1.5 3.5-2.5 3.5-5.5.07-1.59-.57-2.6-1.5-3.35 0 0-1.35-.45-4.5 1.05-1.25-.35-2.5-.5-3.75-.5-1.25 0-2.5.15-3.75.5-3.15-1.5-4.5-1.05-4.5-1.05-1 .75-1.5 1.76-1.5 3.35 0 3 2 4 3.5 5.5-1.8.53-2.75.94-2.75 2.75V22"></path></svg>',
    },
];

// ====================================================================
// --- COMPONENT
// ====================================================================

function CommunitySection() {
    // 2. Consume the theme state
    const { theme } = useTheme();

    // Simple state to show navigation effect
    const [lastNavigated, setLastNavigated] = useState('');

    const onNavigate = (slug: string) => {
        setLastNavigated(`Mapsd to: ${slug}`);
        console.log(`Navigating to: ${slug}`);
        // In a real app, this would change the route or scroll to a section
    };

    // Dynamic classes for the main section background and text
    const sectionBgClass = theme === 'dark'
        ? "p-6 md:p-12 bg-[#0d0617] min-h-screen font-sans text-center text-white"
        : "p-6 md:p-12 bg-gray-50 min-h-screen font-sans text-center text-gray-900";

    const headerTextClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";
    const cardBgClass = theme === 'dark' 
        ? "bg-gray-800 p-6 rounded-xl shadow-2xl transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-indigo-500/50 border border-gray-700 hover:border-indigo-500 text-left"
        : "bg-white p-6 rounded-xl shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.03] hover:shadow-indigo-500/50 border border-gray-200 hover:border-indigo-500 text-left";

    const cardTitleClass = theme === 'dark' ? "text-white" : "text-gray-900";
    const cardDescriptionClass = theme === 'dark' ? "text-gray-300" : "text-gray-600";
    const cardIconClass = theme === 'dark' ? "text-purple-400" : "text-indigo-600";
    const navMessageClass = theme === 'dark' ? "text-green-400" : "text-green-600";


    return (
        <div className={sectionBgClass}>
            
            {/* FIX: Applied the gradient text class to ensure visibility in light mode. */}
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
                P2PClouds Community Hub
            </h1>
            <p className={`text-xl ${headerTextClass} mb-12 max-w-3xl mx-auto`}>
                Join our vibrant network of developers, partners, and users to share knowledge and build together.
            </p>

            <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3 max-w-6xl mx-auto">
                {COMMUNITY_SPACES.map((space) => (
                    <div
                        key={space.slug}
                        className={cardBgClass}
                    >
                        <div className="flex items-center mb-4">
                            {/* Icon color adjusted using the dynamic class */}
                            <span className={`${cardIconClass} mr-4`} dangerouslySetInnerHTML={{ __html: space.iconSvg }} />
                            <h2 className={`text-2xl font-bold ${cardTitleClass}`}>{space.name}</h2>
                        </div>
                        
                        <p className={cardDescriptionClass + " mb-6"}>{space.description}</p>
                        
                        {/* Button color changed to purple + blue glowing shades */}
                        <button
                            onClick={() => onNavigate(space.slug)}
                            className="w-full text-white py-3 px-4 rounded-lg font-semibold transition duration-150 transform hover:translate-y-[-2px] 
                                        bg-gradient-to-r from-blue-500 to-purple-600 
                                        shadow-xl shadow-blue-500/50 
                                        hover:from-blue-400 hover:to-purple-500 
                                        hover:shadow-blue-400/70"
                        >
                            See Joining Instructions
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-16 text-center">
                
                {/* Main CTA Button also changed to purple + blue glowing shades */}
                <button
                    onClick={() => onNavigate('main-cta')} 
                    className="inline-block px-10 py-4 text-lg text-white font-bold rounded-full transition duration-300 transform hover:scale-105 
                                bg-gradient-to-r from-blue-500 to-purple-600 
                                shadow-2xl shadow-blue-500/50 
                                hover:from-blue-400 hover:to-purple-500 
                                hover:shadow-blue-400/70"
                >
                    Join the Community Now
                </button>
                
                {/* Simple feedback mechanism for navigation */}
                {lastNavigated && (
                    <p className={`mt-6 text-sm ${navMessageClass}`}>{lastNavigated}</p>
                )}
            </div>
        </div>
    );
}

export default function App() {
    return (
        <>
            <CommunitySection />
        </>
    );
}

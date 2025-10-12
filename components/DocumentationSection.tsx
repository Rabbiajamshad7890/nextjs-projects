"use client";
import React, { FC } from 'react';
import { useTheme } from '../app/Context/ThemeContext'; // Correct theme context path

/**
 * Single-file React application using TypeScript.
 * This component displays a library of technology documentation links.
 */

// ====================================================================
// --- ICONS (INLINE SVG)
// ====================================================================

// Helper class for animation
const iconAnimationClass = "transition duration-500 ease-in-out hover:scale-110";

const ReactIcon: FC = () => (
    <svg className={`w-10 h-10 text-blue-400 ${iconAnimationClass}`} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified React Atom Logo */}
        <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path d="M50 2L50 98" stroke="currentColor" strokeWidth="4"/>
        <path d="M14.6447 35.3553L85.3553 64.6447" stroke="currentColor" strokeWidth="4"/>
        <path d="M14.6447 64.6447L85.3553 35.3553" stroke="currentColor" strokeWidth="4"/>
    </svg>
);

const NextJsIcon: FC = () => (
    <svg className={`w-10 h-10 text-gray-200 ${iconAnimationClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Vercel-style Icon (simplified arrow) */}
        <polyline points="5 9 12 2 19 9" />
        <path d="M4 14C4 18.4183 7.58172 22 12 22C16.4183 22 20 18.4183 20 14" />
    </svg>
);

const ReactNativeIcon: FC = () => (
    <svg className={`w-10 h-10 text-purple-400 ${iconAnimationClass}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Mobile Phone Icon */}
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12" y2="18" />
        <path d="M8 6h8" />
        <path d="M8 10h8" />
    </svg>
);


const DockerIcon: FC = () => (
    <svg className={`w-10 h-10 text-blue-500 ${iconAnimationClass}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        {/* Simplified Docker Whale shape */}
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM8 14h8v4H8v-4Zm0-4h8v2H8v-2Zm4-4h4v2h-4V6Z" fill="#0db7ed"/>
    </svg>
);

// ====================================================================
// --- DATA & INTERFACE
// ====================================================================

// Define the shape of the props for each documentation card
interface DocCardProps {
    title: string;
    description: string;
    linkUrl: string;
    icon: React.ReactNode;
    buttonText: string; // New property for custom button text
}

// Data for the main documentation cards with official external URLs and new button text
const techDocs: DocCardProps[] = [
    {
        title: 'React.js',
        description: 'The library for building user interfaces. Dive into hooks and state management.',
        linkUrl: 'https://react.dev', // Official React Documentation
        icon: <ReactIcon />,
        buttonText: 'Read the Docs', // Custom button text
    },
    {
        title: 'Next.js',
        description: 'The React Framework for Production. Server-side rendering, routing, and APIs.',
        linkUrl: 'https://nextjs.org/docs', // Official Next.js Documentation
        icon: <NextJsIcon />,
        buttonText: 'View Documentation', // Custom button text
    },
    {
        title: 'React Native',
        description: 'Build native mobile apps using React for iOS and Android.',
        linkUrl: 'https://reactnative.dev/docs/getting-started', // Official React Native Documentation
        icon: <ReactNativeIcon />,
        buttonText: 'Start Mobile Dev', // Custom button text
    },
    {
        title: 'Docker',
        description: 'Containerization for developers. Build, ship, and run any app, anywhere.',
        linkUrl: 'https://docs.docker.com/get-started/', // Official Docker Get Started Guide
        icon: <DockerIcon />,
        buttonText: 'Dive into Containers', // Custom button text
    },
];

// ====================================================================
// --- COMPONENTS
// ====================================================================

const DocCard: FC<DocCardProps> = ({ title, description, linkUrl, icon, buttonText }) => {
    const { theme } = useTheme(); // Use theme context for conditional styling

    // Glowing button style using a subtle gradient and shadow
    const buttonClass = `
        mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-lg shadow-lg
        bg-gradient-to-r from-purple-600 to-blue-500 text-white
        hover:from-purple-500 hover:to-blue-400
        transition duration-300 transform hover:scale-[1.03]
        border border-purple-400 border-opacity-50
    `;

    // Apply conditional classes to the card wrapper
    const cardClasses = `
        /* REMOVED: flex-shrink-0 w-72 */ p-6 rounded-xl shadow-2xl transition duration-300
        ${theme === 'dark' 
          ? 'bg-[#1a0f2b] border border-purple-800/50 hover:border-blue-500/50' 
          : 'bg-white border border-gray-200 hover:border-blue-500/50'
        }
    `;

    const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const descriptionClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    return (
        // Updated to remove fixed width and allow grid scaling
        <div className={cardClasses}>
            <div className="text-4xl mb-4 text-blue-400 flex justify-center items-center">{icon}</div>
            <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h3>
            <p className={`text-sm ${descriptionClass}`}>{description}</p>
            
            {/* External link for documentation, opens in a new tab */}
            <a 
                href={linkUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={buttonClass}
            >
                {buttonText} →
            </a>
        </div>
    );
};

export const DocumentationSection: FC = () => {
    const { theme } = useTheme(); // Use theme context for conditional styling

    // Marquee-related CSS and its injection are REMOVED entirely.
    
    // Apply theme-based background and text colors to the main section
    const sectionClasses = `min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500 
        ${theme === 'dark' ? 'bg-[#0d0617] text-white' : 'bg-gray-50 text-gray-900'}
    `;
    
    // Apply theme-based color to the subheading paragraph
    const subheadingClass = `text-xl text-center mb-12 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`;
        
    return (
        // Updated to use conditional classes
        <section className={sectionClasses}>
            
            {/* INJECTED CUSTOM MARQUEE CSS REMOVED */}

            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                    Documents Tech Library 
                </h2>
                <p className={subheadingClass}>
                    Dive into advanced documentation and tutorials for the modern developer.
                </p>
                
                {/* GRID CARD CONTAINER (Replaced marquee-container) */}
                <div className="w-full"> 
                    
                    {/* Inner container displaying cards in a grid (Replaced marquee flex and space-x-8) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4"> 
                        
                        {/* Displaying all unique cards in the grid */}
                        {techDocs.map((doc) => (
                            <DocCard key={`grid-${doc.title}`} {...doc} /> 
                        ))}
                        
                    </div>
                </div>

                {/* CTA Button */}
                <div className="text-center mt-16">
                    <button 
                        onClick={() => console.log('Browsing All Documentation... (Placeholder)')}
                        className={`
                            inline-block px-8 py-4 text-lg font-bold rounded-xl shadow-2xl
                            bg-gradient-to-r from-blue-500 to-purple-600 text-white
                            hover:from-blue-400 hover:to-purple-500
                            transition duration-500 transform hover:scale-[1.05]
                            border border-blue-300 border-opacity-50
                            animate-pulse
                        `}>
                        Browse All Documentation
                    </button>
                </div>
            </div>
        </section>
    );
};

// Main App component required for single-file execution
const App: FC = () => {
    return <DocumentationSection />;
};

export default App;
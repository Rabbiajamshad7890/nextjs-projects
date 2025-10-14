"use client";
import React, { FC } from 'react';
// Assuming 'useTheme' context hook and provider are available at this path in the project
import { useTheme } from '../app/Context/ThemeContext';

/**
 * Single-file React application using TypeScript/JSX.
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
    buttonText: string;
}

// Data for the main documentation cards
const techDocs: DocCardProps[] = [
    {
        title: 'React.js',
        description: 'The library for building user interfaces. Dive into hooks and state management.',
        linkUrl: 'https://react.dev',
        icon: <ReactIcon />,
        buttonText: 'Read the Docs',
    },
    {
        title: 'Next.js',
        description: 'The React Framework for Production. Server-side rendering, routing, and APIs.',
        linkUrl: 'https://nextjs.org/docs',
        icon: <NextJsIcon />,
        buttonText: 'View Documentation',
    },
    {
        title: 'React Native',
        description: 'Build native mobile apps using React for iOS and Android.',
        linkUrl: 'https://reactnative.dev/docs/getting-started',
        icon: <ReactNativeIcon />,
        buttonText: 'Start Mobile Dev',
    },
    {
        title: 'Docker',
        description: 'Containerization for developers. Build, ship, and run any app, anywhere.',
        linkUrl: 'https://docs.docker.com/get-started/',
        icon: <DockerIcon />,
        buttonText: 'Dive into Containers',
    },
];

// ====================================================================
// --- COMPONENTS
// ====================================================================

const DocCard: FC<DocCardProps> = ({ title, description, linkUrl, icon, buttonText }) => {
    const { theme } = useTheme(); // Use theme context for conditional styling

    // --- Colorless & Theme-Aware Button Style ---
    // The button is now full-width, has no colored background gradient, and adjusts its border/text color based on theme.
    const buttonClass = `
        mt-6 block w-full text-center px-4 py-3 text-sm font-semibold rounded-lg shadow-md transition duration-300 transform hover:scale-[1.01]
        ${theme === 'dark' 
            ? 'bg-transparent text-gray-300 border border-gray-600 hover:bg-gray-800' 
            : 'bg-transparent text-gray-700 border border-gray-300 hover:bg-gray-100'
        }
    `;

    // --- Card Style (Added flex-col and h-full for sticky footer) ---
    // Added h-full and flex-col justify-between to ensure the content stretches and the button is pushed to the bottom.
    const cardClasses = `
        p-6 rounded-xl shadow-2xl transition duration-300 h-full flex flex-col
        ${theme === 'dark' 
          ? 'bg-[#1a0f2b] border border-purple-800/50 hover:border-blue-500/50' 
          : 'bg-white border border-gray-200 hover:border-blue-500/50'
        }
    `;

    const titleClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const descriptionClass = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    return (
        // The card is a flex container with column direction
        <div className={cardClasses}>
            {/* Main content wrapper takes up all available space, pushing the button down */}
            <div className="flex-grow">
                <div className="text-4xl mb-4 text-blue-400 flex justify-center items-center">{icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h3>
                <p className={`text-sm ${descriptionClass}`}>{description}</p>
            </div>
            
            {/* External link button, which is pushed to the bottom */}
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
    
    // Apply theme-based background and text colors to the main section
    const sectionClasses = `min-h-screen py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-500 w-full
        ${theme === 'dark' ? 'bg-[#0d0617] text-white' : 'bg-gray-50 text-gray-900'}
    `;
    
    // Apply theme-based color to the subheading paragraph
    const subheadingClass = `text-xl text-center mb-12 ${
        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
    }`;
        
    return (
        <section className={sectionClasses}>
            
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                    Documents Tech Library 
                </h2>
                <p className={subheadingClass}>
                    Dive into advanced documentation and tutorials for the modern developer.
                </p>
                
                {/* GRID CARD CONTAINER */}
                <div className="w-full"> 
                    
                    {/* Inner container displaying cards in a grid */}
                    {/* Note: The grid layout ensures all DocCards take the same height (h-full is key for sticky footer) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-4"> 
                        
                        {/* Displaying all unique cards in the grid */}
                        {techDocs.map((doc) => (
                            <DocCard key={`grid-${doc.title}`} {...doc} /> 
                        ))}
                        
                    </div>
                </div>

                {/* The "Browse All Documentation" CTA button div has been REMOVED as requested. */}
            </div>
        </section>
    );
};

// Main App component required for single-file execution
const App: FC = () => {
    // Note: In a real environment, this App would need to be wrapped in the ThemeContext Provider 
    // for the useTheme() hook to function correctly.
    return <DocumentationSection />;
};

export default App;

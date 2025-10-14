"use client";
import React from 'react';
// import Link from 'next/link'; // Using <a> tags as the entire card link

// 🛑 PRODUCTION IMPORT: This is your actual theme import path 🛑
// This line is now active and the only reference to useTheme.
import { useTheme } from '../app/Context/ThemeContext'; 

// --- Theme Context Definition (Required for TypeScript only) ---
// Defining these types locally ensures the rest of the component compiles 
// even without the full context provider available in the sandbox.
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}
// --- END TYPES ---


interface ProductCardProps {
    title: string;
    description: string;
    href: string; // Changed from slug to href to hold the full URL
    icon: React.ReactNode; 
}

// Data for the main product cards, updated with provided URLs and matching titles
const productCards: ProductCardProps[] = [
    {
        title: 'P2PCloud VPM (Visitor Portal Management)',
        description: 'Manage visitor access, scheduling, and security protocols with a centralized, modern portal solution.',
        href: 'https://p2pclouds.net/vpm/',
        icon: <span role="img" aria-label="VPM Icon">👤</span>,
    },
    {
        title: 'P2PCloud CRM (Customer Relationship Management)',
        description: 'Centralized customer relationship management. Manage sales, support, and marketing campaigns efficiently.',
        href: 'https://p2pclouds.net/crm/',
        icon: <span role="img" aria-label="CRM Icon">📊</span>,
    },
    {
        title: 'P2PCloud LMS (Learning Management System)',
        description: 'A comprehensive platform for creating, delivering, and tracking internal or external learning content and courses.',
        href: 'https://p2pclouds.net/lms/',
        icon: <span role="img" aria-label="LMS Icon">🎓</span>,
    },
    {
        title: 'P2PCloud AI Agents',
        description: 'Access powerful AI APIs for vision, natural language processing, and deploy custom machine learning models.',
        href: 'https://p2pclouds.net/ai-agents/',
        icon: <span role="img" aria-label="AI Icon">🤖</span>,
    },
];

// ProductCard component is now the <a> tag itself
const ProductCard: React.FC<ProductCardProps> = ({ title, description, href, icon }) => {
    // 2. Consume the theme state in the Card
    // Casting useTheme to the known type helps TypeScript resolve the type in this environment
    const { theme } = (useTheme as unknown as () => ThemeContextType)();

    // Dynamic classes for the card body - added hover scale for click affordance
    const cardBodyClass = theme === 'dark'
        ? "bg-black/30 h-full p-6 rounded-xl shadow-2xl border border-purple-800/50 hover:border-cyan-500 transition duration-300 flex flex-col justify-between transform hover:scale-[1.02]"
        : "bg-white h-full p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-500 transition duration-300 flex flex-col justify-between transform hover:scale-[1.02]";

    const titleClass = theme === 'dark' ? "text-white" : "text-gray-900";
    const descriptionClass = theme === 'dark' ? "text-gray-300" : "text-gray-600";
    const iconClass = theme === 'dark' ? "text-cyan-400" : "text-indigo-600";
    const linkTextClass = theme === 'dark' ? "text-cyan-400 hover:text-cyan-300" : "text-indigo-600 hover:text-indigo-500";


    return (
        // Entire card is wrapped in <a> tag
        <a 
            href={href} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`cursor-pointer block ${cardBodyClass}`}
        >
            <div className="flex-grow">
                <div className={`text-4xl mb-4 ${iconClass}`}>{icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h3>
                <p className={`text-sm ${descriptionClass}`}>{description}</p>
            </div>
            
            {/* Link indicator */}
            <div className={`mt-4 flex items-center space-x-2 text-sm font-semibold transition duration-300 ${linkTextClass}`}>
                <span>View Product →</span>
            </div>
        </a>
    );
};

export const ProductSection: React.FC = () => {
    // 3. Consume the theme state in the main component
    const { theme } = (useTheme as unknown as () => ThemeContextType)();

    // Dynamic classes for the main section background and text
    const sectionBgClass = theme === 'dark'
        ? "min-h-screen bg-[#0d0617] text-white py-16 font-inter"
        : "min-h-screen bg-gray-50 text-gray-900 py-16 font-inter";

    const headerTextClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";

    // Adjusted grid layout for 4 items
    return (
        <section className={sectionBgClass + " px-4 sm:px-6 lg:px-8"}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                    Explore Our Core Products
                </h2>
                <p className={`text-xl text-center ${headerTextClass} mb-12`}>
                    Dive into our product portals for features, documentation, and pricing.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productCards.map((product) => (
                        <ProductCard key={product.href} {...product} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductSection;

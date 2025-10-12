"use client";
import React from 'react';
// import Link from 'next/link'; // Using <a> tags instead of Next.js Link

// 1. Import the necessary hook from your dedicated theme context file
// FIX: Adjusting path to a common structure (assuming component is nested)
import { useTheme } from '../app/Context/ThemeContext'; 


interface ProductCardProps {
    title: string;
    description: string;
    slug: string;
    icon: React.ReactNode; 
}

// Data for the main product cards
const productCards: ProductCardProps[] = [
    {
        title: 'P2PCloud CRM',
        description: 'Centralized customer relationship management. Manage sales, support, and marketing campaigns efficiently.',
        slug: 'p2pcloud-crm',
        icon: <span role="img" aria-label="CRM Icon">📊</span>,
    },
    {
        title: 'P2PCloud Storage',
        description: 'Secure, multi-zone object storage. Reliable solution for backups, archives, and media content delivery.',
        slug: 'p2pcloud-storage',
        icon: <span role="img" aria-label="Storage Icon">💾</span>,
    },
    {
        title: 'AI & ML Services',
        description: 'Access powerful AI APIs for vision, natural language processing, and deploy custom machine learning models.',
        slug: 'ai-ml-services',
        icon: <span role="img" aria-label="AI Icon">🤖</span>,
    },
    {
        title: 'Ad Integrations',
        description: 'Unified guides on connecting popular ad platforms: Meta Ads, Google Ads, AdMob, and Google My Business (GMB).',
        slug: 'ad-integrations',
        icon: <span role="img" aria-label="Ads Icon">📈</span>,
    },
];

const ProductCard: React.FC<ProductCardProps> = ({ title, description, slug, icon }) => {
    // 2. Consume the theme state in the Card
    const { theme } = useTheme();

    // The button remains consistent with the strong gradient style you defined
    const buttonClass = `
        mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-lg shadow-lg
        bg-gradient-to-r from-purple-600 to-blue-500 text-white
        hover:from-purple-500 hover:to-blue-400
        transition duration-300 transform hover:scale-[1.03]
        border border-purple-400 border-opacity-50
    `;

    // Dynamic classes for the card body
    const cardBodyClass = theme === 'dark'
        ? "bg-[#1a0f2b] p-6 rounded-xl shadow-2xl border border-purple-800/50 hover:border-blue-500/50 transition duration-300"
        : "bg-white p-6 rounded-xl shadow-lg border border-gray-200 hover:border-indigo-500/50 transition duration-300";

    const titleClass = theme === 'dark' ? "text-white" : "text-gray-900";
    const descriptionClass = theme === 'dark' ? "text-gray-300" : "text-gray-600";
    const iconClass = theme === 'dark' ? "text-blue-400" : "text-indigo-600";


    return (
        <div className={cardBodyClass}>
            <div className={`text-4xl mb-4 ${iconClass}`}>{icon}</div>
            <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h3>
            <p className={`text-sm ${descriptionClass}`}>{description}</p>
            {/* Using <a> tag for navigation */}
            <a href={`/product/${slug}`} className={buttonClass}>
                Explore Features →
            </a>
        </div>
    );
};

export const ProductSection: React.FC = () => {
    // 3. Consume the theme state in the main component
    const { theme } = useTheme();

    // Dynamic classes for the main section background and text
    const sectionBgClass = theme === 'dark'
        ? "min-h-screen bg-[#0d0617] text-white py-16 font-inter"
        : "min-h-screen bg-gray-50 text-gray-900 py-16 font-inter";

    const headerTextClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";

    // Adjusted grid layout for 4 items
    return (
        <section className={sectionBgClass + " px-4 sm:px-6 lg:px-8"}>
            <div className="max-w-7xl mx-auto">
                <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
                    Our Flagship Products
                </h2>
                <p className={`text-xl text-center ${headerTextClass} mb-12`}>
                    Dive into our product documentation, pricing, and integration guides.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {productCards.map((product) => (
                        <ProductCard key={product.slug} {...product} />
                    ))}
                </div>

                {/* CTA Button */}
                <div className="text-center mt-16">
                    {/* Using <a> tag for navigation */}
                    <a href="/products/all" className={`
                        ${productCards.length > 0 ? '' : 'hidden'}
                        inline-block px-8 py-4 text-lg font-bold rounded-xl shadow-2xl
                        bg-gradient-to-r from-blue-500 to-purple-600 text-white
                        hover:from-blue-400 hover:to-purple-500
                        transition duration-500 transform hover:scale-[1.05]
                        border border-blue-300 border-opacity-50
                        animate-pulse
                    `}>
                        View All Product Documentation
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProductSection;

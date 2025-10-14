"use client";
import React from 'react';
// import Link from 'next/link'; // REMOVED to fix compilation error. Using <a> tags instead.
import {
    MapPin,
    Mail,
    Phone,
    Send,
    ChevronDown,
    LucideIcon,
    // START: Icon Fix - Imported Lucide social icons
    Facebook,
    Twitter,
    Instagram,
    Youtube
    // END: Icon Fix
} from 'lucide-react';
// FIX: Restoring the actual import for the external theme context
import { useTheme } from '../app/Context/ThemeContext';

// --- Type Definitions ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

interface LinkItem {
    name: string;
    href: string;
    icon?: LucideIcon;
    isAddress?: boolean;
    target?: '_self' | '_blank';
}

const productLinks: LinkItem[] = [
    { name: 'AI Agents', href: '#ai' },
    { name: 'Learning Platform', href: '#learning' },
    { name: 'Customer Management', href: '#crm' },
    { name: 'Stock System', href: '#stock' },
    { name: 'Visitor Portal', href: '#portal' },
];

const contactDetails: LinkItem[] = [
    {
        name: 'Arfa Karim Software Technology Park, Ferouzpura Road Lahore, Lahore, Pakistan',
        href: '#',
        icon: MapPin,
        isAddress: true,
    },
    {
        name: 'info@p2pclouds.net',
        href: 'mailto:info@p2pclouds.net',
        icon: Mail,
        target: '_blank',
    },
    {
        name: '+923072770751',
        href: 'tel:+923072770751',
        icon: Phone,
        target: '_blank',
    },
];

// --- Sub-Components ---

const CompanyLogo: React.FC<{ theme: Theme }> = ({ theme }) => {
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    return (
        <div className="flex items-center space-x-2">
            {/* Image path "favicon.png" correctly references the static asset */}
            <img 
                src="favicon.png" 
                alt="P2P Clouds Logo" 
                className="w-8 h-8 rounded-full object-cover shadow-lg" 
                // Fallback placeholder in case the image doesn't load
                onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevents infinite loop
                    target.src = "https://placehold.co/32x32/06B6D4/FFFFFF?text=C"; 
                    target.className = "w-8 h-8 rounded-full object-cover p-1 bg-cyan-500 shadow-lg";
                }}
            />
            <span className={`text-xl font-extrabold tracking-wider ${textColor}`}>
                P2P CLOUDS
            </span>
        </div>
    );
};

// Newsletter and Social Media section
const NewsletterSection: React.FC<{ theme: Theme }> = ({ theme }) => {
    
    interface SocialIconProps {
        icon: LucideIcon; 
        href: string;
    }
    
    const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Link to ${Icon.displayName || 'Social Media'}`}
            className={`text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-2 rounded-full border ${
                theme === 'dark' ? 'border-gray-700 hover:border-cyan-400' : 'border-gray-300 hover:border-cyan-500'
            } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-current`}
        >
            <Icon size={20} />
        </a>
    );
    
    const inputBg = theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
    const inputBorder = theme === 'dark' ? 'border-gray-600' : 'border-gray-400';
    const inputTextColor = theme === 'dark' ? 'text-gray-300' : 'text-gray-800';

    return (
        <div className="lg:col-span-1">
            <h4 className={`text-lg font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-6`}>Newsletter</h4>
            
            {/* Email Input */}
            <div className={`relative border-b-2 ${inputBorder} focus-within:border-cyan-500 mb-8`}>
                <input
                    type="email"
                    placeholder="Enter your email"
                    aria-label="Enter your email for newsletter"
                    className={`w-full bg-transparent ${inputTextColor} py-3 pr-10 focus:outline-none placeholder-gray-500`}
                />
                <button
                    type="submit"
                    aria-label="Subscribe"
                    className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-cyan-400 transition-colors"
                >
                    <Send size={20} />
                </button>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-4 mb-8">
                <SocialIcon icon={Facebook} href="https://facebook.com/P2Pclouds" />
                <SocialIcon icon={Twitter} href="https://twitter.com/P2Pclouds" />
                <SocialIcon icon={Instagram} href="https://instagram.com/P2Pclouds" />
                <SocialIcon icon={Youtube} href="https://youtube.com/P2Pclouds" />
            </div>

            {/* Language Selector */}
            <div className="relative">
                <select
                    aria-label="Select Language"
                    className={`appearance-none w-full ${inputBg} ${inputTextColor} py-3 px-4 pr-10 rounded-lg border ${inputBorder} focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all cursor-pointer`}
                    defaultValue="english"
                >
                    <option value="english">Select Language</option>
                    <option value="urdu">Urdu</option>
                    <option value="arabic">Arabic</option>
                    <option value="mandarin">Mandarin</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={20} />
            </div>
        </div>
    );
};


// --- Main Component ---

const Footer: React.FC = () => {
    // Relying on the imported useTheme hook for theme state
    const { theme } = useTheme() as ThemeContextType; 
    const currentYear = new Date().getFullYear();

    const footerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200';
    const footerText = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
    const headerText = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const dividerBorder = theme === 'dark' ? 'border-gray-800' : 'border-gray-300';
    
    // Dynamic text color for the secondary paragraph. 
    const secondaryText = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

    return (
        <footer className={`${footerBg} ${footerText} pt-16 font-inter transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* Top Section: Main Content Grid (Responsive for Mobile/Tablet/Desktop) */}
                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b ${dividerBorder}`}>

                    {/* Column 1: Company & Description */}
                    <div className="lg:col-span-1">
                        <CompanyLogo theme={theme} />
                        <p className="mt-4 text-sm leading-relaxed max-w-xs">
                            P2P Clouds Software house & Emerging Tech Marketing Co. 🚀
                        </p>
                        {/* High-contrast text for both themes */}
                        <p className={`mt-6 text-sm leading-relaxed ${secondaryText}`}>
                            Offering top-tier digital marketing, web, mobile app AI, blockchain chatbot & cloud services. Elevate your enterprise with our products; Your tech evolution starts.
                        </p>
                    </div>

                    {/* Column 2: Contacts */}
                    <div className="lg:col-span-1">
                        <h4 className={`text-lg font-semibold mb-6 ${headerText}`}>Contacts</h4>
                        <ul className="space-y-4">
                            {contactDetails.map((item, index) => {
                                // Dynamic element (<a> for external links, <span> for address/no-link)
                                const Element = item.href === '#' || item.isAddress ? 'span' : 'a';
                                
                                // Conditional classes for addresses vs clickable links
                                const linkClasses = item.href === '#' || item.isAddress 
                                    ? 'block' 
                                    : 'hover:text-cyan-500 transition-colors block';

                                return (
                                    <li key={index} className={`flex items-start text-sm ${item.isAddress ? 'gap-2' : 'gap-4'}`}>
                                        {/* Icon is clear and colored cyan for visibility */}
                                        {item.icon && <item.icon size={20} className="text-cyan-500 min-w-[20px] mt-0.5" />}
                                        <Element 
                                            // Only pass href and target if it's an actual <a> tag
                                            {...(Element === 'a' && { href: item.href, target: item.target || '_self', rel: 'noopener noreferrer' })}
                                            className={linkClasses}
                                        >
                                            {item.name}
                                        </Element>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    {/* Column 3: Products */}
                    <div className="lg:col-span-1">
                        <h4 className={`text-lg font-semibold mb-6 ${headerText}`}>Products</h4>
                        <ul className="space-y-4">
                            {productLinks.map((link) => (
                                <li key={link.name}>
                                    {/* Replacing Next.js Link with standard <a> tag */}
                                    <a
                                        href={link.href}
                                        className="text-sm hover:text-cyan-500 transition-colors block"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4: Newsletter & Language */}
                    <NewsletterSection theme={theme} />
                </div>
                
                {/* Bottom Bar: Copyright and Utility Links */}
                <div className="flex flex-col md:flex-row justify-between items-center py-6 text-sm">
                    <p className="order-2 md:order-1 mt-4 md:mt-0">
                        &copy; {currentYear} P2P Clouds. All rights reserved.
                    </p>
                    <div className="flex space-x-6 order-1 md:order-2">
                        {/* Replacing Next.js Link with standard <a> tag */}
                        <a href="#support" className="hover:text-cyan-500 transition-colors">
                            Support
                        </a>
                        {/* Replacing Next.js Link with standard <a> tag */}
                        <a href="#blogs" className="hover:text-cyan-500 transition-colors">
                            Blogs
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

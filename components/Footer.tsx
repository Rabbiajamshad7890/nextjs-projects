"use client";
import React from 'react';
import Link from 'next/link';
import { MapPin, Mail, Phone, Send, ChevronDown, LucideIcon } from 'lucide-react';
import { useTheme } from '../app/Context/ThemeContext'; // Assuming correct path to Context

// --- Type Definitions ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// FIX 1: Replaced 'React.FC<any>' with 'LucideIcon' 
interface LinkItem {
    name: string;
    href: string;
    icon?: LucideIcon;
    isAddress?: boolean;
    // Added target prop for external links
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

// A simple placeholder for the company logo/identity
const CompanyLogo: React.FC<{ theme: Theme }> = ({ theme }) => {
    const textColor = theme === 'dark' ? 'text-white' : 'text-gray-900';
    return (
        <div className="flex items-center space-x-2">
            {/* Placeholder for the logo icon (using a simple styled div/SVG placeholder) */}
            <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center">
                <div className="text-white font-bold text-lg">C</div>
            </div>
            <span className={`text-xl font-extrabold tracking-wider ${textColor}`}>
                P2P CLOUDS
            </span>
        </div>
    );
};

// Newsletter and Social Media section
const NewsletterSection: React.FC<{ theme: Theme }> = ({ theme }) => {
    // FIX 3: Replaced 'React.FC<any>' with a precise type for the SocialIcon's props.
    interface SocialIconProps {
        icon: React.FC<{ size: number | string }>;
        href: string;
    }
    
    const SocialIcon: React.FC<SocialIconProps> = ({ icon: Icon, href }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`text-gray-400 hover:text-cyan-400 transition-colors duration-200 p-2 rounded-full border ${
                theme === 'dark' ? 'border-gray-700 hover:border-cyan-400' : 'border-gray-300 hover:border-cyan-500'
            }`}
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
                {/* Placeholder icons for Facebook, Twitter, Instagram, YouTube */}
                <SocialIcon icon={({ size }) => <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-2c-1.105 0-2 .894-2 2v2h4l-1 4h-3v8h-4v-8h-3v-4h3v-2c0-2.239 1.761-4 4-4h2v3z"/></svg>} href="https://facebook.com" />
                <SocialIcon icon={({ size }) => <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.795-1.576 2.165-2.724-.951.564-2.005.974-3.127 1.195-.89-.989-2.155-1.609-3.565-1.609-2.719 0-4.925 2.206-4.925 4.925 0 .387.044.764.128 1.127-4.113-.206-7.756-2.174-10.2-5.147-.424.729-.668 1.574-.668 2.474 0 1.708.868 3.21 2.188 4.098-.809-.026-1.57-.247-2.23-.614-.001.021-.001.041-.001.064 0 2.388 1.704 4.379 3.961 4.83-.414.114-.849.174-1.296.174-.316 0-.623-.031-.921-.087.627 1.956 2.45 3.376 4.604 3.417-1.696 1.33-3.844 2.124-6.179 2.124-.403 0-.796-.023-1.185-.069 2.18 1.398 4.76 2.213 7.547 2.213 9.052 0 14.008-7.497 14.008-14.008 0-.213-.004-.426-.009-.637.962-.695 1.797-1.562 2.457-2.549z"/></svg>} href="https://twitter.com" />
                <SocialIcon icon={({ size }) => <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path d="M12 2.163c3.204 0 3.584.013 4.851.071 1.171.054 1.83.245 2.441.488.66.262 1.255.626 1.815 1.185.56.56.923 1.155 1.185 1.815.243.611.434 1.27.488 2.441.058 1.267.071 1.647.071 4.851s-.013 3.584-.071 4.851c-.054 1.171-.245 1.83-.488 2.441-.262.66-.626 1.255-1.185 1.815-.56.56-1.155.923-1.815 1.185-.611.243-1.27.434-2.441.488-1.267.058-1.647.071-4.851.071s-3.584-.013-4.851-.071c-1.171-.054-1.83-.245-2.441-.488-.66-.262-.626-1.255-1.185-1.815-.56-.56-1.155-.923-1.185-1.815-.243-.611-.434-1.27-.488-2.441-.058-1.267-.071-1.647-.071-4.851s.013-3.584.071-4.851c.054-1.171.245-1.83.488-2.441.262-.66.626-1.255 1.185-1.815.56-.56 1.155-.923 1.815-1.185.611-.243 1.27-.434 2.441-.488 1.267-.058 1.647-.071 4.851-.071zm0-2.163c-3.266 0-3.67.014-4.947.072-1.294.06-2.106.261-2.906.577-.822.333-1.53.793-2.227 1.489-.696.696-1.156 1.405-1.489 2.227-.316.8-.517 1.612-.577 2.906-.058 1.277-.072 1.681-.072 4.947s.014 3.67.072 4.947c.06 1.294.261 2.106.577 2.906.333.822.793 1.53 1.489 2.227.696.696 1.405 1.156 2.227 1.489.8.316 1.612.517 2.906.577 1.277.058 1.681.072 4.947.072s3.67-.014 4.947-.072c1.294-.06 2.106-.261 2.906-.577.822-.333 1.53-.793 2.227-1.489.696-.696 1.405-1.156 2.227-1.489.8-.316 1.612-.517 2.906-.577 1.277-.058 1.681-.072 4.947-.072zm0 5.867c-2.042 0-3.702 1.66-3.702 3.702s1.66 3.702 3.702 3.702 3.702-1.66 3.702-3.702-1.66-3.702-3.702-3.702zm0 6.163c-1.353 0-2.46-1.106-2.46-2.46s1.107-2.46 2.46-2.46 2.46 1.106 2.46 2.46-1.107 2.46-2.46 2.46zm5.54-7.465c0-.661.536-1.197 1.197-1.197s1.197.536 1.197 1.197c0 .661-.536 1.197-1.197 1.197s-1.197-.536-1.197-1.197z"/></svg>} href="https://instagram.com" />
                <SocialIcon icon={({ size }) => <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size}><path d="M19.615 3.184c-3.654-.26-6.101-.013-9.563-.013-3.461 0-5.908-.247-9.563.013-2.13.153-3.626 1.748-3.626 3.879v8.083c0 2.131 1.496 3.726 3.626 3.879 3.655.26 6.102.013 9.563.013 3.462 0 5.908.247 9.563-.013 2.13-.153 3.626-1.748 3.626-3.879v-8.083c0-2.131-1.496-3.726-3.626-3.879zm-7.615 13.816v-9l6 4.5-6 4.5z"/></svg>} href="https://youtube.com" />
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
    // 1. Initialize useTheme hook
    const { theme } = useTheme() as ThemeContextType;
    const currentYear = new Date().getFullYear();

    // 2. Apply theme classes
    const footerBg = theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200';
    const footerText = theme === 'dark' ? 'text-gray-400' : 'text-gray-700';
    const headerText = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const dividerBorder = theme === 'dark' ? 'border-gray-800' : 'border-gray-300';

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
                        <p className="mt-6 text-sm leading-relaxed text-gray-300">
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
                                    <Link
                                        href={link.href}
                                        className="text-sm hover:text-cyan-500 transition-colors block"
                                    >
                                        {link.name}
                                    </Link>
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
                        <Link href="#support" className="hover:text-cyan-500 transition-colors">
                            Support
                        </Link>
                        <Link href="#blogs" className="hover:text-cyan-500 transition-colors">
                            Blogs
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

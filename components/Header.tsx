'use client';

import React, { useState } from "react";
import { useTheme } from "../app/Context/ThemeContext";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
// import styles from "./Header.module.css"; 

interface DropdownItem {
    label: string;
    href: string;
}

const aiAgentsDropdownItems: DropdownItem[] = [
    { label: "Courses", href: "/courses" },
    { label: "Product", href: "/product" },
    { label: "Blogs", href: "/blogs" },
    { label: "Community", href: "/community" },
    { label: "Explore Docs", href: "/explore-docs" },
];

const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const col1 = aiAgentsDropdownItems.slice(0, 3);
    const col2 = aiAgentsDropdownItems.slice(3);
    
    const headerClasses =
        theme === "dark"
            ? "bg-gray-900 text-white shadow-lg"
            : "bg-white text-gray-900 shadow-md";

    const linkClasses = "text-gray-600 hover:text-blue-500 dark:text-gray-300 dark:hover:text-blue-400 transition-colors font-medium";
    
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            className={`${headerClasses} sticky top-0 z-50 transition-colors duration-300 relative`}
        >
            {/* Main Header Row: Logo, Desktop Nav, CTAs/Toggle */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-4">
                
                {/* Left Section: Logo + Links */}
                <div className="flex items-center space-x-8">
                    <Link
                        href="/"
                        className="flex items-center space-x-2 text-xl font-bold transition-colors"
                        onClick={handleLinkClick}
                    >
                        <Image
                            src="/favicon.png"
                            alt="P2P Cloud Logo"
                            width={40}
                            height={40}
                        />
                        <span>Home</span>
                    </Link>

                    {/* Desktop Navigation: Hidden on small screens */}
                    <nav className="hidden md:flex space-x-6 items-center">
                        
                        {/* AI Agents Dropdown */}
                        <div className="relative group flex items-center h-full">
                            <Link
                                href="/ai-agents"
                                className={`${linkClasses} py-2 block flex items-center`}
                            >
                                Ai Agents
                            </Link>
                            
                            {/* Dropdown Menu (Desktop) */}
                            <div
                                className="absolute hidden group-hover:flex top-full left-0 -translate-x-2 max-w-sm sm:max-w-xl mt-2 p-4 bg-gray-100 dark:bg-gray-800 shadow-xl rounded-lg min-w-[500px] transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                            >
                                <div className="flex w-full space-x-6">
                                    {/* Dropdown Columns */}
                                    <div className="flex flex-col space-y-2 flex-1">
                                        {col1.map((item: DropdownItem) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white p-2 rounded-md transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                    <div className="flex flex-col space-y-2 flex-1">
                                        {col2.map((item: DropdownItem) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="text-gray-700 dark:text-gray-300 hover:bg-blue-500 hover:text-white p-2 rounded-md transition-colors"
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Standard Desktop Nav Links */}
                        <Link href="/lms" className={linkClasses}>
                            LMS
                        </Link>
                        <Link href="/crm" className={linkClasses}>
                            CRM
                        </Link>
                        <Link href="/about" className={linkClasses}>
                            About
                        </Link>
                    </nav>
                </div>

                {/* Right Section: Toggle, Mobile Button, Desktop CTAs */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* THE THEME TOGGLE BUTTON (Always Visible) */}
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
                    >
                        {theme === "dark" ? (
                            // Sun icon (Light mode) 
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-yellow-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        ) : (
                            // Moon icon (Dark mode) 
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-gray-800"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                            </svg>
                        )}
                    </button>
                    
                    {/* Mobile Menu Toggle Button (Visible on mobile only) */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                        )}
                    </button>

                    {/* Desktop CTAs (Hidden on mobile) */}
                    <div className="hidden md:flex items-center space-x-4">
                        {/* Animated Corporate Trainings */}
                        <motion.div
                            initial={{ opacity: 0.5, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{
                                repeat: Infinity,
                                repeatType: "reverse",
                                duration: 1.5,
                            }}
                        >
                            <Link
                                href="/corporate-trainings"
                                className="text-purple-500 hover:text-white hover:bg-purple-600 border border-purple-500 font-semibold py-2 px-4 rounded-md transition-colors"
                            >
                                Corporate Trainings
                            </Link>
                        </motion.div>

                        {/* Signup Button */}
                        <Link
                            href="/signup"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Signup
                        </Link>

                        {/* Contact Us Button */}
                        <Link
                            href="/contact"
                            className="bg-transparent border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-white font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>
            
            {/* Mobile Menu Drawer (Visible on small screens when open) */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.3 }}
                    className="md:hidden absolute top-full left-0 w-full bg-inherit shadow-xl p-4 border-t border-gray-700 dark:border-gray-800"
                >
                    <nav className="flex flex-col space-y-4 pb-4">
                        {/* Mobile Links */}
                        <Link onClick={handleLinkClick} href="/ai-agents" className={`${linkClasses} block py-2`}>
                            Ai Agents
                        </Link>
                        <Link onClick={handleLinkClick} href="/lms" className={`${linkClasses} block py-2`}>
                            LMS
                        </Link>
                        <Link onClick={handleLinkClick} href="/crm" className={`${linkClasses} block py-2`}>
                            CRM
                        </Link>
                        <Link onClick={handleLinkClick} href="/about" className={`${linkClasses} block py-2`}>
                            About
                        </Link>
                        
                        {/* Mobile CTAs (Stacked) */}
                        <div className="flex flex-col space-y-3 pt-4 border-t border-gray-600 dark:border-gray-700">
                            <Link
                                onClick={handleLinkClick}
                                href="/corporate-trainings"
                                className="text-purple-500 hover:text-white hover:bg-purple-600 border border-purple-500 font-semibold py-2 px-4 rounded-md text-center transition-colors"
                            >
                                Corporate Trainings
                            </Link>
                            <Link
                                onClick={handleLinkClick}
                                href="/signup"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md text-center transition-colors"
                            >
                                Signup
                            </Link>
                            <Link
                                onClick={handleLinkClick}
                                href="/contact"
                                className="bg-transparent border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-semibold py-2 px-4 rounded-md text-center transition-colors"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </nav>
                </motion.div>
            )}
        </header>
    );
};

export default Header;

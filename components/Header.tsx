'use client';

import React, { useState, useEffect } from "react"; 
import { useTheme } from "../app/Context/ThemeContext";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
// import styles from "./Header.module.css"; 

// 1. MODIFIED DropdownItem interface (re-adding href as optional)
interface NavigationItem {
    label: string;
    href?: string; // RE-ADDED: The link destination is now necessary for clickable items
}

// 2. MODIFIED TOP-LEVEL NAVIGATION LINKS (re-adding href for Courses)
const navItems: NavigationItem[] = [ // Renamed to navItems for clarity
    // --- THIS ITEM IS NOW CLICKABLE AND LINKS TO THE #courses ID ---
    { label: "Courses" }, 
    { label: "Products" },
    { label: "Blogs" },
    { label: "Softwares" },
    { label: "Community" },
    { label: "Documents" },
];


const Header: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    // FIX 1: State to track if the component has mounted on the client
    const [isMounted, setIsMounted] = useState(false); 

    // FIX 2: Set mounted state only on the client
    useEffect(() => {
        setIsMounted(true);
    }, []); 
    
    // FIX 3: Use a stable default (e.g., 'light') for SSR, and apply the actual theme only after mounting
    const currentTheme = isMounted ? theme : 'light'; 

    const headerClasses =
        currentTheme === "dark"
            ? "bg-gray-900 text-white shadow-lg"
            : "bg-white shadow-md"; 

    // 3. UPDATED LINK/ITEM READABILITY: Removed 'cursor-default' from the general classes.
    // Cursor handling is now dynamic based on whether 'item.href' exists below.
    const itemClasses = "hover:text-blue-500 dark:hover:text-blue-400 transition-colors font-medium";
    
    const handleLinkClick = () => {
        setIsMenuOpen(false);
    };

    return (
        <header
            // FIX 4: Apply the stable SSR classes first, then update to the dynamic classes once mounted
            className={`${isMounted ? headerClasses : 'bg-white shadow-md'} sticky top-0 z-50 transition-colors duration-300 relative`}
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
                            src="/logo.png"
                            alt="P2P Cloud Logo"
                            width={40}
                            height={40}
                            sizes="40px"
                        />
                        <span>Home</span>
                    </Link>

                    {/* Desktop Navigation: Hidden on small screens */}
                    <nav className="hidden md:flex space-x-6 items-center">
                        
                        {/* 4. MODIFIED DESKTOP NAV: Use Link if href exists, otherwise use span */}
                        {navItems.map((item) => (
                            item.href ? (
                                <Link 
                                    key={item.label} 
                                    href={item.href} 
                                    className={`${itemClasses} cursor-pointer`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span 
                                    key={item.label} 
                                    className={`${itemClasses} cursor-default`}
                                >
                                    {item.label}
                                </span>
                            )
                        ))}
                        
                    </nav>
                </div>

                {/* Right Section: Toggle, Mobile Button, Desktop CTAs */}
                <div className="flex items-center space-x-2 sm:space-x-4">
                    {/* FIX 5: Only render theme-specific elements after mounting */}
                    {isMounted && (
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors focus:outline-none"
                            aria-label={`Switch to ${currentTheme === "dark" ? "light" : "dark"} mode`}
                        >
                            {currentTheme === "dark" ? (
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
                    )}
                    
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

                        {/* Contact Us Button - REMOVED text-gray-900 dark:text-white */}
                        <Link
                            href="/contact"
                            className="bg-transparent border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold py-2 px-4 rounded-md transition-colors"
                        >
                            <span> Contact Us </span>
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
                        {/* 5. MODIFIED MOBILE NAV: Use Link if href exists, otherwise use div. Add onClick to close menu. */}
                        {navItems.map((item) => (
                            item.href ? (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    onClick={handleLinkClick} // IMPORTANT: Closes the menu on click
                                    className={`${itemClasses} block py-2 cursor-pointer`}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <div 
                                    key={item.label}
                                    className={`${itemClasses} block py-2 cursor-default`}
                                >
                                    {item.label}
                                </div>
                            )
                        ))}
                        
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
                                className="bg-transparent border border-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 font-semibold py-2 px-4 rounded-md text-center transition-colors"
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

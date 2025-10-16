// app/all-courses/page.tsx
"use client";
import React from 'react';
import { LayoutGrid } from 'lucide-react';
// Assuming the path to ThemeContext remains correct from the root (i.e., using @/app)
import { useTheme } from '@/app/Context/ThemeContext'; 
import Link from 'next/link';

// NOTE: Duplicated ThemeContextType for type safety as done in FreeSoftwarePage
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const AllCoursesPage: React.FC = () => {
    const { theme } = useTheme() as ThemeContextType;

    // Theme-dependent classes
    const sectionClasses = theme === 'dark' 
        ? 'bg-[#0d0617] text-white' 
        : 'bg-gray-50 text-gray-900';
    
    const headerTitleClass = theme === 'dark' ? 'text-white' : 'text-gray-900';
    const subtextColor = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

    return (
        <div className={`${sectionClasses} min-h-screen pt-24 pb-16 px-4 md:px-8 transition-colors duration-500`}>
            <div className="max-w-6xl mx-auto">

                {/* Breadcrumb / Back Link - REMOVED AS REQUESTED */}

                {/* Page Header */}
                <header className="text-center mb-12">
                    <h1 className={`text-4xl md:text-5xl font-extrabold ${headerTitleClass} tracking-tight leading-tight`}>
                        <LayoutGrid className="inline-block w-8 h-8 mr-3 align-text-bottom text-purple-500" />
                        Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">Course Catalog</span>
                    </h1>
                    <p className={`mt-4 text-xl ${subtextColor}`}>
                        Start your development journey with a course tailored for you.
                    </p>
                </header>

                {/* Course Placeholder Grid */}
                <main className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Card 1: Marketing */}
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-black/40 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                        <h2 className={`text-2xl font-bold mb-2 ${headerTitleClass}`}>Marketing</h2>
                        <p className={subtextColor}>Master modern web development with React, Next.js, and a database.</p>
                        <Link 
                            href="https://skillustad.com/marketing/"
                            target="_blank" // Opens in a new tab
                            rel="noopener noreferrer"
                            className="mt-4 text-sm font-semibold text-cyan-400 hover:underline flex items-center"
                        >
                            View Details →
                        </Link>
                    </div>
                    {/* Card 2: Soft Skills */}
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-black/40 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                        <h2 className={`text-2xl font-bold mb-2 ${headerTitleClass}`}>Soft Skills</h2>
                        <p className={subtextColor}>Learn to build scalable, type-safe applications.</p>
                        <Link 
                            href="https://skillustad.com/soft-skills/"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 text-sm font-semibold text-cyan-400 hover:underline flex items-center"
                        >
                            View Details →
                        </Link>
                    </div>
                    {/* Card 3: Job Ready Bootcamps */}
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-black/40 border-gray-700' : 'bg-white border-gray-200'} shadow-lg`}>
                        <h2 className={`text-2xl font-bold mb-2 ${headerTitleClass}`}>Job Ready Bootcamps</h2>
                        <p className={subtextColor}>Containerization, deployment, and cloud infrastructure essentials.</p>
                        <Link 
                            href="https://skillustad.com/job-ready-bootcamps/"
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="mt-4 text-sm font-semibold text-cyan-400 hover:underline flex items-center"
                        >
                            View Details →
                        </Link>
                    </div>
                </main>

            </div>
        </div>
    );
};

export default AllCoursesPage;
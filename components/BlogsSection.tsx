"use client";
import React from "react";
// 🛑 IMPORT FOR EXTERNAL THEME CONTEXT 🛑
import { useTheme } from '../app/Context/ThemeContext'; 
import {
    Zap, 
    ArrowRight,
    Clock, 
} from "lucide-react";

// --- Configuration ---
const accentColorClass = "text-cyan-400";
const INSTITUTE_NAME = "P2PClouds Institute";

// --- Theme Context Definition ---
type Theme = 'light' | 'dark';
interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

// --- Data Structures ---
interface BlogPost {
    id: number;
    title: string;
    category: string;
    date: string;
    link: string;
}

// Dummy Blog Posts - Simplified data structure
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: `Top AI Chatbot Tools You Should Know in 2025 by ${INSTITUTE_NAME}`,
        category: "Tech Trends",
        date: "Oct 1, 2025",
        link: "/blogsdetail/1",
    },
    {
        id: 2,
        title: `The Backend Development Roadmap for 2025: A ${INSTITUTE_NAME} Guide`,
        category: "How-to Guides",
        date: "Sep 25, 2025",
        link: "/blogsdetail/2",
    },
    {
        id: 3,
        title: `Top 5 Graphic Design Courses in 2025 at ${INSTITUTE_NAME}`,
        category: "Product Updates", 
        date: "Sep 18, 2025",
        link: "/blogsdetail/3",
    },
    {
        id: 4,
        title: `Mastering the Behavioral Interview for DevOps Roles: ${INSTITUTE_NAME} Advice`,
        category: "Career Tips",
        date: "Sep 10, 2025",
        link: "/blogsdetail/4", 
    },
];

const BlogsSection: React.FC = () => {
    // 1. Get the current theme state (now correctly using the imported hook)
    const { theme } = useTheme() as ThemeContextType; 

    // 2. Define conditional classes based on theme
    const sectionClasses = theme === 'dark' 
        ? 'bg-[#0d0617] text-white' 
        : 'bg-gray-50 text-gray-900';
        
    const subtextColor = theme === 'dark' 
        ? 'text-gray-400' 
        : 'text-gray-600';

    const cardBaseClasses = theme === 'dark' 
        ? {
            bg: 'bg-black/40',
            border: 'border-white/10',
            shadow: 'shadow-xl shadow-black/50',
            title: 'text-white',
            meta: 'text-gray-400',
            hover: 'hover:border-cyan-400 hover:shadow-cyan-400/50'
          }
        : {
            bg: 'bg-white',
            border: 'border-gray-200',
            shadow: 'shadow-md shadow-gray-200/50',
            title: 'text-gray-900',
            meta: 'text-gray-500',
            hover: 'hover:border-blue-500 hover:shadow-blue-500/30'
          };

    return (
        <section
            className={`${sectionClasses} py-16 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-500`}
        >
            <div className="max-w-7xl mx-auto text-center">
                
                {/* 'Latest Insights & Tutorials' Chip */}
                <div className="mb-8">
                    <span className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full tracking-widest uppercase shadow-lg
                        ${theme === 'dark' 
                            ? 'bg-purple-900/40 border border-purple-500/50 text-white shadow-purple-900/50'
                            : 'bg-purple-100 border border-purple-300 text-purple-700 shadow-purple-300/50'
                        }`}
                    >
                        <Zap className="w-4 h-4 mr-2" /> Latest Insights & Tutorials
                    </span>
                </div>

                {/* Main Heading and Subtext */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                    The <span className={accentColorClass}>{INSTITUTE_NAME}</span> Blog
                </h2>
                <p className={`text-lg ${subtextColor} max-w-3xl mx-auto mb-16`}>
                    Stay ahead of the curve with deep dives into AI, Cloud technologies,
                    Web3, and expert career guidance from our industry leaders.
                </p>

                {/* --- Blog Posts Grid --- */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {blogPosts.map((post) => {
                        return (
                            <a
                                href={post.link}
                                key={post.id}
                                className={`group rounded-xl flex flex-col overflow-hidden text-left cursor-pointer border-2 transition-all duration-300 ease-in-out hover:translate-y-[-5px] p-6
                                    ${cardBaseClasses.bg} ${cardBaseClasses.border} ${cardBaseClasses.shadow} ${cardBaseClasses.hover}`}
                            >
                                
                                <div className="flex flex-col flex-grow">
                                    {/* Category Tag */}
                                    <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                                        {post.category}
                                    </span>

                                    {/* Title */}
                                    <h3 className={`text-xl font-bold mb-4 line-clamp-3 ${cardBaseClasses.title}`}>
                                        {post.title}
                                    </h3>

                                    {/* Meta Info (Date ONLY) */}
                                    <div className={`flex items-center space-x-4 text-sm ${cardBaseClasses.meta} mt-auto pt-4 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                                        <div className="flex items-center">
                                            <Clock className="w-4 h-4 mr-1 text-cyan-400" />
                                            <span>{post.date}</span>
                                        </div>
                                    </div>

                                    {/* Read More Link - Always visible, animates on group hover */}
                                    <div 
                                        className={`mt-4 flex items-center space-x-2 text-sm font-semibold transition-colors duration-300 
                                            ${accentColorClass} group-hover:text-cyan-300`}
                                    >
                                        <span>Read Article</span>
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default BlogsSection;
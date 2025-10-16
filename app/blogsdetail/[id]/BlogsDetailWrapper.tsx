"use client";
import React from 'react';
import { useTheme } from '@/app/Context/ThemeContext'; 
import * as Lucide from "lucide-react"; 
import { Sun, Moon, Zap } from "lucide-react"; 
// Import types from the Server Component page file to ensure compatibility
// NOTE: Ensure the path to the page file is correct if the file structure is different.
import {  BlogDetailWrapperProps } from './page'; 


// Destructure required icons for rendering the generic UI elements
const { User, Clock, ArrowLeft, Share2 } = Lucide;

// --- Context Type (Kept here as it relates to the Client Component) ---
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// ===============================================
// BLOG DETAIL WRAPPER (Client Component)
// ===============================================
const BlogDetailWrapper: React.FC<BlogDetailWrapperProps> = ({ post, blogId, instituteName }) => {
    
    // Using the imported 'useTheme' hook, which is the correct implementation
    // We assert ThemeContextType to handle the context usage in TypeScript
    const { theme, toggleTheme } = useTheme() as ThemeContextType;

    // --- Theme-dependent classes ---
    const sectionClasses = theme === 'dark'
        ? 'bg-[#0d0617] text-white'
        : 'bg-gray-50 text-gray-900';

    const subtextColor = theme === 'dark'
        ? 'text-gray-400'
        : 'text-gray-600';

    const contentClasses = theme === 'dark'
        ? 'bg-black/30 border-gray-700'
        : 'bg-white border-gray-200';

    const metaIconColor = 'text-cyan-400';

    if (!post) {
        return (
            <div className={`${sectionClasses} min-h-screen flex items-center justify-center p-8 transition-colors duration-500`}>
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold text-red-500">404 - Blog Post Not Found</h1>
                    <p className={`mt-4 ${subtextColor}`}>
                        The article you are looking for does not exist or the ID is invalid. ID: {blogId}
                    </p>
                    <a 
                        href="#"
                        className="mt-6 inline-flex items-center text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" />
                        Go back to the homepage
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className={`${sectionClasses} min-h-screen pt-16 pb-20 px-4 md:px-8 font-inter transition-colors duration-500`}>
            <div className="max-w-4xl mx-auto">

                <div className="flex justify-between items-center pt-4 pb-4 border-b border-gray-700/50 mb-8">
                    {/* 'instituteName' is used here: */}
                    <div className="flex items-center text-sm font-medium text-cyan-400">
                        <Zap className="w-4 h-4 mr-1.5" />
                        <span>Powered by {instituteName}</span>
                    </div>

                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full text-sm font-medium transition-all duration-300
                            border border-cyan-400/50 hover:border-cyan-400/80
                            text-cyan-400 hover:text-white hover:bg-cyan-600/50"
                        title="Toggle Theme"
                    >
                        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                    </button>
                </div>

                {/* Back Button */}
                <a 
                    href="#" 
                    className={`inline-flex items-center text-sm font-medium ${subtextColor} hover:text-cyan-400 transition-colors mb-6`}
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to all Blogs
                </a>

                {/* Header Section */}
                <header className="mb-10 text-left">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
                        {post.title}
                    </h1>

                    {/* Metadata */}
                    <div className={`flex items-center space-x-6 text-sm mt-4 ${subtextColor}`}>
                        <div className="flex items-center">
                            <User className={`w-4 h-4 mr-2 ${metaIconColor}`} />
                            <span>{post.author}</span>
                        </div>
                        <div className="flex items-center">
                            <Clock className={`w-4 h-4 mr-2 ${metaIconColor}`} />
                            <span>{post.date}</span>
                        </div>
                        {/* Share button is client-side/interactive */}
                        <button 
                            onClick={() => {
                                if (typeof document !== 'undefined') {
                                    // Use document.execCommand('copy') for better compatibility in sandboxed environments
                                    const dummy = document.createElement('input');
                                    document.body.appendChild(dummy);
                                    dummy.setAttribute('value', window.location.href);
                                    dummy.select();
                                    document.execCommand('copy');
                                    document.body.removeChild(dummy);
                                    console.log('Link copied to clipboard:', window.location.href);
                                }
                            }}
                            className="flex items-center hover:text-cyan-400 transition-colors"
                        >
                            <Share2 className="w-4 h-4 mr-2" />
                            <span>Share Link</span>
                        </button>
                    </div>
                </header>

                {/* Content Section */}
                <article className={`p-8 md:p-12 rounded-2xl border shadow-xl ${contentClasses} prose prose-lg max-w-none`}>
                    {/* Custom Tailwind CSS overrides for markdown content styling, using 'theme' */}
                    <style dangerouslySetInnerHTML={{ __html: `
                        .prose h3 {
                            margin-top: 1.5rem !important;
                            margin-bottom: 0.75rem !important;
                            font-weight: 700 !important;
                            font-size: 1.5rem !important;
                            border-bottom: 2px solid ${theme === 'dark' ? '#1F2937' : '#E5E7EB'};
                            padding-bottom: 0.5rem;
                            color: ${theme === 'dark' ? '#F9FAFB' : '#111827'};
                        }
                        .prose p {
                            margin-bottom: 1rem;
                            line-height: 1.75;
                            color: ${theme === 'dark' ? '#D1D5DB' : '#374151'};
                        }
                        .prose strong {
                            font-weight: 700;
                            color: ${theme === 'dark' ? '#FFF' : '#1F2937'};
                        }
                        /* Ensure all content styles are theme-aware */
                        .prose {
                            color: ${theme === 'dark' ? '#D1D5DB' : '#374151'};
                        }
                        .prose strong {
                            color: ${theme === 'dark' ? '#FFF' : '#1F2937'};
                        }
                    ` }} />
                    {/* Use dangerouslySetInnerHTML to render the HTML content string */}
                    <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </article>
            </div>
        </div>
    );
};

// EXPORT THE ACTUAL COMPONENT, NOT A MOCK WRAPPER
export default BlogDetailWrapper;

"use client";
import React, { FC, useMemo } from "react";
// Import useTheme from the path specified by the user
import { useTheme } from '../app/Context/ThemeContext'; 
// import Image from 'next/image';
import {
  BookOpen,
  Zap,
  TrendingUp,
  Shield,
  ArrowRight,
  User,
  Clock,
  LucideIcon,
  // Importing additional icons that might be useful, though not all are used by default categories
  FileText,
  Lightbulb,
  Briefcase,
  Code,
} from "lucide-react";

// --- Configuration ---
// Removed hardcoded darkBgColor as it will now be theme-dependent
const accentColorClass = "text-cyan-400";

// --- Data Structures ---

// NOTE: Assuming ThemeContext provides an interface/type structure similar to this for theme-related logic
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

interface BlogCategory {
  name: string;
  icon: LucideIcon; // Correctly typing Lucide icons
  color: string;
}

interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  link: string;
}

// Blog Categories for filtering/navigation
const blogCategories: BlogCategory[] = [
  { name: "Tech Trends", icon: TrendingUp, color: "text-cyan-400" },
  { name: "How-to Guides", icon: BookOpen, color: "text-green-400" },
  { name: "Product Updates", icon: Zap, color: "text-purple-400" },
  { name: "Career Tips", icon: Shield, color: "text-red-400" },
];

// 🔥 Helper function to get the icon component based on category name
const getCategoryIconComponent = (categoryName: string): LucideIcon => {
  const category = blogCategories.find(cat => cat.name === categoryName);
  // Default icon if category not found or icon not specified
  return category?.icon || FileText; 
};

// Dummy Blog Posts
const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Top AI Chatbot Tools You Should Know in 2025",
    category: "Tech Trends",
    author: "Jane Doe",
    date: "Oct 1, 2025",
    link: "https://skillustad.com/blogs/top-ai-chatbot-tools-you-should-know/",
  },
  {
    id: 2,
    title: "The Backend Development Roadmap for 2025",
    category: "How-to Guides",
    author: "John Smith",
    date: "Sep 25, 2025",
    link: "https://skillustad.com/blogs/backend-development-roadmap-2025/",
  },
  {
    id: 3,
    title: "Top 5 Graphic Design Courses in 2025",
    category: "Product Updates", 
    author: "P2P Team",
    date: "Sep 18, 2025",
    link: "https://skillustad.com/blogs/top-5-graphic-design-courses-2025/",
  },
  {
    id: 4,
    title: "Mastering the Behavioral Interview for DevOps Roles",
    category: "Career Tips",
    author: "Emily Chen",
    date: "Sep 10, 2025",
    link: "#", 
  },
];

const BlogsSection: React.FC = () => {
  // 1. Get the current theme state
  const { theme } = useTheme() as ThemeContextType; // Cast for access to `theme` property

  // 2. Define conditional classes based on theme
  const sectionClasses = theme === 'dark' 
    ? 'bg-[#0d0617] text-white' 
    : 'bg-gray-50 text-gray-900';
    
  const subtextColor = theme === 'dark' 
    ? 'text-gray-400' 
    : 'text-gray-600';
    
  const categoryButtonClasses = theme === 'dark' 
    ? `border border-white/20 text-white/80 bg-black/30 hover:bg-purple-800/50 hover:border-purple-400 hover:text-white`
    : `border border-gray-300 text-gray-700 bg-gray-100 hover:bg-purple-100 hover:border-purple-500 hover:text-gray-900`;

  const cardBaseClasses = theme === 'dark' 
    ? {
        bg: 'bg-black/40',
        border: 'border-white/10',
        shadow: 'shadow-xl shadow-black/50',
        title: 'text-white',
        meta: 'text-gray-400',
        iconBg: 'bg-gray-800/70',
        hover: 'hover:border-cyan-400 hover:shadow-cyan-400/50'
      }
    : {
        bg: 'bg-white',
        border: 'border-gray-200',
        shadow: 'shadow-md shadow-gray-200/50',
        title: 'text-gray-900',
        meta: 'text-gray-500',
        iconBg: 'bg-gray-100',
        hover: 'hover:border-blue-500 hover:shadow-blue-500/30'
      };

  return (
    <section
      className={`${sectionClasses} py-20 px-4 sm:px-6 lg:px-8 font-inter transition-colors duration-500`}
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* 'Latest Insights & Tutorials' Chip - Adjust border and shadow for light mode visibility */}
        <div className="mb-8">
          <span className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium rounded-full tracking-widest uppercase shadow-lg
            ${theme === 'dark' 
              ? 'bg-purple-900/40 border border-purple-500/50 text-white shadow-purple-900/50'
              : 'bg-purple-100 border border-purple-300 text-purple-700 shadow-purple-300/50'
            }`}
          >
            📖 Latest Insights & Tutorials
          </span>
        </div>

        {/* Main Heading and Subtext */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
          The <span className={accentColorClass}>P2P Clouds</span> Blog
        </h2>
        <p className={`text-lg ${subtextColor} max-w-3xl mx-auto mb-16`}>
          Stay ahead of the curve with deep dives into AI, Cloud technologies,
          Web3, and expert career guidance from our industry leaders.
        </p>

        {/* --- Blog Categories (Horizontal Scroll on Mobile) --- */}
        <div
          className="mb-16 flex overflow-x-auto justify-center space-x-4 pb-4 hide-scrollbar"
          style={{ WebkitOverflowScrolling: "touch", msOverflowStyle: "none" }}
        >
          {/* Custom style for hiding scrollbar */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `,
            }}
          />

          {blogCategories.map((cat, index) => {
            const Icon = cat.icon;
            return (
              <button
                key={index}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full whitespace-nowrap 
                  transition duration-300 ease-in-out hover:scale-[1.05] shadow-lg
                  ${categoryButtonClasses}`}
              >
                <Icon className={`w-5 h-5 ${cat.color}`} />
                <span className="font-semibold">{cat.name}</span>
              </button>
            );
          })}
        </div>

        {/* --- Blog Posts Grid (Standard Responsive Grid) --- */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {blogPosts.map((post) => {
            // 🔥 Get the correct icon component for the post's category
            const PostIcon = getCategoryIconComponent(post.category);
            const categoryColor = blogCategories.find(cat => cat.name === post.category)?.color || "text-gray-400"; // Fallback color
            
            return (
              <a
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                key={post.id}
                // Card Styling for hover effects, using conditional classes
                className={`rounded-xl flex flex-col overflow-hidden text-left cursor-pointer transition-all duration-300 ease-in-out hover:translate-y-[-5px]
                  ${cardBaseClasses.bg} ${cardBaseClasses.border} ${cardBaseClasses.shadow} ${cardBaseClasses.hover}`}
              >
                {/* 🔥 ICON DISPLAY AREA (Replaces the image) */}
                <div className={`w-full h-40 flex items-center justify-center ${cardBaseClasses.iconBg}`}>
                  <PostIcon className={`w-20 h-20 ${categoryColor} opacity-70`} />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Category Tag */}
                  <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                    {post.category}
                  </span>

                  {/* Title */}
                  <h3 className={`text-xl font-bold mb-4 line-clamp-3 ${cardBaseClasses.title}`}>
                    {post.title}
                  </h3>

                  {/* Meta Info (Author & Date) */}
                  <div className={`flex items-center space-x-4 text-sm ${cardBaseClasses.meta} mt-auto pt-2 border-t ${theme === 'dark' ? 'border-white/10' : 'border-gray-200'}`}>
                    <div className="flex items-center">
                      <User className="w-4 h-4 mr-1 text-cyan-400" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1 text-cyan-400" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        {/* Primary CTA - "Read Our Blog" */}
        <div className="mt-16">
          <button
            className="inline-flex items-center justify-center px-10 py-4 text-lg font-bold rounded-xl text-white uppercase tracking-wider
              bg-gradient-to-tr from-[#7b00ff] to-cyan-400 shadow-xl shadow-cyan-400/50 
              transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-[1.02]"
          >
            Read Our Blog <ArrowRight className="w-5 h-5 ml-3" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogsSection;

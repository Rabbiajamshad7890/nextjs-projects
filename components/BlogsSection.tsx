import React from 'react';
// import Image from 'next/image';
import { BookOpen, Zap, TrendingUp, Shield, ArrowRight, User, Clock, LucideIcon } from 'lucide-react';

// --- Configuration ---
const darkBgColor = 'bg-[#0d0617]';
const accentColorClass = 'text-cyan-400';

// --- Data Structures ---

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
    image: string;
}

// Blog Categories for filtering/navigation
const blogCategories: BlogCategory[] = [
    { name: "Tech Trends", icon: TrendingUp, color: 'text-cyan-400' },
    { name: "How-to Guides", icon: BookOpen, color: 'text-green-400' },
    { name: "Product Updates", icon: Zap, color: 'text-purple-400' },
    { name: "Career Tips", icon: Shield, color: 'text-red-400' },
];

// Dummy Blog Posts
const blogPosts: BlogPost[] = [
    {
        id: 1,
        title: 'The Rise of Generative AI in Cloud Development',
        category: 'Tech Trends',
        author: 'Jane Doe',
        date: 'Oct 1, 2025',
        // Placeholder with fallback image URL
        image: 'https://placehold.co/400x200/222A3B/FFFFFF?text=AI+Trend',
    },
    {
        id: 2,
        title: 'Step-by-Step: Deploying Kubernetes on AWS EKS',
        category: 'How-to Guides',
        author: 'John Smith',
        date: 'Sep 25, 2025',
        // Placeholder with fallback image URL
        image: 'https://placehold.co/400x200/1C2738/FFFFFF?text=Kubernetes+Guide',
    },
    {
        id: 3,
        title: 'New Feature: P2P Clouds Launch of Data Lake Analytics',
        category: 'Product Updates',
        author: 'P2P Team',
        date: 'Sep 18, 2025',
        // Placeholder with fallback image URL
        image: 'https://placehold.co/400x200/3A205A/FFFFFF?text=Product+Update',
    },
    {
        id: 4,
        title: 'Mastering the Behavioral Interview for DevOps Roles',
        category: 'Career Tips',
        author: 'Emily Chen',
        date: 'Sep 10, 2025',
        // Placeholder with fallback image URL
        image: 'https://placehold.co/400x200/345534/FFFFFF?text=Career+Advice',
    },
];

const BlogsSection: React.FC = () => {
    return (
        <section className={`${darkBgColor} text-white py-20 px-4 sm:px-6 lg:px-8 font-inter`}>
            <div className="max-w-7xl mx-auto text-center">
                
                {/* 'Latest Insights & Tutorials' Chip */}
                <div className="mb-8">
                    <span className="inline-flex items-center justify-center px-6 py-2 bg-purple-900/40 border border-purple-500/50 text-sm font-medium rounded-full tracking-widest uppercase text-white shadow-lg shadow-purple-900/50">
                        📖 Latest Insights & Tutorials
                    </span>
                </div>

                {/* Main Heading and Subtext */}
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-4 leading-tight">
                    The <span className={accentColorClass}>P2P Clouds</span> Blog
                </h2>
                <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-16">
                    Stay ahead of the curve with deep dives into AI, Cloud technologies, Web3, and expert career guidance from our industry leaders.
                </p>

                {/* --- Blog Categories (Horizontal Scroll on Mobile) --- */}
                {/* Note: Added custom scrollbar hiding for a cleaner look */}
                <div 
                    className="mb-16 flex overflow-x-auto justify-center space-x-4 pb-4"
                    style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {/* Hides scrollbar in Tailwind way (requires custom class if needed) or just relies on the style prop for now */}
                    <style dangerouslySetInnerHTML={{__html: `
                        .hide-scrollbar::-webkit-scrollbar {
                            display: none;
                        }
                    `}} />
                    
                    {blogCategories.map((cat, index) => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={index}
                                // Adjusted styling slightly for better focus/click state
                                className={`flex items-center space-x-2 px-6 py-3 rounded-full border border-white/20 text-white/80 bg-black/30 whitespace-nowrap 
                                        transition duration-300 ease-in-out hover:bg-purple-800/50 hover:border-purple-400 hover:text-white hover:scale-[1.05] shadow-lg`}
                            >
                                <Icon className={`w-5 h-5 ${cat.color}`} />
                                <span className="font-semibold">{cat.name}</span>
                            </button>
                        );
                    })}
                </div>


                {/* --- Blog Posts Grid --- */}
                <div className="grid grid-cols-3 gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {blogPosts.map((post) => (
                        <a 
                            href={`#blog-${post.id}`} // Use anchor link for navigation consistency
                            key={post.id} 
                            // Card Styling for hover effects
                            className="rounded-xl flex flex-col overflow-hidden bg-black/40 
                                    transition-all duration-300 ease-in-out border border-white/10 
                                    shadow-xl shadow-black/50 text-left cursor-pointer
                                    hover:translate-y-[-5px] hover:border-cyan-400 hover:shadow-cyan-400/50"
                        >
                            {/* <Image
                                src={post.image}
                                alt={post.title}
                                width={400}
                                height={160}
                                className="w-full h-40 object-cover"
                                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                                    const target = e.target as HTMLImageElement;
                                    target.onerror = null;
                                    target.src = 'https://placehold.co/400x200/222A3B/FFFFFF?text=P2P+Blog';
                                }}
                                unoptimized // Remove this if you want Next.js to optimize remote images
                            /> */}
                            
                            
                            <div className="p-6 flex flex-col flex-grow">
                                {/* Category Tag */}
                                <span className="text-xs font-semibold uppercase tracking-wider text-purple-400 mb-2">
                                    {post.category}
                                </span>

                                {/* Title */}
                                <h3 className="text-xl font-bold text-white mb-4 line-clamp-3">
                                    {post.title}
                                </h3>

                                {/* Meta Info (Author & Date) */}
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mt-auto pt-2 border-t border-white/10">
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
                    ))}
                </div>

                {/* Primary CTA - "Read Our Blog" */}
                <div className="mt-16">
                    <button 
                        // CTA button styling from previous context
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

"use client";
import React from 'react';
// Use client-side hooks like useTheme
import { useTheme } from '@/app/Context/ThemeContext'; 
import * as Lucide from "lucide-react"; // Import all Lucide icons to use them dynamically

// Destructure required icons for rendering the generic UI elements
// Removed 'Link' icon from this destructuring assignment
const { User, Clock, ArrowLeft, Share2, FileText } = Lucide;

// --- Data Structures ---
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

// The BlogPost interface receives a serializable string for the icon
interface BlogPost {
    id: number;
    title: string;
    category: string;
    author: string;
    date: string;
    content: string;
    icon: string; // Stored as a string name
}

interface BlogDetailWrapperProps {
    post: BlogPost | undefined;
    blogId: string;
    instituteName: string; 
}

// Icon Mapping: Helper function to safely look up the component by name string
const getIconComponent = (name: string): Lucide.LucideIcon => {
    // FIX: Use a two-step cast (as unknown as Record<...>) to safely handle 
    // the complex 'Lucide' type from the import and eliminate the warning.
    const LucideIcons = Lucide as unknown as Record<string, Lucide.LucideIcon>;
    const Icon = LucideIcons[name]; 
    
    // Fallback to a default icon if not found
    return Icon || Lucide.FileText; 
};


const BlogDetailWrapper: React.FC<BlogDetailWrapperProps> = ({ post, blogId, instituteName }) => {
  
  // Client-side hook usage is now safe
  const { theme } = useTheme() as ThemeContextType;

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
          <Lucide.Link // Note: Using Lucide.Link here in case the Back button was the intended "clip icon"
            href="/"
            className="mt-6 inline-flex items-center text-lg font-medium text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Go back to the homepage
          </Lucide.Link>
        </div>
      </div>
    );
  }

  // Get the actual Icon Component using the string name
  // const PostIcon = getIconComponent(post.icon); // Kept for reference but not rendered

  return (
    <div className={`${sectionClasses} min-h-screen pt-16 pb-20 px-4 md:px-8 font-inter transition-colors duration-500`}>
      <div className="max-w-4xl mx-auto">

        {/* Back Button */}
        <Lucide.Link
          href="/" // Assuming the root leads back to the blog list
          className={`inline-flex items-center text-sm font-medium ${subtextColor} hover:text-cyan-400 transition-colors mb-6`}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to all Blogs
        </Lucide.Link>

        {/* Header Section */}
        <header className="mb-10 text-left">
          {/* Removed Icon and Category wrapper */}

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
            <button className="flex items-center hover:text-cyan-400 transition-colors">
              <Share2 className="w-4 h-4 mr-2" />
              <span>Share</span>
            </button>
          </div>
        </header>

        {/* Content Section */}
        <article className={`p-8 md:p-12 rounded-2xl border shadow-xl ${contentClasses} prose max-w-none`}>
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

        {/* Removed Author Bio Footer (originally the <footer> tag) per user request */}

      </div>
    </div>
  );
};

export default BlogDetailWrapper;

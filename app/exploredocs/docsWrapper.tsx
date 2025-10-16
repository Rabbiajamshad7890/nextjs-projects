'use client';

import React from 'react';
// NOTE: Imports for 'next/link' are replaced by <a> tags for environment compatibility.
import { Atom, Container, ArrowUpRight, Sparkles, ArrowRight } from "lucide-react";
// EXTERNAL THEME CONTEXT IMPORT
import { useTheme } from "@/app/Context/ThemeContext"; 


// ====================================================================
// --- MOCK THEME HOOK (REMOVED - Using external import instead)
// ====================================================================

/**
 * Mock hook that provides a default 'light' theme value.
 * This has been removed to use the external import as requested.
 */
// const useTheme = () => ({ theme: 'light' });


// Define the structure for a single document link
interface DocumentLink {
  id: number;
  title: string;
  description: string;
  href: string;
  icon: React.ElementType; // Lucide icon component type
}

// Mock data updated with new documentation pages
const mockDocuments: DocumentLink[] = [
  {
    id: 1,
    title: "React.dev",
    description: "The official guide to modern React development and hooks.",
    href: "https://react.dev",
    icon: Atom, // Icon for React
  },
  {
    id: 2,
    title: "Next.js Framework",
    description: "Learn how to build powerful full-stack applications using Next.js.",
    href: "https://nextjs.org/docs",
    icon: ArrowUpRight, // Icon for Next.js
  },
  {
    id: 3,
    title: "Docker Containerization",
    description: "Containerize your application for easy deployment and scaling.",
    href: "https://docs.docker.com",
    icon: Container, // Icon for Docker
  },
  {
    id: 4,
    title: "Transflow Pipelines",
    description: "Guides and documentation for building data processing pipelines with Transflow.",
    href: "/exploredocs/transflow", // Assuming a local path for Transflow docs
    icon: Sparkles, // Icon for Transflow
  },
];


// ====================================================================
// --- HELPER HOOK FOR THEME-DEPENDENT CLASSES
// ====================================================================

/**
 * Hook to compute theme-dependent Tailwind CSS classes for the card and container.
 * @param theme The current theme ("light" or "dark").
 * @returns An object containing the pre-calculated class strings.
 */
const useCardThemeClasses = (theme: 'light' | 'dark') => {
  // Base classes for the card links, common to both themes
  const linkBaseClasses = `group block h-full p-6 rounded-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 
                           shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-blue-500`;
  
  // Full-bleed container styling: w-full, large padding, no auto-margin or rounded corners
  const containerBaseClasses = "w-full p-8 md:p-12 transition-colors duration-500";

  return theme === "dark"
    ? {
        // Dark Mode Classes: Full-bleed background
        container: `${containerBaseClasses} bg-gray-900 text-white`, 
        link: `${linkBaseClasses} bg-gray-800`,
        title: "text-white font-bold group-hover:text-blue-300",
        description: "text-gray-300",
        icon: "text-blue-400 group-hover:text-blue-300",
        linkText: "text-blue-400 group-hover:text-blue-300",
      }
    : {
        // Light Mode Classes: Full-width, no box shadow on the container to blend with page
        container: `${containerBaseClasses} bg-gray-50 text-gray-900`, 
        link: `${linkBaseClasses} bg-white`,
        title: "text-gray-900 font-bold group-hover:text-blue-600",
        description: "text-gray-700",
        icon: "text-blue-600 group-hover:text-blue-500",
        linkText: "text-blue-600 group-hover:text-blue-700",
      };
};


/**
 * DocsWrapper is a Client Component.
 * It renders a wide grid of document cards, wrapped in a theme-responsive container.
 */
export default function DocsWrapper() {
  // 1. Get the current theme state using the external hook
  const { theme } = useTheme();

  // 2. Compute theme-dependent classes for both the container and the cards
  const cardClasses = useCardThemeClasses(theme);
    
  // Function to check if the link is external
  const isExternal = (href: string) => href.startsWith('http');

  return (
    // Applied the theme-dependent container class to the main wrapper
    <div className={`${cardClasses.container}`}>
      <h1 className="text-3xl font-extrabold mb-8">Documentation & Resources</h1>
      
      {/* The wide grid layout is preserved: lg:grid-cols-2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {mockDocuments.map((doc) => {
          const external = isExternal(doc.href);
          return (
            // Using standard <a> tag
            <a 
              key={doc.id} 
              href={doc.href} 
              target={external ? "_blank" : "_self"} 
              // Use the pre-computed link class string
              className={cardClasses.link} 
              rel={external ? "noopener noreferrer" : undefined}
            >
              <div className="block h-full">
                <div className="flex items-start space-x-4 mb-3">
                  {/* Icon color using pre-computed class */}
                  <doc.icon className={`w-8 h-8 mt-0.5 flex-shrink-0 transition-colors ${cardClasses.icon}`} />
                  
                  {/* Title color using pre-computed class */}
                  <h2 className={`text-xl transition-colors ${cardClasses.title}`}>{doc.title}</h2>
                </div>
                
                {/* Paragraph color using pre-computed class */}
                <p className={`mb-6 line-clamp-3 ${cardClasses.description}`}>{doc.description}</p>
                
                {/* Link text color using pre-computed class */}
                <span className={`inline-flex items-center font-medium transition-colors ${cardClasses.linkText}`}>
                  Go to Docs
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

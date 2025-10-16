"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // FIX 1: Import the Next.js Image component
import { Link as LinkIcon } from 'lucide-react';
import { useTheme } from '../../Context/ThemeContext'; 

// ====================================================================
// --- TYPES
// ====================================================================

interface ExternalCourseCard {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

interface CourseHub {
    title: string;
    subPages: {
        title: string;
        description: string;
        slug: string;
    }[];
}

interface ThemeContextType {
    theme: "light" | "dark";
}

interface CourseClientWrapperProps {
    courseHub: CourseHub;
    externalCourses: ExternalCourseCard[] | null;
    course_slug: string;
}

// ====================================================================
// --- EXTERNAL COURSE CARD COMPONENT (Theme-Aware)
// ====================================================================

const ExternalCourseCardComponent: React.FC<{ card: ExternalCourseCard; theme: "light" | "dark" }> = ({ card, theme }) => {
    
    // Define theme-dependent classes
    const cardBaseClasses =
        theme === "dark"
            ? {
                // Dark Mode (Original)
                bg: "bg-[#1a0f2b]",
                border: "border-purple-700/50",
                shadow: "shadow-xl hover:shadow-purple-500/50",
                text: "text-white",
                description: "text-gray-300",
                link: "text-purple-400 group-hover:text-blue-300",
              }
            : {
                // Light Mode (New classes)
                bg: "bg-white",
                border: "border-blue-400/50",
                shadow: "shadow-lg hover:shadow-blue-300/50",
                text: "text-gray-900",
                description: "text-gray-600",
                link: "text-blue-600 group-hover:text-purple-600",
              };

    return (
        <a
            href={card.linkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`
                block rounded-xl border-2 ${cardBaseClasses.border} overflow-hidden
                ${cardBaseClasses.bg} transition duration-300 transform hover:scale-[1.03]
                ${cardBaseClasses.shadow} group
                ${cardBaseClasses.text} h-full flex flex-col
            `}
        >
            <div className="relative h-48 w-full overflow-hidden shrink-0">
                {/* FIX 2: Replaced <img> with Next.js <Image /> component for optimization */}
                <Image
                    src={card.imageUrl}
                    alt={card.title}
                    fill // Use 'fill' to make it cover the parent <div> which has a defined height (h-48)
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-opacity duration-300 opacity-80 group-hover:opacity-100"
                />
            </div>
            <div className="p-5 flex flex-col flex-grow">
                <h2 className="text-2xl font-bold mb-2 group-hover:text-blue-400">
                    {card.title}
                </h2>
                <p className={`text-sm ${cardBaseClasses.description} flex-grow`}>{card.description}</p>
                <div className={`mt-4 text-base font-semibold flex items-center ${cardBaseClasses.link}`}>
                    View Course Details <LinkIcon className="h-4 w-4 ml-2" />
                </div>
            </div>
        </a>
    );
};

// ====================================================================
// --- CLIENT WRAPPER COMPONENT
// ====================================================================

const CourseClientWrapper: React.FC<CourseClientWrapperProps> = ({
    courseHub,
    externalCourses,
    course_slug,
}) => {
    // 1. Get the current theme state (This is why "use client" is required)
    const { theme } = useTheme() as ThemeContextType;

    // 2. Define theme-dependent classes for the main page elements
    const sectionClasses =
        theme === "dark" ? "bg-[#0d0617] text-white" : "bg-gray-50 text-gray-900";

    const subtextColor = theme === "dark" ? "text-gray-400" : "text-gray-600";

    // Theme-dependent classes for internal links
    const linkClass =
        theme === "dark"
            ? `
        block w-full text-left p-5 rounded-xl
        bg-[#1a0f2b] border border-purple-700/50
        hover:bg-gradient-to-r hover:from-blue-800/70 hover:to-purple-800/70
        transition duration-300 transform hover:scale-[1.02]
        shadow-xl hover:shadow-purple-500/30
        text-white
    `
            : `
        block w-full text-left p-5 rounded-xl
        bg-white border border-gray-200
        hover:bg-gray-50 hover:border-blue-400
        transition duration-300 transform hover:scale-[1.02]
        shadow-lg hover:shadow-blue-200/50
        text-gray-900
    `;

    // Determine the grid layout for the external cards
    const externalGridCols =
        externalCourses && externalCourses.length === 3
            ? "grid-cols-1 md:grid-cols-3" // 3-column layout
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"; // 2-column layout (for 4 cards)

    return (
        <main
            className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${sectionClasses}`}
        >
            <div className="max-w-5xl mx-auto">
                <h1 className="text-6xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                    {courseHub.title}
                </h1>
                <p className={`text-2xl text-center ${subtextColor} mb-12`}>
                    This is your comprehensive roadmap to mastery in
                    **{course_slug.replace(/-/g, " ").toUpperCase()}**.
                </p>

                {/* Conditional Rendering for External Course Cards (Includes items-stretch for alignment) */}
                {externalCourses && externalCourses.length > 0 ? (
                    <div className={`grid items-stretch ${externalGridCols} gap-8`}>
                        {externalCourses.map((card) => (
                            <ExternalCourseCardComponent
                                key={card.linkUrl}
                                card={card}
                                theme={theme}
                            />
                        ))}
                    </div>
                ) : (
                    // Internal Module Section (This only renders if externalCourses is empty AND subPages has content)
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {courseHub.subPages.map((page) => (
                            <Link
                                key={page.slug}
                                href={`/courses/${course_slug}/${page.slug}`}
                                className={linkClass}
                            >
                                <div>
                                    <h2 className="text-xl font-semibold mb-1 flex items-center">
                                        <LinkIcon
                                            className={`h-5 w-5 mr-2 ${
                                                theme === "dark" ? "text-blue-400" : "text-blue-600"
                                            }`}
                                        />
                                        {page.title}
                                    </h2>
                                    <p
                                        className={`text-sm ${
                                            theme === "dark" ? "text-gray-300" : "text-gray-600"
                                        } mt-2`}
                                    >
                                        {page.description}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
                {/* End Conditional Rendering */}
                <div className="text-center mt-16">
                    <LinkIcon
                        className={`h-6 w-6 inline-block ${
                            theme === "dark" ? "text-blue-400" : "text-blue-600"
                        } mr-2`}
                    />
                    <Link
                        href="/"
                        className={`
                        inline-block px-6 py-3 text-base font-bold rounded-lg shadow-xl
                        bg-gradient-to-r from-purple-600 to-blue-500 text-white
                        hover:from-purple-500 hover:to-blue-400
                        transition duration-300 transform
                        border border-purple-400 border-opacity-50
                    `}
                    >
                        Back to All Course Categories
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default CourseClientWrapper;
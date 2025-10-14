"use client";
import React from 'react';
import { BookOpen, Zap, ArrowRight, TrendingUp, Cpu, Users, Layers, Cloud } from 'lucide-react'; // Retaining Lucide icons for potential use if we swap out emojis

// 1. Import the necessary hook from your dedicated theme context file
// FIX: Adjusting the import path to be relative to the current file with explicit extension.
import { useTheme } from '../app/Context/ThemeContext'; 

// Data for the main course categories
const devCourses = [
    {
        title: 'Cloud & DevOps',
        description: 'Master AWS, Azure, GCP, and automation tools like Kubernetes, Docker, and Terraform.',
        slug: 'cloud-devops',
        icon: <span role="img" aria-label="Cloud Icon">☁️</span>,
    },
    {
        title: 'AI/ML & Data Science',
        description: 'Deep dive into Python, TensorFlow, PyTorch, LLMs, and advanced data visualization techniques.',
        slug: 'ai-data-science',
        icon: <span role="img" aria-label="AI/ML Icon">🧠</span>,
    },
    {
        title: 'Full Stack Development',
        description: 'Build robust web applications using the MERN, MEAN, or Next.js stacks from front to back-end.',
        slug: 'full-stack',
        icon: <span role="img" aria-label="Full Stack Icon">💻</span>,
    },
    {
        title: 'Mobile Development',
        description: 'Develop native and cross-platform apps using React Native, Flutter, and Swift/Kotlin.',
        slug: 'mobile-dev',
        icon: <span role="img" aria-label="Mobile Icon">📱</span>,
    },
    {
        title: 'Cybersecurity',
        description: 'Learn ethical hacking, penetration testing, network security, and secure coding practices.',
        slug: 'cybersecurity',
        icon: <span role="img" aria-label="Security Icon">🛡️</span>,
    },
    // The 'Web3 & Blockchain' course has been removed as requested.
];

interface CourseCardProps {
    title: string;
    description: string;
    slug: string;
    icon: React.ReactNode;
}

const CourseCard: React.FC<CourseCardProps> = ({ title, description, slug, icon }) => {
    // 2. Consume the theme state in the Card
    const { theme } = useTheme();

    // STICKY, COLOR-LESS BUTTON: Simplified button styles and positioned it absolutely/sticky at the bottom.
    const buttonClass = `
        w-full text-center px-4 py-2 text-sm font-semibold rounded-lg
        transition duration-300 transform hover:scale-[1.01]
        ${theme === 'dark' 
            ? 'bg-gray-800 text-white hover:bg-gray-700' 
            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
    `;

    // 🌟 FIX: Use a fixed height (h-[320px]) instead of a minimum height to ensure visual uniformity.
    const cardBodyClass = theme === 'dark'
        ? "bg-[#1a0f2b] h-[320px] relative flex flex-col justify-between p-6 rounded-xl shadow-2xl border border-purple-800/50 transition duration-300 hover:border-blue-500/50"
        : "bg-white h-[320px] relative flex flex-col justify-between p-6 rounded-xl shadow-lg border border-gray-200 transition duration-300 hover:border-indigo-500/50";

    const titleClass = theme === 'dark' ? "text-white" : "text-gray-900";
    const descriptionClass = theme === 'dark' ? "text-gray-300" : "text-gray-600";
    const iconClass = theme === 'dark' ? "text-blue-400" : "text-indigo-600";

    return (
        <div className={cardBodyClass}>
            {/* Main content wrapper - Added pb-16 to reserve space for the absolute button */}
            <div className="pb-16 flex flex-col h-full"> 
                <div className={`text-4xl mb-4 ${iconClass}`}>{icon}</div>
                <h3 className={`text-2xl font-bold mb-2 ${titleClass}`}>{title}</h3>
                {/* 🌟 FIX: Added flex-grow to the description to push the button wrapper to the bottom */}
                <p className={`text-sm ${descriptionClass} flex-grow`}>{description}</p>
            </div>
            
            {/* STICKY BUTTON CONTAINER: Absolute positioning at the bottom of the card */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pt-0">
                {/* Using an a tag for navigation */}
                <a href={`/courses/${slug}`} className={buttonClass}>
                    View Roadmap <ArrowRight className="inline-block w-4 h-4 ml-1" />
                </a>
            </div>
        </div>
    );
};

// Main component implementing the Marquee effect
const CourseSection: React.FC = () => {
    // 3. Consume the theme state in the main component
    const { theme } = useTheme();

    const [isPaused, setIsPaused] = React.useState(false);
    
    // Duplicates the list to ensure a seamless transition for the infinite loop
    const duplicatedCourses = React.useMemo(() => [...devCourses, ...devCourses], []);
    
    // Dynamic classes for the main section background and text
    const sectionBgClass = theme === 'dark'
        ? "min-h-screen bg-[#0d0617] text-white py-16 font-inter"
        : "min-h-screen bg-gray-50 text-gray-900 py-16 font-inter";

    const headerTextClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";
    
    const marqueeBorderClass = theme === 'dark' 
        ? "overflow-hidden py-4 border-y border-purple-700/50"
        : "overflow-hidden py-4 border-y border-indigo-300/50";

    return (
        <div className={sectionBgClass}>
            
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                {/* Heading restored to the original text */}
                <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300 mb-4">
                    Master the Latest Tech with Our SKILLUSTAD Courses
                </h1>
                <p className={`text-xl text-center ${headerTextClass}`}>
                    Hover over any card to pause the scroll and explore the course details.
                </p>
            </div>

            {/* --- Marquee Implementation --- */}
            
            {/* Custom Styles for the Marquee Animation */}
            <style>{`
                /* 1. Define the Keyframes for continuous horizontal scroll */
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    /* -50% because the data is duplicated, scrolling one full set */
                    100% { transform: translateX(-50%); } 
                }

                /* 2. Style the container for the animation */
                .marquee-container {
                    display: flex;
                    width: fit-content;
                    animation: marquee 50s linear infinite; /* Adjust duration (e.g., 50s) for speed */
                    will-change: transform; /* Performance optimization */
                }

                /* 3. Pause functionality on hover */
                .marquee-container.paused {
                    animation-play-state: paused;
                }

                /* 4. Ensure individual cards don't shrink and have correct spacing */
                .course-card-wrapper {
                    flex-shrink: 0;
                    width: 320px; /* Fixed width for card */
                    padding: 1rem;
                }
            `}</style>

            {/* Outer wrapper to clip the content and handle hover for pause */}
            <div 
                className={marqueeBorderClass}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Inner element that receives the animation and pause class */}
                <div 
                    className={`marquee-container ${isPaused ? 'paused' : ''}`}
                >
                    {duplicatedCourses.map((course, index) => (
                        <div 
                            key={index} // Key is unique for the duplicated list
                            className="course-card-wrapper"
                        >
                            <CourseCard {...course} />
                        </div>
                    ))}
                </div>
            </div>
            
            {/* The CTA Button block remains removed */}
            <div className="text-center mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* This block is now empty as the CTA was removed */}
            </div>

        </div>
    );
};

export default CourseSection;
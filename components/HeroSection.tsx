"use client";
import React from "react";
// 1. IMPORT the ThemeContext functionality from your external file
import { useTheme } from "../app/Context/ThemeContext";

import {
    ChevronDown,
    Cloud,
    FileText,
    Map,
    GraduationCap,
    ArrowRight,
    Target,
    Layers,
    Zap,
    Download,
   
} from "lucide-react";

// ========================================================================
// 2. HERO SECTION COMPONENTS
// ========================================================================

// --- Professional CTA Button Component ---
interface QuickCTAProps {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    primary?: boolean;
    href: string;
}

const QuickCTA: React.FC<QuickCTAProps> = ({
    label,
    icon: Icon,
    primary = false,
    href,
}) => {
    // 👈 Get Theme Here (Consuming the theme from the imported context)
    const { theme } = useTheme();

    const baseClasses =
        "flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold transition duration-300 w-full text-base whitespace-nowrap uppercase tracking-wider min-w-[150px]";

    // FIX: Changed 'let' to 'const' for customStyle as it is never reassigned.
    let styleClasses;
    const customStyle = {};

    // 🌟 COLOR-LESS BUTTONS IMPLEMENTATION 🌟
    if (theme === "dark") {
        // DARK MODE COLOR-LESS STYLES
        const primaryClasses =
            "text-white border border-gray-600 bg-gray-900/50 backdrop-blur-sm " +
            "hover:bg-gray-700/80 hover:border-cyan-400 transform hover:scale-[1.05] shadow-lg shadow-black/50";

        const secondaryClasses =
            "text-gray-300 border border-gray-700 bg-black/30 backdrop-blur-md " +
            "hover:text-white hover:border-gray-500 transform hover:scale-[1.02] shadow-inner shadow-black/70";

        styleClasses = primary ? primaryClasses : secondaryClasses;
    } else {
        // 🔆 LIGHT MODE COLOR-LESS STYLES
        const primaryClasses =
            "text-gray-800 border border-gray-300 bg-white shadow-lg shadow-gray-200/50 " +
            "hover:text-indigo-600 hover:border-indigo-400 transform hover:scale-[1.05]";

        const secondaryClasses =
            "text-gray-700 border border-gray-300 bg-white/70 backdrop-blur-sm " +
            "hover:text-gray-900 hover:border-gray-400 transform hover:scale-[1.02] shadow-md";

        styleClasses = primary ? primaryClasses : secondaryClasses;
    }

    return (
        <a
            href={href}
            className={`${baseClasses} ${styleClasses}`}
            style={customStyle}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </a>
    );
};

// Sub-line Component (Learn. Build. Deploy. Scale.)
const SubLine: React.FC = () => {
    // 👈 Get Theme Here
    const { theme } = useTheme();

    const lightTextColor = theme === "light" ? "text-gray-700" : "text-white";

    const getGlowStyle = (index: number) => {
        if (theme === "light") {
            return {
                textShadow:
                    index % 2 === 0
                        ? "0 0 5px rgba(0, 100, 255, 0.5)" // Blue
                        : "0 0 5px rgba(255, 0, 150, 0.5)", // Pink
            };
        }
        // Original Dark Mode Styles
        return {
            textShadow:
                index % 2 === 0
                    ? "0 0 8px #7b00ff" // Primary Purple
                    : "0 0 8px #05d9e8", // Secondary Cyan
        };
    };

    return (
        <div className="fade-up-2 flex justify-center space-x-4 md:space-x-8 mt-6 text-xl md:text-3xl font-light text-gray-400 tracking-wider">
            {["Learn.", "Build.", "Deploy.", "Scale."].map((word, index) => (
                <span
                    key={word}
                    className={`${lightTextColor} font-medium`} // Dynamic text color
                    style={{
                        animation: `fade-up 1s ease-out forwards ${1.2 + index * 0.15}s`,
                        opacity: 0,
                        ...getGlowStyle(index), // Dynamic glow
                    }}
                >
                    {word}
                </span>
            ))}
        </div>
    );
};

// Helper Component for each stage in the Funnel Visual
interface FunnelStageProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    detail: string;
    delay: number;
    colorClass: string;
    positionClass: string;
}

const FunnelStage: React.FC<FunnelStageProps> = ({
    icon: Icon,
    label,
    detail,
    delay,
    colorClass,
    positionClass,
}) => {
    // 👈 Get Theme Here
    const { theme } = useTheme();

    // Dynamic classes for the content box and node styling
    const contentBoxClasses =
        theme === "dark"
            ? `flex flex-col p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm bg-black/40 transform transition duration-300 hover:scale-[1.02] hover:border-cyan-400 max-w-[calc(50%-20px)] w-full`
            : `flex flex-col p-4 rounded-xl border border-gray-300 backdrop-blur-sm bg-white/70 transform transition duration-300 hover:scale-[1.02] hover:border-indigo-400 max-w-[calc(50%-20px)] w-full`;

    const nodeBaseClasses =
        theme === "dark"
            ? `flex-shrink-0 w-10 h-10 rounded-full bg-[#0d0617] border-4 border-[#0d0617] relative z-10 mx-auto ${colorClass
                    .replace("text-", "shadow-")
                    .replace("-400", "500")} stage-node`
            : `flex-shrink-0 w-10 h-10 rounded-full bg-white border-4 border-white relative z-10 mx-auto ${colorClass
                    .replace("text-cyan-400", "text-blue-600 shadow-blue-500")
                    .replace("text-purple-400", "text-indigo-600 shadow-indigo-500")
                    .replace(
                        "text-white",
                        "text-gray-800 shadow-gray-400"
                    )} stage-node-light`;

    const textClasses =
        theme === "dark"
            ? "font-bold text-white text-lg flex items-center"
            : "font-bold text-gray-800 text-lg flex items-center";

    const detailClasses =
        theme === "dark"
            ? "text-gray-400 text-sm mt-1"
            : "text-gray-600 text-sm mt-1";

    return (
        <div
            className={`flex items-center w-full my-8 fade-up-stage ${positionClass}`}
            style={{ animationDelay: `${2.0 + delay}s`, opacity: 0 }}
        >
            {/* Stage Content Box */}
            <div className={contentBoxClasses}>
                <p className={textClasses}>
                    <Icon className={`w-5 h-5 mr-2 ${colorClass}`} />
                    {label}
                </p>
                <p className={detailClasses}>{detail}</p>
            </div>
            {/* Icon & Glow Node */}
            <div className={nodeBaseClasses}>
                <Icon className={`w-6 h-6 m-2 ${colorClass}`} />
            </div>
        </div>
    );
};

// Main Visual Component (Engineering Funnel)
const EngineeringFunnelVisual: React.FC = () => {
    // 👈 Get Theme Here
    const { theme } = useTheme();

    const verticalLineClasses =
        theme === "dark"
            ? "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-700 to-white/50 opacity-30 pointer-events-none z-0"
            : "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-blue-400 via-indigo-600 to-gray-400 opacity-30 pointer-events-none z-0";

    return (
        <div className="relative w-full max-w-lg mx-auto my-12 md:my-20">
            {/* Stage 1: Skill Mastery */}
            <FunnelStage
                icon={Target}
                label="Skill Mastery"
                detail="Acquire core technical knowledge and foundational skills."
                delay={0.0}
                colorClass="text-cyan-400"
                positionClass="justify-start pr-10"
            />
            {/* Stage 2: Product Architect */}
            <FunnelStage
                icon={Layers}
                label="Product Architect"
                detail="Implement full-stack solutions and design scalable cloud architecture."
                delay={0.3}
                colorClass="text-purple-400"
                positionClass="justify-end pl-10 flex-row-reverse"
            />
            {/* Stage 3: Venture Launchpad */}
            <FunnelStage
                icon={Zap}
                label="Venture Launchpad"
                detail="Become a domain expert and launch your P2P-powered business."
                delay={0.6}
                colorClass="text-white"
                positionClass="justify-start pr-10"
            />
            {/* Vertical Line Connector - Dynamic Class */}
            <div className={verticalLineClasses}></div>
        </div>
    );
};

// ========================================================================
// 3. HERO SECTION MAIN COMPONENT
// ========================================================================

const HeroSection: React.FC = () => {
    // 👈 Get Theme State (The only access needed to the shared context)
    const { theme } = useTheme();

    // 3. Define Main Container Classes
    const containerClasses =
        theme === "dark"
            ? "bg-[#0d0617] min-h-screen flex flex-col items-center relative overflow-hidden font-inter"
            : "bg-white min-h-screen flex flex-col items-center relative overflow-hidden font-inter";

    // 4. Adjust custom styles and variables based on theme
    const customStyles = `
        :root {
            --primary-glow: ${
                theme === "dark" ? "#7b00ff" : "#007bff"
            }; /* Purple or Blue */
            --secondary-glow: ${
                theme === "dark" ? "#05d9e8" : "#e805d9"
            }; /* Cyan or Pink */
            --dark-bg: ${
                theme === "dark" ? "#0d0617" : "#ffffff"
            }; /* Deep Space or White */
            --text-color: ${theme === "dark" ? "white" : "black"};
        }

        /* 1. Keyframe for the Pulsing Text Glow */
        @keyframes text-pulse {
            0%, 100% {
                text-shadow: 0 0 3px var(--text-color), 0 0 10px var(--primary-glow), 0 0 20px var(--secondary-glow);
                transform: scale(1);
            }
            50% {
                text-shadow: 0 0 6px var(--text-color), 0 0 20px var(--primary-glow), 0 0 35px var(--secondary-glow);
                transform: scale(1.005);
            }
        }
        /* 2. Keyframe for Text Fade Up and other unchanged keyframes */
        @keyframes fade-up {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        /* Keyframe for Stage Fade Up */
        .fade-up-stage {
            opacity: 0;
            animation: fade-up 0.8s ease-out forwards;
        }

        /* Styling for the glow effect on stage nodes */
        .stage-node {
            box-shadow: 0 0 10px 5px ${
                theme === "dark" ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.1)"
            };
        }
        /* Dark Mode Specific Glows (Original) */
        ${
            theme === "dark"
                ? `
            .text-cyan-400.stage-node { box-shadow: 0 0 15px 5px rgba(5, 217, 232, 0.5); }
            .text-purple-400.stage-node { box-shadow: 0 0 15px 5px rgba(123, 0, 255, 0.5); }
            .text-white.stage-node { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.4); }
        `
                : `
            /* Light Mode Subtle Glows */
            .text-cyan-400.stage-node-light { box-shadow: 0 0 15px 5px rgba(0, 100, 255, 0.2); }
            .text-purple-400.stage-node-light { box-shadow: 0 0 15px 5px rgba(150, 0, 255, 0.2); }
            .text-white.stage-node-light { box-shadow: 0 0 15px 5px rgba(0, 0, 0, 0.1); }
        `
        }
        
        /* Rest of the background animations and styling */
        @keyframes rotate-subtle { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes drift { from { background-position: 0 0; } to { background-position: 100% 100%; } }
        
        .animated-glow {
            color: var(--text-color);
            animation: text-pulse 3s infinite ease-in-out;
            font-family: 'Inter', sans-serif;
            line-height: 1.1;
        }
        
        .fade-up-1 { opacity: 0; animation: fade-up 1s ease-out forwards 0.5s; }
        .fade-up-2 { opacity: 0; animation: fade-up 1s ease-out forwards 1.0s; }
        .fade-up-3 { opacity: 0; animation: fade-up 1s ease-out forwards 2.5s; }

        .platform-base {
            position: absolute; bottom: -150px; left: 50%; width: 800px; height: 800px; border-radius: 50%;
            background: radial-gradient(circle at center, ${
                theme === "dark"
                    ? "rgba(30, 0, 70, 0.2)"
                    : "rgba(200, 200, 255, 0.2)"
            } 0%, rgba(0, 0, 0, 0) 60%);
            box-shadow: 0 0 100px var(--primary-glow), 0 0 200px var(--secondary-glow);
            border-top: 5px solid ${
                theme === "dark" ? "rgba(123, 0, 255, 0.4)" : "rgba(0, 100, 255, 0.4)"
            }; z-index: 0;
            animation: rotate-subtle 60s linear infinite;
        }

        .particle-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: radial-gradient(circle at center, rgba(255, 255, 255, ${
                theme === "dark" ? "0.05" : "0.15"
            }) 1px, transparent 1px);
            background-size: 5px 5px; opacity: ${
                theme === "dark" ? "0.5" : "0.3"
            }; z-index: 0;
            animation: drift 120s linear infinite;
        }
    `;

    // Header link text and class (Header already handles the background color from ThemeContext)
    const headerLinkClasses =
        theme === "dark"
            ? "inline-flex items-center space-x-2 text-white bg-purple-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/50 shadow-lg shadow-purple-900/50 cursor-pointer transition duration-300 hover:scale-[1.02] hover:shadow-purple-400/30"
            : "inline-flex items-center space-x-2 text-gray-800 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-400/50 shadow-lg shadow-indigo-300/50 cursor-pointer transition duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";

    const scrollTextClasses =
        theme === "dark"
            ? "text-gray-600 text-xs tracking-widest uppercase"
            : "text-gray-400 text-xs tracking-widest uppercase";

    const scrollIconClasses =
        theme === "dark"
            ? "w-5 h-5 text-gray-500 mt-1 animate-bounce"
            : "w-5 h-5 text-gray-500 mt-1 animate-bounce";

    return (
        <div className={containerClasses}>
            {/* Inject Custom CSS for Animations and Glow */}
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />
            {/* Background Elements */}
            {/* <div className="platform-base"></div> */}
            <div className="particle-overlay"></div>
            
            {/* Header/Nav Placeholder */}
            <header className="absolute top-0 w-full p-6 md:p-8 z-20 flex justify-between items-center max-w-7xl mx-auto">
                <a
                    href="https://www.p2pclouds.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={headerLinkClasses}
                >
                    <p className="text-sm font-semibold ">P2PClouds.com</p>
                    <Cloud
                        className={`w-4 h-4 ${
                            theme === "dark" ? "text-cyan-400" : "text-indigo-600"
                        }`}
                    />
                </a>

                {/* The Theme Toggle Button is in Header.tsx and calls toggleTheme() */}
            </header>

            {/* Hero Content Area */}
            <section className="relative flex flex-col items-center justify-center pt-48 pb-16 px-4 max-w-7xl w-full z-10 min-h-[100vh]">
                {/* 1. Clear Tagline */}
                <h1
                    className="animated-glow text-center tracking-tight font-extrabold fade-up-1"
                    style={{ fontSize: "clamp(2.5rem, 4vw, 4.5rem)" }}
                >
                    Master Your Destiny: From Beginner to 
                    <br className="hidden md:block" />
                    <span
                        className={`text-indigo-400 ${
                            theme === "light" ? "dark:text-indigo-600" : ""
                        }`}
                    >
                        Domain Expert Powered by Skillustad
                    </span>
                </h1>
                {/* 2. Sub-line: Learn. Build. Deploy. Scale. */}
                <SubLine />
                {/* 5. Highlight Text and Funnel Flow */}
                <div
                    className="text-center mt-8 fade-up-2"
                    style={{ animationDelay: "1.8s" }}
                >
                    <p
                        className={`text-sm md:text-base font-medium italic ${
                            theme === "dark" ? "text-gray-500" : "text-gray-500"
                        }`}
                    >
                        Learn Practical by Internship, via Mabsoltech
                    </p>
                    {/* Funnel Flow */}
                    <div
                        className={`flex items-center justify-center mt-2 space-x-2 text-sm md:text-base font-semibold ${
                            theme === "light" ? "text-gray-800" : ""
                        }`}
                    >
                        <span
                            className={`${
                                theme === "dark" ? "text-cyan-400" : "text-blue-600"
                            }`}
                        >
                            SKILL MASTERY
                        </span>
                        <ArrowRight
                            className={`w-4 h-4 ${
                                theme === "dark" ? "text-purple-400" : "text-indigo-600"
                            }`}
                        />
                        <span
                            className={`${
                                theme === "dark" ? "text-purple-400" : "text-indigo-600"
                            }`}
                        >
                            PRODUCT ARCHITECT
                        </span>
                        <ArrowRight
                            className={`w-4 h-4 ${
                                theme === "dark" ? "text-cyan-400" : "text-blue-600"
                            }`}
                        />
                        <span
                            className={`${theme === "dark" ? "text-white" : "text-gray-800"}`}
                        >
                            VENTURE LAUNCHPAD
                        </span>
                    </div>
                </div>
                {/* 3. Engineering Funnel Visual */}
                <EngineeringFunnelVisual />
                {/* 4. Quick CTAs Grid (Now Links) */}
                <div
                    className="fade-up-3 w-full max-w-4xl pt-8 pb-12"
                    style={{ animationDelay: "2.5s" }}
                >
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        {/* CTA 1: Docs (Primary Action) - UPDATED HREF */}
                        <QuickCTA
                            label="Explore Docs"
                            icon={FileText}
                            primary={true}
                            href="/exploredocs" // <--- UPDATED LINK
                        />
                        {/* CTA 2: Courses (Primary Action) */}
                        <QuickCTA
                            label="Learn Courses"
                            icon={GraduationCap}
                            primary={true}
                            href="https://skillustad.com/courses"
                        />
                        {/* CTA 3: Roadmaps (Secondary Action) */}
                        <QuickCTA
                            label="View Roadmaps"
                            icon={Map}
                            href="https://www.p2pclouds.com/roadmaps"
                        />
                        {/* CTA 4: Free Softwares (Secondary Action) */}
                        <QuickCTA
                            label="Softwares"
                            icon={Download}
                            href="/free-softwares"
                        />
                    </div>
                </div>
                {/* Scroll Down Indicator */}
                <div className="absolute bottom-5 flex flex-col items-center">
                    <p className={scrollTextClasses}>Explore Funnel</p>
                    <ChevronDown className={scrollIconClasses} />
                </div>
            </section>
        </div>
    );
};

// ========================================================================
// 4. WRAPPER COMPONENT FOR EXPORT (REMOVED: The external ThemeProvider now wraps this)
// ========================================================================
// Export the main component
export default HeroSection;
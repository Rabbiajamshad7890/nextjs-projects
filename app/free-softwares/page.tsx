"use client";
import React, { FC } from 'react';
import { DownloadCloud, Code, GitBranch, Terminal, ArrowRight, Laptop, Zap, Github } from 'lucide-react';

// ========================================================================
// --- THEME CONTEXT IMPORT (AS REQUESTED)
// NOTE: This uses the required external path.
// ========================================================================
import { useTheme } from '@/app/Context/ThemeContext'; 

// ========================================================================
// --- TYPE DEFINITIONS (Defined locally for internal type safety)
// These types are necessary for the component's internal logic to compile, 
// assuming the external ThemeContext provides this structure.
// ========================================================================

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}


// ========================================================================
// 1. DATA STRUCTURE (TypeScript)
// ========================================================================

interface Tool {
    name: string;
    description: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    link: string;
    accentColor: string;
    tag: string;
}

const TOOLS: Tool[] = [
    {
        name: "Visual Studio Code (VS Code)",
        description: "The lightweight, yet powerful source code editor that runs on your desktop. Essential for web development.",
        icon: Code,
        link: "https://code.visualstudio.com/download", 
        accentColor: "text-blue-400",
        tag: "Code Editor"
    },
    {
        name: "Git",
        description: "The standard distributed version control system for tracking changes in source code. Mandatory for collaboration.",
        icon: GitBranch,
        link: "https://git-scm.com/downloads", 
        accentColor: "text-orange-500",
        tag: "Version Control"
    },
    {
        name: "Node.js (LTS)",
        description: "A JavaScript runtime built on Chrome's V8 engine. Required for running modern backend servers and frontend tooling.",
        icon: Terminal,
        link: "https://nodejs.org/en/download/", 
        accentColor: "text-green-500",
        tag: "Runtime Environment"
    },
    {
        name: "GitHub Desktop",
        description: "An open-source Electron-based application to use Git features without the command line. Great for beginners.",
        icon: Github,
        link: "https://desktop.github.com/", 
        accentColor: "text-purple-400",
        tag: "GUI Client"
    }
];

// ========================================================================
// 2. CHILD COMPONENT (ToolCard)
// ========================================================================

interface ToolCardProps {
    tool: Tool;
    theme: Theme;
}

const ToolCard: React.FC<ToolCardProps> = ({ tool, theme }) => {
    const Icon = tool.icon;
    
    // Conditional styling based on theme
    const cardBaseClasses = theme === 'dark'
        ? {
            bg: 'bg-black/40 border-gray-700/50 shadow-purple-900/40',
            hover: 'hover:border-cyan-400/80 hover:bg-black/50',
            textColor: 'text-white',
            descColor: 'text-gray-400',
            iconBorder: 'border-gray-700',
            tagBg: 'bg-purple-700/30 text-purple-300 border-purple-500/50',
            }
        : {
            bg: 'bg-white border-gray-200/50 shadow-md shadow-gray-200/40',
            hover: 'hover:border-blue-500/80 hover:bg-gray-50',
            textColor: 'text-gray-900',
            descColor: 'text-gray-600',
            iconBorder: 'border-gray-300',
            tagBg: 'bg-purple-100/70 text-purple-700 border-purple-300/50',
        };

    return (
        // Apply theme-dependent card classes
        <div className={`group flex flex-col p-6 rounded-2xl border shadow-2xl 
                         transition duration-500 hover:scale-[1.03]
                         ${cardBaseClasses.bg} ${cardBaseClasses.hover}`}>
            
            <div className="flex items-center justify-between">
                {/* Icon & Name */}
                <div className="flex items-center space-x-3">
                    <div className={`p-3 rounded-xl ${tool.accentColor.replace('text', 'bg').replace('-400', '-900/50')} ${tool.accentColor} border ${cardBaseClasses.iconBorder}`}>
                        <Icon className="w-6 h-6" />
                    </div>
                    <h3 className={`text-xl font-bold ${cardBaseClasses.textColor} group-hover:text-cyan-400 transition duration-300`}>{tool.name}</h3>
                </div>
                
                {/* Tag */}
                <span className={`text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap ${cardBaseClasses.tagBg}`}>
                    {tool.tag}
                </span>
            </div>

            {/* Description */}
            <p className={`mt-4 ${cardBaseClasses.descColor} flex-grow text-sm`}>{tool.description}</p>
            
            {/* Download Button (Fixed style for high CTA impact) */}
            <a 
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-6 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold text-white uppercase tracking-wider text-sm 
                            bg-gradient-to-r from-purple-600 to-cyan-500 transition duration-300 shadow-lg ${tool.accentColor.replace('text', 'shadow')}-600/50
                            hover:from-purple-500 hover:to-cyan-400 hover:scale-[1.01]`}
            >
                <DownloadCloud className="w-4 h-4" />
                <span>Download Official Installer</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
            </a>
        </div>
    );
};

// ========================================================================
// 3. MAIN COMPONENT (Updated for Theme Awareness)
// ========================================================================

const FreeSoftwarePage: React.FC = () => {
    // 1. Get the current theme state using the external hook and cast it to the local type
    const { theme } = useTheme() as ThemeContextType;

    // 2. Define theme-dependent container and text classes
    const sectionClasses = theme === 'dark' 
        ? 'bg-[#0d0617] text-white' // Deep space background
        : 'bg-gray-50 text-gray-900'; // Light, off-white background
    
    const subtextColor = theme === 'dark' 
        ? 'text-gray-400' 
        : 'text-gray-600';

    const chipBgClass = theme === 'dark'
        ? 'bg-cyan-700/30 text-cyan-300 border border-cyan-500/50 shadow-cyan-900/50'
        : 'bg-cyan-100 text-cyan-700 border border-cyan-300 shadow-cyan-300/50';

    const headerTitleClass = theme === 'dark' ? 'text-white' : 'text-gray-900';

    // Custom CSS for animations and font 
    const customStyles = `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.8s ease-out forwards;
        }
    `;

    return (
        // Apply theme-dependent outer class
        <div className={`${sectionClasses} min-h-screen pt-24 pb-16 px-4 md:px-8 font-inter relative overflow-hidden transition-colors duration-500`}>
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Decorative Background Elements (Theme-Aware Glow) */}
            <div className={`absolute top-0 left-0 w-full h-full pointer-events-none transition-opacity duration-500 
                             ${theme === 'dark' ? 'opacity-5' : 'opacity-[0.03]'}`} 
                // Adjusting the radial gradient color based on theme for a softer glow in light mode
                style={{backgroundImage: `radial-gradient(circle at center, rgba(${theme === 'dark' ? '123, 0, 255, 0.4' : '0, 150, 255, 0.2'}) 0%, rgba(0, 0, 0, 0) 60%)`}}>
            </div>

            {/* Header */}
            <header className="max-w-4xl mx-auto text-center mb-12 animate-fade-in" style={{animationDelay: '0.1s'}}>
                <span className={`inline-flex items-center text-sm font-medium px-4 py-1 rounded-full shadow-md ${chipBgClass}`}>
                    <Laptop className="w-4 h-4 mr-2" />
                    Essential Tools
                </span>
                <h1 className={`mt-4 text-4xl md:text-5xl font-extrabold ${headerTitleClass} tracking-tight leading-tight`}>
                    Free Software & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">Developer Stack</span>
                </h1>
                <p className={`mt-4 text-lg ${subtextColor}`}>
                    Your journey starts with the right setup. Download these mandatory, free tools to begin your Skillustad learning and building process.
                </p>
            </header>

            {/* Tools Grid */}
            <main className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                    {TOOLS.map((tool, index) => (
                        <div 
                            key={tool.name} 
                            className="animate-fade-in" 
                            style={{ animationDelay: `${0.3 + index * 0.15}s` }}
                        >
                            <ToolCard tool={tool} theme={theme} />
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer Note */}
            <footer className="mt-16 text-center max-w-xl mx-auto pt-8 border-t border-gray-800/50 animate-fade-in" style={{animationDelay: '1.0s'}}>
                <p className={`text-sm ${subtextColor} flex items-center justify-center space-x-2`}>
                    <Zap className="w-4 h-4 text-purple-500" />
                    <span>All links point to official vendor download sites.</span>
                </p>
            </footer>

        </div>
    );
};

export default FreeSoftwarePage;

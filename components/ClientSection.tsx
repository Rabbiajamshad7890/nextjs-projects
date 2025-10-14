'use client';

import React, { FC } from 'react';
import { useTheme } from "@/app/Context/ThemeContext";

// --- Custom Inline SVGs to simulate unique logos ---

// Define a simple structure for the logo component properties
type IconProps = { className?: string, color: string };

// SVG 1: A multi-layered Box/Cube icon
const IconBox = ({ className = "w-8 h-8", color }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3m18 0v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8m18 0H3m12 11V8"/>
        <rect x="3" y="16" width="18" height="5" rx="2"/>
    </svg>
);

// SVG 2: A Network/Connection icon
const IconNetwork = ({ className = "w-8 h-8", color }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/>
        <line x1="8.59" y1="13.51" x2="15.42" y2="10.49"/><line x1="15.41" y1="13.51" x2="8.59" y2="10.49"/>
    </svg>
);

// SVG 3: A Gear/Settings icon
const IconGear = ({ className = "w-8 h-8", color }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V12a1.65 1.65 0 0 0 1.51 1z"/>
    </svg>
);


// --- Configuration & Data ---

/**
 * Defines a structure that includes the client name, subtitle, logo component, and color.
 */
interface ClientData {
    name: string;
    Icon: FC<IconProps>;
    color: string;
    subtitle: string;
}

const clients: string[] = [
    'Telnyx', 
    'Maxcool', 
    'Arfa Karim Technology Incubator', 
    'Ideoversity', 
    'Pakistan Skill Development Fund (PSDF)', 
    'NeXskill', 
    'Epic Pakistan', 
    'Pakistan Blockchain Institute (PBI)', 
    'Organicure', 
    'Aromaa X',
];

const IconMap = [IconBox, IconNetwork, IconGear];
// Array of neon-style colors to cycle through
const NeonColors = ['#00FFFF', '#FFD700', '#FF4500', '#1E90FF', '#32CD32', '#9400D3', '#FF6347', '#00FA9A', '#BA55D3', '#FFA07A'];

/**
 * Maps client names to structured data including a rotating icon, color, and subtitle.
 */
const clientLogos: ClientData[] = clients.map((name, index) => {
    const iconIndex = index % IconMap.length;
    const Icon = IconMap[iconIndex];

    let subtitle = 'Tech Solutions Partner';
    if (name.includes('Institute') || name.includes('Fund')) {
        subtitle = 'Development & Incubation';
    } else if (name.includes('Organicure') || name.includes('Aromaa X')) {
        subtitle = 'Product & Retail';
    }
    
    return {
        name,
        Icon: Icon, 
        color: NeonColors[index % NeonColors.length], 
        subtitle: subtitle,
    };
});


// --- Main Component ---

export const ClientMarqueeSection: FC = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    // Define dynamic colors based on theme
    const sectionBgColor = isDark ? 'bg-[#0d0617]' : 'bg-gray-100'; // Deep background
    const cardBgColor = isDark ? 'bg-[#1a0f2b]' : 'bg-white'; // Card background
    const primaryTextColor = isDark ? 'text-white' : 'text-gray-900';
    const secondaryTextColor = isDark ? 'text-gray-400' : 'text-gray-600';
    const secondaryHighlightColor = isDark ? 'text-purple-400' : 'text-indigo-600';
    // Use a purple/cyan shadow to mimic the neon glow effect
    const neonShadow = isDark ? 'shadow-2xl shadow-purple-500/50' : 'shadow-xl shadow-gray-400/20';
    const clientNameColor = isDark ? 'text-gray-100' : 'text-gray-800';
    const clientSubtitleColor = isDark ? 'text-gray-400' : 'text-gray-500';

    // --- Render ---

    return (
        <section className={`${sectionBgColor} ${primaryTextColor} py-12 px-4 sm:px-6 lg:px-8 font-inter`}>
            <div className="max-w-7xl mx-auto">

                {/* --- Header --- */}
                <div className="flex flex-col justify-center items-center mb-10 text-center">
                    <h3 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${primaryTextColor}`}>
                        Trusted by Leading <span className={secondaryHighlightColor}>Organizations</span>
                    </h3>
                    <p className={`text-lg ${secondaryTextColor} max-w-2xl mx-auto`}>
                        We partner with national and international clients to drive innovation and success.
                    </p>
                </div>

                {/* --- Client Marquee Section --- */}
                <div className="mt-8">
                    
                    {/* Marquee Container */}
                    <div className={`relative overflow-hidden py-4 border-y border-purple-500/10`}>
                        <div className="marquee-content flex space-x-8 animate-marquee">
                            {/* Duplicate the client list multiple times to ensure continuous scrolling */}
                            {[...clientLogos, ...clientLogos, ...clientLogos].map((client, index) => (
                                <div 
                                    key={index} 
                                    // Card styling updated for glow and stacked content
                                    className={`flex-shrink-0 p-4 rounded-xl flex flex-col items-center justify-center space-y-2
                                                h-40 w-52 min-w-[13rem] transition-all duration-300 cursor-pointer 
                                                opacity-90 hover:opacity-100 hover:scale-[1.03]
                                                ${cardBgColor}
                                                // Stronger shadow effect to mimic the neon glow
                                                border border-purple-500/20 
                                                ${neonShadow}
                                            `}
                                >
                                    {/* 1. Client Icon/Logo (SVG) */}
                                    <div className="mb-2">
                                        <client.Icon 
                                            // The icon component receives the client's unique neon color
                                            color={client.color} 
                                            className="w-10 h-10" 
                                        />
                                    </div>
                                    
                                    {/* 2. Client Name (Mini Card Title) */}
                                    <p className={`text-sm font-bold text-center ${clientNameColor} leading-tight`}>
                                        {client.name}
                                    </p>
                                    
                                    {/* 3. Subtitle/Tagline */}
                                    <p className={`text-[0.65rem] font-medium text-center ${clientSubtitleColor} opacity-70`}>
                                        {client.subtitle}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Custom style for CSS Marquee animation */}
            <style>{`
                /* Marquee Animation Keyframes */
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-33.3333%); } /* Scrolls one third of the content width */
                }

                .marquee-content {
                    animation: marquee 35s linear infinite; /* Increased duration for smoother speed */
                }
                .marquee-content:hover {
                    animation-play-state: paused; /* Pause on hover */
                }
            `}</style>
        </section>
    );
};

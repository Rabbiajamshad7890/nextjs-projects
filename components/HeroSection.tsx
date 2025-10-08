"use client";
import React from 'react';
import { ChevronDown, Cloud, FileText, Smartphone, Map, GraduationCap, ArrowRight, Target, Layers, Zap } from 'lucide-react';
//

// NOTE: External sections like ProductsSection, ProcessSection etc., are commented out
// but should be imported and defined if they exist in your actual project structure.

// ========================================================================
// 1. HERO SECTION COMPONENTS
// ========================================================================

// --- Professional CTA Button Component ---
interface QuickCTAProps {
    label: string;
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    primary?: boolean;
}

const QuickCTA: React.FC<QuickCTAProps> = ({ label, icon: Icon, primary = false }) => {
    const baseClasses = "flex items-center justify-center space-x-2 px-6 py-4 rounded-xl font-bold transition duration-300 w-full text-base whitespace-nowrap uppercase tracking-wider min-w-[150px]";
    
    // Primary Style: Vibrant, solid gradient with strong shadow and hover effect
    const primaryClasses = "text-white shadow-2xl shadow-purple-600/50 " +
        "bg-gradient-to-br from-purple-700 to-cyan-500 " +
        "hover:from-purple-600 hover:to-cyan-400 transform hover:scale-[1.05]";

    // Secondary Style: Ghost/Outline with backdrop blur and subtle border glow
    const secondaryClasses = "text-gray-300 border border-purple-500/50 bg-black/30 backdrop-blur-md " +
        "hover:text-white hover:border-cyan-400/80 shadow-inner shadow-black/70 transform hover:scale-[1.02]";

    return (
        <button 
            className={`${baseClasses} ${primary ? primaryClasses : secondaryClasses}`}
            style={primary ? { boxShadow: '0 0 15px rgba(123, 0, 255, 0.4)' } : {}}
        >
            <Icon className="w-5 h-5" />
            <span>{label}</span>
        </button>
    );
};

// Sub-line Component (Learn. Build. Deploy. Scale.)
const SubLine: React.FC = () => (
    <div className="fade-up-2 flex justify-center space-x-4 md:space-x-8 mt-6 text-xl md:text-3xl font-light text-gray-400 tracking-wider">
        {['Learn.', 'Build.', 'Deploy.', 'Scale.'].map((word, index) => (
            <span 
                key={word} 
                className="text-white font-medium" 
                style={{
                    animation: `fade-up 1s ease-out forwards ${1.2 + index * 0.15}s`,
                    opacity: 0,
                    // Using pure CSS glow for a more subtle look
                    textShadow: index % 2 === 0 
                        ? '0 0 8px #7b00ff' 
                        : '0 0 8px #05d9e8',
                }}
            >
                {word}
            </span>
        ))}
    </div>
);

// Helper Component for each stage in the Funnel Visual
interface FunnelStageProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    label: string;
    detail: string;
    delay: number;
    colorClass: string;
    positionClass: string;
}

const FunnelStage: React.FC<FunnelStageProps> = ({ icon: Icon, label, detail, delay, colorClass, positionClass }) => (
    <div 
        className={`flex items-center w-full my-8 fade-up-stage ${positionClass}`} 
        style={{ animationDelay: `${2.0 + delay}s`, opacity: 0 }}
    >
        {/* Stage Content Box */}
        <div className={`flex flex-col p-4 rounded-xl border border-gray-700/50 backdrop-blur-sm bg-black/40 transform transition duration-300 hover:scale-[1.02] hover:border-cyan-400 max-w-[calc(50%-20px)] w-full`}>
            <p className="font-bold text-white text-lg flex items-center">
                <Icon className={`w-5 h-5 mr-2 ${colorClass}`} />
                {label}
            </p>
            <p className="text-gray-400 text-sm mt-1">{detail}</p>
        </div>
        
        {/* Icon & Glow Node - Visually connects the stages */}
        <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-[#0d0617] border-4 border-[#0d0617] relative z-10 mx-auto ${colorClass.replace('text-', 'shadow-').replace('-400', '500')} stage-node`} >
            <Icon className={`w-6 h-6 m-2 ${colorClass}`} />
        </div>
    </div>
);

// Main Visual Component (Engineering Funnel)
const EngineeringFunnelVisual: React.FC = () => (
    <div className="relative w-full max-w-lg mx-auto my-12 md:my-20">
        
        {/* Stage 1: Beginner - Aligned Right */}
        <FunnelStage 
            icon={Target} 
            label="Beginner" 
            detail="Foundation & Core Skills via Skillustad" 
            delay={0.0} 
            colorClass="text-cyan-400"
            positionClass="justify-start pr-10"
        />

        {/* Stage 2: Advanced - Aligned Left */}
        <FunnelStage 
            icon={Layers} 
            label="Advanced" 
            detail="Full-Stack & Cloud Architecture" 
            delay={0.3} 
            colorClass="text-purple-400" 
            positionClass="justify-end pl-10 flex-row-reverse"
        />

        {/* Stage 3: Expert - Aligned Right */}
        <FunnelStage 
            icon={Zap} 
            label="Expert" 
            detail="AI/ML Deployment with P2P Products" 
            delay={0.6} 
            colorClass="text-white"
            positionClass="justify-start pr-10"
        />
        {/* Vertical Line Connector (Absolute positioning for visual flow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-b from-cyan-500 via-purple-700 to-white/50 opacity-30 pointer-events-none z-0"></div>
    </div>
);


// ========================================================================
// 2. MAIN COMPONENT (Hero Section Only)
// ========================================================================

const HeroSection: React.FC = () => {
    // --- Custom CSS for Keyframes and Aesthetics ---
    const customStyles = `
        :root {
            --primary-glow: #7b00ff; /* Purple */
            --secondary-glow: #05d9e8; /* Cyan Blue */
            --dark-bg: #0d0617; /* Deep Space */
        }

        /* 1. Keyframe for the Pulsing Text Glow (White Version) */
        @keyframes text-pulse {
            0%, 100% {
                text-shadow: 0 0 3px rgba(255, 255, 255, 1), 0 0 10px var(--primary-glow), 0 0 20px var(--secondary-glow);
                transform: scale(1);
            }
            50% {
                text-shadow: 0 0 6px rgba(255, 255, 255, 1), 0 0 20px var(--primary-glow), 0 0 35px var(--secondary-glow);
                transform: scale(1.005);
            }
        }

        /* 2. Keyframe for Text Fade Up */
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
            box-shadow: 0 0 10px 5px rgba(0, 0, 0, 0.5);
        }
        .text-cyan-400.stage-node { box-shadow: 0 0 15px 5px rgba(5, 217, 232, 0.5); }
        .text-purple-400.stage-node { box-shadow: 0 0 15px 5px rgba(123, 0, 255, 0.5); }
        .text-white.stage-node { box-shadow: 0 0 15px 5px rgba(255, 255, 255, 0.4); }

        /* Rest of the background animations and styling */
        @keyframes rotate-subtle { from { transform: translateX(-50%) rotate(0deg); } to { transform: translateX(-50%) rotate(360deg); } }
        @keyframes drift { from { background-position: 0 0; } to { background-position: 100% 100%; } }
        
        .animated-glow {
            color: white; 
            animation: text-pulse 3s infinite ease-in-out;
            font-family: 'Inter', sans-serif;
            line-height: 1.1; 
        }
        
        .fade-up-1 { opacity: 0; animation: fade-up 1s ease-out forwards 0.5s; }
        .fade-up-2 { opacity: 0; animation: fade-up 1s ease-out forwards 1.0s; }
        .fade-up-3 { opacity: 0; animation: fade-up 1s ease-out forwards 2.5s; } 

        .platform-base {
            position: absolute; bottom: -150px; left: 50%; width: 800px; height: 800px; border-radius: 50%;
            background: radial-gradient(circle at center, rgba(30, 0, 70, 0.2) 0%, rgba(0, 0, 0, 0) 60%);
            box-shadow: 0 0 100px var(--primary-glow), 0 0 200px var(--secondary-glow);
            border-top: 5px solid rgba(123, 0, 255, 0.4); z-index: 0;
            animation: rotate-subtle 60s linear infinite;
        }

        .particle-overlay {
            position: absolute; top: 0; left: 0; width: 100%; height: 100%;
            background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
            background-size: 5px 5px; opacity: 0.5; z-index: 0;
            animation: drift 120s linear infinite;
        }
    `;

    return (
        <div className="bg-[#0d0617] min-h-screen flex flex-col items-center relative overflow-hidden font-inter">
            
            {/* Inject Custom CSS for Animations and Glow */}
            <style dangerouslySetInnerHTML={{ __html: customStyles }} />

            {/* Background Elements */}
            {/* <div className="platform-base"></div> */}
            <div className="particle-overlay"></div>

            {/* Header/Nav Placeholder */}
            <header className="absolute top-0 w-full p-6 md:p-8 z-20 flex justify-center">
                <div className="inline-flex items-center space-x-2 text-white bg-purple-900/40 backdrop-blur-sm px-4 py-2 rounded-full border border-purple-500/50 shadow-lg shadow-purple-900/50 cursor-pointer transition duration-300 hover:scale-[1.02] hover:shadow-purple-400/30">
                    <p className="text-sm font-semibold">P2PClouds.com</p>
                    <Cloud className="w-4 h-4 text-cyan-400"/>
                </div>
            </header>

            {/* Hero Content Area - Main Focus: Funnel Tagline & CTAs */}
            <section className="relative flex flex-col items-center justify-center pt-48 pb-16 px-4 max-w-7xl w-full z-10 min-h-[85vh]">
                
                {/* 1. Clear Tagline */}
                <h1 className="animated-glow text-center tracking-tight font-extrabold fade-up-1"
                    style={{ fontSize: 'clamp(2.5rem, 4vw, 4.5rem)' }}>
                    From Beginner to Cloud & AI Expert — 
                    <br className="hidden md:block" />
                    Your Engineering Journey Starts Here.
                </h1>

                {/* 2. Sub-line: Learn. Build. Deploy. Scale. */}
                <SubLine />

                {/* 5. Highlight Text and Funnel Flow */}
                <div className="text-center mt-8 fade-up-2" style={{animationDelay: '1.8s'}}>
                    <p className="text-sm md:text-base text-gray-500 font-medium italic">
                        The ultimate pipeline: <span className="text-cyan-400">Skillustad Courses</span> to <span className="text-purple-400">P2PClouds Products</span>
                    </p>
                    
                    {/* Funnel Flow below Highlighting text */}
                    <div className="flex items-center justify-center mt-2 space-x-2 text-sm md:text-base font-semibold">
                        <span className="text-cyan-400">BEGINNER</span>
                        <ArrowRight className="w-4 h-4 text-purple-400" />
                        <span className="text-purple-400">ADVANCED</span>
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                        <span className="text-white">EXPERT</span>
                    </div>
                </div>
                
                {/* 3. Engineering Funnel Visual */}
                <EngineeringFunnelVisual />


                {/* 4. Quick CTAs Grid (New Professional Style) */}
                <div className="fade-up-3 w-full max-w-4xl pt-8 pb-12" style={{animationDelay: '2.5s'}}>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                        
                        {/* CTA 1: Docs (Primary Action) */}
                        <QuickCTA label="Explore Docs" icon={FileText} primary={true} />
                        
                        {/* CTA 2: Courses (Primary Action) */}
                        <QuickCTA label="Learn with Courses" icon={GraduationCap} primary={true} />
                        
                        {/* CTA 3: Roadmaps (Secondary Action) */}
                        <QuickCTA label="View Roadmaps" icon={Map} />
                        
                        {/* CTA 4: APKs (Secondary Action) */}
                        <QuickCTA label="Download APKs" icon={Smartphone} />
                    </div>
                </div>
                
                {/* Scroll Down Indicator */}
                <div className="absolute bottom-5 flex flex-col items-center">
                    <p className="text-gray-600 text-xs tracking-widest uppercase">Explore Funnel</p>
                    <ChevronDown className="w-5 h-5 text-gray-500 mt-1 animate-bounce" />
                </div>
            </section>
        </div>
    );
};

// Export the main component
export default HeroSection;

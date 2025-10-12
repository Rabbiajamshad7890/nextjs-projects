// import React from 'react';
// import { DownloadCloud, Code, GitBranch, Terminal, ArrowRight, Laptop, Server, Zap, Github } from 'lucide-react';

// // ========================================================================
// // 1. DATA STRUCTURE (TypeScript)
// // ========================================================================

// interface Tool {
//     name: string;
//     description: string;
//     icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
//     link: string;
//     accentColor: string;
//     tag: string;
// }

// // Official Links Found via Google Search:
// const TOOLS: Tool[] = [
//     {
//         name: "Visual Studio Code (VS Code)",
//         description: "The lightweight, yet powerful source code editor that runs on your desktop. Essential for web development.",
//         icon: Code,
//         link: "https://code.visualstudio.com/download", // Official VS Code Download Page
//         accentColor: "text-blue-400",
//         tag: "Code Editor"
//     },
//     {
//         name: "Git",
//         description: "The standard distributed version control system for tracking changes in source code. Mandatory for collaboration.",
//         icon: GitBranch,
//         link: "https://git-scm.com/downloads", // Official Git Download Page
//         accentColor: "text-orange-500",
//         tag: "Version Control"
//     },
//     {
//         name: "Node.js (LTS)",
//         description: "A JavaScript runtime built on Chrome's V8 engine. Required for running modern backend servers and frontend tooling.",
//         icon: Terminal,
//         link: "https://nodejs.org/en/download/", // Official Node.js Download Page
//         accentColor: "text-green-500",
//         tag: "Runtime Environment"
//     },
//     {
//         name: "GitHub Desktop",
//         description: "An open-source Electron-based application to use Git features without the command line. Great for beginners.",
//         icon: Github,
//         link: "https://desktop.github.com/", // Official GitHub Desktop Page
//         accentColor: "text-purple-400",
//         tag: "GUI Client"
//     }
// ];

// // ========================================================================
// // 2. CHILD COMPONENT
// // ========================================================================

// interface ToolCardProps {
//     tool: Tool;
// }

// const ToolCard: React.FC<ToolCardProps> = ({ tool }) => {
//     const Icon = tool.icon;
    
//     return (
//         // Card Background (Dark, semi-transparent, subtle glow effect)
//         <div className="group flex flex-col p-6 rounded-2xl bg-black/40 border border-gray-700/50 shadow-2xl shadow-purple-900/40 
//                         transition duration-500 hover:border-cyan-400/80 hover:bg-black/50 transform hover:scale-[1.03]">
            
//             <div className="flex items-center justify-between">
//                 {/* Icon & Name */}
//                 <div className="flex items-center space-x-3">
//                     <div className={`p-3 rounded-xl ${tool.accentColor.replace('text', 'bg').replace('-400', '-900/50')} ${tool.accentColor} border border-gray-700`}>
//                         <Icon className="w-6 h-6" />
//                     </div>
//                     <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition duration-300">{tool.name}</h3>
//                 </div>
                
//                 {/* Tag */}
//                 <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-700/30 text-purple-300 border border-purple-500/50 whitespace-nowrap">
//                     {tool.tag}
//                 </span>
//             </div>

//             {/* Description */}
//             <p className="mt-4 text-gray-400 flex-grow text-sm">{tool.description}</p>
            
//             {/* Download Button */}
//             <a 
//                 href={tool.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className={`mt-6 flex items-center justify-center space-x-2 px-4 py-3 rounded-xl font-semibold text-white uppercase tracking-wider text-sm 
//                             bg-gradient-to-r from-purple-600 to-cyan-500 transition duration-300 shadow-lg ${tool.accentColor.replace('text', 'shadow')}-600/50
//                             hover:from-purple-500 hover:to-cyan-400 hover:scale-[1.01]`}
//             >
//                 <DownloadCloud className="w-4 h-4" />
//                 <span>Download Official Installer</span>
//                 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition duration-200" />
//             </a>
//         </div>
//     );
// };

// // ========================================================================
// // 3. MAIN COMPONENT
// // ========================================================================

// const FreeSoftwarePage: React.FC = () => {
//     // Custom CSS for persistent dark theme and subtle glow/animation
//     const customStyles = `
//         .dark-bg {
//             background-color: #0d0617; /* Deep Space background from HeroSection */
//         }
//         @keyframes fade-in {
//             from { opacity: 0; transform: translateY(20px); }
//             to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-fade-in {
//             animation: fade-in 0.8s ease-out forwards;
//         }
//     `;

//     return (
//         <div className="dark-bg min-h-screen pt-24 pb-16 px-4 md:px-8 font-inter relative overflow-hidden">
//             <style dangerouslySetInnerHTML={{ __html: customStyles }} />

//             {/* Decorative Background Elements (Matching Hero Section Vibe) */}
//             <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" 
//                  style={{backgroundImage: 'radial-gradient(circle at center, rgba(123, 0, 255, 0.4) 0%, rgba(0, 0, 0, 0) 60%)'}}>
//             </div>

//             {/* Header */}
//             <header className="max-w-4xl mx-auto text-center mb-12 animate-fade-in" style={{animationDelay: '0.1s'}}>
//                 <span className="inline-flex items-center text-sm font-medium px-4 py-1 rounded-full bg-cyan-700/30 text-cyan-300 border border-cyan-500/50 shadow-md shadow-cyan-900/50">
//                     <Laptop className="w-4 h-4 mr-2" />
//                     Essential Tools
//                 </span>
//                 <h1 className="mt-4 text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
//                     Free Software & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-400">Developer Stack</span>
//                 </h1>
//                 <p className="mt-4 text-lg text-gray-400">
//                     Your journey starts with the right setup. Download these mandatory, free tools to begin your Skillustad learning and building process.
//                 </p>
//             </header>

//             {/* Tools Grid */}
//             <main className="max-w-6xl mx-auto">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//                     {TOOLS.map((tool, index) => (
//                         <div 
//                             key={tool.name} 
//                             className="animate-fade-in" 
//                             style={{ animationDelay: `${0.3 + index * 0.15}s` }}
//                         >
//                             <ToolCard tool={tool} />
//                         </div>
//                     ))}
//                 </div>
//             </main>

//             {/* Footer Note */}
//             <footer className="mt-16 text-center max-w-xl mx-auto pt-8 border-t border-gray-800/50 animate-fade-in" style={{animationDelay: '1.0s'}}>
//                 <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
//                     <Zap className="w-4 h-4 text-purple-500" />
//                     <span>All links point to official vendor download sites.</span>
//                 </p>
//             </footer>

//         </div>
//     );
// };

// export default FreeSoftwarePage;

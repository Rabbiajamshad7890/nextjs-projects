// "use client";
// import React from 'react';
// import { useTheme } from '../app/Context/ThemeContext'; // 🛑 UNCOMMENT IN PRODUCTION 🛑
// import { BookOpen, Code, Terminal, Server, Zap, Globe } from 'lucide-react';

// // --- Theme Context Definition (Required for TypeScript only) ---
// // See note in HeroSection.tsx for why this is necessary.
// type Theme = 'light' | 'dark';
// interface ThemeContextType {
//     theme: Theme;
//     toggleTheme: () => void;
// }
// const useTheme = () => ({} as ThemeContextType);
// // --- END TYPES ---


// interface DocLink {
//     title: string;
//     description: string;
//     href: string;
//     icon: React.ComponentType<any>;
//     color: string;
// }

// const documentationLinks: DocLink[] = [
//     {
//         title: 'React.dev',
//         description: 'The JavaScript library for building user interfaces.',
//         href: 'https://react.dev',
//         icon: Code,
//         color: 'text-sky-500',
//     },
//     {
//         title: 'Next.js Documentation',
//         description: 'The React Framework for Production.',
//         href: 'https://nextjs.org/docs',
//         icon: Server,
//         color: 'text-gray-900 dark:text-white',
//     },
//     {
//         title: 'React Native',
//         description: 'Build native mobile apps using JavaScript and React.',
//         href: 'https://reactnative.dev/docs/getting-started',
//         icon: Terminal,
//         color: 'text-pink-500',
//     },
//     {
//         title: 'Docker Documentation',
//         description: 'Containerization technology for developers.',
//         href: 'https://docs.docker.com/',
//         icon: Globe,
//         color: 'text-blue-600',
//     },
//     {
//         title: 'Tranflow',
//         description: 'Placeholder for a complex data transformation flow tool.',
//         href: 'https://www.p2pclouds.com/tranflow-docs', // Using a placeholder URL
//         icon: Zap,
//         color: 'text-orange-500',
//     },
// ];

// const DocumentCard: React.FC<DocLink> = ({ title, description, href, icon: Icon, color }) => {
//     const { theme } = (useTheme as unknown as () => ThemeContextType)();

//     const cardClasses = theme === 'dark'
//         ? "bg-black/30 h-full p-5 rounded-xl border border-gray-700/50 hover:border-blue-500/80 transition duration-300 transform hover:scale-[1.03] shadow-lg flex flex-col justify-start"
//         : "bg-white/90 h-full p-5 rounded-xl border border-gray-200 hover:border-blue-600/80 transition duration-300 transform hover:scale-[1.03] shadow-xl flex flex-col justify-start";

//     const titleClass = theme === 'dark' ? "text-white" : "text-gray-900";
//     const descriptionClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";

//     return (
//         <a 
//             href={href} 
//             target="_blank" 
//             rel="noopener noreferrer" 
//             className={`cursor-pointer block ${cardClasses}`}
//         >
//             <div className={`text-3xl mb-3 ${color}`}>
//                 <Icon size={28} />
//             </div>
//             <h3 className={`text-xl font-semibold mb-1 ${titleClass}`}>{title}</h3>
//             <p className={`text-sm ${descriptionClass} flex-grow`}>{description}</p>
//             <span className="mt-3 text-xs font-medium text-blue-500 group-hover:underline flex items-center">
//                 Go to Docs →
//             </span>
//         </a>
//     );
// };


// export const DocumentationHub: React.FC = () => {
//     const { theme } = (useTheme as unknown as () => ThemeContextType)();
    
//     const sectionBgClass = theme === 'dark'
//         ? "bg-[#0d0617] text-white py-20 border-t border-gray-800"
//         : "bg-gray-50 text-gray-900 py-20 border-t border-gray-200";

//     const headerClass = theme === 'dark' ? "text-white" : "text-gray-900";
//     const subheaderClass = theme === 'dark' ? "text-gray-400" : "text-gray-600";

//     return (
//         <section id="documentation" className={sectionBgClass + " px-4 sm:px-6 lg:px-8"}>
//             <div className="max-w-7xl mx-auto">
//                 <div className="flex items-center justify-center mb-4">
//                     <BookOpen className={`w-8 h-8 mr-3 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'}`} />
//                     <h2 className={`text-4xl font-extrabold ${headerClass}`}>
//                         Developer Documentation
//                     </h2>
//                 </div>
//                 <p className={`text-xl text-center ${subheaderClass} mb-12 max-w-2xl mx-auto`}>
//                     Access the resources and technical documentation for the core technologies we support and build upon.
//                 </p>
                
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//                     {documentationLinks.map((doc) => (
//                         <DocumentCard key={doc.href} {...doc} />
//                     ))}
//                 </div>
//             </div>
//         </section>
//     );
// };

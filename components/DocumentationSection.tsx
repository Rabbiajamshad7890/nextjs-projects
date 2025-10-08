// components/DocumentationSection.tsx
import React from 'react';
import Link from 'next/link';

interface DocCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode; // For a tech icon
}

// Data for the main documentation cards
const techDocs: DocCardProps[] = [
  {
    title: 'React.js',
    description: 'The library for building user interfaces. Dive into hooks and state management.',
    slug: 'reactjs',
    icon: <span role="img" aria-label="React Icon">⚛️</span>,
  },
  {
    title: 'Docker',
    description: 'Containerization for developers. Build, ship, and run any app, anywhere.',
    slug: 'docker',
    icon: <span role="img" aria-label="Docker Icon">🐳</span>,
  },
  {
    title: 'TensorFlow',
    description: 'An end-to-end open-source platform for machine learning. Create intelligent models.',
    slug: 'tensorflow',
    icon: <span role="img" aria-label="TensorFlow Icon">🧠</span>,
  },
  // Add more technologies here
];

const DocCard: React.FC<DocCardProps> = ({ title, description, slug, icon }) => {
  // Glowing button class using a subtle gradient and shadow
  const buttonClass = `
    mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-lg shadow-lg
    bg-gradient-to-r from-purple-600 to-blue-500 text-white
    hover:from-purple-500 hover:to-blue-400
    transition duration-300 transform hover:scale-[1.03]
    border border-purple-400 border-opacity-50
  `;

  return (
    <div className="bg-[#1a0f2b] p-6 rounded-xl shadow-2xl border border-purple-800/50 hover:border-blue-500/50 transition duration-300">
      <div className="text-4xl mb-4 text-blue-400">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
      <Link href={`/document/${slug}`} className={buttonClass}>
        Start Coding →
      </Link>
    </div>
  );
};

export const DocumentationSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#0d0617] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text  bg-gradient-to-r from-purple-400 to-blue-300">
          Documents Tech Library 
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Dive into advanced documentation and tutorials for the modern developer.
        </p>
        
        <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {techDocs.map((doc) => (
            <DocCard key={doc.slug} {...doc} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <Link href="/browse-all" className={`
            ${techDocs.length > 0 ? '' : 'hidden'}
            inline-block px-8 py-4 text-lg font-bold rounded-xl shadow-2xl
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            hover:from-blue-400 hover:to-purple-500
            transition duration-500 transform hover:scale-[1.05]
            border border-blue-300 border-opacity-50
            animate-pulse
          `}>
            Browse All Documentation
          </Link>
        </div>
      </div>
    </section>
  );
};

export default DocumentationSection;
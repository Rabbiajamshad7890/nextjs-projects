// app/document/[document_slug]/page.tsx
import React from 'react';
import { notFound } from 'next/navigation';
import { Link } from 'lucide-react';

// Define the full structure for a documentation hub
interface DocHub {
  title: string;
  subPages: {
    title: string;
    description: string;
    slug: string;
  }[];
}

// Sample Data for documentation pages based on the request's structure
const documentationData: Record<string, DocHub> = {
  'reactjs': {
    title: 'React.js Documentation Hub',
    subPages: [
      { title: 'Introduction & Overview', description: 'Why React is the component king.', slug: 'intro' },
      { title: 'Setup Guide', description: 'Install Node, Next.js, and your first config.', slug: 'setup' },
      { title: 'Beginner: First React App', description: 'Hello world with Functional Components.', slug: 'first-app' },
      { title: 'Advanced Hooks & State Management', description: 'Mastering useEffect, useContext, and custom hooks.', slug: 'advanced-hooks' },
      { title: 'Integration: Deploy on Vercel', description: 'Scaling with serverless functions and CDN.', slug: 'vercel-deploy' },
      { title: 'Projects & Use Cases', description: 'Downloadable e-commerce and dashboard examples.', slug: 'projects' },
      { title: 'API References / Cheatsheet', description: 'Quick look at common React APIs.', slug: 'api-ref' },
    ],
  },
  'docker': {
    title: 'Docker Documentation Hub',
    subPages: [
      { title: 'Introduction to Containerization', description: 'Why Docker matters for DevOps.', slug: 'intro' },
      { title: 'Installation & Configs', description: 'Setup on Windows, Mac, and Linux.', slug: 'install' },
      { title: 'Beginner: First Container', description: 'Running a simple web server.', slug: 'first-container' },
      { title: 'Advanced: Networking & Volumes', description: 'Connecting containers and persistent data.', slug: 'networking' },
      { title: 'Integration: Orchestration (K8s)', description: 'Scaling with Kubernetes concepts.', slug: 'k8s-link' },
      { title: 'Projects & Use Cases', description: 'Multi-container app examples (MERN stack).', slug: 'projects' },
      { title: 'Docker CLI Cheatsheet', description: 'Essential commands for daily use.', slug: 'cli-ref' },
    ],
  },
  // Add data for 'tensorflow' and other slugs here...
};

interface DocPageProps {
  params: {
    document_slug: string;
  };
}

const DocumentationPage: React.FC<DocPageProps> = ({ params }) => {
  const { document_slug } = params;
  const docHub = documentationData[document_slug];

  if (!docHub) {
    notFound(); // Next.js built-in for 404
  }

  // Glowing link/button style
  const linkClass = `
    block w-full text-left p-4 rounded-lg
    bg-[#1a0f2b] border border-purple-700/50
    hover:bg-gradient-to-r hover:from-purple-800/70 hover:to-blue-800/70
    transition duration-300 transform hover:scale-[1.02]
    shadow-lg hover:shadow-purple-500/30
    text-white
  `;

  return (
    <main className="min-h-screen bg-[#0d0617] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          {docHub.title}
        </h1>
        <p className="text-2xl text-center text-gray-400 mb-12">
          Your path to mastery in **{document_slug.toUpperCase()}**.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docHub.subPages.map((page) => (
            <a 
              key={page.slug} 
              href={`/document/${document_slug}/${page.slug}`} // Example sub-page link
              className={linkClass}
            >
              <h2 className="text-xl font-semibold mb-1">
                <span className="text-purple-400 mr-2">→</span> {page.title}
              </h2>
              <p className="text-sm text-gray-300">{page.description}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href="/" className={`
            inline-block px-6 py-3 text-base font-bold rounded-lg shadow-xl
            bg-gradient-to-r from-blue-600 to-purple-500 text-white
            hover:from-blue-500 hover:to-purple-400
            transition duration-300 transform
            border border-blue-400 border-opacity-50
          `}>
            ← Back to Tech Library
          </Link>
        </div>
      </div>
    </main>
  );
};

export default DocumentationPage;
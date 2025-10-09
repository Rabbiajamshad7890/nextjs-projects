// app/community/[community_slug]/CommunityDetail.tsx

'use client'; // 👈 Must be here

import React from "react";
import { useRouter } from "next/navigation"; 

interface Space {
  iconSvg: string;
  name: string;
  description: string;
  content: string[];
}

// Props are simplified to just take the slug (or the whole 'space' object)
interface CommunityDetailProps {
  communitySlug: string; 
}

const CommunityDetail = ({ communitySlug }: CommunityDetailProps) => {
  const router = useRouter(); 

  const space: Space = {
    iconSvg: "<svg fill='none' viewBox='0 0 24 24' stroke='currentColor'><circle cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='2'/></svg>",
    name: communitySlug.toUpperCase(), // Use the passed slug
    description: `Welcome to the ${communitySlug} community! Here you'll find details and instructions.`,
    content: [
      "Follow the joining steps carefully.",
      "Engage with other community members.",
      "Stay updated with announcements.",
    ],
  };

  const handleBack = () => {
    router.back(); 
  };

  return (
    <div className="p-6 md:p-12 min-h-screen text-white bg-[#0d0617]">
      <button
        onClick={handleBack}
        className="flex items-center text-purple-400 hover:text-purple-300 mb-8 transition duration-150 font-medium"
      >
        <svg
          className="w-5 h-5 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          ></path>
        </svg>
        Back to Community Hub
      </button>

      {/* ... rest of your UI using 'space' and 'handleBack' ... */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700">
        <div className="flex items-center mb-4">
          <span
            className="text-purple-400 mr-4 w-10 h-10"
            dangerouslySetInnerHTML={{ __html: space.iconSvg }}
          />
          <h1 className="text-4xl md:text-5xl font-extrabold text-purple-400">
            {space.name}
          </h1>
        </div>

        <p className="text-xl text-gray-300 mb-10">{space.description}</p>

        <div className="space-y-12">
          <div className="border-l-4 border-purple-600 pl-6">
            <h2 className="text-3xl font-bold text-white mb-4">
              Joining Instructions + Active Spaces
            </h2>
            <ul className="space-y-3 text-lg text-gray-400">
              {space.content.map((point, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={handleBack}
            className="inline-block px-8 py-3 bg-red-500 text-white font-bold rounded-lg shadow-lg hover:bg-red-400 transition duration-300 transform hover:scale-105"
          >
            Back to Community Hub
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunityDetail;
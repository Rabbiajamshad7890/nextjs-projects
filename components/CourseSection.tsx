import React from 'react';
// Removed: import Link from 'next/link';

// Using Lucide icons for a cleaner look, assuming it's available or using placeholders
// In a real Next.js environment, you would import icons from 'lucide-react'
interface CourseCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode; // For a category icon
}

// Data for the main course categories
const devCourses: CourseCardProps[] = [
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
  {
    title: 'Blockchain',
    description: 'Understand decentralized applications (dApps), smart contracts, and Web3 development (Solidity/Rust).',
    slug: 'blockchain',
    icon: <span role="img" aria-label="Blockchain Icon">🔗</span>,
  },
];

const CourseCard: React.FC<CourseCardProps> = ({ title, description, slug, icon }) => {
  // Glowing button class using a subtle gradient and shadow (PURPLE/BLUE)
  const buttonClass = `
    mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-lg shadow-lg
    bg-gradient-to-r from-purple-600 to-blue-500 text-white
    hover:from-purple-500 hover:to-blue-400
    transition duration-300 transform hover:scale-[1.03]
    border border-blue-400 border-opacity-50
  `;

  return (
    <div className="bg-[#1a0f2b] p-6 rounded-xl shadow-2xl border border-purple-800/50 hover:border-blue-500/50 transition duration-300">
      <div className="text-4xl mb-4 text-blue-400">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
      {/* Replaced Link with a tag */}
      <a href={`/courses/${slug}`} className={buttonClass}>
        View Course Roadmap →
      </a>
    </div>
  );
};

export const CourseSection: React.FC = () => {
  return (
    <section className="min-h-screen bg-[#0d0617] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
          Master the Latest Tech with Our Courses
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Choose a path below and start your journey towards expert-level development.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {devCourses.map((course) => (
            <CourseCard key={course.slug} {...course} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          {/* Replaced Link with a tag */}
          <a href="/browse-all-courses" className={`
            ${devCourses.length > 0 ? '' : 'hidden'}
            inline-block px-8 py-4 text-lg font-bold rounded-xl shadow-2xl
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            hover:from-blue-400 hover:to-purple-500
            transition duration-500 transform hover:scale-[1.05]
            border border-blue-300 border-opacity-50
            animate-pulse
          `}>
            Explore All Learning Paths
          </a>
        </div>
      </div>
    </section>
  );
};

export default CourseSection;

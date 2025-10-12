// app/courses/[course_slug]/page.tsx (Server Component)

import React from 'react';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import CourseClientWrapper from './CourseClientWrapper'; // Imports the client component

// ====================================================================
// --- DATA STRUCTURES (Server Side)
// ====================================================================

interface ExternalCourseCard {
    title: string;
    description: string;
    imageUrl: string;
    linkUrl: string;
}

interface CourseHub {
    title: string;
    subPages: {
        title: string;
        description: string;
        slug: string;
    }[];
}

// --------------------------------------------------------------------
// COURSE DATA DEFINITIONS (Server Side)
// --------------------------------------------------------------------

const aiDataScienceExternalCourses: ExternalCourseCard[] = [
    { title: 'AI Agents & Chatbot Development', description: 'Build sophisticated, conversational AI agents and custom chatbots using the latest models and frameworks.', imageUrl: '/SkAIchat1.png', linkUrl: 'https://skillustad.com/ai-agents-and-chatbot/' },
    { title: 'Generative AI Masterclass', description: 'Deep dive into Generative AI models (LLMs, Diffusion Models) for content, code, and image creation.', imageUrl: '/SkGenAI2.png', linkUrl: 'https://skillustad.com/generative-ai/' },
    { title: 'Core Data Science Specialization', description: 'Master data analysis, statistical modeling, and machine learning techniques from scratch.', imageUrl: '/SKDSci3.png', linkUrl: 'https://skillustad.com/data-science/' },
    { title: 'Software Engineering with AI', description: 'A micro-degree program focusing on integrating AI tools and methodologies into the modern software development lifecycle.', imageUrl: '/SKSE4.png', linkUrl: 'https://skillustad.com/micro-degree-program/software-engineering-with-ai/' },
];

const cybersecurityExternalCourses: ExternalCourseCard[] = [
    { title: 'Advanced Certified Ethical Hacking', description: 'Learn penetration testing, vulnerability assessment, and ethical hacking techniques for network and web security.', imageUrl: '/SkACSec1.png', linkUrl: 'https://skillustad.com/ethical-hacking/' },
    { title: 'Advance Cyber Security Training', description: 'Comprehensive course on defensive security, incident response, and security best practices for enterprises.', imageUrl: '/Skethic2.png', linkUrl: 'https://skillustad.com/advance-cyber-security/' },
    { title: 'Bug Bounty & Penetration Testing', description: 'Practical training on finding and reporting real-world vulnerabilities for bug bounty programs.', imageUrl: '/SKBugB3.png', linkUrl: 'https://skillustad.com/bug-bounty-penetration-testing/' },
];

const mobileDevExternalCourses: ExternalCourseCard[] = [
    { title: 'React Native Development with Expo', description: 'Build cross-platform mobile apps for iOS and Android using JavaScript and the React Native framework.', imageUrl: '/SkMAI1.png', linkUrl: 'https://skillustad.com/react-native-development/' },
    { title: 'Mobile App Development with AI', description: 'Micro-Degree Program: Integrating AI capabilities like computer vision and ML into mobile applications.', imageUrl: '/SkReact2.png', linkUrl: 'https://skillustad.com/micro-degree-program/mobile-app-with-ai/' },
    { title: 'Flutter & Dart Fundamentals', description: 'Start your journey with Google’s Flutter framework for beautiful, natively compiled applications.', imageUrl: '/SkFD3.png', linkUrl: 'https://skillustad.com/flutter-dart/' },
    { title: 'Full Stack Flutter & Dart', description: 'Develop complete mobile apps with a backend, including database integration and state management.', imageUrl: '/SKFULLS4.png', linkUrl: 'https://skillustad.com/full-stack-flutter-dart/' },
];

const cloudDevOpsExternalCourses: ExternalCourseCard[] = [
    { title: 'Cloud Computing Essentials', description: 'Foundational knowledge in cloud services (AWS/Azure/GCP), networking, security, and deployment models.', imageUrl: '/Skcloudc1.png', linkUrl: 'https://skillustad.com/cloud-computing/' },
    { title: 'WordPress Web Development', description: 'Learn to build, customize, and manage professional websites using the world’s most popular CMS.', imageUrl: '/SkWp2b.png', linkUrl: 'https://skillustad.com/wordpress/' },
    { title: 'DevOps Engineering', description: 'Implement CI/CD, Infrastructure as Code (IaC), containerization (Docker, Kubernetes), and monitoring tools.', imageUrl: '/SKDeng3.png', linkUrl: 'https://skillustad.com/devops-engineering/' },
];

const fullStackExternalCourses: ExternalCourseCard[] = [
    { title: 'Full Stack AI Academy', description: 'Master the combination of Full Stack development and AI to build intelligent, cutting-edge applications.', imageUrl: '/SkAIFULLWEB1.png', linkUrl: 'https://skillustad.com/fullstack-ai/' },
    { title: 'MERN Stack Development', description: 'Build robust, scalable full-stack applications with MongoDB, Express, React, and Node.js.', imageUrl: '/SkDevCourse2.png', linkUrl: 'https://skillustad.com/mernstack/' },
    { title: 'Full Stack Python with Django', description: 'Accelerate your career as a Full Stack Python Developer using the powerful Django framework.', imageUrl: '/FullStack3.png', linkUrl: 'https://skillustad.com/python-django/' },
    { title: 'Web Development with AI Micro Degree', description: 'A 4-month intensive program to integrate Web Development skills with cutting-edge AI tools.', imageUrl: '/WEbdAI4.png', linkUrl: 'https://skillustad.com/micro-degree-program/web-development-with-ai/' },
];

const courseHubData: Record<string, CourseHub> = {
    'cloud-devops': { title: 'Cloud & DevOps Engineer Certification', subPages: [] },
    'ai-data-science': { title: 'AI/ML & Data Science Specialist Track', subPages: [] },
    'full-stack': { title: 'Modern Full Stack Web Development', subPages: [] },
    'mobile-dev': { title: 'Mobile App Development Bootcamp', subPages: [] },
    'cybersecurity': { title: 'Ethical Hacking and Cybersecurity Fundamentals', subPages: [] },
};

// Helper function to map slug to its data array
const getExternalCourses = (slug: string): ExternalCourseCard[] | null => {
    switch (slug) {
        case 'ai-data-science':
            return aiDataScienceExternalCourses;
        case 'cybersecurity':
            return cybersecurityExternalCourses;
        case 'mobile-dev':
            return mobileDevExternalCourses;
        case 'cloud-devops':
            return cloudDevOpsExternalCourses;
        case 'full-stack':
            return fullStackExternalCourses;
        default:
            return null;
    }
};


// ====================================================================
// --- STATIC GENERATION (Server-Only Function)
// ====================================================================

/**
 * Generates all slugs required for static export (SSG/output: 'export').
 */
export async function generateStaticParams() {
    const slugs = Object.keys(courseHubData);
    return slugs.map(slug => ({
        course_slug: slug,
    }));
}


// ====================================================================
// --- PAGE COMPONENT (Server Component)
// ====================================================================

interface CoursePageProps {
    params: {
        course_slug: string;
    };
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
    const { course_slug } = params;
    const normalized_slug = course_slug.toLowerCase();

    const courseHub = courseHubData[normalized_slug];
    const externalCourses = getExternalCourses(normalized_slug);

    // 404 Handling (Server-side)
    if (!courseHub) {
        // Fallback for notFound() since we can't use Next.js's notFound() here easily
        return (
            <main className="min-h-screen bg-[#0d0617] py-32 px-4 sm:px-6 lg:px-8 text-white text-center">
                <div className="max-w-xl mx-auto p-10 rounded-xl border-2 border-red-500 bg-red-900/20">
                    <h1 className="text-5xl font-extrabold mb-4 text-red-400 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 mr-3" /> 404 - Course Not Found
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        The course slug **`{course_slug}`** does not match any available course hub data.
                    </p>
                    <Link href="/" className={`
                        inline-block px-6 py-3 text-base font-bold rounded-lg shadow-xl
                        bg-gradient-to-r from-purple-600 to-blue-500 text-white
                        hover:from-purple-500 hover:to-blue-400
                        transition duration-300 transform
                        border border-purple-400 border-opacity-50
                    `}>
                        ← Go Back to Course Categories
                    </Link>
                </div>
            </main>
        );
    }

    // Pass server-fetched data to the Client Component
    return (
        <CourseClientWrapper 
            courseHub={courseHub} 
            externalCourses={externalCourses} 
            course_slug={normalized_slug}
        />
    );
};

export default CoursePage;
import React from 'react';
// Assuming Lucide-react is available, using Link icon as an example
import { Link, Link as LinkIcon } from 'lucide-react'; 

// Define the full structure for a course hub
interface CourseHub {
  title: string;
  subPages: {
    title: string;
    description: string;
    slug: string;
  }[];
}

// Sample Data for course pages based on the new categories
const courseHubData: Record<string, CourseHub> = {
  'cloud-devops': {
    title: 'Cloud & DevOps Engineer Certification',
    subPages: [
      { title: 'Module 1: Infrastructure as Code (Terraform)', description: 'Automating AWS/Azure infrastructure deployment.', slug: 'iac-terraform' },
      { title: 'Module 2: Container Orchestration (Kubernetes)', description: 'Scaling and managing containerized applications.', slug: 'k8s-basics' },
      { title: 'Module 3: Continuous Integration/Deployment (CI/CD)', description: 'Implementing GitOps pipelines with GitHub Actions and Jenkins.', slug: 'cicd-pipelines' },
      { title: 'Module 4: Observability & Monitoring', description: 'Using Prometheus and Grafana for system health.', slug: 'monitoring' },
    ],
  },
  'ai-data-science': {
    title: 'AI/ML & Data Science Specialist Track',
    subPages: [
      { title: 'Module 1: Python for Data Science (NumPy/Pandas)', description: 'Core libraries for data manipulation and analysis.', slug: 'python-data-prep' },
      { title: 'Module 2: Deep Learning with TensorFlow/PyTorch', description: 'Building and training neural networks.', slug: 'deep-learning' },
      { title: 'Module 3: Large Language Model (LLM) Integration', description: 'Working with cutting-edge generative AI models.', slug: 'llm-integration' },
      { title: 'Module 4: MLOps and Deployment', description: 'Taking models from research to production environment.', slug: 'mlops-deployment' },
    ],
  },
  'full-stack': {
    title: 'Modern Full Stack Web Development',
    subPages: [
      { title: 'Module 1: Advanced React and State Management', description: 'Mastering hooks, context, and Redux/Zustand.', slug: 'react-advanced' },
      { title: 'Module 2: Backend with Node.js and Express', description: 'Building REST APIs and server-side logic.', slug: 'nodejs-backend' },
      { title: 'Module 3: Database (SQL & NoSQL) Integration', description: 'Designing schemas and querying databases.', slug: 'db-integration' },
      { title: 'Module 4: Authentication and Security', description: 'Implementing JWT, OAuth, and securing endpoints.', slug: 'security-auth' },
    ],
  },
  'mobile-dev': {
    title: 'Mobile App Development Bootcamp',
    subPages: [
      { title: 'Module 1: React Native Fundamentals', description: 'Setting up environments and basic component structure.', slug: 'rn-setup' },
      { title: 'Module 2: Navigation and Platform APIs', description: 'Using React Navigation and accessing native features.', slug: 'rn-navigation' },
      { title: 'Module 3: State Management and Offline Data', description: 'Handling local state and persistent storage.', slug: 'rn-state' },
      { title: 'Module 4: Deployment to App and Play Stores', description: 'Building and submitting the final application package.', slug: 'rn-deployment' },
    ],
  },
  'cybersecurity': {
    title: 'Ethical Hacking and Cybersecurity Fundamentals',
    subPages: [
      { title: 'Module 1: Network & OS Security Basics', description: 'Understanding TCP/IP, firewalls, and OS hardening.', slug: 'network-security' },
      { title: 'Module 2: Web Application Penetration Testing', description: 'OWASP Top 10 vulnerabilities (XSS, SQLi, CSRF).', slug: 'web-pentesting' },
      { title: 'Module 3: Cryptography and PKI', description: 'In-depth look at encryption, hashing, and digital signatures.', slug: 'cryptography' },
      { title: 'Module 4: Incident Response and Forensics', description: 'Detecting, analyzing, and responding to security breaches.', slug: 'incident-response' },
    ],
  },
  'blockchain': {
    title: 'Web3 and Blockchain Development',
    subPages: [
      { title: 'Module 1: Blockchain Fundamentals and Architecture', description: 'Consensus mechanisms, ledgers, and tokenomics.', slug: 'blockchain-basics' },
      { title: 'Module 2: Smart Contract Development (Solidity)', description: 'Writing, compiling, and deploying contracts on Ethereum.', slug: 'solidity-contracts' },
      { title: 'Module 3: Frontend dApp Interaction (Web3.js/Ethers.js)', description: 'Connecting a web app to a wallet and smart contracts.', slug: 'dapp-frontend' },
      { title: 'Module 4: Advanced Concepts (NFTs and DeFi)', description: 'Building token standards and decentralized finance primitives.', slug: 'advanced-web3' },
    ],
  },
};

interface CoursePageProps {
  params: {
    course_slug: string;
  };
}

const CoursePage: React.FC<CoursePageProps> = ({ params }) => {
  const { course_slug } = params;
  const courseHub = courseHubData[course_slug];

  // Custom 404 handling logic 
  if (!courseHub) {
    return (
        <main className="min-h-screen bg-[#0d0617] py-32 px-4 sm:px-6 lg:px-8 text-white text-center">
            <div className="max-w-xl mx-auto p-10 rounded-xl border-2 border-red-500 bg-red-900/20">
                <h1 className="text-5xl font-extrabold mb-4 text-red-400">404 - Course Not Found</h1>
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

  // Glowing link/button style (PURPLE/BLUE)
  const linkClass = `
    block w-full text-left p-5 rounded-xl
    bg-[#1a0f2b] border border-purple-700/50
    hover:bg-gradient-to-r hover:from-blue-800/70 hover:to-purple-800/70
    transition duration-300 transform hover:scale-[1.02]
    shadow-xl hover:shadow-purple-500/30
    text-white
  `;

  return (
    <main className="min-h-screen bg-[#0d0617] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-6xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
          {courseHub.title}
        </h1>
        <p className="text-2xl text-center text-gray-400 mb-12">
          This is your comprehensive roadmap to mastery in **{course_slug.replace('-', ' ').toUpperCase()}**.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseHub.subPages.map((page) => (
            <a 
              key={page.slug} 
              href={`/courses/${course_slug}/${page.slug}`} // Example sub-page link (e.g., /courses/cloud-devops/k8s-basics)
              className={linkClass}
            >
              <h2 className="text-xl font-semibold mb-1 flex items-center">
                <LinkIcon className="h-5 w-5 text-blue-400 mr-2" /> {page.title}
              </h2>
              <p className="text-sm text-gray-300 mt-2">{page.description}</p>
            </a>
          ))}
        </div>

        <div className="text-center mt-16">
          <LinkIcon className="h-6 w-6 inline-block text-blue-400 mr-2" />
          <Link href="/" className={`
            inline-block px-6 py-3 text-base font-bold rounded-lg shadow-xl
            bg-gradient-to-r from-purple-600 to-blue-500 text-white
            hover:from-purple-500 hover:to-blue-400
            transition duration-300 transform
            border border-purple-400 border-opacity-50
          `}>
             Back to All Course Categories
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CoursePage;

// app/blogsdetail/[id]/page.tsx
// This is the Server Component (default in Next.js App Router)

import React from 'react';
// Import the Client Component from its dedicated file in the same directory.
import BlogDetailWrapper from '@/app/blogsdetail/[id]/BlogsDetailWrapper';

// --- Configuration & Data Structures (Local to the server component) ---
const INSTITUTE_NAME = "P2PClouds Institute";

// EXPORTING interfaces allows the Client Component to reliably use the same types.
export interface BlogPost {
  id: number;
  title: string;
  category: string;
  author: string;
  date: string;
  content: string;
  // Icon type remains string for serialization
  icon: string; 
}

/**
 * Interface defining the props expected by the Client Component (BlogDetailWrapper).
 */
export interface BlogDetailWrapperProps {
    post: BlogPost | undefined;
    blogId: string;
    instituteName: string;
}

// Full Blog Posts Data (Remains here for data fetching/static generation)
const FULL_BLOG_POSTS: BlogPost[] = [
  // Blog Post 1: AI Chatbot Tools
  {
    id: 1,
    title: `Top AI Chatbot Tools You Should Know in 2025 by ${INSTITUTE_NAME}`,
    category: "Tech Trends",
    author: `Jane Doe (${INSTITUTE_NAME})`,
    date: "Oct 1, 2025",
    icon: 'FileText',
    content: `
      <p>The landscape of Artificial Intelligence is constantly shifting, and 2025 is set to be dominated by highly specialized and context-aware chatbot tools. ${INSTITUTE_NAME} emphasizes that simply using generic AI is no longer enough; professionals must master tools that integrate deeply with enterprise data and workflows.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">P2PClouds' Edge: Specialized LLM Prompt Engineering</h3>
      <p>While many institutions teach basic LLM interaction, **P2PClouds Institute** dives into **advanced prompt engineering** for industry-specific large language models (LLMs). Our curriculum includes hands-on projects optimizing models for financial analysis, legal compliance, and personalized healthcare diagnostics.</p>
      <p>We believe the real value of AI lies in its integration. Our modules ensure students can build robust APIs that connect cutting-edge chatbots to existing enterprise databases, providing real-time, grounded, and actionable intelligence. This specialized focus transforms our graduates from basic users into high-value AI integration specialists.</p>

      <h3 class="text-2xl font-bold mt-8 mb-4">Practical Focus: Beyond the Code</h3>
      <p>Our courses utilize proprietary sandboxes where students stress-test prompt injection attacks and build secure, fine-tuned models. This practical, security-first approach is what sets P2PClouds graduates apart in the competitive job market.</p>
      <p class="mt-6 border-l-4 border-cyan-400 pl-4 italic"><strong>P2PClouds Insight:</strong> Our curriculum focuses heavily on prompt engineering for specialized LLMs, ensuring graduates can optimize these advanced tools immediately in a professional setting and drive real business outcomes.</p>
    `,
  },
  // Blog Post 2: Backend Development Roadmap
  {
    id: 2,
    title: `The Backend Development Roadmap for 2025: A ${INSTITUTE_NAME} Guide`,
    category: "How-to Guides",
    author: `John Smith (${INSTITUTE_NAME})`,
    date: "Sep 25, 2025",
    icon: 'FileText',
    content: `
      <p>Backend development in 2025 revolves around three pillars: **Serverless**, **Rust/Go for performance**, and **Observability**. ${INSTITUTE_NAME} has mapped out the essential skills needed to thrive in this high-demand field.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">P2PClouds' Serverless and Performance Mastery</h3>
      <p>At **P2PClouds**, we don't just teach the syntax; we teach architecture. Our Serverless track goes beyond simple function deployment (AWS Lambda, Azure Functions) to cover complex event-driven architectures, state management using services like DynamoDB, and advanced cost optimization strategies. This ensures our developers build cost-efficient and infinitely scalable systems.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Deep Dive into Go and Infrastructure as Code (IaC)</h3>
      <p>The future of high-performance microservices demands languages like Go and Rust. Our program features extensive, project-based modules in Go, focusing on concurrency, low-latency API design, and gRPC implementation.</p>
      <p>Crucially, every backend module includes a mandatory Infrastructure as Code (IaC) section using **Terraform**. Students learn to provision, manage, and scale their entire cloud infrastructure programmatically, a skill highly valued in senior engineering roles.</p>
      <p class="mt-6 border-l-4 border-cyan-400 pl-4 italic"><strong>P2PClouds Roadmap:</strong> Our backend course includes extensive modules on Go for microservices and cloud infrastructure automation using Terraform, giving you a competitive edge in building resilient and fast systems.</p>
    `,
  },
  // Blog Post 3: Graphic Design Courses
  {
    id: 3,
    title: `Top 5 Graphic Design Courses in 2025 at ${INSTITUTE_NAME}`,
    category: "Product Updates",
    author: `P2PClouds Team`,
    icon: 'FileText',
    date: "Sep 18, 2025",
    content: `
      <p>The demand for designers skilled in both traditional aesthetics and digital, interactive media is skyrocketing. ${INSTITUTE_NAME} offers courses tailored to the future of design, focusing on UI/UX principles and Motion Graphics.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">P2PClouds: Bridging Design and Development</h3>
      <p>Our Graphic Design courses at **P2PClouds Institute** are built on the philosophy that modern designers must be fluent in the language of developers. Our flagship **Advanced UI/UX with Figma** course integrates directly with component libraries (like React or Vue), ensuring students design production-ready systems, not just static mockups.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Industry-Driven Portfolio and Motion Graphics</h3>
      <p>A static portfolio is no longer enough. We require students to master **Motion Graphics** and interactive prototyping to showcase their designs' behavior. Furthermore, our design faculty are active industry professionals who facilitate real-world client projects, allowing students to tackle authentic design challenges, from concept to final developer handover.</p>
      <p>This hands-on approach, coupled with dedicated career workshops, ensures that every P2PClouds graduate enters the market with a portfolio that speaks directly to modern tech hiring managers.</p>
      <p class="mt-6 border-l-4 border-cyan-400 pl-4 italic"><strong>Why P2PClouds?</strong> Our design faculty are industry professionals who bring real-world client projects into the classroom, preparing you for the demands of the modern digital landscape.</p>
    `,
  },
  // Blog Post 4: DevOps Interview Advice
  {
    id: 4,
    title: `Mastering the Behavioral Interview for DevOps Roles: ${INSTITUTE_NAME} Advice`,
    category: "Career Tips",
    author: `Emily Chen (${INSTITUTE_NAME})`,
    date: "Sep 10, 2025",
    icon: 'FileText',
    content: `
      <p>A DevOps interview isn't just about Kubernetes and CI/CD; it's heavily focused on how you handle collaboration, failure, and high-pressure situations. ${INSTITUTE_NAME} career experts share the keys to mastering the behavioral interview.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">P2PClouds' Focus: The "DevOps Mindset"</h3>
      <p>At **P2PClouds**, our career services go beyond resume review. We run specialized mock interviews focused on the **"DevOps Mindset,"** which assesses your ability to foster communication, implement monitoring best practices, and perform root cause analysis under pressure. These sessions are conducted by former hiring managers from top tech firms.</p>
      
      <h3 class="text-2xl font-bold mt-8 mb-4">Structured Success: Integrating Technical and Soft Skills</h3>
      <p>We teach our students to integrate the technical concepts (e.g., using Prometheus/Grafana for monitoring) directly into their behavioral answers, using the **STAR Method** as a foundational script. For example, describing a situation where a production failure (Situation) required quick remediation (Task), explaining the specific GitOps actions taken (Action), and detailing the post-mortem steps and lasting improvements (Result).</p>
      <p>This holistic training ensures that when you talk about collaboration or incident response, you're backing it up with precise technical terminology, making you a standout candidate.</p>
      <p class="mt-6 border-l-4 border-cyan-400 pl-4 italic"><strong>P2PClouds Career Services:</strong> We offer mock interviews specifically focused on the "DevOps mindset," helping you translate technical excellence into clear, compelling behavioral answers that resonate with interviewers.</p>
    `,
  },
];


interface BlogDetailPageProps {
  params: {
    id: string; // The dynamic segment from the URL
  };
}

// -------------------------------------------------------------
// This function MUST be here for Next.js static pre-rendering (SSG).
// It runs at build time.
// -------------------------------------------------------------
export async function generateStaticParams() {
    return FULL_BLOG_POSTS.map((post) => ({
      id: post.id.toString(), // Returns { id: '1' }, { id: '2' }, etc.
    }));
}
// -------------------------------------------------------------


const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ params }) => {
  // Safe access and conversion:
  const blogId = params.id;
  const postId = parseInt(blogId, 10); 
  const post = FULL_BLOG_POSTS.find(p => p.id === postId);

  // Explicitly type the props object for type safety when calling the Client Component
  const props: BlogDetailWrapperProps = {
    post: post,
    blogId: blogId,
    instituteName: INSTITUTE_NAME,
  };

  // Pass necessary props to the client component using the typed object.
  return (
    <BlogDetailWrapper {...props} />
  );
};

export default BlogDetailPage;

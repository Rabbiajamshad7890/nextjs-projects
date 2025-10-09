// app/community/[community_slug]/page.tsx

import CommunityDetail from "./CommunityDetail";
import { notFound } from "next/navigation"; 

interface CommunityDetailPageProps {
  params: { community_slug: string };
}

// Ensure the return type is correct for generateStaticParams
interface StaticParam {
  community_slug: string;
}

// This runs on the server/at build time
export async function generateStaticParams(): Promise<StaticParam[]> {
  // Define all static paths for 'output: export'
  return [
    { community_slug: "ai" },
    { community_slug: "blockchain" },
    { community_slug: "cloud" },
    // Add any other slugs you need to pre-render
  ];
}

// This runs on the server/at build time
// ✅ We MUST mark the component as 'async' if we use 'await' inside it.
const CommunityDetailPage = async ({ params }: CommunityDetailPageProps) => { 
  const { community_slug } = params;

  // 1. Await the function call to resolve the Promise
  const staticParams = await generateStaticParams();

  // 2. Now you can safely call .map() on the array
  const validSlugs = staticParams.map(p => p.community_slug);
  
  // Example: Basic check if the slug is valid
  if (!validSlugs.includes(community_slug)) {
      notFound(); 
  }

  // Render the Client Component, passing the slug as a prop
  return <CommunityDetail communitySlug={community_slug} />;
};

export default CommunityDetailPage;
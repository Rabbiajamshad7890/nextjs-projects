import { Metadata } from 'next';
// Adjust the path to your client component as needed
import CorporateTrainingsCarousel from '@/components/CorporateTrainingsCarousel'; 

// --- Data Fetching / Static Generation (Server Logic) ---

// This function tells Next.js which pages to pre-render at build time.
// Since this is a static route, we return an empty array or a placeholder param.
// If your path was app/corporate-trainings/[id]/page.tsx, this is where you'd list all valid IDs.
export async function generateStaticParams() {
    // For a single static route, this array will usually be empty or contain a placeholder.
    // We are generating a single static page for '/corporate-trainings'.
    return [];
}

// Optional: Add metadata for SEO
export const metadata: Metadata = {
    title: 'Corporate Training Highlights | P2P Cloud',
    description: 'Glimpses of successful corporate training sessions and workshops conducted by Zeeshan Ali.',
};


// --- Main Page Component (Server Component) ---

// The default export for the page MUST be an async or synchronous React component function.
const CorporateTrainingsPage = () => {
    // This is a Server Component. It renders the static elements and imports the client component.
    return (
        <main>
            {/* The CorporateTrainingsCarousel is the client component containing 
              useState, useTheme, and interactive logic. 
            */}
            <CorporateTrainingsCarousel />
        </main>
    );
};

export default CorporateTrainingsPage;

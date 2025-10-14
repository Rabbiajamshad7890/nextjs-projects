// app/exploredocs/page.tsx

import React from 'react';
// FIX APPLIED: Using DEFAULT IMPORT (without brackets) to match the export in DocsWrapper.jsx
import DocsWrapper from '@/app/exploredocs/docsWrapper'; 

/**
 * generateStaticParams is typically used in dynamic route segments (e.g., [slug]/page.tsx)
 * to pre-render paths at build time. Since this is the index page, we provide a minimal
 * implementation as requested.
 */
export async function generateStaticParams() {
  // In a real application, you might fetch a list of top-level document categories here.
  return [];
}

/**
 * ExploreDocsPage is a Server Component.
 * It's responsible for fetching any necessary data and rendering the client component wrapper.
 * The external title "Explore Documentation" has been removed, and the padding is set to zero
 * to allow DocsWrapper to take the full width.
 */
export default function ExploreDocsPage() {
  // Removed const pageTitle = "Explore Documentation"; and the <h1> rendering block.

  return (
    <div className="p-0">
      {/* Renders the client-side wrapper */}
      <DocsWrapper />
    </div>
  );
}

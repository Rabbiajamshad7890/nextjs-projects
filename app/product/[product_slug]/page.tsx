// app/product/[product_slug]/page.tsx

import React from 'react';
// Use Next.js Link for client-side navigation
import Link from 'next/link';
// Icons for visual appeal
import { Link as LinkIcon, AlertTriangle } from 'lucide-react';

// ====================================================================
// --- DATA
// ====================================================================

// Define the full structure for a product hub
interface ProductHub {
    title: string;
    subPages: {
        title: string;
        description: string;
        slug: string;
    }[];
}

// Sample Data for product pages based on the request
const productHubData: Record<string, ProductHub> = {
    'p2pcloud-crm': {
        title: 'P2PCloud CRM Product Hub',
        subPages: [
            { title: 'Features Overview', description: 'Detailed breakdown of all CRM capabilities, including sales automation and support ticketing.', slug: 'features' },
            { title: 'Pricing & Plans', description: 'Explore subscription tiers, usage limits, and enterprise options.', slug: 'pricing' },
            { title: 'Integration Guides', description: 'Step-by-step guides for connecting with third-party tools like Slack and QuickBooks.', slug: 'integration-guides' },
            { title: 'API Documentation', description: 'Reference for REST endpoints to programmatically manage contacts and data.', slug: 'api-docs' },
        ],
    },
    'p2pcloud-storage': {
        title: 'P2PCloud Storage Documentation',
        subPages: [
            { title: 'Cloud Storage Concepts', description: 'Understanding buckets, objects, and storage classes (standard, archival).', slug: 'cloud-storage' },
            { title: 'Upload/Download API', description: 'Guides for using the SDK and CLI for simple and multipart transfers.', slug: 'upload-download' },
            { title: 'Multi-zone Storage Setup', description: 'Configuring geo-redundancy and minimizing latency with multi-region zones.', slug: 'multi-zone' },
            { title: 'Security and Compliance', description: 'Encryption-at-rest, access control lists (ACLs), and compliance certifications.', slug: 'security' },
        ],
    },
    'ai-ml-services': {
        title: 'AI & ML Services Documentation',
        subPages: [
            { title: 'AI APIs Reference', description: 'Documentation for Vision, Translation, and Natural Language Processing APIs.', slug: 'ai-apis' },
            { title: 'Model Training Guide', description: 'Walkthrough on preparing data and submitting custom training jobs.', slug: 'model-training' },
            { title: 'Model Deployment', description: 'Deploying trained models to scalable, low-latency prediction endpoints.', slug: 'deployment' },
            { title: 'Pricing and Quotas', description: 'Understanding costs associated with API calls and custom model hosting.', slug: 'pricing' },
        ],
    },
    'ad-integrations': {
        title: 'Ad Integrations Setup Guides',
        subPages: [
            { title: 'Connect Meta Ads (Facebook/Instagram)', description: 'Setting up pixels, conversion APIs, and audience synchronization.', slug: 'meta-ads' },
            { title: 'Connect Google Ads', description: 'Implementing conversion tracking and managing campaign data.', slug: 'google-ads' },
            { title: 'Connect AdMob', description: 'Integrating mobile app monetization using the AdMob SDK.', slug: 'admob' },
            { title: 'Connect Google My Business (GMB)', description: 'Linking GMB data for local analytics and promotions.', slug: 'gmb' },
        ],
    },
};


// ====================================================================
// --- STATIC GENERATION
// ====================================================================

interface StaticParam {
    product_slug: string;
}

/**
 * REQUIRED for 'output: export'. This function runs at build time 
 * to determine which dynamic paths should be pre-rendered as static HTML files.
 * It uses the keys from the productHubData object.
 */
export async function generateStaticParams(): Promise<StaticParam[]> {
    // Get all keys (the slugs) from the productHubData object
    const slugs = Object.keys(productHubData);

    // Map them to the required format { product_slug: '...' }
    return slugs.map(slug => ({
        product_slug: slug,
    }));
}


// ====================================================================
// --- PAGE COMPONENT
// ====================================================================

interface ProductPageProps {
    params: {
        product_slug: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    const { product_slug } = params;
    const productHub = productHubData[product_slug];

    // Custom 404 handling logic
    if (!productHub) {
        return (
            <main className="min-h-screen bg-[#0d0617] py-32 px-4 sm:px-6 lg:px-8 text-white text-center">
                <div className="max-w-xl mx-auto p-10 rounded-xl border-2 border-red-500 bg-red-900/20">
                    <h1 className="text-5xl font-extrabold mb-4 text-red-400 flex items-center justify-center">
                        <AlertTriangle className="w-8 h-8 mr-3" /> 404 - Product Not Found
                    </h1>
                    <p className="text-xl text-gray-300 mb-8">
                        The product slug **`{product_slug}`** does not match any available product documentation.
                    </p>
                    <Link href="/" className={`
                        inline-block px-6 py-3 text-base font-bold rounded-lg shadow-xl
                        bg-gradient-to-r from-red-600 to-purple-500 text-white
                        hover:from-red-500 hover:to-purple-400
                        transition duration-300 transform
                        border border-red-400 border-opacity-50
                    `}>
                        ← Go Back to Product List
                    </Link>
                </div>
            </main>
        );
    }

    // Glowing link/button style (using purple/blue gradient)
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
                    {productHub.title}
                </h1>
                <p className="text-2xl text-center text-gray-400 mb-12">
                    Choose a resource below to learn more about **{product_slug.replace('-', ' ').toUpperCase()}**.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {productHub.subPages.map((page) => (
                        <Link
                            key={page.slug}
                            href={`/product/${product_slug}/${page.slug}`} // Sub-page link
                            className={linkClass}
                        >
                            {/* Single div wrapper for Next.js Link compatibility */}
                            <div>
                                <h2 className="text-xl font-semibold mb-1 flex items-center">
                                    <LinkIcon className="h-5 w-5 text-purple-400 mr-2" /> {page.title}
                                </h2>
                                <p className="text-sm text-gray-300 mt-2">{page.description}</p>
                            </div>
                        </Link>
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
                        Back to All Products
                    </Link>
                </div>
            </div>
        </main>
    );
};

export default ProductPage;

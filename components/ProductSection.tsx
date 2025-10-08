import React from 'react';
// import Link from 'next/link'; // Using <a> tags instead of Next.js Link

interface ProductCardProps {
  title: string;
  description: string;
  slug: string;
  icon: React.ReactNode; 
}

// Data for the main product cards
const productCards: ProductCardProps[] = [
  {
    title: 'P2PCloud CRM',
    description: 'Centralized customer relationship management. Manage sales, support, and marketing campaigns efficiently.',
    slug: 'p2pcloud-crm',
    icon: <span role="img" aria-label="CRM Icon">📊</span>,
  },
  {
    title: 'P2PCloud Storage',
    description: 'Secure, multi-zone object storage. Reliable solution for backups, archives, and media content delivery.',
    slug: 'p2pcloud-storage',
    icon: <span role="img" aria-label="Storage Icon">💾</span>,
  },
  {
    title: 'AI & ML Services',
    description: 'Access powerful AI APIs for vision, natural language processing, and deploy custom machine learning models.',
    slug: 'ai-ml-services',
    icon: <span role="img" aria-label="AI Icon">🤖</span>,
  },
  {
    title: 'Ad Integrations',
    description: 'Unified guides on connecting popular ad platforms: Meta Ads, Google Ads, AdMob, and Google My Business (GMB).',
    slug: 'ad-integrations',
    icon: <span role="img" aria-label="Ads Icon">📈</span>,
  },
];

const ProductCard: React.FC<ProductCardProps> = ({ title, description, slug, icon }) => {
  // Glowing button class using purple/blue gradient
  const buttonClass = `
    mt-4 inline-block px-4 py-2 text-sm font-semibold rounded-lg shadow-lg
    bg-gradient-to-r from-purple-600 to-blue-500 text-white
    hover:from-purple-500 hover:to-blue-400
    transition duration-300 transform hover:scale-[1.03]
    border border-purple-400 border-opacity-50
  `;

  return (
    <div className="bg-[#1a0f2b] p-6 rounded-xl shadow-2xl border border-purple-800/50 hover:border-blue-500/50 transition duration-300">
      <div className="text-4xl mb-4 text-blue-400">{icon}</div>
      <h3 className="text-2xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-gray-300 text-sm">{description}</p>
      {/* Using <a> tag for navigation */}
      <a href={`/product/${slug}`} className={buttonClass}>
        Explore Features →
      </a>
    </div>
  );
};

export const ProductSection: React.FC = () => {
  // Adjusted grid layout for 4 items
  return (
    <section className="min-h-screen bg-[#0d0617] py-16 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-5xl font-extrabold mb-4 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-300">
          Our Flagship Products
        </h2>
        <p className="text-xl text-center text-gray-400 mb-12">
          Dive into our product documentation, pricing, and integration guides.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {productCards.map((product) => (
            <ProductCard key={product.slug} {...product} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          {/* Using <a> tag for navigation */}
          <a href="/products/all" className={`
            ${productCards.length > 0 ? '' : 'hidden'}
            inline-block px-8 py-4 text-lg font-bold rounded-xl shadow-2xl
            bg-gradient-to-r from-blue-500 to-purple-600 text-white
            hover:from-blue-400 hover:to-purple-500
            transition duration-500 transform hover:scale-[1.05]
            border border-blue-300 border-opacity-50
            animate-pulse
          `}>
            View All Product Documentation
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

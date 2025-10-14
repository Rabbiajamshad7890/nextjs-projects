import ContactWrapper from '@/app/contact/ClientWrapper';

// This is the correct location for generateStaticParams.
// Since /contact is not a dynamic route (e.g., [slug]), it returns an empty array.
export async function generateStaticParams() {
  // If this route were dynamic, you would fetch possible slugs here.
  // Example: const slugs = await fetchSlugsFromDB();
  // return slugs.map((slug) => ({ slug }));
  
  return []; 
}

// The main Page component remains a Server Component (no 'use client')
// and imports the client logic wrapper.
const ContactUsPage: React.FC = () => {
  return (
    <ContactWrapper />
  );
};

export default ContactUsPage;
